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
      className="paper-texture border-2 border-paper-border pixel-text transition-transform duration-200"
      style={{ 
        width: `${420 * scale}px`,
        fontSize: `${12 * scale}px`,
        padding: `${16 * scale}px`,
      }}
    >
      {/* NHS Header */}
      <div className="bg-nhs-green border-2 border-nhs-green-text p-2 mb-3">
        <div className="flex justify-between items-center">
          <div className="text-nhs-green-text font-bold" style={{ fontSize: `${14 * scale}px` }}>NHS</div>
          <div className="text-nhs-green-text text-right">
            <div className="font-bold">Pharmacy Stamp</div>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-2 mb-3 border-2 border-paper-border p-2">
        <div>
          <div className="text-xs opacity-70">Age</div>
          <div className="font-bold">{scenario.patient.age}</div>
          <div className="text-xs opacity-70 mt-1">D.o.B</div>
          <div>{new Date(new Date().getFullYear() - scenario.patient.age, 0, 1).toLocaleDateString('en-GB')}</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Title, Forename, Surname & Address</div>
          <div className="font-bold">{scenario.patient.name}</div>
          <div className="text-sm">{scenario.patient.address}</div>
          <div className="text-sm font-bold">{scenario.patient.postcode}</div>
          <div className="text-xs mt-1">
            <span className="opacity-70">NHS Number: </span>
            <span className="font-bold">{scenario.patient.nhsNumber}</span>
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="border-2 border-paper-border p-2 mb-3" style={{ minHeight: `${200 * scale}px` }}>
        <div className="text-xs opacity-70 mb-2">Endorsements</div>
        {scenario.prescriptions.map((prescription, idx) => (
          <div key={idx} className="mb-3 pb-2 border-b border-paper-border last:border-b-0">
            <div className="font-bold">{prescription.medication.name} {prescription.medication.dose} {prescription.medication.category === "Analgesic" ? "tablets" : prescription.medication.category === "Antibiotic" ? "capsules" : "tablets"}</div>
            <div className="text-sm">{prescription.instructions}</div>
            <div className="text-sm">{prescription.quantity}</div>
          </div>
        ))}
        <div className="mt-2 text-xs italic">[No more items on this prescription]</div>
      </div>

      {/* Signature */}
      <div className="border-t-2 border-paper-border pt-2 mb-2">
        <div className="flex justify-between items-center">
          <div className="text-xs opacity-70">Signature of Prescriber</div>
          <div className="text-xs opacity-70">Date</div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="font-script text-xl">Dr Signature</div>
          <div className="font-bold">{formattedDate}</div>
        </div>
      </div>

      {/* Prescriber Details */}
      <div className="border-2 border-paper-border p-2 grid grid-cols-2 gap-2">
        <div className="text-xs opacity-70">
          For dispenser<br/>
          No. of<br/>
          Prescrip.<br/>
          on form
        </div>
        <div className="text-sm">
          <div className="font-bold">NHS Healthcare Trust</div>
          <div>Dr {["Smith", "Jones", "Williams", "Brown"][Math.floor(Math.random() * 4)]}</div>
          <div>Medical Centre</div>
          <div>{["123", "456", "789"][Math.floor(Math.random() * 3)]} {["High", "Main", "Church"][Math.floor(Math.random() * 3)]} Street</div>
          <div>{scenario.patient.address.split(',')[1]}</div>
          <div>Tel: {Math.floor(Math.random() * 900000) + 100000}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-paper-border">
        <div className="bg-primary text-primary-foreground px-2 py-1 font-bold">NHS</div>
        <div className="text-xs opacity-70">FP10SS{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
      </div>
    </div>
  );
};
