import { api } from '@/lib/utils/axiosConfig'

export const requestFriend = async ({ receiverId }: { receiverId: string | number }) => {
  try {
    return api.post(`/Friends/request/${receiverId}`)
  } catch (error) {
    console.error(error)
  }
}
