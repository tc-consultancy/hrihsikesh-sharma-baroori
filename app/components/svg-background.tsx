"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

const SVGBackground = () => {
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Scroll-based transforms
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.2, 0.05])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
          </radialGradient>

          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.08)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.03)" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated geometric shapes */}
        <motion.g style={{ rotate: rotate1, scale }}>
          <motion.circle
            cx={400 + mousePosition.x * 2}
            cy={300 + mousePosition.y * 1.5}
            r="150"
            fill="url(#gradient1)"
            filter="url(#glow)"
            animate={{
              r: [150, 180, 150],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        <motion.g style={{ rotate: rotate2, scale }}>
          <motion.ellipse
            cx={600 - mousePosition.x * 1.5}
            cy={700 - mousePosition.y * 2}
            rx="120"
            ry="80"
            fill="url(#gradient2)"
            filter="url(#glow)"
            animate={{
              rx: [120, 140, 120],
              ry: [80, 100, 80],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.g>

        {/* Flowing lines */}
        <motion.path
          d={`M 0,${500 + mousePosition.y * 2} Q 250,${300 + mousePosition.x} 500,${500 + mousePosition.y * 2} T 1000,${500 + mousePosition.y * 2}`}
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          animate={{
            d: [
              `M 0,${500 + mousePosition.y * 2} Q 250,${300 + mousePosition.x} 500,${500 + mousePosition.y * 2} T 1000,${500 + mousePosition.y * 2}`,
              `M 0,${520 + mousePosition.y * 2} Q 250,${280 + mousePosition.x} 500,${520 + mousePosition.y * 2} T 1000,${520 + mousePosition.y * 2}`,
              `M 0,${500 + mousePosition.y * 2} Q 250,${300 + mousePosition.x} 500,${500 + mousePosition.y * 2} T 1000,${500 + mousePosition.y * 2}`,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="1" />
          </pattern>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.05, 0.02]),
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={50 + ((i * 47) % 900)}
            cy={50 + ((i * 73) % 900)}
            r="2"
            fill={`hsl(${220 + i * 10}, 70%, 60%)`}
            animate={{
              cy: [50 + ((i * 73) % 900), 50 + ((i * 73) % 900) - 20, 50 + ((i * 73) % 900)],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

export default SVGBackground
