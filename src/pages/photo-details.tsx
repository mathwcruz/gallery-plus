// import { useParams } from 'react-router';

import Container from '../components/primitives/container';
import Text from '../components/primitives/text';
import Skeleton from '../components/primitives/skeleton';
import { PhotoNavigator } from '../contexts/photos/components/photo-navigator';
import { ImagePreview } from '../components/image-preview';
import Button from '../components/primitives/button';
import { SelectableAlbumList } from '../contexts/albums/components/selectable-album-list';

export function PhotoDetails() {
  // const { photo_id } = useParams();

  // only for demonstration purposes
  const isLoadingPhoto = false;
  const photo = {
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
  };

  return (
    <Container>
      <header className="mb-8 flex items-center justify-between gap-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large" as="h2">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="h-8 w-48" />
        )}

        <PhotoNavigator loading={isLoadingPhoto} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-84"
            />
          ) : (
            <Skeleton className="h-84" />
          )}

          {!isLoadingPhoto ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="h-10 w-20" />
          )}
        </div>

        <div className="py-3">
          <Text variant="heading-medium" as="h3" className="mb-7">
            Álbuns
          </Text>

          <SelectableAlbumList
            photo={photo}
            albums={[
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
            ]}
            loading={isLoadingPhoto}
          />
        </div>
      </div>
    </Container>
  );
}
