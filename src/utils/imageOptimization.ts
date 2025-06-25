// utils/imageOptimization.ts

import { parse } from 'path';

// Define the target widths, these MUST match the TARGET_WIDTHS in your
// scripts/optimize-images.ts file.
const TARGET_OPTIMIZED_WIDTHS = [1200, 900, 600, 300]; // Ensure this array is identical

interface ImageProps {
  src: string; // The original image path from Contentlayer (e.g., "/images/my-post-image.png")
  alt: string;
  width: number; // The intrinsic width of the largest image (e.g., 1200)
  height: number; // The intrinsic height of the largest image (e.g., 675)
  sizes: string; // The CSS `sizes` attribute string
  priority?: boolean; // For Next.js Image component
  loading?: 'lazy' | 'eager'; // For Next.js Image component
  className?: string;
}

/**
 * Generates props for Next.js Image component including optimized WebP srcset.
 * Assumes images are stored in public/images and optimized to public/optimized-images.
 *
 * @param originalImagePath The path to the original image (e.g., '/images/my-image.png').
 * @param altText The alt text for the image.
 * @param baseWidth The intended largest display width for the image. Used for the primary `src` and calculating height.
 * @param baseHeight The intended largest display height for the image.
 * @param sizes The CSS `sizes` attribute string for the image.
 * @param priority If true, image will be eager loaded (good for LCP images).
 * @returns An object containing props ready for the Next.js `<Image />` component.
 */
export function getOptimizedImageProps({
  src: originalImagePath,
  alt: altText,
  width: baseWidth,
  height: baseHeight,
  sizes,
  priority = false,
  loading = 'lazy',
  className
}: ImageProps) {
  if (!originalImagePath) {
    console.warn("getOptimizedImageProps: originalImagePath is null or undefined.");
    return {
      src: '', // Return empty src for default behavior or placeholder
      alt: altText,
      width: baseWidth,
      height: baseHeight,
      className: className,
      loading: loading,
    };
  }

  // Extract the base file name (e.g., 'web-accessibility-2025' from '/images/web-accessibility-2025.png')
  const imageFileName = parse(originalImagePath).name;
  const optimizedBaseUrl = `/optimized-images/${imageFileName}`;

  // Construct the srcset string
  const srcSetString = TARGET_OPTIMIZED_WIDTHS
    .filter(width => width <= baseWidth) // Only include widths smaller than or equal to the baseWidth
    .map(width => `${optimizedBaseUrl}-${width}w.webp ${width}w`)
    .join(', ');

  // Determine the primary src for the Image component (often the largest generated WebP)
  const primarySrc = `${optimizedBaseUrl}-${baseWidth}w.webp`;
  // Fallback if the baseWidth version wasn't generated (e.g., original was smaller)
  // In a robust system, you might check if the file actually exists or default to original
  // For now, we assume your build script creates all relevant sizes up to baseWidth.

  return {
    src: primarySrc, // The main src for the Next.js Image component
    alt: altText,
    width: baseWidth, // Pass the base width
    height: baseHeight, // Pass the base height
    srcSet: srcSetString, // The generated srcset
    sizes: sizes, // The CSS sizes attribute
    priority: priority, // Whether to prioritize loading
    loading: loading, // Lazy loading
    className: className, // Any additional class names
  };
}