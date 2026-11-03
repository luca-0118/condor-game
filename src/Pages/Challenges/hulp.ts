/* Kleine hulpfuncties voor de challenges. */

// Vite laadt alle plaatjes uit de map assets in één keer, dan hoef je ze niet los te importeren.
const bestanden = import.meta.glob<string>('./assets/*.{png,webp,svg}', { eager: true, import: 'default', query: '?url' })

// icoon('play') geeft de url van assets/icon-play.svg
export const icoon = (naam: string) => bestanden[`./assets/icon-${naam}.svg`]
// plaatje('logo.png') geeft de url van assets/logo.png
export const plaatje = (bestand: string) => bestanden[`./assets/${bestand}`]

// Maakt een antwoord vergelijkbaar: 'Sofia Vale!' en ' sofiavale' worden allebei 'sofiavale'
export const normaliseer = (tekst: string) => tekst.toLowerCase().replace(/[^a-z0-9]/g, '')

// Klopt het ingevulde antwoord met een van de goede antwoorden?
export const isGoed = (ingevuld: string, antwoorden: string[]) =>
  antwoorden.some((a) => normaliseer(a) === normaliseer(ingevuld))

// 339 seconden wordt '00:05:39'
export const tijd = (seconden: number) => {
  const twee = (n: number) => String(n).padStart(2, '0')
  return `${twee(Math.floor(seconden / 3600))}:${twee(Math.floor(seconden / 60) % 60)}:${twee(seconden % 60)}`
}
