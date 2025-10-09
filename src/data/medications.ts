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
  { name: "Paracetamol", category: "Analgesic", dose: "500mg-1g", frequency: "Four times daily", indication: "Pain relief", sideEffects: ["Minimal side effects at therapeutic doses", "Liver toxicity in overdose"], timeCritical: false, class: "Non-opioid analgesic" },
  { name: "Ibuprofen", category: "Analgesic", dose: "200-400mg", frequency: "Three times daily", indication: "Pain and inflammation", sideEffects: ["Gastric irritation", "Bleeding risk"], timeCritical: false, class: "NSAID" },
  { name: "Co-codamol", category: "Analgesic", dose: "8/500mg-30/500mg", frequency: "Four times daily", indication: "Moderate pain", sideEffects: ["Constipation", "Drowsiness"], timeCritical: false, class: "Opioid combination" },
  { name: "Morphine", category: "Analgesic", dose: "10-20mg", frequency: "Four hourly PRN", indication: "Severe pain", sideEffects: ["Respiratory depression", "Constipation", "Nausea"], timeCritical: false, class: "Opioid" },
  { name: "Tramadol", category: "Analgesic", dose: "50-100mg", frequency: "Four times daily", indication: "Moderate to severe pain", sideEffects: ["Dizziness", "Nausea", "Constipation"], timeCritical: false, class: "Opioid" },
  { name: "Codeine", category: "Analgesic", dose: "30-60mg", frequency: "Four times daily", indication: "Mild to moderate pain", sideEffects: ["Constipation", "Drowsiness"], timeCritical: false, class: "Opioid" },
  { name: "Gabapentin", category: "Analgesic", dose: "300-600mg", frequency: "Three times daily", indication: "Neuropathic pain", sideEffects: ["Dizziness", "Drowsiness"], timeCritical: false, class: "Anticonvulsant (used for pain)" },
  
  // Cardiovascular
  { name: "Bisoprolol", category: "Cardiovascular", dose: "2.5-10mg", frequency: "Once daily", indication: "Heart failure, hypertension", sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"], timeCritical: false, class: "Beta-blocker" },
  { name: "Ramipril", category: "Cardiovascular", dose: "2.5-10mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dry cough", "Dizziness", "Hypotension"], timeCritical: false, class: "ACE inhibitor" },
  { name: "Amlodipine", category: "Cardiovascular", dose: "5-10mg", frequency: "Once daily", indication: "Hypertension, angina", sideEffects: ["Ankle swelling", "Flushing", "Headache"], timeCritical: false, class: "Calcium channel blocker" },
  { name: "Digoxin", category: "Cardiovascular", dose: "62.5-250mcg", frequency: "Once daily", indication: "Atrial fibrillation", sideEffects: ["Bradycardia", "Nausea", "Visual disturbances"], timeCritical: false, class: "Cardiac glycoside" },
  { name: "Atenolol", category: "Cardiovascular", dose: "25-100mg", frequency: "Once daily", indication: "Hypertension, angina", sideEffects: ["Bradycardia", "Fatigue"], timeCritical: false, class: "Beta-blocker" },
  { name: "Amiodarone", category: "Cardiovascular", dose: "200mg", frequency: "Once daily", indication: "Arrhythmias", sideEffects: ["Photosensitivity", "Thyroid dysfunction"], timeCritical: false, class: "Antiarrhythmic" },
  
  // Anticoagulants (D - Direct Oral Anticoagulants and warfarin - MISSED)
  { name: "Warfarin", category: "Anticoagulant", dose: "Variable", frequency: "Once daily", indication: "Thrombosis prevention", sideEffects: ["Bleeding risk"], timeCritical: true, class: "Vitamin K antagonist" },
  { name: "Rivaroxaban", category: "Anticoagulant", dose: "15-20mg", frequency: "Once daily", indication: "DVT prevention, AF", sideEffects: ["Bleeding risk"], timeCritical: true, class: "Direct oral anticoagulant (DOAC)" },
  { name: "Apixaban", category: "Anticoagulant", dose: "2.5-5mg", frequency: "Twice daily", indication: "DVT prevention, AF", sideEffects: ["Bleeding risk"], timeCritical: true, class: "Direct oral anticoagulant (DOAC)" },
  { name: "Edoxaban", category: "Anticoagulant", dose: "60mg", frequency: "Once daily", indication: "DVT prevention, AF", sideEffects: ["Bleeding risk"], timeCritical: true, class: "Direct oral anticoagulant (DOAC)" },
  
  // Antibiotics
  { name: "Amoxicillin", category: "Antibiotic", dose: "250-500mg", frequency: "Three times daily", indication: "Bacterial infections", sideEffects: ["Rash", "Diarrhoea", "Nausea"], timeCritical: false, class: "Penicillin" },
  { name: "Flucloxacillin", category: "Antibiotic", dose: "250-500mg", frequency: "Four times daily", indication: "Staphylococcal infections", sideEffects: ["Nausea", "Diarrhoea"], timeCritical: false, class: "Penicillin" },
  { name: "Clarithromycin", category: "Antibiotic", dose: "250-500mg", frequency: "Twice daily", indication: "Respiratory infections", sideEffects: ["Nausea", "Diarrhoea", "Taste disturbance"], timeCritical: false, class: "Macrolide" },
  { name: "Co-amoxiclav", category: "Antibiotic", dose: "375-625mg", frequency: "Three times daily", indication: "Mixed bacterial infections", sideEffects: ["Diarrhoea", "Nausea"], timeCritical: false, class: "Penicillin combination" },
  { name: "Trimethoprim", category: "Antibiotic", dose: "200mg", frequency: "Twice daily", indication: "UTI", sideEffects: ["Nausea", "Rash"], timeCritical: false, class: "Folate antagonist" },
  
  // Diuretics
  { name: "Furosemide", category: "Diuretic", dose: "20-80mg", frequency: "Once daily", indication: "Fluid overload, heart failure", sideEffects: ["Dehydration", "Hypotension", "Electrolyte imbalance"], timeCritical: false, class: "Loop diuretic" },
  { name: "Bendroflumethiazide", category: "Diuretic", dose: "2.5mg", frequency: "Once daily", indication: "Hypertension, oedema", sideEffects: ["Hypokalaemia", "Dehydration"], timeCritical: false, class: "Thiazide diuretic" },
  { name: "Spironolactone", category: "Diuretic", dose: "25-100mg", frequency: "Once daily", indication: "Heart failure, ascites", sideEffects: ["Hyperkalaemia", "Gynaecomastia"], timeCritical: false, class: "Potassium-sparing diuretic" },
  
  // Antidiabetic (S - Sugar - MISSED)
  { name: "Metformin", category: "Antidiabetic", dose: "500mg-1g", frequency: "Twice daily", indication: "Type 2 diabetes", sideEffects: ["Diarrhoea", "Nausea", "Lactic acidosis (rare)"], timeCritical: true, class: "Biguanide" },
  { name: "Gliclazide", category: "Antidiabetic", dose: "40-80mg", frequency: "Once or twice daily", indication: "Type 2 diabetes", sideEffects: ["Hypoglycaemia", "Weight gain"], timeCritical: true, class: "Sulfonylurea" },
  { name: "Insulin", category: "Antidiabetic", dose: "Variable", frequency: "As prescribed", indication: "Type 1 & 2 diabetes", sideEffects: ["Hypoglycaemia", "Weight gain", "Lipodystrophy"], timeCritical: true, class: "Hormone" },
  
  // Respiratory
  { name: "Salbutamol", category: "Bronchodilator", dose: "100mcg", frequency: "PRN", indication: "Asthma, COPD", sideEffects: ["Tremor", "Tachycardia"], timeCritical: false, class: "Beta-2 agonist" },
  { name: "Ipratropium", category: "Bronchodilator", dose: "20-40mcg", frequency: "Four times daily", indication: "COPD", sideEffects: ["Dry mouth"], timeCritical: false, class: "Anticholinergic" },
  
  // Gastric
  { name: "Omeprazole", category: "PPI", dose: "20-40mg", frequency: "Once daily", indication: "GERD, peptic ulcers", sideEffects: ["Headache", "Diarrhoea"], timeCritical: false, class: "Proton pump inhibitor" },
  { name: "Lansoprazole", category: "PPI", dose: "15-30mg", frequency: "Once daily", indication: "GERD, peptic ulcers", sideEffects: ["Headache", "Diarrhoea"], timeCritical: false, class: "Proton pump inhibitor" },
  { name: "Ranitidine", category: "H2 antagonist", dose: "150mg", frequency: "Twice daily", indication: "GERD, peptic ulcers", sideEffects: ["Headache", "Dizziness"], timeCritical: false, class: "H2-receptor blocker" },
  
  // Statins
  { name: "Simvastatin", category: "Statin", dose: "20-40mg", frequency: "Once daily at night", indication: "High cholesterol", sideEffects: ["Muscle pain", "Liver disturbance"], timeCritical: false, class: "Statin" },
  { name: "Atorvastatin", category: "Statin", dose: "10-80mg", frequency: "Once daily", indication: "High cholesterol", sideEffects: ["Muscle pain", "Liver disturbance"], timeCritical: false, class: "Statin" },
  
  // Antiemetics
  { name: "Cyclizine", category: "Antiemetic", dose: "50mg", frequency: "Three times daily", indication: "Nausea and vomiting", sideEffects: ["Drowsiness", "Dry mouth"], timeCritical: false, class: "Antihistamine" },
  { name: "Ondansetron", category: "Antiemetic", dose: "4-8mg", frequency: "Three times daily", indication: "Nausea and vomiting", sideEffects: ["Constipation", "Headache"], timeCritical: false, class: "5-HT3 antagonist" },
  { name: "Metoclopramide", category: "Antiemetic", dose: "10mg", frequency: "Three times daily", indication: "Nausea and vomiting", sideEffects: ["Extrapyramidal effects", "Drowsiness"], timeCritical: false, class: "Dopamine antagonist" },
  
  // Antidepressants
  { name: "Citalopram", category: "Antidepressant", dose: "10-20mg", frequency: "Once daily", indication: "Depression, anxiety", sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction"], timeCritical: false, class: "SSRI" },
  { name: "Sertraline", category: "Antidepressant", dose: "50-100mg", frequency: "Once daily", indication: "Depression, anxiety", sideEffects: ["Nausea", "Diarrhoea"], timeCritical: false, class: "SSRI" },
  { name: "Amitriptyline", category: "Antidepressant", dose: "10-75mg", frequency: "Once daily at night", indication: "Depression, neuropathic pain", sideEffects: ["Drowsiness", "Dry mouth", "Constipation"], timeCritical: false, class: "Tricyclic antidepressant" },
  { name: "Mirtazapine", category: "Antidepressant", dose: "15-45mg", frequency: "Once daily at night", indication: "Depression", sideEffects: ["Sedation", "Weight gain"], timeCritical: false, class: "NaSSA" },
  
  // Anticonvulsants (E - Epilepsy - MISSED)
  { name: "Sodium Valproate", category: "Anticonvulsant", dose: "200-500mg", frequency: "Twice daily", indication: "Epilepsy", sideEffects: ["Weight gain", "Hair loss", "Tremor"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Levetiracetam", category: "Anticonvulsant", dose: "250-1000mg", frequency: "Twice daily", indication: "Epilepsy", sideEffects: ["Drowsiness", "Headache"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Phenytoin", category: "Anticonvulsant", dose: "200-300mg", frequency: "Once daily", indication: "Epilepsy", sideEffects: ["Gum hypertrophy", "Ataxia"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Carbamazepine", category: "Anticonvulsant", dose: "200-400mg", frequency: "Twice daily", indication: "Epilepsy, neuropathic pain", sideEffects: ["Dizziness", "Drowsiness", "Diplopia"], timeCritical: true, class: "Anticonvulsant" },
  { name: "Lamotrigine", category: "Anticonvulsant", dose: "100-200mg", frequency: "Once or twice daily", indication: "Epilepsy, bipolar disorder", sideEffects: ["Rash", "Headache", "Dizziness"], timeCritical: true, class: "Anticonvulsant" },
  
  // Movement Disorders (M - Movement disorders - MISSED)
  { name: "Co-careldopa", category: "Antiparkinsonian", dose: "25/100mg", frequency: "Three times daily", indication: "Parkinson's disease", sideEffects: ["Nausea", "Dyskinesia", "Postural hypotension"], timeCritical: true, class: "Dopamine precursor" },
  { name: "Ropinirole", category: "Antiparkinsonian", dose: "0.25-24mg", frequency: "Three times daily", indication: "Parkinson's disease", sideEffects: ["Nausea", "Drowsiness", "Impulse control disorders"], timeCritical: true, class: "Dopamine agonist" },
  { name: "Selegiline", category: "Antiparkinsonian", dose: "5-10mg", frequency: "Once daily in morning", indication: "Parkinson's disease", sideEffects: ["Insomnia", "Nausea"], timeCritical: true, class: "MAO-B inhibitor" },
  { name: "Pyridostigmine", category: "Antimyasthenic", dose: "30-120mg", frequency: "Multiple times daily", indication: "Myasthenia gravis", sideEffects: ["Abdominal cramps", "Diarrhoea", "Increased salivation"], timeCritical: true, class: "Anticholinesterase" },
  
  // Steroids (S - Steroids - MISSED)
  { name: "Prednisolone", category: "Steroid", dose: "5-60mg", frequency: "Once daily", indication: "Anti-inflammatory, immunosuppression", sideEffects: ["Weight gain", "Osteoporosis", "Immunosuppression"], timeCritical: true, class: "Corticosteroid" },
  { name: "Hydrocortisone", category: "Steroid", dose: "10-20mg", frequency: "Twice or three times daily", indication: "Adrenal insufficiency", sideEffects: ["Weight gain", "Mood changes"], timeCritical: true, class: "Corticosteroid" },
  
  // Immunomodulators (I - Immunomodulators - MISSED)
  { name: "Azathioprine", category: "Immunosuppressant", dose: "50-150mg", frequency: "Once daily", indication: "Autoimmune conditions, transplant", sideEffects: ["Bone marrow suppression", "Nausea"], timeCritical: true, class: "Immunosuppressant" },
  { name: "Methotrexate", category: "Immunosuppressant", dose: "7.5-25mg", frequency: "Once weekly", indication: "Rheumatoid arthritis, psoriasis", sideEffects: ["Bone marrow suppression", "Liver toxicity", "Mucositis"], timeCritical: true, class: "Antimetabolite" },
  { name: "Tacrolimus", category: "Immunosuppressant", dose: "1-5mg", frequency: "Twice daily", indication: "Transplant rejection prevention", sideEffects: ["Nephrotoxicity", "Tremor", "Hypertension"], timeCritical: true, class: "Calcineurin inhibitor" },
  
  // Laxatives
  { name: "Lactulose", category: "Laxative", dose: "15ml", frequency: "Twice daily", indication: "Constipation", sideEffects: ["Bloating", "Flatulence"], timeCritical: false, class: "Osmotic laxative" },
  { name: "Senna", category: "Laxative", dose: "7.5-15mg", frequency: "Once daily at night", indication: "Constipation", sideEffects: ["Abdominal cramps"], timeCritical: false, class: "Stimulant laxative" },
  { name: "Bisacodyl", category: "Laxative", dose: "5-10mg", frequency: "Once daily at night", indication: "Constipation", sideEffects: ["Abdominal cramps", "Diarrhoea"], timeCritical: false, class: "Stimulant laxative" },
  
  // Supplements
  { name: "Levothyroxine", category: "Thyroid", dose: "25-150mcg", frequency: "Once daily", indication: "Hypothyroidism", sideEffects: ["Palpitations if overdosed", "Weight loss", "Anxiety"], timeCritical: false, class: "Thyroid hormone" },
  { name: "Ferrous Sulphate", category: "Supplement", dose: "200mg", frequency: "Twice daily", indication: "Iron deficiency anaemia", sideEffects: ["Constipation", "Black stools"], timeCritical: false, class: "Iron supplement" },
  { name: "Adcal D3", category: "Supplement", dose: "One tablet", frequency: "Twice daily", indication: "Calcium and Vitamin D deficiency", sideEffects: ["Constipation"], timeCritical: false, class: "Calcium/Vitamin D supplement" },
  { name: "Folic Acid", category: "Supplement", dose: "5mg", frequency: "Once daily", indication: "Folate deficiency", sideEffects: ["Nausea", "Abdominal discomfort"], timeCritical: false, class: "Vitamin" },
  { name: "Vitamin D", category: "Supplement", dose: "20,000 IU", frequency: "Once weekly", indication: "Vitamin D deficiency", sideEffects: ["Hypercalcaemia if overdosed", "Nausea"], timeCritical: false, class: "Vitamin" },
  { name: "Alfacalcidol", category: "Supplement", dose: "0.25-1mcg", frequency: "Once daily", indication: "Renal bone disease", sideEffects: ["Hypercalcaemia"], timeCritical: false, class: "Vitamin D analogue" },
  
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
  
  // Additional Cardiovascular
  { name: "Losartan", category: "Cardiovascular", dose: "25-100mg", frequency: "Once daily", indication: "Hypertension, diabetic nephropathy", sideEffects: ["Dizziness", "Hypotension", "Hyperkalaemia"], timeCritical: false, class: "Angiotensin receptor blocker (ARB)" },
  { name: "Candesartan", category: "Cardiovascular", dose: "4-32mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dizziness", "Hypotension"], timeCritical: false, class: "Angiotensin receptor blocker (ARB)" },
  { name: "Perindopril", category: "Cardiovascular", dose: "2-8mg", frequency: "Once daily", indication: "Hypertension, heart failure", sideEffects: ["Dry cough", "Dizziness"], timeCritical: false, class: "ACE inhibitor" },
  { name: "Diltiazem", category: "Cardiovascular", dose: "60-120mg", frequency: "Twice daily", indication: "Hypertension, angina", sideEffects: ["Ankle swelling", "Bradycardia", "Constipation"], timeCritical: false, class: "Calcium channel blocker" },
  { name: "Verapamil", category: "Cardiovascular", dose: "40-120mg", frequency: "Three times daily", indication: "Hypertension, angina, arrhythmias", sideEffects: ["Constipation", "Bradycardia", "Ankle swelling"], timeCritical: false, class: "Calcium channel blocker" },
  { name: "Isosorbide Mononitrate", category: "Cardiovascular", dose: "20-60mg", frequency: "Twice daily", indication: "Angina prophylaxis", sideEffects: ["Headache", "Dizziness", "Flushing"], timeCritical: false, class: "Nitrate" },
  { name: "GTN Spray", category: "Cardiovascular", dose: "400mcg", frequency: "As required", indication: "Angina relief", sideEffects: ["Headache", "Dizziness", "Hypotension"], timeCritical: false, class: "Nitrate" },
  { name: "Aspirin", category: "Antiplatelet", dose: "75mg", frequency: "Once daily", indication: "Cardiovascular protection", sideEffects: ["Gastric irritation", "Bleeding risk"], timeCritical: false, class: "Antiplatelet" },
  { name: "Clopidogrel", category: "Antiplatelet", dose: "75mg", frequency: "Once daily", indication: "Post-MI, stroke prevention", sideEffects: ["Bleeding risk", "Dyspepsia"], timeCritical: false, class: "Antiplatelet" },
  { name: "Ticagrelor", category: "Antiplatelet", dose: "90mg", frequency: "Twice daily", indication: "Acute coronary syndrome", sideEffects: ["Bleeding risk", "Dyspnoea"], timeCritical: false, class: "Antiplatelet" },
  { name: "Propranolol", category: "Cardiovascular", dose: "40-80mg", frequency: "Two to three times daily", indication: "Migraine prophylaxis, hypertension, anxiety", sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"], timeCritical: false, class: "Beta-blocker" },
  
  // Additional Respiratory
  { name: "Beclometasone", category: "Corticosteroid inhaler", dose: "100-400mcg", frequency: "Twice daily", indication: "Asthma, COPD", sideEffects: ["Oral thrush", "Hoarse voice"], timeCritical: false, class: "Inhaled corticosteroid" },
  { name: "Budesonide", category: "Corticosteroid inhaler", dose: "200-800mcg", frequency: "Twice daily", indication: "Asthma, COPD", sideEffects: ["Oral thrush", "Hoarse voice"], timeCritical: false, class: "Inhaled corticosteroid" },
  { name: "Fluticasone", category: "Corticosteroid inhaler", dose: "100-500mcg", frequency: "Twice daily", indication: "Asthma", sideEffects: ["Oral thrush", "Hoarse voice"], timeCritical: false, class: "Inhaled corticosteroid" },
  { name: "Tiotropium", category: "Bronchodilator", dose: "18mcg", frequency: "Once daily", indication: "COPD", sideEffects: ["Dry mouth", "Constipation"], timeCritical: false, class: "Long-acting anticholinergic" },
  { name: "Montelukast", category: "Leukotriene antagonist", dose: "10mg", frequency: "Once daily at night", indication: "Asthma prophylaxis", sideEffects: ["Headache", "Abdominal pain"], timeCritical: false, class: "Leukotriene receptor antagonist" },
  { name: "Carbocisteine", category: "Mucolytic", dose: "375-750mg", frequency: "Three times daily", indication: "COPD, chronic bronchitis", sideEffects: ["Gastrointestinal upset"], timeCritical: false, class: "Mucolytic" },
  { name: "Theophylline", category: "Bronchodilator", dose: "200-400mg", frequency: "Twice daily", indication: "Asthma, COPD", sideEffects: ["Nausea", "Palpitations", "Insomnia"], timeCritical: false, class: "Methylxanthine" },
  
  // Additional Antibiotics
  { name: "Doxycycline", category: "Antibiotic", dose: "100mg", frequency: "Once or twice daily", indication: "Respiratory infections, acne", sideEffects: ["Nausea", "Photosensitivity", "Oesophagitis"], timeCritical: false, class: "Tetracycline" },
  { name: "Nitrofurantoin", category: "Antibiotic", dose: "50-100mg", frequency: "Four times daily", indication: "UTI treatment and prophylaxis", sideEffects: ["Nausea", "Pulmonary fibrosis (long-term)"], timeCritical: false, class: "Nitrofuran" },
  { name: "Ciprofloxacin", category: "Antibiotic", dose: "250-750mg", frequency: "Twice daily", indication: "UTI, respiratory infections", sideEffects: ["Nausea", "Tendon damage", "Photosensitivity"], timeCritical: false, class: "Fluoroquinolone" },
  { name: "Metronidazole", category: "Antibiotic", dose: "400mg", frequency: "Three times daily", indication: "Anaerobic infections, C. difficile", sideEffects: ["Metallic taste", "Nausea", "Disulfiram reaction with alcohol"], timeCritical: false, class: "Nitroimidazole" },
  { name: "Cefalexin", category: "Antibiotic", dose: "250-500mg", frequency: "Three or four times daily", indication: "Skin and soft tissue infections", sideEffects: ["Diarrhoea", "Nausea"], timeCritical: false, class: "Cephalosporin" },
  { name: "Erythromycin", category: "Antibiotic", dose: "250-500mg", frequency: "Four times daily", indication: "Respiratory infections, penicillin allergy", sideEffects: ["Nausea", "Diarrhoea", "Hepatotoxicity"], timeCritical: false, class: "Macrolide" },
  { name: "Azithromycin", category: "Antibiotic", dose: "250-500mg", frequency: "Once daily", indication: "Respiratory infections, atypical pneumonia", sideEffects: ["Nausea", "Diarrhoea"], timeCritical: false, class: "Macrolide" },
  
  // Additional Analgesics
  { name: "Diclofenac", category: "Analgesic", dose: "50mg", frequency: "Three times daily", indication: "Pain and inflammation", sideEffects: ["Gastric irritation", "Cardiovascular risk"], timeCritical: false, class: "NSAID" },
  { name: "Fentanyl patch", category: "Analgesic", dose: "12-100mcg/hr", frequency: "Change every 72 hours", indication: "Chronic severe pain", sideEffects: ["Respiratory depression", "Constipation", "Drowsiness"], timeCritical: false, class: "Opioid" },
  { name: "Oxycodone", category: "Analgesic", dose: "5-10mg", frequency: "Four to six hourly", indication: "Moderate to severe pain", sideEffects: ["Constipation", "Drowsiness", "Respiratory depression"], timeCritical: false, class: "Opioid" },
  { name: "Pregabalin", category: "Analgesic", dose: "75-300mg", frequency: "Twice daily", indication: "Neuropathic pain, anxiety", sideEffects: ["Dizziness", "Drowsiness", "Weight gain"], timeCritical: false, class: "Anticonvulsant (used for pain)" },
  { name: "Duloxetine", category: "Analgesic", dose: "60mg", frequency: "Once daily", indication: "Neuropathic pain, depression", sideEffects: ["Nausea", "Dry mouth", "Insomnia"], timeCritical: false, class: "SNRI" },
  
  // Additional Antidiabetic
  { name: "Sitagliptin", category: "Antidiabetic", dose: "100mg", frequency: "Once daily", indication: "Type 2 diabetes", sideEffects: ["Headache", "Upper respiratory tract infection"], timeCritical: true, class: "DPP-4 inhibitor" },
  { name: "Empagliflozin", category: "Antidiabetic", dose: "10-25mg", frequency: "Once daily", indication: "Type 2 diabetes, heart failure", sideEffects: ["Urinary tract infections", "Genital infections"], timeCritical: true, class: "SGLT2 inhibitor" },
  { name: "Dapagliflozin", category: "Antidiabetic", dose: "10mg", frequency: "Once daily", indication: "Type 2 diabetes, heart failure", sideEffects: ["Urinary tract infections", "Hypotension"], timeCritical: true, class: "SGLT2 inhibitor" },
  { name: "Glimepiride", category: "Antidiabetic", dose: "1-4mg", frequency: "Once daily", indication: "Type 2 diabetes", sideEffects: ["Hypoglycaemia", "Weight gain"], timeCritical: true, class: "Sulfonylurea" },
  
  // Additional Thyroid
  { name: "Carbimazole", category: "Thyroid", dose: "20-40mg", frequency: "Once daily", indication: "Hyperthyroidism", sideEffects: ["Agranulocytosis", "Rash", "Nausea"], timeCritical: false, class: "Antithyroid drug" },
  
  // Urological
  { name: "Tamsulosin", category: "Urological", dose: "400mcg", frequency: "Once daily", indication: "Benign prostatic hyperplasia", sideEffects: ["Dizziness", "Postural hypotension", "Ejaculatory dysfunction"], timeCritical: false, class: "Alpha-blocker" },
  { name: "Finasteride", category: "Urological", dose: "5mg", frequency: "Once daily", indication: "Benign prostatic hyperplasia", sideEffects: ["Erectile dysfunction", "Reduced libido"], timeCritical: false, class: "5-alpha reductase inhibitor" },
  { name: "Solifenacin", category: "Urological", dose: "5-10mg", frequency: "Once daily", indication: "Overactive bladder", sideEffects: ["Dry mouth", "Constipation", "Blurred vision"], timeCritical: false, class: "Antimuscarinic" },
  { name: "Tolterodine", category: "Urological", dose: "2-4mg", frequency: "Twice daily", indication: "Overactive bladder", sideEffects: ["Dry mouth", "Constipation"], timeCritical: false, class: "Antimuscarinic" },
  
  // Antihistamines
  { name: "Cetirizine", category: "Antihistamine", dose: "10mg", frequency: "Once daily", indication: "Allergies, hay fever", sideEffects: ["Drowsiness", "Dry mouth"], timeCritical: false, class: "Non-sedating antihistamine" },
  { name: "Loratadine", category: "Antihistamine", dose: "10mg", frequency: "Once daily", indication: "Allergies, hay fever", sideEffects: ["Headache", "Drowsiness"], timeCritical: false, class: "Non-sedating antihistamine" },
  { name: "Fexofenadine", category: "Antihistamine", dose: "120-180mg", frequency: "Once daily", indication: "Allergies, hay fever", sideEffects: ["Headache", "Drowsiness"], timeCritical: false, class: "Non-sedating antihistamine" },
  { name: "Chlorphenamine", category: "Antihistamine", dose: "4mg", frequency: "Four to six hourly", indication: "Allergies, anaphylaxis", sideEffects: ["Sedation", "Dry mouth", "Urinary retention"], timeCritical: false, class: "Sedating antihistamine" },
  
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
];
