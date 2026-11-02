import React, { useState } from 'react';
import { SVG_LIVING_COMMONS, SVG_AVATAR_AARAV } from '../utils/svgImages';

export default function SmartImage({
  src,
  alt = '',
  className = '',
  fallback = null,
  isAvatar = false,
  ...props
}) {
  const [errorCount, setErrorCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const defaultFallback = isAvatar ? SVG_AVATAR_AARAV : SVG_LIVING_COMMONS;
  const currentSrc = errorCount > 0 ? (fallback || defaultFallback) : (src || fallback || defaultFallback);

  return (
    <div className={`relative overflow-hidden bg-ivory-200 dark:bg-charcoal-600 ${className}`}>
      {/* Warm Placeholder skeleton until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-ivory-200 via-ivory-300 to-ivory-200 dark:from-charcoal-600 dark:via-charcoal-500 dark:to-charcoal-600 animate-pulse pointer-events-none" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (errorCount === 0) {
            setErrorCount(1);
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
