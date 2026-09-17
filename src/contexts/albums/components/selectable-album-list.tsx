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
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useTransition();

  const { albums, isLoadingAlbums } = useAlbums();
  const { managePhotoOnAlbum } = usePhotoAlbum();

  function isChecked(albumId: string) {
    return photo?.album?.some((album) => album.id === albumId);
  }

  async function handlePhotoOnAlbum(albumId: string) {
    let albumIds: string[] = [];

    if (isChecked(albumId)) {
      albumIds = photo.album
        ?.filter((album) => album.id !== albumId)
        ?.map((album) => album.id);
    } else {
      albumIds = [...photo.album.map((album) => album.id), albumId];

      setIsUpdatingPhoto(async () => {
        await managePhotoOnAlbum(photo.id, albumIds);
      });
    }
  }

  return (
    <ul className="flex flex-col gap-4">
      {!isLoadingAlbums && photo && albums.length > 0 && (
        <>
          {albums.map((album, index) => (
            <li key={album.id}>
              <div className="flex items-center justify-between gap-1">
                <Text variant="paragraph-large" className="truncate">
                  {album.title}
                </Text>

                <Checkbox
                  defaultChecked={isChecked(album.id)}
                  onChange={() => handlePhotoOnAlbum(album.id)}
                  disabled={isUpdatingPhoto}
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
