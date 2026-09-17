import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import CheckIcon from '../../assets/icons/check.svg?react';
import SpinnerIcon from '../../assets/icons/spinner.svg?react';

import Icon from './icon';

export const checkboxWrapperVariants = tv({
  base: 'group relative inline-flex items-center justify-center',
  variants: {
    disabled: {
      true: 'pointer-events-none cursor-not-allowed opacity-80',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const checkboxVariants = tv({
  base: 'peer flex cursor-pointer appearance-none items-center justify-center overflow-hidden transition',
  variants: {
    variant: {
      default:
        'border-2 border-solid border-border-primary group-hover:bg-accent-brand-light checked:border-accent-brand checked:bg-accent-brand group-hover:checked:border-accent-brand-light hover:border-border-active',
    },
    size: {
      sm: 'h-3 w-3 rounded-sm',
      md: 'h-5 w-5 rounded-sm',
    },
    disabled: {
      true: 'pointer-events-none cursor-not-allowed',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
});

export const checkboxIconVariants = tv({
  base: 'absolute top-1/2 hidden -translate-y-1/2 cursor-pointer fill-black peer-checked:block',
  variants: {
    size: {
      sm: 'left-px h-3 w-3',
      md: 'left-0.5 h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const checkboxSpinnerVariants = tv({
  base: 'absolute top-1/2 block -translate-y-1/2 animate-spin fill-black',
  variants: {
    size: {
      sm: 'left-px h-3 w-3',
      md: 'left-0.5 h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CheckboxProps
  extends
    VariantProps<typeof checkboxVariants>,
    Omit<ComponentProps<'input'>, 'size'> {
  loading?: boolean;
}

export function Checkbox({
  variant,
  size,
  disabled,
  loading,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={checkboxWrapperVariants({
        className,
        disabled: disabled || loading,
      })}
    >
      <input
        type="checkbox"
        className={checkboxVariants({
          variant,
          size,
          disabled: disabled || loading,
        })}
        {...props}
      />

      {loading ? (
        <Icon svg={SpinnerIcon} className={checkboxSpinnerVariants({ size })} />
      ) : (
        <Icon svg={CheckIcon} className={checkboxIconVariants({ size })} />
      )}
    </label>
  );
}
