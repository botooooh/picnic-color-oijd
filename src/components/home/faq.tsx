"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Où se déroule le Picnic Color ?",
    answer: "Le lieu exact sera communiqué uniquement aux participants inscrits quelques jours avant l'événement. Il s'agira d'un espace vert sécurisé à Abidjan."
  },
  {
    question: "Dois-je apporter mon repas ?",
    answer: "Non, un grand repas est prévu pour tous les participants. Cependant, vous pouvez apporter des snacks si vous le souhaitez."
  },
  {
    question: "Comment est attribuée la couleur de mon département ?",
    answer: "Le tirage au sort des couleurs aura lieu prochainement sur notre page officielle. Chaque département défendra sa couleur."
  },
  {
    question: "Comment récupérer mon ticket après paiement ?",
    answer: "Une fois votre paiement Mobile Money validé par l'administration, vous pourrez télécharger votre ticket PDF avec QR Code directement depuis ce site."
  }
]

export function Faq() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Questions Fréquentes</h2>
          <p className="text-lg text-muted-foreground">Tout ce que vous devez savoir avant de participer.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-muted">
                <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
