import React from 'react';

/**
 * One place that decides how every photo is delivered:
 *  - `srcSet` + `sizes` so a phone downloads the 640px file, not the 1280px one
 *  - width/height from the real file, so the box is reserved before it loads
 *    (this is what stops the layout jumping)
 *  - `priority` marks the single above-the-fold image: fetched immediately and
 *    at high priority. Everything else is lazy-loaded and decoded off-thread.
 */
export default function Photo({
  photo,
  sizes,
  priority = false,
  alt,
  className,
  ...rest
}) {
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      width={photo.width}
      height={photo.height}
      alt={alt !== undefined ? alt : photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'auto' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      {...rest}
    />
  );
}
