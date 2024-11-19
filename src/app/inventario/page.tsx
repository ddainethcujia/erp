'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Inventario() {
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({ nombre: '', categoria: '', stock: '', precio: '' })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/productos')
    const data = await res.json()
    setProducts(data)
  }

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    if (res.ok) {
      setNewProduct({ nombre: '', categoria: '', stock: '', precio: '' })
      fetchProducts()
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchProducts()
    }
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + parseFloat(p.stock) * parseFloat(p.precio), 0)
  const lowStockProducts = products.filter(p => parseInt(p.stock) < 10).length

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Inventario</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valor Total del Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos con Bajo Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lowStockProducts}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={newProduct.nombre} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="categoria">Categoría</Label>
              <Input id="categoria" name="categoria" value={newProduct.categoria} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="precio">Precio</Label>
              <Input id="precio" name="precio" type="number" step="0.01" value={newProduct.precio} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Agregar Producto</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">${parseFloat(product.precio).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(product.id)}>Eliminar</Button>
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