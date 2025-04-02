export interface KeywordsFrequencyData {
  [keyword: string]: number
}

export interface PlotDataItem {
  dateTime: string
  recordsCount: number
  averageDuration: number
  averageNegativeLevel: number
  negativeKeywordsCount: number
  maxSilenceDuration: number
  simultaneousSpeechCount: number
}

export interface NegativeHistogramData {
  [level: string]: number
}

export interface SummaryData {
  recordsCount: number
  averageDuration: number
  averageNegativeLevelOverall: number
  averageKeywordsCount: number
  averageMaxSimultaneousSilenceDuration: number
  averageSimultaneousSpeechCount: number
}

export interface OperatorRatingDataItem {
  operatorName: string | null
  recordsCount: number
  averageDuration: number
  averageNegativeLevelOverall: number
  averageKeywordsCount: number
  averageMaxSimultaneousSilenceDuration: number
  averageSimultaneousSpeechCount: number
}

export interface AnalyticsDashboardResponse {
  keywordsFrequencyData: KeywordsFrequencyData
  messageText: string
  plotData: PlotDataItem[]
  negativeHistogramData: NegativeHistogramData
  summaryData: SummaryData
  operatorRatingData: OperatorRatingDataItem[]
}

export interface AnalyticsDashboardQueryParams {
  startDate?: string
  endDate?: string
  operatorId?: string
}
