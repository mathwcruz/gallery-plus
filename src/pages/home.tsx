import { PhotoList } from '../contexts/photos/components/photo-list';
import { AlbumFilter } from '../contexts/albums/components/album-filter';
import Container from '../components/primitives/container';

export function Home() {
  return (
    <Container>
      <AlbumFilter
        albums={[
          {
            id: '546',
            title: 'Album 1',
          },
          {
            id: '987',
            title: 'Album 2',
          },
          {
            id: '384',
            title: 'Album 3',
          },
        ]}
        className="mb-9"
      />

      <PhotoList
        photos={[
          {
            id: '123',
            title: 'Photo',
            imageId: 'square-breakfast.png',
            albums: [
              {
                id: '546',
                title: 'Album 1',
              },
              {
                id: '987',
                title: 'Album 2',
              },
            ],
          },
          {
            id: '321',
            title: 'Photo 2',
            imageId: 'wide-cafeteria.png',
            albums: [
              {
                id: '546',
                title: 'Album 1',
              },
              {
                id: '384',
                title: 'Album 3',
              },
            ],
          },
        ]}
      />
    </Container>
  );
}
