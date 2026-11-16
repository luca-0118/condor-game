/*
  Fictieve webshop voor chapter 1 van de game. Alle inhoud staat hier, dus namen,
  prijzen en teksten pas je in dit bestand aan.

  Scam-kenmerken die er bewust in zitten (de speler moet ze kunnen ontdekken):
  1. Prijzen zijn pas zichtbaar na registreren, de shop wil eerst je gegevens.
  2. Elk product heeft dezelfde score: 4,9 uit 275 reviews.
  3. Reviews lijken op elkaar en zijn dicht bij elkaar geplaatst.
  4. Korting van rond de 70% met een aftelklok die bij herladen opnieuw begint.
  5. Altijd "only 3 left in stock".
  6. "5 stores in South Holland" maar nergens een adres, KvK- of btw-nummer.
  7. Contact loopt via een gmail-adres.
  8. "14-day cooling-off period" terwijl retour alleen op eigen kosten buiten de EU kan.
  9. iDEAL en creditcard staan uit, alleen overboeking en crypto werken.
  10. Betalen gaat naar een buitenlandse rekening van een onbekend bedrijf.
  11. Een dollarteken in de bovenbalk naast euro's in de rest van de shop.

  Let op: de foto's komen uit het Figma-ontwerp en zijn tijdelijk. Er wordt niets
  opgeslagen of verstuurd, en de IBAN is expres ongeldig.
*/

// De waarden zijn Engels omdat de zoekbalk ook op de categorie zoekt (zoek je 'necklace', dan vind je kettingen)
export type Categorie = 'necklaces' | 'rings' | 'bracelets' | 'earrings'

export type Product = {
  id: string
  naam: string
  categorie: Categorie
  foto: string
  prijs: number
  oudePrijs: number
}

export const MERK = 'COSMOS'
export const SCORE = '4.9 (275)'
export const VOORRAAD = 3
export const AFTELKLOK_SECONDEN = 14 * 60 + 32
export const CONTACT_MAIL = 'klantenservice.monajewelry@gmail.com'
export const REKENING = {
  iban: 'LT00 0000 0000 0000 0000',
  naam: 'MJ Global Trading Ltd',
}

export const bovenbalk = [
  'Free shipping over 50$',
  'Not happy? MONEY BACK',
  'Customer service',
  '5 stores in South Holland',
]

type CategorieLink = {
  pad: string
  naam: string
  foto: string
  banner: string
  filter?: Categorie
}

export const categorieen: CategorieLink[] = [
  { pad: 'all-jewelry', naam: 'All jewelry', foto: 'cat-alle', banner: 'banner-alle' },
  { pad: 'necklaces', naam: 'Necklaces', foto: 'cat-ketting', banner: 'banner-ketting', filter: 'necklaces' },
  { pad: 'rings', naam: 'Rings', foto: 'cat-ring', banner: 'banner-alle', filter: 'rings' },
  { pad: 'bracelets', naam: 'Bracelets', foto: 'cat-armband', banner: 'banner-armband', filter: 'bracelets' },
]

