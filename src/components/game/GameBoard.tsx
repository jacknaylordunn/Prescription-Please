import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { Prescription } from "./Prescription";
import { Radio } from "./Radio";
import { QuizPanel } from "./QuizPanel";
import { scenarios } from "@/data/scenarios";
import backgroundOff from "@/assets/background-lamp-off.png";
import backgroundOn from "@/assets/background-lamp-on.png";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

type GameState = "idle" | "dispatch" | "assessing" | "quiz" | "complete";

export const GameBoard = () => {
  const [lampOn, setLampOn] = useState(false);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [enlargedPrescription, setEnlargedPrescription] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleStartGame = () => {
    if (gameState === "idle") {
      setGameState("dispatch");
    } else if (gameState === "dispatch") {
      setGameState("assessing");
      setShowQuiz(true);
      setGameState("quiz");
    }
  };

  const handleNewCase = () => {
    setCurrentScenarioIndex((currentScenarioIndex + 1) % scenarios.length);
    setGameState("dispatch");
    setShowQuiz(false);
    setEnlargedPrescription(false);
  };

  const handleQuizComplete = () => {
    setGameState("complete");
    setShowQuiz(false);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${lampOn ? backgroundOn : backgroundOff})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lamp Toggle Button */}
      <button
        onClick={() => setLampOn(!lampOn)}
        className="absolute top-6 right-24 z-50 p-3 rounded-full bg-background/20 hover:bg-background/40 transition-all"
        title="Toggle lamp"
      >
        <Lightbulb className={`w-8 h-8 ${lampOn ? 'text-yellow-300' : 'text-muted-foreground'}`} />
      </button>

      {/* Draggable Radio */}
      <DraggableItem initialX={50} initialY={50} zIndexBase={20}>
        <Radio
          dispatchInfo={currentScenario.dispatchInfo}
          onStartAssessment={handleStartGame}
          onNewCase={handleNewCase}
          gameState={gameState}
        />
      </DraggableItem>

      {/* Draggable Prescription */}
      {(gameState === "dispatch" || gameState === "assessing" || gameState === "quiz" || gameState === "complete") && (
        <DraggableItem 
          initialX={500} 
          initialY={150} 
          zIndexBase={15}
          onDoubleClick={() => setEnlargedPrescription(!enlargedPrescription)}
        >
          <Prescription scenario={currentScenario} isEnlarged={enlargedPrescription} />
        </DraggableItem>
      )}

      {/* Draggable Quiz Panel */}
      {showQuiz && (
        <DraggableItem initialX={window.innerWidth / 2 - 250} initialY={100} zIndexBase={25}>
          <QuizPanel scenario={currentScenario} onComplete={handleQuizComplete} />
        </DraggableItem>
      )}

      {/* Instructions */}
      {gameState === "idle" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/80 px-6 py-4 rounded border-2 border-border pixel-text">
          <p className="text-sm text-center">
            <span className="font-bold">Welcome to Prescription, Please!</span><br/>
            Click START GAME on the radio to begin • Double-click papers to enlarge • Drag items around the desk
          </p>
        </div>
      )}
    </div>
  );
};
