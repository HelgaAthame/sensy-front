'use client';

import ComponentCard from '@/shared/ui/component-card/component-card';
// import { DictionariesTable } from '@/features/dictionaries/dictionaries-table/dictionaries-table'
// import { useGetDictionariesQuery } from '@/entities/dictionaries/dictionaries.api'
import { LoaderContent } from '@/shared/ui/loader';

export const Dictionaries = () => {
  // const { data: operatorsData, isLoading } = useGetDictionariesQuery()

  // if (isLoading) {
  //   return <div>Загрузка...</div>
  // }

  const columns = [{ key: 'name', title: 'Название проекта' }];

  return (
    <>
      {/* {isLoading ? (
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      ) : (
        <>*/}
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6"
        x-text="pageName"
      >
        Словари
      </h2>
      <div className="space-y-6">
        {/* <ComponentCard>
              {operatorsData && (
                <DictionariesTable data={operatorsData} columns={columns} itemsPerPage={10} />
              )}
            </ComponentCard> */}
      </div>
      {/* </>
      )} */}
    </>
  );
};
