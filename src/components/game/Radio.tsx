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
      className="bg-radio-body border-4 border-muted p-6 rounded-sm retro-shadow pixel-text"
      style={{ width: "380px" }}
    >
      {/* Radio Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="text-radio-accent font-bold text-sm">AMBULANCE CONTROL</div>
        </div>
        <div className="text-xs text-muted-foreground">CH: 01</div>
      </div>

      {/* Display Screen */}
      <div className="bg-accent/10 border-2 border-accent/30 p-4 mb-4 min-h-[160px] font-mono text-sm leading-relaxed">
        {gameState === "idle" && (
          <div className="text-accent">
            &gt; STANDBY FOR JOB...<br/>
            &gt; PRESS START TO BEGIN
          </div>
        )}
        
        {gameState === "dispatch" && (
          <div className="text-accent animate-fade-in">
            &gt; NEW CALL RECEIVED<br/>
            &gt; {dispatchInfo}<br/>
            <br/>
            &gt; REVIEW PATIENT DOCUMENTS<br/>
            &gt; BEGIN ASSESSMENT WHEN READY
          </div>
        )}
        
        {gameState === "assessing" && (
          <div className="text-accent animate-fade-in">
            &gt; ON SCENE<br/>
            &gt; REVIEW MEDICATIONS<br/>
            &gt; COMPLETE ASSESSMENT FORM
          </div>
        )}
        
        {gameState === "quiz" && (
          <div className="text-accent animate-fade-in">
            &gt; ASSESSMENT IN PROGRESS<br/>
            &gt; ANSWER ALL QUESTIONS
          </div>
        )}
        
        {gameState === "complete" && (
          <div className="text-accent animate-fade-in">
            &gt; ASSESSMENT COMPLETE<br/>
            &gt; GOOD WORK!<br/>
            <br/>
            &gt; PRESS NEW CASE FOR NEXT JOB
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        {gameState === "idle" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/20"
          >
            START GAME
          </Button>
        )}
        
        {gameState === "dispatch" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/20"
          >
            BEGIN ASSESSMENT
          </Button>
        )}
        
        {gameState === "complete" && (
          <Button 
            onClick={onNewCase}
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/20"
          >
            NEW CASE
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
