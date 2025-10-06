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
  { name: "Paracetamol", category: "Analgesic", dose: "500mg-1g", frequency: "Four times daily", indication: "Pain relief", sideEffects: ["Rare at therapeutic doses", "Liver damage in overdose"], timeCritical: false, class: "Non-opioid analgesic" },
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
  { name: "Folic Acid", category: "Supplement", dose: "5mg", frequency: "Once daily", indication: "Folate deficiency", sideEffects: ["Rare"], timeCritical: false, class: "Vitamin" },
  { name: "Vitamin D", category: "Supplement", dose: "20,000 IU", frequency: "Once weekly", indication: "Vitamin D deficiency", sideEffects: ["Rare at therapeutic doses"], timeCritical: false, class: "Vitamin" },
  { name: "Alfacalcidol", category: "Supplement", dose: "0.25-1mcg", frequency: "Once daily", indication: "Renal bone disease", sideEffects: ["Hypercalcaemia"], timeCritical: false, class: "Vitamin D analogue" },
  
  // Antipsychotics
  { name: "Clozapine", category: "Antipsychotic", dose: "200-450mg", frequency: "Once or twice daily", indication: "Treatment-resistant schizophrenia", sideEffects: ["Agranulocytosis", "Sedation", "Weight gain", "Hypersalivation"], timeCritical: true, class: "Atypical antipsychotic" },
  { name: "Olanzapine", category: "Antipsychotic", dose: "5-20mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Weight gain", "Sedation", "Metabolic syndrome"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Aripiprazole", category: "Antipsychotic", dose: "10-30mg", frequency: "Once daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Akathisia", "Insomnia", "Nausea"], timeCritical: false, class: "Atypical antipsychotic" },
  { name: "Risperidone", category: "Antipsychotic", dose: "2-6mg", frequency: "Once or twice daily", indication: "Schizophrenia, bipolar disorder", sideEffects: ["Weight gain", "Extrapyramidal effects", "Hyperprolactinaemia"], timeCritical: false, class: "Atypical antipsychotic" },
  
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
  { name: "Gaviscon", category: "Antacid", dose: "10-20ml", frequency: "After meals and at bedtime", indication: "Heartburn, reflux", sideEffects: ["Rare"], timeCritical: false, class: "Alginate/Antacid" },
  { name: "Memantine", category: "Anti-dementia", dose: "10-20mg", frequency: "Once daily", indication: "Moderate to severe dementia", sideEffects: ["Dizziness", "Headache"], timeCritical: false, class: "NMDA receptor antagonist" },
  { name: "Mesalazine", category: "Anti-inflammatory", dose: "800mg-2.4g", frequency: "Three times daily", indication: "Ulcerative colitis, Crohn's disease", sideEffects: ["Nausea", "Headache", "Rash"], timeCritical: false, class: "5-aminosalicylic acid" },
  { name: "Naproxen", category: "NSAID", dose: "250-500mg", frequency: "Twice daily", indication: "Pain, inflammation", sideEffects: ["Gastric irritation", "Bleeding risk"], timeCritical: false, class: "NSAID" },
];
