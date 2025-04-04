'use client'

import React from 'react'

export type MessageType = {
  text: string
  sender: 'customer' | 'agent'
  time: string
}

interface TranscriptProps {
  messages: MessageType[]
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="max-w-md">
            <div
              className={`py-2 px-4 rounded-2xl ${
                message.sender === 'agent'
                  ? 'bg-purple-700 text-white'
                  : 'bg-purple-100 text-purple-900'
              }`}
            >
              <p>{message.text}</p>
            </div>
            <div
              className={`text-xs text-gray-500 mt-1 ${
                message.sender === 'agent' ? 'text-right' : 'text-left'
              }`}
            >
              {message.sender === 'agent'
                ? `Lindsay Curtis, ${message.time}`
                : `Абонент, ${message.time}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
