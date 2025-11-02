# Data Model: Update Learning App Subjects

**Feature**: Update Learning App Subjects  
**Date**: November 2, 2025  
**Phase**: 1 - Design & Contracts

## Core Entities

### Enhanced Subject Entity

```typescript
interface Subject {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name (max 30 chars for UI)
  description: string;           // Brief description (max 120 chars for cards)
  icon: string;                  // Icon image URL (100x100px)
  coverImage: string;            // Cover image URL (600x400px)
  color: SubjectColor;           // Brand colors for theming
  difficulty: DifficultyLevel;   // Beginner/Intermediate/Advanced
  status: SubjectStatus;         // Available/Coming-Soon/Maintenance
  category: SubjectCategory;     // NEW: Educational categorization
  isTrending: boolean;           // NEW: Shows "Hot" badge
  lessonCount: number;           // NEW: Total lessons available
  estimatedDuration: number;     // NEW: Minutes to complete
  prerequisites?: string[];      // NEW: Required subject IDs
  tags: string[];               // NEW: Searchable keywords
  createdAt: Date;              // NEW: For content ordering
  updatedAt: Date;              // NEW: For cache invalidation
}

interface SubjectColor {
  primary: string;               // Primary theme color
  secondary: string;             // Secondary/accent color
  contrastRatio: number;         // Accessibility compliance
  background?: string;           // NEW: Card background color
}

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type SubjectStatus = 'available' | 'coming-soon' | 'maintenance';

// NEW: Educational categorization
type SubjectCategory = 
  | 'mathematics'
  | 'science'
  | 'language-arts'
  | 'social-studies'
  | 'arts'
  | 'music'
  | 'physical-education'
  | 'life-skills';
```

### NEW: User Progress Entity

```typescript
interface UserProgress {
  userId?: string;               // Optional: for future user accounts
  subjectProgress: Record<string, SubjectProgress>;
  lastUpdated: Date;
  version: string;               // Data schema version
}

interface SubjectProgress {
  subjectId: string;
  status: ProgressStatus;
  lessonsCompleted: number;
  totalLessons: number;
  completionPercentage: number;  // Calculated field
  firstStarted: Date;
  lastAccessed: Date;
  timeSpent: number;             // Total minutes
  achievements: Achievement[];   // Unlocked badges/rewards
}

type ProgressStatus = 
  | 'not-started'
  | 'started'
  | 'in-progress'
  | 'completed'
  | 'paused';

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: Date;
  category: 'completion' | 'time' | 'streak' | 'exploration';
}
```

### NEW: Featured Content Entity

```typescript
interface FeaturedContent {
  id: string;
  title: string;                 // Main headline (max 50 chars)
  subtitle?: string;             // Supporting text (max 100 chars)
  description: string;           // Detailed description
  heroImage: MediaAsset;         // Banner background image
  ctaText: string;              // Call-to-action button text
  ctaAction: FeaturedAction;     // What happens when clicked
  priority: number;              // Display order (1 = highest)
  isActive: boolean;            // Feature toggle
  startDate: Date;              // Campaign start
  endDate?: Date;               // Campaign end (optional)
  targetAudience: string[];      // Age groups or user segments
  analytics: {
    impressions: number;
    clicks: number;
    clickThroughRate: number;
  };
}

interface FeaturedAction {
  type: 'navigate-subject' | 'external-link' | 'modal' | 'custom';
  target: string;                // Subject ID, URL, or component name
  parameters?: Record<string, any>; // Additional action data
}
```

### Enhanced Media Asset Entity

```typescript
interface MediaAsset {
  id: string;
  altText: string;               // Accessibility description
  src: string;                   // Primary image URL
  srcSet?: ResponsiveImageSet;   // NEW: Responsive images
  width: number;
  height: number;
  aspectRatio: string;           // NEW: CSS aspect ratio
  loadingStrategy: LoadingStrategy;
  format: ImageFormat;           // NEW: File format specification
  optimizationLevel: number;     // NEW: Compression quality (1-100)
  metadata: ImageMetadata;       // NEW: Image metadata
}

interface ResponsiveImageSet {
  webp: {
    '320w': string;
    '640w': string;
    '1024w': string;
    '1920w': string;
  };
  jpeg: {
    '320w': string;
    '640w': string;
    '1024w': string;
    '1920w': string;
  };
}

type ImageFormat = 'webp' | 'jpeg' | 'png' | 'svg';
type LoadingStrategy = 'eager' | 'lazy' | 'critical';

interface ImageMetadata {
  fileSize: number;              // Bytes
  colorPalette: string[];        // Dominant colors
  isAccessible: boolean;         // Contrast/readability check
  source: string;                // Attribution/source info
  keywords: string[];            // Search tags
}
```

