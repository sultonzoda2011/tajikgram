'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/ui/button/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center justify-end">
      <Button
        variant="secondary"
        className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-all duration-200 shadow-sm"
        onClick={toggleTheme}
      >
        {isDark ? (
          <Sun className="w-5 h-5 inline-block" />
        ) : (
          <Moon className="w-5 h-5 inline-block" />
        )}
      </Button>
    </div>
  )
}
