// lib/candidatos.ts
// Datos basados en planes de gobierno oficiales JNE 2026

export interface Propuesta {
  texto: string
  concreta: boolean
  meta: string | null
  plazo: string | null
  fuente: string | null
}

export interface SeccionPlan {
  resumen: string
  propuestas: Propuesta[]
  paginas?: string
}

export interface TemasSociales {
  lgbtq: { escala: number; resumen: string; silencio: boolean; fuente: string }
  aborto: { escala: number; resumen: string; silencio: boolean; fuente: string }
  genero: { escala: number; resumen: string; silencio: boolean; fuente: string }
  penaMuerte: { escala: number; resumen: string; silencio: boolean; fuente: string }
  drogas: { escala: number; resumen: string; silencio: boolean; fuente: string }
}

export interface Candidato {
  id: string
  nombre: string
  partido: string
  color: string
  iniciales: string
  ideologia: string
  plancha: { vp1: string; vp2: string }
  plan: {
    salud: SeccionPlan
    educacion: SeccionPlan
    seguridad: SeccionPlan
    economia: SeccionPlan
    medioambiente: SeccionPlan
    ddhh: SeccionPlan
    corrupcion: SeccionPlan
    temasSociales: TemasSociales
  }
}

export const CANDIDATOS: Candidato[] = [
  {
    id: "ahora",
    nombre: "Alfonso López Chao",
    partido: "Ahora Nación",
    color: "#2563eb",
    iniciales: "AL",
    ideologia: "Centro / Descentralismo",
    plancha: { vp1: "Por confirmar", vp2: "Por confirmar" },
    plan: {
      salud: {
        resumen: "Acceso universal efectivo integrando Minsa, EsSalud y privados. Meta central: construir 500 establecimientos de primer nivel.",
        paginas: "pp. 15–20",
        propuestas: [
          { texto: "Construir o remodelar 500 establecimientos del primer nivel de atención, priorizando territorios con mayor brecha.", concreta: true, meta: "500 establecimientos", plazo: "2026–2031", fuente: "Plan AN p.17" },
          { texto: "Expandir telemedicina al 80% de establecimientos en zonas rurales y de difícil acceso.", concreta: true, meta: "80% de cobertura rural", plazo: "2031", fuente: "Plan AN p.17" },
          { texto: "Historia clínica electrónica interoperable en el 100% de centros de salud públicos y privados.", concreta: true, meta: "100% establecimientos", plazo: "2031", fuente: "Plan AN p.20" },
          { texto: "Eliminar desnutrición crónica infantil en menores de 5 años mediante CRED y alimentación escolar.", concreta: true, meta: "0% desnutrición crónica", plazo: "2031", fuente: "Plan AN p.19" },
          { texto: "Aumentar progresivamente el presupuesto en salud con criterios de equidad territorial.", concreta: false, meta: null, plazo: null, fuente: "Plan AN p.17" },
        ],
      },
      educacion: {
        resumen: "Transformación educativa territorial. Educación sexual y cuidado del cuerpo como competencias obligatorias. 1,000 programas técnicos con pertinencia regional.",
        paginas: "pp. 21–26",
        propuestas: [
          { texto: "100% de estudiantes de 3 a 5 años acceden a educación inicial con enfoque de desarrollo integral.", concreta: true, meta: "100% cobertura inicial", plazo: "2031", fuente: "Plan AN p.23" },
          { texto: "Incorporar cuidado del cuerpo y salud integral como competencia para el 100% de estudiantes de EBR.", concreta: true, meta: "100% de EBR", plazo: "2031", fuente: "Plan AN p.23" },
          { texto: "1,000 programas de estudio técnico y universitario con pertinencia regional.", concreta: true, meta: "1,000 programas", plazo: "2031", fuente: "Plan AN p.25" },
          { texto: "1,500 alianzas con empresas para prácticas profesionales y empleabilidad juvenil.", concreta: true, meta: "1,500 empresas aliadas", plazo: "2031", fuente: "Plan AN p.25" },
          { texto: "Ampliar becas y apoyos para jóvenes en pobreza en educación superior.", concreta: false, meta: null, plazo: null, fuente: "Plan AN p.25" },
        ],
      },
      seguridad: {
        resumen: "Reforma integral PNP con meritocracia y tecnología. Meta: reducir extorsiones de 21,000 a 13,000 anuales. Reforma penitenciaria profunda.",
        paginas: "pp. 51–58",
        propuestas: [
          { texto: "Reducir denuncias por extorsión de 21,000 a 13,000 anuales mediante inteligencia policial.", concreta: true, meta: "13,000 denuncias/año", plazo: "2031", fuente: "Plan AN p.57" },
          { texto: "5 Complejos Desconcentrados Especializados en Investigación Criminal (CODEIC) en regiones.", concreta: true, meta: "5 complejos", plazo: "2031", fuente: "Plan AN p.54" },
          { texto: "Polígrafo obligatorio en admisión a la PNP y asignación de cargos sensibles.", concreta: true, meta: "Proceso implementado", plazo: "2027", fuente: "Plan AN p.53" },
          { texto: "Reubicar 5 penales de las principales ciudades del país.", concreta: true, meta: "5 penales reubicados", plazo: "2031", fuente: "Plan AN p.58" },
          { texto: "Ley que inhabilita a funcionarios con condena por corrupción de ocupar cargos estatales.", concreta: true, meta: "Ley aprobada", plazo: "2027", fuente: "Plan AN p.56" },
        ],
      },
      economia: {
        resumen: "Lucha contra la informalidad (71% de la PEA). Primer empleo juvenil. 2 millones certificados en competencias. Elevación del gasto social del 0.8% al 1.5–2.5% del PIB.",
        paginas: "pp. 73–88",
        propuestas: [
          { texto: "Reducir NINIS (ni estudian ni trabajan) del 15% al 10% con programa de primer empleo.", concreta: true, meta: "10% de NINIS", plazo: "2031", fuente: "Plan AN p.37" },
          { texto: "2,000,000 de personas certificadas en competencias laborales blandas y transversales.", concreta: true, meta: "2 millones certificados", plazo: "2031", fuente: "Plan AN p.37" },
          { texto: "300,000 jóvenes pobres y vulnerables en el Fondo Nacional de Capacitación Juvenil.", concreta: true, meta: "300,000 jóvenes", plazo: "2031", fuente: "Plan AN p.37" },
          { texto: "Elevar el gasto en protección social no contributiva del 0.8% al 1.5–2.5% del PIB.", concreta: true, meta: "1.5–2.5% del PIB", plazo: "2031", fuente: "Plan AN p.44" },
          { texto: "50% de la población en pobreza con acceso a programas de inclusión productiva.", concreta: true, meta: "50% de pobres", plazo: "2031", fuente: "Plan AN p.43" },
        ],
      },
      medioambiente: {
        resumen: "90% de hogares con servicios básicos (agua, desagüe, electricidad, internet) al 2031. Liderazgo en OTCA para proteger la Amazonía.",
        paginas: "pp. 116–122",
        propuestas: [
          { texto: "90% de hogares con agua, desagüe, electricidad e internet antes de 2031.", concreta: true, meta: "90% de hogares", plazo: "2031", fuente: "Plan AN p.44" },
          { texto: "Programa de transferencias automáticas ante desastres para el 25% de afectados.", concreta: true, meta: "25% afectados cubiertos", plazo: "2027", fuente: "Plan AN p.42" },
          { texto: "Impulsar el liderazgo del Perú en la OTCA para proteger la Amazonía y pueblos originarios.", concreta: false, meta: null, plazo: null, fuente: "Plan AN p.65" },
        ],
      },
      ddhh: {
        resumen: "Cumplimiento pleno de decisiones de la Corte IDH. Ente autónomo de litigio contra discriminación. Enfoque de género e interculturalidad transversal.",
        paginas: "pp. 59–62",
        propuestas: [
          { texto: "100% de sentencias de la Corte IDH cumplidas por el Estado peruano.", concreta: true, meta: "100% de sentencias", plazo: "2031", fuente: "Plan AN p.62" },
          { texto: "Crear ente autónomo de litigio estratégico contra discriminación y violencia con enfoque de DDHH y género.", concreta: true, meta: "Ente creado y operativo", plazo: "2027", fuente: "Plan AN p.62" },
          { texto: "Erradicar la desigualdad y discriminación estructurales mediante políticas descentralizadas.", concreta: false, meta: null, plazo: null, fuente: "Plan AN p.62" },
          { texto: "Fortalecer mecanismos de cooperación regional en derechos humanos y equidad de género.", concreta: false, meta: null, plazo: null, fuente: "Plan AN p.65" },
        ],
      },
      corrupcion: {
        resumen: "Reforma meritocrática del poder judicial. JNJ independiente. Imprescriptibilidad de corrupción en fuero policial. 100% jueces titulares.",
        paginas: "pp. 59–62",
        propuestas: [
          { texto: "100% de jueces y fiscales sean titulares — eliminar provisionalidad.", concreta: true, meta: "100% titulares", plazo: "2031", fuente: "Plan AN p.61" },
          { texto: "Proceso meritocrático para el Tribunal Constitucional con participación de la JNJ.", concreta: true, meta: "Sistema meritocrático implementado", plazo: "2027", fuente: "Plan AN p.61" },
          { texto: "Imprescriptibilidad de procesos de corrupción en el fuero administrativo policial.", concreta: true, meta: "Ley aprobada", plazo: "2027", fuente: "Plan AN p.54" },
          { texto: "Ley que prohíbe a condenados por corrupción trabajar en el Estado.", concreta: true, meta: "Ley aprobada", plazo: "2027", fuente: "Plan AN p.56" },
        ],
      },
      temasSociales: {
        lgbtq: { escala: 0, resumen: "El plan de gobierno no menciona matrimonio igualitario, unión civil ni derechos LGBTQ+ en ninguna de sus 146 páginas. Silencio programático verificado.", silencio: true, fuente: "Plan AN 2026 (146 pp.) — ausencia verificada" },
        aborto: { escala: 0, resumen: "El plan no menciona el aborto en ninguna de sus formas. No aborda derechos reproductivos más allá de salud materno-infantil general.", silencio: true, fuente: "Plan AN 2026 (146 pp.) — ausencia verificada" },
        genero: { escala: 1, resumen: "Menciona 'enfoque de género' en DDHH y propone ente autónomo contra discriminación. No incluye ley de igualdad salarial específica.", silencio: false, fuente: "Plan AN p. 43, 62" },
        penaMuerte: { escala: 0, resumen: "No menciona la pena de muerte. Enfoque penal en reforma penitenciaria y reinserción.", silencio: true, fuente: "Plan AN 2026 (146 pp.) — ausencia verificada" },
        drogas: { escala: 0, resumen: "No menciona legalización ni despenalización de drogas. El narcotráfico aparece como parte del crimen organizado a combatir.", silencio: true, fuente: "Plan AN 2026 (146 pp.) — ausencia verificada" },
      },
    },
  },
  {
    id: "fuerza",
    nombre: "Keiko Fujimori",
    partido: "Fuerza Popular",
    color: "#f97316",
    iniciales: "KF",
    ideologia: "Derecha conservadora",
    plancha: { vp1: "Luis Galarreta", vp2: "Miguel Torres" },
    plan: {
      salud: {
        resumen: "Fortalecimiento del sistema de salud con énfasis en seguridad ciudadana sanitaria. SIS universal. Infraestructura hospitalaria en regiones.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Universalizar el SIS para cubrir al 100% de peruanos sin seguro de salud.", concreta: true, meta: "100% cobertura SIS", plazo: "2028", fuente: "Plan FP" },
          { texto: "Construir hospitales regionales en zonas sin cobertura especializada.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
          { texto: "Medicamentos genéricos gratuitos en establecimientos públicos.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      educacion: {
        resumen: "Educación de calidad con énfasis en valores y familia. Oposición al enfoque de género en el currículo. Meritocracia docente.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Evaluación meritocrática anual del 100% de docentes del sistema público.", concreta: true, meta: "100% docentes evaluados", plazo: "2027", fuente: "Plan FP" },
          { texto: "Infraestructura educativa: 1,000 colegios renovados priorizando zonas rurales.", concreta: true, meta: "1,000 colegios", plazo: "2031", fuente: "Plan FP" },
          { texto: "Fortalecer valores de familia y civismo en el currículo nacional.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      seguridad: {
        resumen: "Mano dura contra la criminalidad. Fuerzas Armadas en penales y fronteras. Penas máximas para crimen organizado. Cadena perpetua real.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Intervención de las FFAA en el control de centros penitenciarios.", concreta: true, meta: "FFAA desplegadas", plazo: "2026", fuente: "Debate TV Perú Feb 2026" },
          { texto: "FFAA en pasos fronterizos para combatir migración ilegal y narcotráfico.", concreta: true, meta: "Fronteras controladas", plazo: "2026", fuente: "Debate TV Perú Feb 2026" },
          { texto: "Trabajo obligatorio para presos condenados por delitos violentos.", concreta: true, meta: "100% presos violentos", plazo: "2027", fuente: "Plan FP" },
          { texto: "Cadena perpetua real sin beneficios para femicidas y violadores de menores.", concreta: true, meta: "Reforma penal aprobada", plazo: "2027", fuente: "Plan FP" },
        ],
      },
      economia: {
        resumen: "Libre mercado con estabilidad macroeconómica. Atracción de inversión privada. Formalización empresarial. Reducción de burocracia.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Reducir trámites burocráticos en 50% mediante ventanilla única digital.", concreta: true, meta: "50% menos trámites", plazo: "2028", fuente: "Plan FP" },
          { texto: "Mantener el BCR independiente y la regla fiscal.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
          { texto: "Impulsar la formalización empresarial con beneficios tributarios escalonados.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      medioambiente: {
        resumen: "Desarrollo sostenible compatible con la inversión minera. Formalización de minería artesanal. Sin mención a cambio climático como prioridad.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Formalizar la minería artesanal con ventanilla única en 24 meses.", concreta: true, meta: "Proceso unificado", plazo: "2028", fuente: "Plan FP" },
          { texto: "Proteger cabeceras de cuenca mediante zonas de exclusión minera.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      ddhh: {
        resumen: "Defensa de la 'familia natural'. Protección a víctimas del terrorismo. Sin referencias a obligaciones ante la Corte IDH.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Reparaciones a víctimas del terrorismo senderista de los 80s-90s.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
          { texto: "Protección constitucional de la familia como institución natural.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      corrupcion: {
        resumen: "Lucha contra la corrupción con énfasis en el Ejecutivo y los gobiernos regionales. Contradictorio: la candidata tiene procesos judiciales activos.",
        paginas: "Plan FP 2026",
        propuestas: [
          { texto: "Inhabilitación permanente de funcionarios corruptos.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
          { texto: "Transparencia en contratos del Estado con publicación en tiempo real.", concreta: false, meta: null, plazo: null, fuente: "Plan FP" },
        ],
      },
      temasSociales: {
        lgbtq: { escala: -2, resumen: "Se opone explícitamente al matrimonio igualitario y la adopción por parejas del mismo sexo. Acepta solo unión civil limitada a derechos patrimoniales.", silencio: false, fuente: "Entrevista RPP 2021, ratificado 2026" },
        aborto: { escala: -2, resumen: "Rechaza el aborto en casos de violación, incluso para menores. Declaró que le diría a sus hijas que 'tengan al bebé'. Solo acepta aborto terapéutico con riesgo de vida.", silencio: false, fuente: "Programa 'Enfrentados', América TV – Febrero 2026" },
        genero: { escala: -1, resumen: "Se opone al enfoque de género en el currículo escolar. Su bancada ha votado contra políticas de ESI en el Congreso.", silencio: false, fuente: "Debate electoral JNE 2026; historial legislativo FP" },
        penaMuerte: { escala: 1, resumen: "Ha expresado apertura a debatir la pena de muerte para violadores y terroristas. No lo incluye como propuesta formal en el plan.", silencio: false, fuente: "Entrevista Canal N, 2025" },
        drogas: { escala: -2, resumen: "Tolerancia cero al narcotráfico. Propone mano dura con FFAA en zonas cocaleras. Totalmente opuesta a cualquier legalización.", silencio: false, fuente: "Plan FP 2026; Debate TV Perú" },
      },
    },
  },
  {
    id: "frente",
    nombre: "Verónica Mendoza",
    partido: "Frente Amplio",
    color: "#16a34a",
    iniciales: "VM",
    ideologia: "Izquierda progresista",
    plancha: { vp1: "Por confirmar", vp2: "Por confirmar" },
    plan: {
      salud: {
        resumen: "Sistema de salud único e integrado. Salud sexual y reproductiva garantizada. Aborto como política de salud pública. Acceso universal real.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Sistema de salud único que integre EsSalud, Minsa y Sanidad a un fondo común.", concreta: true, meta: "Sistema integrado", plazo: "2028", fuente: "Plan FA" },
          { texto: "Garantizar salud sexual y reproductiva integral en todos los establecimientos.", concreta: true, meta: "100% establecimientos", plazo: "2028", fuente: "Plan FA" },
          { texto: "Duplicar el presupuesto en salud como porcentaje del PBI.", concreta: true, meta: "2x presupuesto salud", plazo: "2031", fuente: "Plan FA" },
        ],
      },
      educacion: {
        resumen: "Educación pública gratuita y de calidad como derecho universal. ESI obligatoria. Currículo intercultural. Eliminar barreras de acceso en educación superior.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Educación sexual integral (ESI) obligatoria en todos los niveles educativos.", concreta: true, meta: "100% de escuelas", plazo: "2027", fuente: "Plan FA" },
          { texto: "Educación superior pública gratuita — eliminar barreras económicas de acceso.", concreta: true, meta: "Acceso universal", plazo: "2031", fuente: "Plan FA" },
          { texto: "Currículo intercultural bilingüe en el 100% de escuelas con población indígena.", concreta: true, meta: "100% escuelas EIB", plazo: "2029", fuente: "Plan FA" },
        ],
      },
      seguridad: {
        resumen: "Seguridad con enfoque en derechos humanos. Desmilitarización. Prevención social del delito. Reforma policial sin represión.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Reforma policial integral con controles internos independientes.", concreta: false, meta: null, plazo: null, fuente: "Plan FA" },
          { texto: "Prevención del delito con inversión social en zonas de alta criminalidad.", concreta: false, meta: null, plazo: null, fuente: "Plan FA" },
          { texto: "Desmilitarización de la seguridad interna — FFAA solo para defensa exterior.", concreta: true, meta: "Ley de separación de funciones", plazo: "2027", fuente: "Plan FA" },
        ],
      },
      economia: {
        resumen: "Reforma tributaria redistributiva. Renta básica universal en estudio. Desarrollo productivo con Estado activo. Reducción de desigualdad.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Reforma tributaria que retire beneficios a grandes empresas y aumente impuesto a la riqueza.", concreta: true, meta: "Ley tributaria reformada", plazo: "2027", fuente: "Plan FA" },
          { texto: "Segunda reforma agraria para mejorar condiciones de pequeños agricultores.", concreta: false, meta: null, plazo: null, fuente: "Plan FA" },
          { texto: "Pensión de jubilación agraria universal para campesinos.", concreta: true, meta: "100% campesinos mayores", plazo: "2029", fuente: "Plan FA" },
        ],
      },
      medioambiente: {
        resumen: "Moratoria a nuevas concesiones mineras en zonas sensibles. Protección de la Amazonía. Transición energética justa. Derechos de la naturaleza.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Moratoria a nuevas concesiones mineras en cabeceras de cuenca y territorios indígenas.", concreta: true, meta: "Moratoria vigente", plazo: "2026", fuente: "Plan FA" },
          { texto: "Reconocimiento constitucional de los derechos de la naturaleza.", concreta: true, meta: "Reforma constitucional", plazo: "2028", fuente: "Plan FA" },
          { texto: "Transición a energías renovables — 50% de la matriz energética al 2031.", concreta: true, meta: "50% renovables", plazo: "2031", fuente: "Plan FA" },
        ],
      },
      ddhh: {
        resumen: "Derechos humanos como eje central. Justicia para víctimas de protestas 2022–2023. Ley integral LGBTQ+. Aborto legal como derecho.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Ley de matrimonio igualitario en los primeros 100 días de gobierno.", concreta: true, meta: "Ley aprobada en 100 días", plazo: "2026", fuente: "Plan FA" },
          { texto: "Ley integral trans que reconozca identidad de género y derechos plenos.", concreta: true, meta: "Ley aprobada", plazo: "2027", fuente: "Plan FA" },
          { texto: "Justicia y reparación para las familias de los 49 muertos en protestas 2022–2023.", concreta: true, meta: "Comisión de la verdad", plazo: "2027", fuente: "Plan FA" },
        ],
      },
      corrupcion: {
        resumen: "Reformar el sistema judicial de raíz. Transparencia radical en el Estado. Lucha contra captura del Estado por élites económicas.",
        paginas: "Plan FA 2026",
        propuestas: [
          { texto: "Publicación en tiempo real de todos los contratos del Estado en plataforma abierta.", concreta: true, meta: "100% contratos públicos", plazo: "2027", fuente: "Plan FA" },
          { texto: "Reforma constitucional del poder judicial con participación ciudadana.", concreta: false, meta: null, plazo: null, fuente: "Plan FA" },
        ],
      },
      temasSociales: {
        lgbtq: { escala: 2, resumen: "Defensora histórica. Propone ley de matrimonio igualitario, ley integral trans, adopción igualitaria y ley de crímenes de odio en los primeros 100 días.", silencio: false, fuente: "Plan FA 2026; La República 2021" },
        aborto: { escala: 2, resumen: "Propone aborto legal, seguro y gratuito como política de salud pública. Es la candidata con postura más progresista en este tema.", silencio: false, fuente: "Plan FA 2026" },
        genero: { escala: 2, resumen: "Feminismo como eje transversal de gobierno. Paridad en todos los poderes. Ley de igualdad salarial. ESI obligatoria. Ministerio de la Mujer fortalecido.", silencio: false, fuente: "Plan FA 2026; discurso de lanzamiento" },
        penaMuerte: { escala: -2, resumen: "Rechazo categórico. Considera la pena de muerte un retroceso civilizatorio. Propone reformar el sistema de justicia para que sea rápido y efectivo.", silencio: false, fuente: "Entrevista Canal N, 2025" },
        drogas: { escala: 1, resumen: "Propone despenalizar el consumo personal y tratar las adicciones como problema de salud. Cannabis medicinal legal con regulación.", silencio: false, fuente: "Plan FA 2026" },
      },
    },
  },
]

export const SECCIONES = [
  { id: "salud", label: "Salud", icon: "🏥" },
  { id: "educacion", label: "Educación", icon: "📚" },
  { id: "seguridad", label: "Seguridad", icon: "🛡️" },
  { id: "economia", label: "Economía", icon: "📈" },
  { id: "medioambiente", label: "Medio Ambiente", icon: "🌿" },
  { id: "ddhh", label: "DD.HH.", icon: "⚖️" },
  { id: "corrupcion", label: "Corrupción", icon: "🔍" },
] as const

export type SeccionId = typeof SECCIONES[number]['id']
