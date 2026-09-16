import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../../../helpers/api';
import type { Photo } from '../models/photo';

export interface PhotoDetailResponse extends Photo {
  previousPhotoId?: string;
  nextPhotoId?: string;
}

export function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ['photo', id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });

  return {
    photo: data || null,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
  };
}
