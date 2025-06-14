"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Contrast, ArrowUp } from "lucide-react"

export default function S7AddOnsCase() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isRussian, setIsRussian] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [videoErrors, setVideoErrors] = useState<{ [key: number]: boolean }>({})

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

  // Setup Intersection Observer for videos
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observers: IntersectionObserver[] = []

    videoRefs.current.forEach((video, index) => {
      if (!video) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((e) => console.log("Auto-play prevented:", e))
          } else {
            video.pause()
          }
        })
      }, options)

      observer.observe(video)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const content = {
    ru: {
      title: "ДОПОЛНИТЕЛЬНЫЕ ПРОДУКТЫ S7",
      description:
        "Промо-кампания для продвижения дополнительных услуг S7 Airlines. Арт-дирекшн совместно cо студией ONY.",
      back: "Назад",
      top: "Наверх",
    },
    en: {
      title: "S7 ADD-ONS",
      description:
        "Promotional campaign for additional services of S7 Airlines. Art direction in collaboration with ONY studio.",
      back: "Back",
      top: "Top",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  const videos = [
    {
      src: "/s7-addons/girl.mp4",
      alt: "S7 Girl Animation",
      size: "full",
      poster: "/placeholder.svg?height=1080&width=1920&text=Girl+Animation",
      autoPlay: true,
      priority: true,
    },
    {
      src: "/s7-addons/plane.mp4",
      alt: "S7 Plane Animation",
      size: "half",
      poster: "/placeholder.svg?height=720&width=1280&text=Plane+Animation",
      autoPlay: true,
      priority: true,
    },
    {
      src: "/s7-addons/fur.mp4",
      alt: "S7 Fur Animation",
      size: "half",
      poster: "/placeholder.svg?height=720&width=1280&text=Fur+Animation",
    },
    {
      src: "/s7-addons/old.mp4",
      alt: "S7 Old Animation",
      size: "wide",
      poster: "/placeholder.svg?height=600&width=1400&text=Old+Man+Animation",
    },
    {
      src: "/s7-addons/family.mp4",
      alt: "S7 Family Animation",
      size: "half",
      poster: "/placeholder.svg?height=720&width=1280&text=Family+Animation",
    },
    {
      src: "/s7-addons/bag.mp4",
      alt: "S7 Bag Animation",
      size: "half",
      poster: "/placeholder.svg?height=720&width=1280&text=Bag+Animation",
    },
  ]

  const images = [
    { src: "/s7-addons/pink-ad.jpeg", alt: "S7 Pink Advertisement", size: "full" },
    { src: "/s7-addons/green-ad.jpeg", alt: "S7 Green Advertisement", size: "half" },
    { src: "/s7-addons/yellow-ad.jpeg", alt: "S7 Yellow Advertisement", size: "half" },
  ]

  const handleVideoError = (index: number) => {
    console.log(`Video error at index ${index}`)
    setVideoErrors((prev) => ({ ...prev, [index]: true }))
  }

  useEffect(() => {
    console.log("S7 AddOns component mounted")
    console.log("Videos array:", videos)
  }, [])

  // Preload first two videos
  useEffect(() => {
    const preloadVideos = async () => {
      try {
        // Preload first two videos
        const videoPromises = videos.slice(0, 2).map((video) => {
          return new Promise((resolve, reject) => {
            const videoElement = document.createElement("video")
            videoElement.src = video.src
            videoElement.preload = "auto"
            videoElement.onloadeddata = () => resolve(video.src)
            videoElement.onerror = () => reject(`Failed to preload ${video.src}`)
          })
        })

        await Promise.all(videoPromises)
        console.log("First two videos preloaded successfully")
      } catch (error) {
        console.error("Error preloading videos:", error)
      }
    }

    preloadVideos()
  }, [])

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

      {/* Videos Section - Variative Grid */}
      <div className="pb-16">
        <div className="space-y-8">
          {videos.map((video, index) => {
            if (video.size === "full") {
              return (
                <div key={index} className="w-full h-screen relative">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                    autoPlay={video.autoPlay}
                    preload="auto"
                    poster={video.poster}
                    onError={() => handleVideoError(index)}
                    onLoadStart={() => console.log(`Loading video ${index}: ${video.src}`)}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
            } else if (video.size === "wide") {
              return (
                <div key={index} className="container mx-auto px-6">
                  <div className="aspect-[21/9] relative overflow-hidden rounded-lg max-w-6xl mx-auto">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      loop
                      autoPlay={video.autoPlay}
                      preload="auto"
                      poster={video.poster}
                      onError={() => handleVideoError(index)}
                      onLoadStart={() => console.log(`Loading video ${index}: ${video.src}`)}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )
            } else {
              // For half-size videos, we need to group them
              const nextVideo = videos[index + 1]
              if (nextVideo && nextVideo.size === "half" && index % 2 === 0) {
                return (
                  <div key={`pair-${index}`} className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay={video.autoPlay}
                          preload="auto"
                          poster={video.poster}
                          onError={() => handleVideoError(index)}
                          onLoadStart={() => console.log(`Loading video ${index}: ${video.src}`)}
                        >
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <video
                          ref={(el) => (videoRefs.current[index + 1] = el)}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay={nextVideo.autoPlay}
                          preload="auto"
                          poster={nextVideo.poster}
                          onError={() => handleVideoError(index + 1)}
                          onLoadStart={() => console.log(`Loading video ${index + 1}: ${nextVideo.src}`)}
                        >
                          <source src={nextVideo.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                )
              } else if (video.size === "half" && index % 2 === 1) {
                // Skip rendering here, it will be handled by the pair above
                return null
              } else {
                // Single half-size video
                return (
                  <div key={index} className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay={video.autoPlay}
                          preload="auto"
                          poster={video.poster}
                          onError={() => handleVideoError(index)}
                          onLoadStart={() => console.log(`Loading video ${index}: ${video.src}`)}
                        >
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                )
              }
            }
          })}
        </div>
      </div>

      {/* Images Section - Variative Grid */}
      <div className="pb-16">
        <div className="space-y-8">
          {images.map((image, index) => {
            if (image.size === "full") {
              return (
                <div key={index} className="w-full h-screen relative">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index < 1}
                  />
                </div>
              )
            } else {
              // For half-size images, group them
              const nextImage = images[index + 1]
              if (nextImage && nextImage.size === "half" && index % 2 === 1) {
                return (
                  <div key={`image-pair-${index}`} className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                        <Image
                          src={nextImage.src || "/placeholder.svg"}
                          alt={nextImage.alt}
                          fill
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </div>
                )
              } else if (image.size === "half" && index % 2 === 0) {
                // Skip rendering here, it will be handled by the pair above
                return null
              } else {
                // Single half-size image
                return (
                  <div key={index} className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
            }
          })}
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
