"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CheckCircle, Search, Settings } from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      const data = JSON.parse(localStorage.getItem("picnic_users") || "[]")
      setUsers(data)
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "2026") {
      setIsAuthenticated(true)
      toast.success("Connexion réussie")
    } else {
      toast.error("Mot de passe incorrect")
    }
  }

  const handleConfirmPayment = (id: string) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, status: "Payé" } : u)
    setUsers(updatedUsers)
    localStorage.setItem("picnic_users", JSON.stringify(updatedUsers))
    toast.success("Paiement confirmé pour ce participant")
  }

  const exportCSV = () => {
    if (users.length === 0) {
      toast.error("Aucune donnée à exporter")
      return
    }

    const headers = ["ID", "Nom", "Prénom", "Téléphone", "Email", "Département", "Statut", "Date"]
    const rows = users.map(u => [
      u.id, u.nom, u.prenom, u.telephone, u.email || "", u.departement, u.status, new Date(u.date).toLocaleDateString()
    ])

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "picnic_color_participants.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin} className="bg-card p-8 rounded-3xl shadow-xl border max-w-sm w-full"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Administration</h1>
            <p className="text-muted-foreground text-sm">Entrez le code d'accès (Indice: l'année de l'événement)</p>
          </div>
          <Input 
            type="password" placeholder="Mot de passe" 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            className="h-12 text-center text-xl tracking-widest mb-4 rounded-xl bg-background"
          />
          <Button type="submit" className="w-full h-12 rounded-xl text-lg">Se connecter</Button>
        </motion.form>
      </div>
    )
  }

  const filteredUsers = users.filter(u => 
    u.nom.toLowerCase().includes(search.toLowerCase()) || 
    u.prenom.toLowerCase().includes(search.toLowerCase()) ||
    u.departement.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: users.length,
    payes: users.filter(u => u.status === "Payé").length,
    attente: users.filter(u => u.status !== "Payé").length,
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">Gestion des participants Picnic Color</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full bg-background"><Settings className="mr-2 w-4 h-4" /> Couleurs</Button>
            <Button onClick={exportCSV} className="rounded-full shadow-md"><Download className="mr-2 w-4 h-4" /> Exporter CSV</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-2xl shadow-sm border">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Total Inscrits</p>
            <p className="text-4xl font-black">{stats.total}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-green-500/20">
            <p className="text-green-600 dark:text-green-400 text-sm font-medium uppercase tracking-wider mb-2">Paiements Validés</p>
            <p className="text-4xl font-black text-green-600 dark:text-green-400">{stats.payes}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-orange-500/20">
            <p className="text-orange-600 dark:text-orange-400 text-sm font-medium uppercase tracking-wider mb-2">En Attente</p>
            <p className="text-4xl font-black text-orange-600 dark:text-orange-400">{stats.attente}</p>
          </div>
        </div>

        {/* List */}
        <div className="bg-card rounded-3xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher un participant..." 
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-full bg-background border-none shadow-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Aucun participant trouvé.</TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.prenom} {user.nom}</div>
                        <div className="text-xs text-muted-foreground">{user.id.toUpperCase()}</div>
                      </TableCell>
                      <TableCell>{user.departement}</TableCell>
                      <TableCell>{user.telephone}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.status === "Payé" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {user.status !== "Payé" ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConfirmPayment(user.id)}
                            className="rounded-full text-xs border-green-500/50 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" /> Valider
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Terminé</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
