'use client'

import React, { useEffect, useState, useRef } from 'react'

export type MessageType = {
  text: string
  sender: 'customer' | 'agent'
  time: string
  startTime: number
  endTime: number
  id: string
}

interface STTChunk {
  channel: number
  startChar: number
  endChar: number
  startTime: number
  endTime: number
  text: string
  regions?: {
    channel: number
    startChar: number
    endChar: number
    startTime: number
    endTime: number
  }[]
}

interface STTData {
  text: string | null
  chunks: STTChunk[]
}

interface TranscriptProps {
  sttData?: STTData
  currentPlayerTime?: number
}

export const processSTTData = (sttData: STTData): MessageType[] => {
  if (!sttData || !sttData.chunks || sttData.chunks.length === 0) {
    return []
  }

  const hasChannel0 = sttData.chunks.some(chunk => chunk.channel === 0)
  const hasChannel1 = sttData.chunks.some(chunk => chunk.channel === 1)
  const isConversation = hasChannel0 && hasChannel1

  const messages: MessageType[] = []
  let currentMessage: MessageType | null = null

  sttData.chunks.forEach((chunk, index) => {
    const minutes = Math.floor(chunk.startTime / 60)
    const seconds = Math.floor(chunk.startTime % 60)
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const sender = isConversation ? (chunk.channel === 0 ? 'customer' : 'agent') : 'customer'

    const shouldCombineWithPrevious =
      currentMessage &&
      currentMessage.sender === sender &&
      Math.abs(currentMessage.endTime - chunk.startTime) < 2

    if (shouldCombineWithPrevious && currentMessage) {
      currentMessage.text += ' ' + chunk.text.trim()
      currentMessage.endTime = chunk.endTime
    } else {
      currentMessage = {
        text: chunk.text.trim(),
        sender,
        time: formattedTime,
        startTime: chunk.startTime,
        endTime: chunk.endTime,
        id: `message-${index}-${Date.now()}`,
      }
      messages.push(currentMessage)
    }
  })

  return messages
}

export const Transcript: React.FC<TranscriptProps> = ({ sttData, currentPlayerTime = 0 }) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    if (sttData) {
      const processedMessages = processSTTData(sttData)
      setMessages(processedMessages)
    }
  }, [sttData])

  useEffect(() => {
    if (!messages.length || currentPlayerTime === undefined) return

    const activeMessage = messages.find(
      message => currentPlayerTime >= message.startTime && currentPlayerTime <= message.endTime
    )

    if (activeMessage) {
      setActiveMessageId(activeMessage.id)

      const messageElement = messageRefs.current[activeMessage.id]
      if (messageElement && containerRef.current) {
        messageElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    } else {
      setActiveMessageId(null)
    }
  }, [currentPlayerTime, messages])

  return (
    <div ref={containerRef} className="h-[530px] overflow-y-auto">
      <div className="flex flex-col gap-6 p-4">
        {messages.map(message => (
          <div
            key={message.id}
            ref={el => {
              messageRefs.current[message.id] = el
            }}
            className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'} 
                       transition-opacity duration-300 ${activeMessageId === message.id ? 'opacity-200' : 'opacity-200'}`}
          >
            <div
              className={`max-w-md ${activeMessageId === message.id ? 'transform transition-transform duration-300 scale-102' : ''}`}
            >
              <div
                className={`py-2 px-4 rounded-2xl ${
                  message.sender === 'agent'
                    ? 'bg-purple-700 text-white'
                    : 'bg-purple-100 text-purple-900'
                } ${activeMessageId === message.id ? 'ring-2 ring-purple-400' : ''}`}
              >
                <p>{message.text}</p>
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === 'agent' ? 'text-right' : 'text-left'
                }`}
              >
                {message.sender === 'agent'
                  ? `Оператор, ${message.time}`
                  : `Абонент, ${message.time}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
