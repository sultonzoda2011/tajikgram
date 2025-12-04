
import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
  message?: string
}

const ErrorState = ({ message = "Something went wrong..." }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-destructive">
      <AlertTriangle className="w-10 h-10 mb-3 opacity-80" />
      <p className=" font-medium opacity-80">{message}</p>
    </div>
  )
}

export default ErrorState
