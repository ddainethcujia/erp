'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RecursosHumanos() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({ nombre: '', posicion: '', departamento: '', fecha_inicio: '' })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const res = await fetch('/api/empleados')
    const data = await res.json()
    setEmployees(data)
  }

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/empleados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    })
    if (res.ok) {
      setNewEmployee({ nombre: '', posicion: '', departamento: '', fecha_inicio: '' })
      fetchEmployees()
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/empleados/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchEmployees()
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Recursos Humanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{employees.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Departamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{new Set(employees.map(e => e.departamento)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuevas Contrataciones (Último Mes)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {employees.filter(e => new Date(e.fecha_inicio) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Empleado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={newEmployee.nombre} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="posicion">Posición</Label>
              <Input id="posicion" name="posicion" value={newEmployee.posicion} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="departamento">Departamento</Label>
              <Input id="departamento" name="departamento" value={newEmployee.departamento} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="fecha_inicio">Fecha de Inicio</Label>
              <Input id="fecha_inicio" name="fecha_inicio" type="date" value={newEmployee.fecha_inicio} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Agregar Empleado</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Posición</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.nombre}</TableCell>
                  <TableCell>{employee.posicion}</TableCell>
                  <TableCell>{employee.departamento}</TableCell>
                  <TableCell>{new Date(employee.fecha_inicio).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(employee.id)}>Eliminar</Button>
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