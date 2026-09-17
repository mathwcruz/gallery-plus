import { PhotoList } from '../contexts/photos/components/photo-list';
import { AlbumFilter } from '../contexts/albums/components/album-filter';
import { useAlbums } from '../contexts/albums/hooks/use-albums';
import { usePhotos } from '../contexts/photos/hooks/use-photos';
import Container from '../components/primitives/container';

export function Home() {
  const { albums, isLoadingAlbums } = useAlbums();

  const { photos, isLoadingPhotos } = usePhotos();

  return (
    <Container>
      <AlbumFilter album={albums} loading={isLoadingAlbums} className="mb-9" />

      <PhotoList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
}
