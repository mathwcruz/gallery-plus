import type { Photo } from '../models/photo';
import Skeleton from '../../../components/primitives/skeleton';
import Text from '../../../components/primitives/text';
import { PhotoWidget } from './photo-widget';

interface PhotoListProps {
  photos: Photo[];
  loading?: boolean;
}

export function PhotoList({ photos, loading }: PhotoListProps) {
  return (
    <div className="space-y-6">
      <Text
        variant="paragraph-large"
        as="div"
        className="flex items-center justify-end text-accent-span gap-1"
      >
        Total:{' '}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>

      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-5 gap-9">
          {photos.map((photo) => (
            <PhotoWidget key={photo.id} loading={loading} photo={photo} />
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              loading
              photo={{} as Photo}
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto disponível</Text>
        </div>
      )}
    </div>
  );
}
