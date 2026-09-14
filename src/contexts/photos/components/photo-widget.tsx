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
          src={`/images/${photo.imageId}`}
          alt={photo.title}
          title={photo.title}
          imageClassName="w-43.5 h-43.5 rounded-lg"
        />
      ) : (
        <Skeleton className="w-43.5 h-43.5 rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="truncate">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-full h-6" />
        )}

        <div className="flex gap-1 min-h-5.5">
          {!loading ? (
            <>
              {photo.albums.slice(0, 1).map((album) => (
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
                  className="w-full h-4 rounded-sm"
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
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
}
