"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Custom LoadingDots component to replace the missing one from lucide-react
const LoadingDots = () => (
  <span className="inline-flex ml-1">
    <span className="animate-pulse mr-0.5">.</span>
    <span className="animate-pulse animation-delay-200 mr-0.5">.</span>
    <span className="animate-pulse animation-delay-400">.</span>
  </span>
)

// Function to colorize award text
const colorizeAward = (award: string) => {
  const goldWords = ["GOLD", "ЗОЛОТО", "ГРАН-ПРИ", "GRAND PRIX", "Победитель", "Winner", "ФИНАЛИСТ", "FINALIST"]
  const silverWords = ["SILVER", "СЕРЕБРО"]
  const bronzeWords = ["BRONZE", "БРОНЗА"]

  let coloredAward = award

  // Gold - используем более гибкие регулярные выражения
  goldWords.forEach((word) => {
    const regex = new RegExp(`(^|\\s)(${word})($|\\s|—)`, "gi")
    coloredAward = coloredAward.replace(regex, (match, before, word, after) => {
      return `${before}<span style="color: #FFD700">${word}</span>${after}`
    })
  })

  // Silver
  silverWords.forEach((word) => {
    const regex = new RegExp(`(^|\\s)(${word})($|\\s|—)`, "gi")
    coloredAward = coloredAward.replace(regex, (match, before, word, after) => {
      return `${before}<span style="color: #C0C0C0">${word}</span>${after}`
    })
  })

  // Bronze
  bronzeWords.forEach((word) => {
    const regex = new RegExp(`(^|\\s)(${word})($|\\s|—)`, "gi")
    coloredAward = coloredAward.replace(regex, (match, before, word, after) => {
      return `${before}<span style="color: #CD7F32">${word}</span>${after}`
    })
  })

  return coloredAward
}

export default function Work() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [isRussian, setIsRussian] = useState(true) // Default to Russian
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

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

  // Get project color based on ID
  const getProjectColor = (id: string) => {
    const colors: { [key: string]: string } = {
      project1: "#E8A3C3",
      project2: "#5DB25C",
      project3: "#EECE68",
      project4: "#DF6837",
      project5: "#DB83F8",
      project6: "#C9BFDA",
      project7: "#F4FBE2",
    }
    return colors[id] || "#888888"
  }

  // Projects data
  const projects = [
    {
      id: "project1",
      name: isRussian ? "ГДЕ НАЧИНАЕТСЯ СВЕТЛАЯ ПОЛОСА" : "WHERE THE BRIGHT LINE BEGINS",
      type: isRussian ? "Кампания" : "Campaign",
      awards: [
        {
          festival: "WHITE SQUARE",
          awards: isRussian
            ? ["БРОНЗА — ТВ/Экраны", "БРОНЗА — Онлайн", "БРОНЗА — Путешествия/Досуг"]
            : ["BRONZE — TV/Screens", "BRONZE — Online", "BRONZE — Travel/Leisure"],
        },
        {
          festival: "ADCR",
          awards: isRussian
            ? ["ЗОЛОТО — ТВ/Кино реклама", "СЕРЕБРО — Онлайн видео", "СЕРЕБРО — Крафт: режиссура"]
            : ["GOLD — TV/Cinema Commercials", "SILVER — Online Videos", "SILVER — Craft: direction"],
        },
        {
          festival: "RED APPLE",
          awards: isRussian
            ? [
                "СЕРЕБРО — Кампании: Секторы/Туризм",
                "СЕРЕБРО — Фильм: Крафт/Лучшая режиссура",
                "СЕРЕБРО — Крафт: режиссура",
              ]
            : [
                "SILVER — Campaigns: Sectors/Tourism",
                "SILVER — Film: Craft/Best Direction",
                "SILVER — Craft: direction",
              ],
        },
        {
          festival: "SOSTAV.RU AWARDS",
          awards: isRussian
            ? ["ЗОЛОТО — Кампания", "СЕРЕБРО — Рекламный ролик"]
            : ["GOLD — Campaign", "SILVER — Ad Spot"],
        },
        {
          festival: "E+ AWARDS (ex. EFFIE)",
          awards: isRussian ? ["СЕРЕБРО — Туризм/Путешествия", "СЕРЕБРО"] : ["SILVER — Tourism/Travel", "SILVER"],
        },
        {
          festival: "MERCURY",
          awards: isRussian
            ? ["ЗОЛОТО — Лучший ТВ/OLV рекламный ролик", "СЕРЕБРО — Кампания реального времени"]
            : ["GOLD — Best TV/OLV Ad Video", "SILVER — Real Time Marketing Campaign"],
        },
      ],
    },
    {
      id: "project2",
      name: isRussian ? "МЫ — СИБИРЬ" : "WE ARE SIBERIA",
      type: isRussian ? "Социальная кампания" : "Social Campaign",
      awards: [
        {
          festival: "EPICA AWARDS",
          awards: isRussian ? ["СЕРЕБРО — Актуальное и в реальном времени"] : ["SILVER — Topical & Real Time"],
        },
        {
          festival: "EUROBEST",
          awards: isRussian ? ["ШОРТ-ЛИСТ"] : ["SHORTLIST"],
        },
        {
          festival: "SOSTAV.RU AWARDS",
          awards: isRussian
            ? ["ЗОЛОТО — Лучшая рекламная кампания", "СЕРЕБРО — Лучшая социальная кампания"]
            : ["GOLD — Best Ad Campaign", "SILVER — Best Social Campaign"],
        },
        {
          festival: "ADCE",
          awards: isRussian ? ["ЗОЛОТО — Живые трюки брендовая активация"] : ["GOLD — Live Stunts Brand Activation"],
        },
        {
          festival: "WHITE SQUARE",
          awards: isRussian
            ? [
                "ЗОЛОТО — Изменения к лучшему / Кампания",
                "ЗОЛОТО — Эмбиент медиа",
                "ЗОЛОТО — Интегрированная кампания",
                "ЗОЛОТО — Запуск бренда / Перезапуск кампании",
              ]
            : [
                "GOLD — Change for Good / Campaign",
                "GOLD — Ambient Media",
                "GOLD — Integrated Campaign",
                "GOLD — Brand Launch / Re-Launch Campaign",
              ],
        },
        {
          festival: "RED APPLE",
          awards: isRussian
            ? [
                "ГРАН-ПРИ",
                "СЕРЕБРО — Путешествия/Кампании",
                "СЕРЕБРО — Лучшее использование PR",
                "БРОНЗА — Лучшее использование эмбиента",
              ]
            : [
                "GRAND PRIX",
                "SILVER — Travel/Campaigns",
                "SILVER — Best Use of Public Relations",
                "BRONZE — Best Use of Ambient",
              ],
        },
      ],
    },
    {
      id: "project3",
      name: isRussian ? "КАК ПРЕКРАСЕН ЭТОТ МИР" : "WHAT A BEAUTIFUL WORLD",
      type: isRussian ? "Кампания" : "Campaign",
      awards: [
        {
          isLoading: true,
          festival: "",
          awards: [],
        },
      ],
    },
    {
      id: "project4",
      name: isRussian ? "АВИАКОМПАНИЯ CITRUS" : "CITRUS AIRLINE",
      type: isRussian ? "Брендинг" : "Brand Identity",
      awards: [
        {
          isLoading: true,
          festival: "",
          awards: [],
        },
      ],
    },
    {
      id: "project5",
      name: isRussian ? "ДОПОЛНИТЕЛЬНЫЕ ПРОДУКТЫ S7" : "S7 ADD-ONS",
      type: isRussian ? "Промо" : "Promo",
      awards: [
        {
          festival: "EUROPEAN DESIGN AWARDS",
          awards: isRussian ? ["ФИНАЛИСТ — Корпоративная иллюстрация"] : ["FINALIST — Corporate Illustration"],
        },
        {
          festival: "ADCR",
          awards: isRussian ? ["ШОРТ-ЛИСТ — Иллюстрация"] : ["SHORTLIST — Illustration"],
        },
        {
          festival: "SREDA DESIGN FESTIVAL",
          awards: isRussian ? ["БРОНЗА — Дизайн наружной рекламы"] : ["BRONZE — Outdoor Advertising Design"],
        },
      ],
    },
    {
      id: "project6",
      name: isRussian ? "КАРМАН" : "POCKET",
      type: isRussian ? "Кампания" : "Campaign",
      awards: [
        {
          festival: isRussian ? 'ГОСУДАРСТВЕННАЯ ПРЕМИЯ "НАШ ВКЛАД"' : "NASH VKLAD AWARDS",
          awards: isRussian ? ["Победитель — Демография"] : ["Winner — Demography"],
        },
      ],
    },
    {
      id: "project7",
      name: isRussian ? "НАДЕЖНАЯ ПОДДЕРЖКА" : "RELIABLE SUPPORT",
      type: isRussian ? "Кампания" : "Campaign",
      awards: [
        {
          isLoading: true,
          festival: "",
          awards: [],
        },
      ],
    },
  ]

  // Conferences data
  const conferences = [
    {
      name: isRussian ? "НРФ" : "NAF",
      url: "https://advertisingforum.ru",
    },
    {
      name: isRussian ? "Коммерсант" : "Kommersant Events",
      url: "https://events.kommersant.ru",
    },
    {
      name: isRussian ? "Российская Креативная Неделя" : "Russian Creative Week",
      url: "https://creativityweek.ru",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-[#f0f0f0]" : "bg-[#f8f8f8] text-[#333333]"
      }`}
    >
      {/* Back Button */}
      <Link
        href="/"
        className={`fixed top-10 left-6 flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all duration-300 font-mono uppercase z-50 ${
          isDarkMode ? "bg-white/10 text-[#f0f0f0] shadow-lg" : "bg-black text-white"
        }`}
      >
        <ArrowLeft size={14} />
        <span>{isRussian ? "Назад" : "Back"}</span>
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
      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Projects Column */}
          <div>
            <h2 className="text-sm font-mono uppercase mb-8 tracking-wider">{isRussian ? "ПРОЕКТЫ" : "PROJECTS"}</h2>
            <div className="space-y-4 mb-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="cursor-pointer transition-colors duration-200 flex items-center justify-between group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Conditionally render Link or anchor tag to avoid nesting */}
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-sm leading-relaxed transition-colors duration-300 flex-1 uppercase ${
                        hoveredProject === project.id
                          ? `text-[${getProjectColor(project.id)}]`
                          : isDarkMode
                            ? "text-[#b0b0b0]"
                            : "text-gray-600"
                      }`}
                      style={hoveredProject === project.id ? { color: getProjectColor(project.id) } : {}}
                    >
                      {project.name}
                      <span className={`ml-4 ${isDarkMode ? "text-[#888888]" : "text-gray-500"}`}>
                        — {project.type}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={
                        project.id === "project1" ||
                        project.id === "project2" ||
                        project.id === "project3" ||
                        project.id === "project4" ||
                        project.id === "project5"
                          ? `/project/${project.id}`
                          : `#`
                      }
                      className={`font-mono text-sm leading-relaxed transition-colors duration-300 flex-1 uppercase ${
                        hoveredProject === project.id
                          ? `text-[${getProjectColor(project.id)}]`
                          : isDarkMode
                            ? "text-[#b0b0b0]"
                            : "text-gray-600"
                      }`}
                      style={hoveredProject === project.id ? { color: getProjectColor(project.id) } : {}}
                    >
                      {project.name}
                      <span className={`ml-4 ${isDarkMode ? "text-[#888888]" : "text-gray-500"}`}>
                        — {project.type}
                      </span>
                    </Link>
                  )}

                  {/* Arrow button */}
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-all duration-300 p-1 rounded ${
                        isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                      }`}
                    >
                      <ArrowUpRight
                        size={16}
                        className={`transition-colors duration-300 ${
                          hoveredProject === project.id
                            ? "text-current"
                            : isDarkMode
                              ? "text-[#888888]"
                              : "text-gray-500"
                        }`}
                        style={hoveredProject === project.id ? { color: getProjectColor(project.id) } : {}}
                      />
                    </a>
                  ) : (
                    <Link
                      href={
                        project.id === "project1" ||
                        project.id === "project2" ||
                        project.id === "project3" ||
                        project.id === "project4" ||
                        project.id === "project5"
                          ? `/project/${project.id}`
                          : `#`
                      }
                      className={`transition-all duration-300 p-1 rounded ${
                        isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                      }`}
                    >
                      <ArrowUpRight
                        size={16}
                        className={`transition-colors duration-300 ${
                          hoveredProject === project.id
                            ? "text-current"
                            : isDarkMode
                              ? "text-[#888888]"
                              : "text-gray-500"
                        }`}
                        style={hoveredProject === project.id ? { color: getProjectColor(project.id) } : {}}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* On Stage Section */}
            <h2 className="text-sm font-mono uppercase mb-8 tracking-wider">{isRussian ? "НА СЦЕНЕ" : "ON STAGE"}</h2>
            <div className="space-y-4">
              {conferences.map((conference, index) => (
                <div
                  key={index}
                  className="cursor-pointer transition-colors duration-200 flex items-center justify-between group"
                >
                  <div
                    className={`font-mono text-sm leading-relaxed ${isDarkMode ? "text-[#b0b0b0]" : "text-gray-600"}`}
                  >
                    <span className="uppercase">{conference.name}</span>
                  </div>
                  <a
                    href={conference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 p-1 rounded ${
                      isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                    }`}
                  >
                    <ArrowUpRight
                      size={16}
                      className={`transition-colors duration-300 ${isDarkMode ? "text-[#888888] hover:text-white" : "text-gray-500 hover:text-black"}`}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Column */}
          <div>
            <h2 className="text-sm font-mono uppercase mb-8 tracking-wider">{isRussian ? "НАГРАДЫ" : "AWARDS"}</h2>
            <div className="space-y-6">
              {hoveredProject && (
                <div className="animate-in fade-in duration-300">
                  {projects
                    .find((p) => p.id === hoveredProject)
                    ?.awards.map((festival, index) => (
                      <div key={index} className="mb-6">
                        <h3 className={`font-mono text-sm uppercase mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                          {festival.isLoading ? (
                            <span>
                              {isRussian ? "ЖЮРИ ЕЩЕ ДУМАЕТ" : "JURY STILL THINKING"}
                              <LoadingDots />
                            </span>
                          ) : (
                            festival.festival
                          )}
                        </h3>
                        {!festival.isLoading && (
                          <div className="space-y-1">
                            {festival.awards.map((award, awardIndex) => (
                              <div
                                key={awardIndex}
                                className={`font-mono text-[0.75rem] ${isDarkMode ? "text-[#b0b0b0]" : "text-gray-600"}`}
                                dangerouslySetInnerHTML={{ __html: colorizeAward(award) }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {!hoveredProject && (
                <div className={`font-mono text-[0.75rem] ${isDarkMode ? "text-[#666666]" : "text-gray-400"}`}>
                  {isRussian
                    ? "Наведите курсор на проект, чтобы увидеть награды"
                    : "Hover over a project to see awards"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
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
            {isRussian ? "Обо мне" : "HOME"}
          </Link>
          <span
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDarkMode ? "text-white scale-110" : "text-black scale-110"}`}
          >
            {isRussian ? "Проекты" : "WORK"}
          </span>
          <Link
            href="/talk"
            className={`text-xs font-mono uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${
              isDarkMode ? "text-[#888888] hover:text-white" : "text-[#555555] hover:text-black"
            }`}
          >
            {isRussian ? "Связь" : "CHAT"}
          </Link>
        </div>
      </nav>
    </div>
  )
}
