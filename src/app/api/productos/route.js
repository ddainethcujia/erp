import { NextResponse } from 'next/server';
import executeQuery from '@/lib/db';

export async function GET() {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM productos',
      values: [],
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, categoria, stock, precio } = await request.json();
    const result = await executeQuery({
      query: 'INSERT INTO productos (nombre, categoria, stock, precio) VALUES (?, ?, ?, ?)',
      values: [nombre, categoria, stock, precio],
    });
    return NextResponse.json({ message: 'Producto agregado exitosamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}