import { Block } from '@/entities/checklists/checklists.types';

export interface MediaFileQueryParams {
  createDate: string;
  clientNumber: string;
  operatorId: number;
  projectId: number;
}

export interface CreateMediaFileRequest {
  file: File;
  queryParams: MediaFileQueryParams;
}

export interface MediaFile {
  projectName: string;
  gptChecklist: any;
  gptSummary: string;
  id: number;
  fileName: string | null;
  totalCount: number;
  numChannels: number;
  sampleRate: number;
  duration: number;
  operatorId: number;
  operatorName: string | null;
  operatorChannel: string | null;
  lastAccessUtc: string;
  createDate: string;
  isFailed: boolean;
  additionalMetadata: {
    outerId: string | null;
    clientId: string | null;
    clientNumber: string | null;
    direction: string | null;
  };
  summaryAnalyserResult: {
    simultaneousSpeechCount: number | null;
    simultaneousSilenceCount: number;
    maxSimultaneousSpeechDuration: number | null;
    maxSimultaneousSilenceDuration: number;
    averageSimultaneousSpeechDuration: number | null;
    averageSimultaneousSilenceDuration: number;
    keywordsSearchCounter: {
      [key: string]: number;
    };
    totalSpeechOverall: number;
    totalNonSpeechOverall: number;
    negativeLevelOverall: number;
    totalSpeechDurationOperator: number | null;
    totalNonSpeechDurationOperator: number | null;
    negativeSpeechWeightedDurationOperator: number | null;
    negativeLevelOperator: number | null;
    totalSpeechDurationClient: number | null;
    totalNonSpeechDurationClient: number | null;
    negativeSpeechWeightedDurationClient: number | null;
    negativeLevelClient: number | null;
  };
  filteredKeywordsCount: number;
}

export interface MediaFileResponse {
  totalCount: number;
  mediaFile: MediaFile[];
}

export interface MediaFileRequest {
  start?: string;
  end?: string;
  offset?: number;
  limit?: number;
  operatorId?: number;
  searchPhrase?: string;
  orderByDescOperatorName?: boolean;
  orderByDescCreateDate?: boolean;
  orderByDescClientNumber?: boolean;
  orderByDescDuration?: boolean;
  orderByDescNegativeLevel?: boolean;
  orderByDescPhrasesCount?: boolean;
  orderByDescMaxSimultaneousSilence?: boolean;
  orderByDescSimultaneousSpeechCount?: boolean;
  filterByPhrasesCategoriesCommaSeparated?: string;
}

// export interface MediaFileResultResponse {
//   gptSummary: string | null
//   gptChecklist: string | null
//   stt: {
//     text: string | null
//     chunks: {
//       channel: number
//       startChar: number
//       endChar: number
//       startTime: number
//       endTime: number
//       text: string
//       regions: {
//         channel: number
//         startChar: number
//         endChar: number
//         startTime: number
//         endTime: number
//       }[]
//     }[]
//     regions: any[]
//   }
//   tonal: {
//     regions: {
//       prob: number
//       type: number
//       startTime: number
//       endTime: number
//       channel: number
//     }[]
//   }
//   simultaneousSpeech: {
//     regions: {
//       actorByChannel: number
//       actor: number
//       startTime: number
//       endTime: number
//     }[]
//   }
//   simultaneousSilence: {
//     regions: {
//       startTime: number
//       endTime: number
//     }[]
//   }
//   keywordsSearchResult: {
//     regions: {
//       phrase: any
//       category: number
//       startChar: number
//       endChar: number
//       startTime: number
//       endTime: number
//       channel: number
//     }[]
//   }
// }

export interface MediaFileResultResponse {
  gptSummary: string | null;
  gptChecklist: GptChecklist | null;
  stt: Stt | null;
  tonal: Tonal | null;
  simultaneousSpeech: SimultaneousSpeech | null;
  simultaneousSilence: SimultaneousSilence | null;
  keywordsSearchResult: KeywordsSearchResult | null;
}

export interface GptChecklist {
  collection: ChecklistItem[];
}

export interface ChecklistItem {
  id?: number;
  name: string | null;
  minScore: number;
  maxScore: number;
  score: number | null;
  blocks: Block[];
}

export interface Stt {
  text: string | null;
  chunks: SttChunk[] | null;
  regions: SttRegion[] | null;
}

export interface SttChunk {
  channel: number;
  startChar: number;
  endChar: number;
  startTime: number;
  endTime: number;
  text: string;
  regions: SttRegion[];
}

export interface SttRegion {
  channel: number;
  startChar: number;
  endChar: number;
  startTime: number;
  endTime: number;
}

export interface Tonal {
  regions: TonalRegion[] | null;
}

export interface TonalRegion {
  prob: number;
  type: number;
  startTime: number;
  endTime: number;
  channel: number;
}

export interface SimultaneousSpeech {
  regions: SimultaneousSpeechRegion[] | null;
}

export interface SimultaneousSpeechRegion {
  actorByChannel: number | null;
  actor: number;
  startTime: number;
  endTime: number;
}

export interface SimultaneousSilence {
  regions: SimultaneousSilenceRegion[] | null;
}

export interface SimultaneousSilenceRegion {
  startTime: number;
  endTime: number;
}

export interface KeywordsSearchResult {
  regions: KeywordRegion[] | null;
}

export interface KeywordRegion {
  category: number;
  categoryName: string | null;
  phrase: string | null;
  startChar: number;
  endChar: number;
  startTime: number;
  endTime: number;
  channel: number;
}

export interface MediaFileResultRequest {
  id: number;
  negativeProbThreshold?: number;
  simultaneousSilenceDurationThreshold?: number;
}
