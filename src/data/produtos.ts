import type { Card } from '../types'

export const produtos: Card[] = [
  {
    id: 'prod-cafe',
    name: 'Café da Copa',
    description: 'Combustível oficial da Driva. Sem ele, nada funciona.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-postit',
    name: 'Post-it Colorido',
    description: 'Guardião das tasks. Cada cor um significado que ninguém lembra.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-planilha',
    name: 'Planilha Mágica',
    description: 'Ninguém sabe quem criou, mas todos dependem dela.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-slackbot',
    name: 'Slack Bot',
    description: 'Manda reminder de daily todo dia. Todo. Dia.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-dashboard',
    name: 'Dashboard Analytics',
    description: 'Gráficos que fazem qualquer investidor sorrir.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-api',
    name: 'API Gateway',
    description: 'O porteiro digital. Nada entra ou sai sem passar por ele.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-ia',
    name: 'Motor de IA',
    description: 'O cérebro por trás das predições. Machine learning em estado puro.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-core',
    name: 'Plataforma Core',
    description: 'O coração da Driva. Tudo passa por aqui.',
    type: 'produto',
    rarity: 'comum',
  },
  {
    id: 'prod-algoritmo',
    name: 'Algoritmo Proprietário',
    description: 'O segredo da Driva. Quem tem, não conta. Quem não tem, quer.',
    type: 'produto',
    rarity: 'comum',
  },

  // === RARO ===
  {
    id: 'prod-x-coxinha',
    name: 'X-Coxinha',
    description: 'Lanche · Driva',
    type: 'produto',
    rarity: 'raro',
    // image: xCoxinha,
  },

  // === INCOMUM ===
  {
    id: 'prod-escadinha',
    name: 'Restaurante Escadinha',
    description: 'Restaurante · Driva',
    type: 'produto',
    rarity: 'incomum',
    // image: escadinha,
  },
  {
    id: 'prod-utfpr',
    name: 'UTFPR',
    description: 'Universidade · Educação',
    type: 'produto',
    rarity: 'incomum',
    // image: utfpr,
  },
]
