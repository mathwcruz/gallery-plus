import { useQuery } from '@tanstack/react-query';
import { useQueryState, createSerializer, parseAsString } from 'nuqs';

const toSearchParams = createSerializer({
  albumId: parseAsString,
  q: parseAsString,
});

import type { Photo } from '../models/photo';
import { fetcher } from '../../../helpers/api';

export function usePhotos() {
  const [albumId, setAlbumId] = useQueryState('albumId');
  const [q, setQ] = useQueryState('q');

  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ['photos', albumId, q],
    queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q })}`),
  });

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
    filters: {
      albumId,
      setAlbumId,
      q,
      setQ,
    },
  };
}
