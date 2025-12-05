'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import ErrorState from '@/ui/common/errorState'
import LoadingState from '@/ui/common/loadingState'
import { X, Mail, User, Send } from 'lucide-react'
import { IUser } from '@/types/user'
import { Button } from '@/ui/button/button'
import { searchUser } from '@/api/users'
import { requestFriend } from '@/api/friendRequests'

interface IProfileUserModalProps {
  userName: string
  profileUserModalOpen: boolean
  canSendRequest: boolean
  setProfileUserModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ProfileUserModal({
  userName,
  canSendRequest,
  profileUserModalOpen,
  setProfileUserModalOpen,
}: IProfileUserModalProps) {
  const { data, isLoading, isError } = useQuery<IUser[]>({
    queryKey: ['getUserByName', userName],
    queryFn: () => searchUser(userName),
    enabled: profileUserModalOpen,
  })

  const {
    mutate,
    isError: isErrorRequest,
    isSuccess: isSuccessRequest,
    isPending: isPendingRequest,
  } = useMutation({
    mutationFn: requestFriend,
  })

  if (!profileUserModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-2xl w-96 max-w-full transform transition-all duration-300 scale-100">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          onClick={() => setProfileUserModalOpen(false)}
        >
          <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>

        {isLoading && <LoadingState />}
        {isError && <ErrorState message="Failed to load user." />}

        {data && data.length > 0 && (
          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md">
              {data[0].profilePictureUrl ? (
                <Image
                  src={data[0].profilePictureUrl}
                  alt={userName}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                  <User className="w-10 h-10 text-neutral-600 dark:text-neutral-300" />
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">
              {data[0].fullName || data[0].nickname}
            </h2>

            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
              <Mail className="w-5 h-5" />
              <span className="text-sm">{data[0].email}</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
              <User className="w-5 h-5" />
              <span className="text-sm">@{data[0].nickname}</span>
            </div>

            {canSendRequest && (
              <Button
                className="flex items-center gap-2 w-[80%]"
                onClick={() => mutate({ receiverId: data[0].id })}
                disabled={isPendingRequest}
              >
                <Send className="w-4 h-4" />
                {isPendingRequest ? 'Sending...' : 'Send friend request'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
