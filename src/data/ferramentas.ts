import type { Card } from '../types'

// === PRISMATICO ===
// import cuboMagico from '../assets/ferramentas/cubo-magico.webp'
// import ia from '../assets/ferramentas/ia.webp'

// === RARO ===
// import vscode from '../assets/ferramentas/vscode.webp'
// import claude from '../assets/ferramentas/claude.webp'

// === INCOMUM ===
// import powerBi from '../assets/ferramentas/power-bi.webp'

// === COMUM ===
// import clickup from '../assets/ferramentas/clickup.webp'
// import googleChat from '../assets/ferramentas/google-chat.webp'

export const ferramentas: Card[] = [
  // === PRISMATICO ===
  {
    id: 'fer-cubo-magico',
    name: 'Cubo Mágico',
    description: 'Ferramenta · Inovação',
    type: 'produto',
    rarity: 'prismatico',
    // image: cuboMagico,
  },
  {
    id: 'fer-ia',
    name: 'IA',
    description: 'Ferramenta · Tech',
    type: 'produto',
    rarity: 'prismatico',
    // image: ia,
  },

  // === RARO ===
  {
    id: 'fer-vscode',
    name: 'VS Code',
    description: 'Ferramenta · Tech',
    type: 'produto',
    rarity: 'raro',
    // image: vscode,
  },
  {
    id: 'fer-claude',
    name: 'Claude',
    description: 'Ferramenta · Tech',
    type: 'produto',
    rarity: 'raro',
    // image: claude,
  },

  // === INCOMUM ===
  {
    id: 'fer-power-bi',
    name: 'Power BI',
    description: 'Ferramenta · Dados',
    type: 'produto',
    rarity: 'incomum',
    // image: powerBi,
  },

  // === COMUM ===
  {
    id: 'fer-clickup',
    name: 'ClickUp',
    description: 'Ferramenta · Gestão',
    type: 'produto',
    rarity: 'comum',
    // image: clickup,
  },
  {
    id: 'fer-google-chat',
    name: 'Google Chat',
    description: 'Ferramenta · Comunicação',
    type: 'produto',
    rarity: 'comum',
    // image: googleChat,
  },
]
