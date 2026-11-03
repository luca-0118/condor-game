/*
  Fictieve webshop voor chapter 1 van de game. Alle inhoud staat hier, dus namen,
  prijzen en teksten pas je in dit bestand aan.

  Scam-kenmerken die er bewust in zitten (de speler moet ze kunnen ontdekken):
  1. Prijzen zijn pas zichtbaar na registreren, de shop wil eerst je gegevens.
  2. Elk product heeft dezelfde score: 4,9 uit 275 reviews.
  3. Reviews lijken op elkaar en zijn dicht bij elkaar geplaatst.
  4. Korting van rond de 70% met een aftelklok die bij herladen opnieuw begint.
  5. Altijd "nog maar 3 op voorraad".
  6. "5 winkels in Zuid-Holland" maar nergens een adres, KvK- of btw-nummer.
  7. Contact loopt via een gmail-adres.
  8. "14 dagen bedenktijd" terwijl retour alleen op eigen kosten buiten de EU kan.
  9. iDEAL en creditcard staan uit, alleen overboeking en crypto werken.
  10. Betalen gaat naar een buitenlandse rekening van een onbekend bedrijf.
  11. Een dollarteken in de bovenbalk naast euro's in de rest van de shop.

  Let op: de foto's komen uit het Figma-ontwerp en zijn tijdelijk. Er wordt niets
  opgeslagen of verstuurd, en de IBAN is expres ongeldig.
*/

export type Categorie = 'kettingen' | 'ringen' | 'armbanden' | 'oorbellen'

export type Product = {
  id: string
  naam: string
  categorie: Categorie
  foto: string
  prijs: number
  oudePrijs: number
}

export const MERK = 'COSMOS'
export const SCORE = '4,9 (275)'
export const VOORRAAD = 3
export const AFTELKLOK_SECONDEN = 14 * 60 + 32
export const CONTACT_MAIL = 'klantenservice.monajuweliers@gmail.com'
export const REKENING = {
  iban: 'LT00 0000 0000 0000 0000',
  naam: 'MJ Global Trading Ltd',
}

export const bovenbalk = [
  'Gratis verzending boven 50$',
  'Niet goed? GELD TERUG',
  'Klantenservice',
  '5 winkels in Zuid-Holland',
]

type CategorieLink = {
  pad: string
  naam: string
  foto: string
  banner: string
  filter?: Categorie
}

export const categorieen: CategorieLink[] = [
  { pad: 'alle-sieraden', naam: 'Alle sieraden', foto: 'cat-alle', banner: 'banner-alle' },
  { pad: 'kettingen', naam: 'Kettingen', foto: 'cat-ketting', banner: 'banner-ketting', filter: 'kettingen' },
  { pad: 'ringen', naam: 'Ringen', foto: 'cat-ring', banner: 'banner-alle', filter: 'ringen' },
  { pad: 'armbanden', naam: 'Armbanden', foto: 'cat-armband', banner: 'banner-armband', filter: 'armbanden' },
]

