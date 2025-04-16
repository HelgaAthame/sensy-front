export interface MediaFileQueryParams {
  createDate: string
  clientNumber: string
  operatorName: string
  projectName: string
}

export interface CreateMediaFileRequest {
  file: File
  queryParams: MediaFileQueryParams
}

export interface MediaFile {
  id: number
  fileName: string | null
  totalCount: number
  numChannels: number
  sampleRate: number
  duration: number
  operatorId: number
  operatorName: string | null
  operatorChannel: string | null
  lastAccessUtc: string
  createDate: string
  isFailed: boolean
  additionalMetadata: {
    outerId: string | null
    clientId: string | null
    clientNumber: string | null
    direction: string | null
  }
  summaryAnalyserResult: {
    simultaneousSpeechCount: number | null
    simultaneousSilenceCount: number
    maxSimultaneousSpeechDuration: number | null
    maxSimultaneousSilenceDuration: number
    averageSimultaneousSpeechDuration: number | null
    averageSimultaneousSilenceDuration: number
    keywordsSearchCounter: {
      [key: string]: number
    }
    totalSpeechOverall: number
    totalNonSpeechOverall: number
    negativeLevelOverall: number
    totalSpeechDurationOperator: number | null
    totalNonSpeechDurationOperator: number | null
    negativeSpeechWeightedDurationOperator: number | null
    negativeLevelOperator: number | null
    totalSpeechDurationClient: number | null
    totalNonSpeechDurationClient: number | null
    negativeSpeechWeightedDurationClient: number | null
    negativeLevelClient: number | null
  }
  filteredKeywordsCount: number
}

export interface MediaFileResponse {
  totalCount: number
  mediaFile: MediaFile[]
}

export interface MediaFileRequest {
  start?: string
  end?: string
  offset?: number
  limit?: number
  operatorId?: number
  searchPhrase?: string
  orderByDescOperatorName?: boolean
  orderByDescCreateDate?: boolean
  orderByDescClientNumber?: boolean
  orderByDescDuration?: boolean
  orderByDescNegativeLevel?: boolean
  orderByDescPhrasesCount?: boolean
  orderByDescMaxSimultaneousSilence?: boolean
  orderByDescSimultaneousSpeechCount?: boolean
  filterByPhrasesCategoriesCommaSeparated?: string
}

export interface MediaFileResultResponse {
  gptSummary: string | null
  gptChecklist: string | null
  stt: {
    text: string | null
    chunks: {
      channel: number
      startChar: number
      endChar: number
      startTime: number
      endTime: number
      text: string
      regions: {
        channel: number
        startChar: number
        endChar: number
        startTime: number
        endTime: number
      }[]
    }[]
    regions: any[]
  }
  tonal: {
    regions: {
      prob: number
      type: number
      startTime: number
      endTime: number
      channel: number
    }[]
  }
  simultaneousSpeech: {
    regions: {
      actorByChannel: number
      actor: number
      startTime: number
      endTime: number
    }[]
  }
  simultaneousSilence: {
    regions: {
      startTime: number
      endTime: number
    }[]
  }
  keywordsSearchResult: {
    regions: {
      category: number
      startChar: number
      endChar: number
      startTime: number
      endTime: number
      channel: number
    }[]
  }
}

export interface MediaFileResultRequest {
  id: number
  negativeProbThreshold?: number
  simultaneousSilenceDurationThreshold?: number
}
