// app/api/search/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { nombre, partido, plancha } = await req.json()

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
      messages: [
        {
          role: 'user',
          content: `Investiga en internet al candidato presidencial peruano ${nombre} del partido ${partido} para las elecciones 2026. 

Busca específicamente:
1. Investigaciones fiscales o judiciales activas en su contra
2. Antecedentes penales o sentencias
3. Investigaciones a los miembros de su plancha (${plancha.vp1}, ${plancha.vp2})
4. Controversias o escándalos públicos recientes (2023-2026)
5. Fuentes verificadas de medios reconocidos (RPP, El Comercio, La República, Gestión, IDL-Reporteros)

Luego responde SOLO en JSON (sin backticks) con este formato:
{
  "candidato": "${nombre}",
  "partido": "${partido}",
  "resumenEstado": "1 párrafo sobre su situación judicial general",
  "investigaciones": [
    {
      "tipo": "fiscal|judicial|congreso|indecopi|otro",
      "descripcion": "descripción breve en 1-2 frases",
      "estado": "activo|archivado|sentenciado|apelando",
      "fuente": "nombre del medio",
      "año": 2024
    }
  ],
  "plancha": [
    {
      "nombre": "${plancha.vp1}",
      "cargo": "Primer Vicepresidente",
      "hallazgos": "resumen breve o 'Sin investigaciones encontradas'"
    },
    {
      "nombre": "${plancha.vp2}",
      "cargo": "Segundo Vicepresidente", 
      "hallazgos": "resumen breve o 'Sin investigaciones encontradas'"
    }
  ],
  "fuentesPrincipales": ["url1", "url2"],
  "ultimaActualizacion": "fecha de los datos más recientes encontrados"
}

Si no encuentras información sobre investigaciones, indica "Sin investigaciones encontradas en fuentes verificadas".
Sé factual, imparcial y cita solo fuentes confiables.`,
        },
      ],
    })

    // Extract the final text response after web searches
    const textContent = response.content.find(b => b.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'Sin respuesta de la IA' }, { status: 500 })
    }

    const raw = textContent.text
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
      return NextResponse.json(parsed)
    } catch {
      // If JSON parse fails, return structured error with raw text
      return NextResponse.json({
        candidato: nombre,
        partido,
        resumenEstado: raw,
        investigaciones: [],
        plancha: [],
        fuentesPrincipales: [],
        ultimaActualizacion: new Date().toISOString().split('T')[0],
        parseError: true,
      })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error en búsqueda' }, { status: 500 })
  }
}
