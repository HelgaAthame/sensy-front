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

// Оставляем ответ без изменений
export interface MediaFileResponse {
  id: string
  clientNumber: string
  operatorName: string
  projectName: string
  fileUrl: string
  createdAt: string
  updatedAt: string
}
