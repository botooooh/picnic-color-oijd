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
          className="flex justify-center"
        >
          <img src="/images/picnic color logo.svg" alt="Picnic Color Logo" className="h-40 md:h-56 lg:h-80 mb-6 drop-shadow-2xl object-contain w-full px-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Link href="/reserver" className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full text-lg h-14 px-8 w-full sm:w-auto shadow-xl hover:shadow-primary/25 transition-all")}>
            Réserver maintenant
          </Link>
          <Link href="/tirage" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full text-lg h-14 px-8 w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md")}>
            Voir les couleurs
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
