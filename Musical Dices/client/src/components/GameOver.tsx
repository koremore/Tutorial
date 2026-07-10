import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";

interface GameOverProps {
  score: number;
  totalRounds: number;
  levelTitle: string;
  onReplay: () => void;
  onHome: () => void;
}

export default function GameOver({
  score,
  totalRounds,
  levelTitle,
  onReplay,
  onHome,
}: GameOverProps) {
  const maxScore = totalRounds * 2;
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border-4 border-indigo-200 bg-white p-8 text-center shadow-xl">
        <Trophy className="mx-auto mb-4 h-16 w-16 text-amber-500" />
        <h2 className="font-display text-3xl font-bold text-indigo-700">
          Game Over!
        </h2>
        <p className="mt-2 text-slate-600">{levelTitle}</p>

        <div className="my-8">
          <p className="text-5xl font-extrabold text-indigo-600">{score}</p>
          <p className="mt-1 text-slate-500">
            points out of {maxScore} ({percentage}%)
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={onReplay}
            className="bg-amber-500 font-bold text-white hover:bg-amber-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
          <Button variant="outline" onClick={onHome} className="font-bold">
            Choose Level
          </Button>
        </div>
      </div>
    </div>
  );
}