## Data Relationships

### Subject-Progress Relationship

```typescript
// One-to-One: Each subject has one progress record per user
Subject.id ←→ SubjectProgress.subjectId

// Validation Rules:
// - Progress cannot exist without valid Subject
// - lessonsCompleted ≤ totalLessons
// - completionPercentage = (lessonsCompleted / totalLessons) * 100
// - status derived from completionPercentage and activity
```

### Subject-Featured Content Relationship

```typescript
// Many-to-Many: Subjects can be featured multiple times
Subject.id ←→ FeaturedContent.ctaAction.target (when type = 'navigate-subject')

// Validation Rules:
// - Featured content target must reference valid Subject.id
// - Only active subjects can be featured
// - Featured content must have valid date ranges
```

### Subject Categorization Hierarchy

```typescript
// Each subject belongs to exactly one primary category
// Categories support educational standard alignment

const CATEGORY_MAPPING = {
  'ancient-civilizations': 'social-studies',
  'insects': 'science',
  'physics': 'science',
  'birds': 'science',
  'human-body': 'science',
  'rocks-and-minerals': 'science',
  'math': 'mathematics',
  'reading': 'language-arts',
  'art': 'arts',
  'music': 'music'
};
```

## New Subject Data Specification

### Ancient Civilizations

```typescript
const ancientCivilizations: Subject = {
  id: 'ancient-civilizations',
  name: 'Ancient Civilizations',
  description: 'Explore amazing ancient cultures, their buildings, and daily life through time!',
  icon: 'https://images.unsplash.com/photo-1539650116574-75c0c6d6b86f?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d6b86f?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#8B4513',
    secondary: '#DAA520',
    contrastRatio: 4.8,
    background: '#FFF8DC'
  },
  difficulty: 'beginner',
  status: 'available',
  category: 'social-studies',
  isTrending: true,
  lessonCount: 12,
  estimatedDuration: 45,
  tags: ['history', 'culture', 'civilizations', 'ancient', 'exploration'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

### Insects

```typescript
const insects: Subject = {
  id: 'insects',
  name: 'Insects',
  description: 'Discover the amazing world of bugs, butterflies, and creepy crawlies!',
  icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#228B22',
    secondary: '#32CD32',
    contrastRatio: 5.2,
    background: '#F0FFF0'
  },
  difficulty: 'beginner',
  status: 'available',
  category: 'science',
  isTrending: false,
  lessonCount: 8,
  estimatedDuration: 30,
  tags: ['nature', 'bugs', 'science', 'biology', 'outdoors'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

### Physics

```typescript
const physics: Subject = {
  id: 'physics',
  name: 'Physics',
  description: 'Learn about forces, motion, and energy through fun experiments!',
  icon: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#1E90FF',
    secondary: '#4169E1',
    contrastRatio: 4.9,
    background: '#F0F8FF'
  },
  difficulty: 'intermediate',
  status: 'available',
  category: 'science',
  isTrending: true,
  lessonCount: 15,
  estimatedDuration: 60,
  prerequisites: ['science'],
  tags: ['physics', 'forces', 'motion', 'energy', 'experiments'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

### Birds

```typescript
const birds: Subject = {
  id: 'birds',
  name: 'Birds',
  description: 'Explore feathered friends, their songs, and amazing flying abilities!',
  icon: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#87CEEB',
    secondary: '#F4A460',
    contrastRatio: 4.6,
    background: '#F5F5DC'
  },
  difficulty: 'beginner',
  status: 'available',
  category: 'science',
  isTrending: false,
  lessonCount: 10,
  estimatedDuration: 40,
  tags: ['nature', 'animals', 'flying', 'birds', 'wildlife'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

### Human Body

```typescript
const humanBody: Subject = {
  id: 'human-body',
  name: 'Human Body',
  description: 'Learn about your amazing body and how to keep it healthy and strong!',
  icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#DC143C',
    secondary: '#FFB6C1',
    contrastRatio: 5.0,
    background: '#FFF0F5'
  },
  difficulty: 'intermediate',
  status: 'available',
  category: 'science',
  isTrending: false,
  lessonCount: 14,
  estimatedDuration: 55,
  tags: ['health', 'body', 'anatomy', 'wellness', 'biology'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

### Rocks and Minerals

```typescript
const rocksAndMinerals: Subject = {
  id: 'rocks-and-minerals',
  name: 'Rocks and Minerals',
  description: 'Discover the building blocks of Earth and become a rock collector!',
  icon: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&q=80',
  color: {
    primary: '#696969',
    secondary: '#D2B48C',
    contrastRatio: 4.7,
    background: '#F5F5F5'
  },
  difficulty: 'intermediate',
  status: 'available',
  category: 'science',
  isTrending: false,
  lessonCount: 11,
  estimatedDuration: 45,
  tags: ['geology', 'rocks', 'minerals', 'earth', 'collection'],
  createdAt: new Date('2025-11-02'),
  updatedAt: new Date('2025-11-02')
};
```

## Data Validation Rules

### Subject Validation

```typescript
const VALIDATION_RULES = {
  subject: {
    id: /^[a-z0-9-]+$/,                    // Kebab-case only
    name: { minLength: 3, maxLength: 30 },
    description: { minLength: 10, maxLength: 120 },
    lessonCount: { min: 1, max: 50 },
    estimatedDuration: { min: 5, max: 120 }, // minutes
    colorContrast: { min: 4.5 },            // WCAG AA compliance
    imageAspectRatio: '3:2',                 // Consistent card ratios
  },
  progress: {
    lessonsCompleted: { min: 0 },
    completionPercentage: { min: 0, max: 100 },
    timeSpent: { min: 0 },                   // Cannot be negative
  },
  featuredContent: {
    title: { maxLength: 50 },
    subtitle: { maxLength: 100 },
    priority: { min: 1, max: 10 },
    dateRange: 'startDate < endDate',
  }
};
```

### Business Logic Rules

```typescript
// Progress Status Derivation
function deriveProgressStatus(progress: SubjectProgress): ProgressStatus {
  if (progress.lessonsCompleted === 0) return 'not-started';
  if (progress.lessonsCompleted === progress.totalLessons) return 'completed';
  if (isRecentlyAccessed(progress.lastAccessed)) return 'in-progress';
  return 'started';
}

// Trending Logic
function isTrendingSubject(subject: Subject, analytics: any): boolean {
  return subject.isTrending || 
         analytics.weeklyStartRate > TRENDING_THRESHOLD ||
         analytics.completionRate > HIGH_ENGAGEMENT_THRESHOLD;
}

// Prerequisites Check
function canAccessSubject(subjectId: string, userProgress: UserProgress): boolean {
  const subject = getSubjectById(subjectId);
  if (!subject.prerequisites) return true;
  
  return subject.prerequisites.every(prereqId => 
    userProgress.subjectProgress[prereqId]?.status === 'completed'
  );
}
```

## Data Migration Strategy

### Existing Data Compatibility

```typescript
// Migration from current data structure
interface LegacySubject {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  color: { primary: string; secondary: string; contrastRatio?: number };
  difficulty: DifficultyLevel;
  status: SubjectStatus;
}

function migrateLegacySubject(legacy: LegacySubject): Subject {
  return {
    ...legacy,
    category: inferCategoryFromId(legacy.id),
    isTrending: false,
    lessonCount: DEFAULT_LESSON_COUNT,
    estimatedDuration: DEFAULT_DURATION,
    tags: generateTagsFromName(legacy.name),
    createdAt: new Date('2025-11-01'), // Legacy date
    updatedAt: new Date()
  };
}
```

### LocalStorage Schema Versioning

```typescript
const STORAGE_SCHEMA_VERSION = '1.0.0';

interface StorageSchema {
  version: string;
  userProgress: UserProgress;
  preferences: UserPreferences;
  metadata: {
    lastMigration: Date;
    deviceInfo: DeviceInfo;
  };
}

function migrateStorage(currentData: any): StorageSchema {
  // Handle version upgrades gracefully
  // Preserve existing progress data
  // Add new fields with sensible defaults
}
```

## Performance Considerations

### Data Loading Strategy

1. **Critical Path**: Load available subjects for immediate display
2. **Progressive**: Load detailed subject data on demand
3. **Background**: Prefetch trending subjects and featured content
4. **Cache**: Store frequently accessed data in memory

### Memory Management

```typescript
// Lazy loading for large datasets
const useSubjectData = (subjectId: string) => {
  const [subject, setSubject] = useState<Subject | null>(null);
  
  useEffect(() => {
    // Load subject data only when needed
    loadSubjectById(subjectId).then(setSubject);
  }, [subjectId]);
  
  return subject;
};

// Memory-efficient progress tracking
const MAX_PROGRESS_HISTORY = 100; // Limit stored progress entries
const PROGRESS_CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // Daily cleanup
```

This data model provides a comprehensive foundation for implementing the updated subjects feature while maintaining performance, accessibility, and educational value requirements.