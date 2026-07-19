"use client"

import { useEffect, useState, use } from "react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

const deptColors: Record<string, { bg: string, text: string, name: string }> = {
  "Communication": { bg: "bg-picnic-red", text: "text-picnic-red", name: "Rouge" },
  "Diplomatie": { bg: "bg-picnic-blue", text: "text-picnic-blue", name: "Bleu" },
  "Projets": { bg: "bg-picnic-yellow", text: "text-picnic-yellow", name: "Jaune" },
  "Administration": { bg: "bg-picnic-green", text: "text-picnic-green", name: "Vert" },
  "Présidence": { bg: "bg-picnic-purple", text: "text-picnic-purple", name: "Violet" },
}

export default function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [ticketData, setTicketData] = useState<any>(null)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("picnic_users") || "[]")
    const user = users.find((u: any) => u.id === id)
    if (user) {
      setTicketData(user)
    }
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  if (!ticketData) {
    return <div className="min-h-screen flex items-center justify-center">Chargement du billet...</div>
  }

  const theme = deptColors[ticketData.departement] || deptColors["Communication"]

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-muted/20 print:bg-white print:pt-0">
      <div className="container mx-auto px-4 max-w-2xl flex flex-col items-center">
        
        {/* Actions - hidden when printing */}
        <div className="flex gap-4 mb-8 print:hidden">
          <Button onClick={handlePrint} className="rounded-full shadow-lg">
            <Download className="mr-2 w-4 h-4" /> Télécharger en PDF
          </Button>
          <Button variant="outline" className="rounded-full shadow-sm bg-background">
            <Share2 className="mr-2 w-4 h-4" /> Partager
          </Button>
        </div>

        {/* The Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full relative preserve-3d"
          style={{ perspective: "1000px" }}
        >
          <div className="bg-card w-full rounded-[2rem] overflow-hidden shadow-2xl border flex flex-col md:flex-row relative">
            
            {/* Top / Left Colored Section */}
            <div className={`md:w-1/3 p-8 flex flex-col items-center justify-center text-white relative ${theme.bg}`}>
              {/* Overlay pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
              
              <div className="relative z-10 text-center">
                <img src="/images/logo OIJD.svg" alt="OIJD" className="h-12 w-auto mb-6 brightness-0 invert mx-auto" />
                <h2 className="text-4xl font-black italic tracking-tighter mb-2">PICNIC COLOR</h2>
                <div className="text-sm font-bold tracking-widest uppercase opacity-80 mb-6">Édition 2026</div>
                
                <div className="inline-block px-4 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-sm font-bold">
                  Billet Officiel
                </div>
              </div>
            </div>

            {/* Right / Main Info Section */}
            <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-between relative bg-background">
              {/* Ticket ID Watermark */}
              <div className="absolute right-4 top-4 text-xs font-mono text-muted-foreground/30 font-bold tracking-widest rotate-90 origin-right">
                N° {ticketData.id.toUpperCase()}
              </div>

              <div>
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Participant</p>
                  <h3 className="text-3xl font-bold text-foreground">
                    {ticketData.prenom} {ticketData.nom}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Département</p>
                    <p className="font-bold">{ticketData.departement}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Couleur Attribuée</p>
                    <p className={`font-bold ${theme.text}`}>{theme.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                    <p className="font-bold">08 Août 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Heure</p>
                    <p className="font-bold">09h00</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-dashed flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Lieu de l'événement</p>
                  <p className="font-bold text-sm">Espace Sécurisé, Abidjan<br/>(Détails via WhatsApp)</p>
                </div>
                
                {/* QR Code */}
                <div className="p-2 bg-white rounded-xl shadow-sm border">
                  <QRCodeSVG 
                    value={`https://picnic-color-2026.vercel.app/verify/${ticketData.id}`} 
                    size={80} 
                    bgColor={"#ffffff"} 
                    fgColor={"#000000"} 
                    level={"H"} 
                  />
                </div>
              </div>
            </div>

            {/* Perforation dots for visual flair */}
            <div className="hidden md:flex flex-col justify-between absolute left-1/3 -ml-1 top-0 bottom-0 py-4">
               {[...Array(15)].map((_, i) => (
                 <div key={i} className="w-2 h-2 rounded-full bg-muted shadow-inner" />
               ))}
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted-foreground max-w-md print:hidden">
          Présentez ce billet (sur votre téléphone ou imprimé) lors de votre arrivée. La validation du QR code est requise pour l'accès.
        </p>

        {/* Global Print Styles inside component using style tag */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden;
            }
            .preserve-3d, .preserve-3d * {
              visibility: visible;
            }
            .preserve-3d {
              position: absolute;
              left: 0;
              top: 0;
              transform: none !important;
            }
          }
        `}} />
      </div>
    </div>
  )
}
