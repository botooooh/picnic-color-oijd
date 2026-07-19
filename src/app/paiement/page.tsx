"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function PaiementPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const userId = localStorage.getItem("current_user_id")
    if (!userId) {
      router.push("/reserver")
      return
    }
    const users = JSON.parse(localStorage.getItem("picnic_users") || "[]")
    const user = users.find((u: any) => u.id === userId)
    if (user) {
      setUserData(user)
    }
  }, [router])

  const handleConfirmPayment = async () => {
    setIsLoading(true)
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const users = JSON.parse(localStorage.getItem("picnic_users") || "[]")
      const updatedUsers = users.map((u: any) => {
        if (u.id === userData.id) {
          return { ...u, status: "Payé" }
        }
        return u
      })
      
      localStorage.setItem("picnic_users", JSON.stringify(updatedUsers))
      
      toast.success("Paiement signalé avec succès !")
      router.push(`/ticket/${userData.id}`)
    } catch (error) {
      toast.error("Erreur lors de la confirmation.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!userData) return null

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
            <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">O</div>
                <div>
                  <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400">Orange Money</h3>
                  <p className="text-2xl font-mono tracking-wider font-black">07 00 00 00 00</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Au nom de : OIJD CIV</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
                <div>
                  <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">Wave</h3>
                  <p className="text-2xl font-mono tracking-wider font-black">01 00 00 00 00</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Au nom de : OIJD CIV</p>
            </div>

            <div className="flex gap-3 p-4 bg-muted rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 text-primary shrink-0" />
              <p className="text-muted-foreground">
                Une fois le transfert effectué, cliquez sur le bouton ci-dessous. Votre billet sera généré immédiatement (validation manuelle par l'administration a posteriori).
              </p>
            </div>

            <Button 
              onClick={handleConfirmPayment} 
              disabled={isLoading} 
              className="w-full h-14 rounded-full text-lg shadow-lg mt-8"
            >
              {isLoading ? "Vérification..." : (
                <>
                  <CheckCircle2 className="mr-2 w-5 h-5" />
                  J'ai effectué le paiement
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
