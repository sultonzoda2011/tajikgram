import { Loader } from 'lucide-react'

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center py-10 text-sidebar-foreground/70">
      <Loader className="size-9 animate-spin animate-duration-[900ms] text-primary" />
    </div>
  )
}

export default LoadingState
