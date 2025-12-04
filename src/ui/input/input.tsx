import { cn } from '@/lib/utils/shadUtil'
import * as React from 'react'

interface InputProps extends React.ComponentProps<'input'> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          `
            w-full min-w-0 rounded-md border bg-transparent px-3 py-2
            text-base placeholder:text-muted-foreground
            file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
            selection:bg-primary selection:text-primary-foreground
            shadow-sm transition-colors duration-200 ease-in-out
            focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
            dark:bg-input/30
            aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
          `,
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
