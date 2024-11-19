import { NextResponse } from 'next/server';
import executeQuery from '@/lib/db';

export async function GET() {
  try {
    const result = await executeQuery({
      query: 'SELECT * FROM transacciones ORDER BY fecha DESC',
      values: [],
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { fecha, descripcion, monto } = await request.json();
    const result = await executeQuery({
      query: 'INSERT INTO transacciones (fecha, descripcion, monto) VALUES (?, ?, ?)',
      values: [fecha, descripcion, monto],
    });
    return NextResponse.json({ message: 'Transacción agregada exitosamente', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}