"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUp, Play } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ReliableSupportCase() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isRussian, setIsRussian] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCustomControls, setShowCustomControls] = useState(true)
  const topRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Toggle dark mode and save to localStorage
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

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      // Note: setIsPlaying will be handled by video events
    }
  }

  const handleVideoContainerClick = () => {
    if (showCustomControls || !isPlaying) {
      togglePlay()
    } else {
      if (videoRef.current) {
        // If video is playing and custom controls are hidden,
        // clicking the container could, for example, toggle browser controls
        // or pause. For now, let's make it pause.
        videoRef.current.pause()
      }
    }
  }

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      const handlePlayEvent = () => {
        setIsPlaying(true)
        setShowCustomControls(false)
        videoElement.controls = true
      }
      const handlePauseEvent = () => {
        setIsPlaying(false)
        setShowCustomControls(true)
        videoElement.controls = false
      }
      const handleEndedEvent = () => {
        setIsPlaying(false)
        setShowCustomControls(true)
        videoElement.controls = false
      }

      videoElement.addEventListener("play", handlePlayEvent)
      videoElement.addEventListener("pause", handlePauseEvent)
      videoElement.addEventListener("ended", handleEndedEvent)

      // Initial check for video state if it autoplays or is preloaded and played
      if (!videoElement.paused) {
        handlePlayEvent()
      }

      return () => {
        videoElement.removeEventListener("play", handlePlayEvent)
        videoElement.removeEventListener("pause", handlePauseEvent)
        videoElement.removeEventListener("ended", handleEndedEvent)
      }
    }
  }, [])

  const content = {
    ru: {
      title: "НАДЕЖНАЯ ПОДДЕРЖКА",
      description: `Agency: Instinct

Director: Murad Nogmov

Production: Bazelevs`,
      back: "Назад",
      top: "Наверх",
      play: "Воспроизвести",
      pause: "Пауза",
    },
    en: {
      title: "RELIABLE SUPPORT",
      description: `Agency: Instinct

Director: Murad Nogmov

Production: Bazelevs`,
      back: "Back",
      top: "Top",
      play: "Play",
      pause: "Pause",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  // Determine if the dark overlay should be shown (only for initial poster state)
  const showDarkOverlay =
    showCustomControls && (!videoRef.current || (videoRef.current.currentTime === 0 && !isPlaying))

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
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
                {currentContent.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {/* Tags Section */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="group">
                <div
                  className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-default border ${
                    isDarkMode
                      ? "bg-[#2D1B69]/20 text-[#A78BFA] border-[#2D1B69]/30 hover:bg-[#2D1B69]/30 hover:border-[#A78BFA]/50"
                      : "bg-[#F4F3FF] text-[#7C3AED] border-[#E9D5FF] hover:bg-[#EDE9FE] hover:border-[#A78BFA]/50"
                  }`}
                >
                  creative direction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-lg bg-black cursor-pointer group"
            onClick={handleVideoContainerClick}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              poster="/video-previews/reliable-support-preview.jpeg"
            >
              <source src="/videos/reliable-support.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay */}
            {showCustomControls && (
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 
                  ${showDarkOverlay ? "bg-black/30 group-hover:bg-black/50" : ""}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  aria-label={currentContent.play}
                >
                  <Play size={48} className="text-white ml-1" />
                </button>
              </div>
            )}
          </div>
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
