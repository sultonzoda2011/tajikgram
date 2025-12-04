import { IUser } from '@/types/user'


export interface IFriendRequest {
  id: string
  senderId: string
  sender: IUser
  receiverId: string
  receiver: IUser | null
  status: number
  createdAt: string
}
