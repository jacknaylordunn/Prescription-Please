import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { Prescription } from "./Prescription";
import { Radio } from "./Radio";
import { QuizPanel } from "./QuizPanel";
import { DNACPR } from "./documents/DNACPR";
import { GPLetter } from "./documents/GPLetter";
import { CarePlan } from "./documents/CarePlan";
import { DischargeLetter } from "./documents/DischargeLetter";
import { scenarios } from "@/data/scenarios";
import background from "@/assets/background-lamp-off.png";
import { Lightbulb } from "lucide-react";

type GameState = "idle" | "dispatch" | "assessing" | "quiz" | "complete";

export const GameBoard = () => {
  const [lampOn, setLampOn] = useState(false);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [enlargedPrescription, setEnlargedPrescription] = useState(false);
  const [enlargedDoc, setEnlargedDoc] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const currentScenario = scenarios[currentScenarioIndex];
  
  // Determine which additional documents to show (randomized per scenario)
  const showDNACPR = currentScenario.patient.age > 70 && Math.random() > 0.5;
  const showGPLetter = Math.random() > 0.6;
  const showCarePlan = currentScenario.patient.age > 65 && Math.random() > 0.5;
  const showDischarge = Math.random() > 0.6;

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
    setEnlargedDoc(null);
  };

  const handleQuizComplete = () => {
    setGameState("complete");
    setShowQuiz(false);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: lampOn ? "brightness(1.2)" : "brightness(1)",
        transition: "filter 0.6s ease",
      }}
    >
      {/* Lamp Glow Effect */}
      {lampOn && <div className="lamp-glow" />}
      
      {/* Lamp Toggle Button */}
      <button
        onClick={() => setLampOn(!lampOn)}
        className="absolute top-6 right-24 z-50 p-4 rounded-full bg-background/30 hover:bg-background/50 transition-all border-2 border-foreground/20 retro-shadow"
        title="Toggle lamp"
      >
        <Lightbulb className={`w-8 h-8 transition-all duration-300 ${lampOn ? 'text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)]' : 'text-muted-foreground'}`} />
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
          initialX={480} 
          initialY={120} 
          zIndexBase={15}
          onDoubleClick={() => setEnlargedPrescription(!enlargedPrescription)}
        >
          <Prescription scenario={currentScenario} isEnlarged={enlargedPrescription} />
        </DraggableItem>
      )}
      
      {/* Additional Documents */}
      {(gameState === "dispatch" || gameState === "assessing" || gameState === "quiz" || gameState === "complete") && (
        <>
          {showDNACPR && (
            <DraggableItem 
              initialX={950} 
              initialY={200} 
              zIndexBase={14}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 0 ? null : 0)}
            >
              <DNACPR 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                nhsNumber={currentScenario.patient.nhsNumber}
                isEnlarged={enlargedDoc === 0}
              />
            </DraggableItem>
          )}
          
          {showGPLetter && (
            <DraggableItem 
              initialX={520} 
              initialY={420} 
              zIndexBase={13}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 1 ? null : 1)}
            >
              <GPLetter 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                gender={currentScenario.patient.gender}
                address={currentScenario.patient.address}
                condition={currentScenario.patient.medicalHistory[0] || "Multiple conditions"}
                isEnlarged={enlargedDoc === 1}
              />
            </DraggableItem>
          )}
          
          {showCarePlan && (
            <DraggableItem 
              initialX={950} 
              initialY={450} 
              zIndexBase={12}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 2 ? null : 2)}
            >
              <CarePlan 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                condition={currentScenario.patient.medicalHistory.join(", ")}
                isEnlarged={enlargedDoc === 2}
              />
            </DraggableItem>
          )}
          
          {showDischarge && (
            <DraggableItem 
              initialX={100} 
              initialY={450} 
              zIndexBase={11}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 3 ? null : 3)}
            >
              <DischargeLetter 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                condition={currentScenario.patient.medicalHistory[0] || "Recent health issue"}
                isEnlarged={enlargedDoc === 3}
              />
            </DraggableItem>
          )}
        </>
      )}

      {/* Draggable Quiz Panel */}
      {showQuiz && (
        <DraggableItem initialX={window.innerWidth / 2 - 250} initialY={100} zIndexBase={25}>
          <QuizPanel scenario={currentScenario} onComplete={handleQuizComplete} />
        </DraggableItem>
      )}

      {/* Instructions */}
      {gameState === "idle" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card/95 px-8 py-5 border-4 border-primary pixel-text retro-shadow animate-fade-in">
          <p className="text-center text-paper-text" style={{ fontSize: "11px", lineHeight: "1.8" }}>
            <span className="font-bold text-primary" style={{ fontSize: "14px" }}>WELCOME TO PRESCRIPTION, PLEASE!</span><br/>
            <br/>
            Click START GAME on radio • Double-click papers to enlarge<br/>
            Drag items around desk • Click lamp to illuminate workspace
          </p>
        </div>
      )}
    </div>
  );
};
