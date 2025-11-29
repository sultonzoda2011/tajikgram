'use client'

import { LoginUser } from '@/api/auth'
import { setToken } from '@/lib/utils/cookies'
import { ILogin } from '@/types/auth'
import { Button } from '@/ui/button/button'
import FormInput from '@/ui/input/formInput'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import { Sun } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas/auth'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  })

  const { mutate } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (res) => {
      const response = res as { data: { message: string; data: { token: string } } }
      setToken(response.data.data.token)
      toast.success(response?.data.message || 'Login successful')
      router.push('/profile')
    },
    onError: (err) => {
      const error = err as { response?: { data?: { message: string } } }
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  const onSubmit = (data: ILogin) => mutate(data)

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
            name="identifier"
            control={control}
            type="text"
            label="Username or Email"
            placeholder="Enter your username or email"
          />
          <FormInput
            name="password"
            control={control}
            type="password"
            label="Password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="font-bold h-10">
            Login
          </Button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          Dont have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
