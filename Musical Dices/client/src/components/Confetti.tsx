import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#F43F5E", "#8B5CF6"];

export default function Confetti({ active }: ConfettiProps) {
  const [pieces, setPieces] = useState<
    { id: number; left: number; delay: number; color: string }[]
  >([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        color: COLORS[i % COLORS.length],
      })),
    );
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-0 h-3 w-2 rounded-sm"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
