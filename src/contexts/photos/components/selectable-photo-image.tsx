import { useState, type ComponentProps } from 'react';
import { tv } from 'tailwind-variants';
import { ImagePreview } from '../../../components/image-preview';
import { Checkbox } from '../../../components/primitives/checkbox';

export const selectablePhotoImageVariants = tv({
  base: `relative cursor-pointer rounded-lg`,
  variants: {
    select: {
      true: 'outline-2 outline-accent-brand',
    },
  },
});

interface SelectablePhotoImageProps extends ComponentProps<
  typeof ImagePreview
> {
  selected?: boolean;
  onSelectImage?: (selected: boolean) => void;
}

export function SelectablePhotoImage({
  selected,
  onSelectImage,
  className,
  ...props
}: SelectablePhotoImageProps) {
  const [isSelected, setIsSelected] = useState(selected);

  function handleSelect() {
    const newValue = !isSelected;

    setIsSelected(newValue);
    onSelectImage?.(newValue);
  }

  return (
    <label
      className={selectablePhotoImageVariants({
        className,
        select: isSelected,
      })}
    >
      <Checkbox
        size="sm"
        checked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />

      <ImagePreview {...props} />
    </label>
  );
}
