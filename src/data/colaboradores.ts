import type { Card } from '../types'

// === SUPREMO ===
import patrickFrancisco from '../assets/pessoas/patrick-francisco_ceo_driva.webp'

// === PRISMATICO (C-Level) ===
import mateusCamargo from '../assets/pessoas/mateus-camargo_cpo_produtos.webp'
import eduardaPagliosa from '../assets/pessoas/eduarda-pagliosa_coo_gestao-e-pessoas.webp'
import wagnerAgostinho from '../assets/pessoas/wagner-agostinho_cto_tech.webp'

// === RARO (Coordenador) ===
import diogoGouveia from '../assets/pessoas/diogo-gouveia_coordenador_inovacao.webp'
import gustavoMartin from '../assets/pessoas/gustavo-martin_coordenador_tech.webp'
import rodrigoMiranda from '../assets/pessoas/rodrigo-miranda_coordenador_tech.webp'
import vicenzoVeneza from '../assets/pessoas/vicenzo-veneza_coordenador_maketing.webp'

// === INCOMUM (Tech Lead / PM / Designer) ===
import stefanyRodrigues from '../assets/pessoas/stefany-rodrigues_product-manager_produtos.webp'
import henriPaixao from '../assets/pessoas/henri-paixao_product-manager_produtos.webp'
import brendaViana from '../assets/pessoas/brenda-viana_designer_produtos.webp'
import henriqueRamalho from '../assets/pessoas/henrique-ramalho_tech-lead_automacoes.webp'
import henriqueVanin from '../assets/pessoas/henrique-vanin_tech-lead_tech.webp'
import lucianoMansonari from '../assets/pessoas/luciano-mansonari_tech_lead-tech.webp'
import victorHugo from '../assets/pessoas/victor-hugo_tech-lead_tech.webp'

// === COMUM (Analista / Estagiário) ===
import isabelaTeixeira from '../assets/pessoas/isabela-teixeira_analista-de-comunicacao_produtos.webp'
import yagoSantana from '../assets/pessoas/yago-santana_engenheiro-de-produtos_inovacao.webp'
import eduardoDias from '../assets/pessoas/eduardo-dias_analista_tech.webp'
import gabrielPicinato from '../assets/pessoas/gabriel-picinato_analista_tech.webp'
import mariaLuiza from '../assets/pessoas/maria-luiza_analista_tech.webp'
import nataliaYumi from '../assets/pessoas/natália-yumi_analista_tech.webp'
import yagoFuruta from '../assets/pessoas/yago-furuta_analista_tech.webp'
import gustavoPadovam from '../assets/pessoas/gustavo-padovam_estagiario_tech.webp'
import rodrigoFalabretti from '../assets/pessoas/rodrigo-falabretti_estagiario_tech.webp'
import viniciusNemetz from '../assets/pessoas/vinicius-nemetz_estagiario_tech.webp'

