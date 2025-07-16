'use client';

import { DictionariesTable } from '@/features/dictionaries/components/dictionaries-table';
import { useGetDictionariesQuery } from '@/entities/dictionaries/dictionaries.api';
import { LoaderContent } from '@/shared/ui/loader';

export const Dictionaries = () => {
  const { data: dictionariesData, isLoading } = useGetDictionariesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  const columns = [
    { key: 'name', title: 'Название словаря' },
    { key: 'isActive', title: 'Опубликован' },
  ];

  return (
    <>
      {isLoading ? (
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      ) : (
        <>
          <h2
            className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6"
            x-text="pageName"
          >
            Словари
          </h2>

          {dictionariesData && (
            <DictionariesTable
              data={dictionariesData}
              columns={columns}
              itemsPerPage={10}
            />
          )}
        </>
      )}
    </>
  );
};
