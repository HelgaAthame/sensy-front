'use client'
import ComponentCard from '@/shared/component-card/component-card'
import Form from '@/shared/form/form'
import Button from '@/shared/button/button'
import { useCreateMediaFileMutation } from '@/entities/mediafile/api/mediafile.api'
import { useForm } from 'react-hook-form'
import { MediaFileData, MediaFileSchema } from '@/features/uploading-record/use-uploading-record'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledSelect } from '@/shared/select/controlled-select'
import { ControlledTextField } from '@/shared/input/controlled-text-field'
import { useEffect, useState } from 'react'
import { ErrorComponent } from '@/shared/error/error'
import { toast } from 'react-toastify'
import { useGetProjectsQuery } from '@/entities/projects/projects.api'
import { useGetOperatorsQuery } from '@/entities/operators/operators.api'
import { setToLocalStorage } from '@/shared/utils/common-utils'
import { formatDateWithLocalTimeZone } from '@/shared/utils/date-utils'
import 'react-multi-date-picker/styles/backgrounds/bg-gray.css'
import 'react-multi-date-picker/styles/colors/purple.css'
import 'react-multi-date-picker/styles/colors/analog_time_picker_purple.css'
import { DateTimePicker } from '@/shared/date-picker/date-picker'
import { LoaderContent } from '@/shared/loader'

interface UploadFormProps {
  uploadedFile: File[] | null
  onFileUploaded: (files: File[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export const UploadForm = ({ uploadedFile, onFileUploaded, setIsLoading }: UploadFormProps) => {
  const [createMediaFile, { isLoading }] = useCreateMediaFileMutation()
  const { data: projectsData } = useGetProjectsQuery()
  const { data: operatorsData } = useGetOperatorsQuery()

  const today = new Date()

  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset: hookFormReset,
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
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  const reset = () => {
    hookFormReset()
    onFileUploaded([])
    setSelectedDate(today)
  }

  const onSubmit = handleSubmit(async data => {
    if (!data.file) return

    const createDate = formatDateWithLocalTimeZone(selectedDate.toISOString())

    try {
      await createMediaFile({
        file: data.file,
        queryParams: {
          createDate,
          clientNumber: data.clientNumber,
          operatorName: data.operatorName,
          projectName: data.projectName,
        },
      }).unwrap()

      const uploadTimestamp = new Date().getTime()
      setToLocalStorage('lastUploadTimestamp', uploadTimestamp.toString())

      toast.success('Запись создана')
      reset()
    } catch (error) {
      toast.error('Ошибка загрузки')
    } finally {
      setIsLoading(false)
    }
  })

  const projectOptions =
    projectsData?.map(project => ({
      label: project.name,
      value: project.id.toString(),
    })) ?? []

  const operatorsOptions =
    operatorsData?.map(operator => ({
      label: operator.name,
      value: operator.id.toString(),
    })) ?? []

  return (
    <>
      <ComponentCard title="Данные">
        <Form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <ControlledSelect
                control={control}
                name="operatorName"
                label={'Оператор'}
                placeholder="Выберите оператора"
                options={operatorsOptions}
              />
            </div>
            <div className="w-full">
              <DateTimePicker
                value={new Date(selectedDate)}
                onChange={date => {
                  if (date) {
                    setSelectedDate(Array.isArray(date) ? date[0] : date)
                  }
                }}
                label="Дата и время"
                withTime={true}
              />
            </div>
            <div className="col-span-1 sm:col-span-2 flex gap-5">
              <div className="w-full">
                <ControlledSelect
                  control={control}
                  name="projectName"
                  label={'Проект'}
                  placeholder="Выберите проект"
                  options={projectOptions}
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
    </>
  )
}
