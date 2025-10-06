interface GPLetterProps {
  patientName: string;
  age: number;
  gender: string;
  address: string;
  condition: string;
  isEnlarged?: boolean;
}

export const GPLetter = ({ patientName, age, gender, address, condition, isEnlarged = false }: GPLetterProps) => {
  const scale = isEnlarged ? 1.5 : 1;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return (
    <div 
      className="paper-texture border-2 border-paper-border pixel-text document-shadow"
      style={{ 
        width: `${420 * scale}px`,
        fontSize: `${11 * scale}px`,
        padding: `${20 * scale}px`,
      }}
    >
      {/* Letterhead */}
      <div className="border-b-2 border-primary pb-3 mb-4">
        <div className="font-bold text-primary" style={{ fontSize: `${14 * scale}px` }}>
          NHS General Practice
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {address.split(',')[1]}<br/>
          Tel: 0{Math.floor(Math.random() * 900000000) + 100000000}
        </div>
      </div>

      {/* Date */}
      <div className="text-right mb-4 text-paper-text">
        {formattedDate}
      </div>

      {/* Recipient */}
      <div className="mb-4 text-paper-text">
        <div className="font-bold">To: Ambulance Service</div>
        <div className="text-xs">Emergency Care Team</div>
      </div>

      {/* Subject */}
      <div className="mb-3">
        <div className="font-bold text-paper-text">
          Re: {patientName}
        </div>
        <div className="text-xs text-muted-foreground">
          DOB: {new Date(new Date().getFullYear() - age, 0, 1).toLocaleDateString('en-GB')}
        </div>
      </div>

      {/* Letter Body */}
      <div className="space-y-3 text-paper-text leading-relaxed">
        <p>Dear Colleague,</p>
        
        <p className="text-sm">
          I am writing to provide information about the above patient who is known to our practice.
        </p>

        <div className="border-l-4 border-primary pl-3 bg-primary/5 py-2">
          <div className="font-bold mb-1">Medical Summary:</div>
          <div className="text-sm">
            This {age} year old {gender.toLowerCase()} has a known history of {condition.toLowerCase()}.
            {age > 65 && " The patient is frail and has multiple comorbidities."}
            {" "}Current medications are as per the attached prescription.
          </div>
        </div>

        <p className="text-sm">
          Recent consultations have noted deteriorating functional status. The patient is under regular review.
        </p>

        <p className="text-sm">
          Please do not hesitate to contact the practice if you require any further information.
        </p>

        <p>Yours faithfully,</p>
      </div>

      {/* Signature */}
      <div className="mt-4 pt-2">
        <div className="font-script text-xl text-paper-text">Dr. {["Smith", "Jones", "Williams", "Brown", "Taylor"][Math.floor(Math.random() * 5)]}</div>
        <div className="text-xs text-muted-foreground">General Practitioner</div>
        <div className="text-xs text-muted-foreground">GMC: {Math.floor(Math.random() * 9000000) + 1000000}</div>
      </div>
    </div>
  );
};
