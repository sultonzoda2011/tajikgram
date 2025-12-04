import { GetFriends } from '@/api/friends'
import { IFriend } from '@/types/friends'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import UserItem from '@/ui/common/userItem'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface IFriendsProps {
  setUserName: Dispatch<SetStateAction<string>>
}

const Friends = ({ setUserName }: IFriendsProps) => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery<IFriend[]>({
    queryKey: ['friends'],
    queryFn: GetFriends,
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
          onClick={() => {
            router.push(`/chat/${friend.id}`)
          }}
          profilePictureUrl={friend.profilePictureUrl}
          userName={friend.userName}
          nickname={friend.nickname}
          email={friend.email}
        />
      ))}
    </div>
  )
}

export default Friends
