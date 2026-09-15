import { PhotoList } from '../contexts/photos/components/photo-list';
import { AlbumFilter } from '../contexts/albums/components/album-filter';
import { useAlbums } from '../contexts/albums/hooks/use-albums';
import Container from '../components/primitives/container';
import { usePhotos } from '../contexts/photos/hooks/use-photos';

export function Home() {
  const { albums, isLoadingAlbums } = useAlbums();

  const { photos, isLoadingPhotos } = usePhotos();

  return (
    <Container>
      <AlbumFilter albums={albums} loading={isLoadingAlbums} className="mb-9" />

      <PhotoList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
}
