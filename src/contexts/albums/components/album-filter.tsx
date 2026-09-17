import type { ComponentProps } from 'react';
import cx from 'classnames';

import type { Album } from '../models/album';
import { usePhotos } from '../../photos/hooks/use-photos';
import Button from '../../../components/primitives/button';
import Text from '../../../components/primitives/text';
import Skeleton from '../../../components/primitives/skeleton';

interface AlbumFilterProps extends ComponentProps<'div'> {
  album: Album[];
  loading?: boolean;
}

export function AlbumFilter({
  album,
  loading,
  className,
  ...props
}: AlbumFilterProps) {
  const { filters } = usePhotos();

  return (
    <div
      className={cx('flex items-center gap-3.5 overflow-x-auto', className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>

      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button
              type="button"
              variant={filters.albumId === null ? 'primary' : 'ghost'}
              size="sm"
              className="cursor-pointer"
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>

            {album.map((album) => (
              <Button
                key={album.id}
                type="button"
                variant={filters.albumId === album.id ? 'primary' : 'ghost'}
                size="sm"
                className="cursor-pointer"
                onClick={() => filters.setAlbumId(album.id)}
              >
                {album.title}
              </Button>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                className="h-7 w-28"
                key={`album-buttom-loading-${index}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
