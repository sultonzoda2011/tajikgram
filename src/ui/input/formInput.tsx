'use client'

import { Input } from '@/ui/input/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface IFormInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  control: Control<T>
  placeholder: string
  type: string
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
}: IFormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name} className="block text-sm font-medium text-gray-900">
            {label}
          </label>
          <Input
            {...field}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            value={field.value || ''}
          />
          {fieldState.error && <p className="text-sm text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}

export default FormInput
