import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { api, fetcher } from '../../../helpers/api';
import type { Photo } from '../models/photo';
import type { NewPhotoFormSchema } from '../schemas';
import usePhotoAlbum from './use-photo-albums';
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { managePhotoOnAlbum } = usePhotoAlbum();

  async function createPhoto(payload: NewPhotoFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>('/photos', {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (payload.albumIds && payload.albumIds.length > 0) {
        await managePhotoOnAlbum(photo.id, payload.albumIds);
      }

      queryClient.invalidateQueries({ queryKey: ['photos'] });
      toast.success('Foto salva com sucesso');
    } catch (error) {
      toast.error('Erro ao enviar a foto');
      throw error;
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`);

      toast.success('Foto excluída com sucesso');

      navigate('/');
    } catch (error) {
      toast.error('Erro ao excluir a foto');

      throw error;
    }
  }

  return {
    photo: data || null,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
  };
}
