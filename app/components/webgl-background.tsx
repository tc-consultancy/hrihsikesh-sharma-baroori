"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface Connection {
  p1: Particle
  p2: Particle
  distance: number
  opacity: number
}

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const { scrollYProgress } = useScroll()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Scroll-based transforms
  const particleCount = useTransform(scrollYProgress, [0, 0.5, 1], [80, 120, 60])
  const connectionDistance = useTransform(scrollYProgress, [0, 0.5, 1], [120, 180, 100])
  const waveAmplitude = useTransform(scrollYProgress, [0, 1], [0, 50])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({ width: canvas.width, height: canvas.height })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${220 + Math.random() * 60}, 70%, 60%)`,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
        })
      }
    }

    initParticles()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.02)")
      gradient.addColorStop(0.5, "rgba(30, 41, 59, 0.05)")
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.02)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentParticleCount = particleCount.get()
      const currentConnectionDistance = connectionDistance.get()
      const currentWaveAmplitude = waveAmplitude.get()

      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) + Math.pow(particle.y - mouseRef.current.y, 2),
        )

        if (mouseDistance < 150) {
          const force = (150 - mouseDistance) / 150
          const angle = Math.atan2(particle.y - mouseRef.current.y, particle.x - mouseRef.current.x)
          particle.vx += Math.cos(angle) * force * 0.02
          particle.vy += Math.sin(angle) * force * 0.02
        }

        // Wave motion based on scroll
        particle.y += Math.sin(particle.x * 0.01 + Date.now() * 0.001) * currentWaveAmplitude * 0.01

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary collision with smooth bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Update life
        particle.life += 1
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 0.5
          particle.vy = (Math.random() - 0.5) * 0.5
        }

        // Draw particle with glow effect
        const alpha = particle.opacity * (1 - particle.life / particle.maxLife)

        // Outer glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color.replace("60%)", "20%)")}`
        ctx.globalAlpha = alpha * 0.3
        ctx.fill()

        // Inner particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = alpha
        ctx.fill()

        ctx.globalAlpha = 1
      })

      // Create connections
      connectionsRef.current = []
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

          if (distance < currentConnectionDistance) {
            connectionsRef.current.push({
              p1,
              p2,
              distance,
              opacity: (1 - distance / currentConnectionDistance) * 0.3,
            })
          }
        }
      }

      // Draw connections
      connectionsRef.current.forEach((connection) => {
        ctx.beginPath()
        ctx.moveTo(connection.p1.x, connection.p1.y)
        ctx.lineTo(connection.p2.x, connection.p2.y)

        // Gradient line
        const gradient = ctx.createLinearGradient(connection.p1.x, connection.p1.y, connection.p2.x, connection.p2.y)
        gradient.addColorStop(0, connection.p1.color.replace("60%)", "40%)"))
        gradient.addColorStop(1, connection.p2.color.replace("60%)", "40%)"))

        ctx.strokeStyle = gradient
        ctx.globalAlpha = connection.opacity
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount, connectionDistance, waveAmplitude])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: "multiply" }} />
  )
}

export default WebGLBackground
