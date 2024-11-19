import { NextResponse } from 'next/server';
import executeQuery from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await executeQuery({
      query: 'DELETE FROM empleados WHERE id = ?',
      values: [id],
    });
    return NextResponse.json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}