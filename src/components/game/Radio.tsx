import { Button } from "@/components/ui/button";

interface RadioProps {
  dispatchInfo: string;
  onStartAssessment: () => void;
  onNewCase: () => void;
  gameState: "idle" | "dispatch" | "assessing" | "quiz" | "complete";
}

export const Radio = ({ dispatchInfo, onStartAssessment, onNewCase, gameState }: RadioProps) => {
  return (
    <div 
      className="border-4 border-muted p-4 rounded-sm retro-shadow pixel-text animate-scale-in"
      style={{ width: "320px", backgroundColor: "hsl(240, 10%, 25%)" }}
    >
      {/* Radio Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-muted">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          <div className="text-radio-accent font-bold" style={{ fontSize: "11px" }}>AMBULANCE CONTROL</div>
        </div>
        <div className="text-xs text-radio-text opacity-60">CH: 01</div>
      </div>

      {/* Display Screen */}
      <div className="bg-accent/20 border-4 border-accent p-3 mb-3 min-h-[140px] font-mono leading-relaxed retro-shadow" style={{ fontSize: "9px" }}>
        {gameState === "idle" && (
          <div className="text-accent-foreground font-bold">
            &gt; STANDBY FOR JOB...<br/>
            &gt; <span className="animate-pulse">PRESS START TO BEGIN</span>
          </div>
        )}
        
        {gameState === "dispatch" && (
          <div className="text-accent-foreground font-bold animate-fade-in">
            &gt; *** NEW CALL RECEIVED ***<br/>
            &gt; {dispatchInfo}<br/>
            <br/>
            &gt; REVIEW PATIENT DOCUMENTS<br/>
            &gt; <span className="text-accent animate-pulse">BEGIN ASSESSMENT WHEN READY</span>
          </div>
        )}
        
        {gameState === "assessing" && (
          <div className="text-accent-foreground font-bold animate-fade-in">
            &gt; ON SCENE<br/>
            &gt; REVIEW MEDICATIONS<br/>
            &gt; COMPLETE ASSESSMENT FORM
          </div>
        )}
        
        {gameState === "quiz" && (
          <div className="text-accent-foreground font-bold animate-fade-in">
            &gt; *** ASSESSMENT IN PROGRESS ***<br/>
            &gt; ANSWER ALL QUESTIONS<br/>
            &gt; <span className="text-accent animate-pulse">KNOWLEDGE CHECK</span>
          </div>
        )}
        
        {gameState === "complete" && (
          <div className="text-accent-foreground font-bold animate-fade-in">
            &gt; *** ASSESSMENT COMPLETE ***<br/>
            &gt; <span className="text-accent">GOOD WORK!</span><br/>
            <br/>
            &gt; <span className="animate-pulse">PRESS NEW CASE FOR NEXT JOB</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        {gameState === "idle" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-4 border-accent-foreground/30 retro-shadow hover:scale-105 transition-transform"
            style={{ fontSize: "10px", padding: "10px" }}
          >
            ► START GAME
          </Button>
        )}
        
        {gameState === "dispatch" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-4 border-accent-foreground/30 retro-shadow hover:scale-105 transition-transform animate-pulse"
            style={{ fontSize: "10px", padding: "10px" }}
          >
            ► BEGIN ASSESSMENT
          </Button>
        )}
        
        {gameState === "complete" && (
          <Button 
            onClick={onNewCase}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-4 border-accent-foreground/30 retro-shadow hover:scale-105 transition-transform"
            style={{ fontSize: "10px", padding: "10px" }}
          >
            ► NEW CASE
          </Button>
        )}
      </div>

      {/* Speaker Grille */}
      <div className="mt-4 pt-4 border-t border-muted">
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-1 bg-muted/30 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
