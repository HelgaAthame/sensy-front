'use client'

import React, { useEffect, useState } from 'react'
import { Tab } from '@/shared/tab/tab'
import PageBreadcrumb from '@/shared/page-breadcrumb/page-breadcrumb'
import { MessageType, Transcript } from '@/features/calls/call/transcript/transcript'
import { Checklist, ChecklistGroup } from '@/features/calls/call/checklists/checklists'
import { Summary } from '@/features/calls/call/summary/summary'

enum CallTab {
  Transcript = 'transcript',
  Summary = 'summary',
  Checklists = 'checklists',
}

type TabItem = {
  name: string
  key: string
}

export const Call = () => {
  const [activeTab, setActiveTab] = useState(CallTab.Transcript)
  const [playbackRate, setPlaybackRate] = useState('1x')
  const [randomHeights, setRandomHeights] = useState<number[]>([])

  useEffect(() => {
    const heights = Array.from({ length: 100 }).map(() => 20 + Math.random() * 40)
    setRandomHeights(heights)
  }, [])

  const tabs: TabItem[] = [
    { name: 'Расшифровка', key: CallTab.Transcript },
    { name: 'Резюме', key: CallTab.Summary },
    { name: 'Чеклисты', key: CallTab.Checklists },
  ]

  const handleTabChange = (tab: TabItem) => {
    setActiveTab(tab.key as CallTab)
  }

  const callInfo = {
    name: 'Lindsay Curtis',
    phone: '+123 (45) 678-91-01',
    date: '22.03.2025',
    duration: '02:57 / 22:15',
  }

  const audioIndicators = [
    { type: 'Негатив', color: 'bg-red-400' },
    { type: 'Лексика', color: 'bg-blue-400' },
    { type: 'Паузы', color: 'bg-yellow-400' },
    { type: 'Перебивания', color: 'bg-red-500' },
  ]

  const transcriptMessages: MessageType[] = [
    {
      text: "If don't like something, I'll stay away from it.",
      sender: 'customer',
      time: '00:00',
    },
    {
      text: "If don't like something, I'll stay away from it.",
      sender: 'agent',
      time: '00:21',
    },
    {
      text: 'I want more detailed information.',
      sender: 'customer',
      time: '00:35',
    },
    {
      text: "If don't like something, I'll stay away from it.",
      sender: 'agent',
      time: '05:21',
    },
    {
      text: 'They got there early, and got really good seats.',
      sender: 'agent',
      time: '05:21',
    },
    {
      text: 'Please preview the image',
      sender: 'customer',
      time: '07:41',
    },
  ]

  const generateChecklistData = (): ChecklistGroup[] => {
    const baseGroup = {
      name: 'ВЕДЕНИЕ РАЗГОВОРА',
      items: [
        {
          criteriaGroup: 'ВЕДЕНИЕ РАЗГОВОРА',
          criteria: 'Корректность приветствия',
          score: 5,
          maxScore: 5,
          explanation:
            'Оператор корректно поприветствовал клиента фразой «Добрый день», упомянул свое имя, а также название call-центра',
        },
        {
          criteriaGroup: 'ВЕДЕНИЕ РАЗГОВОРА',
          criteria: 'Вежливость',
          score: 10,
          maxScore: 10,
          explanation:
            'В голосе оператора отсутствовали негативные интонации. Лексика оператора подчеркивала уважительное отношение к клиенту.',
        },
        {
          criteriaGroup: 'ВЕДЕНИЕ РАЗГОВОРА',
          criteria: 'Грамотность речи',
          score: 15,
          maxScore: 15,
          explanation:
            'Оператор не допустил ошибок в произношении или построении речевых конструкций',
        },
        {
          criteriaGroup: 'ВЕДЕНИЕ РАЗГОВОРА',
          criteria: 'Корректность завершения разговора',
          score: 5,
          maxScore: 5,
          explanation:
            'Оператор пожелал клиенту хорошего дня, а также обозначил готовность помогать и в будущем',
        },
      ],
      totalScore: 35,
      maxTotalScore: 35,
    }

    const secondGroup = JSON.parse(JSON.stringify(baseGroup))
    return [baseGroup, secondGroup]
  }

  const checklistData = generateChecklistData()
  const playbackRates = ['1x', '1.25x', '1.5x']

  const summaryContent = `В рамках спецификации современных стандартов, непосредственные участники технического прогресса представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть описаны максимально подробно. Есть над чем задуматься: явления, рассмотренные исключительно в разрезе маркетинговых и финансовых предпосылок, ограничены исключительно образом мышления, при которой перспективные подготовки выбирают популярные продукты, тем самым, должны быть преданы социально-демократической анафеме. Приятно, граждане, наблюдать, как многие известные личности, превозмогая сложившуюся непростую экономическую ситуацию, объективно рассмотрены соответствующими инстанциями. Значимость этих проблем настолько очевидна, что социально-экономическое развитие не оставляет шанса для модернизации. Господа, сплочённость команды профессионалов гарантирует процесс внедрения и модернизации направлений развития. В рамках спецификации современных стандартов, тщательные исследования конкурентов формируют глобальную экономическую сеть и при этом — предприняты целой серией независимых исследований. Учитывая ключевые сценарии поведения, дальнейшее развитие различных форм деятельности позволяет оценить значение существующих финансовых и административных условий. Следует отметить, что глубокий уровень погружения, в своём классическом представлении, допускает внедрение как самодостаточных, так и внешне зависимых концептуальных решений. С учётом сложившейся международной обстановки, существующая теория, вопреки классическим представлениям, допускает внедрение позиций, занимаемых участниками в отношении поставленных задач. Ясность нашей позиции очевидна: укрепление и развитие внутренней.`

  return (
    <div className="p-4 min-h-screen">
      <PageBreadcrumb pageTitle="Звонок" />

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold">
              L
            </div>
            <div className="ml-4">
              <p className="font-medium">{callInfo.name}</p>
              <p className="text-gray-500 text-sm">{callInfo.phone}</p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">{callInfo.date}</div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 mb-4 relative">
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="4" height="10" rx="1" fill="#6B21A8" />
              <rect x="8" y="2" width="4" height="10" rx="1" fill="#6B21A8" />
            </svg>
          </button>

          <div className="h-16 mx-10">
            <svg width="100%" height="100%" viewBox="0 0 600 80" preserveAspectRatio="none">
              {randomHeights.map((height, i) => {
                let color = '#9370DB'
                if (i > 20 && i < 30) color = '#FF6B6B'
                else if (i > 40 && i < 60) color = '#7CB9E8'
                else if (i > 70 && i < 80) color = '#FFD700'

                return (
                  <rect
                    key={i}
                    x={i * 6}
                    y={(80 - height) / 2}
                    width="4"
                    height={height}
                    fill={color}
                    opacity="0.7"
                  />
                )
              })}
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600 text-sm">{callInfo.duration}</div>

          <div className="flex gap-5 text-sm">
            {audioIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${indicator.color} mr-2`}></div>
                <span className="text-gray-600">{indicator.type}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {playbackRates.map(rate => (
              <button
                key={rate}
                className={`text-sm px-2 py-1 rounded ${
                  playbackRate === rate ? 'text-purple-700 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setPlaybackRate(rate)}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-start items-center">
          <Tab items={tabs} onChange={handleTabChange} />
        </div>

        <div className="-mx-6">
          <hr className="my-5 border-gray-200" />
        </div>

        <div>
          {activeTab === CallTab.Summary && <Summary content={summaryContent} />}
          {activeTab === CallTab.Transcript && <Transcript messages={transcriptMessages} />}
          {activeTab === CallTab.Checklists && <Checklist checklistData={checklistData} />}
        </div>
      </div>
    </div>
  )
}
