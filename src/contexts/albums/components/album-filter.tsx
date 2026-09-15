import type { ComponentProps } from 'react';
import cx from 'classnames';

import type { Album } from '../models/album';
import Button from '../../../components/primitives/button';
import Text from '../../../components/primitives/text';
import Skeleton from '../../../components/primitives/skeleton';

interface AlbumFilterProps extends ComponentProps<'div'> {
  albums: Album[];
  loading?: boolean;
}

export function AlbumFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumFilterProps) {
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
              variant="primary"
              size="sm"
              className="cursor-pointer"
            >
              Todos
            </Button>

            {albums.map((album) => (
              <Button
                key={album.id}
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer"
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
