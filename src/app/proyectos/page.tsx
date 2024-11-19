'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Proyectos() {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({ nombre: '', cliente: '', estado: '', fecha_limite: '' })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/proyectos')
    const data = await res.json()
    setProjects(data)
  }

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value) => {
    setNewProject({ ...newProject, estado: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    })
    if (res.ok) {
      setNewProject({ nombre: '', cliente: '', estado: '', fecha_limite: '' })
      fetchProjects()
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/proyectos/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchProjects()
    }
  }

  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.estado === 'En progreso').length
  const completedProjects = projects.filter(p => p.estado === 'Completado').length

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pedidos en Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Completados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedProjects}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del Pedido</Label>
              <Input id="nombre" name="nombre" value={newProject.nombre} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input id="cliente" name="cliente" value={newProject.cliente} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select onValueChange={handleSelectChange} value={newProject.estado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planificación">Planificación</SelectItem>
                  <SelectItem value="En progreso">En progreso</SelectItem>
                  <SelectItem value="En espera">En espera</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fecha_limite">Fecha Límite</Label>
              <Input id="fecha_limite" name="fecha_limite" type="date" value={newProject.fecha_limite} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Agregar Pedido</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.nombre}</TableCell>
                  <TableCell>{project.cliente}</TableCell>
                  <TableCell>{project.estado}</TableCell>
                  <TableCell>{new Date(project.fecha_limite).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(project.id)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}