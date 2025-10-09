import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Scenario } from "@/data/scenarios";
import { toast } from "sonner";

interface QuizPanelProps {
  scenario: Scenario;
  onComplete: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QuizPanel = ({ scenario, onComplete }: QuizPanelProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Helper function to create unique options
  const createUniqueOptions = (correctAnswer: string, alternatives: string[]): string[] => {
    const options = [correctAnswer];
    for (const alt of alternatives) {
      if (alt !== correctAnswer && !options.includes(alt)) {
        options.push(alt);
      }
      if (options.length >= 4) break;
    }
    // Add more generic options if needed
    const genericOptions = [
      "Aspirin", "Paracetamol", "Ibuprofen", "Omeprazole", "Amoxicillin",
      "Vitamin D", "Lactulose", "Ranitidine", "Cetirizine", "Loratadine"
    ];
    for (const opt of genericOptions) {
      if (!options.includes(opt) && options.length < 4) {
        options.push(opt);
      }
    }
    return options;
  };

  // Generate questions based on the scenario
  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];
    const meds = scenario.prescriptions.map(p => p.medication);

    // Question 1: Drug class identification
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctAnswer = med.class;
      const alternatives = [
        "Beta-blocker", "Calcium channel blocker", "Proton pump inhibitor",
        "NSAID", "ACE inhibitor", "Antihistamine", "Antibiotic", "Opioid",
        "Benzodiazepine", "SSRI", "Statin", "Diuretic"
      ];
      const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: `What drug class does ${med.name} belong to?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${med.name} is a ${med.class}.`
      });
    }

    // Question 2: Side effects (only for medications with specific side effects)
    if (meds.length > 0) {
      const medsWithSpecificSideEffects = meds.filter(m => 
        !m.sideEffects[0].toLowerCase().includes("minimal") && 
        !m.sideEffects[0].toLowerCase().includes("rare")
      );
      if (medsWithSpecificSideEffects.length > 0) {
        const med = medsWithSpecificSideEffects[Math.floor(Math.random() * medsWithSpecificSideEffects.length)];
        const correctSideEffect = med.sideEffects[0];
        
        // Create clinically appropriate alternatives based on drug class
        let alternatives: string[] = [];
        if (med.class.includes("Beta-blocker")) {
          alternatives = ["Tachycardia", "Hypertension", "Increased energy", "Diarrhoea"];
        } else if (med.class.includes("ACE inhibitor")) {
          alternatives = ["Constipation", "Euphoria", "Increased appetite", "Tachycardia"];
        } else if (med.class.includes("Opioid")) {
          alternatives = ["Diarrhoea", "Increased alertness", "Hypertension", "Tachycardia"];
        } else if (med.class.includes("NSAID")) {
          alternatives = ["Drowsiness", "Bradycardia", "Increased appetite", "Euphoria"];
        } else if (med.class.includes("Diuretic")) {
          alternatives = ["Fluid retention", "Weight gain", "Increased thirst only", "Bradycardia"];
        } else {
          alternatives = [
            "Euphoria", "Increased appetite", "Excessive energy", "Improved vision",
            "Enhanced memory", "Increased strength", "Better sleep quality", "Heightened alertness"
          ];
        }
        
        const uniqueOptions = createUniqueOptions(correctSideEffect, alternatives);
        const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
        questions.push({
          question: `Which is a common side effect of ${med.name}?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctSideEffect),
          explanation: `${med.name} commonly causes ${correctSideEffect.toLowerCase()}.`
        });
      }
    }
    
    // Question 2b: Multiple medication side effects
    if (meds.length >= 2) {
      const medWithBleeding = meds.find(m => 
        m.sideEffects.some(s => s.toLowerCase().includes("bleeding")) || 
        m.category === "Anticoagulant"
      );
      if (medWithBleeding) {
        questions.push({
          question: "A patient on anticoagulation therapy has fallen. What is your main concern?",
          options: [
            "Potential internal bleeding or head injury",
            "Broken bones only",
            "Bruising to the skin",
            "Patient anxiety"
          ],
          correctAnswer: 0,
          explanation: `Patients on anticoagulants like ${medWithBleeding.name} are at high risk of serious bleeding, especially after trauma. Head injuries and internal bleeding are critical concerns.`
        });
      }
    }

    // Question 3: Time-critical medications - MISSED mnemonic
    const timeCriticalMeds = meds.filter(m => m.timeCritical);
    if (timeCriticalMeds.length > 0) {
      const med = timeCriticalMeds[0];
      const allMedNames = meds.map(m => m.name);
      const nonTimeCriticalAlternatives = [
        "Paracetamol", "Vitamin D", "Lactulose", "Gaviscon",
        "Ibuprofen", "Cetirizine", "Ranitidine"
      ];
      const questionTypes = [
        {
          question: "Which of these medications is time-critical and must be taken to hospital?",
          correctAnswer: med.name,
          options: createUniqueOptions(med.name, nonTimeCriticalAlternatives),
          explanation: `${med.name} is time-critical (${med.class}). Time-critical medicines should be taken to hospital and must not be missed unless there's a valid clinical or safety issue.`
        },
        {
          question: "What should you do with time-critical medications when transporting a patient?",
          correctAnswer: "Take them to hospital and inform staff of timing",
          options: [
            "Take them to hospital and inform staff of timing",
            "Leave them at home",
            "Give them all to the patient before leaving",
            "Dispose of them"
          ],
          explanation: "Time-critical medications should be taken to hospital. Alert hospital staff when the patient last took the medication and when the next dose is due."
        },
        {
          question: `If ${med.name} (a time-critical medication) is unavailable, what should you do?`,
          correctAnswer: "Seek alternative supply from the hospital",
          options: [
            "Seek alternative supply from the hospital",
            "Skip the dose",
            "Wait until the patient gets home",
            "Give a different medication"
          ],
          explanation: "If time-critical medicines are unavailable, you should seek alternative supply from the hospital. These medications should not be missed or omitted."
        }
      ];
      
      const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const shuffledOptions = [...selectedQuestion.options].sort(() => Math.random() - 0.5);
      questions.push({
        question: selectedQuestion.question,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(selectedQuestion.correctAnswer),
        explanation: selectedQuestion.explanation
      });
    }
    
    // Question 4: MISSED mnemonic category identification
    if (timeCriticalMeds.length > 0) {
      const med = timeCriticalMeds[Math.floor(Math.random() * timeCriticalMeds.length)];
      let missedCategory = "";
      if (med.category === "Antiparkinsonian" || med.category === "Antimyasthenic") missedCategory = "Movement disorders";
      else if (med.category === "Immunosuppressant") missedCategory = "Immunomodulators";
      else if (med.category === "Antidiabetic") missedCategory = "Sugar - diabetes medication";
      else if (med.category === "Steroid") missedCategory = "Steroids";
      else if (med.category === "Anticonvulsant") missedCategory = "Epilepsy - anticonvulsants";
      else if (med.category === "Anticoagulant") missedCategory = "Direct Oral Anticoagulants and warfarin";
      
      if (missedCategory) {
        const allCategories = [
          "Movement disorders",
          "Immunomodulators",
          "Sugar - diabetes medication",
          "Steroids",
          "Epilepsy - anticonvulsants",
          "Direct Oral Anticoagulants and warfarin"
        ];
        const alternatives = allCategories.filter(c => c !== missedCategory);
        const uniqueOptions = createUniqueOptions(missedCategory, alternatives);
        const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
        questions.push({
          question: `${med.name} belongs to which category of the MISSED mnemonic for time-critical medications?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(missedCategory),
          explanation: `${med.name} is part of "${missedCategory}" in the MISSED mnemonic. A missed dose can cause rapid deterioration in these patients.`
        });
      }
    }
    
    // Question 4b: Clinical scenario with time-critical medication
    if (timeCriticalMeds.length > 0) {
      const parkinsonMed = timeCriticalMeds.find(m => m.category === "Antiparkinsonian");
      if (parkinsonMed) {
        questions.push({
          question: "A Parkinson's patient hasn't taken their medication for 12 hours. What might you observe?",
          options: [
            "Increased rigidity, tremor, and difficulty moving",
            "Improved mobility and reduced tremor",
            "No noticeable change in symptoms",
            "Sudden increase in energy levels"
          ],
          correctAnswer: 0,
          explanation: `Missing doses of Parkinson's medication like ${parkinsonMed.name} can cause rapid deterioration. Patients may become 'frozen' with severe rigidity within hours. Even a 30-minute delay can be harmful.`
        });
      }
      
      const diabetesMed = timeCriticalMeds.find(m => m.category === "Antidiabetic");
      if (diabetesMed) {
        questions.push({
          question: "A diabetic patient has missed their morning insulin. What is the most appropriate action?",
          options: [
            "Check blood glucose and seek medical advice immediately",
            "Wait until their next scheduled dose",
            "Give double the dose at lunchtime",
            "No action needed"
          ],
          correctAnswer: 0,
          explanation: "Missing insulin doses can lead to dangerous hyperglycaemia and diabetic ketoacidosis. Blood glucose should be checked immediately and medical advice sought."
        });
      }
    }

    // Question 5: Indication
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctAnswer = med.indication;
      
      // Create clinically plausible alternatives based on drug category
      let alternatives: string[] = [];
      if (med.category === "Analgesic") {
        alternatives = ["High blood pressure", "Bacterial infection", "Diabetes", "Thyroid disorder"];
      } else if (med.category === "Cardiovascular") {
        alternatives = ["Pain relief", "Bacterial infection", "Constipation", "Anxiety"];
      } else if (med.category === "Antibiotic") {
        alternatives = ["High blood pressure", "Pain relief", "Heart failure", "Diabetes"];
      } else if (med.category === "Antidiabetic") {
        alternatives = ["High blood pressure", "Pain relief", "Bacterial infection", "Thyroid disorder"];
      } else {
        alternatives = [
          "High blood pressure", "Pain relief", "Bacterial infection", "Diabetes",
          "Heart failure", "Thyroid disorder", "Depression", "Anxiety"
        ];
      }
      
      const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: `What is ${med.name} primarily used for?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${med.name} is used for ${med.indication.toLowerCase()}.`
      });
    }
    
    // Question 5b: Drug interactions
    const anticoagulant = meds.find(m => m.category === "Anticoagulant");
    const nsaid = meds.find(m => m.class === "NSAID");
    if (anticoagulant || nsaid) {
      questions.push({
        question: "Why should NSAIDs be used cautiously in patients on anticoagulants?",
        options: [
          "Both increase bleeding risk significantly",
          "They cancel each other out",
          "NSAIDs have no interaction with anticoagulants",
          "It improves pain relief"
        ],
        correctAnswer: 0,
        explanation: "NSAIDs like ibuprofen inhibit platelet function and can cause gastric bleeding. Combined with anticoagulants, this creates a very high bleeding risk."
      });
    }

    // Question 6: Diuretics and clinical implications
    const diuretics = meds.filter(m => m.category === "Diuretic");
    if (diuretics.length > 0) {
      const correctAnswer = diuretics[0].name;
      const alternatives = [
        "Amoxicillin", "Paracetamol", "Omeprazole", "Sertraline",
        "Atorvastatin", "Levothyroxine"
      ];
      const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Which medication would have a diuretic effect?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${diuretics[0].name} is a ${diuretics[0].class}, which increases urine production.`
      });
      
      // Additional diuretic question
      questions.push({
        question: `A patient on ${diuretics[0].name} is dehydrated. What is the most likely cause?`,
        options: [
          "Excessive fluid loss from the diuretic effect",
          "Not drinking enough water",
          "Unrelated to medication",
          "Dietary changes"
        ],
        correctAnswer: 0,
        explanation: `${diuretics[0].name} increases urine output, which can lead to dehydration, especially if the patient isn't drinking enough fluids or has been vomiting.`
      });
    }

    // Question 7: Anticoagulation and clinical scenarios
    const anticoagulants = meds.filter(m => m.category === "Anticoagulant");
    if (anticoagulants.length > 0) {
      const correctAnswer = anticoagulants[0].name;
      const alternatives = [
        "Paracetamol", "Amoxicillin", "Omeprazole", "Atorvastatin",
        "Ramipril", "Metformin", "Salbutamol"
      ];
      const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Which medication increases bleeding risk?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${anticoagulants[0].name} is an anticoagulant and significantly increases bleeding risk.`
      });
      
      // Warfarin-specific question
      const warfarin = anticoagulants.find(m => m.name === "Warfarin");
      if (warfarin) {
        questions.push({
          question: "Why does Warfarin require regular blood monitoring (INR tests)?",
          options: [
            "To ensure the blood is thin enough but not too thin",
            "To check kidney function",
            "To monitor liver damage",
            "It doesn't require monitoring"
          ],
          correctAnswer: 0,
          explanation: "Warfarin's effect varies between individuals and with diet. INR monitoring ensures the blood is adequately anticoagulated (preventing clots) without being over-thinned (causing bleeding)."
        });
      }
    }

    // Question 8: Condition inference
    if (scenario.patient.medicalHistory.length > 0) {
      const condition = scenario.patient.medicalHistory[0];
      const correctAnswer = condition;
      
      // Create clinically plausible condition alternatives
      const alternatives = [
        "Acute coronary syndrome", "Chronic kidney disease", "Liver cirrhosis", 
        "Pneumonia", "Stroke", "Deep vein thrombosis",
        "Gastric ulcer", "Urinary tract infection", "Cellulitis", "Sepsis"
      ];
      
      const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Based on the patient's medical history and medications, which condition do they have?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `The patient's medical history includes ${condition.toLowerCase()}. The prescribed medications are consistent with managing this condition.`
      });
    }
    
    // Question 9: Clinical presentation
    if (scenario.patient.presentation) {
      const betaBlocker = meds.find(m => m.class === "Beta-blocker");
      if (betaBlocker) {
        questions.push({
          question: `What vital sign must you monitor closely in a patient taking ${betaBlocker.name}?`,
          options: [
            "Heart rate - risk of bradycardia",
            "Temperature only",
            "Respiratory rate only",
            "Oxygen saturation only"
          ],
          correctAnswer: 0,
          explanation: `Beta-blockers like ${betaBlocker.name} slow the heart rate. Patients can develop dangerously slow heart rates (bradycardia), so pulse monitoring is essential.`
        });
      }
      
      const acei = meds.find(m => m.class === "ACE inhibitor");
      if (acei) {
        questions.push({
          question: `A patient on ${acei.name} has developed a persistent dry cough. What should you suspect?`,
          options: [
            "Common side effect of ACE inhibitors",
            "Chest infection",
            "Allergic reaction requiring adrenaline",
            "Heart failure"
          ],
          correctAnswer: 0,
          explanation: `Dry cough is a very common side effect of ACE inhibitors like ${acei.name}, affecting up to 10% of patients. It's caused by increased bradykinin levels.`
        });
      }
    }
    
    // Question 10: Polypharmacy awareness
    if (meds.length >= 4) {
      questions.push({
        question: "This patient is on multiple medications (polypharmacy). What is a key concern?",
        options: [
          "Increased risk of drug interactions and adverse effects",
          "Medications work better together",
          "No concerns with multiple medications",
          "Easier to manage treatment"
        ],
        correctAnswer: 0,
        explanation: `This patient is on ${meds.length} medications. Polypharmacy increases risks of drug interactions, side effects, poor adherence, and medication errors. Regular medication reviews are essential.`
      });
    }
    
    // Question 11: Epilepsy medication
    const anticonvulsants = meds.filter(m => m.category === "Anticonvulsant");
    if (anticonvulsants.length > 0) {
      questions.push({
        question: "If an epilepsy patient misses several doses of their anticonvulsant, what is the major risk?",
        options: [
          "Breakthrough seizures or status epilepticus",
          "Mild headache only",
          "Improved alertness",
          "No significant risk"
        ],
        correctAnswer: 0,
        explanation: `Missing anticonvulsant doses like ${anticonvulsants[0].name} can trigger seizures, including life-threatening status epilepticus. These are time-critical medications that must not be missed.`
      });
    }

    // Shuffle all questions and return up to 10
    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const questions = useMemo(() => generateQuestions(), [scenario]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast.success("✓ Correct! " + questions[currentQuestion].explanation, {
        duration: 4000,
        style: { background: "hsl(142, 76%, 36%)", color: "white" }
      });
    } else {
      const correctOption = questions[currentQuestion].options[questions[currentQuestion].correctAnswer];
      toast.error("✗ Incorrect. The correct answer was: " + correctOption + ". " + questions[currentQuestion].explanation, {
        duration: 5000,
        style: { background: "hsl(0, 84%, 60%)", color: "white" }
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      toast.success(`Assessment complete! Score: ${score}/${questions.length}`);
      onComplete();
    }
  };

  if (questions.length === 0) {
    return (
      <div className="paper-texture border-4 border-paper-border p-6 pixel-text" style={{ width: "500px" }}>
        <div className="text-center">
          <p className="mb-4">No quiz questions available for this scenario.</p>
          <Button onClick={onComplete} className="bg-accent hover:bg-accent/80">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-muted p-3 md:p-4 pixel-text retro-shadow max-w-[95vw] md:max-w-none overflow-y-auto max-h-[80vh] md:max-h-none" style={{ width: "min(380px, 95vw)", backgroundColor: "hsl(240, 10%, 25%)" }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-2 mb-2 md:mb-3 bg-primary/20">
        <h2 className="font-bold text-radio-text text-[9px] md:text-[11px]">
          PATIENT ASSESSMENT
        </h2>
        <div className="font-bold mt-1 text-radio-text opacity-80 text-[7px] md:text-[9px]">
          Q{currentQuestion + 1}/{questions.length} | Score: {score}/{questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="mb-3 md:mb-4">
        <div className="bg-primary/20 border-2 border-primary p-2 md:p-3 mb-2 md:mb-3">
          <p className="font-bold text-radio-text text-[8px] md:text-[10px] leading-relaxed">
            {questions[currentQuestion].question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-1.5 md:space-y-2">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full p-1.5 md:p-2 text-left border-2 transition-all font-bold ${
                answered
                  ? selectedAnswer === idx
                    ? idx === questions[currentQuestion].correctAnswer
                      ? "border-accent bg-accent/30 retro-shadow"
                      : "border-destructive bg-destructive/30 retro-shadow"
                    : idx === questions[currentQuestion].correctAnswer
                    ? "border-accent bg-accent/20"
                    : "border-muted bg-background/50 opacity-60"
                  : "border-muted hover:border-accent hover:bg-accent/10 hover:scale-102 bg-background/50"
              }`}
              style={{ fontSize: "8px", lineHeight: "1.3" }}
            >
              <span className="font-bold mr-1.5 md:mr-2 text-radio-accent text-[7px] md:text-[9px]">{String.fromCharCode(65 + idx)}.</span>
              <span className="text-radio-text text-[7px] md:text-[9px]">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {answered && (
        <Button 
          onClick={handleNext}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold border-2 border-accent-foreground/30 retro-shadow hover:scale-105 transition-transform text-[8px] md:text-[9px] py-2 md:py-2.5"
        >
          {currentQuestion < questions.length - 1 ? "► NEXT" : "► COMPLETE"}
        </Button>
      )}
    </div>
  );
};
