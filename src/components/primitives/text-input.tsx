import Icon from './icon';
import Text from './text';

import { tv, type VariantProps } from 'tailwind-variants';
import type { ComponentProps, ReactNode } from 'react';

export const textInputContainerVariants = tv({
  base: 'flex flex-col gap-1',
});

export const textInputWrapperVariants = tv({
  base: 'flex items-center gap-3 rounded border border-solid border-border-primary bg-transparent focus:border-border-active',
  variants: {
    size: {
      md: 'h-10 p-3',
    },
    disabled: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export const textInputIconVariants = tv({
  base: 'fill-placeholder',
  variants: {
    size: {
      md: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const textInputVariants = tv({
  base: 'placeholder:text-text-placeholder flex-1 bg-transparent text-accent-paragraph outline-none',
  variants: {},
  defaultVariants: {},
});

export interface TextInputProps
  extends
    VariantProps<typeof textInputWrapperVariants>,
    Omit<ComponentProps<'input'>, 'size' | 'disabled'> {
  icon?: ComponentProps<typeof Icon>['svg'];
  error?: ReactNode;
}

export function TextInput({
  size,
  disabled,
  icon,
  error,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className={textInputContainerVariants({ className })}>
      <div className={textInputWrapperVariants({ size, disabled })}>
        {icon && (
          <Icon className={textInputIconVariants({ size })} svg={icon} />
        )}

        <input
          type="text"
          className={textInputVariants()}
          disabled={disabled as boolean}
          {...props}
        />
      </div>

      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
