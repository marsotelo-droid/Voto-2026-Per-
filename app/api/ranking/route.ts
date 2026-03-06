// app/api/ranking/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { temas, candidatos } = await req.json()

    const prompt = `Eres un sistema de ranking imparcial de planes de gobierno peruanos 2026.
El ciudadano ha priorizado estos temas: ${temas.join(', ')}.

Para cada candidato, analiza SOLO sus propuestas en los temas seleccionados:

${candidatos.map((c: any) => `
=== ${c.nombre} (${c.partido}) ===
${temas.map((t: string) => `
[${t.toUpperCase()}]
Resumen: ${c.plan[t]?.resumen || 'No disponible'}
Propuestas concretas: ${(c.plan[t]?.propuestas || []).filter((p: any) => p.concreta).length}/${(c.plan[t]?.propuestas || []).length}
`).join('')}
`).join('\n')}

Genera un ranking en JSON (sin backticks):
{
  "ranking": [
    {
      "candidatoId": "id del candidato",
      "puntaje": 85,
      "fortalezas": ["fortaleza 1 en 1 frase", "fortaleza 2"],
      "debilidades": ["debilidad 1 en 1 frase"],
      "resumen": "2 frases sobre por qué ocupa esta posición"
    }
  ],
  "advertencia": "texto breve recordando que el ranking mide solidez de propuestas, no orientación política"
}

Ordena de mayor a menor puntaje. El puntaje considera: % propuestas concretas con meta y plazo (50%), cobertura de los temas seleccionados (30%), coherencia y ambición de metas (20%).`

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = response.content[0].type === 'text' ? response.content[0].text : ''
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error generando ranking' }, { status: 500 })
  }
}
