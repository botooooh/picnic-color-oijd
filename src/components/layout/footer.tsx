import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img src="/images/logo OIJD.svg" alt="OIJD Logo" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground mt-4 max-w-sm">
              L'Organisation Internationale de la Jeunesse Diplomatique (OIJD) promeut la paix, le leadership et la coopération.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/#programme" className="text-muted-foreground hover:text-primary transition-colors">Programme</Link></li>
              <li><Link href="/reserver" className="text-muted-foreground hover:text-primary transition-colors">Réservation</Link></li>
              <li><Link href="/tirage" className="text-muted-foreground hover:text-primary transition-colors">Tirage des couleurs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@oijd.ci</li>
              <li>Téléphone: +225 00 00 00 00 00</li>
              <li>Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OIJD Côte d'Ivoire. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
