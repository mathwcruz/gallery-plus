import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

export const imagePreviewVariants = tv({
  base: 'overflow-hidden rounded-lg',
});

export const imageVariants = tv({
  base: 'h-full w-full object-cover',
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
