import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Furia Menor" width={48} height={48} className="object-contain" />
              <div>
                <p className="text-lg font-bold">Furia Menor</p>
                <p className="text-sm text-neutral-400">Periódico Digital de Fútbol Menor</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-neutral-400">
              Cobertura integral de ligas, torneos, escuelas, academias y categorías infantiles/juveniles en Caracas. Con proyección a nivel nacional para seguir impulsando el semillero venezolano.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link href="#" className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-neutral-700 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-neutral-700 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:border-neutral-700 hover:text-white">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300">Secciones</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><Link href="/noticias" className="transition hover:text-white">Noticias</Link></li>
              <li><Link href="/torneos" className="transition hover:text-white">Torneos & Ligas</Link></li>
              <li><Link href="/academias" className="transition hover:text-white">Academias & Clubes</Link></li>
              <li><Link href="/entrevistas" className="transition hover:text-white">Entrevistas</Link></li>
              <li><Link href="/galeria" className="transition hover:text-white">Galería Multimedia</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>prensa@furiamenor.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+58 (000) 000-0000</span>
              </li>
              <li><Link href="#" className="transition hover:text-white">Alianzas & Publicidad</Link></li>
              <li><Link href="#" className="transition hover:text-white">Enviar Cobertura</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Furia Menor. Todos los derechos reservados. • Caracas, Venezuela</p>
        </div>
      </div>
    </footer>
  );
}
