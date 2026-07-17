'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useSignInForm = () => {
  const loginFormSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, 'Введите адрес электронной почты')
      .email('Некорректный адрес электронной почты'),
    password: z.string().min(1, 'Введите пароль'),
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
