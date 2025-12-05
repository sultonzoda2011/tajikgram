import { api } from '@/lib/utils/axiosConfig'
import { IUser } from '@/types/user'

interface IUsersResponse {
  data: IUser[]
}

export const getUsers = async () => {
  try {
    const response = await api.get<IUsersResponse>('/Users')
    return response.data.data || []
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const searchUser = async (query: string) => {
  try {
    const response = await api.get<IUsersResponse>('/Users/search', {
      params: {
        query: query,
      },
    })
    return response.data.data || []
  } catch (error) {
    console.log(error)
    throw error
  }
}
