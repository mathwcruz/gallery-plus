import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

export const imagePreviewVariants = tv({
  base: 'rounded-lg overflow-hidden',
});

export const imageVariants = tv({
  base: 'w-full h-full object-cover',
});

interface ImagePreviewProps extends ComponentProps<'img'> {
  imageClassName?: string;
}

export function ImagePreview({
  className,
  imageClassName,
  ...props
}: ImagePreviewProps) {
  return (
    <div className={imagePreviewVariants({ className })}>
      <img
        className={imageVariants({ className: imageClassName })}
        {...props}
      />
    </div>
  );
}
