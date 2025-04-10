'use client'

import React, { useMemo } from 'react'

type ChecklistSummaryItem = {
  title: string
  score: number
  maxScore: number
  description: string
  percentage: number
}

interface ChecklistSummaryProps {
  checklist: string | null
}

export const ChecklistSummary: React.FC<ChecklistSummaryProps> = ({ checklist }) => {
  const parsedItems = useMemo(() => {
    if (!checklist) return []

    const items: ChecklistSummaryItem[] = []
    const lines = checklist.split('\n')

    lines.forEach(line => {
      let match = line.match(/\d+\.\s+\*\*([^*]+)\*\*:\s+(\d+)\/(\d+)\s+\(([^)]+)\)/)

      if (!match) {
        match = line.match(/\d+\.\s+([^:]+):\s+(\d+)\/(\d+)(?:\s+\(([^)]+)\))?/)
      }

      if (match) {
        const score = parseInt(match[2])
        const maxScore = parseInt(match[3])
        const description = match[4] ? match[4].trim() : ''

        items.push({
          title: match[1].trim(),
          score: score,
          maxScore: maxScore,
          description: description,
          percentage: (score / maxScore) * 100,
        })
      }
    })

    return items.sort((a, b) => b.percentage - a.percentage)
  }, [checklist])

  const totalScore = useMemo(
    () => parsedItems.reduce((sum, item) => sum + item.score, 0),
    [parsedItems]
  )

  const maxTotalScore = useMemo(
    () => parsedItems.reduce((sum, item) => sum + item.maxScore, 0),
    [parsedItems]
  )

  const scorePercentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0

  const getScoreColor = (score: number, maxScore: number) => {
    const percent = (score / maxScore) * 100
    if (percent >= 80) return 'bg-green-100 text-green-800'
    if (percent >= 50) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  if (!checklist || parsedItems.length === 0) {
    return null
  }

  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-purple-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-purple-800">Сводка по чеклисту</h3>
          <div className="flex items-center">
            <div className="mr-3 font-medium text-sm">
              Общий балл: {totalScore}/{maxTotalScore}
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  scorePercentage >= 80
                    ? 'bg-green-500'
                    : scorePercentage >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {parsedItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded p-3 bg-white">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium text-sm">{item.title}</div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScoreColor(item.score, item.maxScore)}`}
              >
                {item.score}/{item.maxScore}
              </span>
            </div>
            {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
