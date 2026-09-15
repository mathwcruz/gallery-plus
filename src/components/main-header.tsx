import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Logo from '../assets/images/galeria-plus-full-logo.svg?react';

import { NewPhotoDialog } from '../contexts/photos/components/new-photo-dialog';
import { NewAlbumDialog } from '../contexts/albums/components/new-album-dialog';
import Button from './primitives/button';
import Container from './primitives/container';
import { PhotosSearch } from './photos-search';
import Divider from './primitives/divider';

interface MainHeaderProps extends ComponentProps<typeof Container> {}

export function MainHeader({ className, ...props }: MainHeaderProps) {
  return (
    <Container
      as="header"
      {...props}
      className={cx('flex items-center justify-between gap-10', className)}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      <PhotosSearch />

      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <NewPhotoDialog trigger={<Button>Nova foto</Button>} />

        <NewAlbumDialog
          trigger={<Button variant="secondary">Criar álbum</Button>}
        />
      </div>
    </Container>
  );
}
