import { api } from '@/lib/utils/axiosConfig'
import { ILogin, IRegister } from '@/types/auth'

export const RegisterUser = async (data: IRegister) => {
  try {
    return api.post('/Auth/register', data)
  } catch (error) {
    console.error(error)
  }
}

export const LoginUser = async (data: ILogin) => {
  try {
    return api.post('/Auth/login', data)
  } catch (error) {
    console.error(error)
  }
}
