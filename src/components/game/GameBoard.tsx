import { useState, useEffect } from "react";
import { DraggableItem } from "./DraggableItem";
import { Prescription } from "./Prescription";
import { Radio } from "./Radio";
import { QuizPanel } from "./QuizPanel";
import { DNACPR } from "./documents/DNACPR";
import { ReSPECT } from "./documents/ReSPECT";
import { GPLetter } from "./documents/GPLetter";
import { CarePlan } from "./documents/CarePlan";
import { DischargeLetter } from "./documents/DischargeLetter";
import { MedicationBox } from "./MedicationBox";
import { PillBottle } from "./PillBottle";
import { scenarios } from "@/data/scenarios";
import { generateRandomScenario } from "@/data/scenarioGenerator";
import type { Scenario } from "@/data/scenarios";
import background from "@/assets/background.png";
import lampOffImg from "@/assets/lamp-off.png";
import lampOnImg from "@/assets/lamp-on.png";
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
    showReSPECT: false,
    showGPLetter: false,
    showCarePlan: false,
    showDischarge: false,
    showOTCBox: false,
    showPillBottle: false,
    otcMedication: { name: "Paracetamol", dosage: "500mg", count: "16" },
    bottleMedication: { name: "Ibuprofen", dosage: "200mg", quantity: "30 tablets" }
  });

  // Generate mixed scenarios on mount - ensure no repeats until all scenarios seen
  useEffect(() => {
    const mixed: Scenario[] = [];
    // Add all predefined scenarios
    mixed.push(...scenarios);
    // Add many random scenarios for variety
    for (let i = 0; i < 50; i++) {
      mixed.push(generateRandomScenario());
    }
    // Fisher-Yates shuffle for proper randomization
    for (let i = mixed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
    }
    setAllScenarios(mixed);
  }, []);

  const currentScenario = allScenarios[currentScenarioIndex] || scenarios[0];
  
  // Regenerate document config when scenario changes
  useEffect(() => {
    const otcMeds = [
      { name: "Paracetamol", dosage: "500mg", count: "16" },
      { name: "Aspirin", dosage: "75mg", count: "28" },
      { name: "Ibuprofen", dosage: "200mg", count: "24" },
      { name: "Codeine", dosage: "30mg", count: "32" },
      { name: "Omeprazole", dosage: "20mg", count: "14" },
    ];
    
    const bottleMeds = [
      { name: "Amoxicillin", dosage: "250mg", quantity: "21 capsules" },
      { name: "Cetirizine", dosage: "10mg", quantity: "30 tablets" },
      { name: "Loratadine", dosage: "10mg", quantity: "30 tablets" },
      { name: "Lansoprazole", dosage: "30mg", quantity: "28 capsules" },
      { name: "Metformin", dosage: "500mg", quantity: "56 tablets" },
    ];
    
    const randomOTC = otcMeds[Math.floor(Math.random() * otcMeds.length)];
    const randomBottle = bottleMeds[Math.floor(Math.random() * bottleMeds.length)];
    
    setDocumentConfig({
      showDNACPR: currentScenario.patient.age > 70 && Math.random() > 0.5,
      showReSPECT: currentScenario.patient.age > 65 && Math.random() > 0.6,
      showGPLetter: !!(currentScenario.gpLetters && currentScenario.gpLetters.length > 0),
      showCarePlan: currentScenario.patient.age > 65 && Math.random() > 0.5,
      showDischarge: Math.random() > 0.6,
      showOTCBox: Math.random() > 0.5,
      showPillBottle: Math.random() > 0.5,
      otcMedication: randomOTC,
      bottleMedication: randomBottle
    });
  }, [currentScenarioIndex, currentScenario.patient.age, currentScenario.gpLetters]);

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
    // Move to next scenario, reshuffle when we've seen all
    const nextIndex = (currentScenarioIndex + 1) % allScenarios.length;
    
    // If we've completed the full cycle, generate new scenarios and reshuffle
    if (nextIndex === 0 && allScenarios.length > 0) {
      const newMixed: Scenario[] = [];
      newMixed.push(...scenarios);
      for (let i = 0; i < 50; i++) {
        newMixed.push(generateRandomScenario());
      }
      // Fisher-Yates shuffle
      for (let i = newMixed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newMixed[i], newMixed[j]] = [newMixed[j], newMixed[i]];
      }
      setAllScenarios(newMixed);
    }
    
    setCurrentScenarioIndex(nextIndex);
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
      }}
    >
      {/* Lamp off - always visible at the front */}
      <img 
        src={lampOffImg} 
        alt="Lamp off" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 100 }}
      />
      
      {/* Lamp on overlay - toggles visibility */}
      <img 
        src={lampOnImg} 
        alt="Lamp on" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-600"
        style={{ 
          zIndex: 100, 
          opacity: lampOn ? 1 : 0 
        }}
      />
      
      {/* Lamp Toggle Button */}
      <button
        onClick={() => setLampOn(!lampOn)}
        className="absolute top-6 right-24 p-4 rounded-full bg-background/30 hover:bg-background/50 transition-all border-2 border-foreground/20 retro-shadow"
        style={{ zIndex: 101 }}
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
          
          {documentConfig.showGPLetter && currentScenario.gpLetters && currentScenario.gpLetters.map((letterType, index) => (
            <DraggableItem 
              key={`gpletter-${index}`}
              initialX={600 + (index * 50)} 
              initialY={420 + (index * 40)} 
              zIndexBase={lastClickedItem === `gpletter-${index}` ? 75 : 13 - index}
              isEnlarged={enlargedDoc === 1 + index}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 1 + index ? null : 1 + index)}
              onMouseDown={() => setLastClickedItem(`gpletter-${index}`)}
            >
              <GPLetter 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                gender={currentScenario.patient.gender}
                address={currentScenario.patient.address}
                condition={currentScenario.patient.medicalHistory[0] || "Multiple conditions"}
                isEnlarged={enlargedDoc === 1 + index}
                letterType={letterType}
              />
            </DraggableItem>
          ))}
          
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
          
          {documentConfig.showReSPECT && (
            <DraggableItem 
              initialX={480} 
              initialY={320} 
              zIndexBase={lastClickedItem === "respect" ? 75 : 10}
              isEnlarged={enlargedDoc === 4}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 4 ? null : 4)}
              onMouseDown={() => setLastClickedItem("respect")}
            >
              <ReSPECT 
                patientName={currentScenario.patient.name}
                age={currentScenario.patient.age}
                nhsNumber={currentScenario.patient.nhsNumber}
                isEnlarged={enlargedDoc === 4}
              />
            </DraggableItem>
          )}
          
          {documentConfig.showOTCBox && (
            <DraggableItem 
              initialX={150} 
              initialY={520} 
              zIndexBase={lastClickedItem === "otcbox" ? 75 : 9}
              isEnlarged={enlargedDoc === 5}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 5 ? null : 5)}
              onMouseDown={() => setLastClickedItem("otcbox")}
            >
              <MedicationBox 
                medicationName={documentConfig.otcMedication.name}
                dosage={documentConfig.otcMedication.dosage}
                count={documentConfig.otcMedication.count}
                isEnlarged={enlargedDoc === 5}
              />
            </DraggableItem>
          )}
          
          {documentConfig.showPillBottle && (
            <DraggableItem 
              initialX={850} 
              initialY={180} 
              zIndexBase={lastClickedItem === "bottle" ? 75 : 8}
              isEnlarged={enlargedDoc === 6}
              onDoubleClick={() => setEnlargedDoc(enlargedDoc === 6 ? null : 6)}
              onMouseDown={() => setLastClickedItem("bottle")}
            >
              <PillBottle 
                medicationName={documentConfig.bottleMedication.name}
                dosage={documentConfig.bottleMedication.dosage}
                quantity={documentConfig.bottleMedication.quantity}
                isEnlarged={enlargedDoc === 6}
              />
            </DraggableItem>
          )}
        </>
      )}

      {/* Draggable Quiz Panel */}
      {showQuiz && (
        <DraggableItem 
          initialX={window.innerWidth / 2 - 190} 
          initialY={100} 
          zIndexBase={95}
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
