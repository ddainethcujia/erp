import { NextResponse } from 'next/server';
import executeQuery from '@/lib/db';

export async function GET() {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM empleados',
      values: [],
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, posicion, departamento, fecha_inicio } = await request.json();
    const result = await executeQuery({
      query: 'INSERT INTO empleados (nombre, posicion, departamento, fecha_inicio) VALUES (?, ?, ?, ?)',
      values: [nombre, posicion, departamento, fecha_inicio],
    });
    return NextResponse.json({ message: 'Empleado agregado exitosamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}