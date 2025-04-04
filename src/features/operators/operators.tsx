'use client'

import ComponentCard from '@/shared/component-card/component-card'
import { OperatorsTable } from '@/features/operators/operators-table/operators-table'
import { useGetOperatorsQuery } from '@/entities/operators/operators.api'

export const Operators = () => {
  const { data: operatorsData, error, isLoading } = useGetOperatorsQuery()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

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
          {operatorsData && (
            <OperatorsTable data={operatorsData} columns={columns} itemsPerPage={10} />
          )}
        </ComponentCard>
      </div>
    </>
  )
}
