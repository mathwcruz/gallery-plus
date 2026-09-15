import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

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
import type { Album } from '../../albums/models/album';

interface NewPhotoDialogProps {
  trigger: ReactNode;
}

export function NewPhotoDialog({ trigger }: NewPhotoDialogProps) {
  const form = useForm();

  const isLoadingAlbum = false;

  const albums: Album[] = [
    {
      id: '546',
      title: 'Album 1',
    },
    {
      id: '987',
      title: 'Album 2',
    },
    {
      id: '384',
      title: 'Album 3',
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <TextInput placeholder="Adicione um título" maxLength={255} />

          <Alert>
            Tamanho máximo: 50MB
            <br />
            Você pode selecionar arquivo em PNG, JPG ou JPEG
          </Alert>

          <SingleFileInput
            form={form}
            allowedExtensions={['png', 'jpg', 'jpeg']}
            maxFileSizeInMB={50}
            replaceBy={<ImagePreview className="h-56 w-full" />}
          />

          <div className="space-y-3">
            <Text variant="label-small">Selecionar álbuns</Text>

            <div className="flex flex-wrap gap-3">
              {!isLoadingAlbum &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate"
                  >
                    {album.title}
                  </Button>
                ))}

              {isLoadingAlbum &&
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
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button variant="primary">Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
