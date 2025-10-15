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
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
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

  const handleDragStart = (drugId: string) => {
    setDraggedItem(drugId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem) return;

    const target = targetCards.find(t => t.id === targetId);
    if (!target) return;

    // Check if correct
    const isCorrect = target.correctDrugId === draggedItem;

    if (isCorrect) {
      setMatches(prev => ({ ...prev, [targetId]: draggedItem }));
      setCompletedPairs(prev => [...prev, targetId]);
      
      const drugName = drugCards.find(d => d.id === draggedItem)?.drugName;
      toast.success(`✓ Correct! ${drugName} matches ${target.content}`, {
        duration: 2000,
        style: { background: "hsl(142, 76%, 36%)", color: "white" }
      });
    } else {
      const drugName = drugCards.find(d => d.id === draggedItem)?.drugName;
      toast.error(`✗ Incorrect. ${drugName} doesn't match ${target.content}`, {
        duration: 2000,
        style: { background: "hsl(0, 84%, 60%)", color: "white" }
      });
    }

    setDraggedItem(null);
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
    <div className="border-4 border-muted p-4 pixel-text retro-shadow max-w-[95vw] overflow-y-auto max-h-[80vh]" style={{ width: "min(600px, 95vw)", backgroundColor: "hsl(240, 10%, 25%)" }}>
      {/* Header */}
      <div className="border-b-2 border-primary pb-2 mb-4 bg-primary/20">
        <h2 className="font-bold text-radio-text text-[11px] md:text-[13px]">
          DRUG MATCHING EXERCISE
        </h2>
        <div className="font-bold mt-1 text-radio-text opacity-80 text-[9px] md:text-[10px]">
          Drag each drug to its matching class or indication | {completedPairs.length}/{targetCards.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column - Drug cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-radio-accent text-[10px] md:text-[11px] mb-2 border-b border-primary pb-1">
            MEDICATIONS
          </h3>
          {drugCards.map((drug) => (
            <div
              key={drug.id}
              draggable={!matchedDrugIds.has(drug.id)}
              onDragStart={() => handleDragStart(drug.id)}
              className={`p-3 border-2 rounded cursor-move transition-all ${
                matchedDrugIds.has(drug.id)
                  ? "border-accent bg-accent/30 opacity-60 cursor-not-allowed"
                  : draggedItem === drug.id
                  ? "border-accent bg-accent/20 scale-105"
                  : "border-muted bg-background/50 hover:border-accent hover:bg-accent/10 hover:scale-102"
              }`}
              style={{ fontSize: "9px" }}
            >
              <div className="font-bold text-radio-text">
                {drug.drugName}
              </div>
            </div>
          ))}
        </div>

        {/* Right column - Target cards */}
        <div className="space-y-2">
          <h3 className="font-bold text-radio-accent text-[10px] md:text-[11px] mb-2 border-b border-primary pb-1">
            MATCH TO
          </h3>
          {targetCards.map((target) => {
            const isMatched = completedPairs.includes(target.id);
            const matchedDrugId = matches[target.id];
            const matchedDrug = drugCards.find(d => d.id === matchedDrugId);

            return (
              <div
                key={target.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(target.id)}
                className={`p-3 border-2 rounded min-h-[60px] transition-all ${
                  isMatched
                    ? "border-accent bg-accent/30"
                    : "border-primary bg-primary/10 border-dashed"
                }`}
                style={{ fontSize: "9px" }}
              >
                <div className="font-bold text-radio-text mb-1">
                  {target.content}
                </div>
                <div className="text-radio-accent text-[8px]">
                  ({target.type === "class" ? "Drug Class" : "Indication"})
                </div>
                {isMatched && matchedDrug && (
                  <div className="mt-2 pt-2 border-t border-accent/30">
                    <div className="text-accent text-[8px] font-bold">
                      ✓ {matchedDrug.drugName}
                    </div>
                  </div>
                )}
              </div>
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
              ? "bg-accent hover:bg-accent/90 text-accent-foreground border-accent-foreground/30 hover:scale-105"
              : "bg-muted text-muted-foreground border-muted-foreground/30 cursor-not-allowed opacity-60"
          }`}
        >
          {allMatched ? "► COMPLETE MATCHING" : `► COMPLETE (${completedPairs.length}/${targetCards.length} matched)`}
        </Button>
      </div>
    </div>
  );
};
