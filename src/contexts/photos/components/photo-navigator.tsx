import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router';
import cx from 'classnames';

import ArrowLeftIcon from '../../../assets/icons/chevron-left.svg?react';
import ArrowRightIcon from '../../../assets/icons/chevron-right.svg?react';

import Skeleton from '../../../components/primitives/skeleton';
import ButtonIcon from '../../../components/primitives/button-icon';
import Button from '../../../components/primitives/button';

interface PhotoNavigatorProps extends ComponentProps<'div'> {
  prevPhotoId?: string;
  nextPhotoId?: string;
  loading?: boolean;
}

export function PhotoNavigator({
  prevPhotoId,
  nextPhotoId,
  loading,
  className,
  ...props
}: PhotoNavigatorProps) {
  const navigate = useNavigate();

  return (
    <div className={cx('flex gap-2', className)} {...props}>
      {!loading ? (
        <>
          <ButtonIcon
            icon={ArrowLeftIcon}
            variant="secondary"
            disabled={!prevPhotoId}
            onClick={() => navigate(`/photos/${prevPhotoId}`)}
          />

          <Button
            variant="secondary"
            icon={ArrowRightIcon}
            disabled={!nextPhotoId}
            onClick={() => navigate(`/photos/${nextPhotoId}`)}
          >
            Próxima imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-20" />
        </>
      )}
    </div>
  );
}
