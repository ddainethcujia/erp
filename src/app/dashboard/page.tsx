'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Package, DollarSign, Calendar, Settings } from 'lucide-react'

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const [selectedModule, setSelectedModule] = useState('resumen')

  // SWR hooks for fetching data
  const { data: salesData, error: salesError } = useSWR('/api/sales', fetcher, { refreshInterval: 5000 })
  const { data: customersData, error: customersError } = useSWR('/api/customers', fetcher, { refreshInterval: 5000 })
  const { data: projectsData, error: projectsError } = useSWR('/api/projects', fetcher, { refreshInterval: 5000 })
  const { data: employeesData, error: employeesError } = useSWR('/api/employees', fetcher, { refreshInterval: 5000 })
  const { data: inventoryData, error: inventoryError } = useSWR('/api/inventory', fetcher, { refreshInterval: 5000 })
  const { data: invoicesData, error: invoicesError } = useSWR('/api/invoices', fetcher, { refreshInterval: 5000 })

  const modules = [
    { name: 'Resumen', icon: BarChart },
    { name: 'Finanzas', icon: DollarSign },
    { name: 'Recursos Humanos', icon: Users },
    { name: 'Inventario', icon: Package },
    { name: 'Proyectos', icon: Calendar },
    { name: 'Configuración', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">ERP Empresa</h1>
        </div>
        <nav className="mt-4">
          {modules.map((module) => (
            <Button
              key={module.name}
              variant={selectedModule === module.name.toLowerCase() ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedModule(module.name.toLowerCase())}
            >
              <module.icon className="mr-2 h-4 w-4" />
              {module.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Totales</CardTitle>
            </CardHeader>
            <CardContent>
              {salesError ? (
                <p>Error al cargar datos</p>
              ) : !salesData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">${salesData.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{salesData.percentageChange}% desde el mes pasado</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Nuevos Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              {customersError ? (
                <p>Error al cargar datos</p>
              ) : !customersData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">{customersData.total}</p>
                  <p className="text-sm text-gray-500">{customersData.percentageChange}% desde el mes pasado</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Proyectos Activos</CardTitle>
            </CardHeader>
            <CardContent>
              {projectsError ? (
                <p>Error al cargar datos</p>
              ) : !projectsData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">{projectsData.active}</p>
                  <p className="text-sm text-gray-500">{projectsData.completed} finalizados este mes</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Empleados</CardTitle>
            </CardHeader>
            <CardContent>
              {employeesError ? (
                <p>Error al cargar datos</p>
              ) : !employeesData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">{employeesData.total}</p>
                  <p className="text-sm text-gray-500">{employeesData.newHires} nuevas contrataciones</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              {inventoryError ? (
                <p>Error al cargar datos</p>
              ) : !inventoryData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">{inventoryData.total}</p>
                  <p className="text-sm text-gray-500">{inventoryData.lowStock} productos bajo stock mínimo</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              {invoicesError ? (
                <p>Error al cargar datos</p>
              ) : !invoicesData ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <p className="text-3xl font-bold">{invoicesData.pending}</p>
                  <p className="text-sm text-gray-500">${invoicesData.totalAmount.toLocaleString()} por cobrar</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}