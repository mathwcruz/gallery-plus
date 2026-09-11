import { useParams } from 'react-router';

import Text from '../components/primitives/text';
import Divider from '../components/primitives/divider';

export function PhotoDetails() {
  const { photo_id } = useParams();

  return (
    <>
      <Text variant="heading-medium">Photo Details Page</Text>

      <Divider />

      <Text variant="label-medium">Photo ID: {photo_id}</Text>
    </>
  );
}
