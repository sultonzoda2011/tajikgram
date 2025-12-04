'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import { X, Mail, User } from 'lucide-react'
import { SearchUser } from '@/api/users'

interface IProfileUserModalProps {
  userName: string
  profileUserModalOpen: boolean
  type: boolean
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
}

const ProfileUserModal = ({
  userName,
  type,
  profileUserModalOpen,
  setProfileUserModalOpen,
}: IProfileUserModalProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getUserByName', userName],
    queryFn: () => SearchUser(userName),
    enabled: profileUserModalOpen,
  })

  if (!profileUserModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl w-96 max-w-full animate-fadeIn scale-95 transition-all duration-300">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setProfileUserModalOpen(false)}
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {isLoading && <LoadingState />}
        {isError && <ErrorState message="Failed to load user." />}
        {data && data.length > 0 && (
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-20 h-20 shrink-0">
              {data[0].profilePictureUrl ? (
                <Image
                  src={data[0].profilePictureUrl}
                  alt={userName}
                  width={48}
                  height={48}
                  className=" rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-sidebar-border flex items-center justify-center">
                  <User className="w-full h-1/2 text-sidebar-foreground/50" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              {data[0].fullName || data[0].nickname}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Mail className="w-5 h-5" />
              <span className="text-sm">{data[0].email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <User className="w-5 h-5" />
              <span className="text-sm">@{data[0].nickname}</span>
            </div>
          </div>
        )}
      </div>
      {type && (
        <div
          onClick={() => {
          }}
        ></div>
      )}
    </div>
  )
}

export default ProfileUserModal
