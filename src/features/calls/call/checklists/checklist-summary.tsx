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
  defaultMaxScore?: number
}

export const ChecklistSummary: React.FC<ChecklistSummaryProps> = ({
  checklist,
  defaultMaxScore = 5,
}) => {
  const parsedItems = useMemo(() => {
    if (!checklist) return []

    const items: ChecklistSummaryItem[] = []
    const lines = checklist.split('\n').filter(line => line.trim())

    lines.forEach(line => {
      const withoutNumber = line.replace(/^\d+\.\s*/, '')

      const parts = withoutNumber.split(':')

      if (parts.length >= 2) {
        const title = parts[0].replace(/\*\*/g, '').trim()
        const valueAndDescription = parts.slice(1).join(':').trim()

        let score
        let maxScore = defaultMaxScore
        let description = ''

        const fractionMatch = valueAndDescription.match(/(\d+)\/(\d+)(?:\s+\(([^)]+)\))?/)

        if (fractionMatch) {
          score = parseInt(fractionMatch[1])
          maxScore = parseInt(fractionMatch[2])
          description = fractionMatch[3] ? fractionMatch[3].trim() : ''
        } else {
          const simpleMatch = valueAndDescription.match(/(\d+)(?:\s+\(([^)]+)\))?/)

          if (simpleMatch) {
            score = parseInt(simpleMatch[1])
            description = simpleMatch[2] ? simpleMatch[2].trim() : ''
          } else {
            const numberMatch = valueAndDescription.match(/(\d+)/)
            if (numberMatch) {
              score = parseInt(numberMatch[1])

              const descMatch = valueAndDescription.match(/\(([^)]+)\)/)
              description = descMatch ? descMatch[1].trim() : ''
            } else {
              return
            }
          }
        }

        items.push({
          title,
          score,
          maxScore,
          description,
          percentage: (score / maxScore) * 100,
        })
      }
    })

    return items.sort((a, b) => b.percentage - a.percentage)
  }, [checklist, defaultMaxScore])

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
