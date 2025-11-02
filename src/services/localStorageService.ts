/**
 * LocalStorage Service for LearningApp
 * Provides centralized, COPPA-compliant localStorage operations
 * Includes error handling, data validation, and privacy-safe analytics
 */

export interface StorageResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  volume: number; // 0-100
  animations: boolean;
  language: string;
  lastSubject?: string;
  favoriteSubjects: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'auto';
}

export interface AppAnalytics {
  sessionCount: number;
  totalTimeSpent: number; // minutes
  lastAccessDate: string;
  subjectVisits: Record<string, number>;
  featureUsage: Record<string, number>;
}

export interface CacheItem<T = any> {
  data: T;
  expiration: number;
}

export type CacheStorage = Record<string, CacheItem>;

export interface DismissedContent {
  bannerId: string;
  dismissedAt: string;
  reason?: string;
}

/**
 * LocalStorage Service Class
 * Handles all localStorage operations with proper error handling
 */
export class LocalStorageService {
  private static readonly STORAGE_KEYS = {
    PROGRESS: 'learningApp.progress',
    PREFERENCES: 'learningApp.preferences',
    ANALYTICS: 'learningApp.analytics',
    DISMISSED_CONTENT: 'learningApp.dismissedContent',
    CACHE: 'learningApp.cache',
  } as const;

  private static readonly DEFAULT_PREFERENCES: UserPreferences = {
    theme: 'auto',
    volume: 80,
    animations: true,
    language: 'en',
    favoriteSubjects: [],
    difficulty: 'auto',
  };

  private static readonly DEFAULT_ANALYTICS: AppAnalytics = {
    sessionCount: 0,
    totalTimeSpent: 0,
    lastAccessDate: new Date().toISOString(),
    subjectVisits: {},
    featureUsage: {},
  };

