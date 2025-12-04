import { GetUsers } from '@/api/users'
import { IUser } from '@/types/user'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import UserItem from '@/ui/common/userItem'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
interface IUserProps {
  query: string
  setUserName: Dispatch<SetStateAction<string>>
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
}
const Users = ({ query, setProfileUserModalOpen, setUserName }: IUserProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: GetUsers,
  })
  if (isLoading) return <LoadingState />

  const filteredUser = data?.filter((friend: IUser) =>
    friend.userName.toLowerCase().includes(query.toLowerCase()),
  )
  if (isError) return <ErrorState message="Failed to load users.  " />
  if (data?.length == 0 || filteredUser?.length == 0)
    return <ErrorState message={`Not User with ${query}`} />
  return (
    <div>
      {filteredUser?.map((user: IUser) => (
        <UserItem
          setUserName={setUserName}
          setProfileUserModalOpen={setProfileUserModalOpen}
          key={user.id}
          id={user.id}
          profilePictureUrl={user.profilePictureUrl}
          userName={user.userName}
          nickname={user.nickname}
          email={user.email}
        />
      ))}
    </div>
  )
}

export default Users
