/*
  Alle inhoud van de challenges staat hier: spelnaam, de case en de vragen.
  Wil je een tekst, vraag of antwoord aanpassen? Dan hoef je alleen dit bestand te openen.
  Later kan deze data uit de backend komen. Houd daarom de vorm van de types hieronder aan.
*/

// Naam bovenaan het startscherm en in de balk. In Figma staat het ene scherm op WOLFMIND en het andere op CONDOR,
// dat moet het team nog kiezen. Pas het hier aan en het verandert overal.
export const SPEL = {
  naam: 'WOLFMIND',
  ondertitel: 'ESCAPE ROOM',
  platform: 'OSINT INVESTIGATION PLATFORM',
  classificatie: 'CLASSIFICATION: FICTIONAL TRAINING EXERCISE',
  disclaimer: 'FICTIONAL SCENARIO, ALL PERSONS, COMPANIES AND PROFILES ARE FICTIONAL.',
}

// De hoogste score die je in een sessie kunt halen
export const MAX_SCORE = 100

// Eén vraag met een invulveld
export type Vraag = {
  id: string
  vraag: string
  hint: string
  // Alle goede antwoorden. Hoofdletters, spaties en leestekens tellen niet mee bij het nakijken.
  antwoorden: string[]
  // Punten als je hem goed hebt
  punten: number
}

// Eén hoofdstuk van een case, met de vragen die erbij horen
export type Hoofdstuk = {
  nummer: number
  vragen: Vraag[]
}

export type Case = {
  code: string
  titel: string
  opdracht: string
  hoofdstukken: Hoofdstuk[]
}

export const huidigeCase: Case = {
  code: 'CR-01',
  titel: 'THE CHOPPED-UP INFLUENCER',
  opdracht: 'An influencer got hacked and used to promote a fraudulent webshop. Map out the whole chain.',
  hoofdstukken: [
    {
      nummer: 1,
      vragen: [
        {
          id: 'influencer',
          vraag: 'Who is the influencer (full name)?',
          hint: 'Look at the bio, not just the username.',
          antwoorden: ['Sofia Vale'],
          punten: 10,
        },
        {
          // LET OP: nog niet vastgesteld, zie het lijstje open vragen. Dit is een tijdelijk antwoord.
          id: 'webshop',
          vraag: 'Which webshop is the influencer promoting?',
          hint: 'Read the caption of the latest posts.',
          antwoorden: ['Mona Jewelry', 'Mona'],
          punten: 10,
        },
        {
          // LET OP: ook tijdelijk. Het politierapport noemt elektronica, de webshop verkoopt sieraden.
          id: 'product',
          vraag: 'What is being promoted?',
          hint: 'The link in bio and in the posts.',
          antwoorden: ['sieraden', 'jewelry', 'jewellery'],
          punten: 10,
        },
      ],
    },
  ],
}

// Alle vragen van de case achter elkaar, handig om de voortgang uit te rekenen
export const alleVragen = huidigeCase.hoofdstukken.flatMap((h) => h.vragen)
