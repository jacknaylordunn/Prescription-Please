import { Scenario } from "@/data/scenarios";

interface PrescriptionProps {
  scenario: Scenario;
  isEnlarged?: boolean;
}

export const Prescription = ({ scenario, isEnlarged = false }: PrescriptionProps) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;
  
  const scale = isEnlarged ? 1.5 : 1;
  
  return (
    <div 
      className="paper-texture border-4 border-nhs-green-border pixel-text transition-transform duration-200 document-shadow"
      style={{ 
        width: `${420 * scale}px`,
        fontSize: `${12 * scale}px`,
        padding: `${16 * scale}px`,
      }}
    >
      {/* NHS Header */}
      <div className="bg-nhs-green border-4 border-nhs-green-text p-3 mb-3 retro-shadow">
        <div className="flex justify-between items-center">
          <div className="font-bold" style={{ fontSize: `${18 * scale}px`, color: '#000' }}>NHS</div>
          <div className="text-right">
            <div className="font-bold" style={{ fontSize: `${12 * scale}px`, color: '#000' }}>Pharmacy Stamp</div>
            <div className="font-bold" style={{ fontSize: `${10 * scale}px`, color: '#000' }}>Please stamp here</div>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-2 mb-3 border-4 border-paper-border p-3 bg-card">
        <div>
          <div className="text-xs font-bold uppercase" style={{ color: '#000' }}>Age</div>
          <div className="font-bold" style={{ fontSize: `${16 * scale}px`, color: '#000' }}>{scenario.patient.age}</div>
          <div className="text-xs font-bold uppercase mt-2" style={{ color: '#000' }}>D.o.B</div>
          <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{new Date(new Date().getFullYear() - scenario.patient.age, 0, 1).toLocaleDateString('en-GB')}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase" style={{ color: '#000' }}>Title, Forename, Surname & Address</div>
          <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{scenario.patient.name}</div>
          <div style={{ fontSize: `${12 * scale}px`, color: '#000' }} className="mt-1">{scenario.patient.address}</div>
          <div className="font-bold" style={{ fontSize: `${12 * scale}px`, color: '#000' }}>{scenario.patient.postcode}</div>
          <div className="text-xs mt-2">
            <span className="font-bold" style={{ color: '#000' }}>NHS Number: </span>
            <span className="font-bold" style={{ color: '#000' }}>{scenario.patient.nhsNumber}</span>
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card" style={{ minHeight: `${200 * scale}px` }}>
        <div className="text-xs font-bold uppercase mb-3 pb-2 border-b-2 border-paper-border" style={{ color: '#000' }}>Endorsements</div>
        {scenario.prescriptions.map((prescription, idx) => (
          <div key={idx} className="mb-4 pb-3 border-b-2 border-paper-border/50 last:border-b-0">
            <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>
              {prescription.medication.name} {prescription.medication.dose} {prescription.medication.category === "Analgesic" ? "tablets" : prescription.medication.category === "Antibiotic" ? "capsules" : "tablets"}
            </div>
            <div style={{ fontSize: `${12 * scale}px`, color: '#000', lineHeight: '1.6', marginTop: '4px' }}>{prescription.instructions}</div>
            <div className="font-bold mt-1" style={{ fontSize: `${12 * scale}px`, color: '#000' }}>{prescription.quantity}</div>
          </div>
        ))}
        <div className="mt-3 text-xs italic border-t-2 border-paper-border pt-2" style={{ color: '#000' }}>
          [No more items on this prescription]
        </div>
      </div>

      {/* Signature */}
      <div className="border-t-2 border-paper-border pt-2 mb-2">
        <div className="flex justify-between items-center">
          <div className="text-xs font-bold" style={{ color: '#000' }}>Signature of Prescriber</div>
          <div className="text-xs font-bold" style={{ color: '#000' }}>Date</div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="font-script" style={{ fontSize: `${20 * scale}px`, color: '#000' }}>Dr Signature</div>
          <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{formattedDate}</div>
        </div>
      </div>

      {/* Prescriber Details */}
      <div className="border-4 border-paper-border p-3 grid grid-cols-2 gap-2 bg-card">
        <div className="text-xs font-bold" style={{ color: '#000' }}>
          For dispenser<br/>
          No. of<br/>
          Prescrip.<br/>
          on form
        </div>
        <div style={{ fontSize: `${11 * scale}px`, color: '#000' }}>
          <div className="font-bold">NHS Healthcare Trust</div>
          <div className="font-bold">Dr {["Smith", "Jones", "Williams", "Brown"][Math.floor(Math.random() * 4)]}</div>
          <div>Medical Centre</div>
          <div>{["123", "456", "789"][Math.floor(Math.random() * 3)]} {["High", "Main", "Church"][Math.floor(Math.random() * 3)]} Street</div>
          <div>{scenario.patient.address.split(',')[1]}</div>
          <div>Tel: 0{Math.floor(Math.random() * 900000) + 100000}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t-2 border-paper-border">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-bold border-2 border-primary">NHS</div>
        <div className="text-xs font-bold" style={{ color: '#000' }}>FP10SS{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
      </div>
    </div>
  );
};
