import { useTransition } from 'react';
import { useParams } from 'react-router';

import Container from '../components/primitives/container';
import Text from '../components/primitives/text';
import Skeleton from '../components/primitives/skeleton';
import { ImagePreview } from '../components/image-preview';
import Button from '../components/primitives/button';
import { PhotoNavigator } from '../contexts/photos/components/photo-navigator';
import { SelectableAlbumList } from '../contexts/albums/components/selectable-album-list';
import {
  usePhoto,
  type PhotoDetailResponse,
} from '../contexts/photos/hooks/use-photo';

export function PhotoDetails() {
  const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

  const { photo_id } = useParams();
  const { photo, isLoadingPhoto, previousPhotoId, nextPhotoId, deletePhoto } =
    usePhoto(photo_id);

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      await deletePhoto(photo!.id);
    });
  }

  return (
    <Container>
      <header className="mb-8 flex items-center justify-between gap-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large" as="h2">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="h-8 w-48" />
        )}

        <PhotoNavigator
          prevPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-84"
            />
          ) : (
            <Skeleton className="h-84" />
          )}

          {!isLoadingPhoto ? (
            <Button
              variant="destructive"
              onClick={handleDeletePhoto}
              disabled={isDeletingPhoto}
            >
              {isDeletingPhoto ? 'Excluindo...' : 'Excluir'}
            </Button>
          ) : (
            <Skeleton className="h-10 w-20" />
          )}
        </div>

        <div className="py-3">
          <Text variant="heading-medium" as="h3" className="mb-7">
            Álbuns
          </Text>

          <SelectableAlbumList photo={photo || ({} as PhotoDetailResponse)} />
        </div>
      </div>
    </Container>
  );
}
