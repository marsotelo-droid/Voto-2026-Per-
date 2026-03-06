'use client'
// components/SemaforoView.tsx

import { useState } from 'react'
import { Candidato, SeccionId } from '@/lib/candidatos'

interface Props {
  candidatos: Candidato[]
  secciones: readonly { id: string; label: string; icon: string }[]
}

const SOCIAL_TOPICS = [
  { id: 'lgbtq', label: 'LGBTQ+', icon: '🏳️‍🌈' },
  { id: 'aborto', label: 'Aborto', icon: '⚕️' },
  { id: 'genero', label: 'Igualdad de Género', icon: '⚧️' },
  { id: 'penaMuerte', label: 'Pena de Muerte', icon: '⚖️' },
  { id: 'drogas', label: 'Drogas', icon: '🌿' },
]

const ESCALA_CONFIG: Record<number, { label: string; color: string; bg: string; icon: string }> = {
  2:  { label: 'Explícitamente a favor',    color: '#1d4ed8', bg: '#eff6ff', icon: '🔵' },
  1:  { label: 'Tendencia progresista',     color: '#059669', bg: '#ecfdf5', icon: '🟢' },
  0:  { label: 'No se pronuncia',           color: '#6b7280', bg: '#f9fafb', icon: '⚪' },
  '-1': { label: 'Tendencia conservadora', color: '#d97706', bg: '#fffbeb', icon: '🟡' },
  '-2': { label: 'Explícitamente en contra',color: '#dc2626', bg: '#fef2f2', icon: '🔴' },
}

function SolidezBar({ pct, color }: { pct: number; color: string }) {
  const cfg = pct >= 70 ? { icon: '🟢', label: 'Plan sólido', c: '#16a34a' }
    : pct >= 40 ? { icon: '🟡', label: 'Plan mixto', c: '#d97706' }
    : { icon: '🔴', label: 'Plan vago', c: '#dc2626' }

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--muted)' }}>
          {cfg.icon} Solidez del plan: <strong style={{ color: cfg.c }}>{pct}% concretas</strong> — {cfg.label}
        </span>
      </div>
      <div style={{ height: 7, background: '#e5e7eb', borderRadius: 4 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: cfg.c, borderRadius: 4, transition: 'width 0.7s ease' }} />
      </div>
    </div>
  )
}

