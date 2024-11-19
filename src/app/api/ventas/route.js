import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query({
      query: `
        SELECT 
          SUM(amount) as total,
          (SUM(CASE WHEN date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN amount ELSE 0 END) - 
           SUM(CASE WHEN date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND date < DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN amount ELSE 0 END)) /
          NULLIF(SUM(CASE WHEN date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND date < DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN amount ELSE 0 END), 0) * 100 as percentageChange
        FROM transactions
        WHERE type = 'sale' AND date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
      `,
      values: [],
    })

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}