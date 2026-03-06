// app/api/compare/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { candidatos, seccion } = await req.json()

    const prompt = `Eres un analista político independiente peruano especializado en planes de gobierno 2026.
Analiza comparativamente las propuestas de los siguientes candidatos en el eje "${seccion}":

${candidatos.map((c: any) => `
=== ${c.nombre} (${c.partido}) ===
Resumen: ${c.resumen}
Propuestas:
${c.propuestas.map((p: any) => `- [${p.concreta ? '🟢 CONCRETA' : '🟡 VAGA'}] ${p.texto}${p.meta ? ` | Meta: ${p.meta}` : ''}${p.plazo ? ` | Plazo: ${p.plazo}` : ''}`).join('\n')}
`).join('\n')}

Genera un análisis estructurado en JSON con este formato exacto (sin backticks):
{
  "coincidencias": ["punto de acuerdo 1", "punto de acuerdo 2"],
  "contradicciones": ["contradicción 1", "contradicción 2"],
  "masConcreto": "nombre del candidato con propuestas más sólidas",
  "razonMasConcreto": "explicación breve de 2-3 frases",
  "resumenGeneral": "párrafo de 3-4 frases con análisis general imparcial",
  "puntajesSolidez": {${candidatos.map((c: any) => `"${c.id}": 0`).join(', ')}}
}

Los puntajes de solidez son del 0 al 100 basados en: % propuestas concretas (60%), ambición de metas (20%), coherencia programática (20%).
Sé objetivo, técnico e imparcial.`

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = response.content[0].type === 'text' ? response.content[0].text : ''
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error generando análisis' }, { status: 500 })
  }
}
