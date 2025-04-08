'use client'
import ComponentCard from '@/shared/component-card/component-card'
import Form from '@/shared/form/form'
import Button from '@/shared/button/button'
import DatePicker from '@/shared/date-picker/date-picker'
import { useCreateMediaFileMutation } from '@/entities/mediafile/api/mediafile.api'
import { useForm } from 'react-hook-form'
import { MediaFileData, MediaFileSchema } from '@/features/uploading-record/use-uploading-record'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledSelect } from '@/shared/select/controlled-select'
import { ControlledTextField } from '@/shared/input/controlled-text-field'
import { useEffect, useState } from 'react'
import { ErrorComponent } from '@/shared/error/error'
import { toast } from 'react-toastify'
import { Loader } from '@/shared/loader/loader'
import { useGetProjectsQuery } from '@/entities/projects/projects.api'
import { useGetOperatorsQuery } from '@/entities/operators/operators.api'

interface UploadFormProps {
  uploadedFile: File[] | null
  onFileUploaded: (files: File[]) => void
}

export const UploadForm = ({ uploadedFile, onFileUploaded }: UploadFormProps) => {
  const [createMediaFile, { isLoading }] = useCreateMediaFileMutation()
  const { data: projectsData } = useGetProjectsQuery()
  const { data: operatorsData } = useGetOperatorsQuery()
  const [selectedDate, setSelectedDate] = useState<string>('')

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

  const reset = () => {
    hookFormReset()
    onFileUploaded([])
    setSelectedDate('')
  }

  const onSubmit = handleSubmit(async data => {
    if (!data.file) return

    const createDate = selectedDate || new Date().toISOString()

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

      toast.success('Запись создана')
      reset()
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Ошибка загрузки')
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
      {isLoading && <Loader message={'Идёт загрузка файла...'} />}
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
              <DatePicker
                id="dob-picker"
                label="Дата"
                placeholder="Выберите дату"
                value={selectedDate}
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
