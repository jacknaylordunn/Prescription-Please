export interface Medication {
  name: string;
  category: string;
  dose: string;
  frequency: string;
  indication: string;
  sideEffects: string[];
  timeCritical: boolean;
  class: string;
}

export const medications: Medication[] = [
  // Analgesics
  { name: "Paracetamol", category: "Analgesic", dose: "500mg-1g", frequency: "Four times daily", indication: "Pain relief, fever", sideEffects: ["Minimal at therapeutic dose", "Liver toxicity in overdose"], timeCritical: false, class: "Non-opioid analgesic" },
  { name: "Ibuprofen", category: "Analgesic", dose: "200-400mg", frequency: "Three times daily with food", indication: "Pain and inflammation", sideEffects: ["Gastric irritation", "Bleeding risk", "Renal impairment"], timeCritical: false, class: "NSAID" },
  { name: "Naproxen", category: "Analgesic", dose: "250-500mg", frequency: "Twice daily with food", indication: "Inflammatory pain, arthritis", sideEffects: ["Gastric irritation", "Cardiovascular risk", "Fluid retention"], timeCritical: false, class: "NSAID" },
  { name: "Co-codamol 8/500", category: "Analgesic", dose: "2 tablets", frequency: "Four times daily", indication: "Mild to moderate pain", sideEffects: ["Constipation", "Drowsiness", "Nausea"], timeCritical: false, class: "Opioid combination" },
  { name: "Co-codamol 30/500", category: "Analgesic", dose: "2 tablets", frequency: "Four times daily", indication: "Moderate pain", sideEffects: ["Constipation", "Drowsiness", "Respiratory depression"], timeCritical: false, class: "Opioid combination" },
  { name: "Codeine Phosphate", category: "Analgesic", dose: "30-60mg", frequency: "Four times daily", indication: "Mild to moderate pain", sideEffects: ["Constipation", "Drowsiness", "Nausea"], timeCritical: false, class: "Opioid" },
  { name: "Tramadol", category: "Analgesic", dose: "50-100mg", frequency: "Four times daily", indication: "Moderate to severe pain", sideEffects: ["Dizziness", "Nausea", "Seizure risk"], timeCritical: false, class: "Opioid" },
  { name: "Morphine Sulphate MR", category: "Analgesic", dose: "10-30mg", frequency: "Twice daily", indication: "Severe chronic pain", sideEffects: ["Respiratory depression", "Constipation", "Nausea"], timeCritical: false, class: "Opioid" },
  { name: "Oramorph", category: "Analgesic", dose: "10-20mg", frequency: "Four hourly PRN", indication: "Severe pain, breakthrough pain", sideEffects: ["Respiratory depression", "Constipation", "Drowsiness"], timeCritical: false, class: "Opioid" },
  { name: "Gabapentin", category: "Analgesic", dose: "300-900mg", frequency: "Three times daily", indication: "Neuropathic pain", sideEffects: ["Dizziness", "Drowsiness", "Peripheral oedema"], timeCritical: false, class: "Anticonvulsant (neuropathic pain)" },
  { name: "Pregabalin", category: "Analgesic", dose: "75-150mg", frequency: "Twice daily", indication: "Neuropathic pain, generalised anxiety", sideEffects: ["Dizziness", "Weight gain", "Peripheral oedema"], timeCritical: false, class: "Anticonvulsant (neuropathic pain)" },
  { name: "Amitriptyline", category: "Analgesic", dose: "10-75mg", frequency: "Once daily at night", indication: "Neuropathic pain, depression", sideEffects: ["Drowsiness", "Dry mouth", "Constipation", "Blurred vision"], timeCritical: false, class: "Tricyclic antidepressant" },
  { name: "Nortriptyline", category: "Analgesic", dose: "10-50mg", frequency: "Once daily at night", indication: "Neuropathic pain", sideEffects: ["Dry mouth", "Drowsiness", "Constipation"], timeCritical: false, class: "Tricyclic antidepressant" },
  { name: "Duloxetine", category: "Analgesic", dose: "30-60mg", frequency: "Once daily", indication: "Neuropathic pain, depression", sideEffects: ["Nausea", "Dry mouth", "Dizziness"], timeCritical: false, class: "SNRI" },
  
  // Cardiovascular
  { name: "Bisoprolol", category: "Cardiovascular", dose: "2.5-10mg", frequency: "Once daily", indication: "Heart failure, hypertension, angina", sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"], timeCritical: false, class: "Beta-blocker (cardioselective)" },
  { name: "Atenolol", category: "Cardiovascular", dose: "25-100mg", frequency: "Once daily", indication: "Hypertension, angina", sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"], timeCritical: false, class: "Beta-blocker (cardioselective)" },
  { name: "Propranolol", category: "Cardiovascular", dose: "40-160mg", frequency: "Two to three times daily", indication: "Hypertension, anxiety, migraine prophylaxis", sideEffects: ["Bradycardia", "Bronchospasm", "Cold extremities"], timeCritical: false, class: "Beta-blocker (non-selective)" },
  { name: "Ramipril", category: "Cardiovascular", dose: "2.5-10mg", frequency: "Once daily", indication: "Hypertension, heart failure, post-MI", sideEffects: ["Dry cough", "Hypotension", "Renal impairment"], timeCritical: false, class: "ACE inhibitor" },
  { name: "Lisinopril", category: "Cardiovascular", dose: "2.5-20mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dry cough", "Dizziness", "Hypotension"], timeCritical: false, class: "ACE inhibitor" },
  { name: "Perindopril", category: "Cardiovascular", dose: "4-8mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dry cough", "Dizziness", "Hypotension"], timeCritical: false, class: "ACE inhibitor" },
  { name: "Candesartan", category: "Cardiovascular", dose: "8-32mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dizziness", "Hypotension", "Hyperkalaemia"], timeCritical: false, class: "Angiotensin receptor blocker (ARB)" },
  { name: "Losartan", category: "Cardiovascular", dose: "25-100mg", frequency: "Once daily", indication: "Hypertension", sideEffects: ["Dizziness", "Hypotension", "Hyperkalaemia"], timeCritical: false, class: "Angiotensin receptor blocker (ARB)" },
  { name: "Amlodipine", category: "Cardiovascular", dose: "5-10mg", frequency: "Once daily", indication: "Hypertension, angina", sideEffects: ["Ankle swelling", "Flushing", "Headache"], timeCritical: false, class: "Calcium channel blocker (dihydropyridine)" },
  { name: "Diltiazem", category: "Cardiovascular", dose: "60mg", frequency: "Three times daily", indication: "Angina, hypertension", sideEffects: ["Bradycardia", "Ankle swelling", "Constipation"], timeCritical: false, class: "Calcium channel blocker (rate-limiting)" },
  { name: "Verapamil", category: "Cardiovascular", dose: "80-120mg", frequency: "Three times daily", indication: "Angina, hypertension, arrhythmias", sideEffects: ["Bradycardia", "Constipation", "Heart block"], timeCritical: false, class: "Calcium channel blocker (rate-limiting)" },
  { name: "Digoxin", category: "Cardiovascular", dose: "62.5-250mcg", frequency: "Once daily", indication: "Atrial fibrillation rate control, heart failure", sideEffects: ["Bradycardia", "Nausea", "Yellow/green vision", "Arrhythmias"], timeCritical: false, class: "Cardiac glycoside" },
  { name: "Amiodarone", category: "Cardiovascular", dose: "200mg", frequency: "Once daily", indication: "Atrial fibrillation, ventricular arrhythmias", sideEffects: ["Photosensitivity", "Thyroid dysfunction", "Pulmonary fibrosis", "Liver toxicity"], timeCritical: false, class: "Antiarrhythmic (Class III)" },
  { name: "Isosorbide Mononitrate", category: "Cardiovascular", dose: "10-60mg", frequency: "Twice daily", indication: "Angina prophylaxis", sideEffects: ["Headache", "Flushing", "Hypotension"], timeCritical: false, class: "Nitrate" },
  { name: "GTN Spray", category: "Cardiovascular", dose: "400mcg per spray", frequency: "PRN sublingual", indication: "Acute angina relief", sideEffects: ["Headache", "Dizziness", "Hypotension"], timeCritical: false, class: "Nitrate" },
  { name: "Doxazosin", category: "Cardiovascular", dose: "1-8mg", frequency: "Once daily", indication: "Hypertension, benign prostatic hyperplasia", sideEffects: ["Postural hypotension", "Dizziness", "Syncope on first dose"], timeCritical: false, class: "Alpha-blocker" },
  
  // Anticoagulants and Antiplatelets (D - Direct Oral Anticoagulants and warfarin - MISSED)
  { name: "Warfarin", category: "Anticoagulant", dose: "Variable (INR dependent)", frequency: "Once daily same time", indication: "AF, DVT/PE prevention, mechanical heart valves", sideEffects: ["Bleeding risk", "Haemorrhage"], timeCritical: true, class: "Vitamin K antagonist" },
  { name: "Rivaroxaban", category: "Anticoagulant", dose: "15-20mg", frequency: "Once daily with food", indication: "AF stroke prevention, DVT/PE treatment", sideEffects: ["Bleeding risk", "Gastrointestinal upset"], timeCritical: true, class: "Direct oral anticoagulant (DOAC) - Factor Xa inhibitor" },
  { name: "Apixaban", category: "Anticoagulant", dose: "2.5-5mg", frequency: "Twice daily", indication: "AF stroke prevention, DVT/PE prevention", sideEffects: ["Bleeding risk", "Nausea"], timeCritical: true, class: "Direct oral anticoagulant (DOAC) - Factor Xa inhibitor" },
  { name: "Edoxaban", category: "Anticoagulant", dose: "30-60mg", frequency: "Once daily", indication: "AF stroke prevention, DVT/PE treatment", sideEffects: ["Bleeding risk", "Anaemia"], timeCritical: true, class: "Direct oral anticoagulant (DOAC) - Factor Xa inhibitor" },
  { name: "Dabigatran", category: "Anticoagulant", dose: "110-150mg", frequency: "Twice daily", indication: "AF stroke prevention, DVT/PE prevention", sideEffects: ["Bleeding risk", "Dyspepsia"], timeCritical: true, class: "Direct oral anticoagulant (DOAC) - Direct thrombin inhibitor" },
  { name: "Aspirin", category: "Antiplatelet", dose: "75mg", frequency: "Once daily", indication: "Secondary prevention of MI/stroke", sideEffects: ["Gastric irritation", "Bleeding risk"], timeCritical: false, class: "Antiplatelet" },
  { name: "Clopidogrel", category: "Antiplatelet", dose: "75mg", frequency: "Once daily", indication: "Acute coronary syndrome, post-stent", sideEffects: ["Bleeding risk", "Dyspepsia"], timeCritical: false, class: "Antiplatelet" },
  { name: "Ticagrelor", category: "Antiplatelet", dose: "90mg", frequency: "Twice daily", indication: "Acute coronary syndrome", sideEffects: ["Bleeding risk", "Dyspnoea", "Bradycardia"], timeCritical: false, class: "Antiplatelet" },
  
  // Antibiotics
  { name: "Amoxicillin", category: "Antibiotic", dose: "250-500mg", frequency: "Three times daily", indication: "Respiratory tract infections, UTI", sideEffects: ["Rash", "Diarrhoea", "Nausea"], timeCritical: false, class: "Penicillin (beta-lactam)" },
  { name: "Flucloxacillin", category: "Antibiotic", dose: "250-500mg", frequency: "Four times daily", indication: "Staphylococcal skin/soft tissue infections", sideEffects: ["Nausea", "Diarrhoea", "Cholestatic jaundice"], timeCritical: false, class: "Penicillin (beta-lactamase resistant)" },
  { name: "Phenoxymethylpenicillin", category: "Antibiotic", dose: "250-500mg", frequency: "Four times daily", indication: "Streptococcal throat infections, cellulitis", sideEffects: ["Nausea", "Diarrhoea", "Rash"], timeCritical: false, class: "Penicillin" },
  { name: "Co-amoxiclav", category: "Antibiotic", dose: "375-625mg", frequency: "Three times daily", indication: "Respiratory/soft tissue infections", sideEffects: ["Diarrhoea", "Nausea", "Cholestatic jaundice"], timeCritical: false, class: "Penicillin + beta-lactamase inhibitor" },
  { name: "Clarithromycin", category: "Antibiotic", dose: "250-500mg", frequency: "Twice daily", indication: "Respiratory infections, H. pylori", sideEffects: ["Nausea", "Diarrhoea", "Metallic taste", "QT prolongation"], timeCritical: false, class: "Macrolide" },
  { name: "Erythromycin", category: "Antibiotic", dose: "250-500mg", frequency: "Four times daily", indication: "Respiratory infections (penicillin allergy)", sideEffects: ["Nausea", "Vomiting", "Abdominal pain"], timeCritical: false, class: "Macrolide" },
  { name: "Trimethoprim", category: "Antibiotic", dose: "200mg", frequency: "Twice daily", indication: "Urinary tract infections", sideEffects: ["Nausea", "Rash", "Hyperkalaemia"], timeCritical: false, class: "Folate synthesis inhibitor" },
  { name: "Nitrofurantoin", category: "Antibiotic", dose: "50-100mg", frequency: "Four times daily", indication: "Urinary tract infections", sideEffects: ["Nausea", "Peripheral neuropathy", "Pulmonary fibrosis"], timeCritical: false, class: "Nitrofuran" },
  { name: "Doxycycline", category: "Antibiotic", dose: "100mg", frequency: "Once or twice daily", indication: "Respiratory infections, acne", sideEffects: ["Nausea", "Photosensitivity", "Oesophagitis"], timeCritical: false, class: "Tetracycline" },
  { name: "Ciprofloxacin", category: "Antibiotic", dose: "250-500mg", frequency: "Twice daily", indication: "UTI, gastrointestinal infections", sideEffects: ["Nausea", "Tendon rupture", "QT prolongation"], timeCritical: false, class: "Fluoroquinolone" },
  { name: "Metronidazole", category: "Antibiotic", dose: "400mg", frequency: "Three times daily", indication: "Anaerobic infections, C. difficile", sideEffects: ["Nausea", "Metallic taste", "Disulfiram reaction"], timeCritical: false, class: "Nitroimidazole" },
  
  // Diuretics
  { name: "Furosemide", category: "Diuretic", dose: "20-80mg", frequency: "Once daily morning", indication: "Fluid overload, heart failure, oedema", sideEffects: ["Dehydration", "Hypotension", "Hypokalaemia", "Renal impairment"], timeCritical: false, class: "Loop diuretic" },
  { name: "Bumetanide", category: "Diuretic", dose: "1-5mg", frequency: "Once daily morning", indication: "Fluid overload, heart failure", sideEffects: ["Dehydration", "Hypokalaemia", "Hypotension"], timeCritical: false, class: "Loop diuretic" },
  { name: "Bendroflumethiazide", category: "Diuretic", dose: "2.5mg", frequency: "Once daily morning", indication: "Hypertension, mild oedema", sideEffects: ["Hypokalaemia", "Postural hypotension", "Gout"], timeCritical: false, class: "Thiazide diuretic" },
  { name: "Indapamide", category: "Diuretic", dose: "2.5mg", frequency: "Once daily morning", indication: "Hypertension", sideEffects: ["Hypokalaemia", "Dizziness"], timeCritical: false, class: "Thiazide-like diuretic" },
  { name: "Spironolactone", category: "Diuretic", dose: "25-100mg", frequency: "Once daily", indication: "Heart failure, ascites, primary hyperaldosteronism", sideEffects: ["Hyperkalaemia", "Gynaecomastia", "Renal impairment"], timeCritical: false, class: "Potassium-sparing diuretic (aldosterone antagonist)" },
  { name: "Amiloride", category: "Diuretic", dose: "5-10mg", frequency: "Once daily", indication: "Oedema (with thiazide/loop diuretic)", sideEffects: ["Hyperkalaemia", "Gastrointestinal upset"], timeCritical: false, class: "Potassium-sparing diuretic" },
  
  // Antidiabetic (S - Sugar - MISSED)
  { name: "Metformin", category: "Antidiabetic", dose: "500mg-1g", frequency: "Twice or three times daily with food", indication: "Type 2 diabetes mellitus", sideEffects: ["Diarrhoea", "Nausea", "Lactic acidosis (rare)", "B12 deficiency"], timeCritical: true, class: "Biguanide" },
  { name: "Gliclazide", category: "Antidiabetic", dose: "40-160mg", frequency: "Once or twice daily before meals", indication: "Type 2 diabetes mellitus", sideEffects: ["Hypoglycaemia", "Weight gain", "Gastrointestinal upset"], timeCritical: true, class: "Sulfonylurea" },
  { name: "Glimepiride", category: "Antidiabetic", dose: "1-4mg", frequency: "Once daily before breakfast", indication: "Type 2 diabetes mellitus", sideEffects: ["Hypoglycaemia", "Weight gain"], timeCritical: true, class: "Sulfonylurea" },
  { name: "Sitagliptin", category: "Antidiabetic", dose: "100mg", frequency: "Once daily", indication: "Type 2 diabetes mellitus", sideEffects: ["Upper respiratory tract infection", "Headache"], timeCritical: false, class: "DPP-4 inhibitor (gliptin)" },
  { name: "Empagliflozin", category: "Antidiabetic", dose: "10-25mg", frequency: "Once daily morning", indication: "Type 2 diabetes, heart failure", sideEffects: ["Genital thrush", "Urinary tract infections", "Diabetic ketoacidosis"], timeCritical: false, class: "SGLT2 inhibitor (gliflozin)" },
  { name: "Dapagliflozin", category: "Antidiabetic", dose: "10mg", frequency: "Once daily morning", indication: "Type 2 diabetes, heart failure", sideEffects: ["Genital infections", "Polyuria", "Hypotension"], timeCritical: false, class: "SGLT2 inhibitor (gliflozin)" },
  { name: "Insulin Lispro (Humalog)", category: "Antidiabetic", dose: "Variable", frequency: "Before meals", indication: "Type 1 & 2 diabetes", sideEffects: ["Hypoglycaemia", "Lipodystrophy", "Weight gain"], timeCritical: true, class: "Rapid-acting insulin analogue" },
  { name: "Insulin Aspart (NovoRapid)", category: "Antidiabetic", dose: "Variable", frequency: "Before meals", indication: "Type 1 & 2 diabetes", sideEffects: ["Hypoglycaemia", "Injection site reactions"], timeCritical: true, class: "Rapid-acting insulin analogue" },
  { name: "Insulin Glargine (Lantus)", category: "Antidiabetic", dose: "Variable", frequency: "Once daily same time", indication: "Type 1 & 2 diabetes basal insulin", sideEffects: ["Hypoglycaemia", "Weight gain"], timeCritical: true, class: "Long-acting insulin analogue" },
  { name: "Insulin Detemir (Levemir)", category: "Antidiabetic", dose: "Variable", frequency: "Once or twice daily", indication: "Type 1 & 2 diabetes basal insulin", sideEffects: ["Hypoglycaemia", "Injection site reactions"], timeCritical: true, class: "Long-acting insulin analogue" },
  { name: "Humulin M3", category: "Antidiabetic", dose: "Variable", frequency: "Twice daily before meals", indication: "Type 1 & 2 diabetes", sideEffects: ["Hypoglycaemia", "Weight gain"], timeCritical: true, class: "Biphasic insulin (30% short / 70% intermediate)" },
  
  // Respiratory
  { name: "Salbutamol Inhaler", category: "Bronchodilator", dose: "100-200mcg", frequency: "PRN up to QDS", indication: "Asthma, COPD acute relief", sideEffects: ["Tremor", "Tachycardia", "Palpitations"], timeCritical: false, class: "Short-acting beta-2 agonist (SABA)" },
  { name: "Salbutamol Nebules", category: "Bronchodilator", dose: "2.5-5mg", frequency: "PRN nebulised", indication: "Acute severe asthma/COPD", sideEffects: ["Tremor", "Tachycardia", "Hypokalaemia"], timeCritical: false, class: "Short-acting beta-2 agonist (SABA)" },
  { name: "Ipratropium Bromide", category: "Bronchodilator", dose: "20-40mcg", frequency: "QDS", indication: "COPD, severe asthma", sideEffects: ["Dry mouth", "Urinary retention"], timeCritical: false, class: "Short-acting muscarinic antagonist (SAMA)" },
  { name: "Seretide (Salmeterol/Fluticasone)", category: "Bronchodilator", dose: "25/250mcg", frequency: "Twice daily", indication: "Asthma maintenance", sideEffects: ["Oral candidiasis", "Hoarse voice", "Pneumonia risk"], timeCritical: false, class: "LABA/ICS combination" },
  { name: "Symbicort (Budesonide/Formoterol)", category: "Bronchodilator", dose: "200/6mcg", frequency: "Twice daily + PRN", indication: "Asthma maintenance and reliever", sideEffects: ["Oral thrush", "Hoarse voice"], timeCritical: false, class: "LABA/ICS combination" },
  { name: "Tiotropium (Spiriva)", category: "Bronchodilator", dose: "18mcg", frequency: "Once daily", indication: "COPD maintenance", sideEffects: ["Dry mouth", "Constipation"], timeCritical: false, class: "Long-acting muscarinic antagonist (LAMA)" },
  { name: "Montelukast", category: "Bronchodilator", dose: "10mg", frequency: "Once daily evening", indication: "Asthma prophylaxis", sideEffects: ["Headache", "Gastrointestinal upset", "Mood changes"], timeCritical: false, class: "Leukotriene receptor antagonist" },
  { name: "Carbocisteine", category: "Mucolytic", dose: "375-750mg", frequency: "Three times daily", indication: "COPD with chronic productive cough", sideEffects: ["Gastrointestinal upset", "Rash"], timeCritical: false, class: "Mucolytic" },
  
  // Gastric
  { name: "Omeprazole", category: "PPI", dose: "20-40mg", frequency: "Once daily before breakfast", indication: "GORD, peptic ulcer, dyspepsia", sideEffects: ["Headache", "Diarrhoea", "C. difficile risk", "Fracture risk"], timeCritical: false, class: "Proton pump inhibitor" },
  { name: "Lansoprazole", category: "PPI", dose: "15-30mg", frequency: "Once daily before breakfast", indication: "GORD, peptic ulcer", sideEffects: ["Headache", "Nausea", "Diarrhoea"], timeCritical: false, class: "Proton pump inhibitor" },
  { name: "Esomeprazole", category: "PPI", dose: "20-40mg", frequency: "Once daily", indication: "GORD, peptic ulcer", sideEffects: ["Headache", "Abdominal pain"], timeCritical: false, class: "Proton pump inhibitor" },
  { name: "Ranitidine", category: "H2 antagonist", dose: "150mg", frequency: "Twice daily", indication: "GORD, peptic ulcers (now rarely used)", sideEffects: ["Headache", "Dizziness", "Diarrhoea"], timeCritical: false, class: "H2-receptor antagonist" },
  { name: "Gaviscon Advance", category: "Antacid", dose: "10-20ml", frequency: "After meals and bedtime", indication: "Heartburn, acid reflux", sideEffects: ["Minimal", "Constipation"], timeCritical: false, class: "Alginate/Antacid" },
  
  // Statins
  { name: "Atorvastatin", category: "Statin", dose: "20-80mg", frequency: "Once daily evening", indication: "Hypercholesterolaemia, CVD prevention", sideEffects: ["Muscle pain", "Liver disturbance", "Diabetes risk"], timeCritical: false, class: "HMG-CoA reductase inhibitor (statin)" },
  { name: "Simvastatin", category: "Statin", dose: "20-40mg", frequency: "Once daily at night", indication: "Hypercholesterolaemia", sideEffects: ["Muscle pain (myalgia)", "Rhabdomyolysis", "Liver dysfunction"], timeCritical: false, class: "HMG-CoA reductase inhibitor (statin)" },
  { name: "Pravastatin", category: "Statin", dose: "10-40mg", frequency: "Once daily evening", indication: "Hypercholesterolaemia", sideEffects: ["Muscle pain", "Gastrointestinal upset"], timeCritical: false, class: "HMG-CoA reductase inhibitor (statin)" },
  
  // Antiemetics
  { name: "Cyclizine", category: "Antiemetic", dose: "50mg", frequency: "Up to TDS", indication: "Nausea and vomiting, motion sickness", sideEffects: ["Drowsiness", "Dry mouth", "Blurred vision"], timeCritical: false, class: "Antihistamine (H1 antagonist)" },
  { name: "Ondansetron", category: "Antiemetic", dose: "4-8mg", frequency: "Up to TDS", indication: "Chemotherapy-induced nausea, post-op", sideEffects: ["Constipation", "Headache", "QT prolongation"], timeCritical: false, class: "5-HT3 antagonist" },
  { name: "Metoclopramide", category: "Antiemetic", dose: "10mg", frequency: "TDS", indication: "Nausea, gastroparesis", sideEffects: ["Extrapyramidal effects", "Drowsiness", "Dystonia"], timeCritical: false, class: "Dopamine (D2) antagonist" },
  { name: "Prochlorperazine", category: "Antiemetic", dose: "5-10mg", frequency: "TDS", indication: "Nausea, vomiting, vertigo", sideEffects: ["Drowsiness", "Extrapyramidal effects", "Postural hypotension"], timeCritical: false, class: "Phenothiazine" },
  { name: "Domperidone", category: "Antiemetic", dose: "10mg", frequency: "TDS", indication: "Nausea, gastroparesis", sideEffects: ["Dry mouth", "QT prolongation", "Cardiac arrhythmias"], timeCritical: false, class: "Dopamine antagonist" },
  
  // Antidepressants
  { name: "Citalopram", category: "Antidepressant", dose: "10-40mg", frequency: "Once daily", indication: "Depression, anxiety disorders", sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction", "QT prolongation"], timeCritical: false, class: "Selective serotonin reuptake inhibitor (SSRI)" },
  { name: "Sertraline", category: "Antidepressant", dose: "50-200mg", frequency: "Once daily", indication: "Depression, anxiety, PTSD, OCD", sideEffects: ["Nausea", "Diarrhoea", "Sexual dysfunction"], timeCritical: false, class: "Selective serotonin reuptake inhibitor (SSRI)" },
  { name: "Fluoxetine", category: "Antidepressant", dose: "20-60mg", frequency: "Once daily morning", indication: "Depression, OCD, bulimia", sideEffects: ["Nausea", "Insomnia", "Anxiety initially"], timeCritical: false, class: "Selective serotonin reuptake inhibitor (SSRI)" },
  { name: "Mirtazapine", category: "Antidepressant", dose: "15-45mg", frequency: "Once daily at night", indication: "Depression", sideEffects: ["Sedation", "Weight gain", "Increased appetite"], timeCritical: false, class: "Noradrenergic and specific serotonergic antidepressant (NaSSA)" },
  { name: "Venlafaxine", category: "Antidepressant", dose: "75-225mg", frequency: "Once or twice daily", indication: "Depression, generalised anxiety disorder", sideEffects: ["Nausea", "Hypertension", "Withdrawal syndrome"], timeCritical: false, class: "Serotonin-noradrenaline reuptake inhibitor (SNRI)" },
  
  // Anticonvulsants (E - Epilepsy - MISSED)
  { name: "Sodium Valproate", category: "Anticonvulsant", dose: "200-1000mg", frequency: "Twice daily", indication: "Epilepsy (all types), bipolar disorder", sideEffects: ["Weight gain", "Hair loss", "Tremor", "Liver toxicity", "Teratogenic"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Levetiracetam (Keppra)", category: "Anticonvulsant", dose: "250-1500mg", frequency: "Twice daily", indication: "Epilepsy (focal and generalised)", sideEffects: ["Drowsiness", "Headache", "Mood changes", "Aggression"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Phenytoin", category: "Anticonvulsant", dose: "200-300mg", frequency: "Once or twice daily", indication: "Epilepsy (tonic-clonic, focal)", sideEffects: ["Gum hypertrophy", "Ataxia", "Nystagmus", "Rash"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Carbamazepine", category: "Anticonvulsant", dose: "200-600mg", frequency: "Twice daily", indication: "Epilepsy (focal), trigeminal neuralgia", sideEffects: ["Dizziness", "Drowsiness", "Diplopia", "Hyponatraemia"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Lamotrigine", category: "Anticonvulsant", dose: "100-400mg", frequency: "Once or twice daily", indication: "Epilepsy, bipolar disorder", sideEffects: ["Rash (Stevens-Johnson syndrome)", "Headache", "Dizziness"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Topiramate", category: "Anticonvulsant", dose: "50-200mg", frequency: "Twice daily", indication: "Epilepsy, migraine prophylaxis", sideEffects: ["Cognitive impairment", "Paraesthesia", "Weight loss", "Renal stones"], timeCritical: true, class: "Anticonvulsant" },
  
  // Movement Disorders (M - Movement disorders - MISSED)
  { name: "Co-careldopa (Sinemet)", category: "Antiparkinsonian", dose: "25/100mg", frequency: "Three to four times daily", indication: "Parkinson's disease", sideEffects: ["Nausea", "Dyskinesia", "Postural hypotension", "Impulse control disorders"], timeCritical: true, class: "Levodopa + dopa-decarboxylase inhibitor" },
  { name: "Co-beneldopa (Madopar)", category: "Antiparkinsonian", dose: "12.5/50mg or 25/100mg", frequency: "Three to four times daily", indication: "Parkinson's disease", sideEffects: ["Nausea", "Dyskinesia", "Confusion"], timeCritical: true, class: "Levodopa + dopa-decarboxylase inhibitor" },
  { name: "Ropinirole", category: "Antiparkinsonian", dose: "0.25-24mg", frequency: "Three times daily", indication: "Parkinson's disease, restless legs", sideEffects: ["Nausea", "Drowsiness", "Impulse control disorders", "Sleep attacks"], timeCritical: true, class: "Dopamine agonist (non-ergot)" },
  { name: "Pramipexole", category: "Antiparkinsonian", dose: "88mcg-1.1mg", frequency: "Three times daily", indication: "Parkinson's disease, restless legs", sideEffects: ["Nausea", "Drowsiness", "Impulse control disorders"], timeCritical: true, class: "Dopamine agonist (non-ergot)" },
  { name: "Rasagiline", category: "Antiparkinsonian", dose: "1mg", frequency: "Once daily", indication: "Parkinson's disease", sideEffects: ["Nausea", "Headache", "Arthralgia"], timeCritical: true, class: "MAO-B inhibitor" },
  { name: "Pyridostigmine", category: "Antimyasthenic", dose: "30-120mg", frequency: "Multiple times daily (QDS-6 times)", indication: "Myasthenia gravis", sideEffects: ["Abdominal cramps", "Diarrhoea", "Increased salivation", "Muscle fasciculations"], timeCritical: true, class: "Acetylcholinesterase inhibitor" },
  
  // Steroids (S - Steroids - MISSED)
  { name: "Prednisolone", category: "Steroid", dose: "5-60mg", frequency: "Once daily morning", indication: "Asthma, COPD exacerbation, inflammatory conditions", sideEffects: ["Weight gain", "Osteoporosis", "Immunosuppression", "Diabetes", "Mood changes"], timeCritical: true, class: "Corticosteroid" },
  { name: "Hydrocortisone", category: "Steroid", dose: "10-20mg", frequency: "Twice or three times daily", indication: "Adrenal insufficiency, Addison's crisis", sideEffects: ["Weight gain", "Mood changes", "Hypertension"], timeCritical: true, class: "Corticosteroid" },
  { name: "Dexamethasone", category: "Steroid", dose: "0.5-10mg", frequency: "Variable", indication: "Cerebral oedema, severe inflammation", sideEffects: ["Insomnia", "Psychosis", "Hyperglycaemia"], timeCritical: false, class: "Corticosteroid (long-acting)" },
  
  // Immunomodulators (I - Immunomodulators - MISSED)
  { name: "Azathioprine", category: "Immunosuppressant", dose: "50-150mg", frequency: "Once daily", indication: "Autoimmune conditions, transplant rejection prevention", sideEffects: ["Bone marrow suppression", "Nausea", "Hepatotoxicity"], timeCritical: true, class: "Antimetabolite immunosuppressant" },
  { name: "Methotrexate", category: "Immunosuppressant", dose: "7.5-25mg", frequency: "Once weekly (specific day)", indication: "Rheumatoid arthritis, psoriasis, Crohn's", sideEffects: ["Bone marrow suppression", "Liver toxicity", "Mucositis", "Pulmonary fibrosis"], timeCritical: true, class: "Antimetabolite (folic acid antagonist)" },
  { name: "Mycophenolate", category: "Immunosuppressant", dose: "500-1000mg", frequency: "Twice daily", indication: "Transplant rejection prevention", sideEffects: ["Diarrhoea", "Leucopenia", "Increased infection risk"], timeCritical: true, class: "Immunosuppressant" },
  { name: "Tacrolimus", category: "Immunosuppressant", dose: "1-5mg", frequency: "Twice daily", indication: "Transplant rejection prevention", sideEffects: ["Nephrotoxicity", "Tremor", "Hypertension", "Diabetes"], timeCritical: true, class: "Calcineurin inhibitor" },
  
  // Laxatives
  { name: "Lactulose", category: "Laxative", dose: "15ml", frequency: "Twice daily", indication: "Constipation, hepatic encephalopathy", sideEffects: ["Bloating", "Flatulence", "Abdominal cramps"], timeCritical: false, class: "Osmotic laxative" },
  { name: "Senna", category: "Laxative", dose: "7.5-15mg", frequency: "Once daily at night", indication: "Constipation", sideEffects: ["Abdominal cramps", "Diarrhoea"], timeCritical: false, class: "Stimulant laxative" },
  { name: "Bisacodyl", category: "Laxative", dose: "5-10mg", frequency: "Once daily at night", indication: "Constipation", sideEffects: ["Abdominal cramps", "Diarrhoea"], timeCritical: false, class: "Stimulant laxative" },
  { name: "Movicol", category: "Laxative", dose: "1-3 sachets", frequency: "Daily", indication: "Constipation, faecal impaction", sideEffects: ["Abdominal distension", "Flatulence"], timeCritical: false, class: "Osmotic laxative (macrogol)" },
  { name: "Docusate Sodium", category: "Laxative", dose: "100-200mg", frequency: "Twice daily", indication: "Constipation (stool softener)", sideEffects: ["Abdominal cramps", "Diarrhoea"], timeCritical: false, class: "Stool softener" },
  
  // Thyroid and Supplements
  { name: "Levothyroxine", category: "Thyroid", dose: "25-200mcg", frequency: "Once daily morning (empty stomach)", indication: "Hypothyroidism", sideEffects: ["Palpitations if overdosed", "Weight loss", "Anxiety", "Arrhythmias"], timeCritical: false, class: "Thyroid hormone (T4)" },
  { name: "Ferrous Sulphate", category: "Supplement", dose: "200mg", frequency: "Twice daily", indication: "Iron deficiency anaemia", sideEffects: ["Constipation", "Black stools", "Nausea"], timeCritical: false, class: "Iron supplement" },
  { name: "Ferrous Fumarate", category: "Supplement", dose: "210mg", frequency: "Twice daily", indication: "Iron deficiency anaemia", sideEffects: ["Constipation", "Abdominal pain", "Black stools"], timeCritical: false, class: "Iron supplement" },
  { name: "Adcal-D3", category: "Supplement", dose: "1 tablet", frequency: "Twice daily", indication: "Calcium and Vitamin D deficiency, osteoporosis", sideEffects: ["Constipation", "Flatulence"], timeCritical: false, class: "Calcium/Vitamin D combination" },
  { name: "Folic Acid", category: "Supplement", dose: "5mg", frequency: "Once daily", indication: "Folate deficiency, prevention with methotrexate", sideEffects: ["Nausea", "Abdominal discomfort"], timeCritical: false, class: "Vitamin B9" },
  { name: "Vitamin B12 (Cyanocobalamin)", category: "Supplement", dose: "50-1000mcg", frequency: "Once daily or injection", indication: "Pernicious anaemia, B12 deficiency", sideEffects: ["Rarely: rash, hypersensitivity"], timeCritical: false, class: "Vitamin B12" },
  { name: "Vitamin D (Colecalciferol)", category: "Supplement", dose: "800-20,000 IU", frequency: "Once daily or weekly", indication: "Vitamin D deficiency", sideEffects: ["Hypercalcaemia if overdosed", "Nausea"], timeCritical: false, class: "Vitamin D3" },
  { name: "Alfacalcidol", category: "Supplement", dose: "0.25-1mcg", frequency: "Once daily", indication: "Chronic kidney disease (renal bone disease)", sideEffects: ["Hypercalcaemia", "Hyperphosphataemia"], timeCritical: false, class: "Vitamin D analogue" },
  
  // Antipsychotics
  { name: "Clozapine", category: "Antipsychotic", dose: "200-450mg", frequency: "Once or twice daily", indication: "Treatment-resistant schizophrenia", sideEffects: ["Agranulocytosis", "Sedation", "Weight gain", "Hypersalivation"], timeCritical: true, class: "Atypical antipsychotic" },
  { name: "Olanzapine", category: "Antipsychotic", dose: "5-20mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Weight gain", "Sedation", "Metabolic syndrome"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Aripiprazole", category: "Antipsychotic", dose: "10-30mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Akathisia", "Insomnia", "Nausea"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Risperidone", category: "Antipsychotic", dose: "2-6mg", frequency: "Once or twice daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Weight gain", "Extrapyramidal effects", "Hyperprolactinaemia"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Haloperidol", category: "Antipsychotic", dose: "1.5-10mg", frequency: "Once to three times daily", indication: "Schizophrenia, acute psychosis", sideEffects: ["Extrapyramidal effects", "Tardive dyskinesia", "Neuroleptic malignant syndrome", "QT prolongation"], timeCritical: false, class: "Typical antipsychotic" },
  
  // Mood Stabilizers
  { name: "Lithium", category: "Mood stabilizer", dose: "400-1200mg", frequency: "Once or twice daily", indication: "Bipolar disorder", sideEffects: ["Tremor", "Polyuria", "Weight gain", "Thyroid dysfunction"], timeCritical: true, class: "Mood stabilizer" },
  
  // Benzodiazepines
  { name: "Diazepam", category: "Benzodiazepine", dose: "2-10mg", frequency: "Up to three times daily", indication: "Anxiety, muscle spasm", sideEffects: ["Drowsiness", "Dependence"], timeCritical: false, class: "Benzodiazepine" },
  { name: "Lorazepam", category: "Benzodiazepine", dose: "1-4mg", frequency: "Once to three times daily", indication: "Anxiety, insomnia", sideEffects: ["Drowsiness", "Dependence"], timeCritical: false, class: "Benzodiazepine" },
  
  // Hypnotics
  { name: "Zopiclone", category: "Hypnotic", dose: "3.75-7.5mg", frequency: "Once daily at night", indication: "Insomnia", sideEffects: ["Metallic taste", "Drowsiness"], timeCritical: false, class: "Non-benzodiazepine hypnotic" },
  
  // Antimuscarinics
  { name: "Procyclidine", category: "Antimuscarinic", dose: "5-10mg", frequency: "Three times daily", indication: "Drug-induced parkinsonism", sideEffects: ["Dry mouth", "Blurred vision", "Urinary retention"], timeCritical: false, class: "Antimuscarinic" },
  
  // Antihypertensives - Additional
  { name: "Doxazosin", category: "Cardiovascular", dose: "1-8mg", frequency: "Once daily", indication: "Hypertension, benign prostatic hyperplasia", sideEffects: ["Postural hypotension", "Dizziness"], timeCritical: false, class: "Alpha-blocker" },
  
  // Others
  { name: "Gaviscon", category: "Antacid", dose: "10-20ml", frequency: "After meals and at bedtime", indication: "Heartburn, reflux", sideEffects: ["Minimal side effects", "Possible constipation"], timeCritical: false, class: "Alginate/Antacid" },
  { name: "Memantine", category: "Anti-dementia", dose: "10-20mg", frequency: "Once daily", indication: "Moderate to severe dementia", sideEffects: ["Dizziness", "Headache"], timeCritical: false, class: "NMDA receptor antagonist" },
  { name: "Mesalazine", category: "Anti-inflammatory", dose: "800mg-2.4g", frequency: "Three times daily", indication: "Ulcerative colitis, Crohn's disease", sideEffects: ["Nausea", "Headache", "Rash"], timeCritical: false, class: "5-aminosalicylic acid" },
  { name: "Naproxen", category: "NSAID", dose: "250-500mg", frequency: "Twice daily", indication: "Pain, inflammation", sideEffects: ["Gastric irritation", "Bleeding risk"], timeCritical: false, class: "NSAID" },
  
  
  // Antipsychotics
  { name: "Clozapine", category: "Antipsychotic", dose: "200-450mg", frequency: "Once or twice daily", indication: "Treatment-resistant schizophrenia", sideEffects: ["Agranulocytosis", "Sedation", "Weight gain", "Hypersalivation", "Seizure risk"], timeCritical: true, class: "Atypical antipsychotic" },
  { name: "Olanzapine", category: "Antipsychotic", dose: "5-20mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder, agitation", sideEffects: ["Weight gain", "Sedation", "Metabolic syndrome", "Diabetes"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Aripiprazole", category: "Antipsychotic", dose: "10-30mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Akathisia", "Insomnia", "Nausea", "Restlessness"], timeCritical: false, class: "Atypical antipsychotic (partial agonist)" },
  { name: "Quetiapine", category: "Antipsychotic", dose: "25-800mg", frequency: "Once or twice daily", indication: "Schizophrenia, bipolar disorder, depression", sideEffects: ["Sedation", "Weight gain", "Postural hypotension", "Hyperglycaemia"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Risperidone", category: "Antipsychotic", dose: "2-6mg", frequency: "Once or twice daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Weight gain", "Extrapyramidal effects", "Hyperprolactinaemia", "Sedation"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Haloperidol", category: "Antipsychotic", dose: "1.5-20mg", frequency: "Once to three times daily", indication: "Schizophrenia, acute psychosis, delirium", sideEffects: ["Extrapyramidal effects", "Tardive dyskinesia", "Neuroleptic malignant syndrome", "QT prolongation"], timeCritical: false, class: "Typical antipsychotic (butyrophenone)" },
  { name: "Chlorpromazine", category: "Antipsychotic", dose: "25-100mg", frequency: "Three times daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Sedation", "Postural hypotension", "Extrapyramidal effects"], timeCritical: false, class: "Typical antipsychotic (phenothiazine)" },
  { name: "Amisulpride", category: "Antipsychotic", dose: "200-800mg", frequency: "Once or twice daily", indication: "Schizophrenia", sideEffects: ["Hyperprolactinaemia", "Weight gain", "Insomnia"], timeCritical: false, class: "Atypical antipsychotic" },
  
  // Mood Stabilizers
  { name: "Lithium Carbonate", category: "Mood stabilizer", dose: "400-1200mg", frequency: "Once or twice daily", indication: "Bipolar disorder, augmentation in depression", sideEffects: ["Tremor", "Polyuria", "Weight gain", "Thyroid dysfunction", "Renal impairment"], timeCritical: true, class: "Mood stabilizer" },
  
  // Benzodiazepines
  { name: "Diazepam", category: "Benzodiazepine", dose: "2-10mg", frequency: "Up to TDS PRN", indication: "Anxiety, muscle spasm, seizures", sideEffects: ["Drowsiness", "Dependence", "Falls risk", "Respiratory depression"], timeCritical: false, class: "Benzodiazepine (long-acting)" },
  { name: "Lorazepam", category: "Benzodiazepine", dose: "0.5-4mg", frequency: "TDS PRN", indication: "Anxiety, insomnia, acute behavioural disturbance", sideEffects: ["Drowsiness", "Dependence", "Confusion"], timeCritical: false, class: "Benzodiazepine (intermediate-acting)" },
  { name: "Temazepam", category: "Benzodiazepine", dose: "10-20mg", frequency: "Once daily at night", indication: "Insomnia (short-term)", sideEffects: ["Drowsiness", "Dependence", "Cognitive impairment"], timeCritical: false, class: "Benzodiazepine (intermediate-acting)" },
  { name: "Clonazepam", category: "Benzodiazepine", dose: "0.5-2mg", frequency: "Twice daily", indication: "Epilepsy, panic disorder", sideEffects: ["Drowsiness", "Dependence", "Ataxia"], timeCritical: false, class: "Benzodiazepine (long-acting)" },
  
  // Hypnotics
  { name: "Zopiclone", category: "Hypnotic", dose: "3.75-7.5mg", frequency: "Once daily at night", indication: "Insomnia (short-term)", sideEffects: ["Metallic taste", "Drowsiness", "Dependence"], timeCritical: false, class: "Non-benzodiazepine hypnotic (Z-drug)" },
  { name: "Zolpidem", category: "Hypnotic", dose: "5-10mg", frequency: "Once daily at night", indication: "Insomnia (short-term)", sideEffects: ["Drowsiness", "Dependence", "Confusion"], timeCritical: false, class: "Non-benzodiazepine hypnotic (Z-drug)" },
  { name: "Melatonin", category: "Hypnotic", dose: "2mg", frequency: "Once daily at night", indication: "Insomnia (over 55 years)", sideEffects: ["Headache", "Drowsiness"], timeCritical: false, class: "Melatonin receptor agonist" },
  
  // Antimuscarinics
  { name: "Procyclidine", category: "Antimuscarinic", dose: "5-10mg", frequency: "TDS", indication: "Drug-induced parkinsonism, dystonia", sideEffects: ["Dry mouth", "Blurred vision", "Urinary retention", "Confusion"], timeCritical: false, class: "Antimuscarinic" },
  { name: "Hyoscine Butylbromide (Buscopan)", category: "Antimuscarinic", dose: "10-20mg", frequency: "QDS PRN", indication: "Abdominal cramping, IBS", sideEffects: ["Dry mouth", "Constipation", "Blurred vision"], timeCritical: false, class: "Antimuscarinic antispasmodic" },
  
  // Anti-dementia
  { name: "Donepezil", category: "Anti-dementia", dose: "5-10mg", frequency: "Once daily", indication: "Alzheimer's dementia", sideEffects: ["Nausea", "Diarrhoea", "Insomnia", "Bradycardia"], timeCritical: false, class: "Acetylcholinesterase inhibitor" },
  { name: "Rivastigmine", category: "Anti-dementia", dose: "3-6mg", frequency: "Twice daily", indication: "Alzheimer's and Parkinson's dementia", sideEffects: ["Nausea", "Vomiting", "Diarrhoea"], timeCritical: false, class: "Acetylcholinesterase inhibitor" },
  { name: "Memantine", category: "Anti-dementia", dose: "10-20mg", frequency: "Once daily", indication: "Moderate to severe Alzheimer's dementia", sideEffects: ["Dizziness", "Headache", "Constipation"], timeCritical: false, class: "NMDA receptor antagonist" },
  
  // Antihistamines
  { name: "Cetirizine", category: "Antihistamine", dose: "10mg", frequency: "Once daily", indication: "Allergic rhinitis, urticaria", sideEffects: ["Minimal drowsiness", "Dry mouth", "Headache"], timeCritical: false, class: "Non-sedating antihistamine (H1 antagonist)" },
  { name: "Loratadine", category: "Antihistamine", dose: "10mg", frequency: "Once daily", indication: "Allergic rhinitis, urticaria", sideEffects: ["Headache", "Minimal drowsiness"], timeCritical: false, class: "Non-sedating antihistamine (H1 antagonist)" },
  { name: "Fexofenadine", category: "Antihistamine", dose: "120-180mg", frequency: "Once daily", indication: "Allergic rhinitis, urticaria", sideEffects: ["Headache", "Drowsiness"], timeCritical: false, class: "Non-sedating antihistamine (H1 antagonist)" },
  { name: "Chlorphenamine", category: "Antihistamine", dose: "4mg", frequency: "QDS PRN", indication: "Allergies, anaphylaxis adjunct", sideEffects: ["Sedation", "Dry mouth", "Urinary retention"], timeCritical: false, class: "Sedating antihistamine (H1 antagonist)" },
  { name: "Promethazine", category: "Antihistamine", dose: "25mg", frequency: "Once daily at night", indication: "Insomnia, allergies, nausea", sideEffects: ["Sedation", "Dry mouth", "Antimuscarinic effects"], timeCritical: false, class: "Sedating antihistamine (phenothiazine)" },
  
  // Urological
  { name: "Tamsulosin", category: "Urological", dose: "400mcg", frequency: "Once daily after food", indication: "Benign prostatic hyperplasia", sideEffects: ["Postural hypotension", "Dizziness", "Ejaculatory dysfunction"], timeCritical: false, class: "Alpha-blocker (selective)" },
  { name: "Finasteride", category: "Urological", dose: "5mg", frequency: "Once daily", indication: "Benign prostatic hyperplasia", sideEffects: ["Erectile dysfunction", "Reduced libido", "Gynaecomastia"], timeCritical: false, class: "5-alpha reductase inhibitor" },
  { name: "Solifenacin", category: "Urological", dose: "5-10mg", frequency: "Once daily", indication: "Overactive bladder, urge incontinence", sideEffects: ["Dry mouth", "Constipation", "Blurred vision"], timeCritical: false, class: "Antimuscarinic" },
  { name: "Tolterodine", category: "Urological", dose: "2-4mg", frequency: "Twice daily", indication: "Overactive bladder", sideEffects: ["Dry mouth", "Constipation", "Blurred vision"], timeCritical: false, class: "Antimuscarinic" },
  { name: "Oxybutynin", category: "Urological", dose: "2.5-5mg", frequency: "Two to three times daily", indication: "Overactive bladder, urge incontinence", sideEffects: ["Dry mouth", "Constipation", "Drowsiness", "Cognitive impairment"], timeCritical: false, class: "Antimuscarinic" },
  
  // Gout
  { name: "Allopurinol", category: "Gout", dose: "100-300mg", frequency: "Once daily", indication: "Gout prophylaxis, hyperuricaemia", sideEffects: ["Rash (Stevens-Johnson syndrome)", "Hypersensitivity"], timeCritical: false, class: "Xanthine oxidase inhibitor" },
  { name: "Colchicine", category: "Gout", dose: "500mcg", frequency: "Two to four times daily", indication: "Acute gout, gout prophylaxis", sideEffects: ["Diarrhoea", "Nausea", "Abdominal pain"], timeCritical: false, class: "Anti-inflammatory (microtubule inhibitor)" },
  
  // Others
  { name: "Alendronic Acid", category: "Bisphosphonate", dose: "70mg", frequency: "Once weekly (empty stomach, stay upright)", indication: "Osteoporosis", sideEffects: ["Oesophagitis", "Abdominal pain", "Osteonecrosis of jaw"], timeCritical: false, class: "Bisphosphonate" },
  { name: "Risedronate", category: "Bisphosphonate", dose: "35mg", frequency: "Once weekly (empty stomach)", indication: "Osteoporosis", sideEffects: ["Oesophagitis", "Abdominal pain"], timeCritical: false, class: "Bisphosphonate" },
  { name: "Denosumab", category: "Bisphosphonate alternative", dose: "60mg injection", frequency: "Every 6 months subcutaneous", indication: "Osteoporosis", sideEffects: ["Hypocalcaemia", "Osteonecrosis of jaw", "Infections"], timeCritical: false, class: "Monoclonal antibody (RANKL inhibitor)" },
  { name: "Baclofen", category: "Muscle relaxant", dose: "5-20mg", frequency: "TDS", indication: "Muscle spasticity (MS, spinal cord injury)", sideEffects: ["Drowsiness", "Muscle weakness", "Nausea"], timeCritical: false, class: "GABA-B receptor agonist" },
  { name: "Tizanidine", category: "Muscle relaxant", dose: "2-4mg", frequency: "TDS", indication: "Muscle spasticity", sideEffects: ["Drowsiness", "Dry mouth", "Hypotension"], timeCritical: false, class: "Alpha-2 adrenergic agonist" },
  { name: "Carbimazole", category: "Thyroid", dose: "5-40mg", frequency: "Once daily", indication: "Hyperthyroidism", sideEffects: ["Agranulocytosis", "Rash", "Nausea", "Jaundice"], timeCritical: false, class: "Antithyroid drug (thionamide)" },
  { name: "Sumatriptan", category: "Antimigraine", dose: "50-100mg", frequency: "PRN (max 300mg/24hr)", indication: "Acute migraine", sideEffects: ["Tingling", "Flushing", "Dizziness", "Chest tightness"], timeCritical: false, class: "5-HT1B/1D agonist (triptan)" },
  { name: "Propranolol", category: "Antimigraine", dose: "80-160mg", frequency: "Twice daily", indication: "Migraine prophylaxis", sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"], timeCritical: false, class: "Beta-blocker (non-selective)" },
  { name: "Mesalazine", category: "Anti-inflammatory (bowel)", dose: "800mg-1.2g", frequency: "TDS", indication: "Ulcerative colitis, Crohn's disease", sideEffects: ["Diarrhoea", "Nausea", "Headache", "Renal impairment"], timeCritical: false, class: "Aminosalicylate" },
  { name: "Sulfasalazine", category: "Anti-inflammatory (bowel)", dose: "500mg", frequency: "QDS", indication: "Ulcerative colitis, rheumatoid arthritis", sideEffects: ["Nausea", "Headache", "Oligospermia", "Orange urine"], timeCritical: false, class: "Aminosalicylate + sulfonamide" },
  { name: "Loperamide", category: "Antidiarrhoeal", dose: "2-4mg", frequency: "After each loose stool (max 16mg/day)", indication: "Acute and chronic diarrhoea", sideEffects: ["Constipation", "Abdominal cramps", "Drowsiness"], timeCritical: false, class: "Opioid receptor agonist (antimotility)" },
  { name: "Codeine Phosphate", category: "Antidiarrhoeal", dose: "30mg", frequency: "QDS PRN", indication: "Diarrhoea", sideEffects: ["Constipation", "Drowsiness", "Nausea"], timeCritical: false, class: "Opioid" },
  
  // Gout
  { name: "Allopurinol", category: "Antigout", dose: "100-300mg", frequency: "Once daily", indication: "Gout prophylaxis", sideEffects: ["Rash", "Hepatotoxicity"], timeCritical: false, class: "Xanthine oxidase inhibitor" },
  { name: "Colchicine", category: "Antigout", dose: "500mcg", frequency: "Two to four times daily", indication: "Acute gout", sideEffects: ["Diarrhoea", "Nausea", "Abdominal pain"], timeCritical: false, class: "Anti-inflammatory" },
  
  // Osteoporosis
  { name: "Alendronic Acid", category: "Bisphosphonate", dose: "70mg", frequency: "Once weekly", indication: "Osteoporosis", sideEffects: ["Oesophagitis", "Musculoskeletal pain"], timeCritical: false, class: "Bisphosphonate" },
  { name: "Risedronate", category: "Bisphosphonate", dose: "35mg", frequency: "Once weekly", indication: "Osteoporosis", sideEffects: ["Oesophagitis", "Headache"], timeCritical: false, class: "Bisphosphonate" },
  { name: "Denosumab", category: "Bone agent", dose: "60mg", frequency: "Every 6 months (injection)", indication: "Osteoporosis", sideEffects: ["Hypocalcaemia", "Musculoskeletal pain"], timeCritical: false, class: "Monoclonal antibody" },
  
  // Migraine
  { name: "Sumatriptan", category: "Antimigraine", dose: "50-100mg", frequency: "As required (max 2 doses/24hr)", indication: "Acute migraine", sideEffects: ["Chest tightness", "Tingling", "Flushing"], timeCritical: false, class: "Triptan" },
  { name: "Topiramate", category: "Anticonvulsant", dose: "50-100mg", frequency: "Twice daily", indication: "Migraine prophylaxis, epilepsy", sideEffects: ["Cognitive impairment", "Weight loss", "Paraesthesia"], timeCritical: false, class: "Anticonvulsant" },
  
  // Antivirals
  { name: "Aciclovir", category: "Antiviral", dose: "200-800mg", frequency: "Five times daily", indication: "Herpes simplex, shingles", sideEffects: ["Nausea", "Headache"], timeCritical: false, class: "Antiviral" },
  { name: "Oseltamivir", category: "Antiviral", dose: "75mg", frequency: "Twice daily", indication: "Influenza", sideEffects: ["Nausea", "Vomiting"], timeCritical: false, class: "Neuraminidase inhibitor" },
  
  // Additional Anticoagulants
  { name: "Dabigatran", category: "Anticoagulant", dose: "110-150mg", frequency: "Twice daily", indication: "DVT prevention, AF", sideEffects: ["Bleeding risk", "Dyspepsia"], timeCritical: true, class: "Direct oral anticoagulant (DOAC)" },
  { name: "Enoxaparin", category: "Anticoagulant", dose: "40mg", frequency: "Once daily (injection)", indication: "DVT prophylaxis", sideEffects: ["Bleeding risk", "Injection site reactions"], timeCritical: true, class: "Low molecular weight heparin" },
  
  // Eye drops
  { name: "Latanoprost", category: "Eye drops", dose: "One drop", frequency: "Once daily at night", indication: "Glaucoma", sideEffects: ["Eye irritation", "Darkening of iris"], timeCritical: false, class: "Prostaglandin analogue" },
  { name: "Timolol eye drops", category: "Eye drops", dose: "One drop", frequency: "Twice daily", indication: "Glaucoma", sideEffects: ["Eye irritation", "Systemic beta-blocker effects"], timeCritical: false, class: "Beta-blocker" },
  
  // Muscle relaxants
  { name: "Baclofen", category: "Muscle relaxant", dose: "5-25mg", frequency: "Three times daily", indication: "Muscle spasticity", sideEffects: ["Drowsiness", "Weakness", "Nausea"], timeCritical: false, class: "Muscle relaxant" },
  { name: "Tizanidine", category: "Muscle relaxant", dose: "2-4mg", frequency: "Three times daily", indication: "Muscle spasticity", sideEffects: ["Drowsiness", "Dry mouth", "Hypotension"], timeCritical: false, class: "Alpha-2 agonist" },
  
  // Additional Anti-dementia
  { name: "Donepezil", category: "Anti-dementia", dose: "5-10mg", frequency: "Once daily at night", indication: "Alzheimer's disease", sideEffects: ["Nausea", "Diarrhoea", "Insomnia"], timeCritical: false, class: "Acetylcholinesterase inhibitor" },
  { name: "Rivastigmine", category: "Anti-dementia", dose: "3-6mg", frequency: "Twice daily", indication: "Alzheimer's disease, Parkinson's dementia", sideEffects: ["Nausea", "Vomiting", "Dizziness"], timeCritical: false, class: "Acetylcholinesterase inhibitor" },
  
  // Additional Steroids
  { name: "Fludrocortisone", category: "Steroid", dose: "50-300mcg", frequency: "Once daily", indication: "Adrenal insufficiency", sideEffects: ["Hypertension", "Hypokalaemia", "Fluid retention"], timeCritical: true, class: "Mineralocorticoid" },
  
  // Additional Antibiotics
  { name: "Co-trimoxazole", category: "Antibiotic", dose: "960mg", frequency: "Twice daily", indication: "Pneumocystis prophylaxis, UTI", sideEffects: ["Rash", "Nausea", "Blood disorders"], timeCritical: false, class: "Sulfonamide combination" },
  { name: "Tazocin", category: "Antibiotic", dose: "4.5g", frequency: "Three times daily (IV)", indication: "Severe hospital-acquired infections", sideEffects: ["Diarrhoea", "Nausea", "Hypersensitivity"], timeCritical: false, class: "Penicillin/Beta-lactamase inhibitor" },
  { name: "Clindamycin", category: "Antibiotic", dose: "150-450mg", frequency: "Four times daily", indication: "Skin infections, anaerobic infections", sideEffects: ["Diarrhoea", "C. difficile", "Nausea"], timeCritical: false, class: "Lincosamide" },
  { name: "Meropenem", category: "Antibiotic", dose: "500mg-2g", frequency: "Three times daily (IV)", indication: "Severe infections, meningitis", sideEffects: ["Nausea", "Diarrhoea", "Seizures (high doses)"], timeCritical: false, class: "Carbapenem" },
  { name: "Ceftriaxone", category: "Antibiotic", dose: "1-2g", frequency: "Once or twice daily (IV/IM)", indication: "Meningitis, severe infections", sideEffects: ["Diarrhoea", "Hypersensitivity"], timeCritical: false, class: "Cephalosporin" },
  
  // Emergency/ICU medications
  { name: "Thiamine", category: "Supplement", dose: "100mg", frequency: "Three times daily", indication: "Wernicke's encephalopathy prevention, alcohol withdrawal", sideEffects: ["Minimal side effects", "Rare anaphylaxis"], timeCritical: true, class: "Vitamin B1" },
  { name: "Pabrinex", category: "Supplement", dose: "One pair of vials", frequency: "Once or twice daily (IV)", indication: "Wernicke's encephalopathy, alcohol withdrawal", sideEffects: ["Anaphylaxis risk", "Injection site reactions"], timeCritical: true, class: "High-potency B vitamins and C" },
  { name: "N-acetylcysteine", category: "Antidote", dose: "Variable", frequency: "IV infusion protocol", indication: "Paracetamol overdose", sideEffects: ["Nausea", "Anaphylactoid reactions", "Rash"], timeCritical: true, class: "Antidote" },
  { name: "Vitamin K", category: "Supplement", dose: "5-10mg", frequency: "Once daily", indication: "Warfarin reversal, coagulopathy", sideEffects: ["Injection site reactions", "Flushing"], timeCritical: true, class: "Vitamin K" },
  { name: "Magnesium Sulphate", category: "Emergency", dose: "4-6g", frequency: "IV bolus then infusion", indication: "Eclampsia, severe asthma", sideEffects: ["Flushing", "Hypotension", "Respiratory depression"], timeCritical: true, class: "Magnesium salt" },
  { name: "Labetalol", category: "Cardiovascular", dose: "100-400mg", frequency: "Twice daily or IV infusion", indication: "Hypertensive emergencies, pre-eclampsia", sideEffects: ["Postural hypotension", "Bradycardia", "Fatigue"], timeCritical: true, class: "Alpha and beta-blocker" },
  { name: "Dantrolene", category: "Emergency", dose: "1mg/kg", frequency: "IV bolus repeated PRN", indication: "Malignant hyperthermia, neuroleptic malignant syndrome", sideEffects: ["Muscle weakness", "Nausea", "Hepatotoxicity"], timeCritical: true, class: "Muscle relaxant" },
  { name: "Dexamethasone", category: "Steroid", dose: "0.15mg/kg", frequency: "Once to four times daily", indication: "Bacterial meningitis, cerebral oedema, croup", sideEffects: ["Hyperglycaemia", "Immunosuppression", "Mood changes"], timeCritical: true, class: "Corticosteroid" },
  { name: "Adrenaline", category: "Emergency", dose: "0.5mg (1:1000)", frequency: "IM PRN (repeat 5 mins)", indication: "Anaphylaxis, cardiac arrest", sideEffects: ["Palpitations", "Tremor", "Anxiety"], timeCritical: true, class: "Sympathomimetic" },
  { name: "Nimodipine", category: "Cardiovascular", dose: "60mg", frequency: "Every 4 hours", indication: "Subarachnoid haemorrhage", sideEffects: ["Hypotension", "Headache", "Flushing"], timeCritical: true, class: "Calcium channel blocker" },
  
  // Multiple Sclerosis
  { name: "Fampridine", category: "MS agent", dose: "10mg", frequency: "Twice daily", indication: "Multiple sclerosis walking improvement", sideEffects: ["Seizures", "Insomnia", "Dizziness"], timeCritical: false, class: "Potassium channel blocker" },
  
  // Additional UK commonly prescribed medications
  { name: "Cyclizine", category: "Antiemetic", dose: "50mg", frequency: "Three times daily PRN", indication: "Nausea and vomiting", sideEffects: ["Drowsiness", "Dry mouth", "Blurred vision"], timeCritical: false, class: "Antihistamine (H1 antagonist)" },
  { name: "Prochlorperazine", category: "Antiemetic", dose: "5-10mg", frequency: "Three times daily", indication: "Nausea, vomiting, vertigo", sideEffects: ["Drowsiness", "Dystonia", "Hypotension"], timeCritical: false, class: "Phenothiazine" },
  { name: "Betahistine", category: "Antivertigo", dose: "16mg", frequency: "Three times daily", indication: "Ménière's disease, vertigo", sideEffects: ["Nausea", "Headache", "Dyspepsia"], timeCritical: false, class: "Histamine analogue" },
  { name: "Co-beneldopa (Madopar)", category: "Antiparkinsonian", dose: "125mg", frequency: "Three to four times daily", indication: "Parkinson's disease", sideEffects: ["Dyskinesia", "Nausea", "Hypotension", "Impulse control disorders"], timeCritical: true, class: "Dopamine precursor + decarboxylase inhibitor" },
  { name: "Ropinirole", category: "Antiparkinsonian", dose: "1-24mg", frequency: "Three times daily", indication: "Parkinson's disease, restless legs syndrome", sideEffects: ["Nausea", "Drowsiness", "Impulse control disorders"], timeCritical: false, class: "Dopamine agonist (non-ergot)" },
  { name: "Pramipexole", category: "Antiparkinsonian", dose: "0.088-3.3mg", frequency: "Three times daily", indication: "Parkinson's disease, restless legs syndrome", sideEffects: ["Drowsiness", "Nausea", "Impulse control disorders"], timeCritical: false, class: "Dopamine agonist (non-ergot)" },
  { name: "Rasagiline", category: "Antiparkinsonian", dose: "1mg", frequency: "Once daily", indication: "Parkinson's disease", sideEffects: ["Headache", "Flu-like symptoms", "Dyskinesia"], timeCritical: false, class: "MAO-B inhibitor" },
  { name: "Apomorphine", category: "Antiparkinsonian", dose: "Variable", frequency: "Subcutaneous injection PRN", indication: "Parkinson's disease 'off' episodes", sideEffects: ["Nausea", "Vomiting", "Hypotension", "Dyskinesia"], timeCritical: true, class: "Dopamine agonist" },
  { name: "Venlafaxine", category: "Antidepressant", dose: "75-225mg", frequency: "Once daily", indication: "Major depression, generalized anxiety disorder", sideEffects: ["Nausea", "Dry mouth", "Hypertension", "Withdrawal symptoms"], timeCritical: false, class: "SNRI" },
  { name: "Trazodone", category: "Antidepressant", dose: "150-300mg", frequency: "Once or twice daily", indication: "Major depression, insomnia", sideEffects: ["Sedation", "Postural hypotension", "Priapism (rare)"], timeCritical: false, class: "Serotonin antagonist and reuptake inhibitor (SARI)" },
  { name: "Vortioxetine", category: "Antidepressant", dose: "10-20mg", frequency: "Once daily", indication: "Major depression", sideEffects: ["Nausea", "Sexual dysfunction"], timeCritical: false, class: "Serotonin modulator and stimulator" },
  { name: "Hydroxychloroquine", category: "Immunomodulator", dose: "200-400mg", frequency: "Once daily", indication: "Rheumatoid arthritis, SLE, malaria prophylaxis", sideEffects: ["Retinopathy", "Nausea", "Rash"], timeCritical: false, class: "DMARD / Antimalarial" },
  { name: "Leflunomide", category: "Immunomodulator", dose: "10-20mg", frequency: "Once daily", indication: "Rheumatoid arthritis, psoriatic arthritis", sideEffects: ["Diarrhoea", "Hepatotoxicity", "Hypertension", "Teratogenic"], timeCritical: false, class: "DMARD" },
  { name: "Adalimumab", category: "Immunomodulator", dose: "40mg", frequency: "Every 2 weeks (subcutaneous)", indication: "Rheumatoid arthritis, Crohn's disease, ulcerative colitis", sideEffects: ["Injection site reactions", "Infections", "Reactivation TB"], timeCritical: false, class: "Anti-TNF monoclonal antibody" },
  { name: "Etanercept", category: "Immunomodulator", dose: "25-50mg", frequency: "Once or twice weekly (subcutaneous)", indication: "Rheumatoid arthritis, psoriasis, ankylosing spondylitis", sideEffects: ["Injection site reactions", "Infections", "Demyelination"], timeCritical: false, class: "Anti-TNF fusion protein" },
  { name: "Rituximab", category: "Immunomodulator", dose: "Variable", frequency: "IV infusion every 6 months", indication: "Rheumatoid arthritis, lymphoma, SLE", sideEffects: ["Infusion reactions", "Infections", "Progressive multifocal leukoencephalopathy"], timeCritical: false, class: "Anti-CD20 monoclonal antibody" },
  { name: "Tacrolimus", category: "Immunosuppressant", dose: "Variable", frequency: "Twice daily", indication: "Organ transplant rejection prophylaxis, eczema (topical)", sideEffects: ["Nephrotoxicity", "Hypertension", "Diabetes", "Tremor"], timeCritical: true, class: "Calcineurin inhibitor" },
  { name: "Ciclosporin", category: "Immunosuppressant", dose: "Variable", frequency: "Twice daily", indication: "Organ transplant, severe eczema, rheumatoid arthritis", sideEffects: ["Nephrotoxicity", "Hypertension", "Gingival hyperplasia", "Hirsutism"], timeCritical: true, class: "Calcineurin inhibitor" },
  { name: "Mycophenolate Mofetil", category: "Immunosuppressant", dose: "500mg-1g", frequency: "Twice daily", indication: "Organ transplant rejection prophylaxis", sideEffects: ["Diarrhoea", "Infections", "Bone marrow suppression"], timeCritical: true, class: "Inosine monophosphate dehydrogenase inhibitor" },
  { name: "Phenytoin", category: "Anticonvulsant", dose: "200-300mg", frequency: "Once or twice daily", indication: "Epilepsy, status epilepticus", sideEffects: ["Gingival hyperplasia", "Ataxia", "Nystagmus", "Folate deficiency"], timeCritical: true, class: "Sodium channel blocker" },
  { name: "Lacosamide", category: "Anticonvulsant", dose: "100-200mg", frequency: "Twice daily", indication: "Focal seizures", sideEffects: ["Dizziness", "Headache", "Nausea", "PR prolongation"], timeCritical: true, class: "Sodium channel blocker" },
  { name: "Brivaracetam", category: "Anticonvulsant", dose: "50-100mg", frequency: "Twice daily", indication: "Focal seizures", sideEffects: ["Somnolence", "Dizziness", "Nausea"], timeCritical: true, class: "Synaptic vesicle protein modulator" },
  { name: "Perampanel", category: "Anticonvulsant", dose: "4-12mg", frequency: "Once daily at night", indication: "Focal seizures, generalized tonic-clonic seizures", sideEffects: ["Dizziness", "Aggression", "Falls", "Somnolence"], timeCritical: true, class: "AMPA receptor antagonist" },
  { name: "Ivabradine", category: "Cardiovascular", dose: "5-7.5mg", frequency: "Twice daily", indication: "Heart failure, angina", sideEffects: ["Bradycardia", "Phosphenes (visual disturbances)", "Headache"], timeCritical: false, class: "If channel inhibitor" },
  { name: "Sacubitril/Valsartan (Entresto)", category: "Cardiovascular", dose: "49/51mg-97/103mg", frequency: "Twice daily", indication: "Heart failure with reduced ejection fraction", sideEffects: ["Hypotension", "Hyperkalaemia", "Renal impairment"], timeCritical: false, class: "ARNi (Angiotensin receptor neprilysin inhibitor)" },
  { name: "Eplerenone", category: "Cardiovascular", dose: "25-50mg", frequency: "Once daily", indication: "Heart failure post-MI, hypertension", sideEffects: ["Hyperkalaemia", "Dizziness", "Renal impairment"], timeCritical: false, class: "Aldosterone antagonist (selective)" },
  { name: "Ranolazine", category: "Cardiovascular", dose: "375-750mg", frequency: "Twice daily", indication: "Chronic angina", sideEffects: ["Dizziness", "Constipation", "Nausea", "QT prolongation"], timeCritical: false, class: "Late sodium current inhibitor" },
  { name: "Nicorandil", category: "Cardiovascular", dose: "10-30mg", frequency: "Twice daily", indication: "Angina prophylaxis", sideEffects: ["Headache", "Flushing", "Oral/anal ulceration"], timeCritical: false, class: "Potassium channel activator / Nitrate" },
  { name: "Carvedilol", category: "Cardiovascular", dose: "3.125-25mg", frequency: "Twice daily", indication: "Heart failure, hypertension", sideEffects: ["Bradycardia", "Hypotension", "Fatigue", "Worsening heart failure initially"], timeCritical: false, class: "Beta-blocker (non-selective with alpha-blocking)" },
  { name: "Nebivolol", category: "Cardiovascular", dose: "5mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Bradycardia", "Fatigue", "Headache"], timeCritical: false, class: "Beta-blocker (highly cardioselective with NO-mediated vasodilation)" },
  { name: "Dronedarone", category: "Cardiovascular", dose: "400mg", frequency: "Twice daily", indication: "Atrial fibrillation", sideEffects: ["Nausea", "Diarrhoea", "QT prolongation", "Hepatotoxicity"], timeCritical: false, class: "Antiarrhythmic (Class III)" },
  { name: "Flecainide", category: "Cardiovascular", dose: "50-150mg", frequency: "Twice daily", indication: "Atrial fibrillation, paroxysmal SVT", sideEffects: ["Pro-arrhythmic", "Dizziness", "Visual disturbances"], timeCritical: false, class: "Antiarrhythmic (Class Ic)" },
  { name: "Sotalol", category: "Cardiovascular", dose: "40-160mg", frequency: "Twice daily", indication: "Atrial fibrillation, ventricular arrhythmias", sideEffects: ["Bradycardia", "Fatigue", "QT prolongation", "Torsades de pointes"], timeCritical: false, class: "Beta-blocker with Class III antiarrhythmic activity" },
  { name: "Sildenafil", category: "Vasodilator", dose: "25-100mg", frequency: "PRN 1 hour before activity", indication: "Erectile dysfunction, pulmonary hypertension", sideEffects: ["Headache", "Flushing", "Dyspepsia", "Visual disturbances"], timeCritical: false, class: "Phosphodiesterase-5 inhibitor" },
  { name: "Tadalafil", category: "Vasodilator", dose: "2.5-20mg", frequency: "Once daily or PRN", indication: "Erectile dysfunction, benign prostatic hyperplasia, pulmonary hypertension", sideEffects: ["Headache", "Dyspepsia", "Back pain", "Myalgia"], timeCritical: false, class: "Phosphodiesterase-5 inhibitor" },
  { name: "Alfacalcidol", category: "Supplement", dose: "0.25-1mcg", frequency: "Once daily", indication: "Vitamin D deficiency, chronic kidney disease", sideEffects: ["Hypercalcaemia", "Nausea", "Polyuria"], timeCritical: false, class: "Vitamin D analogue" },
  { name: "Colecalciferol", category: "Supplement", dose: "20,000 units", frequency: "Once weekly or daily", indication: "Vitamin D deficiency", sideEffects: ["Hypercalcaemia (rare at therapeutic dose)", "Nausea"], timeCritical: false, class: "Vitamin D3" },
  { name: "Ferrous Fumarate", category: "Supplement", dose: "210mg", frequency: "Twice daily", indication: "Iron deficiency anaemia", sideEffects: ["Constipation", "Nausea", "Black stools"], timeCritical: false, class: "Iron supplement" },
  { name: "Iron Sucrose", category: "Supplement", dose: "Variable", frequency: "IV infusion", indication: "Iron deficiency (oral intolerance or malabsorption)", sideEffects: ["Hypersensitivity", "Hypotension", "Injection site reactions"], timeCritical: false, class: "IV iron preparation" },
  { name: "Sodium Bicarbonate", category: "Supplement", dose: "500mg-1g", frequency: "Three times daily", indication: "Metabolic acidosis, urinary alkalinization", sideEffects: ["Belching", "Flatulence", "Metabolic alkalosis"], timeCritical: false, class: "Alkalinizing agent" },
  { name: "Sevelamer", category: "Phosphate binder", dose: "800mg", frequency: "Three times daily with meals", indication: "Hyperphosphataemia in CKD", sideEffects: ["Nausea", "Vomiting", "Constipation", "Diarrhoea"], timeCritical: false, class: "Phosphate binder (non-calcium)" },
  { name: "Cinacalcet", category: "Calcimimetic", dose: "30-180mg", frequency: "Once daily", indication: "Secondary hyperparathyroidism in CKD", sideEffects: ["Nausea", "Vomiting", "Hypocalcaemia"], timeCritical: false, class: "Calcimimetic" }
];
