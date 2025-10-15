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
  // Scenario 1: Severe Decompensated Heart Failure with AF
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
    gpLetters: ["Discharge Summary", "Repeat Prescription"]
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
    dispatchInfo: "Category 1: 52-year-old male, found collapsed, ?fitting. Neighbour reports patient is diabetic and was last seen earlier today. Patient unresponsive to pain, GCS 3, BGL 2.1 mmol/L. RR 16, SpO2 97% on room air, HR 72, BP 130/80.",
    documentMetadata: generateDocumentMetadata(52),
    gpLetters: ["Blood Test Results", "Referral Letter"]
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
    gpLetters: ["Allergy Action Plan", "Emergency Contact Details"]
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
    dispatchInfo: "Category 1: 70-year-old male, ?stroke. Wife reports sudden onset of facial droop, arm weakness, and slurred speech. Last seen normal 30 minutes ago. Patient alert but confused, right-sided weakness, speech slurred. FAST positive. RR 18, SpO2 98% on room air, HR 80, BP 180/100.",
    documentMetadata: generateDocumentMetadata(70),
    gpLetters: ["Referral Letter", "Medication Review"]
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
    gpLetters: ["Discharge Summary", "ECG Report"]
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
    dispatchInfo: "Category 2: 82-year-old female, altered mental status, ?sepsis. Nursing home staff report patient confused, feverish, and hypotensive. RR 30, SpO2 90% on room air, HR 120, BP 80/50. Appears unwell and lethargic.",
    documentMetadata: generateDocumentMetadata(82),
    gpLetters: ["Care Home Notes", "Medication Chart"]
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
    dispatchInfo: "Category 1: 35-year-old male, ?overdose. Friend reports patient unresponsive, shallow breathing, and pinpoint pupils. RR 8, SpO2 80% on room air, HR 40, BP 90/60. Track marks visible on arms.",
    documentMetadata: generateDocumentMetadata(35),
    gpLetters: ["Addiction Services Report", "Mental Health Assessment"]
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
    gpLetters: ["Asthma Action Plan", "Paediatric Assessment"]
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
    gpLetters: ["Gynaecology Referral", "Pregnancy Test Results"]
  }
];
