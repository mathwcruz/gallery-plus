import Icon from "./icon";
import Text from "./text";

import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps, ReactNode } from "react";

export const textInputContainerVariants = tv({
    base: "flex flex-col gap-1"
})

export const textInputWrapperVariants = tv({
    base: "border border-solid border-border-primary focus:border-border-active bg-transparent rounded flex items-center gap-3",
    variants: {
        size: {
            md: "h-10 p-3"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md",
        disabled: false
    }
})

export const textInputIconVariants = tv({
    base: "fill-placeholder",
    variants: {
        size: {
            md: "h-6 w-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

export const textInputVariants = tv({
    base: "bg-transparent outline-none placeholder:text-text-placeholder text-accent-paragraph flex-1",
    variants: {},
    defaultVariants: {}
})

export interface TextInputProps extends VariantProps<typeof textInputWrapperVariants>, Omit<ComponentProps<"input">, "size" | "disabled"> {
    icon?: ComponentProps<typeof Icon>["svg"];
    error?: ReactNode;
}

export function TextInput({ size, disabled, icon, error, className, ...props }: TextInputProps) {
    return (
        <div className={textInputContainerVariants({ className })}>
            <div className={textInputWrapperVariants({ size, disabled })}>
                {icon && <Icon className={textInputIconVariants({ size })} svg={icon} />}

                <input type="text" className={textInputVariants()} disabled={disabled as boolean} {...props} />
            </div>

            {error && (
                <Text variant="label-small" className="text-accent-red">
                    {error}
                </Text>
            )}
        </div>
    )
}