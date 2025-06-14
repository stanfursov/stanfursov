"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [isRussian, setIsRussian] = useState(true) // Default to Russian
  const [currentTime, setCurrentTime] = useState("")
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Content for both languages
  const content = {
    en: {
      message1: "Hey, I am Stanislav, a dynamic marketing professional hailing from Moscow, Russia.",
      message2:
        "With over a decade of experience in the industry, I have honed my skills working in various capacities within agencies and corporate settings. My expertise lies in crafting compelling brand narratives that resonate with diverse audiences and leveraging cultural insights to drive impactful marketing strategies.",
      message3:
        "I am not just a manager, but a mentor committed to fostering growth and creativity in those around me. I am deeply passionate about sports, fintech, startups, and the innovative businesses that are shaping the world of tomorrow.",
      message4:
        "Currently, I am serving as the deputy marketing director at Bank DOM.RF, where I lead a team focused on the intersection of creativity, strategy, and brand communications. In this role, I oversee the development and execution of advertising campaigns, traditional and unconventional, while shaping the bank's brand strategy and direction.",
      seen: "Seen",
      nav: {
        home: "HOME",
        work: "WORK",
        talk: "CHAT",
      },
    },
    ru: {
      message1: "Привет! Меня зовут Станислав, я занимаюсь креативным маркетингом и живу в Москве.",
      message2:
        "За 10+ лет в индустрии я успел поработать и в агентствах, и в корпорациях — собрал полную коллекцию. Специализируюсь на том, чтобы бренды говорили человеческим языком и попадали в сердца аудитории. Умею находить культурные коды и превращать их в рабочие стратегии.",
      message3:
        "Не просто управляю командами, а помогаю людям расти и творить. Глаза горят от спорта, финтеха и стартапов — всего, что двигает мир вперед (и иногда в сторону).",
      message4:
        "Сейчас работаю заместителем директора по маркетингу в Банке ДОМ.РФ. Руковожу командой, которая делает креатив на стыке стратегии и коммуникаций. Запускаем кампании — от классических до тех, что заставляют конкурентов почесать затылок. В общем, формируем лицо бренда и не даем ему скучать.",
      seen: "Прочитано",
      nav: {
        home: "Обо мне",
        work: "Проекты",
        talk: "Связь",
      },
    },
  }

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolioLanguage")
    if (savedLanguage !== null) {
      setIsRussian(savedLanguage === "ru")
    }
  }, [])

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
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

  // Check if animation has already been shown
  useEffect(() => {
    const animationShown = sessionStorage.getItem("homeAnimationShown")
    if (animationShown) {
      setHasAnimated(true)
      setVisibleMessages(4) // Show all messages immediately
    }
  }, [])

  // Animate messages appearing with iOS-style fade-in
  useEffect(() => {
    if (hasAnimated) return // Skip animation if already shown

    const totalMessages = 4
    const baseDelay = 800
    const delayBetweenMessages = 1200

    // Start the animation sequence
    const timer = setTimeout(() => {
      setVisibleMessages(1)

      // Schedule the appearance of subsequent messages
      for (let i = 2; i <= totalMessages; i++) {
        setTimeout(
          () => {
            setVisibleMessages(i)

            // Mark animation as complete when all messages are shown
            if (i === totalMessages) {
              setTimeout(() => {
                sessionStorage.setItem("homeAnimationShown", "true")
                setHasAnimated(true)
              }, 1000)
            }
          },
          delayBetweenMessages * (i - 1),
        )
      }
    }, baseDelay)

    return () => clearTimeout(timer)
  }, [hasAnimated])

  // Get current content based on language
  const currentContent = isRussian ? content.ru : content.en

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
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
      {/* Chat Container */}
      <div
        className={`flex flex-col ${isMobile ? "items-center w-full" : "items-start"} mb-8 relative max-w-md px-4 sm:px-0`}
      >
        {/* Message 1 - No Avatar */}
        {visibleMessages > 0 && (
          <div
            className={`flex ${isMobile ? "justify-center w-full" : "items-end"} mb-2 relative transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
              !hasAnimated ? "animate-in fade-in slide-in-from-bottom-2 duration-700" : ""
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl ${isMobile ? "max-w-[250px]" : "max-w-[273px]"} shadow-lg text-xs leading-relaxed transition-all duration-500 ${
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
            className={`flex ${isMobile ? "justify-center w-full" : "items-end"} mb-2 relative transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
              !hasAnimated ? "animate-in fade-in slide-in-from-bottom-2 duration-700" : ""
            }`}
          >
            {!isMobile && (
              <div
                className={`w-8 h-8 rounded-full absolute -left-10 bottom-1 overflow-hidden transition-all duration-500 ${
                  !hasAnimated ? "animate-in fade-in scale-in-95 duration-500 delay-100" : ""
                }`}
              >
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
              className={`px-4 py-3 rounded-2xl ${isMobile ? "max-w-[250px]" : "max-w-[341px]"} shadow-lg text-xs leading-relaxed transition-all duration-500 ${
                isDarkMode ? "bg-[#1E1E1E] text-[#b0b0b0]" : "bg-white text-black shadow-sm"
              }`}
            >
              {currentContent.message2}
            </div>
          </div>
        )}

        {/* Message 3 with Avatar */}
        {visibleMessages > 2 && (
          <div
            className={`flex ${isMobile ? "justify-center w-full" : "items-end"} mb-2 relative mt-4 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
              !hasAnimated ? "animate-in fade-in slide-in-from-bottom-2 duration-700" : ""
            }`}
          >
            {!isMobile && (
              <div
                className={`w-8 h-8 rounded-full absolute -left-10 bottom-1 overflow-hidden transition-all duration-500 ${
                  !hasAnimated ? "animate-in fade-in scale-in-95 duration-500 delay-100" : ""
                }`}
              >
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
              className={`px-4 py-3 rounded-2xl ${isMobile ? "max-w-[250px]" : "max-w-[341px]"} shadow-lg text-xs leading-relaxed transition-all duration-500 ${
                isDarkMode ? "bg-[#1E1E1E] text-[#b0b0b0]" : "bg-white text-black shadow-sm"
              }`}
            >
              {currentContent.message3}
            </div>
          </div>
        )}

        {/* Message 4 with Avatar */}
        {visibleMessages > 3 && (
          <div
            className={`flex ${isMobile ? "justify-center w-full" : "items-end"} mb-2 relative transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
              !hasAnimated ? "animate-in fade-in slide-in-from-bottom-2 duration-700" : ""
            }`}
          >
            {!isMobile && (
              <div
                className={`w-8 h-8 rounded-full absolute -left-10 bottom-1 overflow-hidden transition-all duration-500 ${
                  !hasAnimated ? "animate-in fade-in scale-in-95 duration-500 delay-100" : ""
                }`}
              >
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
              className={`px-4 py-3 rounded-2xl ${isMobile ? "max-w-[250px]" : "max-w-[341px]"} shadow-lg text-xs leading-relaxed transition-all duration-500 ${
                isDarkMode ? "bg-[#1E1E1E] text-[#b0b0b0]" : "bg-white text-black shadow-sm"
              }`}
            >
              {currentContent.message4}
            </div>
          </div>
        )}

        {/* Seen Indicator with iOS-style checkmarks */}
        {visibleMessages > 3 && (
          <div
            className={`flex ${isMobile ? "justify-center w-full" : ""} items-center text-[#888888] text-[0.6rem] mt-1 transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
              !hasAnimated ? "animate-in fade-in duration-700 delay-300" : ""
            }`}
          >
            <div className="flex mr-1">
              <Check size={10} className="text-blue-500" />
              <Check size={10} className="text-blue-500 -ml-1" />
            </div>
            {currentContent.seen}
          </div>
        )}
      </div>

      {/* Fixed Navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-7 py-3.5 rounded-full backdrop-blur-xl shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-50 ${
          isDarkMode ? "bg-white/10" : "bg-gradient-to-br from-gray-200/50 to-white/50 shadow-sm"
        }`}
      >
        <div className="flex justify-center items-center space-x-4">
          <span
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDarkMode ? "text-white scale-110" : "text-black scale-110"}`}
          >
            {currentContent.nav.home}
          </span>
          <Link
            href="/work"
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
              isDarkMode ? "text-[#888888] hover:text-white" : "text-[#555555] hover:text-black"
            }`}
          >
            {currentContent.nav.work}
          </Link>
          <Link
            href="/talk"
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
              isDarkMode ? "text-[#888888] hover:text-white" : "text-[#555555] hover:text-black"
            }`}
          >
            {currentContent.nav.talk}
          </Link>
        </div>
      </nav>
    </div>
  )
}