  /**
   * Check if localStorage is available
   */
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Safe JSON parse with error handling
   */
  private static safeParse<T>(value: string | null, defaultValue: T): T {
    if (!value) return defaultValue;
    
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn('Failed to parse localStorage value:', error);
      return defaultValue;
    }
  }

  /**
   * Safe localStorage getter
   */
  private static safeGet<T>(key: string, defaultValue: T): StorageResponse<T> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
        data: defaultValue,
      };
    }

    try {
      const value = localStorage.getItem(key);
      return {
        success: true,
        data: this.safeParse(value, defaultValue),
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to read from localStorage: ${error}`,
        data: defaultValue,
      };
    }
  }

  /**
   * Safe localStorage setter
   */
  private static safeSet<T>(key: string, value: T): StorageResponse<void> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
      };
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to write to localStorage: ${error}`,
      };
    }
  }

  /**
   * Get user preferences
   */
  static getUserPreferences(): StorageResponse<UserPreferences> {
    return this.safeGet(this.STORAGE_KEYS.PREFERENCES, this.DEFAULT_PREFERENCES);
  }

  /**
   * Update user preferences
   */
  static updateUserPreferences(preferences: Partial<UserPreferences>): StorageResponse<void> {
    const current = this.getUserPreferences();
    const updated = { ...current.data!, ...preferences };
    return this.safeSet(this.STORAGE_KEYS.PREFERENCES, updated);
  }

  /**
   * Get app analytics (privacy-safe)
   */
  static getAnalytics(): StorageResponse<AppAnalytics> {
    return this.safeGet(this.STORAGE_KEYS.ANALYTICS, this.DEFAULT_ANALYTICS);
  }

  /**
   * Update analytics data
   */
  static updateAnalytics(updates: Partial<AppAnalytics>): StorageResponse<void> {
    const current = this.getAnalytics();
    const updated = { ...current.data!, ...updates };
    return this.safeSet(this.STORAGE_KEYS.ANALYTICS, updated);
  }

  /**
   * Track subject visit
   */
  static trackSubjectVisit(subjectId: string): StorageResponse<void> {
    const analytics = this.getAnalytics();
    if (!analytics.success) {
      return {
        success: false,
        error: analytics.error,
      };
    }

    const updated = {
      ...analytics.data!,
      subjectVisits: {
        ...analytics.data!.subjectVisits,
        [subjectId]: (analytics.data!.subjectVisits[subjectId] || 0) + 1,
      },
    };

    return this.safeSet(this.STORAGE_KEYS.ANALYTICS, updated);
  }

  /**
   * Track feature usage
   */
  static trackFeatureUsage(featureName: string): StorageResponse<void> {
    const analytics = this.getAnalytics();
    if (!analytics.success) {
      return {
        success: false,
        error: analytics.error,
      };
    }

    const updated = {
      ...analytics.data!,
      featureUsage: {
        ...analytics.data!.featureUsage,
        [featureName]: (analytics.data!.featureUsage[featureName] || 0) + 1,
      },
    };

    return this.safeSet(this.STORAGE_KEYS.ANALYTICS, updated);
  }

  /**
   * Get dismissed content
   */
  static getDismissedContent(): StorageResponse<DismissedContent[]> {
    return this.safeGet(this.STORAGE_KEYS.DISMISSED_CONTENT, []);
  }

  /**
   * Dismiss content (banner, notification, etc.)
   */
  static dismissContent(bannerId: string, reason?: string): StorageResponse<void> {
    const current = this.getDismissedContent();
    if (!current.success) {
      return {
        success: false,
        error: current.error,
      };
    }

    const dismissed: DismissedContent = {
      bannerId,
      dismissedAt: new Date().toISOString(),
      reason,
    };

    const updated = [...current.data!, dismissed];
    return this.safeSet(this.STORAGE_KEYS.DISMISSED_CONTENT, updated);
  }

  /**
   * Check if content is dismissed
   */
  static isContentDismissed(bannerId: string): boolean {
    const dismissed = this.getDismissedContent();
    if (!dismissed.success) return false;

    return dismissed.data!.some(item => item.bannerId === bannerId);
  }

  /**
   * Cache data with expiration
   */
  static setCache<T>(
    key: string, 
    data: T, 
    expirationMinutes: number = 60
  ): StorageResponse<void> {
    const cacheItem: CacheItem<T> = {
      data,
      expiration: Date.now() + (expirationMinutes * 60 * 1000),
    };

    const current = this.safeGet(this.STORAGE_KEYS.CACHE, {} as CacheStorage);
    if (!current.success) {
      return {
        success: false,
        error: current.error,
      };
    }

    const updated: CacheStorage = {
      ...current.data,
      [key]: cacheItem,
    };

    return this.safeSet(this.STORAGE_KEYS.CACHE, updated);
  }

  /**
   * Get cached data
   */
  static getCache<T>(key: string): StorageResponse<T | null> {
    const cache = this.safeGet(this.STORAGE_KEYS.CACHE, {} as CacheStorage);
    if (!cache.success) return { success: false, error: cache.error, data: null };

    if (!cache.data) {
      return { success: true, data: null };
    }

    const item = cache.data[key];
    if (!item) {
      return { success: true, data: null };
    }

    // Check expiration
    if (Date.now() > item.expiration) {
      // Remove expired item
      this.clearCache(key);
      return { success: true, data: null };
    }

    return { success: true, data: item.data as T };
  }

  /**
   * Clear specific cache entry
   */
  static clearCache(key: string): StorageResponse<void> {
    const current = this.safeGet(this.STORAGE_KEYS.CACHE, {} as CacheStorage);
    if (!current.success) {
      return {
        success: false,
        error: current.error,
      };
    }

    const updated: CacheStorage = { ...current.data };
    delete updated[key];

    return this.safeSet(this.STORAGE_KEYS.CACHE, updated);
  }

  /**
   * Clear all cached data
   */
  static clearAllCache(): StorageResponse<void> {
    return this.safeSet(this.STORAGE_KEYS.CACHE, {} as CacheStorage);
  }

  /**
   * Clear all app data (useful for reset/logout)
   */
  static clearAllData(): StorageResponse<void> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
      };
    }

    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to clear localStorage: ${error}`,
      };
    }
  }

  /**
   * Export all data for backup/migration
   */
  static exportData(): StorageResponse<Record<string, any>> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
        data: {},
      };
    }

    try {
      const exportData: Record<string, any> = {};
      Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
        const value = localStorage.getItem(key);
        if (value) {
          exportData[name] = this.safeParse(value, null);
        }
      });

      return {
        success: true,
        data: {
          ...exportData,
          exportDate: new Date().toISOString(),
          version: '1.0.0',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to export data: ${error}`,
        data: {},
      };
    }
  }

  /**
   * Import data from backup
   */
  static importData(data: Record<string, any>): StorageResponse<void> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
      };
    }

    try {
      Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
        if (data[name]) {
          localStorage.setItem(key, JSON.stringify(data[name]));
        }
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to import data: ${error}`,
      };
    }
  }

  /**
   * Get storage usage statistics
   */
  static getStorageStats(): StorageResponse<{
    used: number;
    available: number;
    usagePercentage: number;
  }> {
    if (!this.isStorageAvailable()) {
      return {
        success: false,
        error: 'localStorage not available',
        data: { used: 0, available: 0, usagePercentage: 0 },
      };
    }

    try {
      let used = 0;
      Object.values(this.STORAGE_KEYS).forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          used += value.length;
        }
      });

      // Estimate localStorage size limit (usually 5-10MB)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const usagePercentage = Math.round((used / estimatedLimit) * 100);

      return {
        success: true,
        data: {
          used,
          available: estimatedLimit - used,
          usagePercentage,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to calculate storage stats: ${error}`,
        data: { used: 0, available: 0, usagePercentage: 0 },
      };
    }
  }
}

export default LocalStorageService;