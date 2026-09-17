import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import SpinnerIcon from '../../assets/icons/spinner.svg?react';

import Icon from './icon';

export const buttonIconVariants = tv({
  base: 'inline-flex cursor-pointer items-center justify-center transition',
  variants: {
    variant: {
      primary: 'bg-accent-brand hover:bg-accent-brand-light',
      secondary: 'bg-background-secondary hover:bg-background-tertiary',
      ghost: 'bg-transparent hover:bg-border-primary/20',
    },
    size: {
      md: 'h-10 w-10 rounded p-2',
    },
    disabled: {
      true: 'pointer-events-none opacity-50',
    },
    handling: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    handling: false,
  },
});

export const buttonIconIconVariants = tv({
  variants: {
    variant: {
      primary: 'fill-accent-paragraph',
      secondary: 'fill-accent-paragraph',
      ghost: 'fill-accent-paragraph',
    },
    size: {
      md: 'h-6 w-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonIconProps
  extends
    VariantProps<typeof buttonIconVariants>,
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'> {
  icon: React.ComponentProps<typeof Icon>['svg'];
  handling?: boolean;
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  handling,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={buttonIconVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      <Icon
        svg={handling ? SpinnerIcon : icon}
        animate={handling}
        className={buttonIconIconVariants({ variant, size })}
      />
    </button>
  );
}
