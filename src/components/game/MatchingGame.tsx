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
    <div className="border-4 border-primary/40 p-6 pixel-text retro-shadow max-w-[95vw] overflow-y-auto max-h-[80vh] bg-card" style={{ width: "min(650px, 95vw)" }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-3 mb-4 bg-primary/5 p-3 rounded">
        <h2 className="font-bold text-card-foreground text-[12px] md:text-[14px]">
          🎯 DRUG MATCHING EXERCISE
        </h2>
        <div className="font-bold mt-2 text-card-foreground/80 text-[10px] md:text-[11px]">
          {selectedDrug 
            ? "✓ Now click the matching class or indication" 
            : "Click a medication, then click its matching class or indication"}
        </div>
        <div className="mt-1 text-primary font-bold text-[10px]">
          Progress: {completedPairs.length}/{targetCards.length} matched
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left column - Drug cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-card-foreground bg-primary/10 p-2 rounded text-[11px] md:text-[12px] mb-3 border-l-4 border-primary">
            💊 MEDICATIONS
          </h3>
          {drugCards.map((drug) => (
            <button
              key={drug.id}
              onClick={() => handleDrugClick(drug.id)}
              disabled={matchedDrugIds.has(drug.id)}
              className={`w-full p-4 border-2 rounded transition-all text-left ${
                matchedDrugIds.has(drug.id)
                  ? "border-success bg-success/10 opacity-70 cursor-not-allowed"
                  : selectedDrug === drug.id
                  ? "border-accent bg-accent/20 scale-[1.03] shadow-lg ring-2 ring-accent/60"
                  : "border-border bg-card hover:border-accent hover:bg-accent/5 hover:scale-[1.02] cursor-pointer"
              }`}
            >
              <div className="font-bold text-card-foreground text-[10px] md:text-[11px]">
                {matchedDrugIds.has(drug.id) ? "✓ " : ""}{drug.drugName}
              </div>
            </button>
          ))}
        </div>

        {/* Right column - Target cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-card-foreground bg-accent/10 p-2 rounded text-[11px] md:text-[12px] mb-3 border-l-4 border-accent">
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
                className={`w-full p-4 border-2 rounded min-h-[70px] transition-all text-left ${
                  isMatched
                    ? "border-success bg-success/10 cursor-not-allowed"
                    : selectedDrug
                    ? "border-accent bg-card border-dashed hover:bg-accent/10 hover:scale-[1.02] cursor-pointer shadow-sm"
                    : "border-border bg-muted/20 border-dashed cursor-not-allowed opacity-50"
                }`}
              >
                <div className="font-bold text-card-foreground mb-2 text-[10px] md:text-[11px]">
                  {target.content}
                </div>
                <div className="text-card-foreground/60 text-[9px] md:text-[10px]">
                  {target.type === "class" ? "📚 Drug Class" : "🎯 Indication"}
                </div>
                {isMatched && matchedDrug && (
                  <div className="mt-2 pt-2 border-t border-success/40">
                    <div className="text-success text-[9px] md:text-[10px] font-bold">
                      ✓ Matched: {matchedDrug.drugName}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      <div className="mt-6 pt-4 border-t-2 border-primary/30">
        <Button 
          onClick={handleComplete}
          disabled={!allMatched}
          className={`w-full font-bold border-2 retro-shadow transition-all text-[10px] md:text-[11px] py-4 ${
            allMatched
              ? "bg-success hover:bg-success/90 text-success-foreground border-success hover:scale-[1.02]"
              : "bg-muted/50 text-card-foreground/50 border-border cursor-not-allowed opacity-60"
          }`}
        >
          {allMatched ? "✓ COMPLETE MATCHING GAME" : `Match all to continue (${completedPairs.length}/${targetCards.length})`}
        </Button>
      </div>
    </div>
  );
};
