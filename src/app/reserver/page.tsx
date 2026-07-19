"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const departments = [
  "Communication",
  "Diplomatie",
  "Projets",
  "Administration",
  "Présidence"
]

export default function ReserverPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    departement: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.departement) {
      toast.error("Veuillez remplir tous les champs obligatoires.")
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call and save to localStorage for the prototype
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const userId = Math.random().toString(36).substring(2, 9)
      const userRecord = {
        id: userId,
        ...formData,
        status: "En attente de paiement",
        date: new Date().toISOString()
      }
      
      // Save locally (in a real app, this goes to DB)
      const existing = JSON.parse(localStorage.getItem("picnic_users") || "[]")
      localStorage.setItem("picnic_users", JSON.stringify([...existing, userRecord]))
      localStorage.setItem("current_user_id", userId)
      
      toast.success("Informations validées !")
      router.push("/paiement")
    } catch (error) {
      toast.error("Une erreur est survenue.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-8 rounded-3xl shadow-xl border"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Réservez votre place</h1>
            <p className="text-muted-foreground">Rejoignez-nous pour cette 1ère édition !</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input id="prenom" name="prenom" placeholder="John" value={formData.prenom} onChange={handleChange} required className="h-12 rounded-xl bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input id="nom" name="nom" placeholder="Doe" value={formData.nom} onChange={handleChange} required className="h-12 rounded-xl bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone (Mobile Money) *</Label>
              <Input id="telephone" name="telephone" type="tel" placeholder="0700000000" value={formData.telephone} onChange={handleChange} required className="h-12 rounded-xl bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optionnel)</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="h-12 rounded-xl bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departement">Département *</Label>
              <select 
                id="departement" 
                name="departement" 
                value={formData.departement} 
                onChange={handleChange} 
                required 
                className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Sélectionnez votre département</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-full text-lg shadow-lg mt-4">
              {isLoading ? "Validation en cours..." : "Continuer vers le paiement (3000 Fcfa)"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
