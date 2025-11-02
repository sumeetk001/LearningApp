# API Specification: Update Learning App Subjects

**Feature**: Update Learning App Subjects  
**Date**: November 2, 2025  
**Version**: 1.0.0

## Overview

This document defines the API contracts for the updated subjects feature. Since this is a client-side application using localStorage, these contracts define the data interfaces and methods for managing subjects, progress tracking, and featured content.

## Client-Side API Contracts

### Subject Management API

#### getSubjects()
```typescript
/**
 * Retrieves all available subjects with current status
 * @returns Promise<Subject[]> Array of all subjects
 */
function getSubjects(): Promise<Subject[]>

// Response format:
{
  subjects: Subject[],
  metadata: {
    totalCount: number,
    lastUpdated: string,
    version: string
  }
}
```

#### getSubjectById(id: string)
```typescript
/**
 * Retrieves detailed information for a specific subject
 * @param id - Subject identifier
 * @returns Promise<Subject | null> Subject details or null if not found
 */
function getSubjectById(id: string): Promise<Subject | null>

// Response format:
{
  subject: Subject | null,
  userProgress?: SubjectProgress,
  recommendations?: Subject[] // Related subjects
}
```

#### getSubjectsByCategory(category: SubjectCategory)
```typescript
/**
 * Retrieves subjects filtered by educational category
 * @param category - Educational category filter
 * @returns Promise<Subject[]> Filtered subjects
 */
function getSubjectsByCategory(category: SubjectCategory): Promise<Subject[]>

// Response format:
{
  subjects: Subject[],
  category: SubjectCategory,
  totalCount: number
}
```

#### getTrendingSubjects()
```typescript
/**
 * Retrieves subjects marked as trending or popular
 * @returns Promise<Subject[]> Trending subjects
 */
function getTrendingSubjects(): Promise<Subject[]>

// Response format:
{
  trendingSubjects: Subject[],
  criteria: 'manual' | 'engagement' | 'new',
  lastUpdated: string
}
```

### Progress Management API

#### getUserProgress()
```typescript
/**
 * Retrieves complete user progress data
 * @returns Promise<UserProgress> User's learning progress
 */
function getUserProgress(): Promise<UserProgress>

// Response format:
{
  userProgress: UserProgress,
  statistics: {
    totalSubjectsStarted: number,
    totalSubjectsCompleted: number,
    totalTimeSpent: number,
    streakDays: number
  }
}
```

#### updateSubjectProgress(subjectId: string, progress: Partial<SubjectProgress>)
```typescript
/**
 * Updates progress for a specific subject
 * @param subjectId - Subject identifier
 * @param progress - Progress update data
 * @returns Promise<SubjectProgress> Updated progress
 */
function updateSubjectProgress(
  subjectId: string, 
  progress: Partial<SubjectProgress>
): Promise<SubjectProgress>

// Request format:
{
  subjectId: string,
  updates: {
    lessonsCompleted?: number,
    timeSpent?: number,
    status?: ProgressStatus
  }
}

// Response format:
{
  progress: SubjectProgress,
  achievements?: Achievement[], // Newly unlocked
  nextRecommendation?: Subject
}
```

#### markLessonComplete(subjectId: string, lessonId: string)
```typescript
/**
 * Marks a specific lesson as completed and updates progress
 * @param subjectId - Subject identifier
 * @param lessonId - Lesson identifier
 * @returns Promise<SubjectProgress> Updated progress
 */
function markLessonComplete(
  subjectId: string, 
  lessonId: string
): Promise<SubjectProgress>

// Request format:
{
  subjectId: string,
  lessonId: string,
  completedAt: string,
  timeSpent?: number
}

// Response format:
{
  progress: SubjectProgress,
  newAchievements: Achievement[],
  nextLesson?: string,
  subjectCompleted: boolean
}
```

### Featured Content API

#### getFeaturedContent()
```typescript
/**
 * Retrieves active featured content for display
 * @returns Promise<FeaturedContent[]> Active featured content
 */
function getFeaturedContent(): Promise<FeaturedContent[]>

// Response format:
{
  featuredContent: FeaturedContent[],
  displayOrder: number[],
  metadata: {
    lastRefresh: string,
    nextRefresh: string
  }
}
```

#### trackFeaturedContentInteraction(contentId: string, action: string)
```typescript
/**
 * Tracks user interaction with featured content
 * @param contentId - Featured content identifier
 * @param action - User action (view, click, dismiss)
 * @returns Promise<void>
 */
function trackFeaturedContentInteraction(
  contentId: string, 
  action: 'view' | 'click' | 'dismiss'
): Promise<void>

// Request format:
{
  contentId: string,
  action: string,
  timestamp: string,
  sessionId?: string
}
```

## Data Storage Contracts

### LocalStorage Schema

#### Key Structure
```typescript
const STORAGE_KEYS = {
  USER_PROGRESS: 'learningApp.userProgress',
  PREFERENCES: 'learningApp.preferences',
  CACHE: 'learningApp.cache',
  FEATURED_CONTENT: 'learningApp.featuredContent'
} as const;
```

#### Storage Format
```typescript
// learningApp.userProgress
{
  version: "1.0.0",
  userId?: string,
  subjectProgress: {
    [subjectId: string]: {
      status: ProgressStatus,
      lessonsCompleted: number,
      totalLessons: number,
      firstStarted: string,
      lastAccessed: string,
      timeSpent: number,
      achievements: Achievement[]
    }
  },
  lastUpdated: string
}

// learningApp.cache
{
  subjects: Subject[],
  lastFetch: string,
  version: string,
  expiresAt: string
}

// learningApp.featuredContent
{
  content: FeaturedContent[],
  lastFetch: string,
  interactions: {
    [contentId: string]: {
      views: number,
      clicks: number,
      lastInteraction: string
    }
  }
}
```

