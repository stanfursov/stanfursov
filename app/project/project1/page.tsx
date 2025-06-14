"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Contrast, ArrowUp, Play } from "lucide-react"

export default function BrightLineCase() {
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
      title: "ГДЕ НАЧИНАЕТСЯ СВЕТЛАЯ ПОЛОСА",
      description: `Рекламная кампания S7 Airlines под названием «Где начинается светлая полоса?» была запущена в 2023 году с целью вдохновить людей на путешествия и показать, что светлую полосу в жизни не обязательно ждать — её можно создавать самому.

Идея кампании — не просто ждать счастья, а активно создавать его, отправляясь в путешествия и открывая новые горизонты. Это отражает внутренние устремления бренда и его миссию вдохновлять людей на развитие навыка счастья через путешествия.`,
      back: "Назад",
      top: "Наверх",
      watchVideo: "Смотреть видео",
    },
    en: {
      title: "WHERE DOES THE BRIGHT LINE BEGIN?",
      description: `In 2023, S7 Airlines unveiled its advertising campaign titled "Where Does the Bright Line Begin?" The aim of the campaign is to inspire people to travel and convey the message that rather than waiting for a moment of joy, individuals can create their own.

At the heart of this campaign lies the belief that happiness is not something to be passively awaited, but rather an experience to be actively pursued through exploration and adventure. This philosophy aligns with the brand's core mission: to empower individuals to cultivate their own sense of happiness through travel and the discovery of new horizons.`,
      back: "Back",
      top: "Top",
      watchVideo: "Watch video",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  const images = [
    {
      src: "/bright-line-images/girl-ocean.jpg",
      alt: "Girl by the ocean - Where the bright line begins",
    },
    {
      src: "/bright-line-images/snowboarder.jpg",
      alt: "Snowboarder in action - Where the bright line begins",
    },
    {
      src: "/bright-line-images/man-horse.jpg",
      alt: "Man with horse - Where the bright line begins",
    },
    {
      src: "/bright-line-images/underwater.jpg",
      alt: "Underwater swimming - Where the bright line begins",
    },
    {
      src: "/bright-line-images/airplane.jpg",
      alt: "S7 Airlines airplane in flight - Where the bright line begins",
    },
    {
      src: "/bright-line-images/sleeping-girl.jpg",
      alt: "Peaceful sleep - Where the bright line begins",
    },
  ]

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
                {currentContent.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
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
                src="https://i.ytimg.com/vi/BULrhoJt-8c/maxresdefault.jpg"
                alt="S7 Airlines - Where Does the Bright Line Begin?"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/BULrhoJt-8c?autoplay=1"
                title="S7 Airlines - Where Does the Bright Line Begin?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Images Section - Simple Layout 1, 2, 1, 2 */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* First image - Full width */}
          <div className="w-full">
            <div className="w-full h-auto">
              <img
                src={images[0].src || "/placeholder.svg"}
                alt={images[0].alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Second row - Two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-auto">
              <img
                src={images[1].src || "/placeholder.svg"}
                alt={images[1].alt}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full h-auto">
              <img
                src={images[2].src || "/placeholder.svg"}
                alt={images[2].alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Third row - Full width */}
          <div className="w-full">
            <div className="w-full h-auto">
              <img
                src={images[3].src || "/placeholder.svg"}
                alt={images[3].alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Fourth row - Two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-auto">
              <img
                src={images[4].src || "/placeholder.svg"}
                alt={images[4].alt}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full h-auto">
              <img
                src={images[5].src || "/placeholder.svg"}
                alt={images[5].alt}
                className="w-full h-auto object-contain"
              />
            </div>
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
