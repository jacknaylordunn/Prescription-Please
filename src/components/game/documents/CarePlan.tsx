interface CarePlanProps {
  patientName: string;
  age: number;
  condition: string;
  isEnlarged?: boolean;
}

export const CarePlan = ({ patientName, age, condition, isEnlarged = false }: CarePlanProps) => {
  const scale = isEnlarged ? 1.5 : 1;
  
  return (
    <div 
      className="paper-texture border-2 border-accent pixel-text document-shadow"
      style={{ 
        width: `${420 * scale}px`,
        fontSize: `${11 * scale}px`,
        padding: `${16 * scale}px`,
      }}
    >
      {/* Header */}
      <div className="bg-accent text-accent-foreground p-3 mb-3 border-2 border-accent">
        <div className="font-bold text-center" style={{ fontSize: `${14 * scale}px` }}>
          ADVANCE CARE PLAN
        </div>
      </div>

      {/* Patient Info */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Patient Information:</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-bold" style={{ color: 'hsl(var(--doc-label))', fontSize: `${11 * scale}px` }}>Name: </span>
            <span className="font-bold text-paper-text" style={{ fontSize: `${11 * scale}px` }}>{patientName}</span>
          </div>
          <div>
            <span className="font-bold" style={{ color: 'hsl(var(--doc-label))', fontSize: `${11 * scale}px` }}>Age: </span>
            <span className="font-bold text-paper-text" style={{ fontSize: `${11 * scale}px` }}>{age} years</span>
          </div>
        </div>
      </div>

      {/* Current Condition */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Current Condition:</div>
        <div className="text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
          {condition}
          {age > 70 && ", with age-related decline in mobility and cognition"}
        </div>
      </div>

      {/* Treatment Preferences */}
      <div className="border-4 border-accent p-3 mb-3 bg-accent/10">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Treatment Preferences:</div>
        <div className="space-y-2 text-paper-text font-bold" style={{ fontSize: `${11 * scale}px` }}>
          <div>☑ Prefers to remain at home</div>
          <div>☑ Accept oral medications</div>
          <div>☑ Hospital admission if treatable</div>
          <div>☐ Does not wish aggressive treatment</div>
        </div>
      </div>

      {/* Escalation */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Escalation Plan:</div>
        <div className="text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
          In event of acute deterioration, contact:<br/>
          • GP surgery (emergency line)<br/>
          • District nursing team<br/>
          • Consider 999 for life-threatening issues
        </div>
      </div>

      {/* Medication Notes */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Medication Management:</div>
        <div className="text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
          Patient has support with medications.<br/>
          See separate prescription for current drugs.<br/>
          Compliance generally good with supervision.
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-paper-text font-bold pt-2 border-t-2 border-paper-border" style={{ fontSize: `${10 * scale}px` }}>
        Care plan reviewed: {new Date().toLocaleDateString('en-GB')}<br/>
        Next review due: {new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString('en-GB')}
      </div>
    </div>
  );
};
