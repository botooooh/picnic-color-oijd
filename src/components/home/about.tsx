"use client"

import { motion } from "framer-motion"
import { Users, Heart, Target, Sparkles, Smile, Trophy } from "lucide-react"

const features = [
  {
    icon: <Users className="w-6 h-6 text-picnic-blue" />,
    title: "Cohésion & Esprit d'équipe",
    description: "Renforcez les liens avec les autres membres à travers des activités collaboratives."
  },
  {
    icon: <Heart className="w-6 h-6 text-picnic-red" />,
    title: "L'ambiance OIJD",
    description: "Une atmosphère chaleureuse, inclusive et pleine d'énergie positive."
  },
  {
    icon: <Target className="w-6 h-6 text-picnic-green" />,
    title: "Les objectifs",
    description: "Créer un espace d'échange informel pour mieux se connaître et collaborer."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-picnic-yellow" />,
    title: "Le Concept",
    description: "Chaque département défend fièrement sa couleur lors d'une journée mémorable."
  },
  {
    icon: <Smile className="w-6 h-6 text-picnic-pink" />,
    title: "Joie de vivre",
    description: "La convivialité et le partage sont au centre de chaque instant."
  },
  {
    icon: <Trophy className="w-6 h-6 text-picnic-orange" />,
    title: "Des souvenirs",
    description: "Repartez avec des souvenirs inoubliables et une motivation décuplée."
  }
]

export function About() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            L'Événement de l'Année
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Le Picnic Color n'est pas qu'un simple repas. C'est une célébration de la jeunesse, 
            de la diplomatie et de la cohésion. Une journée pour se reconnecter, partager et 
            créer des liens durables au sein de l'OIJD.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-background border hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
