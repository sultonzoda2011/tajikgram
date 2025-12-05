import PrivateChatById from '@/ui/chat/privateChatById'
import MessageInput from '@/ui/input/messageInput'

const ChatPage = () => {

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <PrivateChatById />
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatPage
