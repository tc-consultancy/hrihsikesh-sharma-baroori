"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
  Sun,
  Moon,
  Calendar,
  Clock,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
} from "lucide-react"
import { Badge } from "../app/components/ui/badge"
import Link from "next/link"

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    let ticking = false
    const updateMousePosition = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
          ticking = false
        })
        ticking = true
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    window.addEventListener("mousemove", updateMousePosition, { passive: true })

    const interactiveElements = document.querySelectorAll("button, a, [data-magnetic]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-slate-900 dark:bg-slate-100 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-slate-400/30 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.2,
        }}
      />
    </>
  )
}

// Hand-drawn SVG Icons
const HandDrawnIcons = {
  PaperPlane: () => (
    <svg width="60" height="40" viewBox="0 0 60 40" className="text-slate-600 dark:text-slate-400">
      <path
        d="M5 20 L50 5 L35 20 L50 35 L5 20 Z M35 20 L25 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Atom: () => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="text-slate-600 dark:text-slate-400">
      <circle cx="25" cy="25" r="3" fill="currentColor" />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(0 25 25)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 25 25)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 25 25)"
      />
    </svg>
  ),

  CodeBlock: () => (
    <svg width="60" height="45" viewBox="0 0 60 45" className="text-slate-600 dark:text-slate-400">
      <rect x="5" y="5" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <circle cx="20" cy="15" r="2" fill="currentColor" />
      <circle cx="28" cy="15" r="2" fill="currentColor" />
      <path
        d="M12 25 L18 25 M12 30 L25 30 M12 35 L20 35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  Lightbulb: () => (
    <svg width="40" height="55" viewBox="0 0 40 55" className="text-slate-600 dark:text-slate-400">
      <path
        d="M20 5 C28 5 35 12 35 20 C35 25 32 29 28 32 L28 40 L12 40 L12 32 C8 29 5 25 5 20 C5 12 12 5 20 5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M15 45 L25 45 M17 50 L23 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M20 2 L20 8 M32 8 L28 12 M38 20 L32 20 M32 32 L28 28 M8 8 L12 12 M2 20 L8 20 M8 32 L12 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  Gear: () => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="text-slate-600 dark:text-slate-400">
      <path
        d="M25 15 C30 15 35 20 35 25 C35 30 30 35 25 35 C20 35 15 30 15 25 C15 20 20 15 25 15 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M25 5 L27 12 L23 12 Z M45 25 L38 27 L38 23 Z M25 45 L23 38 L27 38 Z M5 25 L12 23 L12 27 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M37 13 L32 16 L30 12 Z M37 37 L32 34 L30 38 Z M13 37 L18 34 L20 38 Z M13 13 L18 16 L20 12 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),

  Database: () => (
    <svg width="45" height="60" viewBox="0 0 45 60" className="text-slate-600 dark:text-slate-400">
      <ellipse cx="22.5" cy="12" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M5.5 12 L5.5 48 C5.5 52 12 55 22.5 55 C33 55 39.5 52 39.5 48 L39.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse cx="22.5" cy="25" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="22.5" cy="38" rx="17" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
}

// Floating Hand-drawn Elements
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Paper Plane - Top Left */}
      <motion.div className="absolute top-20 left-16 animate-drift" style={{ animationDelay: "0s" }}>
        <HandDrawnIcons.PaperPlane />
      </motion.div>

      {/* Atom - Center Left */}
      <motion.div className="absolute top-1/2 left-1/4 animate-float-gentle" style={{ animationDelay: "2s" }}>
        {/* <HandDrawnIcons.Atom /> */}
      </motion.div>

      {/* Code Block - Top Right */}
      <motion.div className="absolute top-32 right-20 animate-drift" style={{ animationDelay: "1s" }}>
        <HandDrawnIcons.CodeBlock />
      </motion.div>

      {/* Lightbulb - Bottom Left */}
      <motion.div className="absolute bottom-32 left-20 animate-float-gentle" style={{ animationDelay: "3s" }}>
        <HandDrawnIcons.Lightbulb />
      </motion.div>

      {/* Gear - Bottom Right */}
      <motion.div className="absolute bottom-40 right-1/4 animate-drift" style={{ animationDelay: "4s" }}>
        <HandDrawnIcons.Gear />
      </motion.div>

      {/* Database - Center Right */}
      <motion.div className="absolute top-2/3 right-16 animate-float-gentle" style={{ animationDelay: "1.5s" }}>
        <HandDrawnIcons.Database />
      </motion.div>
    </div>
  )
}

// Theme Toggle Component
// const ThemeToggle = () => {
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

//     if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }
//   }, [])

//   const toggleTheme = useCallback(() => {
//     const newTheme = !isDark
//     setIsDark(newTheme)

//     if (newTheme) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     }
//   }, [isDark])

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className="relative w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ duration: 0.15 }}
//       data-magnetic
//       aria-label="Toggle theme"
//     >
//       <AnimatePresence mode="wait">
//         {isDark ? (
//           <motion.div
//             key="moon"
//             initial={{ rotate: -45, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: 45, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Moon className="w-4 h-4 text-slate-600" />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="sun"
//             initial={{ rotate: 45, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: -45, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Sun className="w-4 h-4 text-slate-600" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   )
// }

// Clean Button Component
const CleanButton = ({ children, className = "", variant = "default", href, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)

  const variants: any = {
    default:
      "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm",
    outline:
      "border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    accent: "bg-green-300 hover:bg-green-400 text-slate-900 shadow-sm",
  }

  const Component = href ? "a" : "button"

  return (
    <Component
      ref={ref}
      href={href}
      className={`relative px-6 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${variants[variant]} ${className}`}
      data-magnetic
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}


// Enhanced Magnetic Button Component
const MagneticButton = ({ children, className = "", variant = "default", href, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      button.style.transition = "transform 0.1s ease-out"
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      button.style.transition = "transform 0.3s ease-out"
      button.style.transform = "translate(0px, 0px)"
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants: any = {
    default:
      "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  }

  const Component = href ? "a" : "button"

  return (
    <motion.div className="relative">
      <Component
        ref={ref}
        href={href}
        className={`relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 font-medium ${variants[variant]} ${className}`}
        data-magnetic
        {...props}
      >
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/10 dark:bg-black/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-sm"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Component>
    </motion.div>
  )
}

// Article Card Component
const ArticleCard = ({ article, index }: { article: any; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          {article.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">{article.title}</h3>

      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{article.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {article.tags.map((tag: string, tagIndex: number) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Link target="blank" href={article.link}>
          <CleanButton variant="ghost" className="text-sm px-4 py-2">
            Read More
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </CleanButton>
        </Link>
      </div>
    </motion.article>
  )
}

// Call Stack Card Component
const CallStackCard = ({ project, index, totalCards }: { project: any; index: number; totalCards: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -index * 15])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95 - index * 0.02])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
  const zIndex = useTransform(scrollYProgress, [0, 0.8, 1], [index + 1, index + 1, totalCards + index])

  return (
    <motion.div ref={cardRef} style={{ y, scale, opacity, zIndex }} className="sticky top-32 w-full px-4 sm:px-6">
      <motion.div
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Text section */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
              <span className="text-sm font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {project.year}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, tagIndex: number) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.demo && (
                <Link target="_blank" href={project.demo}>
                  <MagneticButton className="flex items-center gap-2">
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              )}

            </div>
          </div>

          {/* Image section */}
          <div className="relative w-full">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner flex items-center justify-center"
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-mono px-2 py-1 rounded-full">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}








export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const projects = [
    {
      title: "Full Stack E-Commerce Platform",
      year: "Jan 2019 – Jun 2019",
      description:
        "A comprehensive e-commerce platform designed to deliver a smooth and secure online shopping experience. It offers seamless product browsing, cart management, and order tracking, supported by a scalable architecture that ensures high performance and reliability. The platform provides advanced search and personalized user interactions while maintaining strong data security and high availability through optimized design and efficient deployment strategies.",
      image: "/ecommerce.png",
      tags: ["Angular", "Spring Boot", "AWS", "MySQL", "Redis", "Elasticsearch"],
      demo: "",
      github: "https://github.com/priyanshtiwari001/full-stack-expanse-tracker",
    },
    {
      title: "Healthcare Management System",
      year: "Jul 2019 – Oct 2020",
      description:
        "An advanced insurance claims management system built to streamline policy creation, claims processing, and settlement workflows. The application delivers a seamless experience through automated workflows, real-time dashboards, and intelligent document handling that significantly reduce manual effort. Designed for scalability and reliability, it supports complex reporting, real-time analytics, and secure document management while maintaining high availability and optimized performance under heavy user loads.",
      image: "/health.png",
      tags: ["Angular", "Spring Boot", "PostgreSQL", "Azure", "Kubernetes", "Microservices"],
      demo: "",
      github: "https://www.npmjs.com/package/authease",
    },
    {
      title: "Internet Banking Platform",
      year: "Aug 2024 – Present",
      description:
        "A scalable banking application designed to manage core financial operations such as account management, transaction processing, and loan services. The system ensures high reliability and security through robust authentication, role-based access control, and optimized API design. With a responsive interface and strong backend integration, it delivers seamless performance and exceptional user experience. Deployed on cloud infrastructure with automated testing and CI/CD pipelines, the platform achieves high availability, faster deployments, and efficient monitoring for smooth end-to-end operations.",
      image: "/internet.png",
      tags: ["Spring Boot", "Microservices", "React.js/Next.js", "AWS (EC2, RDS, Docker)", "Spring Security & JWT"],
      demo: "",
      github: "https://github.com/priyanshtiwari001/lama-podcast",
    },

  ]

  const articles = [
    {
      title: "The Ultimate React + TypeScript Cheatsheet: A Practical Guide for Every Developer",
      excerpt:
        "Whether you’re just starting with TypeScript in React or need a quick refresher, this cheatsheet is your go-to guide to master the essentials.",
      date: "Jun 26, 2024",
      readTime: "3 min read",
      tags: ["Typescript", "React", "Tutorial"],
      link: "https://medium.com/@priyanshu108tiwari/the-ultimate-react-typescript-cheatsheet-a-practical-guide-for-every-developer-a2e3935c8f20"
    },
    {
      title: "React Interview Questions You Must Know as a Web Developer (2025 Edition) Part-1",
      excerpt:
        "Walk you through the top React interview questions and answers, starting from the basics and progressing to advanced topics. By the end, you’ll have a solid understanding of what interviewers are looking for.",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      tags: ["React", "Interviews", "Questions"],
      link: "https://medium.com/@priyanshu108tiwari/react-interview-questions-you-must-know-as-a-web-developer-2025-edition-part-1-73edcc1d227d"
    },
  ]

  const experience = [
    {
      company: "Huntington Bank",
      role: "Full Stack Engineer",
      period: "Aug 2024 – Present",
      description:
        "Built a cloud-based Internet Banking Platform using Spring Boot microservices, React.js, and Next.js. Developed secure modules for transactions, loans, and account management with 99% uptime. Deployed on AWS using Docker and automated CI/CD pipelines, optimizing performance through scalable APIs and efficient MySQL queries.",
    },
    {
      company: "Learning by Building",
      role: "Self-Directed Learner",
      period: "Always",
      description:
        "Built hands-on projects to strengthen expertise in Java, Spring Boot, Angular, and cloud technologies like Azure and AWS. Focused on mastering microservices, scalable system design, and modern UI development while consistently improving code quality, performance, and problem-solving skills.",
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 grid-background">
      <CustomCursor />
      <FloatingElements />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            Hrishikesh Sharma Baroori
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {["Work", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                data-magnetic
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-slate-500 dark:text-slate-400 font-mono"
            >
              IST {currentTime}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="flex-1 text-center  lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Open to opportunities
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-slate-900 dark:text-slate-100">
                  Turning Ideas into{" "}
                  <span className="relative">
                    Scalable Java
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute bottom-2 left-0 h-1 bg-green-300 -z-10"
                    />
                  </span>{" "}
                  Applications
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Engineering ideas into reality Where front-end creativity and back-end precision meet to craft digital excellence.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                >
                  <CleanButton variant="accent" className="px-8 py-4 text-base" href="/#work">
                    My Projects
                  </CleanButton>
                  <CleanButton variant="outline" className="px-8 py-4 text-base" href="#contact">
                    Let's Connect
                  </CleanButton>
                </motion.div>
              </motion.div>



              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12"
              >
                {[
                  { icon: <Code className="w-5 h-5" />, name: "Frontend" },
                  { icon: <Database className="w-5 h-5" />, name: "Backend" },
                  { icon: <Palette className="w-5 h-5" />, name: "Cloud & DevOps" },
                  { icon: <Globe className="w-5 h-5" />, name: "System Design" },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg shadow-sm"
                  >
                    <div className="text-slate-600 dark:text-slate-400">{item.icon}</div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Video Section */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-md flex items-center justify-center flex-col "
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-slate-100"
                >
                  <div className="h-6 w-80 bg-gradient-to-r from-green-300/40 to-transparent absolute"/> The Story Behind My Career
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="relative"
                >
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden h-80">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-2">
                          Introduction Video
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">
                          Ready for your video content
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-4">Selected Work</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              A collection of projects that showcase my approach to solving complex design and development challenges.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm font-mono text-gray-500 dark:text-gray-400">
              <div className="flex flex-col items-center">
                <div className="w-8 h-1 bg-black dark:bg-white mb-1"></div>
                <div className="w-8 h-1 bg-gray-500 mb-1"></div>
                <div className="w-8 h-1 bg-gray-400"></div>
              </div>
              <span>Call Stack (LIFO)</span>
            </div>
          </motion.div>

          <div className="relative">
            <div className="space-y-8">
              {projects.map((project, index) => (
                <CallStackCard key={index} project={project} index={index} totalCards={projects.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Skills Section */}
      <section className="py-20 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Tech Stack & Expertise
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "💻",
                title: "Core Java & Backend",
                skills: ["Java 8/11, OOP", "Collections", "Exception Handling", "Multithreading", "REST APIs"]
              },
              {
                icon: "🚀",
                title: "DevOps & Infrastructure Basics",
                skills: ["GitHub Actions, Jenkins basics", "Basic Terraform", "Application logs, Basic metrics", "Cloud platforms, Application servers"]
              },
              {
                icon: "⚛️",
                title: "Frontend Development",
                skills: ["React.js, Next.js", "TypeScript", "JavaScript (ES6+)", "HTML", "CSS, Tailwind", "Redux"]
              },
              {
                icon: "🗄️",
                title: "Database & Data Management",
                skills: ["MySQL, PostgreSQL", "MongoDB", "ER Diagrams", "Normalization, SQL"]
              },
              {
                icon: "☁️",
                title: "Cloud Platforms & Services",
                skills: ["AWS (EC2, S3, RDS, Lambda)", "Azure, GCP", "Docker, Kubernetes"]
              },
              {
                icon: "🛠️",
                title: "Tools & Version Control",
                skills: ["Git, GitHub, Postman", "Maven, IntelliJ IDEA", "VS Code"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-transparent hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-green-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-green-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100"
              >
                About Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <p>
                  Hi, I’m Hrishikesh Sharma Baroori— Recent graduate with a strong foundation in full-stack Java development and hands-on experience building scalable web applications across diverse domains, including Banking, Healthcare, Insurance, and Retail. Through academic projects and internships, I've gained practical exposure to developing complete end-to-end solutions using modern Java frameworks, RESTful services, and responsive frontend architectures. My focus is on writing clean, maintainable code and delivering high-performance applications that align with real-world business needs.

                </p>
                <p>
                  I'm passionate about continuous learning and emerging technologies, with particular interest in cloud-native and microservices-based systems. Experienced in agile development, Git workflows, and collaborative coding environments, I enjoy solving complex problems and transforming ideas into efficient software solutions. I’ve also worked with cloud platforms like Azure and AWS, focusing on deployment automation and scalability.
                </p>
                {/* <p>
                  I’m passionate about solving real-world problems with technology — building products that are not only functional but also deliver a great user experience.
                </p> */}
              </motion.div>
            </div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold mb-8 text-slate-900 dark:text-slate-100"
              >
                My Journey
              </motion.h3>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-green-300 pl-6 relative"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-300 rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{exp.role}</h4>
                      <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-2 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100"
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12"
          >
            I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat about
            technology and development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mb-12"
          >
            <CleanButton variant="accent" className="px-8 py-4 text-base" href="mailto:Hrishikesh.baroori@gmail.com">
              Get In Touch
            </CleanButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-8"
          >
            {[
              { icon: <Phone className="w-5 h-5" />, label: "Phone", href: "tel:+13163001938" },
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/in/hrishikesh-sharma-baroori" },
              { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:Hrishikesh.baroori@gmail.com" },
            ].map((social, index) => (
              <CleanButton target="blank" key={index} variant="ghost" className="p-4" href={social.href} aria-label={social.label}>
                {social.icon}
              </CleanButton>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2025 Hrishikesh Sharma Baroori. All rights reserved.</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Built with Next.js, Tailwind CSS & Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}