function PropuestaRow({ p, idx }: { p: any; idx: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)', animation: 'fadeUp 0.3s ease both', animationDelay: `${idx * 0.04}s` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none', padding: '11px 0',
          display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{p.concreta ? '🟢' : '🟡'}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.6, flex: 1 }}>
          {p.texto}
        </span>
        <span style={{ color: '#ccc', fontSize: 12, flexShrink: 0, marginTop: 3 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ paddingBottom: 12, paddingLeft: 26, animation: 'fadeUp 0.25s ease' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, background: p.concreta ? '#dcfce7' : '#fef9c3', color: p.concreta ? '#166534' : '#92400e', padding: '3px 10px', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              {p.concreta ? '✅ Propuesta concreta' : '⚠️ Propuesta vaga — solo intención'}
            </span>
          </div>
          {p.meta && <div style={{ fontSize: 12.5, color: '#059669', fontFamily: 'var(--font-body)', marginBottom: 3 }}>🎯 Meta: <strong>{p.meta}</strong></div>}
          {p.plazo && <div style={{ fontSize: 12.5, color: '#2563eb', fontFamily: 'var(--font-body)', marginBottom: 3 }}>📅 Plazo: <strong>{p.plazo}</strong></div>}
          {p.fuente && <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>📄 {p.fuente}</div>}
          {!p.concreta && (
            <div style={{ marginTop: 8, padding: '8px 12px', background: '#fef9c3', borderRadius: 8, fontSize: 12.5, color: '#78350f', fontFamily: 'var(--font-body)' }}>
              ⚠️ Carece de meta cuantificable, plazo definido o fuente de financiamiento. Es solo una intención política.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SemaforoView({ candidatos, secciones }: Props) {
  const [seccionActiva, setSeccionActiva] = useState<string>('salud')
  const [socialTopic, setSocialTopic] = useState<string>('lgbtq')

  const isSocial = seccionActiva === 'temasSociales'

  return (
    <div>
      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
        {[...secciones, { id: 'temasSociales', label: 'Temas Sociales', icon: '🗣️' }].map(s => (
          <button
            key={s.id}
            onClick={() => setSeccionActiva(s.id)}
            style={{
              padding: '8px 16px',
              background: seccionActiva === s.id ? 'var(--ink)' : '#fff',
              border: `1.5px solid ${seccionActiva === s.id ? 'var(--ink)' : 'var(--border)'}`,
              borderRadius: 10, fontSize: 13, fontWeight: seccionActiva === s.id ? 700 : 400,
              color: seccionActiva === s.id ? '#fff' : 'var(--muted)',
              transition: 'all 0.18s',
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Social topic sub-tabs */}
      {isSocial && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {SOCIAL_TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => setSocialTopic(t.id)}
              style={{
                padding: '7px 14px',
                background: socialTopic === t.id ? 'var(--gold)' : '#fff',
                border: `1.5px solid ${socialTopic === t.id ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 20, fontSize: 13, fontWeight: socialTopic === t.id ? 700 : 400,
                color: socialTopic === t.id ? '#fff' : 'var(--muted)',
                transition: 'all 0.18s',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Candidate cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
        {candidatos.map((c, ci) => {
          const secData = (c.plan as any)[seccionActiva]
          const propuestas = secData?.propuestas || []
          const concretas = propuestas.filter((p: any) => p.concreta).length
          const pct = propuestas.length > 0 ? Math.round((concretas / propuestas.length) * 100) : 0

          const socialData = isSocial ? (c.plan.temasSociales as any)[socialTopic] : null
          const escCfg = socialData ? ESCALA_CONFIG[socialData.escala] || ESCALA_CONFIG[0] : null

          return (
            <div
              key={c.id}
              className={`fade-up fade-up-${Math.min(ci + 1, 4)}`}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1.5px solid var(--border)',
                overflow: 'hidden',
                boxShadow: '0 3px 16px var(--shadow)',
              }}
            >
              {/* Party header */}
              <div style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: '#fff',
                }}>
                  {c.iniciales}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 900, color: '#fff' }}>{c.nombre}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>{c.partido} · {c.ideologia}</div>
                </div>
              </div>

              <div style={{ padding: '16px 18px' }}>
                {isSocial && socialData ? (
                  <>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: escCfg?.bg, color: escCfg?.color,
                        borderRadius: 20, padding: '5px 14px', fontSize: 12.5,
                        fontFamily: 'var(--font-body)', fontWeight: 700,
                        border: `1px solid ${escCfg?.color}30`,
                      }}>
                        {escCfg?.icon} {escCfg?.label}
                      </span>
                    </div>
                    {socialData.silencio && (
                      <div style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', marginBottom: 10 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#374151', fontFamily: 'var(--font-body)', marginBottom: 2 }}>🔇 Silencio programático</div>
                        <div style={{ fontSize: 12, color: '#6b7280', fontFamily: 'var(--font-body)' }}>Este tema no aparece en el plan de gobierno.</div>
                      </div>
                    )}
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#374151', lineHeight: 1.75 }}>{socialData.resumen}</p>
                    <div style={{ marginTop: 8, fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>📄 {socialData.fuente}</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-body)', marginBottom: 10, fontStyle: 'italic', lineHeight: 1.65 }}>
                      {secData?.resumen || 'Sin datos disponibles'}
                    </div>
                    {propuestas.length > 0 && <SolidezBar pct={pct} color={c.color} />}
                    <div>
                      {propuestas.map((p: any, i: number) => <PropuestaRow key={i} p={p} idx={i} />)}
                    </div>
                    {secData?.paginas && (
                      <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                        📄 Fuente: Plan Oficial JNE — {secData.paginas}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 24, padding: '14px 18px', background: 'var(--parchment)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>Leyenda:</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: '#166534' }}>🟢 Propuesta concreta — tiene meta, plazo y fuente</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: '#92400e' }}>🟡 Propuesta vaga — solo intención política</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: '#6b7280' }}>🔇 Silencio = el tema no aparece en el plan oficial</span>
      </div>
    </div>
  )
}
