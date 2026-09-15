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
import type { Photo } from '../../photos/models/photo';
import Skeleton from '../../../components/primitives/skeleton';
import { SelectablePhotoImage } from '../../photos/components/selectable-photo-image';

interface NewAlbumDialogProps {
  trigger: ReactNode;
}

export function NewAlbumDialog({ trigger }: NewAlbumDialogProps) {
  const isLoadingPhotos = false;

  const photos: Photo[] = [
    {
      id: '123',
      title: 'Photo',
      imageId: 'square-breakfast.png',
      albums: [
        {
          id: '546',
          title: 'Album 1',
        },
        {
          id: '987',
          title: 'Album 2',
        },
      ],
    },
    {
      id: '321',
      title: 'Photo 2',
      imageId: 'wide-cafeteria.png',
      albums: [
        {
          id: '546',
          title: 'Album 1',
        },
        {
          id: '384',
          title: 'Album 3',
        },
      ],
    },
  ];

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
                    src={`/images/${photo.imageId}`}
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