### Error Handling Contracts

#### Error Response Format
```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

// Common error codes:
const ERROR_CODES = {
  SUBJECT_NOT_FOUND: 'SUBJECT_NOT_FOUND',
  INVALID_PROGRESS: 'INVALID_PROGRESS',
  STORAGE_FULL: 'STORAGE_FULL',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;
```

#### Error Handling Examples
```typescript
try {
  const subject = await getSubjectById('invalid-id');
} catch (error) {
  if (error.code === 'SUBJECT_NOT_FOUND') {
    // Handle missing subject gracefully
    showFallbackContent();
  }
}
```

## Performance Contracts

### Response Time Requirements
```typescript
const PERFORMANCE_SLA = {
  getSubjects: { maxTime: 100, unit: 'ms' },        // Critical path
  getSubjectById: { maxTime: 50, unit: 'ms' },      // Fast navigation
  updateProgress: { maxTime: 200, unit: 'ms' },     // User feedback
  getFeaturedContent: { maxTime: 300, unit: 'ms' }  // Non-critical
} as const;
```

### Caching Strategy
```typescript
interface CachePolicy {
  subjects: {
    strategy: 'memory',
    ttl: 300000, // 5 minutes
    invalidateOn: ['subjectUpdate', 'newSubject']
  },
  userProgress: {
    strategy: 'localStorage',
    ttl: Infinity, // Persistent
    invalidateOn: ['progressUpdate', 'logout']
  },
  featuredContent: {
    strategy: 'memory',
    ttl: 600000, // 10 minutes
    invalidateOn: ['featuredContentUpdate']
  }
}
```

## Validation Contracts

### Input Validation
```typescript
// Subject ID validation
const SUBJECT_ID_PATTERN = /^[a-z0-9-]+$/;

// Progress validation
function validateProgressUpdate(progress: Partial<SubjectProgress>): boolean {
  if (progress.lessonsCompleted !== undefined) {
    return progress.lessonsCompleted >= 0 && 
           progress.lessonsCompleted <= progress.totalLessons;
  }
  if (progress.timeSpent !== undefined) {
    return progress.timeSpent >= 0;
  }
  return true;
}

// Featured content validation
function validateFeaturedContent(content: FeaturedContent): boolean {
  return content.startDate <= new Date() &&
         (!content.endDate || content.endDate >= new Date()) &&
         content.priority >= 1 && content.priority <= 10;
}
```

### Data Sanitization
```typescript
function sanitizeSubjectData(subject: any): Subject {
  return {
    id: String(subject.id).toLowerCase().replace(/[^a-z0-9-]/g, ''),
    name: String(subject.name).substring(0, 30),
    description: String(subject.description).substring(0, 120),
    // ... other fields with appropriate sanitization
  };
}
```

## Analytics Contracts

### Event Tracking
```typescript
interface AnalyticsEvent {
  eventType: 'subject_view' | 'lesson_start' | 'lesson_complete' | 'featured_click';
  subjectId?: string;
  lessonId?: string;
  contentId?: string;
  timestamp: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

function trackEvent(event: AnalyticsEvent): Promise<void> {
  // Privacy-safe analytics (no personal data)
  // Local aggregation only (COPPA compliant)
}
```

### Performance Monitoring
```typescript
interface PerformanceMetric {
  metric: 'page_load' | 'api_response' | 'image_load' | 'animation_fps';
  value: number;
  unit: 'ms' | 'fps' | 'bytes';
  timestamp: string;
  context?: string;
}

function recordPerformance(metric: PerformanceMetric): void {
  // Record for optimization analysis
  // No personal identification
}
```

## Security Contracts

### Data Protection
```typescript
// No personal data collection
interface DataClassification {
  public: ['subjects', 'featuredContent'], // Can be cached, shared
  private: ['userProgress'],               // Local storage only
  sensitive: [],                           // None in this feature
  restricted: []                           // None in this feature
}

// COPPA compliance
function ensureCOPPACompliance(): boolean {
  // No user identification
  // No behavioral tracking
  // Parent-controlled accounts only
  // Local data storage only
  return true;
}
```

### Input Validation Security
```typescript
function validateUserInput(input: any): boolean {
  // Prevent XSS in user-generated content
  // Validate data types and ranges
  // Sanitize strings
  return isValid(input);
}

function sanitizeForDisplay(text: string): string {
  // HTML entity encoding
  // Remove potentially harmful content
  return encodeHTML(text);
}
```

## Migration Contracts

### Version Compatibility
```typescript
interface MigrationContract {
  fromVersion: string;
  toVersion: string;
  migrationSteps: MigrationStep[];
  rollbackSupported: boolean;
}

interface MigrationStep {
  description: string;
  execute: (data: any) => any;
  validate: (data: any) => boolean;
}

// Example: V0 to V1 migration
const MIGRATION_V0_TO_V1: MigrationContract = {
  fromVersion: '0.1.0',
  toVersion: '1.0.0',
  migrationSteps: [
    {
      description: 'Add category field to subjects',
      execute: (subjects) => subjects.map(addCategoryField),
      validate: (subjects) => subjects.every(s => s.category)
    }
  ],
  rollbackSupported: true
};
```

This API specification provides comprehensive contracts for implementing the updated subjects feature while maintaining data integrity, performance, and privacy compliance.