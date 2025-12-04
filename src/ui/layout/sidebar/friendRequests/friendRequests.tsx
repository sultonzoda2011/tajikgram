import { AcceptFriendRequest, GetFriendRequests, RejectFriendRequest } from '@/api/friendRequests'
import { IFriendRequest } from '@/types/friendRequest'
import { Button } from '@/ui/button/button'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import UserItem from '@/ui/common/userItem'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, UserCircle2, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
interface IFriendRequestRes {
  query: string
  setUserName: Dispatch<SetStateAction<string>>
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
}
const FriendRequests = ({ query, setUserName, setProfileUserModalOpen }: IFriendRequestRes) => {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery<IFriendRequest[]>({
    queryKey: ['friendRequests'],
    queryFn: GetFriendRequests,
  })
  const { mutate } = useMutation({
    mutationFn: AcceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
    },
  })
  const { mutate: rejectedMutate } = useMutation({
    mutationFn: RejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
    },
  })
  if (isLoading) return <LoadingState />

  const filteredFriendRequests = data?.filter((friend: IFriendRequest) =>
    friend.sender.userName.toLowerCase().includes(query.toLowerCase()),
  )
  if (isError) return <ErrorState message="Failed to load friend requests.  " />
  if (data?.length == 0 || filteredFriendRequests?.length == 0)
    return <ErrorState message={`Not friend requests with ${query}`} />
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-200px)]">
      {filteredFriendRequests?.map((user) => (
        <UserItem
          setUserName={setUserName}
          setProfileUserModalOpen={setProfileUserModalOpen}
          key={user.id}
          id={user.id}
          profilePictureUrl={user.sender.profilePictureUrl}
          userName={user.sender.userName}
          nickname={user.sender.nickname}
          email={user.sender.email}
          rightActions={
            <>
              <Button
                onClick={() => {
                  setProfileUserModalOpen(true)
                  setUserName(user.sender.userName)
                }}
                size="sm"
                variant="outline"
              >
                <UserCircle2 className="w-4 h-4" />
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  mutate(user.id)
                }}
                size="sm"
                variant="default"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => {
                  rejectedMutate(user.id)
                }}
                size="sm"
                variant="destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          }
        />
      ))}
    </div>
  )
}

export default FriendRequests
