import { useEffect, useState, useTransition, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { newAlbumFormSchema, type NewAlbumFormSchema } from '../schemas';
import { useAlbum } from '../hooks/use-album';

interface NewAlbumDialogProps {
  trigger: ReactNode;
}

export function NewAlbumDialog({ trigger }: NewAlbumDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();

  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbum();

  const form = useForm<NewAlbumFormSchema>({
    resolver: zodResolver(newAlbumFormSchema),
  });

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photoIds = form.getValues('photoIds') || [];
    let newValue = [];

    if (selected) {
      newValue = [...photoIds, photoId];
    } else {
      newValue = photoIds.filter((id) => id !== photoId);
    }

    form.setValue('photoIds', newValue);
  }

  function handleSubmit(payload: NewAlbumFormSchema) {
    console.log({ payload });

    setIsCreatingAlbum(async () => {
      await createAlbum(payload);

      setIsModalOpen(false);
    });
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.reset();
    }
  }, [isModalOpen, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <TextInput
              placeholder="Adicione um título"
              disabled={isCreatingAlbum}
              error={form.formState.errors.title?.message}
              {...form.register('title')}
            />

            <div className="space-y-3">
              <Text
                variant="label-small"
                as="div"
                className="mb-3 text-accent-paragraph"
              >
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

                  <Text
                    variant="paragraph-medium"
                    className="text-center text-accent-paragraph"
                  >
                    Nenhuma foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
            >
              {isCreatingAlbum ? 'Criando...' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
