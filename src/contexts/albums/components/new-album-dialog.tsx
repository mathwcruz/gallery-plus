import type { ReactNode } from 'react';

import SelectCheckboxIllustration from '../../../assets/images/select-checkbox.svg?react';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../../components/primitives/dialog';
import Button from '../../../components/primitives/button';
import { TextInput } from '../../../components/primitives/text-input';
import Text from '../../../components/primitives/text';
import Skeleton from '../../../components/primitives/skeleton';
import { SelectablePhotoImage } from '../../photos/components/selectable-photo-image';
import { usePhotos } from '../../photos/hooks/use-photos';

interface NewAlbumDialogProps {
  trigger: ReactNode;
}

export function NewAlbumDialog({ trigger }: NewAlbumDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos();

  function handleTogglePhoto(selected: boolean, photoId: string) {
    console.log({ selected, photoId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <TextInput placeholder="Adicione um título" />

          <div className="space-y-3">
            <Text variant="label-small" as="div" className="mb-3">
              Fotos cadastradas
            </Text>

            {!isLoadingPhotos && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos?.map((photo) => (
                  <SelectablePhotoImage
                    key={photo.id}
                    src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                    title={photo.title}
                    imageClassName="w-20 h-20"
                    onSelectImage={(selected: boolean) =>
                      handleTogglePhoto(selected, photo.id)
                    }
                  />
                ))}
              </div>
            )}

            {isLoadingPhotos && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={`photo.loading-${index}`}
                    className="h-20 w-20 rounded-lg"
                  />
                ))}
              </div>
            )}

            {!isLoadingPhotos && photos.length === 0 && (
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <SelectCheckboxIllustration />

                <Text variant="paragraph-medium" className="text-center">
                  Nenhuma foto disponível para seleção
                </Text>
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
