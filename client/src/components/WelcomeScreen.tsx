import { Button } from "@/components/ui/button";
import {
  LEVELS,
  type Level,
  type NoteNameSystem,
  getUniqueNoteNames,
} from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { Dices, Music2 } from "lucide-react";

interface WelcomeScreenProps {
  selectedLevel: number;
  noteNameSystem: NoteNameSystem;
  onSelectLevel: (levelId: number) => void;
  onSelectNoteSystem: (system: NoteNameSystem) => void;
  onStart: () => void;
}

export default function WelcomeScreen({
  selectedLevel,
  noteNameSystem,
  onSelectLevel,
  onSelectNoteSystem,
  onStart,
}: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-lg">
            <Dices className="h-10 w-10" />
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold text-indigo-700 sm:text-5xl">
          Musical Dice
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Can you name these notes? Roll the dice and test your sight-reading!
        </p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Note Names
          </p>
          <div className="flex justify-center gap-3">
            {(["solfege", "letter"] as const).map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => onSelectNoteSystem(system)}
                className={cn(
                  "rounded-full border-2 px-5 py-2 text-sm font-bold transition-all",
                  noteNameSystem === system
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300",
                )}
              >
                {system === "solfege" ? "Do Re Mi" : "C D E"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Choose a Level
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {LEVELS.map((level: Level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => onSelectLevel(level.id)}
                className={cn(
                  "min-w-[120px] shrink-0 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                  selectedLevel === level.id
                    ? "border-indigo-600 bg-indigo-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-indigo-300",
                )}
              >
                <span className="block font-bold text-indigo-700">
                  {level.title}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {level.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onStart}
          className="mt-10 h-14 w-full max-w-xs bg-indigo-600 text-lg font-bold hover:bg-indigo-700 sm:w-auto sm:px-12"
        >
          <Music2 className="mr-2 h-5 w-5" />
          Start Playing
        </Button>
      </div>
    </div>
  );
}
