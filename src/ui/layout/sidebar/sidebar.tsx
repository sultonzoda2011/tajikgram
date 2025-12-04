'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/ui/button/button'
import { Input } from '@/ui/input/input'
import FriendRequests from '@/ui/layout/sidebar/friendRequests/friendRequests'
import Friends from '@/ui/layout/sidebar/friends/friends'
import Users from '@/ui/layout/sidebar/users/users'
import { Users as UsersIcon, UserCheck, Handshake, Search, Settings, Verified } from 'lucide-react'
import { decodeJwt } from '@/lib/utils/jwt'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { removeToken } from '@/lib/utils/cookies'
import ProfileUserModal from '@/ui/profileUser/profileUserModal'
import { ThemeToggle } from '@/ui/common/themeToggle'

const Sidebar = () => {
  const [tab, setTab] = useState<'all' | 'friends' | 'requests'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [profileUserModalOpen, setProfileUserModalOpen] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const router = useRouter()
  const info = decodeJwt()
  useEffect(() => {
    if (!info || !info.exp) {
      router.push('/login')
      return
    }

    const expDate = new Date(info.exp * 1000)
    if (new Date() > expDate) {
      removeToken()
      router.push('/login')
    }
  }, [info, router])

  return (
    <div className="p-4 w-90 h-screen border-r  flex flex-col ">


      <div className="relative mb-4">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          placeholder="Search"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          size="default"
          variant={tab === 'all' ? 'default' : 'outline'}
          onClick={() => {
            setTab('all')
            setSearchQuery('')
          }}
          className="flex-1 flex items-center gap-2"
        >
          <UsersIcon size={18} />
          All
        </Button>

        <Button
          size="default"
          variant={tab === 'friends' ? 'default' : 'outline'}
          onClick={() => {
            setTab('friends')
            setSearchQuery('')
          }}
          className="flex-1 flex items-center gap-2"
        >
          <UserCheck size={18} />
          Friends
        </Button>

        <Button
          size="default"
          variant={tab === 'requests' ? 'default' : 'outline'}
          onClick={() => {
            setTab('requests')
            setSearchQuery('')
          }}
          className="flex-1 flex items-center gap-2"
        >
          <Handshake size={18} />
          Requests
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto animate-fadeIn">
        {tab === 'all' && (
          <Users
            query={searchQuery}
            setUserName={setUserName}
            setProfileUserModalOpen={setProfileUserModalOpen}
          />
        )}
        {tab === 'friends' && (
          <Friends
            query={searchQuery}
            setUserName={setUserName}
            setProfileUserModalOpen={setProfileUserModalOpen}
          />
        )}
        {tab === 'requests' && (
          <FriendRequests
            setUserName={setUserName}
            setProfileUserModalOpen={setProfileUserModalOpen}
            query={searchQuery}
          />
        )}
      </div>
      <ProfileUserModal
        userName={userName}
        profileUserModalOpen={profileUserModalOpen}
        setProfileUserModalOpen={setProfileUserModalOpen}
      />
    </div>
  )
}

export default Sidebar
