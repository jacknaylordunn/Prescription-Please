import { Scenario } from "@/data/scenarios";

interface PrescriptionProps {
  scenario: Scenario;
  isEnlarged?: boolean;
}

export const Prescription = ({ scenario, isEnlarged = false }: PrescriptionProps) => {
  const today = new Date();
  const formattedDate = scenario.documentMetadata?.formattedDate || 
    `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;
  const doctorName = scenario.documentMetadata?.prescriptionDoctor || "Smith";
  
  return (
    <div 
      className="border-4 pixel-text document-shadow select-none animate-fade-in hover:scale-[1.02] transition-transform duration-200"
      style={{ 
        width: "280px",
        padding: "12px",
        background: `
          repeating-linear-gradient(
            0deg,
            hsl(var(--nhs-green)) 0px,
            hsl(var(--nhs-green)) 1px,
            hsl(145 45% 92%) 1px,
            hsl(145 45% 92%) 2px
          ),
          linear-gradient(135deg, hsl(var(--nhs-green)) 0%, hsl(145 40% 88%) 100%)
        `,
        borderColor: 'hsl(var(--nhs-green-border))',
      }}
    >
      {/* NHS Header */}
      <div className="border-2 p-2 mb-2 retro-shadow" style={{ 
        backgroundColor: 'hsl(145 60% 40%)',
        borderColor: 'hsl(var(--nhs-green-text))'
      }}>
        <div className="flex justify-between items-center">
          <div className="font-bold" style={{ fontSize: "12px", color: '#fff' }}>NHS</div>
          <div className="text-right">
            <div className="font-bold" style={{ fontSize: "7px", color: '#fff' }}>Pharmacy</div>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-1 mb-2 border-2 border-paper-border p-2 bg-card">
        <div>
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>AGE</div>
          <div className="font-bold" style={{ fontSize: "9px", color: '#000' }}>{scenario.patient.age}</div>
        </div>
        <div>
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>PATIENT</div>
          <div className="font-bold" style={{ fontSize: "8px", color: '#000', lineHeight: "1.2" }}>{scenario.patient.name.split(' ')[0]}<br/>{scenario.patient.name.split(' ').slice(1).join(' ')}</div>
        </div>
        <div className="col-span-2">
          <div className="font-bold mt-1" style={{ fontSize: "6px", color: '#000' }}>NHS: {scenario.patient.nhsNumber}</div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card" style={{ minHeight: "140px" }}>
        <div className="font-bold mb-2 pb-1 border-b border-paper-border" style={{ fontSize: "6px", color: '#000' }}>MEDICATIONS</div>
        {scenario.prescriptions.map((prescription, idx) => (
          <div key={idx} className="mb-2 pb-2 border-b border-paper-border/50 last:border-b-0">
            <div className="font-bold" style={{ fontSize: "8px", color: '#000', lineHeight: "1.2" }}>
              {prescription.medication.name}
            </div>
            <div style={{ fontSize: "7px", color: '#000', lineHeight: '1.3', marginTop: '2px' }}>{prescription.instructions}</div>
            <div className="font-bold mt-1" style={{ fontSize: "7px", color: '#000' }}>{prescription.quantity}</div>
          </div>
        ))}
      </div>

      {/* Signature */}
      <div className="border-t border-paper-border pt-1 mb-2">
        <div className="flex justify-between items-center">
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Prescriber</div>
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Date</div>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <div className="font-script" style={{ fontSize: "10px", color: '#000' }}>Dr Signature</div>
          <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>{formattedDate}</div>
        </div>
      </div>

      {/* Prescriber Details */}
      <div className="border-2 border-paper-border p-2 grid grid-cols-2 gap-1 bg-card">
        <div className="font-bold" style={{ fontSize: "5px", color: '#000' }}>
          For dispenser
        </div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.3" }}>
          <div className="font-bold">NHS Trust</div>
          <div className="font-bold">Dr {doctorName}</div>
          <div>Medical Centre</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-1 pt-1 border-t border-paper-border">
        <div className="bg-primary text-primary-foreground px-2 py-0.5 font-bold border border-primary" style={{ fontSize: "7px" }}>NHS</div>
        <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>{scenario.documentMetadata?.fp10Code || 'FP10-0000'}</div>
      </div>
    </div>
  );
};
