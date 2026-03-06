'use client'
// components/ComparadorView.tsx

import { useState } from 'react'
import { Candidato } from '@/lib/candidatos'

interface Props {
  candidatos: Candidato[]
  secciones: readonly { id: string; label: string; icon: string }[]
}

interface AnalysisResult {
  coincidencias: string[]
  contradicciones: string[]
  masConcreto: string
  razonMasConcreto: string
  resumenGeneral: string
  puntajesSolidez: Record<string, number>
}

export default function ComparadorView({ candidatos, secciones }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [seccion, setSeccion] = useState('salud')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    setAnalysis(null)
  }

  const runAnalysis = async () => {
    if (selected.length < 2) return
    setLoading(true)
    setError('')
    setAnalysis(null)
    try {
      const payload = selected.map(id => {
        const c = candidatos.find(x => x.id === id)!
        const secData = (c.plan as any)[seccion]
        return {
          id: c.id,
          nombre: c.nombre,
          partido: c.partido,
          resumen: secData?.resumen || '',
          propuestas: secData?.propuestas || [],
        }
      })
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidatos: payload, seccion }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAnalysis(data)
    } catch (e: any) {
      setError(e.message || 'Error generando análisis')
    } finally {
      setLoading(false)
    }
  }

  const selectedCandidatos = candidatos.filter(c => selected.includes(c.id))

  return (
    <div>
      {/* Step 1: Select candidates */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
          1. Selecciona candidatos a comparar (mínimo 2)
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {candidatos.map(c => {
            const isSelected = selected.includes(c.id)
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                style={{
                  padding: '10px 18px',
                  background: isSelected ? c.color : '#fff',
                  border: `2px solid ${isSelected ? c.color : 'var(--border)'}`,
                  borderRadius: 12,
                  fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? '#fff' : 'var(--muted)',
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ width: 26, height: 26, borderRadius: 6, background: isSelected ? 'rgba(255,255,255,0.25)' : c.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: isSelected ? '#fff' : c.color }}>
                  {c.iniciales}
                </span>
                {c.nombre}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Select section */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
          2. Elige el eje temático a comparar
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {secciones.map(s => (
            <button
              key={s.id}
              onClick={() => { setSeccion(s.id); setAnalysis(null) }}
              style={{
                padding: '8px 16px',
                background: seccion === s.id ? 'var(--gold)' : '#fff',
                border: `1.5px solid ${seccion === s.id ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 10, fontSize: 13, fontWeight: seccion === s.id ? 700 : 400,
                color: seccion === s.id ? '#fff' : 'var(--muted)',
                transition: 'all 0.18s',
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side semáforos */}
      {selected.length >= 2 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
            3. Semáforo comparado en {secciones.find(s => s.id === seccion)?.label}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(selectedCandidatos.length, 3)}, 1fr)`, gap: 14 }}>
            {selectedCandidatos.map(c => {
              const secData = (c.plan as any)[seccion]
              const props = secData?.propuestas || []
              const concretas = props.filter((p: any) => p.concreta).length
              const pct = props.length > 0 ? Math.round((concretas / props.length) * 100) : 0
              const semaforoColor = pct >= 70 ? '#16a34a' : pct >= 40 ? '#d97706' : '#dc2626'
              const semaforoIcon = pct >= 70 ? '🟢' : pct >= 40 ? '🟡' : '🔴'

              return (
                <div key={c.id} style={{ background: '#fff', borderRadius: 14, border: `2px solid ${c.color}30`, overflow: 'hidden', boxShadow: '0 2px 10px var(--shadow)' }}>
                  <div style={{ background: c.color, padding: '10px 14px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, color: '#fff' }}>{c.nombre}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>{c.partido}</div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{semaforoIcon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: semaforoColor }}>{pct}%</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-body)', marginBottom: 8 }}>propuestas concretas</div>
                    <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: semaforoColor, borderRadius: 3 }} />
                    </div>
                    <div style={{ marginTop: 12 }}>
                      {props.slice(0, 3).map((p: any, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                          <span>{p.concreta ? '🟢' : '🟡'}</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{p.texto.substring(0, 80)}…</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* AI Analysis button */}
      {selected.length >= 2 && (
        <div style={{ marginBottom: 22 }}>
          <button
            onClick={runAnalysis}
            disabled={loading}
            style={{
              padding: '12px 28px',
              background: loading ? '#e5e7eb' : 'var(--ink)',
              border: 'none', borderRadius: 12,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              color: loading ? '#9ca3af' : '#fff',
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'all 0.18s',
            }}
          >
            {loading ? <><span className="spinner" /> Generando análisis IA…</> : '🤖 Generar análisis comparativo con IA'}
          </button>
          {error && <div style={{ marginTop: 8, color: '#dc2626', fontFamily: 'var(--font-body)', fontSize: 13 }}>{error}</div>}
        </div>
      )}

      {/* AI Analysis result */}
      {analysis && (
        <div className="fade-up" style={{ background: '#fff', borderRadius: 16, border: '1.5px solid var(--border)', padding: '24px', boxShadow: '0 4px 20px var(--shadow)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--ink)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            🤖 Análisis IA — {secciones.find(s => s.id === seccion)?.label}
          </div>

          {/* Puntajes */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.entries(analysis.puntajesSolidez).map(([id, score]) => {
              const c = candidatos.find(x => x.id === id)
              if (!c) return null
              return (
                <div key={id} style={{ background: c.color + '15', border: `1.5px solid ${c.color}40`, borderRadius: 12, padding: '12px 16px', minWidth: 130, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900, color: c.color }}>{score}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--muted)' }}>/ 100 puntos</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700, color: c.color, marginTop: 2 }}>{c.nombre}</div>
                </div>
              )
            })}
          </div>

          {/* Winner */}
          <div style={{ background: 'var(--parchment)', borderRadius: 12, padding: '14px 16px', marginBottom: 16, border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
              🏆 Plan más sólido: {analysis.masConcreto}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.7 }}>{analysis.razonMasConcreto}</p>
          </div>

          {/* Resumen */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>📊 Análisis general</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#374151', lineHeight: 1.8 }}>{analysis.resumenGeneral}</p>
          </div>

          {/* Coincidencias */}
          {analysis.coincidencias?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: '#059669', marginBottom: 8 }}>✅ Puntos de coincidencia</div>
              {analysis.coincidencias.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#059669', flexShrink: 0 }}>•</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Contradicciones */}
          {analysis.contradicciones?.length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>⚠️ Contradicciones y diferencias clave</div>
              {analysis.contradicciones.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#dc2626', flexShrink: 0 }}>•</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selected.length < 2 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          Selecciona al menos 2 candidatos para iniciar la comparación
        </div>
      )}
    </div>
  )
}
