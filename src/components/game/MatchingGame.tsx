import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Scenario } from "@/data/scenarios";
import { toast } from "sonner";

interface MatchingGameProps {
  scenario: Scenario;
  onComplete: () => void;
}

interface DrugCard {
  id: string;
  drugName: string;
}

interface TargetCard {
  id: string;
  content: string;
  correctDrugId: string;
  type: "class" | "indication";
}

export const MatchingGame = ({ scenario, onComplete }: MatchingGameProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<string[]>([]);

  // Generate matching pairs from medications
  const { drugCards, targetCards } = useMemo(() => {
    const meds = scenario.prescriptions.map(p => p.medication);
    const drugs: DrugCard[] = [];
    const targets: TargetCard[] = [];

    // Create drug cards and target cards
    meds.forEach((med, index) => {
      const drugId = `drug-${index}`;
      drugs.push({
        id: drugId,
        drugName: med.name
      });

      // Randomly choose between class or indication
      if (Math.random() > 0.5) {
        targets.push({
          id: `target-${index}`,
          content: med.class,
          correctDrugId: drugId,
          type: "class"
        });
      } else {
        targets.push({
          id: `target-${index}`,
          content: med.indication,
          correctDrugId: drugId,
          type: "indication"
        });
      }
    });

    // Shuffle both arrays
    const shuffledDrugs = [...drugs].sort(() => Math.random() - 0.5);
    const shuffledTargets = [...targets].sort(() => Math.random() - 0.5);

    return { drugCards: shuffledDrugs, targetCards: shuffledTargets };
  }, [scenario]);

  const handleDrugClick = (drugId: string) => {
    if (matchedDrugIds.has(drugId)) return;
    setSelectedDrug(drugId);
  };

  const handleTargetClick = (targetId: string) => {
    if (!selectedDrug || completedPairs.includes(targetId)) return;

    const target = targetCards.find(t => t.id === targetId);
    if (!target) return;

    // Check if correct
    const isCorrect = target.correctDrugId === selectedDrug;

    if (isCorrect) {
      setMatches(prev => ({ ...prev, [targetId]: selectedDrug }));
      setCompletedPairs(prev => [...prev, targetId]);
      
      const drugName = drugCards.find(d => d.id === selectedDrug)?.drugName;
      toast.success(`✓ Correct! ${drugName} matches ${target.content}`, {
        duration: 2000,
        style: { background: "hsl(var(--success))", color: "hsl(var(--success-foreground))" }
      });
      setSelectedDrug(null);
    } else {
      const drugName = drugCards.find(d => d.id === selectedDrug)?.drugName;
      toast.error(`✗ Incorrect. ${drugName} doesn't match ${target.content}`, {
        duration: 2000,
        style: { background: "hsl(var(--destructive))", color: "hsl(var(--destructive-foreground))" }
      });
    }
  };

  const handleComplete = () => {
    const score = completedPairs.length;
    const total = targetCards.length;
    toast.success(`Matching complete! Score: ${score}/${total}`, {
      duration: 3000,
    });
    onComplete();
  };

  const allMatched = completedPairs.length === targetCards.length;
  const matchedDrugIds = new Set(Object.values(matches));

  return (
    <div className="border-4 border-border p-3 pixel-text retro-shadow bg-background max-w-full overflow-hidden" style={{ width: "min(550px, 95vw)", maxHeight: "70vh" }}>
      {/* Header */}
      <div className="border-b-2 border-muted pb-2 mb-3">
        <h2 className="font-bold text-foreground text-[10px] md:text-[11px]">
          🎯 DRUG MATCHING EXERCISE
        </h2>
        <div className="mt-1 text-foreground/70 text-[8px] md:text-[9px]">
          {selectedDrug 
            ? "✓ Now click the matching class/indication" 
            : "Click a medication, then its match"}
        </div>
        <div className="mt-1 text-accent font-bold text-[8px]">
          {completedPairs.length}/{targetCards.length} matched
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto" style={{ maxHeight: "50vh" }}>
        {/* Left column - Drug cards */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-foreground bg-muted/30 px-2 py-1 rounded text-[9px] mb-2 border-l-2 border-accent">
            💊 MEDICATIONS
          </h3>
          {drugCards.map((drug) => (
            <button
              key={drug.id}
              onClick={() => handleDrugClick(drug.id)}
              disabled={matchedDrugIds.has(drug.id)}
              className={`w-full px-2 py-2 border-2 rounded transition-all text-left text-[8px] md:text-[9px] ${
                matchedDrugIds.has(drug.id)
                  ? "border-success/60 bg-success/15 opacity-70 cursor-not-allowed text-foreground/80"
                  : selectedDrug === drug.id
                  ? "border-accent bg-accent/30 scale-[1.02] shadow-md ring-1 ring-accent/50 text-foreground"
                  : "border-border bg-background hover:border-accent/70 hover:bg-accent/10 cursor-pointer text-foreground"
              }`}
            >
              <div className="font-bold">
                {matchedDrugIds.has(drug.id) ? "✓ " : ""}{drug.drugName}
              </div>
            </button>
          ))}
        </div>

        {/* Right column - Target cards */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-foreground bg-muted/30 px-2 py-1 rounded text-[9px] mb-2 border-l-2 border-accent">
            🎯 MATCH TO
          </h3>
          {targetCards.map((target) => {
            const isMatched = completedPairs.includes(target.id);
            const matchedDrugId = matches[target.id];
            const matchedDrug = drugCards.find(d => d.id === matchedDrugId);

            return (
              <button
                key={target.id}
                onClick={() => handleTargetClick(target.id)}
                disabled={isMatched || !selectedDrug}
                className={`w-full px-2 py-2 border-2 rounded min-h-[45px] transition-all text-left text-[8px] md:text-[9px] ${
                  isMatched
                    ? "border-success/60 bg-success/15 cursor-not-allowed text-foreground/80"
                    : selectedDrug
                    ? "border-accent/70 bg-background border-dashed hover:bg-accent/10 cursor-pointer text-foreground"
                    : "border-border/40 bg-background/50 border-dashed cursor-not-allowed opacity-40 text-foreground/50"
                }`}
              >
                <div className="font-bold mb-1">
                  {target.content}
                </div>
                <div className="text-foreground/60 text-[7px] md:text-[8px]">
                  {target.type === "class" ? "📚 Class" : "🎯 Use"}
                </div>
                {isMatched && matchedDrug && (
                  <div className="mt-1 pt-1 border-t border-success/40">
                    <div className="text-success text-[7px] md:text-[8px] font-bold">
                      ✓ {matchedDrug.drugName}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      <div className="mt-3 pt-2 border-t-2 border-muted">
        <Button 
          onClick={handleComplete}
          disabled={!allMatched}
          className={`w-full font-bold border-2 retro-shadow transition-all text-[8px] md:text-[9px] py-2 ${
            allMatched
              ? "bg-success hover:bg-success/90 text-success-foreground border-success hover:scale-[1.01]"
              : "bg-muted/30 text-foreground/40 border-border cursor-not-allowed opacity-50"
          }`}
        >
          {allMatched ? "✓ COMPLETE" : `MATCH ALL (${completedPairs.length}/${targetCards.length})`}
        </Button>
      </div>
    </div>
  );
};
