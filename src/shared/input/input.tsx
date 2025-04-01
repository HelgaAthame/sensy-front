import React, { FC } from 'react'

export interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  min?: string | number
  max?: string | number
  step?: number
  disabled?: boolean
  success?: boolean
  error?: boolean
  hint?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full' | string
}

const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  className = '',
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  rounded = 'lg',
}) => {
  let inputClasses = `h-11 w-full ${
    rounded.startsWith('[') ? `rounded-${rounded}` : `rounded-${rounded}`
  } border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 ${className}`

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed opacity-40
      dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
  } else if (error) {
    inputClasses += ` border-danger-500 bg-danger-50/10 text-danger-900
      focus:border-danger-500 focus:ring-danger-500/20
      dark:border-danger-500 dark:text-danger-400 dark:focus:border-danger-400
      dark:bg-danger-900/10`
  } else if (success) {
    inputClasses += ` border-success-500 bg-success-50/10 text-success-900
      focus:border-success-500 focus:ring-success-500/20
      dark:border-success-500 dark:text-success-400 dark:focus:border-success-400
      dark:bg-success-900/10`
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300
      focus:border-accent-500 focus:ring-accent-500/20
      dark:border-gray-700 dark:text-white/90 dark:focus:border-accent-400`
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? 'text-danger-500 dark:text-danger-400'
              : success
                ? 'text-success-500 dark:text-success-400'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Input
