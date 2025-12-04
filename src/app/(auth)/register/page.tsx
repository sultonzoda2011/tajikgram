'use client'

import { RegisterUser } from '@/api/auth'
import { IRegister } from '@/types/auth'
import { Button } from '@/ui/button/button'
import FormInput from '@/ui/input/formInput'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { Eye, EyeClosed, LockKeyholeIcon, Phone, User } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '@/ui/common/themeToggle'

const RegisterPage = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  })
  const [eyeOpen, setEyeOpen] = useState(false)

  const { mutate } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: (res) => {
      const response = res as { data: { message: string } }
      toast.success(response?.data?.message || 'Welcome to ChatGram')
      router.push('/login')
    },
    onError: (err) => {
      const error = err as { response?: { data?: { message: string } } }
      toast.error(error.response?.data?.message || 'Something went wrong')
    },
  })

  const onSubmit = (data: IRegister) => mutate(data)

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background animate-fade-in">
      <div className="w-full max-w-md bg-card shadow-2xl rounded-2xl p-10 border border-border animate-fade-in-up">
        <h1 className="text-4xl font-bold text-primary tracking-tight text-center mb-6">
          ChatGram
        </h1>

        <ThemeToggle />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormInput
            name="nickname"
            icon={User}
            control={control}
            type="text"
            label="Username"
            placeholder="Enter your  username"
          />
          <FormInput
            name="phoneNumber"
            icon={Phone}
            control={control}
            type="text"
            label="Phone Number"
            placeholder="Enter your Phone number"
          />
          <div>
            <FormInput
              name="password"
              icon={LockKeyholeIcon}
              control={control}
              type={eyeOpen ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
            />
            {eyeOpen ? (
              <Eye
                onClick={() => {
                  setEyeOpen(!eyeOpen)
                }}
                className="w-5 bg-white h-5 absolute left-196 top-106 -translate-y-1/2 dark:bg-black text-muted-foreground/60 cursor-pointer"
              />
            ) : (
              <EyeClosed
                onClick={() => {
                  setEyeOpen(!eyeOpen)
                }}
                className="w-5 h-5 absolute bg-white left-196 top-106 -translate-y-1/2 dark:bg-black text-muted-foreground/60 cursor-pointer"
              />
            )}
          </div>

          <Button type="submit" className="font-bold h-10">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          Already on ChatGram?{' '}
          <Link href="/login" className="text-blue-500 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
