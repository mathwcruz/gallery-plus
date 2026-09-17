import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '../../../helpers/api';

export default function usePhotoAlbum() {
  const queryClient = useQueryClient();

  async function managePhotoOnAlbum(photoId: string, albumIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, {
        albumsIds: albumIds,
      });

      queryClient.invalidateQueries({ queryKey: ['photo', photoId] });
      queryClient.invalidateQueries({ queryKey: ['photos'] });

      toast.success('Álbuns atualizados');
    } catch (error) {
      toast.error('Erro ao gerenciar álbuns da foto');
      throw error;
    }
  }

  return { managePhotoOnAlbum };
}
