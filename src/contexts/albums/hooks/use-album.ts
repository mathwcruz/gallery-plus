import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '../../../helpers/api';
import type { Album } from '../models/album';
import type { NewAlbumFormSchema } from '../schemas';
import type { Photo } from '../../photos/models/photo';
import { usePhotos } from '../../photos/hooks/use-photos';
import usePhotoAlbum from '../../photos/hooks/use-photo-albums';

export interface AlbumDetailResponse extends Album {}

export function useAlbum() {
  const { photos } = usePhotos();
  const { managePhotoOnAlbum } = usePhotoAlbum();

  const queryClient = useQueryClient();

  async function createAlbum(payload: NewAlbumFormSchema) {
    try {
      const { data: album } = await api.post<Album>('/albums', {
        title: payload.title,
      });

      if (payload.photoIds && payload.photoIds.length > 0) {
        await Promise.all(
          payload.photoIds.map((photoId) => {
            const photoAlbumIds =
              photos
                .find((photo: Photo) => photo.id === photoId)
                ?.album.map((album: Album) => album.id) || [];

            return managePhotoOnAlbum(photoId, [...photoAlbumIds, album.id]);
          }),
        );
      }

      queryClient.invalidateQueries({ queryKey: ['albums'] });
      queryClient.invalidateQueries({ queryKey: ['photos'] });

      toast.success('Álbum criado com sucesso');
    } catch (error) {
      toast.error('Erro ao criar o álbum');
      throw error;
    }
  }

  return {
    createAlbum,
  };
}
