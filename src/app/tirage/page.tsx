"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const departments = [
  { name: "Communication", color: "bg-picnic-red", label: "Rouge", shadow: "shadow-picnic-red" },
  { name: "Diplomatie", color: "bg-picnic-blue", label: "Bleu", shadow: "shadow-picnic-blue" },
  { name: "Projets", color: "bg-picnic-yellow", label: "Jaune", shadow: "shadow-picnic-yellow" },
  { name: "Administration", color: "bg-picnic-green", label: "Vert", shadow: "shadow-picnic-green" },
  { name: "Présidence", color: "bg-picnic-purple", label: "Violet", shadow: "shadow-picnic-purple" },
]

export default function TiragePage() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const startDraw = () => {
    setIsDrawing(true)
    setHasDrawn(false)
    let passes = 0
    const maxPasses = 30 // Number of rapid changes before stopping
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % departments.length)
      passes++
      
      if (passes >= maxPasses) {
        clearInterval(interval)
        setIsDrawing(false)
        setHasDrawn(true)
      }
    }, 100) // Speed of roulette
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-3xl pointer-events-none">
        {hasDrawn && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-[500px] h-[500px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, var(--picnic-${departments[currentIndex].label.toLowerCase()}) 0%, transparent 70%)` 
            }}
          />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
        >
          Le Tirage des Couleurs
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12"
        >
          Découvrez quelle couleur votre département défendra lors du Picnic Color 2026.
        </motion.p>

        {!hasDrawn && !isDrawing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg" 
              onClick={startDraw}
              className="rounded-full text-xl h-16 px-10 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              Lancer le tirage officiel
            </Button>
          </motion.div>
        ) : null}

        {/* The Roulette Animation */}
        <AnimatePresence mode="wait">
          {isDrawing && (
            <motion.div
              key="drawing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="h-40 flex items-center justify-center"
            >
              <div className="text-5xl font-black italic tracking-widest text-primary animate-pulse">
                {departments[currentIndex].name.toUpperCase()}...
              </div>
            </motion.div>
          )}

          {hasDrawn && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {departments.map((dept, idx) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                  className={`p-8 rounded-3xl border border-transparent flex flex-col items-center justify-center gap-4 bg-card ${dept.shadow} shadow-lg hover:-translate-y-2 transition-transform`}
                >
                  <h3 className="text-2xl font-bold">{dept.name}</h3>
                  <div className={`w-20 h-20 rounded-full ${dept.color} shadow-inner flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">{dept.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {hasDrawn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: departments.length * 0.2 + 1 }}
            className="mt-16"
          >
            <Link href="/paiement" className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-8 shadow-xl")}>
              Je connais ma couleur, je réserve !
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
