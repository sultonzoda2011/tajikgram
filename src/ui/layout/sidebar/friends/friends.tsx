import { GetFriends } from '@/api/friends'
import { IFriend } from '@/types/friends'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import UserItem from '@/ui/common/userItem'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface IFriendsProps {
  query: string
  setUserName: Dispatch<SetStateAction<string>>
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
}

const Friends = ({ query, setProfileUserModalOpen, setUserName }: IFriendsProps) => {
  const { data, isLoading, isError } = useQuery<IFriend[]>({
    queryKey: ['friends'],
    queryFn: GetFriends,
  })

  if (isLoading) return <LoadingState />

  const filteredFriends = data?.filter((friend: IFriend) =>
    friend.userName.toLowerCase().includes(query.toLowerCase()),
  )
  if (isError) return <ErrorState message="Failed to load friends.  " />
  if (data?.length == 0 || filteredFriends?.length == 0)
    return <ErrorState message={`Not friend with ${query}`} />
  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-200px)]">
      {filteredFriends?.map((friend) => (
        <UserItem
          setProfileUserModalOpen={setProfileUserModalOpen}
          setUserName={setUserName}
          key={friend.id}
          id={friend.id}
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
