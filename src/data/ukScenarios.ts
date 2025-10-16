import { medications, type Medication } from "./medications";
import type { Scenario, Patient, DocumentMetadata, GPLetterType } from "./scenarios";

// This file contains high-quality, realistic UK paramedic scenarios
// designed to train paramedics in medication identification and clinical reasoning

const firstNames = {
  Male: ["James", "John", "Robert", "William", "David", "Richard", "Thomas", "Charles", "Michael", "Daniel", "Matthew", "Andrew", "Christopher", "Mark", "Paul", "Steven", "Kenneth", "George", "Edward", "Brian", "Kevin", "Ronald", "Timothy", "Jason", "Gary", "Nicholas", "Ryan", "Peter", "Ian", "Colin"],
  Female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Margaret", "Lisa", "Betty", "Dorothy", "Sandra", "Ashley", "Donna", "Emily", "Carol", "Michelle", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Helen", "Angela"]
};

const surnames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Roberts", "Johnson", "Walker", "Wright", "Robinson", "Thompson", "White", "Hughes", "Edwards", "Green", "Hall", "Wood", "Harris", "Martin", "Jackson", "Clarke", "Lewis", "Lee", "Allen", "Scott", "King", "Baker", "Adams", "Hill", "Mitchell", "Turner", "Phillips", "Parker", "Cook"];

const streets = ["High Street", "Church Road", "Station Road", "Main Street", "Park Avenue", "Victoria Road", "The Green", "Manor Road", "Church Lane", "Mill Lane", "Queens Road", "King Street", "The Avenue", "School Lane", "York Road", "London Road", "New Street", "Elm Grove", "The Close", "Park Lane", "Bridge Street", "Albert Road", "Chapel Street", "Station Avenue", "Windsor Road"];

const towns = ["Manchester", "Birmingham", "Leeds", "Sheffield", "Bristol", "Liverpool", "Leicester", "Newcastle upon Tyne", "Nottingham", "Southampton", "Portsmouth", "Reading", "Bradford", "Brighton", "Derby", "Norwich", "Exeter", "Cambridge", "Gloucester", "Plymouth", "Coventry", "Bolton", "Sunderland", "Preston", "Wolverhampton"];

const doctorNames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Patel", "Anderson", "Khan", "Singh", "Ali", "Hassan", "Rahman"];

