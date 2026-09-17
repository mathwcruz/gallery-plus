import { useMemo, type ComponentProps, type ReactNode } from 'react';
import { useWatch } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';

import UploadFileIcon from '../../assets/icons/upload-file.svg?react';
import FileImageIcon from '../../assets/icons/image.svg?react';

import Icon from './icon';
import Text, { textVariants } from './text';

export const singleFileInputVariants = tv({
  base: 'flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-solid border-border-primary transition group-hover:border-border-active',
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
      md: 'h-8 w-8',
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
    <div className="group relative w-full cursor-pointer">
      {!formFile || !isValidFile() ? (
        <>
          <div className="group relative w-full cursor-pointer">
            <input
              type="file"
              className="absolute top-0 right-0 h-full w-full cursor-pointer opacity-0"
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
                className="text-center text-placeholder"
              >
                Arraste o arquivo aqui
                <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-1">
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

          <div className="mt-5 flex items-center gap-3 rounded border border-solid border-border-primary p-3">
            <Icon svg={FileImageIcon} className="h-6 w-6 fill-white" />

            <div className="flex flex-col">
              <div className="max-w-80 truncate">
                <Text variant="label-medium" className="text-placeholder">
                  {formFile.name}
                </Text>
              </div>

              <div className="flex">
                <button
                  type="button"
                  className={textVariants({
                    variant: 'label-small',
                    className: 'cursor-pointer text-accent-red hover:underline',
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
