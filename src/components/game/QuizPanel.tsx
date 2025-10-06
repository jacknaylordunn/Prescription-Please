import { useState } from "react";
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

    // Question 3: Time-critical medications
    const timeCriticalMeds = meds.filter(m => m.timeCritical);
    if (timeCriticalMeds.length > 0) {
      const med = timeCriticalMeds[0];
      const correctAnswer = med.name;
      const options = [
        correctAnswer,
        "Paracetamol",
        "Vitamin D",
        "Lactulose"
      ];
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      questions.push({
        question: "Which of these medications is time-critical?",
        options: shuffledOptions,
        correctAnswer: shuffledOptions.indexOf(correctAnswer),
        explanation: `${med.name} is time-critical for managing ${med.indication.toLowerCase()}.`
      });
    }

    // Question 4: Indication
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

    // Question 5: Category-based question
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

    // Question 6: Anticoagulation
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

    // Question 7: Condition inference
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

    return questions.slice(0, 6); // Return up to 6 questions
  };

  const questions = generateQuestions();

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
    <div className="border-4 border-accent p-4 pixel-text document-shadow" style={{ width: "380px", backgroundColor: "hsl(142, 76%, 88%)" }}>
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
