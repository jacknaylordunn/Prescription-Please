import { useState, useEffect } from "react";
import { DraggableItem } from "./DraggableItem";
import { Prescription } from "./Prescription";
import { Radio } from "./Radio";
import { QuizPanel } from "./QuizPanel";
import { DNACPR } from "./documents/DNACPR";
import { GPLetter } from "./documents/GPLetter";
import { CarePlan } from "./documents/CarePlan";
import { DischargeLetter } from "./documents/DischargeLetter";
import { scenarios } from "@/data/scenarios";
import { generateRandomScenario } from "@/data/scenarioGenerator";
import type { Scenario } from "@/data/scenarios";
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
  const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);
  const [documentConfig, setDocumentConfig] = useState({
    showDNACPR: false,
    showGPLetter: false,
    showCarePlan: false,
    showDischarge: false
  });

  // Generate mixed scenarios on mount
  useEffect(() => {
    const mixed: Scenario[] = [];
    // Add some predefined scenarios
    mixed.push(...scenarios.slice(0, 10));
    // Add random scenarios
    for (let i = 0; i < 20; i++) {
      mixed.push(generateRandomScenario());
    }
    // Shuffle
    setAllScenarios(mixed.sort(() => Math.random() - 0.5));
  }, []);

  const currentScenario = allScenarios[currentScenarioIndex] || scenarios[0];
  
  // Regenerate document config when scenario changes
  useEffect(() => {
    setDocumentConfig({
      showDNACPR: currentScenario.patient.age > 70 && Math.random() > 0.5,
      showGPLetter: Math.random() > 0.6,
      showCarePlan: currentScenario.patient.age > 65 && Math.random() > 0.5,
      showDischarge: Math.random() > 0.6
    });
  }, [currentScenarioIndex, currentScenario.patient.age]);

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
    setCurrentScenarioIndex((currentScenarioIndex + 1) % allScenarios.length);
    setGameState("dispatch");
    setShowQuiz(false);
    setEnlargedPrescription(false);
    setEnlargedDoc(null);
    setLastClickedItem("radio"); // Bring radio to front
  };

  const handleQuizComplete = () => {
    setGameState("complete");
    setShowQuiz(false);
    setLastClickedItem("radio"); // Bring radio to front on completion
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
      <DraggableItem 
        initialX={50} 
        initialY={50} 
        zIndexBase={gameState === "complete" ? 80 : lastClickedItem === "radio" ? 80 : 20}
        onMouseDown={() => setLastClickedItem("radio")}
      >
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
          initialX={350} 
          initialY={180} 
          zIndexBase={lastClickedItem === "prescription" ? 75 : 15}
          isEnlarged={enlargedPrescription}
          onDoubleClick={() => setEnlargedPrescription(!enlargedPrescription)}
          onMouseDown={() => setLastClickedItem("prescription")}
        >
          <Prescription scenario={currentScenario} isEnlarged={enlargedPrescription} />
        </DraggableItem>
      )}
      
      {/* Additional Documents */}
      {(gameState === "dispatch" || gameState === "assessing" || gameState === "quiz" || gameState === "complete") && (
        <>
          {documentConfig.showDNACPR && (
            <DraggableItem 
              initialX={750} 
              initialY={250} 
              zIndexBase={lastClickedItem === "dnacpr" ? 75 : 14}
              isEnlarged={enlargedDoc === 0}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 0 ? null : 0)}
              onMouseDown={() => setLastClickedItem("dnacpr")}
            >
              <DNACPR 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                nhsNumber={currentScenario.patient.nhsNumber}
                isEnlarged={enlargedDoc === 0}
              />
            </DraggableItem>
          )}
          
          {documentConfig.showGPLetter && (
            <DraggableItem 
              initialX={600} 
              initialY={420} 
              zIndexBase={lastClickedItem === "gpletter" ? 75 : 13}
              isEnlarged={enlargedDoc === 1}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 1 ? null : 1)}
              onMouseDown={() => setLastClickedItem("gpletter")}
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
          
          {documentConfig.showCarePlan && (
            <DraggableItem 
              initialX={200} 
              initialY={380} 
              zIndexBase={lastClickedItem === "careplan" ? 75 : 12}
              isEnlarged={enlargedDoc === 2}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 2 ? null : 2)}
              onMouseDown={() => setLastClickedItem("careplan")}
            >
              <CarePlan 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                condition={currentScenario.patient.medicalHistory.join(", ")}
                isEnlarged={enlargedDoc === 2}
              />
            </DraggableItem>
          )}
          
          {documentConfig.showDischarge && (
            <DraggableItem 
              initialX={950} 
              initialY={450} 
              zIndexBase={lastClickedItem === "discharge" ? 75 : 11}
              isEnlarged={enlargedDoc === 3}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 3 ? null : 3)}
              onMouseDown={() => setLastClickedItem("discharge")}
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
        <DraggableItem 
          initialX={window.innerWidth / 2 - 250} 
          initialY={100} 
          zIndexBase={90}
          onMouseDown={() => setLastClickedItem("quiz")}
        >
          <QuizPanel scenario={currentScenario} onComplete={handleQuizComplete} />
        </DraggableItem>
      )}

      {/* Instructions */}
      {gameState === "idle" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card px-6 py-4 border-4 border-primary pixel-text retro-shadow animate-fade-in">
          <p className="text-center" style={{ fontSize: "9px", lineHeight: "1.8", color: "#000" }}>
            <span className="font-bold text-primary" style={{ fontSize: "12px" }}>PRESCRIPTION, PLEASE!</span><br/>
            <br/>
            Click START on radio • Double-click to enlarge<br/>
            Drag papers • Toggle lamp for light
          </p>
        </div>
      )}
    </div>
  );
};
