"use client"

import { motion } from "framer-motion"

const schedule = [
  { time: "09h00", title: "Accueil & installation", description: "Accueil, distribution des accessoires colorés et installation." },
  { time: "10h00", title: "Cérémonie d'ouverture", description: "Mot de bienvenue, présentation des équipes et cris de guerre." },
  { time: "10h30", title: "Color Team Building Challenge", description: "Parcours de confiance, Conseil de crise et jeux d'équipe." },
  { time: "12h30", title: "Color Picnic", description: "Temps libre, pique-nique convivial, photobooth et espace détente." },
  { time: "14h00", title: "Color Talent Show", description: "Chaque équipe présente un talent (danse, chant, sketch...)." },
  { time: "15h00", title: "Grande Color Battle", description: "Activité collective explosive avec lancer de poudre colorée !" },
  { time: "16h00", title: "Remise des prix", description: "Récompenses (équipe la plus drôle, créative, vainqueur du challenge...)." },
  { time: "16h30", title: "Clôture", description: "Message de fin, grande photo collective et musique." },
]

export function Program() {
  return (
    <section id="programme" className="py-24 bg-card border-t border-b">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Le Programme</h2>
          <p className="text-lg text-muted-foreground">Une journée rythmée par la joie et la compétition amicale.</p>
        </motion.div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-1/2">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-10 ml-8 relative"
            >
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <span className="text-xl font-black text-primary font-mono">{item.time}</span>
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
