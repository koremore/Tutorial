import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";
import MusicalDie from "@/components/MusicalDie";
import {
  type Level,
  type Note,
  type NoteNameSystem,
  getNoteName,
  getUniqueNoteNames,
  notesMatch,
  rollNote,
} from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { ArrowLeft, Dices } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface GameBoardProps {
  level: Level;
  noteNameSystem: NoteNameSystem;
  onGameOver: (score: number) => void;
  onQuit: () => void;
}

type DieResult = boolean | null;

export default function GameBoard({
  level,
  noteNameSystem,
  onGameOver,
  onQuit,
}: GameBoardProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [note1, setNote1] = useState<Note>(() => rollNote(level.notes));
  const [note2, setNote2] = useState<Note>(() => rollNote(level.notes));
  const [answer1, setAnswer1] = useState<string | null>(null);
  const [answer2, setAnswer2] = useState<string | null>(null);
  const [activeDie, setActiveDie] = useState<1 | 2>(1);
  const [die1Result, setDie1Result] = useState<DieResult>(null);
  const [die2Result, setDie2Result] = useState<DieResult>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const noteNames = getUniqueNoteNames(level.notes, noteNameSystem);

  const rollDice = useCallback(() => {
    setIsRolling(true);
    setAnswer1(null);
    setAnswer2(null);
    setActiveDie(1);
    setDie1Result(null);
    setDie2Result(null);
    setFeedback(null);
    setShowConfetti(false);

    setTimeout(() => {
      setNote1(rollNote(level.notes));
      setNote2(rollNote(level.notes));
      setIsRolling(false);
    }, 600);
  }, [level.notes]);

  useEffect(() => {
    rollDice();
  }, [rollDice]);

  const handleNoteSelect = (name: string) => {
    if (die1Result === true && die2Result === true) return;

    if (activeDie === 1 && die1Result !== true) {
      setAnswer1(name);
      setActiveDie(2);
      setFeedback(null);
      return;
    }

    if (activeDie === 2 && die2Result !== true) {
      setAnswer2(name);
    }
  };

  const handleCheck = () => {
    if (!answer1 || !answer2) return;

    const correct1 = die1Result === true || notesMatch(answer1, note1, noteNameSystem);
    const correct2 = die2Result === true || notesMatch(answer2, note2, noteNameSystem);

    setDie1Result(correct1);
    setDie2Result(correct2);

    if (correct1 && correct2) {
      const newPoints =
        (die1Result === true ? 0 : 1) + (die2Result === true ? 0 : 1);
      const updatedScore = score + newPoints;
      setScore(updatedScore);
      setFeedback("Both correct! You're on a roll! 🎵");
      setShowConfetti(true);

      setTimeout(() => {
        if (round >= level.rounds) {
          onGameOver(updatedScore);
          return;
        }
        setRound((r) => r + 1);
        rollDice();
      }, 1800);
      return;
    }

    let newScore = score;
    if (correct1 && die1Result !== true) {
      newScore += 1;
      setScore(newScore);
    }

    if (!correct1 && !correct2) {
      setAnswer1(null);
      setAnswer2(null);
      setActiveDie(1);
      setDie1Result(null);
      setDie2Result(null);
      setFeedback(
        `Both are wrong. Die 1 is '${getNoteName(note1, noteNameSystem)}', Die 2 is '${getNoteName(note2, noteNameSystem)}' — try again!`,
      );
      return;
    }

    if (!correct1) {
      setAnswer1(null);
      setActiveDie(1);
      setDie1Result(null);
      setFeedback(
        `Die 1 is wrong. The note is '${getNoteName(note1, noteNameSystem)}' — try again!`,
      );
      return;
    }

    setAnswer2(null);
    setActiveDie(2);
    setDie2Result(null);
    setFeedback(
      `Die 2 is wrong. The note is '${getNoteName(note2, noteNameSystem)}' — try again!`,
    );
  };

  const canCheck = Boolean(answer1 && answer2) && !(die1Result === true && die2Result === true);

  return (
    <div className="min-h-screen px-4 py-6">
      <Confetti active={showConfetti} />

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onQuit}
            className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="text-center">
            <p className="text-sm font-bold text-indigo-600">{level.title}</p>
            <p className="text-xs text-slate-500">
              Round {round} / {level.rounds}
            </p>
          </div>
          <div className="rounded-xl bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
            {score} pts
          </div>
        </div>

        <div className="mb-4 flex justify-center gap-1.5">
          {Array.from({ length: level.rounds }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i < round ? "bg-indigo-500" : "bg-slate-200",
              )}
            />
          ))}
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:gap-8">
          <MusicalDie
            label="Die 1"
            note={note1}
            answer={answer1}
            isRolling={isRolling}
            isCorrect={die1Result}
            isLocked={die1Result === true}
          />
          <MusicalDie
            label="Die 2"
            note={note2}
            answer={answer2}
            isRolling={isRolling}
            isCorrect={die2Result}
            isLocked={die2Result === true}
          />
        </div>

        {feedback && (
          <p
            className={cn(
              "mb-4 text-center text-sm font-semibold",
              showConfetti ? "text-emerald-600" : "text-rose-600",
            )}
          >
            {feedback}
          </p>
        )}

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {noteNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => handleNoteSelect(name)}
              disabled={die1Result === true && die2Result === true}
              className={cn(
                "min-w-[52px] rounded-full border-2 px-4 py-2 text-sm font-bold transition-all active:scale-95",
                (answer1 === name && die1Result !== true) ||
                  (answer2 === name && die2Result !== true)
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300",
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={rollDice}
            disabled={isRolling}
            className="font-bold"
          >
            <Dices className="mr-2 h-4 w-4" />
            Re-roll
          </Button>
          <Button
            onClick={handleCheck}
            disabled={!canCheck || isRolling}
            className="bg-indigo-600 font-bold hover:bg-indigo-700"
          >
            Check
          </Button>
        </div>
      </div>
    </div>
  );
}
