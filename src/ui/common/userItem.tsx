import React, { Dispatch, SetStateAction } from 'react'
import { Mail, User } from 'lucide-react'
import Image from 'next/image'

interface UserItemProps {
  id: string
  profilePictureUrl: string
  userName: string
  nickname: string
  setUserName: Dispatch<SetStateAction<string>>
  email: string
  rightActions?: React.ReactNode
  onClick?: () => void
  setProfileUserModalOpen?: Dispatch<SetStateAction<boolean>> | undefined
}

const UserItem = ({
  profilePictureUrl,
  userName,
  nickname,
  email,
  setUserName,
  id,
  onClick,
  rightActions,
  setProfileUserModalOpen,
}: UserItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/20 transition-colors cursor-pointer border-b border-sidebar-border"
    >
      <div className="relative w-12 h-12 shrink-0">
        {profilePictureUrl ? (
          <Image
            src={profilePictureUrl}
            alt={userName}
            width={48}
            height={48}
            className=" rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-sidebar-border flex items-center justify-center">
            <User className="w-6 h-6 text-sidebar-foreground/50" />
          </div>
        )}
      </div>

      <div
        onClick={() => {
          if (setProfileUserModalOpen) setProfileUserModalOpen(true)
          setUserName(userName)
        }}
        className="flex flex-col overflow-hidden"
      >
        <span className="font-semibold text-sidebar-foreground truncate">
          {nickname || userName}
        </span>
        <span className="flex items-center gap-1 text-sm text-sidebar-foreground/60 truncate lowercase">
          <Mail className="w-4 h-4" />
          {email}
        </span>
      </div>

      {rightActions && <div className="ml-auto flex gap-2">{rightActions}</div>}
    </div>
  )
}

export default UserItem
