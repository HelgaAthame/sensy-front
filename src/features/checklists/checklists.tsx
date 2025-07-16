'use client';

import { ChecklistsTable } from '@/features/checklists/components/checklists-table';
import { useGetChecklistsQuery } from '@/entities/checklists/checklists.api';
import { LoaderContent } from '@/shared/ui/loader';

export const Checklists = () => {
  const { data: checklistsData, isLoading } = useGetChecklistsQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  const columns = [
    { key: 'name', title: 'Чек-листы' },
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
            Чек-листы
          </h2>
          {checklistsData && (
            <ChecklistsTable
              data={checklistsData}
              columns={columns}
              itemsPerPage={10}
            />
          )}
        </>
      )}
    </>
  );
};
