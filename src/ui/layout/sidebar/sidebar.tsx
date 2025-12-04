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
    <div className="p-4 w-90 h-screen border-r border-sidebar bg-sidebar text-sidebar-foreground flex flex-col animate-fadeIn">
      <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-sidebar-accent/10 hover:bg-sidebar-accent/20 transition-colors cursor-pointer shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={
              info?.profilePictureUrl ||
              'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
            }
            width={56}
            height={56}
            alt="Default User"
            className=" rounded-full object-cover border-2 border-primary"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sidebar-foreground truncate flex items-center gap-2">
              {info?.fullName}
              <Verified className="w-3 h-3 text-blue-500" />
            </span>
            <span className="text-sm text-sidebar-foreground/60 truncate">Online</span>
          </div>
        </div>
        <div className="flex  gap-5">
          {' '}
          <Button
            variant="secondary"
            className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-all duration-200 shadow-sm"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>

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
