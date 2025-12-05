import { IFriend } from '@/types/friends'
import { api } from '@/lib/utils/axiosConfig'

export const getFriends = async (): Promise<IFriend[]> => {
  try {
    const response = await api.get<IFriend[]>('/Friends')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
