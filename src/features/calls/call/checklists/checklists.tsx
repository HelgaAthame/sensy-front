'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/shared/table/table'

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
}

export const Checklist: React.FC<ChecklistProps> = ({ checklistData }) => {
  return (
    <div className="text-gray-700 space-y-8">
      {checklistData.map((group, groupIndex) => (
        <div key={groupIndex} className="border border-gray-200 rounded-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableCell
                  isHeader
                  className="w-1/6 text-left text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Группа критериев
                </TableCell>
                <TableCell
                  isHeader
                  className="w-1/6 text-left text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Критерий
                </TableCell>
                <TableCell
                  isHeader
                  className="w-1/12 text-center text-sm font-medium text-gray-500"
                  borders={{ right: true, bottom: true }}
                >
                  Число
                </TableCell>
                <TableCell
                  isHeader
                  className="w-7/12 text-left text-sm font-medium text-gray-500"
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
                      className="whitespace-nowrap text-sm font-medium text-gray-900 align-top"
                      rowSpan={group.items.length}
                      borders={{ right: true, bottom: true }}
                    >
                      {group.name || item.criteriaGroup}
                    </TableCell>
                  ) : null}
                  <TableCell
                    className="text-sm text-gray-900"
                    borders={{ right: true, bottom: true }}
                  >
                    <div className="flex items-center">
                      {item.criteria}
                      <button className="ml-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.3335 2.33398C11.5086 2.15885 11.7163 2.02025 11.9452 1.92712C12.1741 1.83399 12.4198 1.78772 12.6668 1.78998C12.9139 1.78772 13.1595 1.83399 13.3884 1.92712C13.6173 2.02025 13.825 2.15885 14.0002 2.33398C14.1753 2.50911 14.3139 2.7168 14.407 2.9457C14.5002 3.1746 14.5464 3.4203 14.5441 3.66731C14.5464 3.91433 14.5002 4.16003 14.407 4.38893C14.3139 4.61783 14.1753 4.82552 14.0002 5.00065L5.00016 14.0006L1.3335 14.6673L2.00016 11.0006L11.0002 2.00065L11.3335 2.33398Z"
                            stroke="#6B7280"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                  <TableCell
                    className="text-center whitespace-nowrap text-sm"
                    borders={{ right: true, bottom: true }}
                  >
                    <span
                      className={`inline-block px-2 py-1 rounded-full font-medium ${
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
                  <TableCell className="text-sm text-gray-500" borders={{ bottom: true }}>
                    {item.explanation}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-sm font-medium text-gray-900"
                  borders={{ right: true }}
                >
                  ИТОГО ЗА {group.name}
                </TableCell>
                <TableCell
                  className="text-center text-sm font-medium text-purple-700"
                  borders={{ right: true }}
                >
                  {group.totalScore}
                </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
