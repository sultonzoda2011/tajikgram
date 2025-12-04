import { api } from '@/lib/utils/axiosConfig'

export const RequestFriend = async (receiverId: string) => {
  try {
    return api.post('/Friends/request', { receiverId })
  } catch (error) {
    console.error(error)
  }
}
