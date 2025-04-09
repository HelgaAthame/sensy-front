'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/

export const useSignInForm = () => {
  const loginFormSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, 'Введите адрес электронной почты')
      .email('Некорректный адрес электронной почты'),
    password: z
      .string()
      .trim()
      .min(1, 'Введите пароль')
      .min(8, 'Пароль должен содержать как минимум 8 символов')
      .max(30, 'Пароль должен содержать не более 30 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать как минимум одну строчную букву (a-z), одну цифру (0-9) и один специальный символ (например, @, #, $ и т.п.).'
      ),
    rememberMe: z.boolean().optional(),
  })

  type LoginFormType = z.infer<typeof loginFormSchema>

  return useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  })
}
