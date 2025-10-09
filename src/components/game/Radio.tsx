import { Button } from "@/components/ui/button";

interface RadioProps {
  dispatchInfo: string;
  onStartAssessment: () => void;
  onNewCase: () => void;
  gameState: "idle" | "dispatch" | "assessing" | "quiz" | "complete";
}

export const Radio = ({ dispatchInfo, onStartAssessment, onNewCase, gameState }: RadioProps) => {
  return (
    <div className="relative animate-scale-in" style={{ width: "280px" }}>
      {/* Antenna */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3 h-24 bg-gradient-to-t from-zinc-800 to-zinc-700 rounded-full" 
        style={{ boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3), 2px 0 4px rgba(0,0,0,0.2)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-600 rounded-full"></div>
      </div>

      {/* Main Radio Body */}
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, hsl(220, 10%, 20%) 0%, hsl(220, 10%, 15%) 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}
      >
        {/* Textured Side Grips */}
        <div className="absolute left-0 top-12 bottom-12 w-3 opacity-40"
          style={{ 
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
          }}
        />
        <div className="absolute right-0 top-12 bottom-12 w-3 opacity-40"
          style={{ 
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
          }}
        />

        {/* Top Section with branding */}
        <div className="p-3 pb-2 text-center border-b border-white/10">
          <div className="text-white/90 font-bold tracking-wider" style={{ fontSize: "11px", fontFamily: "Arial, sans-serif" }}>
            sepura
          </div>
        </div>

        {/* Display Screen */}
        <div className="mx-3 mt-3 mb-4 relative">
          {/* Screen bezel */}
          <div className="p-1 rounded-sm" style={{ background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)" }}>
            {/* Inner screen */}
            <div 
              className="bg-gradient-to-b from-blue-950 to-black p-3 min-h-[160px] font-mono leading-relaxed rounded-sm relative overflow-hidden"
              style={{ 
                fontSize: "9px",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,100,200,0.1)"
              }}
            >
              {/* Screen glare effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Status bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-900/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                  <div className="text-blue-300 font-bold" style={{ fontSize: "8px" }}>SC21</div>
                </div>
                <div className="text-blue-400/60 text-xs" style={{ fontSize: "7px" }}>CH: 01</div>
              </div>

              {/* Display content */}
              {gameState === "idle" && (
                <div className="text-blue-200 font-bold">
                  &gt; STANDBY FOR JOB...<br/>
                  &gt; <span className="animate-pulse">PRESS START TO BEGIN</span>
                </div>
              )}
              
              {gameState === "dispatch" && (
                <div className="text-blue-200 font-bold animate-fade-in">
                  &gt; *** NEW CALL RECEIVED ***<br/>
                  &gt; {dispatchInfo}<br/>
                  <br/>
                  &gt; REVIEW PATIENT DOCUMENTS<br/>
                  &gt; <span className="text-green-400 animate-pulse">BEGIN ASSESSMENT WHEN READY</span>
                </div>
              )}
              
              {gameState === "assessing" && (
                <div className="text-blue-200 font-bold animate-fade-in">
                  &gt; ON SCENE<br/>
                  &gt; REVIEW MEDICATIONS<br/>
                  &gt; COMPLETE ASSESSMENT FORM
                </div>
              )}
              
              {gameState === "quiz" && (
                <div className="text-blue-200 font-bold animate-fade-in">
                  &gt; *** ON SCENE - ASSESSMENT ***<br/>
                  &gt; {dispatchInfo}<br/>
                  <br/>
                  &gt; <span className="text-green-400 animate-pulse">COMPLETE KNOWLEDGE CHECK</span>
                </div>
              )}
              
              {gameState === "complete" && (
                <div className="text-blue-200 font-bold animate-fade-in">
                  &gt; *** ASSESSMENT COMPLETE ***<br/>
                  &gt; <span className="text-green-400">GOOD WORK!</span><br/>
                  <br/>
                  &gt; <span className="animate-pulse">PRESS NEW CASE FOR NEXT JOB</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-3 mb-4">
          <div className="grid grid-cols-5 gap-1.5">
            {/* Side buttons */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} 
                className="h-6 rounded-sm flex items-center justify-center text-white/40"
                style={{ 
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)",
                  fontSize: "7px"
                }}
              >
                {i === 1 && "⚙"}
                {i === 2 && "☰"}
                {i === 3 && "○"}
              </div>
            ))}
          </div>
          
          {/* D-pad style navigation */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {/* Green call button */}
            <div className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-white"
              style={{ 
                background: "linear-gradient(145deg, #10b981, #059669)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}
            >
              📞
            </div>
            
            {/* Center D-pad */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full" style={{ background: "#1a1a1a" }}>
                {/* Up */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 rounded-t-lg flex items-center justify-center text-white/60"
                  style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  ▲
                </div>
                {/* Down */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 rounded-b-lg flex items-center justify-center text-white/60"
                  style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  ▼
                </div>
                {/* Left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-6 rounded-l-lg flex items-center justify-center text-white/60"
                  style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  ◄
                </div>
                {/* Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-6 rounded-r-lg flex items-center justify-center text-white/60"
                  style={{ background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  ►
                </div>
                {/* Center OK button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white/80 font-bold"
                  style={{ 
                    background: "linear-gradient(145deg, #3a3a3a, #2a2a2a)", 
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    fontSize: "8px"
                  }}
                >
                  OK
                </div>
              </div>
            </div>
            
            {/* Red emergency button */}
            <div className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-white"
              style={{ 
                background: "linear-gradient(145deg, #ef4444, #dc2626)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}
            >
              ⚠
            </div>
          </div>
        </div>

        {/* Number Pad */}
        <div className="px-3 pb-4">
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { num: "1", text: "-" },
              { num: "2", text: "abc" },
              { num: "3", text: "def" },
              { num: "4", text: "ghi" },
              { num: "5", text: "jkl" },
              { num: "6", text: "mno" },
              { num: "7", text: "pqrs" },
              { num: "8", text: "tuv" },
              { num: "9", text: "wxyz" },
              { num: "*", text: "" },
              { num: "0", text: "+" },
              { num: "#", text: "" }
            ].map((key, i) => (
              <div key={i} 
                className="h-8 rounded-sm flex flex-col items-center justify-center text-white"
                style={{ 
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  boxShadow: "inset 0 2px 3px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)"
                }}
              >
                <div className="font-bold" style={{ fontSize: "11px" }}>{key.num}</div>
                {key.text && <div className="text-white/40" style={{ fontSize: "6px" }}>{key.text}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-3 pb-3">
          {gameState === "idle" && (
            <Button 
              onClick={onStartAssessment}
              className="w-full bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold border-0 shadow-lg"
              style={{ fontSize: "10px", padding: "12px", borderRadius: "4px" }}
            >
              ► START GAME
            </Button>
          )}
          
          {gameState === "dispatch" && (
            <Button 
              onClick={onStartAssessment}
              className="w-full bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold border-0 shadow-lg animate-pulse"
              style={{ fontSize: "10px", padding: "12px", borderRadius: "4px" }}
            >
              ► BEGIN ASSESSMENT
            </Button>
          )}
          
          {gameState === "complete" && (
            <Button 
              onClick={onNewCase}
              className="w-full bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold border-0 shadow-lg"
              style={{ fontSize: "10px", padding: "12px", borderRadius: "4px" }}
            >
              ► NEW CASE
            </Button>
          )}
        </div>

        {/* Bottom Speaker Grille */}
        <div className="px-3 pb-3">
          <div className="rounded-sm p-2" style={{ background: "#0a0a0a" }}>
            <div className="grid grid-cols-12 gap-0.5">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="h-1 rounded-full" style={{ background: "#1a1a1a" }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
