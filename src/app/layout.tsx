import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ERP Sistema',
  description: 'Sistema de gestión empresarial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <div className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">ERP Empresa</h1>
            </div>
            <nav className="mt-4">
              <Link href="/"><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
              <Link href="/finanzas"><Button variant="ghost" className="w-full justify-start">Finanzas</Button></Link>
              <Link href="/recursos-humanos"><Button variant="ghost" className="w-full justify-start">Recursos Humanos</Button></Link>
              <Link href="/inventario"><Button variant="ghost" className="w-full justify-start">Inventario</Button></Link>
              <Link href="/proyectos"><Button variant="ghost" className="w-full justify-start">Pedidos</Button></Link>
              <Link href="/configuracion"><Button variant="ghost" className="w-full justify-start">Configuración</Button></Link>
            </nav>
          </div>
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}