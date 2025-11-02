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
    category: 'mathematics',
    isTrending: false,
    lessonCount: 12,
    estimatedDuration: 45,
    tags: ['numbers', 'counting', 'problem-solving', 'arithmetic'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
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
    category: 'science',
    isTrending: false,
    lessonCount: 10,
    estimatedDuration: 40,
    tags: ['science', 'nature', 'discovery', 'experiments'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
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
    category: 'language-arts',
    isTrending: false,
    lessonCount: 15,
    estimatedDuration: 50,
    tags: ['reading', 'stories', 'letters', 'language'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
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
    category: 'arts',
    isTrending: false,
    lessonCount: 8,
    estimatedDuration: 35,
    tags: ['art', 'creativity', 'colors', 'drawing'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
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
    category: 'music',
    isTrending: false,
    lessonCount: 10,
    estimatedDuration: 30,
    tags: ['music', 'rhythm', 'melody', 'instruments'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
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
    category: 'social-studies',
    isTrending: false,
    lessonCount: 12,
    estimatedDuration: 45,
    tags: ['culture', 'geography', 'world', 'exploration'],
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-02'),
  },
  // NEW SUBJECTS - 6 additional subjects from reference image
  {
    id: 'ancient-civilizations',
    name: 'Ancient Civilizations',
    description: 'Explore amazing ancient cultures, their buildings, and daily life through time!',
    icon: 'https://images.unsplash.com/photo-1539650116574-75c0c6d6b86f?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d6b86f?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#8B4513',
      secondary: '#DAA520',
      contrastRatio: 4.8,
    },
    difficulty: 'beginner',
    status: 'available',
    category: 'social-studies',
    isTrending: true, // Featured as trending
    lessonCount: 12,
    estimatedDuration: 45,
    tags: ['history', 'culture', 'civilizations', 'ancient', 'exploration'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
  },
  {
    id: 'insects',
    name: 'Insects',
    description: 'Discover the amazing world of bugs, butterflies, and creepy crawlies!',
    icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#228B22',
      secondary: '#32CD32',
      contrastRatio: 5.2,
    },
    difficulty: 'beginner',
    status: 'available',
    category: 'science',
    isTrending: false,
    lessonCount: 8,
    estimatedDuration: 30,
    tags: ['nature', 'bugs', 'science', 'biology', 'outdoors'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Learn about forces, motion, and energy through fun experiments!',
    icon: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#1E90FF',
      secondary: '#4169E1',
      contrastRatio: 4.9,
    },
    difficulty: 'intermediate',
    status: 'available',
    category: 'science',
    isTrending: true, // Featured as trending
    lessonCount: 15,
    estimatedDuration: 60,
    prerequisites: ['science'],
    tags: ['physics', 'forces', 'motion', 'energy', 'experiments'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
  },
  {
    id: 'birds',
    name: 'Birds',
    description: 'Explore feathered friends, their songs, and amazing flying abilities!',
    icon: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#87CEEB',
      secondary: '#F4A460',
      contrastRatio: 4.6,
    },
    difficulty: 'beginner',
    status: 'available',
    category: 'science',
    isTrending: false,
    lessonCount: 10,
    estimatedDuration: 40,
    tags: ['nature', 'animals', 'flying', 'birds', 'wildlife'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
  },
  {
    id: 'human-body',
    name: 'Human Body',
    description: 'Learn about your amazing body and how to keep it healthy and strong!',
    icon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#DC143C',
      secondary: '#FFB6C1',
      contrastRatio: 5.0,
    },
    difficulty: 'intermediate',
    status: 'available',
    category: 'science',
    isTrending: false,
    lessonCount: 14,
    estimatedDuration: 55,
    tags: ['health', 'body', 'anatomy', 'wellness', 'biology'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
  },
  {
    id: 'rocks-and-minerals',
    name: 'Rocks and Minerals',
    description: 'Discover the building blocks of Earth and become a rock collector!',
    icon: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&q=80',
    color: {
      primary: '#696969',
      secondary: '#D2B48C',
      contrastRatio: 4.7,
    },
    difficulty: 'intermediate',
    status: 'available',
    category: 'science',
    isTrending: false,
    lessonCount: 11,
    estimatedDuration: 45,
    tags: ['geology', 'rocks', 'minerals', 'earth', 'collection'],
    createdAt: new Date('2025-11-02'),
    updatedAt: new Date('2025-11-02'),
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

// NEW: Helper function to get trending subjects
export const getTrendingSubjects = (): Subject[] => {
  return SUBJECTS.filter(subject => subject.isTrending && subject.status === 'available');
};

// NEW: Helper function to get subjects by category
export const getSubjectsByCategory = (category: Subject['category']): Subject[] => {
  return SUBJECTS.filter(subject => subject.category === category);
};

// NEW: Helper function to get new subjects (created today)
export const getNewSubjects = (): Subject[] => {
  const today = new Date().toDateString();
  return SUBJECTS.filter(subject => subject.createdAt.toDateString() === today);
};

// Default subject navigation order
export const SUBJECT_DISPLAY_ORDER = [
  'math',
  'reading', 
  'science',
  'ancient-civilizations', // New trending subject
  'physics',               // New trending subject
  'insects',
  'birds', 
  'human-body',
  'rocks-and-minerals',
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