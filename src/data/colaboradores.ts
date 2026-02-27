import type { Card } from '../types'

import yagoSantana from '../assets/pessoas/yago-santana.webp'
import isabelaTeixeira from '../assets/pessoas/isabela-teixeira.webp'
import diogoGouveia from '../assets/pessoas/diogo-gouveia.webp'
import henriPaixao from '../assets/pessoas/henri-paixao.webp'
import stefanyRodrigues from '../assets/pessoas/stefany-rodrigues.webp'
import brendaViana from '../assets/pessoas/brenda-viana.webp'
import mateusCamargo from '../assets/pessoas/mateus-camargo.webp'
import patrickFrancisco from '../assets/pessoas/patrick-francisco.webp'

export const colaboradores: Card[] = [
  // === LENDÁRIO ===
  {
    id: 'col-patrick',
    name: 'Patrick Francisco',
    description: 'CEO · Driva',
    type: 'colaborador',
    rarity: 'lendario',
    image: patrickFrancisco,
  },
  // === ÉPICO ===
  {
    id: 'col-mateus',
    name: 'Mateus Camargo',
    description: 'CPO · Produtos',
    type: 'colaborador',
    rarity: 'epico',
    image: mateusCamargo,
  },
  // === RARO ===
  {
    id: 'col-diogo',
    name: 'Diogo Gouveia',
    description: 'Coordenador · Inovação (Produtos)',
    type: 'colaborador',
    rarity: 'raro',
    image: diogoGouveia,
  },
  // === INCOMUM ===
  {
    id: 'col-stefany',
    name: 'Stefany Rodrigues',
    description: 'Product Manager · Produtos',
    type: 'colaborador',
    rarity: 'incomum',
    image: stefanyRodrigues,
  },
  {
    id: 'col-henri',
    name: 'Henri Paixão',
    description: 'Product Manager · Produtos',
    type: 'colaborador',
    rarity: 'incomum',
    image: henriPaixao,
  },
  {
    id: 'col-brenda',
    name: 'Brenda Viana',
    description: 'Product Designer · Produtos',
    type: 'colaborador',
    rarity: 'incomum',
    image: brendaViana,
  },
  // === COMUM ===
  {
    id: 'col-isabela',
    name: 'Isabela Teixeira',
    description: 'Analista de Comunicação · Produtos',
    type: 'colaborador',
    rarity: 'comum',
    image: isabelaTeixeira,
  },
  {
    id: 'col-yago',
    name: 'Yago Santana',
    description: 'Analista de Engenharia · Inovação (Produtos)',
    type: 'colaborador',
    rarity: 'comum',
    image: yagoSantana,
  },
]
