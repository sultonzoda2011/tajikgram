import { api } from '@/lib/utils/axiosConfig'
import { IFriendRequest } from '@/types/friendRequest'

export const GetFriendRequests = async () => {
  try {
    const response = await api.get<IFriendRequest[]>('/Friends/requests')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const AcceptFriendRequest = async (requestId: string) => {
  try {
    return await api.post(`/Friends/accept/${requestId}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const RejectFriendRequest = async (requestId: string) => {
  try {
    return await api.post(`/Friends/reject/${requestId}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
