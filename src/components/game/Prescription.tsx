import { Scenario } from "@/data/scenarios";

interface PrescriptionProps {
  scenario: Scenario;
  isEnlarged?: boolean;
}

export const Prescription = ({ scenario, isEnlarged = false }: PrescriptionProps) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;
  
  return (
    <div 
      className="paper-texture border-4 border-nhs-green-border pixel-text document-shadow select-none"
      style={{ 
        width: "280px",
        padding: "12px",
      }}
    >
      {/* NHS Header */}
      <div className="bg-nhs-green border-2 border-nhs-green-text p-2 mb-2 retro-shadow">
        <div className="flex justify-between items-center">
          <div className="font-bold" style={{ fontSize: "12px", color: '#000' }}>NHS</div>
          <div className="text-right">
            <div className="font-bold" style={{ fontSize: "7px", color: '#000' }}>Pharmacy</div>
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
          <div className="font-bold">Dr {["Smith", "Jones"][Math.floor(Math.random() * 2)]}</div>
          <div>Medical Centre</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-1 pt-1 border-t border-paper-border">
        <div className="bg-primary text-primary-foreground px-2 py-0.5 font-bold border border-primary" style={{ fontSize: "7px" }}>NHS</div>
        <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>FP10-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
      </div>
    </div>
  );
};
