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
    <div className="border-4 border-primary bg-background max-w-full overflow-hidden retro-shadow" style={{ width: "min(600px, 95vw)", maxHeight: "75vh" }}>
      {/* Retro Header */}
      <div className="bg-primary px-4 py-2 border-b-4 border-primary-foreground/20">
        <div className="flex justify-between items-center">
          <h2 className="pixel-text font-bold text-primary-foreground text-[11px] md:text-[12px] tracking-wider">
            💊 MEDICATION MATCHING
          </h2>
          <div className="pixel-text text-primary-foreground text-[9px] font-bold bg-primary-foreground/20 px-2 py-1 border-2 border-primary-foreground/40">
            {completedPairs.length}/{targetCards.length}
          </div>
        </div>
      </div>

      {/* Instructions Panel */}
      <div className="bg-accent/10 border-b-2 border-accent/30 px-3 py-2">
        <p className="pixel-text text-foreground text-[8px] md:text-[9px] leading-relaxed">
          {selectedDrug 
            ? "✓ MEDICATION SELECTED - Now click its matching class or indication →" 
            : "◉ INSTRUCTIONS: Select a medication, then click the correct match"}
        </p>
      </div>

      {/* Main Game Area */}
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: "48vh" }}>
          {/* Left Panel - Medications */}
          <div className="space-y-2">
            <div className="bg-primary/20 border-2 border-primary/50 px-2 py-1.5 mb-2 retro-shadow">
              <h3 className="pixel-text font-bold text-foreground text-[9px] md:text-[10px] tracking-wide flex items-center gap-2">
                <span className="text-primary">▸</span> MEDICATIONS
              </h3>
            </div>
            <div className="space-y-2">
              {drugCards.map((drug) => {
                const isMatched = matchedDrugIds.has(drug.id);
                const isSelected = selectedDrug === drug.id;
                
                return (
                  <button
                    key={drug.id}
                    onClick={() => handleDrugClick(drug.id)}
                    disabled={isMatched}
                    className={`w-full px-3 py-2.5 border-3 transition-all text-left pixel-text text-[8px] md:text-[9px] relative ${
                      isMatched
                        ? "border-success bg-success/20 cursor-not-allowed opacity-70"
                        : isSelected
                        ? "border-accent bg-accent/25 scale-[1.02] retro-shadow ring-2 ring-accent/60 animate-pulse"
                        : "border-border bg-card hover:border-accent/70 hover:bg-accent/10 hover:scale-[1.01] cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className={`font-bold ${isMatched ? "text-success-foreground" : isSelected ? "text-accent-foreground" : "text-card-foreground"}`}>
                          {isMatched && <span className="mr-1">✓</span>}
                          {isSelected && <span className="mr-1 text-accent">►</span>}
                          {drug.drugName}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-accent border-b-[6px] border-b-transparent animate-pulse"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Targets */}
          <div className="space-y-2">
            <div className="bg-accent/20 border-2 border-accent/60 px-2 py-1.5 mb-2 retro-shadow">
              <h3 className="pixel-text font-bold text-foreground text-[9px] md:text-[10px] tracking-wide flex items-center gap-2">
                <span className="text-accent">▸</span> MATCH TO
              </h3>
            </div>
            <div className="space-y-2">
              {targetCards.map((target) => {
                const isMatched = completedPairs.includes(target.id);
                const matchedDrugId = matches[target.id];
                const matchedDrug = drugCards.find(d => d.id === matchedDrugId);
                const isAvailable = selectedDrug && !isMatched;

                return (
                  <button
                    key={target.id}
                    onClick={() => handleTargetClick(target.id)}
                    disabled={isMatched || !selectedDrug}
                    className={`w-full px-3 py-2.5 border-3 min-h-[52px] transition-all text-left pixel-text text-[8px] md:text-[9px] ${
                      isMatched
                        ? "border-success bg-success/20 cursor-not-allowed"
                        : isAvailable
                        ? "border-accent/70 bg-card border-dashed hover:bg-accent/15 hover:border-accent cursor-pointer hover:scale-[1.01]"
                        : "border-border/30 bg-muted/20 border-dashed cursor-not-allowed opacity-50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className={`font-bold ${isMatched ? "text-success-foreground" : "text-card-foreground"}`}>
                        {target.content}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[7px] md:text-[8px] px-1.5 py-0.5 border ${
                          target.type === "class" 
                            ? "border-primary/50 bg-primary/10 text-primary" 
                            : "border-accent/50 bg-accent/10 text-accent"
                        }`}>
                          {target.type === "class" ? "📚 CLASS" : "🎯 USE"}
                        </span>
                      </div>
                      {isMatched && matchedDrug && (
                        <div className="mt-2 pt-2 border-t-2 border-success/30">
                          <div className="text-success-foreground text-[7px] md:text-[8px] font-bold flex items-center gap-1">
                            <span className="text-success">✓</span>
                            {matchedDrug.drugName}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Complete Button */}
      <div className="border-t-4 border-primary/30 bg-background p-3">
        <Button 
          onClick={handleComplete}
          disabled={!allMatched}
          className={`w-full pixel-text font-bold border-3 transition-all text-[9px] md:text-[10px] py-3 tracking-wider ${
            allMatched
              ? "bg-success hover:bg-success/90 text-success-foreground border-success-foreground/50 retro-shadow hover:scale-[1.02] animate-pulse"
              : "bg-muted/40 text-foreground/40 border-border cursor-not-allowed opacity-50"
          }`}
        >
          {allMatched ? "✓✓✓ COMPLETE MATCHING ✓✓✓" : `MATCH ALL PAIRS (${completedPairs.length}/${targetCards.length})`}
        </Button>
      </div>
    </div>
  );
};
