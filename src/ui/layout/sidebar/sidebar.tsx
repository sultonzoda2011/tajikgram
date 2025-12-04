'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/ui/input/input'
import Friends from '@/ui/layout/sidebar/friends/friends'
import { Search } from 'lucide-react'
import { decodeJwt } from '@/lib/utils/jwt'
import { useRouter } from 'next/navigation'
import { removeToken } from '@/lib/utils/cookies'
import ProfileUserModal from '@/ui/profileUser/profileUserModal'
import Users from '@/ui/layout/sidebar/users/users'

const Sidebar = () => {
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
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto animate-fadeIn">
        {searchQuery && (
          <Users
            query={searchQuery}
            setUserName={setUserName}
            setProfileUserModalOpen={setProfileUserModalOpen}
          />
        )}
        {!searchQuery && <Friends setUserName={setUserName} />}
      </div>
      <ProfileUserModal
        type={false}
        userName={userName}
        profileUserModalOpen={profileUserModalOpen}
        setProfileUserModalOpen={setProfileUserModalOpen}
      />
    </div>
  )
}

export default Sidebar
