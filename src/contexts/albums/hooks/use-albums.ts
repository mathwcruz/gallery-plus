import { useQuery } from '@tanstack/react-query';

import type { Album } from '../models/album';
import { fetcher } from '../../../helpers/api';

export function useAlbums() {
  const { data, isLoading } = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: () => fetcher('/albums'),
  });

  return {
    albums: data || [],
    isLoadingAlbums: isLoading,
  };
}
