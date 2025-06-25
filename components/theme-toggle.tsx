"use client"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 rounded-full ${
        isDarkMode ? "text-[#f0f0f0]" : "text-[#333333]"
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        size={20}
        className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        size={20}
        className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
        }`}
      />
    </button>
  )
}
