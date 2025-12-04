'use client'

import { Input } from '@/ui/input/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { LucideIcon } from 'lucide-react'

interface IFormInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  control: Control<T>
  placeholder: string
  type: string
  icon?: LucideIcon
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  placeholder,
  icon: Icon,
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
          <div className="relative">
            {Icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon size={20} />
              </div>
            )}
            <Input
              {...field}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              value={field.value || ''}
              className={Icon ? 'pl-10' : ''}
            />
          </div>
          {fieldState.error && <p className="text-sm text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}

export default FormInput
