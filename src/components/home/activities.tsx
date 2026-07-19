"use client"

import { motion } from "framer-motion"
import { Gamepad2, Utensils, Camera, Network, Music, Medal, PartyPopper } from "lucide-react"

const activities = [
  { icon: Gamepad2, title: "Jeux", color: "from-picnic-blue/20 to-picnic-blue/5", border: "hover:border-picnic-blue" },
  { icon: Utensils, title: "Repas", color: "from-picnic-red/20 to-picnic-red/5", border: "hover:border-picnic-red" },
  { icon: Camera, title: "Photos", color: "from-picnic-green/20 to-picnic-green/5", border: "hover:border-picnic-green" },
  { icon: Network, title: "Networking", color: "from-picnic-yellow/20 to-picnic-yellow/5", border: "hover:border-picnic-yellow" },
  { icon: Music, title: "Musique", color: "from-picnic-purple/20 to-picnic-purple/5", border: "hover:border-picnic-purple" },
  { icon: Medal, title: "Challenges", color: "from-picnic-orange/20 to-picnic-orange/5", border: "hover:border-picnic-orange" },
  { icon: PartyPopper, title: "Bonne humeur", color: "from-picnic-pink/20 to-picnic-pink/5", border: "hover:border-picnic-pink" },
]

export function Activities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Au Programme</h2>
          <p className="text-lg text-muted-foreground">Tout a été pensé pour vous faire passer la meilleure des journées.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {activities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-gradient-to-br ${item.color} border border-transparent ${item.border} transition-colors cursor-pointer min-w-[140px] md:min-w-[180px]`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 mb-4 text-foreground/80" />
                <span className="font-semibold text-sm md:text-base">{item.title}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
