import GameBoard from "@/components/GameBoard";
import GameOver from "@/components/GameOver";
import WelcomeScreen from "@/components/WelcomeScreen";
import { LEVELS, type NoteNameSystem } from "@/lib/musicData";
import { useState } from "react";

type Screen = "welcome" | "game" | "over";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [noteNameSystem, setNoteNameSystem] = useState<NoteNameSystem>("solfege");
  const [finalScore, setFinalScore] = useState(0);

  const level = LEVELS.find((l) => l.id === selectedLevel) ?? LEVELS[0];

  if (screen === "game") {
    return (
      <GameBoard
        level={level}
        noteNameSystem={noteNameSystem}
        onGameOver={(score) => {
          setFinalScore(score);
          setScreen("over");
        }}
        onQuit={() => setScreen("welcome")}
      />
    );
  }

  if (screen === "over") {
    return (
      <GameOver
        score={finalScore}
        totalRounds={level.rounds}
        levelTitle={level.title}
        onReplay={() => setScreen("game")}
        onHome={() => setScreen("welcome")}
      />
    );
  }

  return (
    <WelcomeScreen
      selectedLevel={selectedLevel}
      noteNameSystem={noteNameSystem}
      onSelectLevel={setSelectedLevel}
      onSelectNoteSystem={setNoteNameSystem}
      onStart={() => setScreen("game")}
    />
  );
}
