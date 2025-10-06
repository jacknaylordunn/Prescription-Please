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
      questions.push({
        question: `What drug class does ${med.name} belong to?`,
        options: [
          med.class,
          "Beta-blocker",
          "Calcium channel blocker",
          "Proton pump inhibitor"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${med.name} is a ${med.class}.`
      });
    }

    // Question 2: Side effects
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      const correctSideEffect = med.sideEffects[0];
      questions.push({
        question: `Which is a common side effect of ${med.name}?`,
        options: [
          correctSideEffect,
          "Hair loss",
          "Increased appetite",
          "Blurred vision"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${med.name} commonly causes ${correctSideEffect.toLowerCase()}.`
      });
    }

    // Question 3: Time-critical medications
    const timeCriticalMeds = meds.filter(m => m.timeCritical);
    if (timeCriticalMeds.length > 0) {
      const med = timeCriticalMeds[0];
      questions.push({
        question: "Which of these medications is time-critical?",
        options: [
          med.name,
          "Paracetamol",
          "Vitamin D",
          "Lactulose"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${med.name} is time-critical for managing ${med.indication.toLowerCase()}.`
      });
    }

    // Question 4: Indication
    if (meds.length > 0) {
      const med = meds[Math.floor(Math.random() * meds.length)];
      questions.push({
        question: `What is ${med.name} primarily used for?`,
        options: [
          med.indication,
          "Headache",
          "Insomnia",
          "Fever"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${med.name} is used for ${med.indication.toLowerCase()}.`
      });
    }

    // Question 5: Category-based question
    const diuretics = meds.filter(m => m.category === "Diuretic");
    if (diuretics.length > 0) {
      questions.push({
        question: "Which medication would have a diuretic effect?",
        options: [
          diuretics[0].name,
          "Amoxicillin",
          "Paracetamol",
          "Omeprazole"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${diuretics[0].name} is a ${diuretics[0].class}, which increases urine production.`
      });
    }

    // Question 6: Anticoagulation
    const anticoagulants = meds.filter(m => m.category === "Anticoagulant");
    if (anticoagulants.length > 0) {
      questions.push({
        question: "Which medication increases bleeding risk?",
        options: [
          anticoagulants[0].name,
          "Paracetamol",
          "Amoxicillin",
          "Omeprazole"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
        explanation: `${anticoagulants[0].name} is an anticoagulant and significantly increases bleeding risk.`
      });
    }

    // Question 7: Condition inference
    if (scenario.patient.medicalHistory.length > 0) {
      const condition = scenario.patient.medicalHistory[0];
      questions.push({
        question: `Based on the prescription, what condition does the patient likely have?`,
        options: [
          condition,
          "Migraine",
          "Asthma",
          "Gout"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0,
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

    const isCorrect = questions[currentQuestion].options[answerIndex] === 
                     questions[currentQuestion].options[questions[currentQuestion].correctAnswer];

    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! " + questions[currentQuestion].explanation);
    } else {
      toast.error("Incorrect. " + questions[currentQuestion].explanation);
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
    <div className="paper-texture border-4 border-paper-border p-6 pixel-text" style={{ width: "500px" }}>
      {/* Header */}
      <div className="border-b-2 border-paper-border pb-3 mb-4">
        <h2 className="text-xl font-bold text-paper-text">PATIENT ASSESSMENT</h2>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length} | Score: {score}/{questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg font-bold mb-4 text-paper-text">
          {questions[currentQuestion].question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full p-3 text-left border-2 transition-all ${
                answered
                  ? selectedAnswer === idx
                    ? option === questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
                      ? "border-accent bg-accent/20"
                      : "border-destructive bg-destructive/20"
                    : option === questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
                    ? "border-accent bg-accent/10"
                    : "border-paper-border"
                  : "border-paper-border hover:border-accent hover:bg-accent/5"
              }`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {answered && (
        <Button 
          onClick={handleNext}
          className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold"
        >
          {currentQuestion < questions.length - 1 ? "NEXT QUESTION" : "COMPLETE ASSESSMENT"}
        </Button>
      )}
    </div>
  );
};
