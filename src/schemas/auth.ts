import z from 'zod'

export const LoginSchema = z.object({
  identifier: z
    .string('Identifier must be a string')
    .min(3, 'Identifier must be at least 3 characters long'),
  password: z
    .string('Password must be a string')
    .min(6, 'Password must be at least 6 characters long'),
})

export const RegisterSchema = z.object({
  nickname: z
    .string('Nickname must be a string')
    .min(3, 'Nickname must be at least 3 characters long'),
  phoneNumber: z
    .string('Phone number must be a string')
    .min(10, 'Phone number must be at least 10 characters long'),
  password: z
    .string('Password must be a string')
    .min(6, 'Password must be at least 6 characters long'),
})
