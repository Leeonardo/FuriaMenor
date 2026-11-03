import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Identidad */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Furia Menor" width={48} height={48} className="object-contain" />
              <div>
                <p className="text-lg font-bold text-white">Furia Menor</p>
                <p className="text-xs uppercase tracking-wider text-red-400 font-medium">Portal de Resultados & Estadísticas</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-neutral-400 leading-relaxed">
              Portal deportivo especializado en el registro y difusión de resultados,
              calendarios, clasificaciones y rendimiento individual y colectivo del futsal
              y fútbol menor en Caracas y Venezuela.
            </p>
            {/* Redes sociales */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://instagram.com/furiamenor"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-red-500/50 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com/furiamenor"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-red-500/50 hover:text-white"
              >
                <FacebookIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-red-500/50 hover:text-white"
              >
                <YoutubeIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Secciones del portal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300">Competiciones</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li><Link href="/torneos" className="transition hover:text-white hover:text-red-400">Torneos & Ligas</Link></li>
              <li><Link href="/calendario" className="transition hover:text-white hover:text-red-400">Calendario & Fixture</Link></li>
              <li><Link href="/posiciones" className="transition hover:text-white hover:text-red-400">Tablas de Posiciones</Link></li>
              <li><Link href="/estadisticas" className="transition hover:text-white hover:text-red-400">Goleadores & Vallas</Link></li>
              <li><Link href="/academias" className="transition hover:text-white hover:text-red-400">Academias & Clubes</Link></li>
              <li><Link href="/galeria" className="transition hover:text-white hover:text-red-400">Galería Fotográfica</Link></li>
            </ul>
          </div>

          {/* Contacto & Alianzas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300">Contacto & Alianzas</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span>contacto@furiamenor.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span>+58 (000) 000-0000</span>
              </li>
              <li><Link href="/admin" className="transition hover:text-white text-xs text-neutral-500 pt-2 block">Acceso Administrativo</Link></li>
            </ul>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Furia Menor. Todos los derechos reservados. · Caracas, Venezuela</p>
          <p className="text-neutral-500">Portal deportivo independiente · Seguimiento oficial de resultados y estadísticas</p>
        </div>
      </div>
    </footer>
  );
}
