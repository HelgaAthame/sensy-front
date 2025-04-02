import ComponentCard from '@/shared/component-card/component-card'
import { OperatorsTable } from '@/features/operators/operators-table/operators-table'

type Project = {
  id: number
  name: string
  image: string
}

export const Operators = () => {
  const projectsData: Project[] = [
    {
      id: 1,
      name: 'Project 1',
      image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    },
    {
      id: 2,
      name: 'Project 2',
      image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    },
    {
      id: 3,
      name: 'Project 3',
      image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    },
    {
      id: 4,
      name: 'Project 4',
      image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    },
    {
      id: 5,
      name: 'Project 5',
      image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    },
  ]

  const columns = [
    {
      key: 'id',
      id: 1,
      title: 'Id',
    },
    {
      key: 'name',
      id: 2,
      title: 'Имя оператора',
    },
  ]

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6" x-text="pageName">
        Операторы
      </h2>
      <div className="space-y-6">
        <ComponentCard>
          <OperatorsTable data={projectsData} columns={columns} itemsPerPage={10} />
        </ComponentCard>
      </div>
    </>
  )
}
