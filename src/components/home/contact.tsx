"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section className="py-24 bg-card border-t">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Contactez-nous</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question particulière ? Notre équipe est à votre disposition pour vous répondre.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.a
            href="https://wa.me/2250000000000"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-background border hover:border-green-500 hover:shadow-lg transition-all text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground">Discutez avec nous</p>
          </motion.a>

          <motion.a
            href="tel:+2250000000000"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-background border hover:border-primary hover:shadow-lg transition-all text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+225 00 00 00 00 00</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-background border hover:border-blue-500 hover:shadow-lg transition-all text-center group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Google Maps</h3>
            <p className="text-muted-foreground">Abidjan, Côte d'Ivoire</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
