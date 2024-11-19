import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-gray-500">+$0% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuevos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-gray-500">+0% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-gray-500">0 finalizados este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-gray-500">+0 nuevas contrataciones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-gray-500">0 productos bajo stock mínimo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Facturas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-gray-500">$0 por cobrar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}