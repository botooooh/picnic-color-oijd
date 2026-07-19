"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/images/video hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            PICNIC COLOR <span className="text-primary">2026</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
        >
          Une journée. Une couleur. Une équipe. Des souvenirs inoubliables.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/reserver" className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full text-lg h-14 px-8 w-full sm:w-auto shadow-xl hover:shadow-primary/25 transition-all")}>
            Réserver maintenant
          </Link>
          <Link href="/tirage" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full text-lg h-14 px-8 w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md")}>
            Voir les couleurs
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-white/60 text-sm mb-2 uppercase tracking-widest">Découvrir</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-1 h-12 bg-gradient-to-b from-primary to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
