import { Subject, LandingPageData, MediaAsset } from '../types';

// Sample subjects data for the Kids Learning App
export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Math Adventure',
    description: 'Numbers, counting, and problem-solving fun!',
    icon: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#FF6B35',
      secondary: '#FFA85C',
      contrastRatio: 4.8,
    },
    difficulty: 'beginner',
    status: 'available',
  },
  {
    id: 'science',
    name: 'Science Explorer',
    description: 'Discover the wonders of the natural world!',
    icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#4ECDC4',
      secondary: '#44A08D',
      contrastRatio: 5.2,
    },
    difficulty: 'beginner',
    status: 'available',
  },
  {
    id: 'reading',
    name: 'Reading Journey',
    description: 'Stories, letters, and language adventures!',
    icon: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#9B59B6',
      secondary: '#BB8FCE',
      contrastRatio: 4.6,
    },
    difficulty: 'beginner',
    status: 'available',
  },
  {
    id: 'art',
    name: 'Creative Arts',
    description: 'Express yourself through colors and creativity!',
    icon: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#E74C3C',
      secondary: '#EC7063',
      contrastRatio: 4.9,
    },
    difficulty: 'beginner',
    status: 'available',
  },
  {
    id: 'music',
    name: 'Music Magic',
    description: 'Learn rhythms, melodies, and musical instruments!',
    icon: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#F39C12',
      secondary: '#F7DC6F',
      contrastRatio: 4.7,
    },
    difficulty: 'beginner',
    status: 'coming-soon',
  },
  {
    id: 'social-studies',
    name: 'World Explorer',
    description: 'Discover different cultures and places around the world!',
    icon: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: {
      primary: '#27AE60',
      secondary: '#58D68D',
      contrastRatio: 5.1,
    },
    difficulty: 'intermediate',
    status: 'available',
  },
];

// Hero image configuration
const HERO_IMAGE: MediaAsset = {
  id: 'hero-main',
  altText: 'Happy children learning with colorful educational materials and tablets in a bright classroom setting',
  src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  srcSet: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80 320w, https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80 1920w',
  width: 1200,
  height: 600,
  loadingStrategy: 'eager', // Hero image should load immediately
};

// Main landing page configuration
export const LANDING_PAGE_DATA: LandingPageData = {
  title: 'Kids Learning Adventure',
  subtitle: 'Fun and interactive learning for kids aged 5-12',
  heroImage: HERO_IMAGE,
  subjects: SUBJECTS,
};

// Helper function to get subject by ID
export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find(subject => subject.id === id);
};

// Helper function to get available subjects only
export const getAvailableSubjects = (): Subject[] => {
  return SUBJECTS.filter(subject => subject.status === 'available');
};

// Helper function to get subjects by difficulty
export const getSubjectsByDifficulty = (difficulty: Subject['difficulty']): Subject[] => {
  return SUBJECTS.filter(subject => subject.difficulty === difficulty);
};

// Default subject navigation order
export const SUBJECT_DISPLAY_ORDER = [
  'math',
  'reading', 
  'science',
  'art',
  'social-studies',
  'music',
];

// Animation delays for staggered card animations (in milliseconds)
export const ANIMATION_DELAYS = {
  heroSection: 0,
  subjectGrid: 200,
  perCard: 100, // Delay between each card
};

// Performance and accessibility constants
export const CONSTANTS = {
  // Touch target minimum size (WCAG guidelines)
  MIN_TOUCH_TARGET: 44, // px
  
  // Image loading thresholds
  IMAGE_SIZES: {
    mobile: 320,
    tablet: 640,
    desktop: 1024,
    large: 1920,
  },
  
  // Animation durations
  ANIMATION_DURATION: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  // Responsive breakpoints (matches Material-UI)
  BREAKPOINTS: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};