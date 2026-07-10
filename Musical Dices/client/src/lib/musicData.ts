export type Clef = "treble" | "bass";
export type NoteNameSystem = "solfege" | "letter";

export interface LedgerLine {
  position: number;
  above: boolean;
}

export interface Note {
  id: string;
  name_solfege: string;
  name_letter: string;
  staffPosition: number;
  ledgerLines: LedgerLine[];
  clef: Clef;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  rounds: number;
  notes: Note[];
}

const trebleNotes: Record<string, Omit<Note, "clef">> = {
  B3: {
    id: "B3",
    name_solfege: "Si",
    name_letter: "B",
    staffPosition: -3,
    ledgerLines: [],
  },
  C4: {
    id: "C4",
    name_solfege: "Do",
    name_letter: "C",
    staffPosition: -2,
    ledgerLines: [{ position: -2, above: false }],
  },
  D4: {
    id: "D4",
    name_solfege: "Re",
    name_letter: "D",
    staffPosition: -1,
    ledgerLines: [],
  },
  E4: {
    id: "E4",
    name_solfege: "Mi",
    name_letter: "E",
    staffPosition: 0,
    ledgerLines: [],
  },
  F4: {
    id: "F4",
    name_solfege: "Fa",
    name_letter: "F",
    staffPosition: 1,
    ledgerLines: [],
  },
  G4: {
    id: "G4",
    name_solfege: "Sol",
    name_letter: "G",
    staffPosition: 2,
    ledgerLines: [],
  },
  A4: {
    id: "A4",
    name_solfege: "La",
    name_letter: "A",
    staffPosition: 3,
    ledgerLines: [],
  },
  B4: {
    id: "B4",
    name_solfege: "Si",
    name_letter: "B",
    staffPosition: 4,
    ledgerLines: [],
  },
  C5: {
    id: "C5",
    name_solfege: "Do",
    name_letter: "C",
    staffPosition: 5,
    ledgerLines: [],
  },
  D5: {
    id: "D5",
    name_solfege: "Re",
    name_letter: "D",
    staffPosition: 6,
    ledgerLines: [],
  },
  E5: {
    id: "E5",
    name_solfege: "Mi",
    name_letter: "E",
    staffPosition: 7,
    ledgerLines: [],
  },
  F5: {
    id: "F5",
    name_solfege: "Fa",
    name_letter: "F",
    staffPosition: 8,
    ledgerLines: [],
  },
  G5: {
    id: "G5",
    name_solfege: "Sol",
    name_letter: "G",
    staffPosition: 9,
    ledgerLines: [],
  },
  A5: {
    id: "A5",
    name_solfege: "La",
    name_letter: "A",
    staffPosition: 10,
    ledgerLines: [{ position: 10, above: true }],
  },
};

const bassNotes: Record<string, Omit<Note, "clef">> = {
  C3: {
    id: "C3",
    name_solfege: "Do",
    name_letter: "C",
    staffPosition: 3,
    ledgerLines: [],
  },
  D3: {
    id: "D3",
    name_solfege: "Re",
    name_letter: "D",
    staffPosition: 4,
    ledgerLines: [],
  },
  E3: {
    id: "E3",
    name_solfege: "Mi",
    name_letter: "E",
    staffPosition: 5,
    ledgerLines: [],
  },
  F3: {
    id: "F3",
    name_solfege: "Fa",
    name_letter: "F",
    staffPosition: 6,
    ledgerLines: [],
  },
  G3: {
    id: "G3",
    name_solfege: "Sol",
    name_letter: "G",
    staffPosition: 7,
    ledgerLines: [],
  },
  A3: {
    id: "A3",
    name_solfege: "La",
    name_letter: "A",
    staffPosition: 8,
    ledgerLines: [],
  },
  B3bass: {
    id: "B3bass",
    name_solfege: "Si",
    name_letter: "B",
    staffPosition: 9,
    ledgerLines: [],
  },
  C4bass: {
    id: "C4bass",
    name_solfege: "Do",
    name_letter: "C",
    staffPosition: 10,
    ledgerLines: [{ position: 10, above: true }],
  },
};

function treble(id: keyof typeof trebleNotes): Note {
  return { ...trebleNotes[id], clef: "treble" };
}

function bass(id: keyof typeof bassNotes): Note {
  return { ...bassNotes[id], clef: "bass" };
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Level 1",
    description: "Treble clef — Do to Sol",
    rounds: 8,
    notes: [treble("C4"), treble("D4"), treble("E4"), treble("F4"), treble("G4")],
  },
  {
    id: 2,
    title: "Level 2",
    description: "Treble clef — Do to Si",
    rounds: 8,
    notes: [
      treble("C4"),
      treble("D4"),
      treble("E4"),
      treble("F4"),
      treble("G4"),
      treble("A4"),
      treble("B4"),
    ],
  },
  {
    id: 3,
    title: "Level 3",
    description: "Treble clef — extended range",
    rounds: 10,
    notes: [
      treble("B3"),
      treble("C4"),
      treble("D4"),
      treble("E4"),
      treble("F4"),
      treble("G4"),
      treble("A4"),
      treble("B4"),
      treble("C5"),
      treble("D5"),
      treble("E5"),
      treble("F5"),
      treble("G5"),
      treble("A5"),
    ],
  },
  {
    id: 4,
    title: "Level 4",
    description: "Bass clef",
    rounds: 10,
    notes: [
      bass("C3"),
      bass("D3"),
      bass("E3"),
      bass("F3"),
      bass("G3"),
      bass("A3"),
      bass("B3bass"),
      bass("C4bass"),
    ],
  },
  {
    id: 5,
    title: "Level 5",
    description: "Mixed clefs",
    rounds: 10,
    notes: [
      treble("C4"),
      treble("D4"),
      treble("E4"),
      treble("F4"),
      treble("G4"),
      treble("A4"),
      treble("B4"),
      bass("C3"),
      bass("D3"),
      bass("E3"),
      bass("F3"),
      bass("G3"),
      bass("A3"),
      bass("B3bass"),
      bass("C4bass"),
    ],
  },
];

export function getNoteName(note: Note, system: NoteNameSystem): string {
  return system === "solfege" ? note.name_solfege : note.name_letter;
}

export function getUniqueNoteNames(notes: Note[], system: NoteNameSystem): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const note of notes) {
    const name = getNoteName(note, system);
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
}

export function rollNote(notes: Note[]): Note {
  return notes[Math.floor(Math.random() * notes.length)];
}

export function notesMatch(answer: string, note: Note, system: NoteNameSystem): boolean {
  return answer === getNoteName(note, system);
}
