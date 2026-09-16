import { Checkbox } from '../../../components/primitives/checkbox';
import Divider from '../../../components/primitives/divider';
import Skeleton from '../../../components/primitives/skeleton';
import Text from '../../../components/primitives/text';
import type { PhotoDetailResponse } from '../../photos/hooks/use-photo';
import { useAlbums } from '../hooks/use-albums';

interface SelectableAlbumListProps {
  photo: PhotoDetailResponse;
}

export function SelectableAlbumList({ photo }: SelectableAlbumListProps) {
  const { albums, isLoadingAlbums } = useAlbums();

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }

  function handlePhotoOnAlbum(albumId: string) {
    let albumsIds = [];

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        ?.filter((album) => album.id !== albumId)
        ?.map((album) => album.id);
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId];

      console.log({ albumsIds });
    }
  }

  return (
    <ul className="flex flex-col gap-4">
      {!isLoadingAlbums && albums.length > 0 && (
        <>
          {albums.map((album, index) => (
            <li key={album.id}>
              <div className="flex items-center justify-between gap-1">
                <Text variant="paragraph-large" className="truncate">
                  {album.title}
                </Text>

                <Checkbox
                  defaultChecked={isChecked(album.id)}
                  onClick={() => handlePhotoOnAlbum(album.id)}
                />
              </div>

              {index !== albums.length - 1 && <Divider className="mt-4" />}
            </li>
          ))}
        </>
      )}

      {isLoadingAlbums &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-10" />
          </li>
        ))}
    </ul>
  );
}
