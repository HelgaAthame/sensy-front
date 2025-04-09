'use client'

import ComponentCard from '@/shared/component-card/component-card'
import { ProjectsTable } from '@/features/projects/projects-table/projects-table'
import { useGetProjectsQuery } from '@/entities/projects/projects.api'

export const Projects = () => {
  const { data: operatorsData, error, isLoading } = useGetProjectsQuery()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  const columns = [{ key: 'name', title: 'Название проекта' }]

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6" x-text="pageName">
        Проекты
      </h2>
      <div className="space-y-6">
        <ComponentCard>
          {operatorsData && (
            <ProjectsTable data={operatorsData} columns={columns} itemsPerPage={10} />
          )}
        </ComponentCard>
      </div>
    </>
  )
}
