'use client'
// components/ModoCiudadanoView.tsx

import { useState } from 'react'
import { Candidato } from '@/lib/candidatos'

interface Props {
  candidatos: Candidato[]
  secciones: readonly { id: string; label: string; icon: string }[]
}

interface RankingItem {
  candidatoId: string
  puntaje: number
  fortalezas: string[]
  debilidades: string[]
  resumen: string
}

interface RankingResult {
  ranking: RankingItem[]
  advertencia: string
}

const MAX_TEMAS = 3

export default function ModoCiudadanoView({ candidatos, secciones }: Props) {
  const [selectedTemas, setSelectedTemas] = useState<string[]>([])
  const [ranking, setRanking] = useState<RankingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleTema = (id: string) => {
    setSelectedTemas(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX_TEMAS) return prev
      return [...prev, id]
    })
    setRanking(null)
  }

  const runRanking = async () => {
    if (selectedTemas.length === 0) return
    setLoading(true)
    setError('')
    setRanking(null)
    try {
      const payload = candidatos.map(c => ({
        id: c.id,
        nombre: c.nombre,
        partido: c.partido,
        plan: Object.fromEntries(
          selectedTemas.map(t => [t, (c.plan as any)[t] || null])
        ),
      }))
      const res = await fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ temas: selectedTemas, candidatos: payload }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setRanking(data)
    } catch (e: any) {
      setError(e.message || 'Error generando ranking')
    } finally {
      setLoading(false)
    }
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']

  return (
    <div>
      {/* Intro */}
      <div style={{ background: 'linear-gradient(135deg, var(--ink), #2d2520)', borderRadius: 16, padding: '22px 26px', marginBottom: 26, border: '1px solid var(--gold)30' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)', fontWeight: 900, marginBottom: 8 }}>
          🧭 Modo Ciudadano
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#c0b090', lineHeight: 1.75 }}>
          Selecciona hasta <strong style={{ color: 'var(--gold-light)' }}>{MAX_TEMAS} temas</strong> que más te importan como ciudadano.
          La IA generará un <strong style={{ color: 'var(--gold-light)' }}>ranking personalizado</strong> de candidatos según qué tan concretas y ambiciosas son sus propuestas en esos ejes.
          <span style={{ display: 'block', marginTop: 6, fontSize: 12.5, color: '#908070' }}>
            ⚠️ El ranking mide la <em>solidez técnica</em> de las propuestas, no su orientación política.
          </span>
        </p>
      </div>

      {/* Topic selector */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Elige tus {MAX_TEMAS} temas prioritarios
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', fontWeight: 400, marginLeft: 10 }}>
            ({selectedTemas.length}/{MAX_TEMAS} seleccionados)
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {secciones.map(s => {
            const isSelected = selectedTemas.includes(s.id)
            const isDisabled = !isSelected && selectedTemas.length >= MAX_TEMAS
            return (
              <button
                key={s.id}
                onClick={() => toggleTema(s.id)}
                disabled={isDisabled}
                style={{
                  padding: '14px 16px',
                  background: isSelected ? 'var(--ink)' : isDisabled ? '#f9fafb' : '#fff',
                  border: `2px solid ${isSelected ? 'var(--gold)' : isDisabled ? '#e5e7eb' : 'var(--border)'}`,
                  borderRadius: 12,
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? '#fff' : isDisabled ? '#d1d5db' : 'var(--muted)',
                  textAlign: 'left',
                  transition: 'all 0.18s',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div>{s.label}</div>
                  {isSelected && (
                    <div style={{ fontSize: 11, color: 'var(--gold)', marginTop: 2 }}>
                      #{selectedTemas.indexOf(s.id) + 1} prioridad
                    </div>
                  )}
                </div>
                {isSelected && (
                  <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 14 }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate button */}
      {selectedTemas.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={runRanking}
            disabled={loading}
            style={{
              padding: '14px 32px',
              background: loading ? '#e5e7eb' : `linear-gradient(135deg, var(--gold), var(--gold-light))`,
              border: 'none', borderRadius: 12,
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700,
              color: loading ? '#9ca3af' : 'var(--ink)',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: loading ? 'none' : '0 4px 16px rgba(201,151,58,0.35)',
              transition: 'all 0.18s',
            }}
          >
            {loading
              ? <><span className="spinner" /> Generando tu ranking personalizado…</>
              : <>🧭 Generar mi ranking personalizado</>
            }
          </button>
          {error && <div style={{ marginTop: 8, color: '#dc2626', fontFamily: 'var(--font-body)', fontSize: 13 }}>{error}</div>}
        </div>
      )}

      {/* Ranking result */}
      {ranking && (
        <div className="fade-up">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: 'var(--ink)', marginBottom: 6 }}>
            Tu ranking personalizado
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.65 }}>
            Basado en: <strong>{selectedTemas.map(t => secciones.find(s => s.id === t)?.label).join(', ')}</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ranking.ranking.map((item, idx) => {
              const c = candidatos.find(x => x.id === item.candidatoId)
              if (!c) return null
              const barColor = item.puntaje >= 70 ? '#16a34a' : item.puntaje >= 50 ? '#d97706' : '#6b7280'

              return (
                <div
                  key={item.candidatoId}
                  className={`fade-up fade-up-${idx + 1}`}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    border: idx === 0 ? `2px solid ${c.color}` : '1.5px solid var(--border)',
                    overflow: 'hidden',
                    boxShadow: idx === 0 ? `0 6px 24px ${c.color}30` : '0 2px 10px var(--shadow)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                    {/* Rank & medal */}
                    <div style={{ fontSize: idx < 3 ? 36 : 22, flexShrink: 0 }}>{medals[idx] || `#${idx + 1}`}</div>

                    {/* Candidate info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 7, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>
                          {c.iniciales}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 900, color: 'var(--ink)' }}>{c.nombre}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)' }}>{c.partido}</div>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.65 }}>{item.resumen}</p>
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 900, color: barColor, lineHeight: 1 }}>{item.puntaje}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>/ 100 pts</div>
                      <div style={{ width: 60, height: 5, background: '#e5e7eb', borderRadius: 3, marginTop: 5 }}>
                        <div style={{ width: `${item.puntaje}%`, height: '100%', background: barColor, borderRadius: 3 }} />
                      </div>
                    </div>
                  </div>

                  {/* Strengths & weaknesses */}
                  <div style={{ padding: '0 20px 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {item.fortalezas?.length > 0 && (
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', fontFamily: 'var(--font-body)', marginBottom: 5 }}>✅ Fortalezas</div>
                        {item.fortalezas.map((f, i) => (
                          <div key={i} style={{ fontSize: 12.5, color: '#374151', fontFamily: 'var(--font-body)', lineHeight: 1.55, marginBottom: 3 }}>• {f}</div>
                        ))}
                      </div>
                    )}
                    {item.debilidades?.length > 0 && (
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#d97706', fontFamily: 'var(--font-body)', marginBottom: 5 }}>⚠️ Debilidades</div>
                        {item.debilidades.map((d, i) => (
                          <div key={i} style={{ fontSize: 12.5, color: '#374151', fontFamily: 'var(--font-body)', lineHeight: 1.55, marginBottom: 3 }}>• {d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Warning */}
          {ranking.advertencia && (
            <div style={{ marginTop: 20, padding: '14px 18px', background: '#fffbeb', border: '1px solid #fcd34d40', borderRadius: 12, display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#92400e', lineHeight: 1.65 }}>{ranking.advertencia}</p>
            </div>
          )}
        </div>
      )}

      {selectedTemas.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          Selecciona entre 1 y {MAX_TEMAS} temas para generar tu ranking
        </div>
      )}
    </div>
  )
}