function generateDocumentMetadata(patientAge: number): DocumentMetadata {
  const today = new Date();
  const admissionDate = new Date(Date.now() - Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000);
  const appointmentTimes = ["09:15", "10:30", "11:45", "14:20", "15:30", "16:15"];
  const medicationChanges = ["Dose increased due to suboptimal control", "New medication added to regime", "Changed due to side effects"];
  const respectReviewDate = new Date(today);
  respectReviewDate.setDate(today.getDate() + 90);
  const dob = new Date(today.getFullYear() - patientAge, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  
  return {
    prescriptionDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    dischargeDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    gpDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    dnacprDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    respectDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    carePlanDoctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
    dnacprGMC: Math.floor(1000000 + Math.random() * 9000000).toString(),
    respectGMC: Math.floor(1000000 + Math.random() * 9000000).toString(),
    admissionDate,
    dischargeDate: today,
    formattedDate: today.toLocaleDateString('en-GB'),
    fp10Code: `FP10-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    bloodTestDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    cholesterolValue: Math.random() > 0.5 ? "5.9 mmol/L (above target)" : "4.1 mmol/L (at target)",
    appointmentSummaryDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    heartRate: Math.floor(Math.random() * 25) + 68,
    appointmentTime: appointmentTimes[Math.floor(Math.random() * appointmentTimes.length)],
    medicationReviewDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    medicationChange: medicationChanges[Math.floor(Math.random() * medicationChanges.length)],
    patientDOB: dob.toLocaleDateString('en-GB'),
    respectReviewDate: respectReviewDate.toLocaleDateString('en-GB'),
    carePlanReviewDate: today.toLocaleDateString('en-GB')
  };
}

function generatePatient(age: number, gender: "Male" | "Female"): Patient {
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const houseNumber = Math.floor(Math.random() * 200) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const town = towns[Math.floor(Math.random() * towns.length)];
  const postcode = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const nhsNumber = `${Array(3).fill(0).map(() => Math.floor(Math.random() * 10)).join('')} ${Array(3).fill(0).map(() => Math.floor(Math.random() * 10)).join('')} ${Array(4).fill(0).map(() => Math.floor(Math.random() * 10)).join('')}`;

  return {
    name: `${gender === "Male" ? "Mr" : gender === "Female" && age > 18 ? "Mrs" : "Miss"} ${firstName} ${surname}`,
    age,
    gender,
    address: `${houseNumber} ${street}, ${town}`,
    postcode,
    nhsNumber,
    presentation: "",
    medicalHistory: []
  };
}

// Enhanced UK-specific scenarios for paramedic training
export const ukScenarios: Scenario[] = [
  // Scenario 1: Sickle Cell Crisis (Vaso-occlusive Crisis)
  {
    patient: {
      ...generatePatient(26, "Male"),
      presentation: "Severe bilateral leg pain onset 6 hours ago, pain score 10/10, previously prescribed opioids at home ineffective, known sickle cell disease, triggered by cold weather and dehydration",
      medicalHistory: ["Sickle cell disease HbSS", "Recurrent painful crises requiring hospital admission", "Previous acute chest syndrome", "Chronic kidney disease Stage 2", "Asplenia (autosplenectomy)"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Oramorph")!, quantity: "300ml", instructions: "Take 10-20mg (2-4ml) every 4 hours as required for severe pain" },
      { medication: medications.find(m => m.name === "Morphine Sulphate MR")!, quantity: "56 tablets", instructions: "Take one 30mg tablet twice daily for background pain" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily regularly" },
      { medication: medications.find(m => m.name === "Ibuprofen")!, quantity: "84 tablets", instructions: "Take one 400mg tablet three times daily with food" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Phenoxymethylpenicillin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily (prophylaxis)" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "Category 2: 26-year-old male, severe pain, known sickle cell disease. Patient reports excruciating bilateral leg and lower back pain started 6 hours ago, pain score 10/10. Has taken prescribed oral morphine at home with minimal relief. Patient appears in severe distress, reluctant to move. States similar episodes in past required hospital admission. Vitals: RR 24, SpO2 96% on air (baseline), HR 108, BP 132/84, Temp 37.2°C. Patient requesting strong pain relief urgently. No signs of acute chest syndrome currently but requires close monitoring.",
    documentMetadata: generateDocumentMetadata(26),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 2: Addisonian Crisis (Acute Adrenal Insufficiency)
  {
    patient: {
      ...generatePatient(42, "Female"),
      presentation: "Collapsed at home, severe weakness, confusion, nausea and vomiting for 2 days, abdominal pain, has missed steroid doses due to gastroenteritis",
      medicalHistory: ["Primary Addison's disease diagnosed 5 years ago", "Hypothyroidism", "Type 1 diabetes mellitus", "Previous adrenal crisis 2 years ago"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Hydrocortisone")!, quantity: "56 tablets", instructions: "Take 10mg on waking, 5mg at lunch, 5mg at 6pm" },
      { medication: medications.find(m => m.name === "Fludrocortisone")!, quantity: "28 tablets", instructions: "Take one 100mcg tablet once daily in morning" },
      { medication: medications.find(m => m.name === "Levothyroxine")!, quantity: "28 tablets", instructions: "Take one 100mcg tablet once daily on empty stomach" },
      { medication: medications.find(m => m.name === "Insulin Aspart (NovoRapid)")!, quantity: "5 cartridges", instructions: "Inject as directed before meals" },
      { medication: medications.find(m => m.name === "Insulin Glargine (Lantus)")!, quantity: "2 cartridges", instructions: "Inject 18 units at bedtime" }
    ],
    dispatchInfo: "Category 1: 42-year-old female, collapsed, known Addison's disease. Husband reports patient been vomiting for 2 days, unable to keep medications down including steroids. Found collapsed in bathroom, confused and unable to stand. Wearing medical alert bracelet stating 'ADDISON'S DISEASE - GIVE HYDROCORTISONE IV 100mg IMMEDIATELY'. Patient extremely weak, drowsy but rousable, GCS 13/15 (E4 V4 M5). Appears dehydrated with pigmented skin. Complaining of severe abdominal pain and nausea. BGL 3.2 mmol/L. Vitals: RR 26, SpO2 98% on air, HR 128, BP 82/48, Temp 37.8°C. Signs consistent with adrenal crisis - LIFE THREATENING EMERGENCY. Requires immediate IV hydrocortisone 100mg, IV fluids, and urgent conveyance.",
    documentMetadata: generateDocumentMetadata(42),
    gpLetters: ["Blood Test Results", "Appointment Summary"]
  },

  // Scenario 3: Severe Decompensated Heart Failure with AF
  {
    patient: {
      ...generatePatient(78, "Male"),
      presentation: "Severe dyspnoea at rest, unable to lie flat for 3 days, productive cough pink frothy sputum, bilateral ankle swelling to knees, extreme fatigue",
      medicalHistory: ["Chronic heart failure NYHA Class IV", "Permanent atrial fibrillation", "Type 2 diabetes mellitus", "Previous MI 2018", "CKD Stage 3"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take TWO 40mg tablets each morning" },
      { medication: medications.find(m => m.name === "Bisoprolol")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Spironolactone")!, quantity: "28 tablets", instructions: "Take one 25mg tablet once daily" },
      { medication: medications.find(m => m.name === "Apixaban")!, quantity: "56 tablets", instructions: "Take one 5mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 80mg tablet at night" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Digoxin")!, quantity: "28 tablets", instructions: "Take one 125mcg tablet once daily" }
    ],
    dispatchInfo: "Category 2: 78-year-old male, severe breathing difficulties, known heart failure. Carer reports patient been deteriorating over 3 days, now unable to speak in full sentences. Patient sat upright in chair, using accessory muscles, appears cyanosed. RR 32, SpO2 86% on room air, HR 124 irregular, BP 96/64. Widespread bibasal crackles on auscultation, bilateral pitting oedema to knees. Patient distressed and exhausted.",
    documentMetadata: generateDocumentMetadata(78),
    gpLetters: ["Blood Test Results", "Appointment Summary"]
  },

  // Scenario 2: Acute COPD Exacerbation
  {
    patient: {
      ...generatePatient(64, "Female"),
      presentation: "Increased shortness of breath and wheezing over the last 2 days, increased sputum production (yellow/green), unable to perform normal daily activities, mild central chest pain",
      medicalHistory: ["COPD (moderate)", "Asthma", "Hypertension", "Anxiety", "Osteoarthritis"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "1 inhaler", instructions: "Two puffs as needed for wheezing" },
      { medication: medications.find(m => m.name === "Seretide (Salmeterol/Fluticasone)")!, quantity: "1 inhaler", instructions: "Two puffs twice daily" },
      { medication: medications.find(m => m.name === "Tiotropium (Spiriva)")!, quantity: "1 inhaler", instructions: "One puff daily" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "7 tablets", instructions: "Take 30mg once daily for 7 days" },
      { medication: medications.find(m => m.name === "Amoxicillin")!, quantity: "21 capsules", instructions: "Take one 500mg capsule three times daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Amitriptyline")!, quantity: "28 tablets", instructions: "Take one 10mg tablet at night" }
    ],
    dispatchInfo: "Category 2: 64-year-old female, acute shortness of breath, known COPD. Daughter reports patient has had a productive cough and wheezing for 2 days, now struggling to breathe. Patient is sitting forward, using accessory muscles. RR 28, SpO2 88% on room air, HR 110, BP 158/92. Widespread wheezing on auscultation.",
    documentMetadata: generateDocumentMetadata(64),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 3: Hypoglycaemic Emergency
  {
    patient: {
      ...generatePatient(52, "Male"),
      presentation: "Found collapsed at home by neighbour, unresponsive to voice, appears pale and clammy, history of diabetes",
      medicalHistory: ["Type 1 diabetes mellitus", "Diabetic neuropathy", "Hypertension", "Hypercholesterolaemia"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Insulin Aspart (NovoRapid)")!, quantity: "1 cartridge", instructions: "Inject as directed before meals" },
      { medication: medications.find(m => m.name === "Insulin Glargine (Lantus)")!, quantity: "1 cartridge", instructions: "Inject 20 units at night" },
      { medication: medications.find(m => m.name === "Lisinopril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily" }
    ],
    dispatchInfo: "Category 1: 52-year-old male, found collapsed, query fitting. Neighbour reports patient is diabetic and was last seen earlier today. Patient unresponsive to pain, GCS 3, BGL 2.1 mmol/L. RR 16, SpO2 97% on room air, HR 72, BP 130/80.",
    documentMetadata: generateDocumentMetadata(52),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 4: Anaphylactic Reaction
  {
    patient: {
      ...generatePatient(28, "Female"),
      presentation: "Sudden onset of difficulty breathing, wheezing, facial swelling, and urticaria after eating peanuts",
      medicalHistory: ["Severe peanut allergy", "Mild asthma"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Adrenaline")!, quantity: "1 auto-injector", instructions: "Inject IM into outer thigh as needed for severe allergic reaction" },
      { medication: medications.find(m => m.name === "Cetirizine")!, quantity: "14 tablets", instructions: "Take one 10mg tablet once daily as needed for allergy symptoms" },
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "1 inhaler", instructions: "Two puffs as needed for wheezing" }
    ],
    dispatchInfo: "Category 1: 28-year-old female, anaphylactic reaction. Friend reports patient ate peanuts and is now struggling to breathe, has facial swelling and rash. Patient is distressed, RR 30, SpO2 85% on room air, HR 130, BP 90/60. Audible wheezing and stridor.",
    documentMetadata: generateDocumentMetadata(28),
    gpLetters: ["Appointment Summary", "Medication Review"]
  },

  // Scenario 5: Suspected Stroke
  {
    patient: {
      ...generatePatient(70, "Male"),
      presentation: "Sudden onset of right-sided facial droop, arm weakness, and speech difficulty",
      medicalHistory: ["Hypertension", "Type 2 diabetes mellitus", "Previous TIA"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" }
    ],
    dispatchInfo: "Category 1: 70-year-old male, query stroke. Wife reports sudden onset of facial droop, arm weakness, and slurred speech. Last seen normal 30 minutes ago. Patient alert but confused, right-sided weakness, speech slurred. FAST positive. RR 18, SpO2 98% on room air, HR 80, BP 180/100.",
    documentMetadata: generateDocumentMetadata(70),
    gpLetters: ["Appointment Summary", "Medication Review"]
  },

  // Scenario 6: Acute Myocardial Infarction (STEMI)
  {
    patient: {
      ...generatePatient(58, "Male"),
      presentation: "Severe central crushing chest pain radiating to left arm, sweating, nausea, and feeling of impending doom",
      medicalHistory: ["Hypertension", "Hypercholesterolaemia", "Smoking"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "GTN Spray")!, quantity: "1 bottle", instructions: "One or two sprays under the tongue as needed for chest pain" }
    ],
    dispatchInfo: "Category 1: 58-year-old male, chest pain. Wife reports severe crushing chest pain, sweating, and nausea. Patient clutching chest, pale and clammy. RR 22, SpO2 96% on room air, HR 50, BP 90/60. ECG shows ST-segment elevation.",
    documentMetadata: generateDocumentMetadata(58),
    gpLetters: ["Blood Test Results", "Appointment Summary"]
  },

  // Scenario 7: Septic Shock
  {
    patient: {
      ...generatePatient(82, "Female"),
      presentation: "Altered mental status, fever, rapid breathing, and hypotension. Nursing home staff report suspected UTI",
      medicalHistory: ["Dementia", "Recurrent UTIs", "Hypertension", "Heart failure"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take one 20mg tablet each morning" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Donepezil")!, quantity: "28 tablets", instructions: "Take one 5mg tablet at night" },
      { medication: medications.find(m => m.name === "Co-trimoxazole")!, quantity: "14 tablets", instructions: "Take one 960mg tablet twice daily" }
    ],
    dispatchInfo: "Category 2: 82-year-old female, altered mental status, query sepsis. Nursing home staff report patient confused, feverish, and hypotensive. RR 30, SpO2 90% on room air, HR 120, BP 80/50. Appears unwell and lethargic.",
    documentMetadata: generateDocumentMetadata(82),
    gpLetters: ["Medication Review", "Blood Test Results"]
  },

  // Scenario 8: Opioid Overdose
  {
    patient: {
      ...generatePatient(35, "Male"),
      presentation: "Unresponsive, shallow breathing, pinpoint pupils, and track marks on arms. Found by friend in a house",
      medicalHistory: ["Heroin addiction", "Depression", "Hepatitis C"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Methadone")!, quantity: "300ml", instructions: "Take 60ml daily at pharmacy" },
      { medication: medications.find(m => m.name === "Naloxone")!, quantity: "2 ampoules", instructions: "Administer IM/IV as needed for opioid overdose" },
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" }
    ],
    dispatchInfo: "Category 1: 35-year-old male, query overdose. Friend reports patient unresponsive, shallow breathing, and pinpoint pupils. RR 8, SpO2 80% on room air, HR 40, BP 90/60. Track marks visible on arms.",
    documentMetadata: generateDocumentMetadata(35),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 9: Severe Asthma Attack
  {
    patient: {
      ...generatePatient(12, "Male"),
      presentation: "Severe difficulty breathing, wheezing, unable to speak in full sentences, and using accessory muscles",
      medicalHistory: ["Severe asthma", "Eczema", "Hay fever"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "1 inhaler", instructions: "Two puffs as needed for wheezing" },
      { medication: medications.find(m => m.name === "Seretide (Salmeterol/Fluticasone)")!, quantity: "1 inhaler", instructions: "Two puffs twice daily" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "5 tablets", instructions: "Take 40mg once daily for 5 days" }
    ],
    dispatchInfo: "Category 1: 12-year-old male, severe asthma attack. Mother reports patient struggling to breathe, wheezing, and unable to speak. Patient is distressed, RR 40, SpO2 82% on room air, HR 140, BP 110/70. Audible wheezing and use of accessory muscles.",
    documentMetadata: generateDocumentMetadata(12),
    gpLetters: ["Appointment Summary", "Medication Review"]
  },

  // Scenario 10: Acute Abdominal Pain
  {
    patient: {
      ...generatePatient(45, "Female"),
      presentation: "Severe lower abdominal pain, nausea, vomiting, and guarding. Possible ectopic pregnancy",
      medicalHistory: ["Irregular periods", "Pelvic inflammatory disease"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-codamol 8/500")!, quantity: "32 tablets", instructions: "Take two tablets every 4-6 hours as needed for pain" },
      { medication: medications.find(m => m.name === "Ondansetron")!, quantity: "6 tablets", instructions: "Take one 4mg tablet every 8 hours as needed for nausea" }
    ],
    dispatchInfo: "Category 2: 45-year-old female, severe abdominal pain. Patient reports sharp lower abdominal pain, nausea, and vomiting. Guarding present. RR 20, SpO2 98% on room air, HR 90, BP 120/80. Possible ectopic pregnancy.",
    documentMetadata: generateDocumentMetadata(45),
    gpLetters: ["Appointment Summary", "Blood Test Results"]
  },

  // Scenario 11: Chronic Kidney Disease with Fluid Overload
  {
    patient: {
      ...generatePatient(67, "Female"),
      presentation: "Progressive fatigue, nausea and vomiting for 4 days, bilateral leg oedema, reduced urine output, uraemic fetor noted",
      medicalHistory: ["CKD Stage 4 (eGFR 22)", "Type 2 diabetes mellitus", "Hypertension", "Anaemia of chronic disease", "Renal osteodystrophy"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take one 80mg tablet once daily in morning" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Ferrous Sulphate")!, quantity: "28 tablets", instructions: "Take one 200mg tablet once daily" },
      { medication: medications.find(m => m.name === "Alfacalcidol")!, quantity: "28 capsules", instructions: "Take one 0.5mcg capsule once daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "Category 2: 67-year-old female, feeling very unwell, known kidney disease. Daughter reports patient increasingly lethargic over 4 days, vomiting, and swollen legs. Patient appears pale and cachectic, periorbital and bilateral pitting oedema to thighs, uraemic fetor. RR 26, SpO2 94% on room air, HR 102, BP 168/98. Coarse bibasal crackles noted on chest auscultation.",
    documentMetadata: generateDocumentMetadata(67),
    gpLetters: ["Blood Test Results", "Appointment Summary"]
  },

  // Scenario 12: Parkinson's Disease - Off Period
  {
    patient: {
      ...generatePatient(74, "Male"),
      presentation: "Mechanical fall at home, severe resting tremor, pronounced bradykinesia, rigidity, postural instability, last medication dose 6 hours ago",
      medicalHistory: ["Parkinson's disease Hoehn & Yahr Stage 3", "Depression", "Orthostatic hypotension", "Multiple falls in past 3 months", "Constipation"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-careldopa (Sinemet)")!, quantity: "112 tablets", instructions: "Take one 25/100mg tablet four times daily" },
      { medication: medications.find(m => m.name === "Ropinirole")!, quantity: "28 tablets", instructions: "Take one 4mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Selegiline")!, quantity: "28 tablets", instructions: "Take one 10mg tablet each morning" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 30mg tablet at night" },
      { medication: medications.find(m => m.name === "Bisacodyl")!, quantity: "28 tablets", instructions: "Take one 10mg tablet at night as required" },
      { medication: medications.find(m => m.name === "Fludrocortisone")!, quantity: "28 tablets", instructions: "Take one 100mcg tablet once daily" }
    ],
    dispatchInfo: "Category 2: 74-year-old male, mechanical fall, known Parkinson's disease. Wife reports patient fell getting up from chair, unable to self-mobilise. Patient on floor for 30 minutes before 999 called. Pronounced pill-rolling tremor both hands, cogwheel rigidity in all limbs, mask-like facies, festinating gait noted. No head injury, some skin tears to forearms. RR 18, SpO2 96% on room air, HR 76, BP lying 142/86 sitting 106/64. Wife states patient in off period having missed lunchtime dose of medication.",
    documentMetadata: generateDocumentMetadata(74),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 13: Bipolar Disorder - Manic Episode
  {
    patient: {
      ...generatePatient(38, "Male"),
      presentation: "Decreased need for sleep for 5 days, racing thoughts, pressured speech, grandiose delusions, increased risk-taking behaviour, spent £8000 on credit cards, family very concerned",
      medicalHistory: ["Bipolar affective disorder Type 1", "Previous manic episode requiring sectioning", "Non-compliance with medication", "Alcohol misuse"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Lithium Carbonate")!, quantity: "56 tablets", instructions: "Take one 400mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Olanzapine")!, quantity: "28 tablets", instructions: "Take one 15mg tablet at night" },
      { medication: medications.find(m => m.name === "Sodium Valproate")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" }
    ],
    dispatchInfo: "Category 3: 38-year-old male, mental health concern, manic behaviour. Family report patient hasn't slept for 5 days, extremely talkative, spending money recklessly, believes he can fly. Patient extremely agitated, pressured speech, flight of ideas, delusional content. Admits not taking medications for 2 weeks. Not aggressive currently but family concerned about risk. Observations stable: RR 18, SpO2 98%, HR 96, BP 138/82. Requires urgent mental health assessment and possible Section 136.",
    documentMetadata: generateDocumentMetadata(38),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 14: Pneumonia with Sepsis
  {
    patient: {
      ...generatePatient(81, "Female"),
      presentation: "Productive cough with rusty coloured sputum for 5 days, fever 39.4C, pleuritic chest pain right lower zone, rigors, confusion, severe shortness of breath",
      medicalHistory: ["COPD Gold Stage 3", "Atrial fibrillation rate controlled", "Previous pneumonia x2 in last year", "Chronic kidney disease Stage 3"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-amoxiclav")!, quantity: "21 tablets", instructions: "Take one 625mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Clarithromycin")!, quantity: "14 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "1 inhaler", instructions: "Two puffs four times daily" },
      { medication: medications.find(m => m.name === "Tiotropium (Spiriva)")!, quantity: "1 inhaler", instructions: "One puff daily" },
      { medication: medications.find(m => m.name === "Digoxin")!, quantity: "28 tablets", instructions: "Take one 125mcg tablet once daily" },
      { medication: medications.find(m => m.name === "Apixaban")!, quantity: "56 tablets", instructions: "Take one 2.5mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily" }
    ],
    dispatchInfo: "Category 2: 81-year-old female, severe respiratory infection, nursing home resident. Carers report patient very unwell for 5 days, now confused and pyrexial. Patient sitting forward in chair, cachectic appearance, working hard to breathe, coughing up rusty sputum. NEWS2 score 9. RR 32, SpO2 86% on 2L oxygen via nasal cannulae, HR 118 irregular, BP 92/58, Temp 39.4C tympanic. Reduced air entry right lower zone on auscultation, dull to percussion, bronchial breathing. Signs of sepsis present.",
    documentMetadata: generateDocumentMetadata(81),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 15: Type 1 Diabetes - DKA
  {
    patient: {
      ...generatePatient(24, "Female"),
      presentation: "Severe abdominal pain, vomiting for 2 days, excessive thirst, polyuria, Kussmaul breathing noted, fruity breath, feeling very unwell, missed insulin doses due to gastroenteritis",
      medicalHistory: ["Type 1 diabetes mellitus for 15 years", "Diabetic retinopathy", "Previous DKA x2", "Coeliac disease"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Insulin Aspart (NovoRapid)")!, quantity: "5 cartridges", instructions: "Inject 6-8 units before each meal, adjust according to carbohydrate intake" },
      { medication: medications.find(m => m.name === "Insulin Glargine (Lantus)")!, quantity: "2 cartridges", instructions: "Inject 24 units subcutaneously at 22:00 daily" },
      { medication: medications.find(m => m.name === "Ondansetron")!, quantity: "10 tablets", instructions: "Take one 4mg tablet three times daily as required for nausea" }
    ],
    dispatchInfo: "Category 1: 24-year-old female, diabetic emergency, unwell for 2 days. Boyfriend reports patient vomiting, unable to keep food or insulin down, very lethargic. Patient appears dehydrated, dry mucous membranes, reduced skin turgor. Kussmaul breathing pattern noted, fruity acetone breath smell. BGL 28.3 mmol/L on paramedic glucometer, ketones 4.8 mmol/L on blood ketone meter. RR 28 deep sighing respirations, SpO2 98% on room air, HR 124, BP 98/62, Temp 37.8C. GCS 14/15, drowsy but rousable. Signs consistent with diabetic ketoacidosis.",
    documentMetadata: generateDocumentMetadata(24),
    gpLetters: ["Blood Test Results", "Appointment Confirmation"]
  },

  // Scenario 16: Acute Coronary Syndrome - NSTEMI
  {
    patient: {
      ...generatePatient(63, "Male"),
      presentation: "Central crushing chest pain radiating to jaw and left arm for 90 minutes, not relieved by GTN spray, associated nausea and diaphoresis, feeling of impending doom",
      medicalHistory: ["Stable angina CCS Class II", "Hypertension", "Type 2 diabetes mellitus", "Hypercholesterolaemia", "Ex-smoker 30 pack years"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily in morning" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 80mg tablet at night" },
      { medication: medications.find(m => m.name === "Bisoprolol")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 1g tablet twice daily with food" },
      { medication: medications.find(m => m.name === "GTN Spray")!, quantity: "1 spray", instructions: "One or two sprays under tongue as needed for chest pain" },
      { medication: medications.find(m => m.name === "Isosorbide Mononitrate")!, quantity: "28 tablets", instructions: "Take one 60mg modified release tablet once daily" }
    ],
    dispatchInfo: "Category 1: 63-year-old male, chest pain unrelieved by GTN, known cardiac history. Wife called 999 after patient developed severe chest pain watching TV. Patient appears distressed, pale, clammy, nauseous. Used own GTN spray x3 with no relief. Pain score 9/10, describes as crushing weight on chest, radiating to jaw and down left arm. 12-lead ECG shows ST depression in leads V3-V6 and T wave inversion, suspicious for posterior NSTEMI. RR 22, SpO2 96% on room air, HR 94, BP 156/92. Troponin likely elevated - requires urgent PCI.",
    documentMetadata: generateDocumentMetadata(63),
    gpLetters: ["Blood Test Results", "Appointment Summary"]
  },

  // Scenario 17: End Stage COPD - Palliative
  {
    patient: {
      ...generatePatient(72, "Male"),
      presentation: "Severe dyspnoea at rest despite maximum therapy, unable to walk more than 2 meters, productive cough, extreme fatigue, weight loss 12kg over 3 months, DNACPR in place",
      medicalHistory: ["COPD Gold Stage 4 Very Severe", "Cor pulmonale", "Long-term oxygen therapy 16 hours daily", "Recurrent infective exacerbations", "Palliative care input", "DNACPR", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "2 inhalers", instructions: "Two puffs every 4 hours and as required" },
      { medication: medications.find(m => m.name === "Seretide (Salmeterol/Fluticasone)")!, quantity: "1 inhaler", instructions: "Two puffs twice daily" },
      { medication: medications.find(m => m.name === "Tiotropium (Spiriva)")!, quantity: "1 inhaler", instructions: "One puff daily" },
      { medication: medications.find(m => m.name === "Morphine Sulphate MR")!, quantity: "56 tablets", instructions: "Take one 10mg tablet twice daily for breathlessness" },
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take one 40mg tablet each morning" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "28 tablets", instructions: "Take 5mg once daily long-term" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 45mg tablet at night" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "Category 3: 72-year-old male, increasing breathlessness, end stage COPD with palliative approach. Wife called as patient more breathless than usual, requesting assessment. DNACPR in place, discussed with patient present. Patient in armchair with home oxygen running at 2L/min via nasal cannulae. Severe dyspnoea even at rest, using accessory muscles, pursed lip breathing, barrel chest. Cachectic appearance. Patient states just want to be comfortable at home. RR 26, SpO2 88% on 2L oxygen (target 88-92%), HR 98, BP 134/78. Widespread wheeze and reduced air entry bilaterally.",
    documentMetadata: generateDocumentMetadata(72),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 18: Acute Severe Asthma - Life Threatening
  {
    patient: {
      ...generatePatient(19, "Female"),
      presentation: "Severe acute asthma attack, unable to complete sentences, exhausted, no improvement with salbutamol, triggered by viral URTI, previous ICU admission for asthma",
      medicalHistory: ["Severe asthma with brittle control", "Previous life-threatening attack requiring intubation", "Atopy - allergic rhinitis and eczema", "Poor compliance with preventer therapy"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol Inhaler")!, quantity: "2 inhalers", instructions: "Two puffs four times daily and as required for wheeze" },
      { medication: medications.find(m => m.name === "Seretide (Salmeterol/Fluticasone)")!, quantity: "1 inhaler", instructions: "Two puffs twice daily (currently not using regularly)" },
      { medication: medications.find(m => m.name === "Montelukast")!, quantity: "28 tablets", instructions: "Take one 10mg tablet at night" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "5 tablets", instructions: "Emergency supply - Take 40mg daily for 5 days if exacerbation" }
    ],
    dispatchInfo: "Category 1: 19-year-old female, life-threatening asthma attack. Flatmate called 999, patient severely breathless, cannot speak. Patient sat forward tripod position, exhausted, cyanosed. Silent chest in places - ominous sign. Used salbutamol inhaler approximately 20 puffs in last hour with no improvement. PEFR unable to perform due to severity. Life-threatening features present: SpO2 88% on high flow oxygen 15L via non-rebreathe mask, RR 8 (exhaustion), HR 138, BP 124/82, unable to speak, altered consciousness (drowsy), silent chest. Requires immediate pre-alert to ED.",
    documentMetadata: generateDocumentMetadata(19),
    gpLetters: ["Appointment Summary", "Medication Review"]
  },

  // Scenario 19: Vascular Dementia with Behavioural Symptoms
  {
    patient: {
      ...generatePatient(84, "Female"),
      presentation: "Aggressive behaviour towards care staff, visual hallucinations, wandering at night, refusing personal care and medications, sundowning",
      medicalHistory: ["Vascular dementia with behavioural disturbance", "Multiple previous TIAs", "Hypertension", "Type 2 diabetes mellitus", "Recurrent falls", "Care home resident"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Memantine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Risperidone")!, quantity: "28 tablets", instructions: "Take 0.5mg at night for behavioural disturbance" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Gliclazide")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily before breakfast" },
      { medication: medications.find(m => m.name === "Adcal D3")!, quantity: "56 tablets", instructions: "Chew one tablet twice daily" },
      { medication: medications.find(m => m.name === "Zopiclone")!, quantity: "14 tablets", instructions: "Take 3.75mg at night as required for sleep" }
    ],
    dispatchInfo: "Category 3: 84-year-old female, agitated behaviour, care home resident with dementia. Care staff report patient increasingly aggressive today, trying to leave building, shouting at staff. Sundowning behaviour worsening. Patient currently agitated, not orientated to time place or person. MMSE last recorded 12/30. Observations stable. Requires assessment for acute confusional state.",
    documentMetadata: generateDocumentMetadata(84),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 20: Inflammatory Bowel Disease - Severe Flare
  {
    patient: {
      ...generatePatient(32, "Male"),
      presentation: "Passing fresh blood and mucus per rectum 18 times daily, severe colicky abdominal pain, urgency and tenesmus, fever 38.7C, weight loss 9kg in 2 weeks, unable to eat or drink",
      medicalHistory: ["Ulcerative colitis pancolitis", "Previous severe flare requiring colectomy discussion", "Iron deficiency anaemia", "Primary sclerosing cholangitis"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Mesalazine")!, quantity: "120 tablets", instructions: "Take 1.2g (three 400mg tablets) four times daily" },
      { medication: medications.find(m => m.name === "Azathioprine")!, quantity: "56 tablets", instructions: "Take one 150mg tablet once daily" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "28 tablets", instructions: "Take 40mg once daily reducing regime" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ferrous Sulphate")!, quantity: "28 tablets", instructions: "Take one 200mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Ondansetron")!, quantity: "10 tablets", instructions: "Take one 8mg tablet three times daily as required for nausea" },
      { medication: medications.find(m => m.name === "Codeine Phosphate")!, quantity: "56 tablets", instructions: "Take one 30mg tablet four times daily for diarrhoea" }
    ],
    dispatchInfo: "Category 2: 32-year-old male, severe abdominal pain and bloody diarrhoea, known ulcerative colitis. GP urgent referral, patient deteriorating despite maximum oral therapy. Patient appears very unwell, cachectic, pale. Doubled over with abdominal pain. Abdomen soft but very tender throughout especially left iliac fossa. Signs of dehydration. RR 22, SpO2 98%, HR 116, BP 102/68, Temp 38.7C. Requires urgent hospital assessment.",
    documentMetadata: generateDocumentMetadata(32),
    gpLetters: ["Blood Test Results", "Appointment Confirmation"]
  },

  // Scenario 21: Advanced Parkinson's Disease - Motor Fluctuations
  {
    patient: {
      ...generatePatient(71, "Male"),
      presentation: "Severe 'off' period with rigidity and freezing, unable to move, dystonic posturing, agitation, increasing tremor despite taking medications, wife reports patient's mobility varies dramatically throughout day",
      medicalHistory: ["Parkinson's disease 15 years", "Motor fluctuations and dyskinesias", "Depression", "Postural hypotension", "Benign prostatic hyperplasia", "Constipation"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-beneldopa (Madopar)")!, quantity: "168 capsules", instructions: "Take two 125mg capsules four times daily" },
      { medication: medications.find(m => m.name === "Rasagiline")!, quantity: "28 tablets", instructions: "Take one 1mg tablet once daily in morning" },
      { medication: medications.find(m => m.name === "Pramipexole")!, quantity: "84 tablets", instructions: "Take one 1.05mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Apomorphine")!, quantity: "5 pre-filled pens", instructions: "Inject 3mg subcutaneously when 'off' - maximum 5 doses daily" },
      { medication: medications.find(m => m.name === "Domperidone")!, quantity: "56 tablets", instructions: "Take one 10mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 30mg tablet at night" },
      { medication: medications.find(m => m.name === "Tamsulosin")!, quantity: "28 capsules", instructions: "Take one 400mcg capsule once daily after food" },
      { medication: medications.find(m => m.name === "Movicol")!, quantity: "30 sachets", instructions: "Take one sachet once or twice daily dissolved in water" }
    ],
    dispatchInfo: "Category 3: 71-year-old male, Parkinson's disease, unable to move. Wife states patient had last dose of medication 4 hours ago and suddenly 'frozen up', unable to get out of chair. Patient alert but extremely rigid, dystonic posturing of limbs, severe resting tremor. Speech very quiet and slurred. Wife has apomorphine pen but afraid to use it. RR 16, SpO2 96%, HR 78, BP 102/68. Classic 'off' period requiring apomorphine rescue therapy. Patient becoming distressed and agitated.",
    documentMetadata: generateDocumentMetadata(71),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 22: Transplant Rejection Query - Immunosuppression
  {
    patient: {
      ...generatePatient(54, "Female"),
      presentation: "Fever 38.9C, reduced urine output, swelling and pain over kidney transplant site, nausea, general malaise for 2 days, non-compliance with immunosuppression due to side effects",
      medicalHistory: ["Renal transplant 18 months ago", "End-stage renal failure secondary to IgA nephropathy", "Type 2 diabetes mellitus", "Hypertension", "Hyperlipidaemia", "Gout"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Tacrolimus")!, quantity: "56 capsules", instructions: "Take 3mg twice daily (08:00 and 20:00) - LEVELS MONITORED" },
      { medication: medications.find(m => m.name === "Mycophenolate Mofetil")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "28 tablets", instructions: "Take 5mg once daily in morning - DO NOT STOP" },
      { medication: medications.find(m => m.name === "Co-trimoxazole")!, quantity: "14 tablets", instructions: "Take one 480mg tablet three times weekly (Mon/Wed/Fri) for prophylaxis" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Allopurinol")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "Category 2: 54-year-old female, kidney transplant recipient, fever and reduced urine output. Transplant coordinator has been contacted. Patient appears unwell, flushed, tender over transplant site in right iliac fossa. Admits hasn't been taking tacrolimus regularly due to tremor side effects. Last tacrolimus dose yesterday morning. RR 20, SpO2 97%, HR 104, BP 168/94, Temp 38.9C. Urine output <200ml in 24 hours. Urgent assessment required for potential rejection.",
    documentMetadata: generateDocumentMetadata(54),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 23: Rheumatoid Arthritis Flare with Septic Arthritis Risk
  {
    patient: {
      ...generatePatient(58, "Female"),
      presentation: "Acutely swollen hot painful right knee, unable to weight bear, fever 38.4C, severe pain 9/10, knee started swelling yesterday and rapidly worsening, on biologic therapy",
      medicalHistory: ["Severe seropositive rheumatoid arthritis", "Methotrexate-induced liver toxicity", "Osteoporosis", "Interstitial lung disease", "Recurrent chest infections"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Adalimumab")!, quantity: "2 pre-filled syringes", instructions: "Inject 40mg subcutaneously every 2 weeks" },
      { medication: medications.find(m => m.name === "Sulfasalazine")!, quantity: "112 tablets", instructions: "Take one 500mg tablet four times daily" },
      { medication: medications.find(m => m.name === "Hydroxychloroquine")!, quantity: "56 tablets", instructions: "Take one 200mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Prednisolone")!, quantity: "28 tablets", instructions: "Take 7.5mg once daily in morning" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily (avoid on methotrexate day)" },
      { medication: medications.find(m => m.name === "Alendronic Acid")!, quantity: "4 tablets", instructions: "Take one 70mg tablet once weekly on empty stomach - stay upright 30 minutes" },
      { medication: medications.find(m => m.name === "Adcal D3")!, quantity: "56 tablets", instructions: "Chew one tablet twice daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" },
      { medication: medications.find(m => m.name === "Co-codamol 30/500")!, quantity: "56 tablets", instructions: "Take two tablets four times daily as required for pain" }
    ],
    dispatchInfo: "Category 2: 58-year-old female, acutely swollen knee, on immunosuppression. Rheumatology nurse specialist contacted, advised urgent assessment. Patient in severe distress, right knee grossly swollen, hot to touch, erythematous, any movement causes severe pain. Small effusion visible. On biologic therapy - adalimumab injection given 5 days ago. Fever present. RR 18, SpO2 95%, HR 98, BP 142/88, Temp 38.4C. High suspicion of septic arthritis - requires urgent orthopaedic review and joint aspiration before antibiotics.",
    documentMetadata: generateDocumentMetadata(58),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 24: Complicated Epilepsy - Status Epilepticus
  {
    patient: {
      ...generatePatient(29, "Female"),
      presentation: "Witnessed tonic-clonic seizure lasting >15 minutes, not regaining consciousness between seizures, multiple seizures in ambulance, known non-compliance with medications",
      medicalHistory: ["Drug-resistant epilepsy", "Depression", "Previous status epilepticus requiring ICU", "Learning difficulties", "Poor medication compliance"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Sodium Valproate")!, quantity: "56 tablets", instructions: "Take 1000mg twice daily" },
      { medication: medications.find(m => m.name === "Lacosamide")!, quantity: "56 tablets", instructions: "Take 200mg twice daily" },
      { medication: medications.find(m => m.name === "Brivaracetam")!, quantity: "56 tablets", instructions: "Take 100mg twice daily" },
      { medication: medications.find(m => m.name === "Clobazam")!, quantity: "28 tablets", instructions: "Take one 10mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" }
    ],
    dispatchInfo: "Category 1: 29-year-old female, prolonged seizure activity, status epilepticus. Mother called 999 after patient had seizure lasting >10 minutes. Paramedics arrived to find patient in tonic-clonic seizure. Buccal midazolam 10mg given at 10 minutes with no effect. Further seizure activity in ambulance. GCS 3/15 post-ictal, not recovering between episodes. RR 30 (irregular), SpO2 88% on high flow oxygen, HR 132, BP 156/98, Temp 37.2C. Requires immediate pre-alert, IV access, further benzodiazepines, potential RSI.",
    documentMetadata: generateDocumentMetadata(29),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 25: Multiple Sclerosis Relapse
  {
    patient: {
      ...generatePatient(44, "Female"),
      presentation: "Acute onset weakness in left leg, numbness ascending from feet to waist, bladder urgency and incontinence, blurred vision left eye, symptoms worsening over 48 hours",
      medicalHistory: ["Relapsing-remitting multiple sclerosis", "Previous optic neuritis", "Bladder dysfunction", "Spasticity", "Fatigue", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Fampridine")!, quantity: "56 tablets", instructions: "Take one 10mg tablet twice daily (exactly 12 hours apart)" },
      { medication: medications.find(m => m.name === "Baclofen")!, quantity: "84 tablets", instructions: "Take one 10mg tablet three times daily for spasticity" },
      { medication: medications.find(m => m.name === "Gabapentin")!, quantity: "84 capsules", instructions: "Take one 300mg capsule three times daily for neuropathic pain" },
      { medication: medications.find(m => m.name === "Solifenacin")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily for bladder symptoms" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 30mg tablet at night" },
      { medication: medications.find(m => m.name === "Modafinil")!, quantity: "28 tablets", instructions: "Take one 200mg tablet in morning for fatigue" },
      { medication: medications.find(m => m.name === "Vitamin D3")!, quantity: "4 ampoules", instructions: "Take 20,000 units once weekly" }
    ],
    dispatchInfo: "Category 3: 44-year-old female, multiple sclerosis relapse, increasing weakness. MS specialist nurse has been informed. Patient reports symptoms started 2 days ago with numbness in feet, now ascending to waist level. Left leg weakness making mobilisation difficult. Had episode of urinary incontinence this morning. Vision blurred in left eye. Patient tearful and anxious. Neurological examination shows reduced power 3/5 left lower limb, sensory level at T10, visual acuity reduced left eye. RR 16, SpO2 98%, HR 88, BP 128/82. Likely MS relapse requiring high-dose IV methylprednisolone.",
    documentMetadata: generateDocumentMetadata(44),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 26: Severe Dehydration - Gastroenteritis
  {
    patient: {
      ...generatePatient(67, "Female"),
      presentation: "Profuse vomiting and diarrhoea for 3 days, unable to keep fluids down, dizzy on standing, reduced urine output, extreme weakness",
      medicalHistory: ["Hypertension", "Type 2 diabetes mellitus", "Osteoarthritis"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 850mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Co-codamol 8/500")!, quantity: "100 tablets", instructions: "Take two tablets four times daily for arthritis pain" }
    ],
    dispatchInfo: "Category 2: 67-year-old female, severe vomiting and diarrhoea, dehydration. Daughter reports patient very unwell for 3 days, unable to keep anything down. Patient appears dehydrated, sunken eyes, dry mucous membranes, reduced skin turgor. Postural hypotension noted. RR 22, SpO2 96% on room air, HR 108, BP lying 96/54 sitting 78/48, Temp 37.4C. Continuing to take ACE inhibitor and metformin despite vomiting - risk of AKI.",
    documentMetadata: generateDocumentMetadata(67),
    gpLetters: ["Medication Review", "Blood Test Results"]
  },

  // Scenario 27: Chest Infection - Frail Elderly
  {
    patient: {
      ...generatePatient(88, "Male"),
      presentation: "Productive cough yellow sputum, breathless, fever, reduced oral intake for 2 days, increasing confusion, normally independent",
      medicalHistory: ["Previous pneumonia", "Benign prostatic hyperplasia", "Mild cognitive impairment", "Lives alone with package of care"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Amoxicillin")!, quantity: "21 capsules", instructions: "Take one 500mg capsule three times daily (started yesterday)" },
      { medication: medications.find(m => m.name === "Tamsulosin")!, quantity: "28 capsules", instructions: "Take one 400mcg modified release capsule once daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily for fever" }
    ],
    dispatchInfo: "Category 2: 88-year-old male, respiratory infection, increasing confusion. Carer found patient more confused than usual, fever noted. GP started antibiotics yesterday but patient deteriorating. Patient disorientated to time and place, productive cough, working to breathe. RR 26, SpO2 91% on room air, HR 102, BP 108/64, Temp 38.6C. Coarse crackles right base. Frail elderly patient with possible hospital-acquired pneumonia.",
    documentMetadata: generateDocumentMetadata(88),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 28: Lower Limb Cellulitis with Sepsis
  {
    patient: {
      ...generatePatient(52, "Male"),
      presentation: "Hot swollen painful right leg for 2 days, spreading red rash, fever, rigors, feeling very unwell, small cut to leg 1 week ago",
      medicalHistory: ["Type 2 diabetes mellitus poorly controlled", "Peripheral vascular disease", "Chronic venous insufficiency", "Obesity BMI 38", "Previous cellulitis x3"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 1g tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Gliclazide")!, quantity: "28 tablets", instructions: "Take one 80mg tablet twice daily before meals" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily" },
      { medication: medications.find(m => m.name === "Flucloxacillin")!, quantity: "28 capsules", instructions: "Take two 500mg capsules four times daily (started today by GP)" }
    ],
    dispatchInfo: "Category 2: 52-year-old male, infected leg, signs of sepsis. GP started antibiotics this morning but patient deteriorating. Right leg grossly swollen, erythematous from toes to mid-thigh, very hot to touch, exquisitely tender. Tracking erythema noted. Small ulcer on lateral malleolus. Patient pyrexial, rigors. NEWS2 score 7. RR 24, SpO2 95% on room air, HR 118, BP 104/68, Temp 39.2C, BGL 18.4 mmol/L. Requires IV antibiotics and fluids urgently.",
    documentMetadata: generateDocumentMetadata(52),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 29: Acute Urinary Retention
  {
    patient: {
      ...generatePatient(76, "Male"),
      presentation: "Unable to pass urine for 12 hours, severe suprapubic pain and distension, feeling desperate to urinate, started new medication yesterday",
      medicalHistory: ["Benign prostatic hyperplasia", "Hypertension", "Depression", "Constipation"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Tamsulosin")!, quantity: "28 capsules", instructions: "Take one 400mcg modified release capsule once daily" },
      { medication: medications.find(m => m.name === "Finasteride")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Amitriptyline")!, quantity: "28 tablets", instructions: "Take one 25mg tablet at night (STARTED YESTERDAY for depression)" },
      { medication: medications.find(m => m.name === "Lactulose")!, quantity: "500ml", instructions: "Take 15ml twice daily" }
    ],
    dispatchInfo: "Category 2: 76-year-old male, acute urinary retention, severe pain. Wife called 999, patient in agony unable to pass urine. Started new antidepressant yesterday. Patient in extreme distress, palpable bladder to umbilicus, percussion dull, severe suprapubic tenderness. Unable to pass any urine despite trying. RR 20, SpO2 97%, HR 96, BP 168/94. Amitriptyline likely cause - anticholinergic effect. Requires urgent catheterisation.",
    documentMetadata: generateDocumentMetadata(76),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 30: Acute Alcohol Withdrawal
  {
    patient: {
      ...generatePatient(58, "Male"),
      presentation: "Tremors, sweating profusely, seeing spiders on walls, agitated, confused, last drink 48 hours ago, usually drinks 2 bottles vodka daily",
      medicalHistory: ["Alcohol dependence", "Chronic liver disease", "Oesophageal varices", "Previous withdrawal seizures", "Peripheral neuropathy", "Vitamin deficiencies"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Thiamine")!, quantity: "28 tablets", instructions: "Take one 100mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Vitamin B compound")!, quantity: "28 tablets", instructions: "Take two tablets three times daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 40mg capsule once daily" },
      { medication: medications.find(m => m.name === "Propranolol")!, quantity: "28 tablets", instructions: "Take one 40mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Chlordiazepoxide")!, quantity: "28 capsules", instructions: "Reducing dose regime as per community alcohol team" }
    ],
    dispatchInfo: "Category 2: 58-year-old male, alcohol withdrawal, hallucinations. Hostel staff called 999, patient very agitated, seeing things. Known heavy drinker, last drink 2 days ago. Patient tremulous, diaphoretic, agitated and confused. Visual hallucinations - brushing spiders off body. Orientated to person only. Coarse tremor both hands. RR 22, SpO2 96%, HR 128, BP 172/98, Temp 37.9C. High risk of withdrawal seizures and DTs. Requires benzodiazepines and urgent medical assessment.",
    documentMetadata: generateDocumentMetadata(58),
    gpLetters: ["Medication Review", "Appointment Summary"]
  },

  // Scenario 31: Meningococcal Septicaemia
  {
    patient: {
      ...generatePatient(19, "Female"),
      presentation: "Severe headache, photophobia, neck stiffness, non-blanching purpuric rash on legs and trunk, fever 39.8C, vomiting, drowsy, symptoms developed rapidly over 6 hours",
      medicalHistory: ["Previously fit and well", "University student"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Combined oral contraceptive")!, quantity: "3 packs", instructions: "Take one tablet daily" }
    ],
    dispatchInfo: "Category 1: 19-year-old female, suspected meningococcal septicaemia - PRE-ALERT SENT. University flatmate called 999, patient deteriorating rapidly. Complaining of severe headache, photophobic, neck pain. Non-blanching purpuric rash noted on both legs spreading to trunk. Patient drowsy, GCS 13/15 (E4 V4 M5). Kernig's sign positive. RR 28, SpO2 94% on high flow oxygen, HR 136, BP 88/52, Temp 39.8C, CRT 4 seconds. LIFE-THREATENING EMERGENCY. Pre-alert sent. Requires immediate IV/IM benzylpenicillin or ceftriaxone and rapid conveyance to ED.",
    documentMetadata: generateDocumentMetadata(19),
    gpLetters: ["Appointment Summary"]
  },

  // Scenario 32: Acute Massive Pulmonary Embolism
  {
    patient: {
      ...generatePatient(54, "Female"),
      presentation: "Sudden onset severe breathlessness, sharp pleuritic chest pain right side, feeling like going to die, recent long-haul flight from Australia 2 days ago, right calf swollen and tender",
      medicalHistory: ["Factor V Leiden thrombophilia", "Previous DVT 5 years ago", "Obesity BMI 34", "Combined oral contraceptive pill", "Smoker 15 pack years"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Apixaban")!, quantity: "56 tablets", instructions: "Take one 2.5mg tablet twice daily (stopped 2 weeks ago for trip)" },
      { medication: medications.find(m => m.name === "Combined oral contraceptive")!, quantity: "3 packs", instructions: "Take one tablet daily" }
    ],
    dispatchInfo: "Category 1: 54-year-old female, sudden onset severe breathlessness, pleuritic chest pain. Husband called 999, patient extremely breathless and distressed. Just returned from Australia 2 days ago. Right calf swollen, hot, tender - positive Homan's sign. Stopped anticoagulation for flight. Patient appears cyanosed, using accessory muscles. RR 34, SpO2 84% on high flow oxygen 15L non-rebreathe, HR 132, BP 92/58. ECG shows sinus tachycardia, right heart strain pattern - S1Q3T3. Clinical features consistent with massive PE. Requires immediate pre-alert and thrombolysis consideration.",
    documentMetadata: generateDocumentMetadata(54),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 33: Upper GI Bleed - Variceal
  {
    patient: {
      ...generatePatient(62, "Male"),
      presentation: "Large volume haematemesis x3, fresh red blood, melaena, severe abdominal pain, dizzy and weak, history of alcohol-related liver cirrhosis",
      medicalHistory: ["Decompensated liver cirrhosis Child-Pugh C", "Known oesophageal varices", "Portal hypertension", "Ascites", "Previous variceal banding", "Alcohol dependence", "Hepatic encephalopathy"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Propranolol")!, quantity: "28 tablets", instructions: "Take one 80mg tablet twice daily for portal hypertension" },
      { medication: medications.find(m => m.name === "Spironolactone")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" },
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily" },
      { medication: medications.find(m => m.name === "Lactulose")!, quantity: "500ml", instructions: "Take 30ml three times daily titrate to 2-3 soft stools daily" },
      { medication: medications.find(m => m.name === "Rifaximin")!, quantity: "56 tablets", instructions: "Take one 550mg tablet twice daily for hepatic encephalopathy" },
      { medication: medications.find(m => m.name === "Thiamine")!, quantity: "28 tablets", instructions: "Take one 100mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 40mg capsule once daily" }
    ],
    dispatchInfo: "Category 1: 62-year-old male, massive haematemesis, known varices - PRE-ALERT SENT. Wife called 999 after patient vomited large amounts of bright red blood x3. Patient extremely pale, clammy, shocked. Bowl contains approximately 1.5 litres fresh blood. Further melaena passed. Jaundiced, spider naevi noted, tense ascites, hepatic flap present. GCS 14/15. RR 28, SpO2 92% on high flow oxygen, HR 136, BP 78/42, Temp 37.1C. Massive upper GI bleed from oesophageal varices. LIFE-THREATENING. Requires immediate fluid resuscitation, pre-alert to ED for emergency endoscopy and blood products.",
    documentMetadata: generateDocumentMetadata(62),
    gpLetters: ["Blood Test Results", "Medication Review"]
  },

  // Scenario 34: Hyperglycaemic Hyperosmolar State (HHS)
  {
    patient: {
      ...generatePatient(78, "Female"),
      presentation: "Increasing confusion over 5 days, excessive thirst, polyuria, severe dehydration, leg weakness unable to stand, reduced oral intake, care home resident",
      medicalHistory: ["Type 2 diabetes mellitus", "Vascular dementia", "Hypertension", "Previous stroke with residual left-sided weakness", "Recurrent UTIs"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Gliclazide")!, quantity: "28 tablets", instructions: "Take one 80mg tablet twice daily before meals" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Memantine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet at night" },
      { medication: medications.find(m => m.name === "Aspirin")!, quantity: "28 tablets", instructions: "Take one 75mg tablet once daily" }
    ],
    dispatchInfo: "Category 2: 78-year-old female, severe confusion and dehydration, care home resident. Carers report patient increasingly confused over past week, drinking excessively, passing large amounts of urine, now barely rousable. Patient very drowsy, GCS 11/15 (E3 V3 M5), severe dehydration evident - sunken eyes, dry mucous membranes, poor skin turgor. BGL >33 mmol/L (HI on meter). No ketones on urine dipstick. RR 26, SpO2 94% on room air, HR 118, BP 94/58, Temp 37.6C. Clinical picture consistent with HHS - insidious onset over days, severe hyperglycaemia without ketoacidosis. Requires urgent hospital admission for careful IV fluid resuscitation.",
    documentMetadata: generateDocumentMetadata(78),
    gpLetters: ["Blood Test Results", "Medication Review"]
  }
];
