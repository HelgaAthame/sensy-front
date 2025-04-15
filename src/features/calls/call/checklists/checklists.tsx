'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/ui/table/table'
import { ChecklistSummary } from './checklist-summary'

type ChecklistItem = {
  criteriaGroup: string
  criteria: string
  score: number
  maxScore: number
  explanation: string
}

export type ChecklistGroup = {
  name: string
  items: ChecklistItem[]
  totalScore?: number
  maxTotalScore?: number
}

interface ChecklistProps {
  checklistData: ChecklistGroup[]
  gptChecklist?: string | null
}

export const Checklist: React.FC<ChecklistProps> = ({ checklistData, gptChecklist }) => {
  return (
    <div className="text-gray-700 space-y-8">
      {gptChecklist && <ChecklistSummary checklist={gptChecklist} />}

      {checklistData.map((group, groupIndex) => (
        <div key={groupIndex} className="border border-gray-200 rounded-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableCell
                  isHeader
                  className="w-1/6 py-4 px-6 text-left text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Группа критериев
                </TableCell>
                <TableCell
                  isHeader
                  className="w-1/6 py-4 px-6 text-left text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Критерий
                </TableCell>
                <TableCell
                  isHeader
                  className="w-1/12 py-4 px-6 text-center text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Число
                </TableCell>
                <TableCell
                  isHeader
                  className="w-7/12 py-4 px-6 text-left text-sm font-medium text-gray-500"
                  borders={{ bottom: true }}
                >
                  Пояснение
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {group.items.map((item, itemIndex) => (
                <TableRow key={itemIndex}>
                  {itemIndex === 0 ? (
                    <TableCell
                      className="py-4 px-6 align-middle whitespace-nowrap text-sm font-semibold text-gray-900 text-center"
                      rowSpan={group.items.length}
                      borders={{
                        right: true,
                        bottom: itemIndex === group.items.length - 1 ? true : false,
                      }}
                    >
                      {group.name || item.criteriaGroup}
                    </TableCell>
                  ) : null}
                  <TableCell
                    className="py-4 px-6 text-sm text-gray-900"
                    borders={{ right: true, bottom: true }}
                  >
                    <div className="flex items-center">{item.criteria}</div>
                  </TableCell>
                  <TableCell
                    className="py-4 px-6 text-center whitespace-nowrap text-sm"
                    borders={{ right: true, bottom: true }}
                  >
                    <span
                      className={`inline-block min-w-8 px-2 py-1 rounded-full font-medium ${
                        item.score === item.maxScore
                          ? 'text-green-800 bg-green-100'
                          : item.score > item.maxScore / 2
                            ? 'text-yellow-800 bg-yellow-100'
                            : 'text-red-800 bg-red-100'
                      }`}
                    >
                      {item.score}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-sm text-gray-500" borders={{ bottom: true }}>
                    {item.explanation}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50">
                <TableCell
                  colSpan={2}
                  className="py-3 px-6 text-sm font-semibold text-gray-900 align-middle text-center"
                  borders={{ right: true }}
                >
                  ИТОГО ЗА {group.name}
                </TableCell>
                <TableCell
                  className="py-3 px-6 text-center text-sm font-medium text-purple-700"
                  borders={{ right: true }}
                >
                  {group.totalScore}
                </TableCell>
                <TableCell className="py-3 px-6"> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
