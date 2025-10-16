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
        
        // Diverse, clinically realistic side effect alternatives
        const realisticSideEffects = [
          "Nausea and vomiting", "Dizziness and headache", "Dry mouth and constipation",
          "Drowsiness and fatigue", "Diarrhoea and abdominal pain", "Tremor and sweating",
          "Palpitations and anxiety", "Weight gain and fluid retention", "Insomnia and agitation",
          "Blurred vision and confusion", "Rash and pruritus", "Muscle weakness and cramps",
          "Tachycardia and hypertension", "Bradycardia and hypotension", "Flushing and warmth",
          "Urinary retention", "Increased appetite", "Loss of appetite",
          "Joint pain and stiffness", "Peripheral oedema", "Photosensitivity",
          "Tinnitus and hearing loss", "Metallic taste", "Hiccups and belching"
        ];
        
        // Filter out the correct answer and shuffle
        const alternatives = realisticSideEffects
          .filter(se => se !== correctSideEffect)
          .sort(() => Math.random() - 0.5);
        
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
        const correctAnswer = "Potential internal bleeding or head injury";
        const options = [
          correctAnswer,
          "Broken bones only",
          "Bruising to the skin",
          "Patient anxiety"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "A patient on anticoagulation therapy has fallen. What is your main concern?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
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
          explanation: "Time-critical medications should be taken to hospital. Alert hospital staff when the patient last took the medication and when the next dose is due.",
          shuffle: true
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
          explanation: "If time-critical medicines are unavailable, you should seek alternative supply from the hospital. These medications should not be missed or omitted.",
          shuffle: true
        }
      ];
      
      const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let shuffledOptions;
      if (selectedQuestion.shuffle) {
        shuffledOptions = [...selectedQuestion.options].sort(() => Math.random() - 0.5);
      } else {
        shuffledOptions = selectedQuestion.options;
      }
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
        const correctAnswer = "Increased rigidity, tremor, and difficulty moving";
        const options = [
          correctAnswer,
          "Improved mobility and reduced tremor",
          "No noticeable change in symptoms",
          "Sudden increase in energy levels"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "A Parkinson's patient hasn't taken their medication for 12 hours. What might you observe?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Missing doses of Parkinson's medication like ${parkinsonMed.name} can cause rapid deterioration. Patients may become 'frozen' with severe rigidity within hours. Even a 30-minute delay can be harmful.`
        });
      }
      
      const diabetesMed = timeCriticalMeds.find(m => m.category === "Antidiabetic");
      if (diabetesMed) {
        const correctAnswer = "Check blood glucose and seek medical advice immediately";
        const options = [
          correctAnswer,
          "Wait until their next scheduled dose",
          "Give double the dose at lunchtime",
          "No action needed"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "A diabetic patient has missed their morning insulin. What is the most appropriate action?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
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
      const correctAnswer = "Both increase bleeding risk significantly";
      const options = [
        correctAnswer,
        "They cancel each other out",
        "NSAIDs have no interaction with anticoagulants",
        "It improves pain relief"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Why should NSAIDs be used cautiously in patients on anticoagulants?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
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
      const correctAnswer2 = "Excessive fluid loss from the diuretic effect";
      const options2 = [
        correctAnswer2,
        "Not drinking enough water",
        "Unrelated to medication",
        "Dietary changes"
      ];
      const shuffledOptions2 = [...options2].sort(() => Math.random() - 0.5);
      questions.push({
        question: `A patient on ${diuretics[0].name} is dehydrated. What is the most likely cause?`,
        options: shuffledOptions2,
        correctAnswer: shuffledOptions2.indexOf(correctAnswer2),
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
        const correctAnswer3 = "To ensure the blood is thin enough but not too thin";
        const options3 = [
          correctAnswer3,
          "To check kidney function",
          "To monitor liver damage",
          "It doesn't require monitoring"
        ];
        const shuffledOptions3 = [...options3].sort(() => Math.random() - 0.5);
        questions.push({
          question: "Why does Warfarin require regular blood monitoring (INR tests)?",
          options: shuffledOptions3,
          correctAnswer: shuffledOptions3.indexOf(correctAnswer3),
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
        const correctAnswer4 = "Heart rate - risk of bradycardia";
        const options4 = [
          correctAnswer4,
          "Temperature only",
          "Respiratory rate only",
          "Oxygen saturation only"
        ];
        const shuffledOptions4 = [...options4].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What vital sign must you monitor closely in a patient taking ${betaBlocker.name}?`,
          options: shuffledOptions4,
          correctAnswer: shuffledOptions4.indexOf(correctAnswer4),
          explanation: `Beta-blockers like ${betaBlocker.name} slow the heart rate. Patients can develop dangerously slow heart rates (bradycardia), so pulse monitoring is essential.`
        });
      }
      
      const acei = meds.find(m => m.class === "ACE inhibitor");
      if (acei) {
        const correctAnswer5 = "Common side effect of ACE inhibitors";
        const options5 = [
          correctAnswer5,
          "Chest infection",
          "Allergic reaction requiring adrenaline",
          "Heart failure"
        ];
        const shuffledOptions5 = [...options5].sort(() => Math.random() - 0.5);
        questions.push({
          question: `A patient on ${acei.name} has developed a persistent dry cough. What should you suspect?`,
          options: shuffledOptions5,
          correctAnswer: shuffledOptions5.indexOf(correctAnswer5),
          explanation: `Dry cough is a very common side effect of ACE inhibitors like ${acei.name}, affecting up to 10% of patients. It's caused by increased bradykinin levels.`
        });
      }
    }
    
    // Question 10: Polypharmacy awareness (only for 6+ medications, 40% chance to reduce frequency)
    if (meds.length >= 6 && Math.random() > 0.6) {
      const correctAnswer6 = "Increased risk of drug interactions and adverse effects";
      const options6 = [
        correctAnswer6,
        "Medications work better together",
        "No concerns with multiple medications",
        "Easier to manage treatment"
      ];
      const shuffledOptions6 = [...options6].sort(() => Math.random() - 0.5);
      questions.push({
        question: "This patient is on multiple medications (polypharmacy). What is a key concern?",
        options: shuffledOptions6,
        correctAnswer: shuffledOptions6.indexOf(correctAnswer6),
        explanation: `This patient is on ${meds.length} medications. Polypharmacy increases risks of drug interactions, side effects, poor adherence, and medication errors. Regular medication reviews are essential.`
      });
    }
    
    // Question 11: Epilepsy medication
    const anticonvulsants = meds.filter(m => m.category === "Anticonvulsant");
    if (anticonvulsants.length > 0) {
      const correctAnswer7 = "Breakthrough seizures or status epilepticus";
      const options7 = [
        correctAnswer7,
        "Mild headache only",
        "Improved alertness",
        "No significant risk"
      ];
      const shuffledOptions7 = [...options7].sort(() => Math.random() - 0.5);
      questions.push({
        question: "If an epilepsy patient misses several doses of their anticonvulsant, what is the major risk?",
        options: shuffledOptions7,
        correctAnswer: shuffledOptions7.indexOf(correctAnswer7),
        explanation: `Missing anticonvulsant doses like ${anticonvulsants[0].name} can trigger seizures, including life-threatening status epilepticus. These are time-critical medications that must not be missed.`
      });
    }

    // SCENARIO-SPECIFIC QUESTIONS - Add diversity beyond medication-focused questions
    
    // Question 12: Primary assessment based on presentation
    if (scenario.patient.presentation) {
      const presentation = scenario.patient.presentation.toLowerCase();
      
      // Chest pain scenarios
      if (presentation.includes("chest pain") || presentation.includes("cardiac")) {
        const chestPainQuestions = [
          {
            question: "What is your primary concern with a patient presenting with chest pain?",
            correctAnswer: "Acute coronary syndrome or myocardial infarction",
            options: [
              "Acute coronary syndrome or myocardial infarction",
              "Indigestion",
              "Anxiety attack",
              "Muscle strain"
            ],
            explanation: "Chest pain must be treated as cardiac until proven otherwise. Time is muscle - early recognition and treatment of ACS/MI is critical."
          },
          {
            question: "What is the most important initial assessment for chest pain?",
            correctAnswer: "12-lead ECG within 10 minutes",
            options: [
              "12-lead ECG within 10 minutes",
              "Blood pressure only",
              "Detailed medical history",
              "Oxygen saturation"
            ],
            explanation: "A 12-lead ECG should be performed within 10 minutes of arrival for any chest pain patient to identify STEMI or other cardiac ischaemia."
          }
        ];
        const selected = chestPainQuestions[Math.floor(Math.random() * chestPainQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Breathing difficulty scenarios
      if (presentation.includes("breath") || presentation.includes("respiratory") || presentation.includes("dyspnoea")) {
        const breathingQuestions = [
          {
            question: "What is the priority action for a patient with severe breathlessness?",
            correctAnswer: "Apply high-flow oxygen and assess respiratory effort",
            options: [
              "Apply high-flow oxygen and assess respiratory effort",
              "Take a detailed history first",
              "Give salbutamol immediately without assessment",
              "Wait and observe for 5 minutes"
            ],
            explanation: "Airway and breathing take priority. Assess respiratory rate, effort, oxygen saturations and provide high-flow oxygen if hypoxic."
          },
          {
            question: "In a breathless patient, what examination finding would most concern you?",
            correctAnswer: "Silent chest with reduced respiratory effort",
            options: [
              "Silent chest with reduced respiratory effort",
              "Mild wheeze",
              "Slight tachypnoea",
              "Patient able to speak in full sentences"
            ],
            explanation: "A 'silent chest' with reduced effort indicates severe bronchospasm or exhaustion - this is life-threatening and may require immediate advanced intervention."
          }
        ];
        const selected = breathingQuestions[Math.floor(Math.random() * breathingQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Seizure scenarios
      if (presentation.includes("seizure") || presentation.includes("fit") || presentation.includes("convulsion")) {
        const seizureQuestions = [
          {
            question: "How long must a seizure last to be considered status epilepticus?",
            correctAnswer: "5 minutes or more",
            options: [
              "5 minutes or more",
              "10 minutes or more",
              "15 minutes or more",
              "30 minutes or more"
            ],
            explanation: "Status epilepticus is defined as a seizure lasting 5 minutes or longer, or repeated seizures without recovery. This is a medical emergency requiring immediate treatment."
          },
          {
            question: "What is the key safety priority during an active seizure?",
            correctAnswer: "Protect from injury and maintain airway",
            options: [
              "Protect from injury and maintain airway",
              "Restrain the patient",
              "Put something in their mouth",
              "Give oral medication"
            ],
            explanation: "Never restrain a seizing patient or put anything in their mouth. Protect from injury, maintain airway, time the seizure, and be ready to suction if needed."
          }
        ];
        const selected = seizureQuestions[Math.floor(Math.random() * seizureQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Altered consciousness scenarios
      if (presentation.includes("unconscious") || presentation.includes("unresponsive") || presentation.includes("gcs") || presentation.includes("confused")) {
        const consciousnessQuestions = [
          {
            question: "What is the first assessment priority for an unconscious patient?",
            correctAnswer: "Check for danger, then assess airway and breathing",
            options: [
              "Check for danger, then assess airway and breathing",
              "Check blood glucose immediately",
              "Take blood pressure",
              "Ask family for medical history"
            ],
            explanation: "Use DR ABC approach. Ensure scene safety, then immediately assess and manage airway and breathing - these are the immediate life threats."
          },
          {
            question: "What quick bedside test is essential for all patients with altered consciousness?",
            correctAnswer: "Blood glucose level",
            options: [
              "Blood glucose level",
              "Blood pressure",
              "Temperature",
              "ECG"
            ],
            explanation: "Hypoglycaemia is a rapidly reversible cause of altered consciousness. Check blood glucose early - if low, treat immediately with IV glucose or IM glucagon."
          }
        ];
        const selected = consciousnessQuestions[Math.floor(Math.random() * consciousnessQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Falls scenarios
      if (presentation.includes("fall") || presentation.includes("fallen")) {
        const fallQuestions = [
          {
            question: "What is the most important question to ask after a fall in an elderly patient?",
            correctAnswer: "Did you trip or did your legs give way?",
            options: [
              "Did you trip or did your legs give way?",
              "What time did you fall?",
              "Where does it hurt?",
              "Have you eaten today?"
            ],
            explanation: "Determining if it was a mechanical fall (trip) or medical cause (syncope, weakness) changes your assessment and management priorities significantly."
          },
          {
            question: "What serious injury must you consider in all elderly fallers on anticoagulation?",
            correctAnswer: "Intracranial haemorrhage",
            options: [
              "Intracranial haemorrhage",
              "Fractured wrist",
              "Bruised hip",
              "Soft tissue injury"
            ],
            explanation: "Patients on anticoagulants who fall and hit their head are at high risk of intracranial bleeding, even without external signs. This can develop over hours."
          }
        ];
        const selected = fallQuestions[Math.floor(Math.random() * fallQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Stroke scenarios
      if (presentation.includes("stroke") || presentation.includes("weakness") || presentation.includes("facial droop")) {
        const strokeQuestions = [
          {
            question: "What is the time-critical window for thrombolysis in stroke?",
            correctAnswer: "Within 4.5 hours of symptom onset",
            options: [
              "Within 4.5 hours of symptom onset",
              "Within 12 hours of symptom onset",
              "Within 24 hours of symptom onset",
              "Within 1 hour of symptom onset"
            ],
            explanation: "Thrombolysis must be given within 4.5 hours of symptom onset. Use FAST assessment and prioritise rapid conveyance to a stroke unit."
          },
          {
            question: "What assessment tool should you use for suspected stroke?",
            correctAnswer: "FAST (Face, Arms, Speech, Time)",
            options: [
              "FAST (Face, Arms, Speech, Time)",
              "AVPU",
              "GCS only",
              "NEWS2 score"
            ],
            explanation: "FAST assessment (Face drooping, Arm weakness, Speech difficulty, Time to call 999) is the standard pre-hospital stroke recognition tool."
          }
        ];
        const selected = strokeQuestions[Math.floor(Math.random() * strokeQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Sepsis scenarios
      if (presentation.includes("sepsis") || presentation.includes("infection") || (presentation.includes("fever") && presentation.includes("unwell"))) {
        const sepsisQuestions = [
          {
            question: "What are the key red flags suggesting sepsis in an adult?",
            correctAnswer: "High NEWS2 score, altered mental state, mottled skin",
            options: [
              "High NEWS2 score, altered mental state, mottled skin",
              "Mild fever only",
              "Slight tachycardia",
              "Cough and runny nose"
            ],
            explanation: "Sepsis causes systemic deterioration. Look for high NEWS2, confusion, mottled/ashen skin, not passed urine, severe breathlessness - these need immediate hospital treatment."
          },
          {
            question: "What is the priority in suspected sepsis?",
            correctAnswer: "Rapid conveyance to hospital for IV antibiotics",
            options: [
              "Rapid conveyance to hospital for IV antibiotics",
              "Give oral antibiotics on scene",
              "Wait for symptoms to worsen",
              "Refer to GP"
            ],
            explanation: "Sepsis kills quickly. Early recognition and rapid hospital transfer for IV antibiotics ('Sepsis Six') is critical - every hour delay increases mortality."
          }
        ];
        const selected = sepsisQuestions[Math.floor(Math.random() * sepsisQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      // Diabetic emergencies
      if (presentation.includes("diabetes") || presentation.includes("hyperglycaemia") || presentation.includes("hypoglycaemia") || presentation.includes("dka")) {
        const diabeticQuestions = [
          {
            question: "What are the signs of diabetic ketoacidosis (DKA)?",
            correctAnswer: "High blood glucose, ketones, Kussmaul breathing, dehydration",
            options: [
              "High blood glucose, ketones, Kussmaul breathing, dehydration",
              "Low blood glucose only",
              "Normal observations",
              "Bradycardia and hypertension"
            ],
            explanation: "DKA presents with high glucose (>11mmol/L), ketones, deep rapid breathing (Kussmaul), dehydration, abdominal pain, and vomiting. This is life-threatening."
          },
          {
            question: "At what blood glucose level should you treat hypoglycaemia?",
            correctAnswer: "Below 4.0 mmol/L",
            options: [
              "Below 4.0 mmol/L",
              "Below 8.0 mmol/L",
              "Below 2.0 mmol/L",
              "Only if unconscious"
            ],
            explanation: "Treat hypoglycaemia if glucose <4.0mmol/L or patient is symptomatic. Give oral glucose if alert, IM glucagon or IV glucose if reduced consciousness."
          }
        ];
        const selected = diabeticQuestions[Math.floor(Math.random() * diabeticQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
    }
    
    // Question 13: Medical history based clinical decisions
    if (scenario.patient.medicalHistory.length > 0) {
      const history = scenario.patient.medicalHistory;
      
      if (history.some(h => h.toLowerCase().includes("copd") || h.toLowerCase().includes("chronic obstructive"))) {
        const copdQuestions = [
          {
            question: "What is the target oxygen saturation for a COPD patient?",
            correctAnswer: "88-92%",
            options: [
              "88-92%",
              "94-98%",
              "100%",
              "80-85%"
            ],
            explanation: "COPD patients should have target sats of 88-92%. High oxygen can suppress their respiratory drive. Start low (e.g. 2-4L via nasal cannula) and titrate to target."
          },
          {
            question: "What medication can you give for COPD exacerbation in the pre-hospital setting?",
            correctAnswer: "Salbutamol and ipratropium nebulisers",
            options: [
              "Salbutamol and ipratropium nebulisers",
              "IV antibiotics only",
              "Oral steroids only",
              "Morphine"
            ],
            explanation: "Nebulised salbutamol and ipratropium bromide are first-line pre-hospital treatments for COPD exacerbation, driven by oxygen or air depending on sats."
          }
        ];
        const selected = copdQuestions[Math.floor(Math.random() * copdQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      if (history.some(h => h.toLowerCase().includes("asthma"))) {
        const asthmaQuestions = [
          {
            question: "What are the signs of life-threatening asthma?",
            correctAnswer: "Silent chest, exhaustion, confusion, SpO2 <92%",
            options: [
              "Silent chest, exhaustion, confusion, SpO2 <92%",
              "Mild wheeze only",
              "Able to complete sentences",
              "Peak flow >75% predicted"
            ],
            explanation: "Life-threatening features: silent chest, poor respiratory effort, exhaustion, confusion, cyanosis, SpO2 <92%, arrhythmia. These patients need immediate treatment and hospital."
          },
          {
            question: "What is the first-line bronchodilator for acute asthma?",
            correctAnswer: "Salbutamol nebuliser",
            options: [
              "Salbutamol nebuliser",
              "Oral prednisolone only",
              "IV hydrocortisone first",
              "Adrenaline IM"
            ],
            explanation: "Salbutamol nebulisers (5mg) are first-line treatment. Can be repeated. Add ipratropium for severe cases. Consider IV magnesium for life-threatening asthma."
          }
        ];
        const selected = asthmaQuestions[Math.floor(Math.random() * asthmaQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      if (history.some(h => h.toLowerCase().includes("atrial fibrillation") || h.toLowerCase().includes("af"))) {
        const afQuestions = [
          {
            question: "Why are patients with atrial fibrillation often prescribed anticoagulants?",
            correctAnswer: "To prevent stroke from blood clots forming in the heart",
            options: [
              "To prevent stroke from blood clots forming in the heart",
              "To control heart rate",
              "To thin the blood",
              "To lower blood pressure"
            ],
            explanation: "AF causes irregular heart rhythm and blood stasis in the atria, forming clots that can embolise to the brain causing stroke. Anticoagulation reduces this risk by 60-70%."
          },
          {
            question: "If a patient with AF develops sudden weakness and speech problems, what should you suspect?",
            correctAnswer: "Ischaemic stroke from embolism",
            options: [
              "Ischaemic stroke from embolism",
              "Normal ageing",
              "Medication side effect",
              "Dehydration"
            ],
            explanation: "AF patients are at high risk of embolic stroke. Sudden neurological symptoms require immediate stroke pathway activation and rapid hospital transfer."
          }
        ];
        const selected = afQuestions[Math.floor(Math.random() * afQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
      
      if (history.some(h => h.toLowerCase().includes("heart failure"))) {
        const hfQuestions = [
          {
            question: "What clinical signs indicate acute pulmonary oedema from heart failure?",
            correctAnswer: "Fine crackles, pink frothy sputum, severe breathlessness",
            options: [
              "Fine crackles, pink frothy sputum, severe breathlessness",
              "Dry cough only",
              "Chest pain",
              "High blood pressure only"
            ],
            explanation: "Acute pulmonary oedema presents with severe breathlessness, fine crackles throughout lungs, pink frothy sputum. These patients need urgent treatment with CPAP, GTN, and furosemide."
          },
          {
            question: "What medication should you consider for acute heart failure with pulmonary oedema?",
            correctAnswer: "GTN and furosemide",
            options: [
              "GTN and furosemide",
              "Antibiotics",
              "Salbutamol only",
              "Adrenaline"
            ],
            explanation: "GTN reduces preload and cardiac workload. Furosemide removes excess fluid. CPAP can be lifesaving by improving oxygenation and reducing need for intubation."
          }
        ];
        const selected = hfQuestions[Math.floor(Math.random() * hfQuestions.length)];
        const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      }
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