export const producten: Product[] = [
  { id: 'lumi-ring', naam: 'Lumi stacking ring', categorie: 'rings', foto: 'ring-goud', prijs: 39.95, oudePrijs: 129.95 },
  { id: 'nora-hoops', naam: 'Nora gold-tone hoop earrings', categorie: 'earrings', foto: 'oorbel-hoops', prijs: 24.95, oudePrijs: 89.95 },
  { id: 'wave-earrings', naam: 'Wave earrings', categorie: 'earrings', foto: 'oorbel-golf', prijs: 27.95, oudePrijs: 94.95 },
  { id: 'ava-drops', naam: 'Ava drop earrings with zirconia', categorie: 'earrings', foto: 'oorbel-pave', prijs: 34.95, oudePrijs: 119.95 },
  { id: 'pearl-necklace', naam: 'Pearl necklace with pendant', categorie: 'necklaces', foto: 'ketting-schaal', prijs: 32.95, oudePrijs: 109.95 },
  { id: 'stone-rings', naam: 'Set of three stone rings', categorie: 'rings', foto: 'ring-steen', prijs: 44.95, oudePrijs: 149.95 },
  { id: 'wrap-bracelet', naam: 'Leather wrap bracelet', categorie: 'bracelets', foto: 'armband-stapel', prijs: 29.95, oudePrijs: 99.95 },
  { id: 'flower-earrings', naam: 'Flower earrings', categorie: 'earrings', foto: 'oorbel-bloem', prijs: 22.95, oudePrijs: 79.95 },
  { id: 'oval-earrings', naam: 'Oval earrings', categorie: 'earrings', foto: 'oorbel-ovaal', prijs: 26.95, oudePrijs: 89.95 },
  { id: 'pave-earrings', naam: 'Pavé link earrings', categorie: 'earrings', foto: 'oorbel-pave2', prijs: 36.95, oudePrijs: 124.95 },
  { id: 'link-set', naam: 'Link bracelet set', categorie: 'bracelets', foto: 'armband-set', prijs: 49.95, oudePrijs: 169.95 },
  { id: 'chunky-link', naam: 'Chunky link bracelet', categorie: 'bracelets', foto: 'armband-doos', prijs: 37.95, oudePrijs: 124.95 },
  { id: 'duo-bracelet', naam: 'Fine duo bracelet', categorie: 'bracelets', foto: 'armband-pols', prijs: 24.95, oudePrijs: 84.95 },
  { id: 'clover-bracelet', naam: 'Clover bracelet', categorie: 'bracelets', foto: 'armband-wit', prijs: 19.95, oudePrijs: 69.95 },
  { id: 'solitaire-ring', naam: 'Solitaire ring', categorie: 'rings', foto: 'ring-diamant', prijs: 59.95, oudePrijs: 199.95 },
  { id: 'infinity-ring', naam: 'Infinity ring', categorie: 'rings', foto: 'cat-ring', prijs: 29.95, oudePrijs: 99.95 },
  { id: 'lina-necklace', naam: 'Lina coin necklace', categorie: 'necklaces', foto: 'ketting-1', prijs: 28.95, oudePrijs: 94.95 },
  { id: 'layer-necklace', naam: 'Three-layer necklace', categorie: 'necklaces', foto: 'ketting-2', prijs: 42.95, oudePrijs: 139.95 },
  { id: 'flat-chain', naam: 'Flat link chain', categorie: 'necklaces', foto: 'ketting-3', prijs: 34.95, oudePrijs: 114.95 },
  { id: 'daisy-necklace', naam: 'Daisy necklace', categorie: 'necklaces', foto: 'ketting-4', prijs: 31.95, oudePrijs: 104.95 },
  { id: 'two-hearts', naam: 'Double heart necklace', categorie: 'necklaces', foto: 'ketting-5', prijs: 36.95, oudePrijs: 119.95 },
  { id: 'curb-chain', naam: 'Curb chain necklace', categorie: 'necklaces', foto: 'ketting-6', prijs: 39.95, oudePrijs: 129.95 },
  { id: 'cuban-chain', naam: 'Cuban chain necklace', categorie: 'necklaces', foto: 'ketting-7', prijs: 46.95, oudePrijs: 159.95 },
  { id: 'open-heart', naam: 'Open heart necklace', categorie: 'necklaces', foto: 'ketting-8', prijs: 26.95, oudePrijs: 89.95 },
  { id: 'layered-bracelet', naam: 'Layered bracelet', categorie: 'bracelets', foto: 'armband-groen', prijs: 33.95, oudePrijs: 109.95 },
  { id: 'duo-clover-set', naam: 'Clover duo bracelet set', categorie: 'bracelets', foto: 'armband-armen', prijs: 44.95, oudePrijs: 149.95 },
  { id: 'trio-bracelet', naam: 'Gold trio bracelet', categorie: 'bracelets', foto: 'armband-goud', prijs: 38.95, oudePrijs: 129.95 },
  { id: 'charm-bracelet', naam: 'Dainty charm bracelet', categorie: 'bracelets', foto: 'armband-fijn', prijs: 23.95, oudePrijs: 79.95 },
  { id: 'mix-set', naam: 'Mixed bracelet set', categorie: 'bracelets', foto: 'armband-mix', prijs: 41.95, oudePrijs: 139.95 },
]

export const topproducten = ['lumi-ring', 'nora-hoops', 'wave-earrings', 'ava-drops', 'pearl-necklace']

export const reviews = [
  { naam: 'Sanne V.', datum: '2 days ago', tekst: 'Beautiful product and fast delivery, highly recommended!' },
  { naam: 'Linda B.', datum: '2 days ago', tekst: 'Beautiful jewelry and fast delivery, definitely recommended!' },
  { naam: 'Kim de J.', datum: '3 days ago', tekst: 'Lovely product, fast delivery. Highly recommended to everyone!' },
]

export const voordelen = [
  'Free shipping from €50',
  '14-day cooling-off period',
  'Secure payment',
  'Personal advice',
  'Expert service',
  '5 stores in South Holland',
]