export const producten: Product[] = [
  { id: 'lumi-ring', naam: 'Lumi ring gestapeld', categorie: 'ringen', foto: 'ring-goud', prijs: 39.95, oudePrijs: 129.95 },
  { id: 'nora-creolen', naam: 'Nora creolen goudkleurig', categorie: 'oorbellen', foto: 'oorbel-hoops', prijs: 24.95, oudePrijs: 89.95 },
  { id: 'golf-oorbellen', naam: 'Golf oorbellen', categorie: 'oorbellen', foto: 'oorbel-golf', prijs: 27.95, oudePrijs: 94.95 },
  { id: 'ava-hangers', naam: 'Ava oorhangers met zirkonia', categorie: 'oorbellen', foto: 'oorbel-pave', prijs: 34.95, oudePrijs: 119.95 },
  { id: 'pearl-ketting', naam: 'Pearl ketting met hanger', categorie: 'kettingen', foto: 'ketting-schaal', prijs: 32.95, oudePrijs: 109.95 },
  { id: 'steen-ringen', naam: 'Steen ringen set van drie', categorie: 'ringen', foto: 'ring-steen', prijs: 44.95, oudePrijs: 149.95 },
  { id: 'wikkel-armband', naam: 'Wikkel armband leer', categorie: 'armbanden', foto: 'armband-stapel', prijs: 29.95, oudePrijs: 99.95 },
  { id: 'bloem-oorbellen', naam: 'Bloem oorbellen', categorie: 'oorbellen', foto: 'oorbel-bloem', prijs: 22.95, oudePrijs: 79.95 },
  { id: 'ovaal-oorbellen', naam: 'Ovaal oorbellen', categorie: 'oorbellen', foto: 'oorbel-ovaal', prijs: 26.95, oudePrijs: 89.95 },
  { id: 'pave-oorbellen', naam: 'Pavé schakel oorbellen', categorie: 'oorbellen', foto: 'oorbel-pave2', prijs: 36.95, oudePrijs: 124.95 },
  { id: 'schakel-set', naam: 'Schakelarmband set', categorie: 'armbanden', foto: 'armband-set', prijs: 49.95, oudePrijs: 169.95 },
  { id: 'schakel-doos', naam: 'Grove schakelarmband', categorie: 'armbanden', foto: 'armband-doos', prijs: 37.95, oudePrijs: 124.95 },
  { id: 'duo-armband', naam: 'Duo armband fijn', categorie: 'armbanden', foto: 'armband-pols', prijs: 24.95, oudePrijs: 84.95 },
  { id: 'klaver-armband', naam: 'Klaver armband', categorie: 'armbanden', foto: 'armband-wit', prijs: 19.95, oudePrijs: 69.95 },
  { id: 'solitair-ring', naam: 'Solitair ring', categorie: 'ringen', foto: 'ring-diamant', prijs: 59.95, oudePrijs: 199.95 },
  { id: 'infinity-ring', naam: 'Infinity ring', categorie: 'ringen', foto: 'cat-ring', prijs: 29.95, oudePrijs: 99.95 },
  { id: 'lina-ketting', naam: 'Lina ketting met muntje', categorie: 'kettingen', foto: 'ketting-1', prijs: 28.95, oudePrijs: 94.95 },
  { id: 'layer-ketting', naam: 'Layer ketting drielaags', categorie: 'kettingen', foto: 'ketting-2', prijs: 42.95, oudePrijs: 139.95 },
  { id: 'platte-ketting', naam: 'Platte schakelketting', categorie: 'kettingen', foto: 'ketting-3', prijs: 34.95, oudePrijs: 114.95 },
  { id: 'madelief-ketting', naam: 'Madelief ketting', categorie: 'kettingen', foto: 'ketting-4', prijs: 31.95, oudePrijs: 104.95 },
  { id: 'hart-ketting', naam: 'Twee harten ketting', categorie: 'kettingen', foto: 'ketting-5', prijs: 36.95, oudePrijs: 119.95 },
  { id: 'gourmet-ketting', naam: 'Gourmet ketting', categorie: 'kettingen', foto: 'ketting-6', prijs: 39.95, oudePrijs: 129.95 },
  { id: 'cuban-ketting', naam: 'Cuban ketting', categorie: 'kettingen', foto: 'ketting-7', prijs: 46.95, oudePrijs: 159.95 },
  { id: 'hartje-ketting', naam: 'Open hartje ketting', categorie: 'kettingen', foto: 'ketting-8', prijs: 26.95, oudePrijs: 89.95 },
  { id: 'lagen-armband', naam: 'Lagen armband', categorie: 'armbanden', foto: 'armband-groen', prijs: 33.95, oudePrijs: 109.95 },
  { id: 'duo-set', naam: 'Duo set met klaver', categorie: 'armbanden', foto: 'armband-armen', prijs: 44.95, oudePrijs: 149.95 },
  { id: 'trio-armband', naam: 'Trio armband goud', categorie: 'armbanden', foto: 'armband-goud', prijs: 38.95, oudePrijs: 129.95 },
  { id: 'fijne-armband', naam: 'Fijne armband met bedel', categorie: 'armbanden', foto: 'armband-fijn', prijs: 23.95, oudePrijs: 79.95 },
  { id: 'mix-armband', naam: 'Mix armbanden set', categorie: 'armbanden', foto: 'armband-mix', prijs: 41.95, oudePrijs: 139.95 },
]

export const topproducten = ['lumi-ring', 'nora-creolen', 'golf-oorbellen', 'ava-hangers', 'pearl-ketting']

export const reviews = [
  { naam: 'Sanne V.', datum: '2 dagen geleden', tekst: 'Prachtig product en snelle levering, echt een aanrader!' },
  { naam: 'Linda B.', datum: '2 dagen geleden', tekst: 'Prachtig sieraad en snelle levering, zeker een aanrader!' },
  { naam: 'Kim de J.', datum: '3 dagen geleden', tekst: 'Mooi product, snelle levering. Echt een aanrader voor iedereen!' },
]

export const voordelen = [
  'Gratis verzending vanaf €50',
  '14 dagen bedenktijd',
  'Veilig betalen',
  'Persoonlijk advies',
  'Vakkundige service',
  '5 winkels in Zuid-Holland',
]
