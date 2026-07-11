import { type Note } from "@/lib/musicData";

const STAFF_LEFT = 28;
const STAFF_RIGHT = 92;
const STAFF_BOTTOM_Y = 82;
const LINE_SPACING = 10;
const STEP = LINE_SPACING / 2;

interface MusicStaffProps {
  note: Note;
  size?: "sm" | "md" | "lg";
}

function noteY(staffPosition: number): number {
  return STAFF_BOTTOM_Y - staffPosition * STEP;
}

export default function MusicStaff({ note, size = "md" }: MusicStaffProps) {
  const scale = size === "sm" ? 0.85 : size === "lg" ? 1.15 : 1;
  const y = noteY(note.staffPosition);
  const stemUp = note.staffPosition <= 2;
  const stemX = stemUp ? 58 : 52;
  const stemY1 = stemUp ? y - 2 : y + 2;
  const stemY2 = stemUp ? y - 22 : y + 22;
  const clefSymbol = note.clef === "treble" ? "𝄞" : "𝄢";
  const clefX = note.clef === "treble" ? 8 : 10;
  const clefY = note.clef === "treble" ? 68 : 66;

  const staffLines = [0, 1, 2, 3, 4].map((i) => {
    const lineY = STAFF_BOTTOM_Y - i * LINE_SPACING;
    return (
      <line
        key={i}
        x1={STAFF_LEFT}
        y1={lineY}
        x2={STAFF_RIGHT}
        y2={lineY}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    );
  });

  const ledgerLines = note.ledgerLines.map((ledger, index) => {
    const ledgerY = noteY(ledger.position);
    return (
      <line
        key={`ledger-${index}`}
        x1={48}
        y1={ledgerY}
        x2={62}
        y2={ledgerY}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full text-slate-800"
      aria-hidden="true"
      style={{ transform: `scale(${scale})` }}
    >
      {staffLines}
      {ledgerLines}
      <text
        x={clefX}
        y={clefY}
        fontSize={note.clef === "treble" ? "42" : "36"}
        fill="currentColor"
        fontFamily="serif"
      >
        {clefSymbol}
      </text>
      <ellipse cx={55} cy={y} rx={5} ry={3.5} fill="currentColor" />
      <line
        x1={stemX}
        y1={stemY1}
        x2={stemX}
        y2={stemY2}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
