'use client'

import ComponentCard from '@/shared/ui/component-card/component-card'
import { OperatorsTable } from '@/features/operators/operators-table/operators-table'
import { useGetOperatorsQuery } from '@/entities/operators/operators.api'
import { LoaderContent } from '@/shared/ui/loader'

export const Operators = () => {
  const { data: operatorsData, isLoading } = useGetOperatorsQuery()

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
      {isLoading ? (
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      ) : (
        <>
          <h2
            className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6"
            x-text="pageName"
          >
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
      )}
    </>
  )
}
