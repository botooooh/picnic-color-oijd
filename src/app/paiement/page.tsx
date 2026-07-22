"use client"

import { motion } from "framer-motion"
import { AlertCircle, ArrowRight } from "lucide-react"

export default function PaiementPage() {

  // Numéro WhatsApp issu de l'affiche
  const whatsappNumber = "2250767696465" 
  const whatsappMessage = `Bonjour, je viens d'effectuer le paiement pour le Picnic Color 2026. Voici mon reçu. Mon nom et mon département sont : `
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-8 rounded-3xl shadow-xl border overflow-hidden relative"
        >
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-primary/5 -z-10" />

          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Paiement du Ticket</h1>
            <p className="text-muted-foreground">Montant à régler : <strong className="text-foreground text-xl">3000 Fcfa</strong></p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-3 p-4 bg-primary/10 rounded-xl text-sm border border-primary/20">
              <AlertCircle className="w-5 h-5 text-primary shrink-0" />
              <p className="text-foreground font-medium">
                1. Cliquez sur l'un des liens ci-dessous pour payer via l'application de votre choix.<br/>
                2. <strong className="text-primary">Faites une capture d'écran de votre reçu</strong> juste après le paiement.
              </p>
            </div>

            <a 
              href="https://multi.app.orange-money.com/app/v1/kapptivate/qrcode/odyssee/?id=codgen101-48eb713332494c7eb0411956eb640d38&v=1&amount=3000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl hover:bg-orange-500/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">O</div>
                <div>
                  <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400">Payer avec Orange Money</h3>
                </div>
              </div>
              <ArrowRight className="text-orange-500 w-5 h-5" />
            </a>

            <a 
              href="https://pay.wave.com/m/M_ci_ECX_d-WF_xA-/c/ci/?amount=3000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl hover:bg-blue-500/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
                <div>
                  <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">Payer avec Wave</h3>
                </div>
              </div>
              <ArrowRight className="text-blue-500 w-5 h-5" />
            </a>

            <div className="flex gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-sm mt-8">
              <AlertCircle className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-foreground font-medium">
                3. Une fois le paiement terminé et la capture d'écran sauvegardée, envoyez-nous la preuve sur WhatsApp pour valider votre inscription.
              </p>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full h-14 items-center justify-center rounded-full text-lg shadow-lg mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
            >
              Envoyer mon reçu sur WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
