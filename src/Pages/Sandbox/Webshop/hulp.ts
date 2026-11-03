import { producten } from './data'

/* Kleine hulpfuncties die op meerdere plekken in de shop nodig zijn. */

// Vite laadt alle plaatjes uit de map assets in één keer. Zo hoef je niet elk plaatje apart te importeren:
// een nieuwe foto in assets zetten en de naam in data.ts gebruiken is genoeg.
const bestanden = import.meta.glob<string>('./assets/*.{webp,svg}', { eager: true, import: 'default', query: '?url' })

// foto('ring-goud') geeft de url van assets/ring-goud.webp
export const foto = (naam: string) => bestanden[`./assets/${naam}.webp`]
// icoon('mand') geeft de url van assets/icon-mand.svg
export const icoon = (naam: string) => bestanden[`./assets/icon-${naam}.svg`]
// euro(39.95) geeft '€ 39,95'
export const euro = (bedrag: number) => `€ ${bedrag.toFixed(2).replace('.', ',')}`
// Zoekt een product op id, geeft undefined als het niet bestaat
export const zoekProduct = (id: string) => producten.find((p) => p.id === id)
