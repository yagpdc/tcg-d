import type { Card } from '../types'
import { colaboradores } from './colaboradores'
import { produtos } from './produtos'
import { ferramentas } from './ferramentas'

export const cardCatalog: Card[] = [...colaboradores, ...produtos, ...ferramentas]
