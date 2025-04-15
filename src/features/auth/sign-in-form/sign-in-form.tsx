'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EyeCloseIcon, EyeIcon, Logo } from '@/../public/assets/icons'
import { useSignInForm } from '@/features/auth/sign-in-form/use-sign-in-form'
import { ControlledTextField } from '@/shared/ui/input/controlled-text-field'
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox'
import Button from '@/shared/ui/button/button'
import { appRoutes } from '@/shared/constants/routes'
import { toast } from 'react-toastify'
import { setToLocalStorage } from '@/shared/utils/common-utils'
import { useSignInMutation } from '@/entities/auth/auth.api'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useSignInForm()
  const [signIn, { isLoading }] = useSignInMutation()

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      }

      const response = await signIn(payload).unwrap()

      setToLocalStorage('accessToken', response.accessToken)
      setToLocalStorage('userEmail', data.email)

      window.location.href = appRoutes.private.dashboard
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('Неверный логин или пароль')
      } else {
        toast.error('Ошибка авторизации')
      }
    }
  })

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left side - Authorization form */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-[440px]">
            <div className="mb-5">
              <h1 className="text-4xl font-semibold text-gray-800 mb-2">Авторизация</h1>
              <p className="text-sm text-gray-500">
                Введите свой Email и пароль для входа в аккаунт!
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email<span className="text-rose-500">*</span>
                  </label>
                  <ControlledTextField
                    placeholder="Введите Email"
                    name="email"
                    rounded="full"
                    autoComplete="new-email"
                    control={control}
                    className="w-full border border-gray-300 rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Пароль<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <ControlledTextField
                      type={showPassword ? 'text' : 'password'}
                      placeholder="hello123"
                      name="password"
                      autoComplete="new-password"
                      rounded="full"
                      control={control}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 pr-12" //
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-5.5"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ControlledCheckbox control={control} name="rememberMe" />
                    <span className="text-sm text-gray-700">Оставаться в системе</span>
                  </div>
                  <Link
                    href={appRoutes.auth.underConstructionPlain}
                    className="text-sm text-blue-800 hover:text-blue-700"
                  >
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                    isLoading
                      ? 'bg-purple-700 cursor-not-allowed opacity-80 text-white'
                      : 'bg-purple-900 hover:bg-purple-800 text-white'
                  }`}
                >
                  Войти
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Purple background with logo */}
        <div
          style={{ backgroundColor: 'var(--color-purple-900)' }}
          className="hidden lg:flex w-1/2 items-center justify-center"
        >
          <Logo className="text-white" width={260} height={65} />
        </div>
      </div>
    </>
  )
}
