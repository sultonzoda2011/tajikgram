'use client'

import { RegisterUser } from '@/api/auth'
import { IRegister } from '@/types/auth'
import { Button } from '@/ui/button/button'
import FormInput from '@/ui/input/formInput'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { Sun } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas/auth'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<IRegister>({
    resolver:zodResolver(RegisterSchema),
  })

  const { mutate } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: (res) => {
      const response = res as { data: { message: string } }
      toast.success(response?.data?.message || 'Welcome to TajikGram')
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
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">TajikGram</h1>

        <div className="flex items-center justify-end ">
          <Button
            variant={'secondary'}
            className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-all duration-200 shadow-sm"
          >
            <Sun className="w-5 h-5 inline-block" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormInput
            name="nickname"
            control={control}
            type="text"
            label="Username"
            placeholder="Enter your  username"
          />
          <FormInput
            name="phoneNumber"
            control={control}
            type="text"
            label="Phone Number"
            placeholder="Enter your Phone number"
          />
          <FormInput
            name="password"
            control={control}
            type="password"
            label="Password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="font-bold h-10">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          Already on TajikGram?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
