"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Send, Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Talk() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [isRussian, setIsRussian] = useState(true) // Default to Russian
  const [currentTime, setCurrentTime] = useState("")
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Content for both languages
  const content = {
    en: {
      message1: "Ok, let's go.",
      message2: "Let's chat about all the projects I've kept hidden in my portfolio's secret 🗃️ compartment.",
      seen: "Seen",
      email: "Email",
      telegram: "Telegram",
      nav: {
        home: "HOME",
        work: "WORK",
        talk: "CHAT",
      },
    },
    ru: {
      message1: "Итак, поехали.",
      message2: "Начнем с бонусного контента — проектов, которые не 🗃️ вместились в основное портфолио? Напишите мне.",
      seen: "Прочитано",
      email: "Почта",
      telegram: "Телеграм",
      nav: {
        home: "Обо мне",
        work: "Проекты",
        talk: "Связь",
      },
    },
  }

  // Load theme and language preferences from localStorage before render
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme")
    const savedLanguage = localStorage.getItem("portfolioLanguage")

    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "dark")
    }
    if (savedLanguage !== null) {
      setIsRussian(savedLanguage === "ru")
    }
  }, [])

  // Toggle dark mode
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("portfolioTheme", newTheme ? "dark" : "light")
  }

  // Toggle language and save to localStorage
  const toggleLanguage = () => {
    const newLanguage = !isRussian
    setIsRussian(newLanguage)
    localStorage.setItem("portfolioLanguage", newLanguage ? "ru" : "en")
  }

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  // Animate messages appearing with iOS-style fade-in
  useEffect(() => {
    const baseDelay = 800
    const delayBetweenMessages = 1200
    const totalMessages = 2

    // Start the animation sequence
    const timer = setTimeout(() => {
      setVisibleMessages(1)

      // Schedule the appearance of subsequent messages
      if (totalMessages > 1) {
        setTimeout(() => {
          setVisibleMessages(2)
        }, delayBetweenMessages)
      }
    }, baseDelay)

    return () => clearTimeout(timer)
  }, [])

  // Get current content based on language
  const currentContent = isRussian ? content.ru : content.en

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDarkMode ? "bg-black text-[#f0f0f0]" : "bg-[#f8f8f8] text-[#333333]"
      }`}
    >
      {/* Clock */}
      <div
        className={`fixed top-10 left-6 text-xs px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all duration-300 font-mono uppercase z-50 ${
          isDarkMode ? "bg-white/10 text-[#f0f0f0] shadow-lg" : "bg-black text-white"
        }`}
      >
        {currentTime}
      </div>
      {/* Language and Theme Switchers */}
      <div className="fixed top-10 right-6 flex items-center space-x-2 z-50">
        <button
          onClick={toggleLanguage}
          className={`px-2 py-1 text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
            isDarkMode ? "text-[#f0f0f0]" : "text-[#333333]"
          }`}
        >
          {isRussian ? "EN" : "RU"}
        </button>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* Chat Container - Centered */}
      <div className="flex items-center justify-center min-h-screen">
        <div className={`flex flex-col items-start relative max-w-md px-4 sm:px-0`}>
          {/* Message 1 - No Avatar, always left aligned */}
          {visibleMessages > 0 && (
            <div
              className={`flex items-end mb-2 relative transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] animate-in fade-in slide-in-from-bottom-2 duration-700`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[273px] shadow-lg text-xs leading-relaxed transition-all duration-300 ${
                  isDarkMode ? "bg-[#1E1E1E] text-[#b0b0b0]" : "bg-white text-black shadow-sm"
                }`}
              >
                {currentContent.message1}
              </div>
            </div>
          )}

          {/* Message 2 with Avatar */}
          {visibleMessages > 1 && (
            <div
              className={`flex ${isMobile ? "justify-center w-full" : "items-end"} mb-2 relative transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] animate-in fade-in slide-in-from-bottom-2 duration-700`}
            >
              {!isMobile && (
                <div className="w-8 h-8 rounded-full absolute -left-10 bottom-1 overflow-hidden animate-in fade-in scale-in-95 duration-500 delay-100">
                  <Image
                    src="/avatar.jpg"
                    alt="Stanislav"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${isMobile ? "max-w-[250px]" : "max-w-[341px]"} shadow-lg text-xs leading-relaxed transition-all duration-300 ${
                  isDarkMode ? "bg-[#1E1E1E] text-[#b0b0b0]" : "bg-white text-black shadow-sm"
                }`}
              >
                {currentContent.message2}
              </div>
            </div>
          )}

          {/* Seen Indicator with iOS-style checkmarks */}
          {visibleMessages > 1 && (
            <div
              className={`flex ${isMobile ? "justify-center w-full" : ""} items-center text-[#888888] text-[0.6rem] mt-1 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] animate-in fade-in duration-700 delay-300`}
            >
              <div className="flex mr-1">
                <Check size={10} className="text-blue-500" />
                <Check size={10} className="text-blue-500 -ml-1" />
              </div>
              {currentContent.seen}
            </div>
          )}
        </div>
      </div>

      {/* Contact Buttons - Fixed Position */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-4 justify-center z-40 items-center">
        {" "}
        {/* Добавлен items-center */}
        <a
          href="mailto:stanfursov@icloud.com"
          className={`flex items-center space-x-3 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 font-mono text-sm ${
            isDarkMode
              ? "bg-white/10 text-white hover:bg-white/20 shadow-lg"
              : "bg-gradient-to-br from-gray-200/50 to-white/50 text-black hover:from-gray-300/50 hover:to-white/70 shadow-sm"
          }`}
        >
          <Mail
            size={18}
            className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
          />
          <span>{currentContent.email}</span>
        </a>
        <a
          href="https://t.me/stanfursov"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-3 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 font-mono text-sm ${
            isDarkMode
              ? "bg-white/10 text-white hover:bg-white/20 shadow-lg"
              : "bg-gradient-to-br from-gray-200/50 to-white/50 text-black hover:from-gray-300/50 hover:to-white/70 shadow-sm"
          }`}
        >
          <Send
            size={18}
            className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
          />
          <span>{currentContent.telegram}</span>
        </a>
      </div>

      {/* Fixed Navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-7 py-3.5 rounded-full backdrop-blur-xl shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-50 ${
          isDarkMode ? "bg-white/10" : "bg-gradient-to-br from-gray-200/50 to-white/50 shadow-sm"
        }`}
      >
        <div className="flex justify-center items-center space-x-4">
          <Link
            href="/"
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
              isDarkMode ? "text-[#888888] hover:text-white" : "text-[#555555] hover:text-black"
            }`}
          >
            {currentContent.nav.home}
          </Link>
          <Link
            href="/work"
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
              isDarkMode ? "text-[#888888] hover:text-white" : "text-[#555555] hover:text-black"
            }`}
          >
            {currentContent.nav.work}
          </Link>
          <span
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDarkMode ? "text-white scale-110" : "text-black scale-110"}`}
          >
            {currentContent.nav.talk}
          </span>
        </div>
      </nav>
    </div>
  )
}
