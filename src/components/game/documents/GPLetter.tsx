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
      <div className="border-b-4 border-primary pb-3 mb-4 bg-primary/5">
        <div className="font-bold text-primary" style={{ fontSize: `${16 * scale}px` }}>
          NHS General Practice
        </div>
        <div className="text-paper-text mt-1" style={{ fontSize: `${11 * scale}px` }}>
          {address.split(',')[1]}<br/>
          Tel: 0{Math.floor(Math.random() * 900000000) + 100000000}
        </div>
      </div>

      {/* Date */}
      <div className="text-right mb-4 text-paper-text font-bold" style={{ fontSize: `${11 * scale}px` }}>
        {formattedDate}
      </div>

      {/* Recipient */}
      <div className="mb-4 text-paper-text">
        <div className="font-bold" style={{ fontSize: `${13 * scale}px` }}>To: Ambulance Service</div>
        <div style={{ fontSize: `${11 * scale}px` }}>Emergency Care Team</div>
      </div>

      {/* Subject */}
      <div className="mb-3">
        <div className="font-bold text-paper-text" style={{ fontSize: `${13 * scale}px` }}>
          Re: {patientName}
        </div>
        <div className="text-paper-text" style={{ fontSize: `${11 * scale}px` }}>
          DOB: {new Date(new Date().getFullYear() - age, 0, 1).toLocaleDateString('en-GB')}
        </div>
      </div>

      {/* Letter Body */}
      <div className="space-y-3 text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
        <p className="font-bold">Dear Colleague,</p>
        
        <p>
          I am writing to provide information about the above patient who is known to our practice.
        </p>

        <div className="border-l-4 border-primary pl-3 bg-primary/10 py-3">
          <div className="font-bold mb-2" style={{ fontSize: `${12 * scale}px` }}>Medical Summary:</div>
          <div>
            This {age} year old {gender.toLowerCase()} has a known history of {condition.toLowerCase()}.
            {age > 65 && " The patient is frail and has multiple comorbidities."}
            {" "}Current medications are as per the attached prescription.
          </div>
        </div>

        <p>
          Recent consultations have noted deteriorating functional status. The patient is under regular review.
        </p>

        <p>
          Please do not hesitate to contact the practice if you require any further information.
        </p>

        <p className="font-bold">Yours faithfully,</p>
      </div>

      {/* Signature */}
      <div className="mt-4 pt-2 border-t-2 border-paper-border">
        <div className="font-script text-paper-text" style={{ fontSize: `${20 * scale}px` }}>Dr. {["Smith", "Jones", "Williams", "Brown", "Taylor"][Math.floor(Math.random() * 5)]}</div>
        <div className="text-paper-text font-bold" style={{ fontSize: `${11 * scale}px` }}>General Practitioner</div>
        <div className="text-paper-text" style={{ fontSize: `${11 * scale}px` }}>GMC: {Math.floor(Math.random() * 9000000) + 1000000}</div>
      </div>
    </div>
  );
};
