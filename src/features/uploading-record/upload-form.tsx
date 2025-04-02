'use client'
import ComponentCard from '@/shared/component-card/component-card'
import Form from '@/shared/form/form'
import Input from '@/shared/input/input'
import Button from '@/shared/button/button'
import DatePicker from '@/shared/date-picker/date-picker'

export const UploadForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:')
  }

  return (
    <ComponentCard title="Данные">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-5 gap-y-0 sm:grid-cols-2">
          <div>
            <Input label="Оператор" type="text" placeholder="Name" />
          </div>
          <div className="w-full">
            <DatePicker
              id="dob-picker"
              label="Дата"
              placeholder="Select an option"
              onChange={(dates, currentDateString) => {
                console.log({ dates, currentDateString })
              }}
            />
          </div>
          {/* Password fields in one row */}
          <div className="col-span-1 sm:col-span-2 flex gap-5">
            <div className="w-full">
              <Input label={'Проект'} type="text" placeholder="Password" />
            </div>
            <div className="w-full">
              <Input label={'Телефон'} type="text" placeholder="Confirm Password" />
            </div>
          </div>
          <div className="col-span-full">
            <Button
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
