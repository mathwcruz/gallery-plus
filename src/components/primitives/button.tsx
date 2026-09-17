import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import cx from 'classnames';

import SpinnerIcon from '../../assets/icons/spinner.svg?react';

import Icon from './icon';
import Text from './text';

export const buttonVariants = tv({
  base: 'group flex cursor-pointer items-center justify-center gap-1 rounded transition',
  variants: {
    variant: {
      primary: 'bg-accent-brand hover:bg-accent-brand-light',
      secondary: 'bg-background-secondary hover:bg-background-tertiary',
      destructive: 'bg-background-secondary hover:bg-background-tertiary',
      ghost: `border border-solid border-border-primary bg-transparent text-accent-paragraph hover:border-background-secondary`,
    },
    size: {
      sm: 'h-7 px-3 py-1',
      md: 'h-10 py-2 pr-3 pl-3',
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

export const buttonTextVariants = tv({
  variants: {
    variant: {
      primary: 'text-label-inverse',
      secondary: 'text-label',
      destructive: 'text-accent-red',
      ghost: 'text-accent-paragraph',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const buttonIconVariants = tv({
  variants: {
    variant: {
      primary: 'fill-label-inverse',
      secondary: 'fill-label',
      destructive: 'fill-accent-red',
      ghost: 'fill-accent-paragraph',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
    },
    handling: {
      true: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>['svg'];
  handling?: boolean;
}

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  handling,
  icon,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({
        variant,
        size,
        disabled,
        handling,
        className: cx(
          {
            'pr-1': icon,
          },
          className,
        ),
      })}
      disabled={disabled as boolean}
      {...props}
    >
      <Text
        variant="label-medium"
        className={buttonTextVariants({ variant, size })}
      >
        {children}
      </Text>
      {(icon || handling) && (
        <Icon
          svg={handling ? SpinnerIcon : icon!}
          animate={handling}
          className={buttonIconVariants({ variant, size, handling })}
        />
      )}
    </button>
  );
}
