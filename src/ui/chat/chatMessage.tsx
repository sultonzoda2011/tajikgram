interface ChatMessageProps {
  message: string
  createdAt: string
  isMe: boolean
}

const ChatMessage = ({ message, createdAt, isMe }: ChatMessageProps) => {
  return (
    <div className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          relative max-w-xs md:max-w-lg px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 transform
          ${isMe
            ? 'bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none hover:scale-105'
            : 'bg-linear-to-br from-muted to-muted/80 text-muted-foreground rounded-bl-none hover:scale-105'}
          animate-fade-in
        `}
      >
        <span className="font-medium text-[18px] break-words">{message}</span>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
