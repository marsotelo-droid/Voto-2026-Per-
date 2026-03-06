# 🗳️ Voto Informado Perú 2026

Herramienta de análisis de planes de gobierno con IA para las elecciones peruanas del 12 de abril de 2026.

## Funcionalidades

1. **🚦 Semáforo de Propuestas** — Evalúa si cada propuesta es concreta (tiene meta, plazo y fuente) o vaga
2. **⚖️ Comparador Inteligente** — Selecciona candidatos y la IA analiza coincidencias, contradicciones y solidez
3. **🧭 Modo Ciudadano** — Elige hasta 3 temas prioritarios y obtén un ranking personalizado
4. **🔍 Antecedentes y Plancha** — La IA busca en internet investigaciones judiciales y controversias

## Deploy en Vercel (paso a paso)

### Paso 1: Clonar o subir el proyecto

**Opción A — GitHub (recomendado):**
```bash
# Crea un repositorio en github.com y sube este código
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/voto-informado.git
git push -u origin main
```

**Opción B — Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) → "Add New Project"
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente que es Next.js

### Paso 3: Variables de entorno (¡CRÍTICO!)

En Vercel → tu proyecto → **Settings → Environment Variables**, agrega:

| Variable | Valor |
|----------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` |

> ⚠️ Sin esta variable, las funciones de IA no funcionarán.

### Paso 4: Deploy

Haz clic en **Deploy**. Vercel instalará dependencias y construirá la app automáticamente.

Tu URL será algo como: `https://voto-informado-peru.vercel.app`

---

## Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno
cp .env.example .env.local
# Edita .env.local y pon tu ANTHROPIC_API_KEY real

# 3. Correr en modo desarrollo
npm run dev

# Abre http://localhost:3000
```

## Estructura del proyecto

```
voto-informado/
├── app/
│   ├── api/
│   │   ├── compare/route.ts    # Análisis comparativo IA
│   │   ├── ranking/route.ts    # Ranking modo ciudadano  
│   │   └── search/route.ts     # Búsqueda antecedentes web
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── VotoInformadoApp.tsx    # Componente principal + navegación
│   ├── SemaforoView.tsx        # Modo 1: Semáforo
│   ├── ComparadorView.tsx      # Modo 2: Comparador
│   ├── ModoCiudadanoView.tsx   # Modo 3: Modo Ciudadano
│   └── AntecedentesView.tsx   # Modo 4: Antecedentes
├── lib/
│   └── candidatos.ts           # Base de datos de candidatos y planes
├── .env.example
├── next.config.js
├── package.json
└── tsconfig.json
```

## Agregar más candidatos

Edita `lib/candidatos.ts` y agrega un nuevo objeto al array `CANDIDATOS` siguiendo la estructura existente. Los datos deben provenir de los planes de gobierno oficiales del JNE: https://elecciones.jne.gob.pe

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Anthropic Claude API** (claude-opus-4-5 con web search)
- **Vercel** (hosting + serverless functions)

## Fuentes de datos

Todos los datos de propuestas provienen de los planes de gobierno oficiales registrados ante el **Jurado Nacional de Elecciones (JNE)**: https://elecciones.jne.gob.pe

Esta herramienta es independiente, no partidaria y no recibe financiamiento de ningún partido político.
