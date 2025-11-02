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
}

export interface SubjectColor {
  primary: string;
  secondary: string;
  contrastRatio?: number;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type SubjectStatus = 'available' | 'coming-soon' | 'maintenance';

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