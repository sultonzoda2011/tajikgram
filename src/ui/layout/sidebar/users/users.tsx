import { SearchUser } from '@/api/users'
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
const Users = ({ setProfileUserModalOpen, setUserName, query }: IUserProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', query],
    queryFn: () => SearchUser(query),
  })
  if (isLoading) return <LoadingState />

  if (isError || data?.length == 0 || data?.length == 0)
    return <ErrorState message="Failed to load users.  " />
  return (
    <div>
      {data?.map((user: IUser) => (
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
