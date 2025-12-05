import { getFriends } from '@/api/friends'
import { IFriend } from '@/types/friends'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import UserItem from '@/ui/common/userItem'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface IFriendsProps {
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
  setUserName: Dispatch<SetStateAction<string>>
  setCanSendRequest: Dispatch<SetStateAction<boolean>>
}

const Friends = ({ setUserName, setProfileUserModalOpen, setCanSendRequest }: IFriendsProps) => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery<IFriend[]>({
    queryKey: ['friends'],
    queryFn: getFriends,
  })

  if (isLoading) return <LoadingState />

  if (isError || data?.length == 0 || data?.length == 0)
    return <ErrorState message="Failed to load friends.  " />
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-200px)]">
      {data?.map((friend) => (
        <UserItem
          setUserName={setUserName}
          key={friend.id}
          id={friend.id}
          onclick={() => {
            // setProfileUserModalOpen(true)
            // setCanSendRequest(false)
            // setUserName(friend.userName)
            router.push(`/chat/private/${friend.id}`)
          }}
          profilePictureUrl={friend.profilePictureUrl}
          userName={friend.userName}
          nickname={friend.nickname}
          email={friend.email}
          setProfileUserModalOpen={setProfileUserModalOpen}

        />
      ))}
    </div>
  )
}

export default Friends
