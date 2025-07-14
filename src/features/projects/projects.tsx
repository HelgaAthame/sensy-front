'use client';

import { ProjectsTable } from '@/features/projects/projects-table/projects-table';
import { useGetProjectsQuery } from '@/entities/projects/projects.api';
import { LoaderContent } from '@/shared/ui/loader';

export const Projects = () => {
  const { data: operatorsData, isLoading } = useGetProjectsQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  const columns = [
    { key: 'name', title: 'Название проекта' },
    { key: 'active', title: 'Активный' },
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
            Проекты
          </h2>
          {operatorsData && (
            <ProjectsTable
              data={operatorsData}
              columns={columns}
              itemsPerPage={10}
            />
          )}
        </>
      )}
    </>
  );
};
