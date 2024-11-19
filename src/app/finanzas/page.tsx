'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Finanzas() {
  const [transactions, setTransactions] = useState([])
  const [newTransaction, setNewTransaction] = useState({ fecha: '', descripcion: '', monto: '' })

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transacciones')
    const data = await res.json()
    setTransactions(data)
  }

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/transacciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    })
    if (res.ok) {
      setNewTransaction({ fecha: '', descripcion: '', monto: '' })
      fetchTransactions()
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/transacciones/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchTransactions()
    }
  }

  const totalBalance = transactions.reduce((sum, t) => sum + parseFloat(t.monto), 0)
  const totalIncome = transactions.filter(t => parseFloat(t.monto) > 0).reduce((sum, t) => sum + parseFloat(t.monto), 0)
  const totalExpenses = Math.abs(transactions.filter(t => parseFloat(t.monto) < 0).reduce((sum, t) => sum + parseFloat(t.monto), 0))

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Finanzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gastos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nueva Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fecha">Fecha</Label>
              <Input id="fecha" name="fecha" type="date" value={newTransaction.fecha} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Input id="descripcion" name="descripcion" value={newTransaction.descripcion} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="monto">Monto</Label>
              <Input id="monto" name="monto" type="number" step="0.01" value={newTransaction.monto} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Agregar Transacción</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.descripcion}</TableCell>
                  <TableCell className={`text-right ${parseFloat(transaction.monto) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(parseFloat(transaction.monto)).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Eliminar</Button>
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