import { useEffect, useState, useTransition, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import Alert from '../../../components/primitives/alert';
import { SingleFileInput } from '../../../components/primitives/single-file-input';
import { ImagePreview } from '../../../components/image-preview';
import Text from '../../../components/primitives/text';
import Skeleton from '../../../components/primitives/skeleton';
import { newPhotoFormSchema, type NewPhotoFormSchema } from '../schemas';
import { usePhoto } from '../hooks/use-photo';
import { useAlbums } from '../../albums/hooks/use-albums';
interface NewPhotoDialogProps {
  trigger: ReactNode;
}

export function NewPhotoDialog({ trigger }: NewPhotoDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

  const { albums, isLoadingAlbums } = useAlbums();
  const { createPhoto } = usePhoto();

  const form = useForm<NewPhotoFormSchema>({
    resolver: zodResolver(newPhotoFormSchema),
  });

  const file = form.watch('file');
  const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  const albumIds = form.watch('albumIds');

  function handleSubmit(payload: NewPhotoFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);

      setIsModalOpen(false);
    });
  }

  function handleToggleAlbum(albumId: string) {
    const albumIds = form.getValues('albumIds') || [];
    const albumSet = new Set(albumIds);

    if (albumSet.has(albumId)) {
      albumSet.delete(albumId);
    } else {
      albumSet.add(albumId);
    }

    form.setValue('albumIds', Array.from(albumSet));
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
          <DialogHeader>Adicionar foto</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <TextInput
              placeholder="Adicione um título"
              maxLength={255}
              disabled={isCreatingPhoto}
              error={form.formState.errors.title?.message}
              {...form.register('title')}
            />

            <Alert>
              Tamanho máximo: 50MB
              <br />
              Você pode selecionar arquivo em PNG, JPG ou JPEG
            </Alert>

            <SingleFileInput
              form={form}
              allowedExtensions={['png', 'jpg', 'jpeg']}
              maxFileSizeInMB={50}
              replaceBy={<ImagePreview src={fileSrc} className="h-56 w-full" />}
              disabled={isCreatingPhoto}
              error={form.formState.errors.file?.message}
              {...form.register('file')}
            />

            <div className="space-y-3">
              <Text variant="label-small">Selecionar álbuns</Text>

              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumIds?.includes(album.id) ? 'primary' : 'ghost'
                      }
                      size="sm"
                      className="truncate"
                      disabled={isCreatingPhoto}
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}

                {isLoadingAlbums &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`album-loading-${index}`}
                      className="h-7 w-20"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto}>
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              variant="primary"
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
            >
              {isCreatingPhoto ? 'Adicionando...' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
