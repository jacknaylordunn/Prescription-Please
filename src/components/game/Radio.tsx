import { Button } from "@/components/ui/button";

interface RadioProps {
  dispatchInfo: string;
  onStartAssessment: () => void;
  onNewCase: () => void;
  gameState: "idle" | "dispatch" | "assessing" | "quiz" | "matching" | "complete";
}

export const Radio = ({ dispatchInfo, onStartAssessment, onNewCase, gameState }: RadioProps) => {
  return (
    <div 
      className="border-4 border-foreground/80 rounded-sm retro-shadow pixel-text animate-scale-in relative"
      style={{ 
        width: "240px",
        backgroundColor: "hsl(240, 8%, 22%)",
        boxShadow: "8px 8px 0px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)"
      }}
    >

      {/* Header Bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b-2 border-foreground/40"
        style={{ backgroundColor: "hsl(240, 8%, 18%)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse border border-red-700"></div>
          <div className="text-accent-foreground font-bold tracking-wider" style={{ fontSize: "9px" }}>
            CONTROL
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-bold" style={{ fontSize: "8px" }}>
          CH:01
        </div>
      </div>

      {/* Display Screen */}
      <div className="p-3">
        <div 
          className="border-4 border-accent/60 p-3 min-h-[130px] font-mono leading-relaxed"
          style={{ 
            fontSize: "8.5px",
            backgroundColor: "hsl(210, 30%, 8%)",
            boxShadow: "inset 0 0 20px rgba(0,100,150,0.3), inset 4px 4px 8px rgba(0,0,0,0.5)"
          }}
        >
          {gameState === "idle" && (
            <div className="text-accent-foreground font-bold">
              &gt; STANDBY FOR DISPATCH<br/>
              &gt; <span className="animate-pulse text-accent">█ PRESS START</span>
            </div>
          )}
          
          {gameState === "dispatch" && (
            <div className="text-accent-foreground font-bold animate-fade-in">
              &gt; *** NEW CALL ***<br/>
              <span className="text-base">&gt; {dispatchInfo}</span><br/>
              <br/>
              &gt; REVIEW DOCUMENTS<br/>
              &gt; <span className="text-accent animate-pulse">█ BEGIN ASSESSMENT</span>
            </div>
          )}
          
          {gameState === "assessing" && (
            <div className="text-accent-foreground font-bold animate-fade-in">
              &gt; ON SCENE<br/>
              &gt; REVIEW MEDICATIONS<br/>
              &gt; COMPLETE FORM
            </div>
          )}
          
          {gameState === "quiz" && (
            <div className="text-accent-foreground font-bold animate-fade-in">
              &gt; *** ASSESSMENT ***<br/>
              <span className="text-base">&gt; {dispatchInfo}</span><br/>
              <br/>
              &gt; <span className="text-accent animate-pulse">█ COMPLETE CHECK</span>
            </div>
          )}
          
          {gameState === "matching" && (
            <div className="text-accent-foreground font-bold animate-fade-in">
              &gt; *** MATCHING GAME ***<br/>
              &gt; MATCH MEDICATIONS<br/>
              <br/>
              &gt; <span className="text-accent animate-pulse">█ DRAG AND DROP</span>
            </div>
          )}
          
          {gameState === "complete" && (
            <div className="text-accent-foreground font-bold animate-fade-in">
              &gt; *** COMPLETE ***<br/>
              &gt; <span className="text-accent">GOOD WORK!</span><br/>
              <br/>
              &gt; <span className="animate-pulse">█ PRESS NEW CASE</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="px-3 pb-3 space-y-2">
        {gameState === "idle" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/40 retro-shadow hover:scale-105 transition-transform flex items-center justify-center gap-1"
            style={{ fontSize: "9px", padding: "8px" }}
          >
            START
          </Button>
        )}
        
        {gameState === "dispatch" && (
          <Button 
            onClick={onStartAssessment}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/40 retro-shadow hover:scale-105 transition-transform animate-pulse flex items-center justify-center gap-1"
            style={{ fontSize: "9px", padding: "8px" }}
          >
            BEGIN
          </Button>
        )}
        
        {gameState === "complete" && (
          <Button 
            onClick={onNewCase}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold pixel-text border-2 border-accent-foreground/40 retro-shadow hover:scale-105 transition-transform flex items-center justify-center gap-1"
            style={{ fontSize: "9px", padding: "8px" }}
          >
            NEW CASE
          </Button>
        )}
      </div>

      {/* Speaker Grille */}
      <div className="px-3 pb-3">
        <div 
          className="border-2 border-foreground/40 p-2 rounded-sm"
          style={{ backgroundColor: "hsl(240, 8%, 15%)" }}
        >
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className="h-1 bg-foreground/20 rounded-full"
                style={{ boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Corner Details */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-accent/30 rounded-sm" />
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-accent/30 rounded-sm" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-accent/30 rounded-sm" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-accent/30 rounded-sm" />
    </div>
  );
};
