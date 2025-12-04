import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/ui/button/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
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
