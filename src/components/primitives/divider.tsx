import { tv, type VariantProps } from 'tailwind-variants';

export const dividerVariants = tv({
  base: 'h-px w-full',
  variants: {
    variant: {
      default: 'bg-border-primary',
    },
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface DividerProps
  extends React.ComponentProps<'div'>, VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical';
}

export default function Divider({
  className,
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  return (
    <div className={dividerVariants({ className, orientation })} {...props} />
  );
}
