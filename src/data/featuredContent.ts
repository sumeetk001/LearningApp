import { FeaturedContent } from '../types';

/**
 * Featured content data for promotional banners
 * Used to highlight new subjects and educational opportunities
 */

export const FEATURED_CONTENT: FeaturedContent[] = [
  {
    id: 'new-subjects-2025',
    type: 'announcement',
    title: "What's Coming Up?",
    description: 'Explore Ancient Civilizations, dive into Physics experiments, discover the world of Insects, learn about Birds, understand your Human Body, and collect Rocks and Minerals. Six exciting new learning adventures await!',
    priority: 1, // Highest priority
    isActive: true,
    startDate: new Date('2025-11-02'),
    endDate: new Date('2025-12-31'), // Active for 2 months
    targetAudience: ['ages-5-10', 'elementary-students'],
    badge: {
      text: 'New',
      color: 'primary',
      variant: 'filled'
    },
    actions: [
      {
        type: 'navigate-subject',
        target: 'ancient-civilizations',
        label: 'Explore Ancient Civilizations',
        variant: 'contained',
        color: 'primary'
      }
    ]
  },
  {
    id: 'science-spotlight',
    type: 'promotion',
    title: 'Science Adventures Await!',
    description: 'Jump into hands-on science learning with our new Physics experiments, discover amazing Insects and Birds in nature, and become a rock collector with Rocks and Minerals!',
    priority: 2,
    isActive: false, // Not currently active
    startDate: new Date('2025-11-15'),
    endDate: new Date('2026-01-15'),
    targetAudience: ['ages-7-10', 'science-interested'],
    badge: {
      text: 'Science',
      color: 'secondary',
      variant: 'outlined'
    },
    actions: [
      {
        type: 'navigate-subject',
        target: 'physics',
        label: 'Start Science Journey',
        variant: 'contained',
        color: 'secondary'
      }
    ]
  },
  {
    id: 'history-discovery',
    type: 'update',
    title: 'Travel Through Time!',
    description: 'Journey back in time to explore Ancient Civilizations! Discover pyramids, learn about daily life in ancient times, and explore amazing cultures from around the world.',
    priority: 3,
    isActive: false, // Backup featured content
    startDate: new Date('2025-12-01'),
    endDate: new Date('2026-02-01'),
    targetAudience: ['ages-6-10', 'history-interested'],
    badge: {
      text: 'History',
      color: 'warning',
      variant: 'filled'
    },
    actions: [
      {
        type: 'navigate-subject',
        target: 'ancient-civilizations',
        label: 'Explore History',
        variant: 'outlined',
        color: 'warning'
      }
    ]
  }
];

// Helper functions for featured content management

/**
 * Gets currently active featured content sorted by priority
 * @returns Array of active FeaturedContent
 */
export function getActiveFeaturedContent(): FeaturedContent[] {
  const now = new Date();
  
  return FEATURED_CONTENT
    .filter(content => 
      content.isActive && 
      content.startDate <= now && 
      (!content.endDate || content.endDate >= now)
    )
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Gets the primary featured content (highest priority active content)
 * @returns Primary FeaturedContent or null if none active
 */
export function getPrimaryFeaturedContent(): FeaturedContent | null {
  const activeContent = getActiveFeaturedContent();
  return activeContent.length > 0 ? activeContent[0] : null;
}

/**
 * Gets featured content by ID
 * @param id - Featured content identifier
 * @returns FeaturedContent or null if not found
 */
export function getFeaturedContentById(id: string): FeaturedContent | null {
  return FEATURED_CONTENT.find(content => content.id === id) || null;
}

/**
 * Tracks interaction with featured content (for analytics)
 * @param contentId - Featured content ID
 * @param action - Type of interaction
 * @param source - Source of the interaction
 */
export function trackFeaturedContentInteraction(
  contentId: string, 
  action: 'view' | 'click' | 'dismiss',
  source: string = 'unknown'
): void {
  // Privacy-safe analytics tracking (COPPA compliant)
  const event = {
    contentId,
    action,
    source,
    timestamp: new Date().toISOString(),
    sessionId: generateSessionId()
  };
  
  // Store locally for aggregation (no personal data)
  try {
    const existing = localStorage.getItem('learningApp.featuredAnalytics') || '[]';
    const analytics = JSON.parse(existing);
    analytics.push(event);
    
    // Keep only last 100 events to prevent storage bloat
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }
    
    localStorage.setItem('learningApp.featuredAnalytics', JSON.stringify(analytics));
  } catch (error) {
    console.warn('Failed to track featured content interaction:', error);
  }
}

/**
 * Generates a session-based ID for analytics (privacy-safe)
 * @returns Session ID string
 */
function generateSessionId(): string {
  // Simple session ID based on current date (not personally identifiable)
  return `session_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Gets featured content analytics summary (privacy-safe aggregation)
 * @returns Analytics summary object
 */
export function getFeaturedContentAnalytics(): {
  totalViews: number;
  totalClicks: number;
  clickThroughRate: number;
  topContent: string;
} {
  try {
    const analytics = JSON.parse(localStorage.getItem('learningApp.featuredAnalytics') || '[]');
    
    const views = analytics.filter((event: any) => event.action === 'view').length;
    const clicks = analytics.filter((event: any) => event.action === 'click').length;
    
    // Count content interactions
    const contentCounts: Record<string, number> = {};
    analytics.forEach((event: any) => {
      if (event.action === 'click') {
        contentCounts[event.contentId] = (contentCounts[event.contentId] || 0) + 1;
      }
    });
    
    const topContent = Object.keys(contentCounts).sort((a, b) => 
      contentCounts[b] - contentCounts[a]
    )[0] || 'none';
    
    return {
      totalViews: views,
      totalClicks: clicks,
      clickThroughRate: views > 0 ? Math.round((clicks / views) * 100) : 0,
      topContent
    };
  } catch (error) {
    console.warn('Failed to get featured content analytics:', error);
    return {
      totalViews: 0,
      totalClicks: 0,
      clickThroughRate: 0,
      topContent: 'none'
    };
  }
}

// Default export for convenience
export default FEATURED_CONTENT;