import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import Select, { SelectProps } from '@/shared/select/select'

type ControlledSelectProps<T extends FieldValues> = Omit<SelectProps, 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledSelect = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <Select {...selectProps} errorMessage={error?.message} onChange={onChange} value={value} />
}
