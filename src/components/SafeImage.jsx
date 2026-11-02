import React, { useState } from 'react';
import { fallbackAvatar, fallbackInterior } from '../utils/images';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  kind = 'interior',
  loading = 'lazy',
  ...props
}) {
  const [stage, setStage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const resolved =
    stage === 0
      ? src
      : kind === 'avatar'
        ? fallbackAvatar(src)
        : fallbackInterior(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 interior-fallback ${kind === 'avatar' ? 'interior-fallback--avatar' : ''} ${loaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      {stage < 2 && resolved ? (
        <img
          src={resolved}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`relative z-[1] w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setStage((prev) => prev + 1);
          }}
          {...props}
        />
      ) : null}
    </div>
  );
}
