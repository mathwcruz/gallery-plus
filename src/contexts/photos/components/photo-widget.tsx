import { Link } from 'react-router';

import { ImagePreview } from '../../../components/image-preview';
import Badge from '../../../components/primitives/badge';
import {
  buttonTextVariants,
  buttonVariants,
} from '../../../components/primitives/button';
import Skeleton from '../../../components/primitives/skeleton';
import Text from '../../../components/primitives/text';
import type { Photo } from '../models/photo';

interface PhotoWidgetProps {
  photo: Photo;
  loading?: boolean;
}

export function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      {!loading ? (
        <ImagePreview
          src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
          alt={photo.title}
          title={photo.title}
          imageClassName="w-43.5 h-43.5 rounded-lg"
        />
      ) : (
        <Skeleton className="h-43.5 w-43.5 rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="text-accent-paragraph">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="h-6 w-full" />
        )}

        <div className="flex min-h-5.5 gap-1">
          {!loading ? (
            <>
              {photo.albums?.slice(0, 1).map((album) => (
                <Badge className="truncate" size="xs" key={album.id}>
                  {album.title}
                </Badge>
              ))}

              {photo.albums.length > 1 && (
                <Badge size="xs">+{photo.albums.length - 1}</Badge>
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={`album-loading-${index}`}
                  className="h-4 w-full rounded-sm"
                />
              ))}
            </>
          )}
        </div>
      </div>

      {!loading ? (
        <Link
          to={`/photos/${photo.id}`}
          className={buttonVariants({
            variant: 'secondary',
            className: 'px-2 py-2',
          })}
        >
          <Text
            className={buttonTextVariants({ variant: 'secondary', size: 'sm' })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      ) : (
        <Skeleton className="h-10 w-full" />
      )}
    </div>
  );
}
