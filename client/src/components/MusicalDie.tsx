import { type Note } from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import MusicStaff from "./MusicStaff";

interface MusicalDieProps {
  note: Note;
  answer: string | null;
  isRolling: boolean;
  isCorrect: boolean | null;
  isLocked: boolean;
  label: string;
}

export default function MusicalDie({
  note,
  answer,
  isRolling,
  isCorrect,
  isLocked,
  label,
}: MusicalDieProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-bold uppercase tracking-wide text-indigo-600">
        {label}
      </span>
      <div
        className={cn(
          "relative flex aspect-square w-full max-w-[160px] items-center justify-center rounded-2xl border-4 bg-white p-3 shadow-lg transition-all duration-300 sm:max-w-[180px]",
          isRolling && "animate-dice-roll",
          isCorrect === true && "border-emerald-500 bg-emerald-50",
          isCorrect === false && "border-rose-500 bg-rose-50",
          isLocked && isCorrect === true && "opacity-90",
        )}
      >
        <MusicStaff note={note} />
        {isCorrect === true && (
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
            <Check className="h-5 w-5" />
          </span>
        )}
        {isCorrect === false && (
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow">
            <X className="h-5 w-5" />
          </span>
        )}
      </div>
      <div
        className={cn(
          "flex h-12 min-w-[72px] items-center justify-center rounded-xl border-2 px-4 text-lg font-bold transition-colors",
          answer
            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
            : "border-dashed border-slate-300 bg-slate-50 text-slate-400",
          isCorrect === true && "border-emerald-500 bg-emerald-100 text-emerald-800",
          isCorrect === false && "border-rose-400 bg-rose-50 text-rose-700",
        )}
      >
        {answer ?? "?"}
      </div>
    </div>
  );
}
