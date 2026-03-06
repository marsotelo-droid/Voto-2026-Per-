'use client'
// components/VotoInformadoApp.tsx

import { useState } from 'react'
import { CANDIDATOS, SECCIONES } from '@/lib/candidatos'
import SemaforoView from './SemaforoView'
import ComparadorView from './ComparadorView'
import ModoCiudadanoView from './ModoCiudadanoView'
import AntecedentesView from './AntecedentesView'

type Mode = 'semaforo' | 'comparador' | 'ciudadano' | 'antecedentes'

const MODES = [
  { id: 'semaforo' as Mode,      icon: '🚦', label: 'Semáforo de Propuestas',   desc: 'Evalúa si cada propuesta es concreta o vaga' },
  { id: 'comparador' as Mode,    icon: '⚖️', label: 'Comparador Inteligente',   desc: 'IA analiza coincidencias y contradicciones' },
  { id: 'ciudadano' as Mode,     icon: '🧭', label: 'Modo Ciudadano',           desc: 'Ranking personalizado por tus temas prioritarios' },
  { id: 'antecedentes' as Mode,  icon: '🔍', label: 'Antecedentes y Plancha',   desc: 'IA busca investigaciones en internet' },
]

export default function VotoInformadoApp() {
  const [mode, setMode] = useState<Mode>('semaforo')

  const daysLeft = Math.ceil((new Date('2026-04-12').getTime() - Date.now()) / 86400000)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* ── HEADER ── */}
      <header style={{ background: 'var(--ink)', borderBottom: '3px solid var(--gold)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 26 }}>🗳️</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--cream)', fontWeight: 900, lineHeight: 1 }}>
                  Voto <span className="shimmer-text">Informado</span> Perú 2026
                </h1>
              </div>
              <p style={{ color: '#908070', fontSize: 12.5, marginTop: 4, fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
                Análisis independiente · Datos oficiales JNE · Inteligencia Artificial
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--gold)', fontWeight: 900, lineHeight: 1 }}>
                {daysLeft}
              </div>
              <div style={{ fontSize: 11, color: '#706050', fontFamily: 'var(--font-body)' }}>días — 12 ABR 2026</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MODE SELECTOR ── */}
      <div style={{ background: '#fff', borderBottom: '1.5px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px var(--shadow)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: mode === m.id ? '3px solid var(--gold)' : '3px solid transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  fontWeight: mode === m.id ? 700 : 400,
                  color: mode === m.id ? 'var(--ink)' : 'var(--muted)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODE DESCRIPTION ── */}
      <div style={{ background: 'linear-gradient(135deg, var(--parchment), #f0e8d8)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>
            {MODES.find(m => m.id === mode)?.icon}{' '}
            <strong style={{ color: 'var(--ink)' }}>{MODES.find(m => m.id === mode)?.label}:</strong>{' '}
            {MODES.find(m => m.id === mode)?.desc}
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
        {mode === 'semaforo'      && <SemaforoView candidatos={CANDIDATOS} secciones={SECCIONES} />}
        {mode === 'comparador'    && <ComparadorView candidatos={CANDIDATOS} secciones={SECCIONES} />}
        {mode === 'ciudadano'     && <ModoCiudadanoView candidatos={CANDIDATOS} secciones={SECCIONES} />}
        {mode === 'antecedentes'  && <AntecedentesView candidatos={CANDIDATOS} />}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--ink)', padding: '20px 24px', marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#706050', lineHeight: 1.7, textAlign: 'center' }}>
            📌 Datos extraídos de planes de gobierno oficiales registrados ante el{' '}
            <a href="https://elecciones.jne.gob.pe" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>JNE</a>.
            {' '}Herramienta independiente, no partidaria. Las búsquedas de antecedentes provienen de fuentes periodísticas públicas.
            {' '}🚦 Verde = propuesta con meta, plazo y fuente. Amarillo = solo intención.
          </p>
        </div>
      </footer>
    </div>
  )
}
