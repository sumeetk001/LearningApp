# Data Model: Landing Page System

**Feature**: Kids Learning App Landing Page  
**Date**: 2025-11-01  
**Purpose**: Define data structures and relationships for landing page implementation

## Core Entities

### 1. Landing Page

**Purpose**: Main entry point for the kids learning app
**Scope**: Single instance, static content with dynamic navigation

```typescript
interface LandingPage {
  id: 'main-landing';
  title: string;                    // App title (e.g., "Kids Learning Adventure")
  subtitle: string;                 // Purpose description
  heroImage: MediaAsset;            // Main visual element
  subjectNavigation: SubjectCard[]; // Grid of subject cards
  metadata: PageMetadata;
}
```

**Validation Rules**:
- Title must be 2-50 characters
- Subtitle must be 10-200 characters  
- HeroImage must be optimized (WebP + fallback)
- SubjectNavigation must contain 3-12 items
- All content must be age-appropriate (5-12 years)

### 2. Subject

**Purpose**: Educational subject areas (math, science, reading, etc.)
**Scope**: Multiple instances, each representing a learning domain

```typescript
interface Subject {
  id: string;                       // Unique identifier (e.g., 'math', 'science')
  name: string;                     // Display name
  description: string;              // Child-friendly description
  icon: MediaAsset;                 // Subject icon/symbol
  coverImage: MediaAsset;           // Subject page header image
  color: SubjectColor;              // Brand color for theming
  difficulty: DifficultyLevel;      // Age-appropriate level indicator
  status: SubjectStatus;            // Available, coming-soon, maintenance
  metadata: PageMetadata;
}

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type SubjectStatus = 'available' | 'coming-soon' | 'maintenance';
```

**Validation Rules**:
- Name must be 3-30 characters
- Description must be 20-150 characters
- Color must meet WCAG contrast requirements
- Icon must be SVG or optimized PNG
- CoverImage must be landscape format (16:9 or 4:3)

### 3. Subject Card

**Purpose**: Navigation element on landing page linking to subjects
**Scope**: Component representing a subject in the navigation grid

```typescript
interface SubjectCard {
  subject: Subject;                 // Reference to subject entity
  displayOrder: number;             // Grid position (1-based)
  isPromoted: boolean;              // Featured/highlighted status
  customDescription?: string;       // Override subject description
  animationDelay: number;           // Staggered animation timing (ms)
}
```

**Validation Rules**:
- DisplayOrder must be unique and sequential
- AnimationDelay must be 0-2000ms
- CustomDescription max 100 characters if provided

### 4. Subject Page

**Purpose**: Individual page for each educational subject
**Scope**: Multiple instances, one per subject

```typescript
interface SubjectPage {
  id: string;                       // Matches subject.id
  subject: Subject;                 // Reference to subject entity
  title: string;                    // Page title (usually subject.name)
  headerImage: MediaAsset;          // Large hero image
  introText: string;                // Child-friendly introduction
  learningOptions: LearningOption[]; // Available learning paths
  navigationBreadcrumb: BreadcrumbItem[];
  metadata: PageMetadata;
}
```

**Validation Rules**:
- IntroText must be 50-300 characters
- LearningOptions must contain 1-8 items
- HeaderImage must be optimized for mobile loading

### 5. Media Asset

**Purpose**: Optimized images and media files
**Scope**: Shared across all visual content

```typescript
interface MediaAsset {
  id: string;                       // Unique identifier
  originalUrl: string;              // Source file location
  optimizedUrls: ResponsiveImageSet; // Multiple sizes/formats
  altText: string;                  // Accessibility description
  dimensions: ImageDimensions;      // Width/height for layout
  fileSize: number;                 // Bytes for performance tracking
  loadingStrategy: LoadingStrategy; // Eager, lazy, or critical
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

type LoadingStrategy = 'eager' | 'lazy' | 'critical';
```

**Validation Rules**:
- AltText must be 10-200 characters, descriptive
- OriginalUrl must be valid HTTPS URL
- All optimized sizes must exist
- FileSize per variant must be <500KB

### 6. Page Metadata

**Purpose**: Common metadata for SEO and performance
**Scope**: Shared structure across all pages

```typescript
interface PageMetadata {
  title: string;                    // HTML title tag
  description: string;              // Meta description
  keywords: string[];               // SEO keywords
  ogImage: string;                  // Social sharing image
  lastModified: Date;               // Content update timestamp
  loadPriority: LoadPriority;       // Performance hint
}

type LoadPriority = 'high' | 'medium' | 'low';
```

## Data Relationships

```
LandingPage (1) ──→ (n) SubjectCard
    │
    └──→ (1) MediaAsset (heroImage)

SubjectCard (1) ──→ (1) Subject
    │
    └──→ (1) MediaAsset (via Subject)

Subject (1) ──→ (1) SubjectPage
    │
    ├──→ (1) MediaAsset (icon)
    └──→ (1) MediaAsset (coverImage)

SubjectPage (1) ──→ (1) Subject
    │
    └──→ (1) MediaAsset (headerImage)
```

## State Transitions

### Subject Status Flow
```
[Design] → available → maintenance → available
    │
    └──→ coming-soon → available
```

### Loading States
```
[Initial] → loading → loaded → cached
    │
    └──→ error → retry → loaded
```

## Storage Strategy

### Static Configuration
```typescript
// Stored in: src/data/subjects.ts
const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Math Adventure',
    description: 'Numbers, counting, and problem-solving fun!',
    // ... rest of configuration
  },
  // ... other subjects
];
```

### Runtime State Management
```typescript
// React Context for page state
interface AppState {
  currentPage: 'landing' | 'subject';
  selectedSubject?: Subject;
  loadingStates: Record<string, boolean>;
  imageCache: Map<string, HTMLImageElement>;
}
```

## Validation Implementation

### Client-Side Validation
- TypeScript interfaces enforce type safety
- Runtime validation for user inputs (if any)
- Image loading error handling
- Performance budget enforcement

### Content Validation
- Automated accessibility checks (alt text, contrast)
- Image optimization verification
- Load time monitoring
- Child-appropriate content screening

## Performance Considerations

### Data Loading Strategy
1. **Critical path**: Landing page content loads first
2. **Progressive**: Subject data loads on-demand
3. **Preloading**: Next likely subject based on interaction
4. **Caching**: Aggressive caching for repeat visits

### Bundle Optimization
- Tree-shaking unused subject data
- Dynamic imports for subject-specific code
- Image lazy loading below fold
- Service Worker caching strategy

## Future Extensions

### Planned Enhancements
- User preferences (favorite subjects)
- Progress tracking (requires COPPA compliance)
- Offline content availability
- Multi-language support

### Data Model Evolution
- LearningChunk entity for content structure
- UserProgress tracking (with parental consent)
- Achievement/Badge system
- Accessibility preference storage

All data structures prioritize child safety, performance, and educational value while maintaining COPPA compliance.