import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query({
      query: `
        SELECT 
          COUNT(*) as total,
          (COUNT(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN 1 END) - 
           COUNT(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN 1 END)) /
          NULLIF(COUNT(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN 1 END), 0) * 100 as percentageChange
        FROM customers
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
      `,
      values: [],
    })

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}