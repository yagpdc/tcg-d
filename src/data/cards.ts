import type { Card } from '../types'
import { colaboradores } from './colaboradores'
import { produtos } from './produtos'

export const cardCatalog: Card[] = [...colaboradores, ...produtos]
