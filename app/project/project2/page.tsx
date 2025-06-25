"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play, ArrowUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SiberiaCase() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isRussian, setIsRussian] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)

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

  const content = {
    ru: {
      title: "МЫ — СИБИРЬ",
      description: `Самый ценный актив бренда — его история и доверие клиентов. В момент масштабных лесных пожаров в Сибири S7 Airlines временно отказалась от своего привычного имени в пользу исторического — «Авиакомпания Сибирь», чтобы привлечь внимание к экологической катастрофе и объединить людей вокруг общей цели.

На всех точках контакта — от сайта и мобильного приложения до ливреи самолётов и стойки регистрации — бренд «Сибирь» рассказывал о проблеме и предлагал конкретное решение: акция «Мы — Сибирь» на s7.ru/siberia. Каждый пассажир мог пожертвовать мили программы лояльности или денежные средства на посадку деревьев, а авиакомпания направляла часть доходов от продажи билетов по сибирским направлениям на восстановление лесов.

К инициативе присоединились ведущие компании — Unilever, Яндекс, Тинькофф и другие, что позволило за несколько недель собрать средства на посадку более одного миллиона деревьев. Проект объединил бизнес, общественность и клиентов вокруг важной экологической миссии, доказав, что бренд может быть мощным инструментом социальных изменений.`,
      back: "Назад",
      top: "Наверх",
      watchVideo: "Смотреть видео",
    },
    en: {
      title: "WE ARE SIBERIA",
      description: `A brand's most significant asset is its history and the trust it has built with customers. During the catastrophic forest fires in Siberia, S7 Airlines took a bold step by temporarily reviving its historical name, "Siberia Airlines." This move was aimed at raising awareness about the environmental disaster and rallying people around a shared cause.

From the website and mobile app to aircraft liveries and check-in counters, the "Siberia" brand effectively communicated the seriousness of the crisis while providing a tangible solution through the "We Are Siberia" campaign, accessible at s7.ru/siberia. Passengers had the opportunity to contribute by donating loyalty program miles or funds for tree planting, while the airline committed to allocating a portion of ticket sales from Siberian routes to forest restoration efforts.

Prominent companies, including Unilever, Yandex, and Tinkoff, joined the initiative, helping to raise funds that enabled the planting of over one million trees in just a few weeks. This collaborative effort brought together businesses, civil society, and customers in support of an essential environmental mission, demonstrating that a brand can be a powerful catalyst for social change.`,
      back: "Back",
      top: "Top",
      watchVideo: "Watch video",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  const images = [
    "/case-images/siberia-1.webp",
    "/case-images/siberia-2.webp",
    "/case-images/siberia-3.webp",
    "/case-images/siberia-4.webp",
    "/case-images/siberia-6.webp",
    "/case-images/siberia-7.webp",
    "/case-images/siberia-8.webp",
    "/case-images/siberia-9.webp",
    "/case-images/siberia-10.webp",
    "/case-images/siberia-11.webp",
    "/case-images/siberia-12.webp",
    "/case-images/siberia-13.webp",
    "/case-images/siberia-14.webp",
    "/case-images/siberia-15.webp",
    "/case-images/siberia-16.webp",
    "/case-images/siberia-17.webp",
    "/case-images/siberia-18.webp",
    "/case-images/siberia-19.webp",
    "/case-images/siberia-20.webp",
    "/case-images/siberia-21.webp",
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
                src="https://i.ytimg.com/vi/W9UGoqgx67s/maxresdefault.jpg"
                alt="S7 Airlines - We Are Siberia"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/W9UGoqgx67s?autoplay=1"
                title="S7 Airlines - We Are Siberia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Siberia campaign image ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 3}
            />
          </div>
        ))}
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
