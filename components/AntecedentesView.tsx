'use client'
// components/AntecedentesView.tsx

import { useState } from 'react'
import { Candidato } from '@/lib/candidatos'

interface Props {
  candidatos: Candidato[]
}

interface Investigacion {
  tipo: string
  descripcion: string
  estado: 'activo' | 'archivado' | 'sentenciado' | 'apelando' | string
  fuente: string
  año: number
}

interface PlanchaItem {
  nombre: string
  cargo: string
  hallazgos: string
}

interface SearchResult {
  candidato: string
  partido: string
  resumenEstado: string
  investigaciones: Investigacion[]
  plancha: PlanchaItem[]
  fuentesPrincipales: string[]
  ultimaActualizacion: string
  parseError?: boolean
}

const ESTADO_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  activo:      { color: '#dc2626', bg: '#fef2f2', label: '🔴 Activo' },
  apelando:    { color: '#d97706', bg: '#fffbeb', label: '🟡 En apelación' },
  archivado:   { color: '#6b7280', bg: '#f9fafb', label: '⚪ Archivado' },
  sentenciado: { color: '#7c3aed', bg: '#f5f3ff', label: '🟣 Sentenciado' },
}

const TIPO_ICON: Record<string, string> = {
  fiscal: '🏛️',
  judicial: '⚖️',
  congreso: '🏛️',
  indecopi: '📋',
  otro: '📌',
}

export default function AntecedentesView({ candidatos }: Props) {
  const [results, setResults] = useState<Record<string, SearchResult>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<Record<string, string>>({})

  const searchCandidate = async (c: Candidato) => {
    if (loading[c.id]) return
    setLoading(prev => ({ ...prev, [c.id]: true }))
    setError(prev => ({ ...prev, [c.id]: '' }))
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: c.nombre,
          partido: c.partido,
          plancha: c.plancha,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(prev => ({ ...prev, [c.id]: data }))
    } catch (e: any) {
      setError(prev => ({ ...prev, [c.id]: e.message || 'Error en búsqueda' }))
    } finally {
      setLoading(prev => ({ ...prev, [c.id]: false }))
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e1614, #2d1e1a)', borderRadius: 16, padding: '20px 24px', marginBottom: 26, border: '1px solid #c1121f30' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#f5c0c0', fontWeight: 900, marginBottom: 8 }}>
          🔍 Antecedentes e Investigaciones
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#a09080', lineHeight: 1.75 }}>
          La IA realiza una búsqueda en tiempo real en internet sobre cada candidato y su plancha electoral,
          incluyendo investigaciones fiscales, procesos judiciales y controversias públicas.
          <strong style={{ color: '#e0c090' }}> Los resultados provienen de fuentes periodísticas verificadas </strong>
          (RPP, El Comercio, La República, Gestión, IDL-Reporteros).
        </p>
        <div style={{ marginTop: 10, padding: '8px 14px', background: 'rgba(193,18,31,0.15)', borderRadius: 8, display: 'flex', gap: 8 }}>
          <span>⚠️</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#f5c0c0', lineHeight: 1.6 }}>
            Esta sección usa búsqueda web en tiempo real. Puede tardar 15–30 segundos por candidato.
            Los hallazgos son informativos — siempre verifica en las fuentes originales.
          </span>
        </div>
      </div>

      {/* Candidate cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }}>
        {candidatos.map((c, ci) => {
          const result = results[c.id]
          const isLoading = loading[c.id]
          const err = error[c.id]

          return (
            <div
              key={c.id}
              className={`fade-up fade-up-${Math.min(ci + 1, 4)}`}
              style={{ background: '#fff', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: '0 3px 16px var(--shadow)' }}
            >
              {/* Header */}
              <div style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}bb)`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: '#fff' }}>
                  {c.iniciales}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 900, color: '#fff' }}>{c.nombre}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>{c.partido} · {c.ideologia}</div>
                </div>
              </div>

              {/* Plancha info */}
              <div style={{ padding: '10px 18px', background: 'var(--parchment)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                  <strong>VP1:</strong> {c.plancha.vp1}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                  <strong>VP2:</strong> {c.plancha.vp2}
                </span>
              </div>

              <div style={{ padding: '16px 18px' }}>
                {/* Search button */}
                {!result && !isLoading && (
                  <button
                    onClick={() => searchCandidate(c)}
                    style={{
                      width: '100%', padding: '12px',
                      background: 'var(--ink)', border: 'none', borderRadius: 10,
                      fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 700, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'all 0.18s',
                    }}
                  >
                    🔍 Buscar antecedentes en internet
                  </button>
                )}

                {/* Loading */}
                {isLoading && (
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 } as any} />
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
                      Buscando en RPP, El Comercio, La República…
                    </div>
                  </div>
                )}

                {/* Error */}
                {err && (
                  <div style={{ padding: '12px', background: '#fef2f2', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
                    {err}
                    <button onClick={() => searchCandidate(c)} style={{ display: 'block', margin: '8px auto 0', background: 'none', border: '1px solid #dc2626', borderRadius: 6, padding: '4px 12px', color: '#dc2626', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                      Reintentar
                    </button>
                  </div>
                )}

                {/* Results */}
                {result && (
                  <div className="fade-up">
                    {/* Summary */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>📋 Estado judicial general</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.75 }}>{result.resumenEstado}</p>
                    </div>

                    {/* Investigations */}
                    {result.investigaciones?.length > 0 ? (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>
                          ⚠️ Investigaciones encontradas ({result.investigaciones.length})
                        </div>
                        {result.investigaciones.map((inv, i) => {
                          const estadoCfg = ESTADO_CONFIG[inv.estado] || ESTADO_CONFIG.archivado
                          return (
                            <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px', marginBottom: 8, border: '1px solid #e5e7eb' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                                <span>{TIPO_ICON[inv.tipo] || '📌'}</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{inv.tipo}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: estadoCfg.color, background: estadoCfg.bg, padding: '2px 8px', borderRadius: 10, fontFamily: 'var(--font-body)' }}>
                                  {estadoCfg.label}
                                </span>
                              </div>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#374151', lineHeight: 1.65 }}>{inv.descripcion}</p>
                              <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                                {inv.fuente && <span style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>📰 {inv.fuente}</span>}
                                {inv.año && <span style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>📅 {inv.año}</span>}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div style={{ padding: '10px 14px', background: '#ecfdf5', borderRadius: 10, marginBottom: 14, border: '1px solid #bbf7d0' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#065f46' }}>✅ Sin investigaciones encontradas en fuentes verificadas</span>
                      </div>
                    )}

                    {/* Plancha results */}
                    {result.plancha?.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>👥 Plancha electoral</div>
                        {result.plancha.map((p, i) => (
                          <div key={i} style={{ background: 'var(--parchment)', borderRadius: 10, padding: '10px 14px', marginBottom: 6, border: '1px solid var(--border)' }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{p.nombre} — <span style={{ fontWeight: 400, color: 'var(--muted)' }}>{p.cargo}</span></div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{p.hallazgos}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sources & refresh */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                        🕐 Datos al: {result.ultimaActualizacion}
                      </div>
                      <button
                        onClick={() => searchCandidate(c)}
                        style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 12px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}
                      >
                        🔄 Actualizar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
