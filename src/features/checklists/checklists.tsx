'use client';

import ComponentCard from '@/shared/ui/component-card/component-card';
// import { ChecklistsTable } from '@/features/checklists/checklists-table/checklists-table'
// import { useGetChecklistsQuery } from '@/entities/checklists/checklists.api'
import { LoaderContent } from '@/shared/ui/loader';

export const Checklists = () => {
  // const { data: operatorsData, isLoading } = useGetChecklistsQuery()

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
            Чек-листы
          </h2>
          <div className="space-y-6">
            {/* <ComponentCard>
              {operatorsData && (
                <ChecklistsTable data={operatorsData} columns={columns} itemsPerPage={10} />
              )}
            </ComponentCard> */}
          </div>
       {/* </>
      )} */}
    </>
  );
};
