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
    <div className="border-4 border-muted p-4 pixel-text retro-shadow max-w-[95vw] overflow-y-auto max-h-[80vh]" style={{ width: "min(600px, 95vw)", backgroundColor: "hsl(var(--background))" }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-2 mb-4 bg-primary/10">
        <h2 className="font-bold text-foreground text-[11px] md:text-[13px]">
          🎯 DRUG MATCHING EXERCISE
        </h2>
        <div className="font-bold mt-1 text-muted-foreground text-[9px] md:text-[10px]">
          {selectedDrug 
            ? "Now click the matching class or indication" 
            : "Click a medication, then click its matching class or indication"} | {completedPairs.length}/{targetCards.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column - Drug cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-primary text-[10px] md:text-[11px] mb-2 border-b border-primary pb-1">
            💊 MEDICATIONS
          </h3>
          {drugCards.map((drug) => (
            <button
              key={drug.id}
              onClick={() => handleDrugClick(drug.id)}
              disabled={matchedDrugIds.has(drug.id)}
              className={`w-full p-3 border-2 rounded transition-all text-left ${
                matchedDrugIds.has(drug.id)
                  ? "border-success bg-success/20 opacity-60 cursor-not-allowed"
                  : selectedDrug === drug.id
                  ? "border-accent bg-accent/30 scale-105 shadow-lg ring-2 ring-accent/50"
                  : "border-muted bg-card hover:border-primary hover:bg-primary/10 hover:scale-102 cursor-pointer"
              }`}
              style={{ fontSize: "9px" }}
            >
              <div className="font-bold text-foreground">
                {matchedDrugIds.has(drug.id) ? "✓ " : ""}{drug.drugName}
              </div>
            </button>
          ))}
        </div>

        {/* Right column - Target cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-primary text-[10px] md:text-[11px] mb-2 border-b border-primary pb-1">
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
                className={`w-full p-3 border-2 rounded min-h-[60px] transition-all text-left ${
                  isMatched
                    ? "border-success bg-success/20 cursor-not-allowed"
                    : selectedDrug
                    ? "border-accent bg-accent/10 border-dashed hover:bg-accent/20 hover:scale-102 cursor-pointer"
                    : "border-muted bg-muted/10 border-dashed cursor-not-allowed opacity-60"
                }`}
                style={{ fontSize: "9px" }}
              >
                <div className="font-bold text-foreground mb-1">
                  {target.content}
                </div>
                <div className="text-muted-foreground text-[8px]">
                  {target.type === "class" ? "📚 Drug Class" : "🎯 Indication"}
                </div>
                {isMatched && matchedDrug && (
                  <div className="mt-2 pt-2 border-t border-success/30">
                    <div className="text-success text-[8px] font-bold">
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
      <div className="mt-4 pt-4 border-t-2 border-primary">
        <Button 
          onClick={handleComplete}
          disabled={!allMatched}
          className={`w-full font-bold border-2 retro-shadow transition-all text-[9px] md:text-[10px] py-3 ${
            allMatched
              ? "bg-success hover:bg-success/90 text-success-foreground border-success-foreground/30 hover:scale-105"
              : "bg-muted text-muted-foreground border-muted-foreground/30 cursor-not-allowed opacity-60"
          }`}
        >
          {allMatched ? "✓ COMPLETE MATCHING" : `MATCH ALL MEDICATIONS (${completedPairs.length}/${targetCards.length})`}
        </Button>
      </div>
    </div>
  );
};
