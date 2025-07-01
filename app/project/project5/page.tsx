"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUp, Play } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function S7AddOnsCase() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isRussian, setIsRussian] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const topRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [videoErrors, setVideoErrors] = useState<{ [key: number]: boolean }>({})

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

  // Setup Intersection Observer for lazy loading videos
  useEffect(() => {
    const lazyLoadOptions = {
      root: null,
      rootMargin: "200px", // Start loading 200px before the video enters viewport
      threshold: 0.1,
    }

    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number.parseInt(entry.target.getAttribute("data-video-index") || "0")
          console.log(`Loading video ${index}`)
          setLoadedVideos((prev) => new Set([...prev, index]))
          lazyLoadObserver.unobserve(entry.target)
        }
      })
    }, lazyLoadOptions)

    // Observe all video containers after they're rendered
    setTimeout(() => {
      videoContainerRefs.current.forEach((container, index) => {
        if (container && !loadedVideos.has(index)) {
          container.setAttribute("data-video-index", index.toString())
          lazyLoadObserver.observe(container)
          console.log(`Observing container ${index}`)
        }
      })
    }, 100)

    return () => {
      lazyLoadObserver.disconnect()
    }
  }, []) // Remove loadedVideos dependency to avoid re-running

  // Setup Intersection Observer for video playback
  useEffect(() => {
    const playbackOptions = {
      root: null,
      rootMargin: "-10%",
      threshold: 0.5,
    }

    const playbackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        const index = Number.parseInt(video.getAttribute("data-video-index") || "0")

        if (entry.isIntersecting) {
          console.log(`Playing video ${index}`)
          video.play().catch((e) => console.log("Auto-play prevented:", e))
          setPlayingVideos((prev) => new Set([...prev, index]))
        } else {
          console.log(`Pausing video ${index}`)
          video.pause()
          setPlayingVideos((prev) => {
            const newSet = new Set(prev)
            newSet.delete(index)
            return newSet
          })
        }
      })
    }, playbackOptions)

    // Observe videos that are loaded
    videoRefs.current.forEach((video, index) => {
      if (video && loadedVideos.has(index)) {
        video.setAttribute("data-video-index", index.toString())
        playbackObserver.observe(video)
        console.log(`Observing video ${index} for playback`)
      }
    })

    return () => {
      playbackObserver.disconnect()
    }
  }, [loadedVideos])

  // Scroll to top function
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const content = {
    ru: {
      title: "ДОПОЛНИТЕЛЬНЫЕ ПРОДУКТЫ S7",
      description: "Промо-кампания для продвижения дополнительных услуг S7 Airlines.\n\nАгентство: ONY",
      back: "Назад",
      top: "Наверх",
      loading: "Загрузка...",
    },
    en: {
      title: "S7 ADD-ONS",
      description: "Promotional campaign for additional services of S7 Airlines.\n\nAgency: ONY",
      back: "Back",
      top: "Top",
      loading: "Loading...",
    },
  }

  const currentContent = isRussian ? content.ru : content.en

  const videos = [
    {
      src: "/s7-addons/girl.mp4",
      alt: "S7 Girl Animation",
      size: "full",
      autoPlay: true,
      priority: true,
    },
    {
      src: "/s7-addons/plane.mp4",
      alt: "S7 Plane Animation",
      size: "half",
      autoPlay: true,
      priority: true,
    },
    {
      src: "/s7-addons/fur.mp4",
      alt: "S7 Fur Animation",
      size: "half",
    },
    {
      src: "/s7-addons/old.mp4",
      alt: "S7 Old Animation",
      size: "wide",
    },
    {
      src: "/s7-addons/family.mp4",
      alt: "S7 Family Animation",
      size: "half",
    },
    {
      src: "/s7-addons/bag.mp4",
      alt: "S7 Bag Animation",
      size: "half",
    },
  ]

  const images = [
    { src: "/s7-addons/pink-ad.jpeg", alt: "S7 Pink Advertisement", size: "full" },
    { src: "/s7-addons/green-ad.jpeg", alt: "S7 Green Advertisement", size: "half" },
    { src: "/s7-addons/yellow-ad.jpeg", alt: "S7 Yellow Advertisement", size: "half" },
  ]

  const handleVideoError = (index: number) => {
    console.warn(`Video error at index ${index}: ${videos[index]?.src}`)
    setVideoErrors((prev) => ({ ...prev, [index]: true }))
  }

  const handleVideoLoad = (index: number) => {
    console.log(`Video ${index} loaded successfully: ${videos[index]?.src}`)
  }

  // Video placeholder component
  const VideoPlaceholder = ({ video, index, className }: { video: any; index: number; className: string }) => (
    <div
      className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        <div
          className={`rounded-full p-4 mb-4 transition-all duration-300 ${
            isDarkMode ? "bg-white/10 text-white" : "bg-black/10 text-black"
          }`}
        >
          <Play size={32} />
        </div>
        <p
          className={`text-sm font-mono uppercase tracking-wider mb-2 ${
            isDarkMode ? "text-white/80" : "text-black/80"
          }`}
        >
          {currentContent.loading}
        </p>
        <p className={`text-xs ${isDarkMode ? "text-white/60" : "text-black/60"}`}>{video.alt}</p>
      </div>
      {/* Animated loading dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? "bg-white/40" : "bg-black/40"}`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
    </div>
  )

  // Render video or placeholder
  const renderVideo = (video: any, index: number, className: string) => {
    const isLoaded = loadedVideos.has(index)
    const hasError = videoErrors[index]

    console.log(`Rendering video ${index}, isLoaded: ${isLoaded}, hasError: ${hasError}`)

    if (!isLoaded) {
      return (
        <div
          ref={(el) => {
            videoContainerRefs.current[index] = el
            console.log(`Container ${index} ref set:`, !!el)
          }}
          className={className}
        >
          <VideoPlaceholder video={video} index={index} className="w-full h-full" />
        </div>
      )
    }

    if (hasError) {
      return (
        <div className={`${className} bg-gray-200 dark:bg-gray-800 flex items-center justify-center`}>
          <div className="text-center p-8">
            <p className="text-gray-500 text-sm mb-2">Video unavailable</p>
            <p className="text-gray-400 text-xs">{video.alt}</p>
          </div>
        </div>
      )
    }

    return (
      <div className={className}>
        <video
          ref={(el) => {
            videoRefs.current[index] = el
            console.log(`Video ${index} ref set:`, !!el)
          }}
          className="w-full h-full object-cover"
          playsInline
          muted
          loop
          preload="metadata"
          onError={() => handleVideoError(index)}
          onLoadedData={() => handleVideoLoad(index)}
          onCanPlay={() => console.log(`Video ${index} can play: ${video.src}`)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
    )
  }

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
        className={`fixed top-10 left-6 flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-mono uppercase z-50 hover:scale-110 ${
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
          className={`px-2 py-1 text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
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
                <p className="mb-6">{currentContent.description}</p>
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

              <div className="group">
                <div
                  className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-default border ${
                    isDarkMode
                      ? "bg-[#1E3A8A]/20 text-[#60A5FA] border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/30 hover:border-[#60A5FA]/50"
                      : "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] hover:bg-[#DBEAFE] hover:border-[#60A5FA]/50"
                  }`}
                >
                  copywriting
                </div>
              </div>

              <div className="group">
                <div
                  className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-default border ${
                    isDarkMode
                      ? "bg-[#064E3B]/20 text-[#34D399] border-[#064E3B]/30 hover:bg-[#064E3B]/30 hover:border-[#34D399]/50"
                      : "bg-[#ECFDF5] text-[#059669] border-[#D1FAE5] hover:bg-[#D1FAE5] hover:border-[#34D399]/50"
                  }`}
                >
                  art direction
                </div>
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
              return <div key={index}>{renderVideo(video, index, "w-full h-screen relative")}</div>
            } else if (video.size === "wide") {
              return (
                <div key={index} className="container mx-auto px-6">
                  <div className="max-w-6xl mx-auto">
                    {renderVideo(video, index, "aspect-[21/9] relative overflow-hidden rounded-lg")}
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
                      {renderVideo(video, index, "aspect-video relative overflow-hidden rounded-lg")}
                      {renderVideo(nextVideo, index + 1, "aspect-video relative overflow-hidden rounded-lg")}
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
                      {renderVideo(video, index, "aspect-video relative overflow-hidden rounded-lg")}
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
          className="fixed bottom-24 right-6 p-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-50 flex items-center space-x-2 font-mono text-xs uppercase bg-black text-white hover:bg-gray-800 hover:scale-110 shadow-lg"
        >
          <ArrowUp size={14} />
          <span>{currentContent.top}</span>
        </button>
      )}
    </div>
  )
}
