import { MediaAsset, ResponsiveImageSet } from '../types';

/**
 * Image optimization utilities for the Kids Learning App
 * Handles responsive images, lazy loading, and fallbacks
 */

export class ImageUtils {
  /**
   * Generates responsive image URLs for different breakpoints
   * @param baseUrl - Base image URL (usually Unsplash)
   * @param options - Image optimization options
   * @returns ResponsiveImageSet with WebP and JPEG variants
   */
  static generateResponsiveImageSet(
    baseUrl: string,
    options: {
      quality?: number;
      aspectRatio?: string;
    } = {}
  ): ResponsiveImageSet {
    const { quality = 80 } = options;
    
    // Unsplash URL parameters for optimization
    const baseParams = `fit=crop&q=${quality}`;
    
    return {
      webp: {
        '320w': `${baseUrl}&w=320&h=213&${baseParams}&fm=webp`,
        '640w': `${baseUrl}&w=640&h=427&${baseParams}&fm=webp`,
        '1024w': `${baseUrl}&w=1024&h=683&${baseParams}&fm=webp`,
        '1920w': `${baseUrl}&w=1920&h=1280&${baseParams}&fm=webp`
      },
      jpeg: {
        '320w': `${baseUrl}&w=320&h=213&${baseParams}&fm=jpg`,
        '640w': `${baseUrl}&w=640&h=427&${baseParams}&fm=jpg`,
        '1024w': `${baseUrl}&w=1024&h=683&${baseParams}&fm=jpg`,
        '1920w': `${baseUrl}&w=1920&h=1280&${baseParams}&fm=jpg`
      }
    };
  }

  /**
   * Creates optimized MediaAsset for subject images
   * @param id - Unique identifier for the image
   * @param baseUrl - Base Unsplash URL
   * @param altText - Accessibility description
   * @param options - Optimization options
   * @returns Complete MediaAsset object
   */
  static createOptimizedMediaAsset(
    id: string,
    baseUrl: string,
    altText: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      loadingStrategy?: 'eager' | 'lazy' | 'critical';
    } = {}
  ): MediaAsset {
    const { 
      width = 600, 
      height = 400, 
      quality = 80, 
      loadingStrategy = 'lazy' 
    } = options;

    return {
      id,
      altText,
      src: `${baseUrl}&w=${width}&h=${height}&fit=crop&q=${quality}&fm=jpg`,
      srcSet: this.generateSrcSetString(baseUrl, quality),
      width,
      height,
      loadingStrategy
    };
  }

  /**
   * Generates srcSet string for responsive images
   * @param baseUrl - Base image URL
   * @param quality - Image quality (1-100)
   * @returns srcSet string for use in img elements
   */
  static generateSrcSetString(baseUrl: string, quality: number = 80): string {
    const responsiveSet = this.generateResponsiveImageSet(baseUrl, { quality });
    
    return [
      `${responsiveSet.webp['320w']} 320w`,
      `${responsiveSet.webp['640w']} 640w`,
      `${responsiveSet.webp['1024w']} 1024w`,
      `${responsiveSet.webp['1920w']} 1920w`
    ].join(', ');
  }

  /**
   * Preloads critical images for better performance
   * @param imageUrls - Array of image URLs to preload
   */
  static preloadCriticalImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  /**
   * Creates a fallback image URL for error handling
   * @param width - Desired width
   * @param height - Desired height
   * @param text - Fallback text to display
   * @returns Placeholder image URL
   */
  static createFallbackImage(
    width: number = 600, 
    height: number = 400, 
    text: string = 'Subject Image'
  ): string {
    // Using a placeholder service for fallbacks
    return `https://via.placeholder.com/${width}x${height}/4ECDC4/FFFFFF?text=${encodeURIComponent(text)}`;
  }

  /**
   * Optimizes existing image URLs for performance
   * @param url - Original image URL
   * @param targetWidth - Target width for optimization
   * @param targetHeight - Target height for optimization
   * @returns Optimized URL
   */
  static optimizeImageUrl(
    url: string, 
    targetWidth: number, 
    targetHeight: number
  ): string {
    // Handle Unsplash URLs
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${targetWidth}&h=${targetHeight}&fit=crop&q=80&fm=webp`;
    }
    
    // Return original URL if not optimizable
    return url;
  }

  /**
   * Checks if an image URL is valid and accessible
   * @param url - Image URL to validate
   * @returns Promise resolving to true if image is valid
   */
  static async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  }

  /**
   * Lazy loads an image with intersection observer
   * @param img - Image element to lazy load
   * @param callback - Optional callback when image loads
   */
  static setupLazyLoading(img: HTMLImageElement, callback?: () => void): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            const src = target.dataset.src;
            const srcSet = target.dataset.srcset;
            
            if (src) {
              target.src = src;
              target.removeAttribute('data-src');
            }
            
            if (srcSet) {
              target.srcset = srcSet;
              target.removeAttribute('data-srcset');
            }
            
            target.classList.remove('lazy');
            observer.unobserve(target);
            
            callback?.();
          }
        });
      }, {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.01
      });
      
      observer.observe(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      const src = img.dataset.src;
      const srcSet = img.dataset.srcset;
      
      if (src) img.src = src;
      if (srcSet) img.srcset = srcSet;
      
      callback?.();
    }
  }

  /**
   * Calculates image dimensions maintaining aspect ratio
   * @param originalWidth - Original image width
   * @param originalHeight - Original image height
   * @param targetWidth - Target width
   * @param targetHeight - Target height
   * @returns Calculated dimensions
   */
  static calculateAspectRatioDimensions(
    originalWidth: number,
    originalHeight: number,
    targetWidth: number,
    targetHeight: number
  ): { width: number; height: number } {
    const originalRatio = originalWidth / originalHeight;
    const targetRatio = targetWidth / targetHeight;
    
    if (originalRatio > targetRatio) {
      // Image is wider than target
      return {
        width: targetWidth,
        height: Math.round(targetWidth / originalRatio)
      };
    } else {
      // Image is taller than target
      return {
        width: Math.round(targetHeight * originalRatio),
        height: targetHeight
      };
    }
  }

  /**
   * Gets the appropriate image size based on screen size
   * @param screenWidth - Current screen width
   * @returns Recommended image width
   */
  static getRecommendedImageSize(screenWidth: number): number {
    if (screenWidth <= 320) return 320;
    if (screenWidth <= 640) return 640;
    if (screenWidth <= 1024) return 1024;
    return 1920;
  }

  /**
   * Compresses image quality based on network conditions
   * @param baseQuality - Base quality (1-100)
   * @returns Adjusted quality based on connection
   */
  static getAdaptiveQuality(baseQuality: number = 80): number {
    // Check for Network Information API
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          return Math.max(baseQuality * 0.5, 30);
        case '3g':
          return Math.max(baseQuality * 0.7, 50);
        case '4g':
        default:
          return baseQuality;
      }
    }
    
    return baseQuality;
  }
}