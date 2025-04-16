'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tab } from '@/shared/ui/tab/tab'
import PageBreadcrumb from '@/shared/ui/page-breadcrumb/page-breadcrumb'
import { Transcript } from './transcript/transcript'
import { Checklist, ChecklistGroup } from '@/features/calls/call/checklists/checklists'
import { Summary } from '@/features/calls/call/summary/summary'
import {
  useGetMediaFileByIdQuery,
  useGetMediaFileResultQuery,
} from '@/entities/mediafile/api/mediafile.api'
import { useParams } from 'next/navigation'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions'
import { getFromLocalStorage } from '@/shared/utils/common-utils'
import { formatDates } from '@/shared/utils/date-utils'
import './call.css'
import { appRoutes } from '@/shared/constants/routes'
import { LoaderContent } from '@/shared/ui/loader'

enum CallTab {
  Transcript = 'transcript',
  Summary = 'summary',
  Checklists = 'checklists',
}

type TabItem = {
  name: string
  key: string
}

type AudioIndicator = {
  type: string
  color: string
  regions?: {
    start: number
    end: number
    channel?: number
    actorByChannel?: number
  }[]
}

export const Call = () => {
  const params = useParams()
  const id = Number(params.id)
  const token = getFromLocalStorage('accessToken', null)
  const [isAudioLoading, setIsAudioLoading] = useState(true)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const regionsPluginRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [wavesurferReady, setWavesurferReady] = useState(false)
  const regionsAddedRef = useRef(false)

  const { data: mediaFileById, isLoading } = useGetMediaFileByIdQuery({ id })

  const { data: mediaFileResult } = useGetMediaFileResultQuery({
    id,
    negativeProbThreshold: 0,
    simultaneousSilenceDurationThreshold: 5,
  })

  const [activeTab, setActiveTab] = useState(CallTab.Transcript)
  const [playbackRate, setPlaybackRate] = useState('1x')

  const audioIndicators: AudioIndicator[] = useMemo(() => {
    return [
      {
        type: 'Негатив',
        color: 'bg-red-400',
        regions:
          mediaFileResult?.tonal?.regions
            ?.filter(region => region.type === 1)
            ?.map(region => ({
              start: region.startTime,
              end: region.endTime,
              channel: region.channel,
            })) || [],
      },
      {
        type: 'Лексика',
        color: 'bg-blue-400',
        regions:
          mediaFileResult?.keywordsSearchResult?.regions?.map(region => ({
            start: region.startTime,
            end: region.endTime,
            channel: region.channel !== undefined ? region.channel : 0,
          })) || [],
      },
      {
        type: 'Паузы',
        color: 'bg-yellow-400',
        regions:
          mediaFileResult?.simultaneousSilence?.regions?.map(region => ({
            start: region.startTime,
            end: region.endTime,
          })) || [],
      },
      {
        type: 'Перебивания',
        color: 'bg-red-500',
        regions:
          mediaFileResult?.simultaneousSpeech?.regions?.map(region => ({
            start: region.startTime,
            end: region.endTime,
            channel: region.actorByChannel !== undefined ? region.actorByChannel : 0,
          })) || [],
      },
    ]
  }, [mediaFileResult])

  const numChannels = mediaFileById?.numChannels ?? 0
  const hasMultipleChannels = numChannels > 1

  const createRegions = useCallback(() => {
    if (!wavesurferRef.current || !regionsPluginRef.current || regionsAddedRef.current) return

    regionsPluginRef.current.clearRegions()

    audioIndicators.forEach(indicator => {
      if (!indicator.regions) return

      indicator.regions.forEach(region => {
        const isCircleMarker = indicator.type === 'Перебивания' || indicator.type === 'Лексика'
        let actualColor

        switch (indicator.color) {
          case 'bg-red-400':
            actualColor = '#ff6467' // Более заметный красный для негатива
            break
          case 'bg-blue-400':
            actualColor = '#639fe5' // Более заметный синий для лексики
            break
          case 'bg-yellow-400':
            actualColor = '#fce8c0' // Желтый для пауз
            break
          case 'bg-red-500':
            actualColor = '#fb2c36' // Зеленоватый для перебиваний
            break
          default:
            actualColor = 'rgba(107, 33, 168, 0.5)' // Фиолетовый по умолчанию
        }

        if (isCircleMarker) {
          const regionId = `marker-${indicator.type}-${region.start}-${region.channel || 0}`

          const markerRegion = regionsPluginRef.current.addRegion({
            id: regionId,
            start: region.start,
            end: region.start + 0.01,
            color: 'rgba(0,0,0,0)',
            drag: false,
            resize: false,
            channelIdx: region.channel,
            channel: region.channel,
            markerType: indicator.type,
          })

          if (markerRegion && markerRegion.element) {
            markerRegion.element.style.zIndex = '100'

            const circle = document.createElement('div')
            circle.className = 'marker-circle'
            circle.style.position = 'absolute'
            circle.style.width = '15px'
            circle.style.height = '15px'
            circle.style.border = '1px solid rgba(0, 0, 0, 0.3)'
            circle.style.borderRadius = '50%'
            circle.style.backgroundColor = actualColor
            circle.style.top = '50%'
            circle.style.left = '0'
            circle.style.transform = 'translate(-50%, -50%)'
            circle.setAttribute(
              'style',
              circle.getAttribute('style') + '; z-index: 100 !important;'
            )

            markerRegion.setContent(circle)
          }
        } else {
          regionsPluginRef.current.addRegion({
            start: region.start,
            end: region.end,
            color: actualColor,
            drag: false,
            resize: false,
            channelIdx: region.channel,
            channel: region.channel,
          })
        }
      })
    })

    regionsAddedRef.current = true
  }, [audioIndicators])

  useEffect(() => {
    if (!containerRef.current || !mediaFileById) return

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy()
      regionsAddedRef.current = false
    }

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#5A2D76',
      progressColor: 'bg-gray-500',
      height: hasMultipleChannels ? 80 : 64,
      cursorColor: '#6B21A8',
      splitChannels: hasMultipleChannels ? new Array(numChannels).fill({}) : undefined,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      normalize: true,
      fetchParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    wavesurferRef.current = wavesurfer
    regionsPluginRef.current = wavesurfer.registerPlugin(RegionsPlugin.create())

    regionsPluginRef.current.regionsContainer.style.position = 'static'

    const audioUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}api/mediafile/${mediaFileById.id}/stream`

    // wavesurfer.load(audioUrl)
    fetch(audioUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки аудио')
        return response.blob()
      })
      .then(blob => {
        wavesurfer.loadBlob(blob)
      })
      .catch(error => {
        console.error('Ошибка при загрузке аудио:', error)
      })

    wavesurfer.on('loading', percent => {
      setIsAudioLoading(true)
    })

    wavesurfer.on('ready', () => {
      setDuration(wavesurfer.getDuration())
      setIsAudioLoading(false)
      setWavesurferReady(true)
    })

    wavesurfer.on('audioprocess', () => {
      const time = wavesurfer.getCurrentTime()
      setCurrentTime(prevTime => {
        if (Math.abs(prevTime - time) > 0.1) {
          return time
        }
        return prevTime
      })
    })

    wavesurfer.on('seeking', () => {
      setCurrentTime(wavesurfer.getCurrentTime())
    })

    wavesurfer.on('play', () => {
      setIsPlaying(true)
    })

    wavesurfer.on('pause', () => {
      setIsPlaying(false)
    })

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy()
      }
    }
  }, [mediaFileById, hasMultipleChannels, numChannels])

  useEffect(() => {
    if (wavesurferReady && mediaFileResult && !regionsAddedRef.current) {
      createRegions()
    }
  }, [wavesurferReady, mediaFileResult])

  useEffect(() => {
    if (wavesurferRef.current) {
      const rate = parseFloat(playbackRate.replace('x', ''))
      wavesurferRef.current.setPlaybackRate(rate)
    }
  }, [playbackRate])

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
  }

  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds)) return '00:00'

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const tabs: TabItem[] = [
    { name: 'Расшифровка', key: CallTab.Transcript },
    { name: 'Резюме', key: CallTab.Summary },
    { name: 'Чек-листы', key: CallTab.Checklists },
  ]

  const handleTabChange = (tab: TabItem) => {
    setActiveTab(tab.key as CallTab)
  }

  const callInfo = {
    name: mediaFileById?.operatorName || 'Lindsay Curtis',
    phone: mediaFileById?.additionalMetadata?.clientNumber || '+123 (45) 678-91-01',
    date: formatDates(mediaFileById?.createDate ? new Date(mediaFileById.createDate) : null),
    duration: `${formatTime(currentTime)} / ${formatTime(duration)}`,
  }

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

  const summaryContent =
    mediaFileResult?.gptSummary ||
    `В рамках спецификации современных стандартов, непосредственные участники технического прогресса представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть описаны максимально подробно.`

  if (isLoading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <LoaderContent width={200} height={200} isLoading={isLoading} />
      </div>
    )
  }

  return (
    <div className="p-4 min-h-screen">
      <PageBreadcrumb
        pageTitle={callInfo.name}
        backTitle="Звонки"
        backHref={appRoutes.private.calls}
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-medium">
              {callInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <>
                <p className="font-medium">{callInfo.name}</p>
                <p className="text-gray-500 text-sm">{callInfo.phone}</p>
              </>
            </div>
          </div>
          <div className="text-gray-500 text-sm">{callInfo.date}</div>
        </div>

        <div
          className={`bg-purple-50 rounded-xl p-4 mb-4 relative ${hasMultipleChannels ? 'h-48' : 'h-24'}`}
        >
          {!isAudioLoading && (
            <button
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-purple-200 rounded-full cursor-pointer flex items-center justify-center ${isPlaying ? 'text-purple-700' : ''}`}
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="4" height="10" rx="1" fill="currentColor" />
                  <rect x="8" y="2" width="4" height="10" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2L12 7L3 12V2Z" fill="currentColor" />
                </svg>
              )}
            </button>
          )}

          <div
            className={`wavesurfer-container ml-10 ${hasMultipleChannels ? 'h-40' : 'h-24'}`}
            ref={containerRef}
            id="waveform"
          >
            {isAudioLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
              </div>
            )}
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
                className={`text-sm px-2 py-1 rounded cursor-pointer ${
                  playbackRate === rate ? 'text-purple-700 font-medium' : 'text-gray-500'
                }`}
                onClick={() => setPlaybackRate(rate)}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-start">
          <Tab items={tabs} onChange={handleTabChange} />
        </div>

        <div className="-mx-6">
          <hr className="my-5 border-gray-200" />
        </div>

        <div>
          {activeTab === CallTab.Summary && <Summary content={summaryContent} />}
          {activeTab === CallTab.Transcript && (
            <Transcript sttData={mediaFileResult?.stt} currentPlayerTime={currentTime} />
          )}
          {activeTab === CallTab.Checklists && (
            <Checklist checklistData={checklistData} gptChecklist={mediaFileResult?.gptChecklist} />
          )}
        </div>
      </div>
    </div>
  )
}
