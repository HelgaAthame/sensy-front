'use client'
import ComponentCard from '@/shared/component-card/component-card'
import Form from '@/shared/form/form'
import Button from '@/shared/button/button'
import DatePicker from '@/shared/date-picker/date-picker'
import { useCreateMediaFileMutation } from '@/entities/mediafile/mediafile.api'
import { useForm } from 'react-hook-form'
import { MediaFileData, MediaFileSchema } from '@/features/uploading-record/use-uploading-record'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledSelect } from '@/shared/select/controlled-select'
import { ControlledTextField } from '@/shared/input/controlled-text-field'
import { useEffect, useState } from 'react'
import { ErrorComponent } from '@/shared/error/error'
import { toast } from 'react-toastify'

interface UploadFormProps {
  uploadedFile: File[] | null
}

export const UploadForm = ({ uploadedFile }: UploadFormProps) => {
  const [createMediaFile, createMediafileResult] = useCreateMediaFileMutation()
  const [selectedDate, setSelectedDate] = useState<string>('')

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MediaFileData>({
    resolver: zodResolver(MediaFileSchema),
    defaultValues: {
      clientNumber: '',
      operatorName: '',
      projectName: '',
      file: null,
    },
  })

  useEffect(() => {
    if (uploadedFile && uploadedFile.length > 0) {
      setValue('file', uploadedFile[0])
    }
  }, [uploadedFile, setValue])

  useEffect(() => {
    if (createMediafileResult.isSuccess) {
      toast.success('Запись создана')
    }
  }, [createMediafileResult])

  const onSubmit = handleSubmit(async data => {
    if (!data.file) return

    // Format current date in ISO format or use the selected date
    const createDate = selectedDate || new Date().toISOString()

    try {
      // Send file in formData and other parameters in query params
      await createMediaFile({
        file: data.file,
        queryParams: {
          createDate,
          clientNumber: data.clientNumber,
          operatorName: data.operatorName,
          projectName: data.projectName,
        },
      }).unwrap()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  })

  return (
    <ComponentCard title="Данные">
      <Form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
          <div>
            <ControlledSelect
              control={control}
              name="operatorName"
              label={'Оператор'}
              placeholder="Выберите оператора"
              options={[{ label: 'Оператор 1', value: '1' }]}
            />
          </div>
          <div className="w-full">
            <DatePicker
              id="dob-picker"
              label="Дата"
              placeholder="Select an option"
              onChange={(dates, currentDateString) => {
                if (currentDateString) {
                  const date = new Date(currentDateString)
                  setSelectedDate(date.toISOString())
                }
              }}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 flex gap-5">
            <div className="w-full">
              <ControlledSelect
                control={control}
                name="projectName"
                label={'Проект'}
                placeholder="Выберите проект"
                options={[{ label: 'Проект 1', value: '1' }]}
              />
            </div>
            <div className="w-full">
              <ControlledTextField
                control={control}
                name="clientNumber"
                label="Телефон"
                type="text"
                placeholder="Введите телефон"
              />
            </div>
          </div>
          {errors.file && (
            <ErrorComponent
              text={typeof errors.file.message === 'string' ? errors.file.message : ''}
            />
          )}
          <div className="col-span-full">
            <Button
              type="submit"
              className="w-[149px] h-[44px] bg-purple-900 hover:bg-purple-800 text-white rounded-full cursor-pointer"
              size="sm"
            >
              Загрузить файл
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  )
}
