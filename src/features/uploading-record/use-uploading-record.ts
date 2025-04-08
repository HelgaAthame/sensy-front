import { z } from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = ['audio/mpeg', 'audio/wav']

const FileSchema =
  typeof window !== 'undefined'
    ? z
        .instanceof(File)
        .refine(file => file.size <= MAX_FILE_SIZE, {
          message: 'Превышен допустимый размер файла (макс. 10MB)',
        })
        .refine(file => ALLOWED_FILE_TYPES.includes(file.type), {
          message: 'Неверный формат файла. Разрешены: MP3, WAV',
        })
    : z.any()

export const MediaFileSchema = z.object({
  clientNumber: z.string().min(1, { message: 'clientNumber обязателен' }),
  operatorName: z.string().min(1, { message: 'operatorName обязателен' }),
  projectName: z.string().min(1, { message: 'projectName обязателен' }),
  file: FileSchema,
})

export type MediaFileData = z.infer<typeof MediaFileSchema>
