import { useWatch } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';

import UploadFileIcon from '../assets/icons/upload-file.svg?react';
import FileImageIcon from '../assets/icons/image.svg?react';

import Icon from './icon';
import Text, { textVariants } from './text';
import { useMemo, type ComponentProps, type ReactNode } from 'react';

export const singleFileInputVariants = tv({
  base: 'flex gap-1 transition flex-col items-center justify-center w-full border border-solid border-border-primary group-hover:border-border-active rounded-lg',
  variants: {
    size: {
      md: 'px-5 py-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const singleFileInputIconVariants = tv({
  base: 'fill-placeholder',
  variants: {
    size: {
      md: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SingleFileInputProps
  extends
    VariantProps<typeof singleFileInputVariants>,
    Omit<ComponentProps<'input'>, 'size'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  allowedExtensions: string[];
  maxFileSizeInMB: number;
  replaceBy: ReactNode;
  error?: ReactNode;
}

export function SingleFileInput({
  size,
  error,
  form,
  allowedExtensions,
  maxFileSizeInMB,
  replaceBy,
  ...props
}: SingleFileInputProps) {
  const formValues = useWatch({ control: form.control });
  const name = props.name || '';
  const formFile: File = useMemo(
    () => formValues[name]?.[0],
    [formValues, name],
  );
  const { fileExtension, fileSize } = useMemo(
    () => ({
      fileExtension: formFile?.name.split('.').pop()?.toLowerCase() || '',
      fileSize: formFile?.size || 0,
    }),
    [formFile],
  );

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension);
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024;
  }

  function isValidFile() {
    return isValidExtension() && isValidSize();
  }

  return (
    <div className="relative w-full group cursor-pointer">
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
              {...props}
            />

            <div className={singleFileInputVariants({ size })}>
              <Icon
                svg={UploadFileIcon}
                className={singleFileInputIconVariants({
                  size,
                })}
              />

              <Text
                variant="label-medium"
                className="text-placeholder text-center"
              >
                Arraste o arquivo aqui
                <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <Text variant="label-small" className="text-accent-red">
              {formFile &&
                !isValidExtension() &&
                `Tipo de arquivo inválido. Tipos permitidos: ${allowedExtensions.join(', ')}`}

              {formFile &&
                !isValidSize() &&
                `Tamanho do arquivo excede o limite permitido. Tamanho máximo permitido: ${maxFileSizeInMB} MB`}

              {!!error && error}
            </Text>
          </div>
        </>
      ) : (
        <>
          {replaceBy}

          <div className="flex gap-3 items-center border border-solid border-border-primary mt-5 p-3 rounded">
            <Icon svg={FileImageIcon} className="fill-white w-6 h-6" />

            <div className="flex flex-col">
              <div className="truncate max-w-80">
                <Text variant="label-medium" className="text-placeholder">
                  {formFile.name}
                </Text>
              </div>

              <div className="flex">
                <button
                  type="button"
                  className={textVariants({
                    variant: 'label-small',
                    className: 'text-accent-red cursor-pointer hover:underline',
                  })}
                  onClick={() => {
                    form.setValue(name, undefined);
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
