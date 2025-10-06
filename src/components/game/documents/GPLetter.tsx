interface GPLetterProps {
  patientName: string;
  age: number;
  gender: string;
  address: string;
  condition: string;
  isEnlarged?: boolean;
}

export const GPLetter = ({ patientName, age, gender, address, condition, isEnlarged = false }: GPLetterProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  
  return (
    <div 
      className="paper-texture border-4 border-nhs-blue pixel-text document-shadow select-none"
      style={{ 
        width: "280px",
        padding: "12px",
      }}
    >
      {/* Letterhead */}
      <div className="border-b-2 border-nhs-blue pb-2 mb-2 bg-nhs-blue/10">
        <div className="font-bold" style={{ fontSize: "10px", color: '#000' }}>
          GP LETTER
        </div>
        <div className="mt-0.5" style={{ fontSize: "6px", color: '#000' }}>
          NHS Primary Care
        </div>
      </div>

      {/* Date */}
      <div className="text-right mb-2 font-bold" style={{ fontSize: "6px", color: '#000' }}>
        {formattedDate}
      </div>

      {/* Recipient */}
      <div className="mb-2">
        <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>To: Ambulance Service</div>
      </div>

      {/* Subject */}
      <div className="mb-2">
        <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>
          Re: {patientName}
        </div>
        <div style={{ fontSize: "6px", color: '#000' }}>
          Age: {age}
        </div>
      </div>

      {/* Letter Body */}
      <div className="space-y-2" style={{ fontSize: "7px", color: '#000', lineHeight: "1.4" }}>
        <p className="font-bold">Dear Colleague,</p>
        
        <p>
          Information re patient known<br/>
          to our practice.
        </p>

        <div className="border-l-2 border-primary pl-2 bg-primary/10 py-2">
          <div className="font-bold mb-1" style={{ fontSize: "7px" }}>Medical Summary:</div>
          <div>
            {age} y/o {gender.toLowerCase().substring(0,1)}. History of {condition.toLowerCase()}.
            {age > 65 && " Frail with comorbidities."}
            {" "}See attached Rx.
          </div>
        </div>

        <p>
          Regular review. Deteriorating<br/>
          functional status noted.
        </p>

        <p className="font-bold">Yours faithfully,</p>
      </div>

      {/* Signature */}
      <div className="mt-2 pt-1 border-t border-paper-border">
        <div className="font-script" style={{ fontSize: "10px", color: '#000' }}>Dr. {["Smith", "Jones"][Math.floor(Math.random() * 2)]}</div>
        <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>GP</div>
      </div>
    </div>
  );
};
