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

  // Generate questions based on the scenario
  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];
    const meds = scenario.prescriptions.map(p => p.medication);

    // Question 1: Drug class identification
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctAnswer = med.class;
      const options = [
        correctAnswer,
        "Beta-blocker",
        "Calcium channel blocker",
        "Proton pump inhibitor"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: `What drug class does ${med.name} belong to?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${med.name} is a ${med.class}.`
      });
    }

    // Question 2: Side effects
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctSideEffect = med.sideEffects[0];
      const options = [
        correctSideEffect,
        "Hair loss",
        "Increased appetite",
        "Blurred vision"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Which is a common side effect of ${med.name}?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctSideEffect),
        explanation: `${med.name} commonly causes ${correctSideEffect.toLowerCase()}.`
      });
    }

    // Question 3: Time-critical medications - MISSED mnemonic
    const timeCriticalMeds = meds.filter(m => m.timeCritical);
    if (timeCriticalMeds.length > 0) {
      const med = timeCriticalMeds[0];
      const questionTypes = [
        {
          question: "Which of these medications is time-critical and must be taken to hospital?",
          correctAnswer: med.name,
          options: [med.name, "Paracetamol", "Vitamin D", "Lactulose"],
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
        const options = [
          missedCategory,
          "Movement disorders",
          "Epilepsy - anticonvulsants",
          "Sugar - diabetes medication"
        ];
        const uniqueOptions = [...new Set(options)];
        if (uniqueOptions.length < 4) {
          uniqueOptions.push("Immunomodulators", "Steroids", "Anticoagulants");
        }
        const shuffledOptions = uniqueOptions.slice(0, 4).sort(() => Math.random() - 0.5);
        questions.push({
          question: `${med.name} belongs to which category of the MISSED mnemonic for time-critical medications?`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(missedCategory),
          explanation: `${med.name} is part of "${missedCategory}" in the MISSED mnemonic. A missed dose can cause rapid deterioration in these patients.`
        });
      }
    }

    // Question 5: Indication
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctAnswer = med.indication;
      const options = [
        correctAnswer,
        "Headache",
        "Insomnia",
        "Fever"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: `What is ${med.name} primarily used for?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${med.name} is used for ${med.indication.toLowerCase()}.`
      });
    }

    // Question 6: Category-based question
    const diuretics = meds.filter(m => m.category === "Diuretic");
    if (diuretics.length > 0) {
      const correctAnswer = diuretics[0].name;
      const options = [
        correctAnswer,
        "Amoxicillin",
        "Paracetamol",
        "Omeprazole"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Which medication would have a diuretic effect?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${diuretics[0].name} is a ${diuretics[0].class}, which increases urine production.`
      });
    }

    // Question 7: Anticoagulation
    const anticoagulants = meds.filter(m => m.category === "Anticoagulant");
    if (anticoagulants.length > 0) {
      const correctAnswer = anticoagulants[0].name;
      const options = [
        correctAnswer,
        "Paracetamol",
        "Amoxicillin",
        "Omeprazole"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Which medication increases bleeding risk?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${anticoagulants[0].name} is an anticoagulant and significantly increases bleeding risk.`
      });
    }

    // Question 8: Condition inference
    if (scenario.patient.medicalHistory.length > 0) {
      const condition = scenario.patient.medicalHistory[0];
      const correctAnswer = condition;
      const options = [
        correctAnswer,
        "Migraine",
        "Asthma",
        "Gout"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: `Based on the prescription, what condition does the patient likely have?`,
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `The combination of medications suggests ${condition.toLowerCase()}.`
      });
    }

    return questions.slice(0, 7); // Return up to 7 questions
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
      toast.success(`Assessment complete! Score: ${score + 1}/${questions.length}`);
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
    <div className="border-4 border-accent p-4 pixel-text document-shadow" style={{ width: "380px", backgroundColor: "hsl(35, 25%, 75%)" }}>
      {/* Header */}
      <div className="border-b-2 border-accent pb-2 mb-3 bg-accent/20">
        <h2 className="font-bold" style={{ fontSize: "11px", color: "#000" }}>
          PATIENT ASSESSMENT
        </h2>
        <div className="font-bold mt-1" style={{ fontSize: "9px", color: "#000" }}>
          Q{currentQuestion + 1}/{questions.length} | Score: {score}/{questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <div className="bg-card border-2 border-paper-border p-3 mb-3">
          <p className="font-bold" style={{ fontSize: "10px", lineHeight: "1.5", color: "#000" }}>
            {questions[currentQuestion].question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full p-2 text-left border-2 transition-all font-bold ${
                answered
                  ? selectedAnswer === idx
                    ? idx === questions[currentQuestion].correctAnswer
                      ? "border-accent bg-accent/30 retro-shadow"
                      : "border-destructive bg-destructive/30 retro-shadow"
                    : idx === questions[currentQuestion].correctAnswer
                    ? "border-accent bg-accent/20"
                    : "border-paper-border bg-card opacity-60"
                  : "border-paper-border hover:border-accent hover:bg-accent/10 hover:scale-102 bg-card"
              }`}
              style={{ fontSize: "9px", lineHeight: "1.4", color: "#000" }}
            >
              <span className="font-bold mr-2 text-accent">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {answered && (
        <Button 
          onClick={handleNext}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold border-2 border-accent-foreground/30 retro-shadow hover:scale-105 transition-transform"
          style={{ fontSize: "9px", padding: "10px" }}
        >
          {currentQuestion < questions.length - 1 ? "► NEXT" : "► COMPLETE"}
        </Button>
      )}
    </div>
  );
};
