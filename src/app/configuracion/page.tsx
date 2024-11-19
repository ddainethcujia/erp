'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function Configuracion() {
  const [settings, setSettings] = useState({
    companyName: 'Mi Empresa',
    email: 'info@miempresa.com',
    darkMode: false,
    notifications: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Configuración</h2>
      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="darkMode"
                name="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
              />
              <Label htmlFor="darkMode">Modo Oscuro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
              />
              <Label htmlFor="notifications">Notificaciones</Label>
            </div>
            <Button type="submit">Guardar Cambios</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}