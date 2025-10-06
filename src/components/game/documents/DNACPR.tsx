interface DNACPRProps {
  patientName: string;
  age: number;
  nhsNumber: string;
  isEnlarged?: boolean;
  doctorName?: string;
  gmcNumber?: string;
  formattedDate?: string;
}

export const DNACPR = ({ patientName, age, nhsNumber, isEnlarged = false, doctorName = "Dr. Sig", gmcNumber, formattedDate }: DNACPRProps) => {
  const today = new Date();
  const dateToShow = formattedDate || today.toLocaleDateString('en-GB');
  const gmcNum = gmcNumber || Math.floor(1000000 + Math.random() * 9000000).toString();
  
  return (
    <div 
      className="border-4 pixel-text document-shadow select-none animate-fade-in hover:scale-[1.02] transition-transform duration-200"
      style={{ 
        width: "260px",
        padding: "10px",
        background: `
          repeating-linear-gradient(
            0deg,
            hsl(var(--dnacpr-pink)) 0px,
            hsl(var(--dnacpr-pink)) 1px,
            hsl(340 70% 94%) 1px,
            hsl(340 70% 94%) 2px
          ),
          linear-gradient(135deg, hsl(var(--dnacpr-pink)) 0%, hsl(340 65% 90%) 100%)
        `,
        borderColor: 'hsl(var(--dnacpr-pink-border))',
      }}
    >
      {/* Header */}
      <div className="border-b-2 p-2 mb-2" style={{ 
        backgroundColor: 'hsl(var(--dnacpr-pink-dark))',
        borderColor: 'hsl(var(--dnacpr-pink-border))'
      }}>
        <div className="font-bold text-center" style={{ fontSize: "9px", color: '#fff' }}>
          DO NOT ATTEMPT CPR
        </div>
        <div className="font-bold text-center" style={{ fontSize: "6px", color: '#fff' }}>DNACPR</div>
      </div>

      {/* Patient Details */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="space-y-1">
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>PATIENT:</div>
            <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>{patientName}</div>
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>DOB:</div>
            <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>
              {new Date(new Date().getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB')}
            </div>
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>NHS: {nhsNumber}</div>
          </div>
        </div>
      </div>

      {/* Decision */}
      <div className="border-2 p-2 mb-2" style={{ 
        borderColor: 'hsl(var(--dnacpr-pink-border))',
        backgroundColor: 'hsl(var(--dnacpr-pink-dark) / 0.15)'
      }}>
        <div className="font-bold mb-1" style={{ fontSize: "8px", color: '#000' }}>Decision:</div>
        <div className="font-bold" style={{ fontSize: "7px", color: '#000', lineHeight: "1.4" }}>
          ☒ CPR NOT to be attempted<br/>
          <br/>
          In event of cardiac/respiratory<br/>
          arrest, do NOT attempt CPR.
        </div>
      </div>

      {/* Clinical Details */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Clinical:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.4" }}>
          Advanced condition with<br/>
          deteriorating status. Patient<br/>
          has capacity and agrees.
        </div>
      </div>

      {/* Signatures */}
      <div className="border-t border-paper-border pt-2 space-y-1">
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Doctor:</div>
            <div className="font-script" style={{ fontSize: "9px", color: '#000' }}>{doctorName}</div>
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Date:</div>
            <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>{dateToShow}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t-2" style={{ 
        borderColor: 'hsl(var(--dnacpr-pink-border))',
        backgroundColor: 'hsl(var(--dnacpr-pink-dark) / 0.15)'
      }}>
        <div className="font-bold text-center" style={{ fontSize: "5px", color: '#000' }}>
          VALID ACROSS ALL CARE SETTINGS
        </div>
      </div>
    </div>
  );
};
