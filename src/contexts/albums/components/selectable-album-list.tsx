import { useTransition } from 'react';
import { Checkbox } from '../../../components/primitives/checkbox';
import Divider from '../../../components/primitives/divider';
import Skeleton from '../../../components/primitives/skeleton';
import Text from '../../../components/primitives/text';
import type { PhotoDetailResponse } from '../../photos/hooks/use-photo';
import usePhotoAlbum from '../../photos/hooks/use-photo-albums';
import { useAlbums } from '../hooks/use-albums';

interface SelectableAlbumListProps {
  photo: PhotoDetailResponse;
}

export function SelectableAlbumList({ photo }: SelectableAlbumListProps) {
  const [isUpdatingPhoto, startTransition] = useTransition();

  const { albums, isLoadingAlbums } = useAlbums();
  const { managePhotoOnAlbum } = usePhotoAlbum();

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId) ?? false;
  }

  async function handlePhotoOnAlbum(albumId: string) {
    if (!photo) return;

    const nextAlbumIds = isChecked(albumId)
      ? (photo.albums ?? [])
          .filter((album) => album.id !== albumId)
          .map((album) => album.id)
      : [...(photo.albums ?? []).map((album) => album.id), albumId];

    startTransition(() => {
      void managePhotoOnAlbum(photo.id, nextAlbumIds);
    });
  }

  return (
    <ul className="flex flex-col gap-4">
      {!isLoadingAlbums && photo && albums.length > 0 && (
        <>
          {albums.map((album, index) => (
            <li key={album.id}>
              <div className="flex items-center justify-between gap-1">
                <Text
                  variant="paragraph-large"
                  className="truncate text-accent-paragraph"
                >
                  {album.title}
                </Text>

                <Checkbox
                  checked={isChecked(album.id)}
                  disabled={isUpdatingPhoto}
                  loading={isUpdatingPhoto}
                  onChange={() => handlePhotoOnAlbum(album.id)}
                />
              </div>

              {index !== albums.length - 1 && <Divider className="mt-4" />}
            </li>
          ))}
        </>
      )}

      {isLoadingAlbums &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`album-list-${index}`}>
            <Skeleton className="h-10" />
          </li>
        ))}
    </ul>
  );
}
