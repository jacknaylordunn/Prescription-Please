interface CarePlanProps {
  patientName: string;
  age: number;
  condition: string;
  isEnlarged?: boolean;
}

export const CarePlan = ({ patientName, age, condition, isEnlarged = false }: CarePlanProps) => {
  
  return (
    <div 
      className="paper-texture border-4 border-accent pixel-text document-shadow select-none animate-fade-in hover:scale-[1.02] transition-transform duration-200"
      style={{ 
        width: "280px",
        padding: "12px",
      }}
    >
      {/* Header */}
      <div className="bg-accent/20 border-b-2 border-accent p-2 mb-2">
        <div className="font-bold text-center" style={{ fontSize: "9px", color: '#000' }}>
          CARE PLAN
        </div>
        <div className="font-bold text-center" style={{ fontSize: "6px", color: '#000' }}>Treatment Preferences</div>
      </div>

      {/* Patient Info */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Patient:</div>
        <div className="space-y-0.5">
          <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>{patientName}</div>
          <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>Age: {age}</div>
        </div>
      </div>

      {/* Current Condition */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Condition:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.4" }}>
          {condition.substring(0, 60)}
          {age > 70 && ", age-related decline"}
        </div>
      </div>

      {/* Treatment Preferences */}
      <div className="border-2 border-accent p-2 mb-2 bg-accent/10">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Preferences:</div>
        <div className="space-y-0.5 font-bold" style={{ fontSize: "6px", color: '#000' }}>
          <div>☑ Remain at home</div>
          <div>☑ Oral meds only</div>
          <div>☑ Hospital if treatable</div>
        </div>
      </div>

      {/* Escalation */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Escalation:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.3" }}>
          If deterioration:<br/>
          • GP surgery<br/>
          • District nurse<br/>
          • 999 if critical
        </div>
      </div>

      {/* Footer */}
      <div className="text-center font-bold pt-1 border-t border-paper-border" style={{ fontSize: "5px", color: '#000' }}>
        Reviewed: {new Date().toLocaleDateString('en-GB')}
      </div>
    </div>
  );
};
