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
  
  // Generate varied letter content
  const letterTypes = [
    {
      type: "Blood Test Results",
      content: (
        <>
          <p>Your recent blood tests from {new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')} show:</p>
          <div className="border-l-2 border-nhs-blue pl-2 bg-nhs-blue/10 py-2">
            <div style={{ fontSize: "6px" }}>
              • HbA1c: {age > 60 ? "68 mmol/mol (elevated)" : "42 mmol/mol (normal)"}<br/>
              • eGFR: {age > 70 ? "52 ml/min (reduced)" : "78 ml/min (acceptable)"}<br/>
              • Cholesterol: {Math.random() > 0.5 ? "5.8 mmol/L (high)" : "4.2 mmol/L (target)"}<br/>
              • TSH: {condition.includes("Hypothyroidism") ? "8.2 mU/L (high)" : "2.4 mU/L (normal)"}
            </div>
          </div>
          <p>Please continue current<br/>medications. Review in 3 months.</p>
        </>
      )
    },
    {
      type: "Appointment Summary",
      content: (
        <>
          <p>Summary of consultation on<br/>{new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}:</p>
          <div className="border-l-2 border-nhs-blue pl-2 bg-nhs-blue/10 py-2">
            <div style={{ fontSize: "6px" }}>
              Presenting complaint: {condition}<br/>
              <br/>
              Examination: BP {age > 65 ? "162/94" : "138/86"} mmHg<br/>
              Heart rate: {Math.floor(Math.random() * 20) + 72} bpm<br/>
              SpO2: {age > 70 ? "94%" : "97%"} on air<br/>
              <br/>
              Plan: Medication review.<br/>
              Repeat bloods arranged.
            </div>
          </div>
          <p>Follow-up in 4 weeks or<br/>sooner if symptoms worsen.</p>
        </>
      )
    },
    {
      type: "Appointment Confirmation",
      content: (
        <>
          <p>This confirms your upcoming<br/>appointment:</p>
          <div className="border-l-2 border-nhs-blue pl-2 bg-nhs-blue/10 py-2">
            <div className="font-bold mb-1" style={{ fontSize: "7px" }}>Details:</div>
            <div style={{ fontSize: "6px" }}>
              Date: {new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}<br/>
              Time: {["09:30", "10:45", "14:20", "15:30"][Math.floor(Math.random() * 4)]}<br/>
              With: Dr. {["Smith", "Jones", "Williams"][Math.floor(Math.random() * 3)]}<br/>
              Purpose: Medication review<br/>
              <br/>
              Please bring your current<br/>medications with you.
            </div>
          </div>
          <p>If unable to attend, please<br/>contact us 24hrs in advance.</p>
        </>
      )
    },
    {
      type: "Medication Review",
      content: (
        <>
          <p>Following our discussion on<br/>{new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}:</p>
          <div className="border-l-2 border-nhs-blue pl-2 bg-nhs-blue/10 py-2">
            <div style={{ fontSize: "6px" }}>
              We have reviewed your<br/>medications for {condition}.<br/>
              <br/>
              Changes made:<br/>
              • {Math.random() > 0.5 ? "Dose increased" : "New medication added"}<br/>
              • See updated prescription<br/>
              <br/>
              Continue all other medications<br/>as previously prescribed.
            </div>
          </div>
          <p>Report any side effects.<br/>Next review in 6 weeks.</p>
        </>
      )
    }
  ];

  const selectedLetter = letterTypes[Math.floor(Math.random() * letterTypes.length)];
  
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
        <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>
          {patientName}<br/>
          {address}
        </div>
      </div>

      {/* Subject */}
      <div className="mb-2">
        <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>
          Re: {selectedLetter.type}
        </div>
      </div>

      {/* Letter Body */}
      <div className="space-y-2" style={{ fontSize: "7px", color: '#000', lineHeight: "1.4" }}>
        <p className="font-bold">Dear {patientName.split(' ')[0]},</p>
        
        {selectedLetter.content}

        <p className="font-bold">Yours sincerely,</p>
      </div>

      {/* Signature */}
      <div className="mt-2 pt-1 border-t border-paper-border">
        <div className="font-script" style={{ fontSize: "10px", color: '#000' }}>Dr. {["Smith", "Jones", "Williams"][Math.floor(Math.random() * 3)]}</div>
        <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>General Practitioner</div>
      </div>
    </div>
  );
};
