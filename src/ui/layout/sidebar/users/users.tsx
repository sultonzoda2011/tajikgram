import { searchUser } from '@/api/users'
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
  setCanSendRequest: Dispatch<SetStateAction<boolean>>
}
const Users = ({ setProfileUserModalOpen, setUserName, query, setCanSendRequest }: IUserProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', query],
    queryFn: () => searchUser(query),
  })
  if (isLoading) return <LoadingState />

  if (isError || data?.length == 0 || data?.length == 0)
    return <ErrorState message="Failed to load users.  " />
  return (
    <div>
      {data?.map((user: IUser) => (
        <UserItem
          key={user.id}
          id={user.id}
          profilePictureUrl={user.profilePictureUrl}
          userName={user.userName}
          nickname={user.nickname}
          email={user.email}
          setUserName={setUserName}
          onclick={() => {
            setUserName(user.userName)
            setCanSendRequest(true)
            setProfileUserModalOpen(true)
          }}
        />
      ))}
    </div>
  )
}

export default Users
