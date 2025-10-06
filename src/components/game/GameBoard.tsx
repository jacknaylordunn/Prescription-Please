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
  
  // Ensure scenario has document metadata
  if (!currentScenario.documentMetadata) {
    const today = new Date();
    const admissionDate = new Date(Date.now() - Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000);
    const doctorNames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Anderson", "Mitchell", "Patterson", "Thompson", "Roberts", "Johnson"];
    const appointmentTimes = ["09:30", "10:45", "14:20", "15:30"];
    const medicationChanges = ["Dose increased", "New medication added"];
    const respectReviewDate = new Date(today);
    respectReviewDate.setDate(today.getDate() + 90);
    const dob = new Date(today.getFullYear() - currentScenario.patient.age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    currentScenario.documentMetadata = {
      prescriptionDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      dischargeDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      gpDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      dnacprDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      respectDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      carePlanDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
      dnacprGMC: Math.floor(1000000 + Math.random() * 9000000).toString(),
      respectGMC: Math.floor(1000000 + Math.random() * 9000000).toString(),
      admissionDate,
      dischargeDate: today,
      formattedDate: today.toLocaleDateString('en-GB'),
      fp10Code: `FP10-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      bloodTestDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      cholesterolValue: Math.random() > 0.5 ? "5.8 mmol/L (high)" : "4.2 mmol/L (target)",
      appointmentSummaryDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      heartRate: Math.floor(Math.random() * 20) + 72,
      appointmentTime: appointmentTimes[Math.floor(Math.random() * appointmentTimes.length)],
      medicationReviewDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      medicationChange: medicationChanges[Math.floor(Math.random() * medicationChanges.length)],
      patientDOB: dob.toLocaleDateString('en-GB'),
      respectReviewDate: respectReviewDate.toLocaleDateString('en-GB'),
      carePlanReviewDate: today.toLocaleDateString('en-GB')
    };
  }
  
  // Regenerate document config when scenario changes
  useEffect(() => {
    // Map conditions to relevant OTC medications
    const getOTCForCondition = (history: string[]) => {
      const historyStr = history.join(" ").toLowerCase();
      
      // Pain conditions
      if (historyStr.includes("pain") || historyStr.includes("arthritis") || historyStr.includes("gout")) {
        return [
          { name: "Paracetamol", dosage: "500mg", count: "16" },
          { name: "Ibuprofen", dosage: "400mg", count: "24" },
          { name: "Ibuprofen Gel", dosage: "5%", count: "100g tube" },
        ];
      }
      
      // Respiratory/Allergy conditions
      if (historyStr.includes("asthma") || historyStr.includes("copd") || historyStr.includes("hayfever") || historyStr.includes("eczema")) {
        return [
          { name: "Cetirizine", dosage: "10mg", count: "30" },
          { name: "Loratadine", dosage: "10mg", count: "30" },
          { name: "Chlorphenamine", dosage: "4mg", count: "28" },
        ];
      }
      
      // Digestive/GORD conditions
      if (historyStr.includes("reflux") || historyStr.includes("gord") || historyStr.includes("indigestion")) {
        return [
          { name: "Gaviscon", dosage: "Liquid", count: "300ml" },
          { name: "Rennie", dosage: "Tablets", count: "24" },
          { name: "Peptac", dosage: "Liquid", count: "500ml" },
        ];
      }
      
      // Constipation/Bowel issues
      if (historyStr.includes("constipation") || historyStr.includes("parkinson")) {
        return [
          { name: "Senna", dosage: "7.5mg", count: "20" },
          { name: "Bisacodyl", dosage: "5mg", count: "20" },
          { name: "Lactulose", dosage: "Solution", count: "300ml" },
        ];
      }
      
      // Cold/Flu symptoms
      if (historyStr.includes("uti") || historyStr.includes("infection") || historyStr.includes("pneumonia")) {
        return [
          { name: "Paracetamol", dosage: "500mg", count: "32" },
          { name: "Day & Night", dosage: "Capsules", count: "16" },
          { name: "Throat Lozenges", dosage: "Original", count: "24" },
        ];
      }
      
      // Default for general conditions
      return [
        { name: "Paracetamol", dosage: "500mg", count: "16" },
        { name: "Aspirin", dosage: "300mg", count: "16" },
        { name: "Vitamin D", dosage: "1000 IU", count: "90" },
      ];
    };
    
    const getBottleForCondition = (history: string[]) => {
      const historyStr = history.join(" ").toLowerCase();
      
      // Allergy/Respiratory
      if (historyStr.includes("hayfever") || historyStr.includes("allergy") || historyStr.includes("eczema")) {
        return [
          { name: "Cetirizine", dosage: "10mg", quantity: "30 tablets" },
          { name: "Loratadine", dosage: "10mg", quantity: "30 tablets" },
          { name: "Piriton", dosage: "4mg", quantity: "60 tablets" },
        ];
      }
      
      // Pain/Inflammation
      if (historyStr.includes("pain") || historyStr.includes("arthritis")) {
        return [
          { name: "Ibuprofen", dosage: "200mg", quantity: "48 tablets" },
          { name: "Aspirin", dosage: "300mg", quantity: "32 tablets" },
          { name: "Paracetamol", dosage: "500mg", quantity: "100 tablets" },
        ];
      }
      
      // Vitamins for elderly/chronic conditions
      if (historyStr.includes("osteoporosis") || historyStr.includes("deficiency") || historyStr.includes("kidney")) {
        return [
          { name: "Vitamin D3", dosage: "1000 IU", quantity: "90 capsules" },
          { name: "Calcium", dosage: "600mg", quantity: "60 tablets" },
          { name: "Multivitamins", dosage: "Daily", quantity: "30 tablets" },
        ];
      }
      
      // Eye conditions
      if (historyStr.includes("eye") || historyStr.includes("vision")) {
        return [
          { name: "Eye Drops", dosage: "Preservative Free", quantity: "10ml" },
          { name: "Vitamin A", dosage: "5000 IU", quantity: "60 capsules" },
        ];
      }
      
      // Default
      return [
        { name: "Vitamin C", dosage: "1000mg", quantity: "60 tablets" },
        { name: "Omega-3", dosage: "1000mg", quantity: "90 capsules" },
        { name: "Multivitamin", dosage: "Complete", quantity: "30 tablets" },
      ];
    };
    
    const relevantOTCs = getOTCForCondition(currentScenario.patient.medicalHistory);
    const relevantBottles = getBottleForCondition(currentScenario.patient.medicalHistory);
    
    const randomOTC = relevantOTCs[Math.floor(Math.random() * relevantOTCs.length)];
    const randomBottle = relevantBottles[Math.floor(Math.random() * relevantBottles.length)];
    
    setDocumentConfig({
      showDNACPR: currentScenario.patient.age > 70 && Math.random() > 0.5,
      showReSPECT: currentScenario.patient.age > 65 && Math.random() > 0.6,
      showGPLetter: !!(currentScenario.gpLetters && currentScenario.gpLetters.length > 0),
      showCarePlan: currentScenario.patient.age > 65 && Math.random() > 0.5,
      showDischarge: Math.random() > 0.6,
      showOTCBox: Math.random() > 0.4, // Increased probability
      showPillBottle: Math.random() > 0.4, // Increased probability
      otcMedication: randomOTC,
      bottleMedication: randomBottle
    });
  }, [currentScenarioIndex, currentScenario.patient.age, currentScenario.gpLetters, currentScenario.patient.medicalHistory]);

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
                doctorName={currentScenario.documentMetadata?.dnacprDoctor}
                gmcNumber={currentScenario.documentMetadata?.dnacprGMC}
                formattedDate={currentScenario.documentMetadata?.formattedDate}
                patientDOB={currentScenario.documentMetadata?.patientDOB}
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
                doctorName={currentScenario.documentMetadata?.gpDoctor}
                formattedDate={currentScenario.documentMetadata?.formattedDate}
                bloodTestDate={currentScenario.documentMetadata?.bloodTestDate}
                cholesterolValue={currentScenario.documentMetadata?.cholesterolValue}
                appointmentSummaryDate={currentScenario.documentMetadata?.appointmentSummaryDate}
                heartRate={currentScenario.documentMetadata?.heartRate}
                appointmentTime={currentScenario.documentMetadata?.appointmentTime}
                medicationReviewDate={currentScenario.documentMetadata?.medicationReviewDate}
                medicationChange={currentScenario.documentMetadata?.medicationChange}
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
                carePlanReviewDate={currentScenario.documentMetadata?.carePlanReviewDate}
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
                doctorName={currentScenario.documentMetadata?.dischargeDoctor}
                admissionDate={currentScenario.documentMetadata?.admissionDate}
                dischargeDate={currentScenario.documentMetadata?.dischargeDate}
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
                doctorName={currentScenario.documentMetadata?.respectDoctor}
                gmcNumber={currentScenario.documentMetadata?.respectGMC}
                formattedDate={currentScenario.documentMetadata?.formattedDate}
                patientDOB={currentScenario.documentMetadata?.patientDOB}
                respectReviewDate={currentScenario.documentMetadata?.respectReviewDate}
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
