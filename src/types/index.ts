// Core entity types for the Kids Learning App Landing Page

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  color: SubjectColor;
  difficulty: DifficultyLevel;
  status: SubjectStatus;
  category: SubjectCategory;        // NEW: Educational categorization
  isTrending: boolean;             // NEW: Shows "Hot" badge
  lessonCount: number;             // NEW: Total lessons available
  estimatedDuration: number;       // NEW: Minutes to complete
  prerequisites?: string[];        // NEW: Required subject IDs
  tags: string[];                  // NEW: Searchable keywords
  createdAt: Date;                 // NEW: For content ordering
  updatedAt: Date;                 // NEW: For cache invalidation
}

export interface SubjectColor {
  primary: string;
  secondary: string;
  contrastRatio?: number;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type SubjectStatus = 'available' | 'coming-soon' | 'maintenance';

// NEW: Educational categorization
export type SubjectCategory = 
  | 'mathematics'
  | 'science'
  | 'language-arts'
  | 'social-studies'
  | 'arts'
  | 'music'
  | 'physical-education'
  | 'life-skills';

export interface MediaAsset {
  id: string;
  altText: string;
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  loadingStrategy?: LoadingStrategy;
}

export type LoadingStrategy = 'eager' | 'lazy' | 'critical';

// NEW: Progress tracking types
export interface UserProgress {
  userId?: string;               // Optional: for future user accounts
  subjectProgress: Record<string, SubjectProgress>;
  lastUpdated: Date;
  version: string;               // Data schema version
}

export interface SubjectProgress {
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

export type ProgressStatus = 
  | 'not-started'
  | 'started'
  | 'in-progress'
  | 'completed'
  | 'paused';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: Date;
  category: 'completion' | 'time' | 'streak' | 'exploration';
}

// NEW: Featured content types
export interface FeaturedContent {
  id: string;
  type: 'announcement' | 'promotion' | 'update' | 'warning';
  title: string;                 // Main headline (max 50 chars)
  subtitle?: string;             // Supporting text (max 100 chars)
  description?: string;          // Detailed description
  heroImage?: MediaAsset;        // Banner background image
  ctaText?: string;              // Call-to-action button text
  ctaAction?: FeaturedAction;    // What happens when clicked
  priority: number;              // Display order (1 = highest)
  isActive: boolean;            // Feature toggle
  startDate: Date;              // Campaign start
  endDate?: Date;               // Campaign end (optional)
  targetAudience: string[];      // Age groups or user segments
  badge?: FeaturedBadge;         // Optional badge/chip
  actions?: FeaturedAction[];    // Multiple action buttons
}

export interface FeaturedBadge {
  text: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  variant: 'filled' | 'outlined';
}

export interface FeaturedAction {
  type: 'navigate-subject' | 'external-link' | 'modal' | 'custom';
  target: string;                // Subject ID, URL, or component name
  label: string;                 // Button text
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  icon?: any;                    // Material-UI icon component
  parameters?: Record<string, any>; // Additional action data
}

export interface LandingPageData {
  title: string;
  subtitle: string;
  heroImage: MediaAsset;
  subjects: Subject[];
}

export interface SubjectCard {
  subject: Subject;
  displayOrder: number;
  isPromoted?: boolean;
  customDescription?: string;
  animationDelay: number;
}

export interface SubjectPage {
  id: string;
  subject: Subject;
  title: string;
  headerImage: MediaAsset;
  introText: string;
  learningOptions: LearningOption[];
  navigationBreadcrumb: BreadcrumbItem[];
  metadata: PageMetadata;
}

export interface LearningOption {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  icon?: string;
  estimatedDuration?: number; // in minutes
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  lastModified?: Date;
  loadPriority?: LoadPriority;
}

export type LoadPriority = 'high' | 'medium' | 'low';

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: string;
}

export interface ResponsiveImageSet {
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

// Animation and UI types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

// Error handling types
export interface AppError {
  code: string;
  message: string;
  timestamp: Date;
  requestId?: string;
}

// Performance tracking types
export interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

// Route types
export interface RouteParams {
  subjectId?: string;
}

export interface NavigationState {
  currentPage: 'landing' | 'subject';
  selectedSubject?: Subject;
  previousPage?: string;
}