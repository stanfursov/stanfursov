"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Contrast, ArrowUp, Play } from "lucide-react"

export default function BeautifulWorldCase() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isRussian, setIsRussian] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

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

  // Handle scroll to show/hide "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const content = {
    ru: {
      title: "КАК ПРЕКРАСЕН ЭТОТ МИР",
      description: `Исполнение: Иван Дорн`,
      back: "Назад",
      top: "Наверх",
      watchVideo: "Смотреть видео",
    },
    en: {
      title: "WHAT A BEAUTIFUL WORLD",
      description: `Covered by Ivan Dorn`,
      back: "Back",
      top: "Top",
      watchVideo: "Watch video",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-[#f0f0f0]" : "bg-[#f8f8f8] text-[#333333]"
      }`}
      ref={topRef}
    >
      {/* Back Button */}
      <Link
        href="/work"
        className={`fixed top-10 left-6 flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all duration-300 font-mono uppercase z-50 ${
          isDarkMode ? "bg-white/10 text-[#f0f0f0] shadow-lg" : "bg-black text-white"
        }`}
      >
        <ArrowLeft size={14} />
        <span>{currentContent.back}</span>
      </Link>

      {/* Language and Theme Switchers */}
      <div className="fixed top-10 right-6 flex items-center space-x-2 z-50">
        <button
          onClick={toggleLanguage}
          className={`px-2 py-1 text-xs font-mono uppercase transition-colors duration-300 ${
            isDarkMode ? "text-[#f0f0f0]" : "text-[#333333]"
          }`}
        >
          {isRussian ? "EN" : "RU"}
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 transition-colors duration-300 ${isDarkMode ? "text-[#f0f0f0]" : "text-[#333333]"}`}
        >
          <Contrast size={20} />
        </button>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left Column - Title */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-mono uppercase tracking-wider leading-tight">
              {currentContent.title}
            </h1>
          </div>

          {/* Right Column - Description */}
          <div>
            <div>
              <div className={`text-xs leading-relaxed ${isDarkMode ? "text-[#b0b0b0]" : "text-gray-600"}`}>
                <p className="mb-6">{currentContent.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {!showVideo ? (
            <div
              className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-black"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className={`flex flex-col items-center gap-4 ${isDarkMode ? "text-white" : "text-white"}`}>
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                    <Play size={32} className="text-white" />
                  </div>
                  <span className="font-mono text-sm uppercase">{currentContent.watchVideo}</span>
                </div>
              </div>
              <img
                src="/video-previews/beautiful-world-preview.jpeg"
                alt="S7 Airlines - What a Beautiful World"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/-Yt-i84WHTo?autoplay=1"
                title="S7 Airlines - What a Beautiful World"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 p-3 rounded-full transition-all duration-300 z-50 flex items-center space-x-2 font-mono text-xs uppercase bg-black text-white hover:bg-gray-800 shadow-lg"
        >
          <ArrowUp size={14} />
          <span>{currentContent.top}</span>
        </button>
      )}
    </div>
  )
}
