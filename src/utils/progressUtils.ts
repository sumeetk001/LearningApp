import { UserProgress, SubjectProgress, ProgressStatus } from '../types';

const STORAGE_KEY = 'learningApp.userProgress';
const STORAGE_VERSION = '1.0.0';

export class ProgressManager {
  /**
   * Retrieves user progress from localStorage
   * @returns UserProgress object or default if not found
   */
  static getProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return this.createDefaultProgress();
      }
      
      const parsed = JSON.parse(stored);
      return this.migrateIfNeeded(parsed);
    } catch (error) {
      console.warn('Failed to load progress, using defaults:', error);
      return this.createDefaultProgress();
    }
  }

  /**
   * Gets progress for a specific subject
   * @param subjectId - The subject identifier
   * @returns SubjectProgress for the subject or default
   */
  static getSubjectProgress(subjectId: string): SubjectProgress {
    const progress = this.getProgress();
    return progress.subjectProgress[subjectId] || this.createSubjectProgress(subjectId);
  }

  /**
   * Updates progress for a specific subject
   * @param subjectId - Subject identifier
   * @param updates - Partial progress updates
   * @returns Updated SubjectProgress
   */
  static updateSubjectProgress(
    subjectId: string, 
    updates: Partial<SubjectProgress>
  ): SubjectProgress {
    const progress = this.getProgress();
    const current = progress.subjectProgress[subjectId] || this.createSubjectProgress(subjectId);
    
    const updated: SubjectProgress = {
      ...current,
      ...updates,
      lastAccessed: new Date(),
      completionPercentage: this.calculateCompletion(
        updates.lessonsCompleted ?? current.lessonsCompleted,
        updates.totalLessons ?? current.totalLessons
      ),
      status: this.deriveStatus(
        updates.lessonsCompleted ?? current.lessonsCompleted,
        updates.totalLessons ?? current.totalLessons
      )
    };

    progress.subjectProgress[subjectId] = updated;
    progress.lastUpdated = new Date();
    
    this.saveProgress(progress);
    return updated;
  }

  /**
   * Marks a lesson as complete for a subject
   * @param subjectId - Subject identifier
   * @param lessonId - Lesson identifier
   * @returns Updated SubjectProgress
   */
  static markLessonComplete(subjectId: string, lessonId: string): SubjectProgress {
    const current = this.getSubjectProgress(subjectId);
    const newCompleted = Math.min(current.lessonsCompleted + 1, current.totalLessons);
    
    return this.updateSubjectProgress(subjectId, {
      lessonsCompleted: newCompleted,
      timeSpent: current.timeSpent + 5 // Add 5 minutes default lesson time
    });
  }

  /**
   * Starts a subject for the first time
   * @param subjectId - Subject identifier
   * @param totalLessons - Total lessons in the subject
   * @returns Updated SubjectProgress
   */
  static startSubject(subjectId: string, totalLessons: number): SubjectProgress {
    const current = this.getSubjectProgress(subjectId);
    
    if (current.status === 'not-started') {
      return this.updateSubjectProgress(subjectId, {
        totalLessons,
        firstStarted: new Date(),
        status: 'started'
      });
    }
    
    return current;
  }

  /**
   * Creates default progress structure
   * @returns Default UserProgress
   */
  private static createDefaultProgress(): UserProgress {
    return {
      subjectProgress: {},
      lastUpdated: new Date(),
      version: STORAGE_VERSION
    };
  }

  /**
   * Creates default progress for a subject
   * @param subjectId - Subject identifier
   * @returns Default SubjectProgress
   */
  private static createSubjectProgress(subjectId: string): SubjectProgress {
    return {
      subjectId,
      status: 'not-started',
      lessonsCompleted: 0,
      totalLessons: 10, // Default value
      completionPercentage: 0,
      firstStarted: new Date(),
      lastAccessed: new Date(),
      timeSpent: 0,
      achievements: []
    };
  }

  /**
   * Derives status based on completion
   * @param completed - Lessons completed
   * @param total - Total lessons
   * @returns Derived ProgressStatus
   */
  private static deriveStatus(completed: number, total: number): ProgressStatus {
    if (completed === 0) return 'not-started';
    if (completed === total) return 'completed';
    if (completed > 0) return 'in-progress';
    return 'not-started';
  }

  /**
   * Calculates completion percentage
   * @param completed - Lessons completed
   * @param total - Total lessons
   * @returns Completion percentage (0-100)
   */
  private static calculateCompletion(completed: number, total: number): number {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * Saves progress to localStorage
   * @param progress - UserProgress to save
   */
  private static saveProgress(progress: UserProgress): void {
    try {
      const serialized = JSON.stringify(progress, this.dateReplacer);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save progress:', error);
      // Could implement fallback storage strategy here
    }
  }

  /**
   * Migrates progress data if schema version changes
   * @param data - Raw progress data
   * @returns Migrated UserProgress
   */
  private static migrateIfNeeded(data: any): UserProgress {
    if (data.version !== STORAGE_VERSION) {
      console.log(`Migrating progress from ${data.version} to ${STORAGE_VERSION}`);
      // Implement migration logic here as needed
    }
    
    // Ensure all dates are properly parsed
    return {
      ...data,
      lastUpdated: new Date(data.lastUpdated),
      subjectProgress: Object.keys(data.subjectProgress || {}).reduce((acc, key) => {
        const subject = data.subjectProgress[key];
        acc[key] = {
          ...subject,
          firstStarted: new Date(subject.firstStarted),
          lastAccessed: new Date(subject.lastAccessed),
          achievements: subject.achievements?.map((ach: any) => ({
            ...ach,
            unlockedAt: new Date(ach.unlockedAt)
          })) || []
        };
        return acc;
      }, {} as Record<string, SubjectProgress>)
    };
  }

  /**
   * JSON replacer function to handle Date serialization
   * @param key - Object key
   * @param value - Object value
   * @returns Serialized value
   */
  private static dateReplacer(key: string, value: any): any {
    return value instanceof Date ? value.toISOString() : value;
  }

  /**
   * Clears all progress data (for testing/reset)
   */
  static clearProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Gets progress statistics
   * @returns Statistics about user progress
   */
  static getProgressStatistics(): {
    totalSubjectsStarted: number;
    totalSubjectsCompleted: number;
    totalTimeSpent: number;
    averageCompletion: number;
  } {
    const progress = this.getProgress();
    const subjects = Object.values(progress.subjectProgress);
    
    return {
      totalSubjectsStarted: subjects.filter(s => s.status !== 'not-started').length,
      totalSubjectsCompleted: subjects.filter(s => s.status === 'completed').length,
      totalTimeSpent: subjects.reduce((sum, s) => sum + s.timeSpent, 0),
      averageCompletion: subjects.length > 0 
        ? Math.round(subjects.reduce((sum, s) => sum + s.completionPercentage, 0) / subjects.length)
        : 0
    };
  }
}