import ComponentCard from '@/shared/component-card/component-card'
import { ProjectsTable } from '@/features/projects/projects-table/projects-table'

export const Projects = () => {
  const projectsData = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
    { id: 4, name: 'Project 4' },
    { id: 5, name: 'Project 5' },
    { id: 6, name: 'Project 1' },
    { id: 7, name: 'Project 2' },
    { id: 8, name: 'Project 3' },
    { id: 9, name: 'Project 4' },
    { id: 10, name: 'Project 5' },
    { id: 11, name: 'Project 1' },
    { id: 12, name: 'Project 2' },
    { id: 13, name: 'Project 3' },
    { id: 14, name: 'Project 4' },
    { id: 15, name: 'Project 5' },
  ]

  const columns = [{ key: 'name', title: 'Название проекта' }]

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6" x-text="pageName">
        Проекты
      </h2>
      <div className="space-y-6">
        <ComponentCard>
          <ProjectsTable data={projectsData} columns={columns} itemsPerPage={10} />
        </ComponentCard>
      </div>
    </>
  )
}
