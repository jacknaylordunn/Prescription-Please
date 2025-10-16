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

  // Generate questions based on the scenario - FOCUS ON DETECTIVE SKILLS
  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];
    const meds = scenario.prescriptions.map(p => p.medication);

    // Question 1: Suffix-based drug identification (CORE SKILL)
    if (meds.length > 0) {
      const suffixMeds = [
        { suffix: "-pril", class: "ACE inhibitor", examples: ["Ramipril", "Lisinopril", "Enalapril"] },
        { suffix: "-sartan", class: "Angiotensin receptor blocker", examples: ["Losartan", "Candesartan", "Valsartan"] },
        { suffix: "-olol", class: "Beta-blocker", examples: ["Bisoprolol", "Atenolol", "Metoprolol"] },
        { suffix: "-dipine", class: "Calcium channel blocker", examples: ["Amlodipine", "Nifedipine", "Felodipine"] },
        { suffix: "-statin", class: "Statin", examples: ["Atorvastatin", "Simvastatin", "Rosuvastatin"] },
        { suffix: "-prazole", class: "Proton pump inhibitor", examples: ["Omeprazole", "Lansoprazole", "Esomeprazole"] },
        { suffix: "-cillin", class: "Penicillin antibiotic", examples: ["Amoxicillin", "Flucloxacillin", "Phenoxymethylpenicillin"] },
        { suffix: "-pam/-lam", class: "Benzodiazepine", examples: ["Diazepam", "Lorazepam", "Clonazepam"] },
        { suffix: "-mycin", class: "Macrolide antibiotic", examples: ["Erythromycin", "Clarithromycin", "Azithromycin"] },
        { suffix: "-tidine", class: "H2 receptor antagonist", examples: ["Ranitidine", "Famotidine", "Cimetidine"] },
        { suffix: "-lol (not beta)", class: "Bronchodilator", examples: ["Salbutamol", "Terbutaline"] },
        { suffix: "-oxaban", class: "Direct Oral Anticoagulant", examples: ["Apixaban", "Rivaroxaban", "Edoxaban"] },
        { suffix: "-azide", class: "Thiazide diuretic", examples: ["Bendroflumethiazide", "Indapamide"] },
        { suffix: "-semide", class: "Loop diuretic", examples: ["Furosemide", "Bumetanide"] }
      ];
      
      // Find a med from the scenario that has a recognizable suffix
      const medWithSuffix = meds.find(m => 
        suffixMeds.some(s => s.examples.some(ex => ex.toLowerCase() === m.name.toLowerCase()))
      );
      
      if (medWithSuffix) {
        const suffixInfo = suffixMeds.find(s => 
          s.examples.some(ex => ex.toLowerCase() === medWithSuffix.name.toLowerCase())
        );
        
        if (suffixInfo) {
          const correctAnswer = suffixInfo.class;
          const alternatives = suffixMeds.filter(s => s.class !== correctAnswer).map(s => s.class);
          const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
          const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
          questions.push({
            question: `A patient has a medication ending in "${suffixInfo.suffix}". What drug class is this likely to be?`,
            options: shuffledOptions,
            correctAnswer: shuffledOptions.indexOf(correctAnswer),
            explanation: `The suffix "${suffixInfo.suffix}" indicates a ${correctAnswer}. ${medWithSuffix.name} follows this pattern. Learning drug suffixes helps paramedics identify medications when patients can't remember names.`
          });
        }
      }
    }

    // Question 2: Identifying medication from suffix patterns (DETECTIVE SKILL)
    if (meds.length > 1) {
      const suffixPatterns = [
        { name: "Bisoprolol", suffix: "-olol", pattern: "beta-blocker" },
        { name: "Ramipril", suffix: "-pril", pattern: "ACE inhibitor" },
        { name: "Amlodipine", suffix: "-dipine", pattern: "calcium channel blocker" },
        { name: "Atorvastatin", suffix: "-statin", pattern: "statin for cholesterol" },
        { name: "Omeprazole", suffix: "-prazole", pattern: "proton pump inhibitor" },
        { name: "Losartan", suffix: "-sartan", pattern: "ARB" },
        { name: "Apixaban", suffix: "-oxaban", pattern: "DOAC anticoagulant" }
      ];
      
      const medInScenario = meds.find(m =>
        suffixPatterns.some(p => p.name.toLowerCase() === m.name.toLowerCase())
      );
      
      if (medInScenario) {
        const pattern = suffixPatterns.find(p => p.name.toLowerCase() === medInScenario.name.toLowerCase());
        if (pattern) {
          const correctAnswer = pattern.suffix;
          const alternatives = suffixPatterns.filter(p => p.suffix !== correctAnswer).map(p => p.suffix);
          const uniqueOptions = createUniqueOptions(correctAnswer, alternatives.slice(0, 3));
          const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
          questions.push({
            question: `You find a medication bottle but can't read the full name. You see "${medInScenario.name.slice(0, -4)}..." What suffix would help identify it as a ${pattern.pattern}?`,
            options: shuffledOptions,
            correctAnswer: shuffledOptions.indexOf(correctAnswer),
            explanation: `${medInScenario.name} ends in "${pattern.suffix}", which identifies it as a ${pattern.pattern}. Recognizing suffixes is crucial when labels are damaged or patients can't remember full medication names.`
          });
        }
      }
    }
    
    // Question 2c: Inferring medication from medical history (DETECTIVE SKILL)
    if (scenario.patient.medicalHistory.length > 0) {
      const history = scenario.patient.medicalHistory[0].toLowerCase();
      
      const historyToSuffix = [
        { condition: "atrial fibrillation", suffix: "-oxaban (DOAC)", example: "Apixaban, Rivaroxaban" },
        { condition: "hypertension", suffix: "-pril or -sartan", example: "Ramipril, Losartan" },
        { condition: "high cholesterol", suffix: "-statin", example: "Atorvastatin" },
        { condition: "heart failure", suffix: "-pril, -olol, -semide", example: "Ramipril, Bisoprolol, Furosemide" },
        { condition: "copd", suffix: "-terol or -tropium", example: "Salbutamol, Ipratropium" },
        { condition: "asthma", suffix: "-sone or -sol", example: "Prednisolone, Salbutamol" },
        { condition: "type 2 diabetes", suffix: "-formin or -gliflozin", example: "Metformin, Empagliflozin" },
        { condition: "depression", suffix: "-pram or -oxetine", example: "Citalopram, Fluoxetine" }
      ];
      
      const matchedHistory = historyToSuffix.find(h => history.includes(h.condition));
      
      if (matchedHistory) {
        const correctAnswer = matchedHistory.suffix;
        const alternatives = historyToSuffix.filter(h => h.condition !== matchedHistory.condition).map(h => h.suffix);
        const uniqueOptions = createUniqueOptions(correctAnswer, alternatives.slice(0, 3));
        const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
        questions.push({
          question: `The care plan says patient has ${matchedHistory.condition}. What medication suffix should you expect to find?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Patients with ${matchedHistory.condition} typically take medications ending in ${correctAnswer}, such as ${matchedHistory.example}. This helps you identify relevant medications even when bottles are unlabeled.`
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

    // Question 5: Detective skill - Identifying medication category from clues
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      
      // Create detective-style questions based on indirect clues
      const detectiveQuestions = [
        {
          condition: med.category === "Anticoagulant",
          question: "Patient says 'I take tablets to thin my blood'. What drug class are they likely taking?",
          correctAnswer: "Anticoagulant",
          alternatives: ["Antibiotic", "Analgesic", "Antidiabetic", "Antihypertensive"],
          explanation: "Patients often describe anticoagulants as 'blood thinners'. Look for suffixes like -oxaban (Apixaban), -arin (Warfarin) or check for AF/DVT history."
        },
        {
          condition: med.category === "Antidiabetic",
          question: "Patient mentions 'I take something for my sugar'. What category should you investigate?",
          correctAnswer: "Antidiabetic medication",
          alternatives: ["Vitamin supplements", "Pain medication", "Heart medication", "Antibiotic"],
          explanation: "Patients with diabetes often refer to their medication as 'for sugar'. Look for -formin (Metformin), -gliflozin, or insulins in their prescriptions."
        },
        {
          condition: med.class === "Beta-blocker",
          question: "You find a medication ending in '-olol'. The patient has a regular, slow pulse. What is this medication for?",
          correctAnswer: "Heart rate and blood pressure control",
          alternatives: ["Pain relief", "Infection treatment", "Blood sugar control", "Digestion"],
          explanation: "Medications ending in -olol are beta-blockers (e.g., Bisoprolol). They slow the heart rate and lower blood pressure. Always check pulse before administration."
        },
        {
          condition: med.category === "Anticonvulsant",
          question: "Care plan mentions 'seizure disorder'. Patient has a purple MedicAlert bracelet. What medication category is likely time-critical?",
          correctAnswer: "Anticonvulsant",
          alternatives: ["Painkiller", "Antibiotic", "Vitamin", "Laxative"],
          explanation: "Epilepsy/seizure patients need anticonvulsants. These are time-critical (MISSED mnemonic - E for Epilepsy). Examples include Levetiracetam, Lamotrigine, Sodium Valproate."
        },
        {
          condition: med.category === "Steroid",
          question: "Patient has a steroid warning card in their wallet. What medication suffix might you find?",
          correctAnswer: "-sone or -lone",
          alternatives: ["-pril", "-statin", "-pam", "-mycin"],
          explanation: "Steroids like Prednisolone end in -sone or -lone. Steroid cards warn that sudden cessation can be dangerous - these are time-critical medications."
        }
      ];
      
      const applicableQuestions = detectiveQuestions.filter(q => q.condition);
      
      if (applicableQuestions.length > 0) {
        const selected = applicableQuestions[Math.floor(Math.random() * applicableQuestions.length)];
        const uniqueOptions = createUniqueOptions(selected.correctAnswer, selected.alternatives);
        const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
        questions.push({
          question: selected.question,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
          explanation: selected.explanation
        });
      } else {
        // Fallback general indication question
        const correctAnswer = med.indication;
        const alternatives = [
          "High blood pressure", "Pain relief", "Bacterial infection", "Diabetes",
          "Heart failure", "Thyroid disorder", "Depression", "Anxiety"
        ];
        const uniqueOptions = createUniqueOptions(correctAnswer, alternatives);
        const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What is ${med.name} primarily used for?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `${med.name} is used for ${med.indication.toLowerCase()}.`
        });
      }
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
    
    // Question 12: Additional drug class questions for variety
    if (meds.length > 1) {
      const randomMed = meds[Math.floor(Math.random() * meds.length)];
      const classQuestions = [
        {
          question: `Which of these medications is a ${randomMed.class}?`,
          correctAnswer: randomMed.name,
          alternatives: meds.filter(m => m.name !== randomMed.name).map(m => m.name).concat(["Paracetamol", "Aspirin", "Ibuprofen", "Codeine"]),
          explanation: `${randomMed.name} is classified as a ${randomMed.class}.`
        }
      ];
      
      const selected = classQuestions[0];
      const uniqueOptions = createUniqueOptions(selected.correctAnswer, selected.alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: selected.question,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
        explanation: selected.explanation
      });
    }
    
    // Question 13: Medication-specific monitoring questions
    if (meds.length > 0) {
      const lithium = meds.find(m => m.name === "Lithium");
      const digoxin = meds.find(m => m.name === "Digoxin");
      const warfarin = meds.find(m => m.name === "Warfarin");
      const acei = meds.find(m => m.class === "ACE inhibitor");
      const statin = meds.find(m => m.class === "Statin");
      
      if (lithium) {
        const correctAnswer = "Regular blood level monitoring required - narrow therapeutic window";
        const options = [
          correctAnswer,
          "No monitoring required",
          "Only check once yearly",
          "Self-monitoring at home is sufficient"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "What is important to know about Lithium therapy?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: "Lithium has a narrow therapeutic window and requires regular blood monitoring. Toxicity can occur with dehydration, NSAIDs, or renal impairment."
        });
      } else if (digoxin) {
        const correctAnswer = "Check heart rate - can cause dangerous bradycardia";
        const options = [
          correctAnswer,
          "Check temperature only",
          "Check blood pressure only",
          "No monitoring needed"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "What must you monitor in a patient taking Digoxin?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: "Digoxin slows the heart rate. Always check pulse - if <60 bpm, withhold the dose and seek medical advice. Digoxin toxicity causes bradycardia, nausea, and visual disturbances."
        });
      } else if (warfarin) {
        const correctAnswer = "Regular INR monitoring to maintain therapeutic range";
        const options = [
          correctAnswer,
          "No monitoring required",
          "Only blood pressure checks",
          "Weekly liver function tests"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "Why does Warfarin require regular monitoring?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: "Warfarin dosing varies greatly between patients and is affected by diet and other medications. INR testing ensures adequate anticoagulation without excessive bleeding risk."
        });
      } else if (acei) {
        const correctAnswer = "Persistent dry cough is a common side effect";
        const options = [
          correctAnswer,
          "Cough always indicates chest infection",
          "Cough means allergic reaction",
          "ACE inhibitors never cause cough"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What should you know about ${acei.name} and respiratory symptoms?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Dry cough affects up to 10% of patients on ACE inhibitors like ${acei.name}. It is caused by increased bradykinin levels and may require switching to an ARB.`
        });
      } else if (statin) {
        const correctAnswer = "Muscle pain or weakness - may indicate rhabdomyolysis";
        const options = [
          correctAnswer,
          "No side effects to monitor",
          "Only check cholesterol levels",
          "Statins are completely safe"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What serious side effect should you watch for with ${statin.name}?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Statins like ${statin.name} can rarely cause muscle breakdown (rhabdomyolysis). Patients should report unexplained muscle pain, tenderness, or weakness immediately.`
        });
      }
    }
    
    // Question 14: Routes of administration and formulations
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const routeQuestions = [
        {
          question: `How is ${med.name} typically administered?`,
          correctAnswer: "Oral (by mouth)",
          options: ["Oral (by mouth)", "Intravenous only", "Intramuscular injection", "Topical application"],
          explanation: `${med.name} is typically taken orally as a tablet or capsule. Always check the prescription for specific instructions.`
        }
      ];
      
      const selected = routeQuestions[0];
      const shuffledOptions = [...selected.options].sort(() => Math.random() - 0.5);
      questions.push({
        question: selected.question,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(selected.correctAnswer),
        explanation: selected.explanation
      });
    }
    
    // Question 15: Contraindications and cautions
    if (meds.length > 0) {
      const nsaid = meds.find(m => m.class === "NSAID");
      const betaBlocker = meds.find(m => m.class === "Beta-blocker");
      const opioid = meds.find(m => m.class === "Opioid");
      const metformin = meds.find(m => m.name === "Metformin");
      
      if (nsaid) {
        const correctAnswer = "Caution in patients with kidney disease or history of GI bleeding";
        const options = [
          correctAnswer,
          "Safe for everyone",
          "Only avoid in pregnancy",
          "No special precautions needed"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What should you be cautious about when taking ${nsaid.name}?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `NSAIDs like ${nsaid.name} can damage the kidneys and cause gastric ulcers/bleeding. Use with caution in renal impairment, elderly patients, and those with GI history.`
        });
      } else if (betaBlocker) {
        const correctAnswer = "Should be used cautiously in asthma patients";
        const options = [
          correctAnswer,
          "Safe in all respiratory conditions",
          "Only avoid in diabetes",
          "No respiratory concerns"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What respiratory condition requires caution with ${betaBlocker.name}?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Beta-blockers like ${betaBlocker.name} can cause bronchospasm in asthma patients. Cardioselective beta-blockers are safer but still require caution.`
        });
      } else if (opioid) {
        const correctAnswer = "Risk of respiratory depression and constipation";
        const options = [
          correctAnswer,
          "No side effects",
          "Only causes headache",
          "Completely safe medication"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: `What are the main concerns with ${opioid.name}?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: `Opioids like ${opioid.name} can cause respiratory depression (especially in overdose), constipation, drowsiness, and dependence. Always monitor respiratory rate and prescribe laxatives.`
        });
      } else if (metformin) {
        const correctAnswer = "Should be stopped if patient is acutely unwell or dehydrated";
        const options = [
          correctAnswer,
          "Never stop under any circumstances",
          "Only stop if blood glucose is low",
          "No special considerations"
        ];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        questions.push({
          question: "What is important to know about Metformin in acute illness?",
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(correctAnswer),
          explanation: "Metformin should be temporarily stopped during acute illness, dehydration, or before contrast imaging due to risk of lactic acidosis, especially if renal function is impaired."
        });
      }
    }
    
    // Question 16: Additional indication questions for variety
    if (meds.length > 1) {
      const randomMed = meds[Math.floor(Math.random() * meds.length)];
      const alternatives = [
        "Pain relief", "High blood pressure", "Bacterial infection", "Type 2 diabetes",
        "Heart failure", "Depression", "Anxiety", "Constipation", "Acid reflux",
        "Thyroid disorder", "Blood clots", "Inflammation"
      ].filter(ind => ind !== randomMed.indication);
      
      const uniqueOptions = createUniqueOptions(randomMed.indication, alternatives);
      const shuffledOptions = [...uniqueOptions].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Which condition is ${randomMed.name} prescribed for?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(randomMed.indication),
        explanation: `${randomMed.name} is prescribed to treat ${randomMed.indication.toLowerCase()}.`
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