export const colaboradores: Card[] = [
  // === SUPREMO ===
  {
    id: 'col-patrick',
    name: 'Patrick Francisco',
    description: 'CEO · Driva',
    type: 'colaborador',
    rarity: 'supremo',
    image: patrickFrancisco,
  },

  // === PRISMÁTICO (C-Level) ===
  {
    id: 'col-mateus',
    name: 'Mateus Camargo',
    description: 'CPO · Produtos',
    type: 'colaborador',
    rarity: 'prismatico',
    image: mateusCamargo,
  },
  {
    id: 'col-eduarda',
    name: 'Eduarda Pagliosa',
    description: 'COO · Gestão e Pessoas',
    type: 'colaborador',
    rarity: 'prismatico',
    image: eduardaPagliosa,
  },
  {
    id: 'col-wagner',
    name: 'Wagner Agostinho',
    description: 'CTO · Tech',
    type: 'colaborador',
    rarity: 'prismatico',
    image: wagnerAgostinho,
  },

  // === RARO (Coordenador) ===
  {
    id: 'col-diogo',
    name: 'Diogo Gouveia',
    description: 'Coordenador · Inovação',
    type: 'colaborador',
    rarity: 'raro',
    image: diogoGouveia,
  },
  {
    id: 'col-gustavo-martin',
    name: 'Gustavo Martin',
    description: 'Coordenador · Tech',
    type: 'colaborador',
    rarity: 'raro',
    image: gustavoMartin,
  },
  {
    id: 'col-rodrigo-miranda',
    name: 'Rodrigo Miranda',
    description: 'Coordenador · Tech',
    type: 'colaborador',
    rarity: 'raro',
    image: rodrigoMiranda,
  },
  {
    id: 'col-vicenzo',
    name: 'Vicenzo Veneza',
    description: 'Coordenador · Marketing',
    type: 'colaborador',
    rarity: 'raro',
    image: vicenzoVeneza,
  },

  // === INCOMUM (Tech Lead / PM / Designer) ===
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
    rarity: 'regular',
    image: brendaViana,
  },
  {
    id: 'col-henrique-ramalho',
    name: 'Henrique Ramalho',
    description: 'Tech Lead · Automações',
    type: 'colaborador',
    rarity: 'incomum',
    image: henriqueRamalho,
  },
  {
    id: 'col-henrique-vanin',
    name: 'Henrique Vanin',
    description: 'Tech Lead · Tech',
    type: 'colaborador',
    rarity: 'incomum',
    image: henriqueVanin,
  },
  {
    id: 'col-luciano',
    name: 'Luciano Mansonari',
    description: 'Tech Lead · Tech',
    type: 'colaborador',
    rarity: 'incomum',
    image: lucianoMansonari,
  },
  {
    id: 'col-victor-hugo',
    name: 'Victor Hugo',
    description: 'Tech Lead · Tech',
    type: 'colaborador',
    rarity: 'incomum',
    image: victorHugo,
  },

  // === REGULAR (Analista) ===
  {
    id: 'col-isabela',
    name: 'Isabela Teixeira',
    description: 'Analista de Comunicação · Produtos',
    type: 'colaborador',
    rarity: 'regular',
    image: isabelaTeixeira,
  },
  {
    id: 'col-yago-santana',
    name: 'Yago Santana',
    description: ' ... ',
    type: 'colaborador',
    rarity: 'prismatico',
    image: yagoSantana,
  },
  {
    id: 'col-eduardo',
    name: 'Eduardo Dias',
    description: 'Analista · Tech',
    type: 'colaborador',
    rarity: 'regular',
    image: eduardoDias,
  },
  {
    id: 'col-gabriel',
    name: 'Gabriel Picinato',
    description: 'Analista · Tech',
    type: 'colaborador',
    rarity: 'regular',
    image: gabrielPicinato,
  },
  {
    id: 'col-maria-luiza',
    name: 'Maria Luiza',
    description: 'Analista · Tech',
    type: 'colaborador',
    rarity: 'regular',
    image: mariaLuiza,
  },
  {
    id: 'col-natalia',
    name: 'Natália Yumi',
    description: 'Analista · Tech',
    type: 'colaborador',
    rarity: 'regular',
    image: nataliaYumi,
  },
  {
    id: 'col-yago-furuta',
    name: 'Yago Furuta',
    description: 'Analista · Tech',
    type: 'colaborador',
    rarity: 'regular',
    image: yagoFuruta,
  },

  // === COMUM (Estagiário) ===
  {
    id: 'col-gustavo-padovam',
    name: 'Gustavo Padovam',
    description: 'Estagiário · Tech',
    type: 'colaborador',
    rarity: 'comum',
    image: gustavoPadovam,
  },
  {
    id: 'col-rodrigo-falabretti',
    name: 'Rodrigo Falabretti',
    description: 'Estagiário · Tech',
    type: 'colaborador',
    rarity: 'comum',
    image: rodrigoFalabretti,
  },
  {
    id: 'col-vinicius',
    name: 'Vinicius Nemetz',
    description: 'Estagiário · Tech',
    type: 'colaborador',
    rarity: 'comum',
    image: viniciusNemetz,
  },
]
