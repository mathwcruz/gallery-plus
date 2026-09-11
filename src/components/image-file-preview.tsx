import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

export const imageFilePreviewVariants = tv({
  base: 'rounded-lg overflow-hidden',
});

export const imageVariants = tv({
  base: 'w-full h-full object-cover',
});

interface ImageFilePreviewProps extends ComponentProps<'img'> {
  imageClassName?: string;
}

export function ImageFilePreview({
  className,
  imageClassName,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      <img
        className={imageVariants({ className: imageClassName })}
        {...props}
      />
    </div>
  );
}
