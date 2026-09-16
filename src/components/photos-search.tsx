import { useCallback, useState, type ChangeEvent } from 'react';

import SearchIcon from '../assets/icons/search.svg?react';

import { TextInput } from './primitives/text-input';
import { debounce } from '../helpers/utils';
import { usePhotos } from '../contexts/photos/hooks/use-photos';

export function PhotosSearch() {
  const { filters } = usePhotos();

  const [searchInput, setSearchInput] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value: string) => filters.setQ(value), 200),
    [filters.setQ],
  );

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;

    setSearchInput(searchValue);
    debouncedSetValue(searchValue);
  }

  return (
    <TextInput
      icon={SearchIcon}
      placeholder="Buscar fotos..."
      value={searchInput}
      className="flex-1"
      onChange={handleSearchChange}
    />
  );
}
