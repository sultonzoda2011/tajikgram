'use client'
import { removeToken } from '@/lib/utils/cookies'
import { Button } from '@/ui/button/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => {
          removeToken()
          router.push('/login')
        }}
      >
        {' '}
        Salom
      </Button>
    </div>
  )
}

export default Page
