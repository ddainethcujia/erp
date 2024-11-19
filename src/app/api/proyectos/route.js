import { NextResponse } from 'next/server';
import executeQuery from '@/lib/db';

export async function GET() {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM proyectos',
      values: [],
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, cliente, estado, fecha_limite } = await request.json();
    const result = await executeQuery({
      query: 'INSERT INTO proyectos (nombre, cliente, estado, fecha_limite) VALUES (?, ?, ?, ?)',
      values: [nombre, cliente, estado, fecha_limite],
    });
    return NextResponse.json({ message: 'Proyecto agregado exitosamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}