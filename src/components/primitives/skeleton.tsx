import { tv, type VariantProps } from 'tailwind-variants';
import React from 'react';

export const skeletonVariants = tv({
  base: 'pointer-events-none animate-pulse bg-background-secondary',
  variants: {
    rounded: {
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    rounded: 'lg',
  },
});

interface SkeletonProps
  extends VariantProps<typeof skeletonVariants>, React.ComponentProps<'div'> {}

export default function Skeleton({
  rounded,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div className={skeletonVariants({ rounded, className })} {...props} />
  );
}
