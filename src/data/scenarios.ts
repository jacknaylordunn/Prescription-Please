import { medications, type Medication } from "./medications";

export interface Patient {
  name: string;
  age: number;
  gender: "Male" | "Female";
  address: string;
  postcode: string;
  nhsNumber: string;
  presentation: string;
  medicalHistory: string[];
}

export type GPLetterType = "Blood Test Results" | "Appointment Summary" | "Appointment Confirmation" | "Medication Review";

export interface Scenario {
  patient: Patient;
  prescriptions: {
    medication: Medication;
    quantity: string;
    instructions: string;
  }[];
  dispatchInfo: string;
  gpLetters?: GPLetterType[];
  additionalDocuments?: {
    type: "Care Plan" | "DNACPR" | "Discharge Letter" | "GP Letter";
    content: string;
  }[];
}

const firstNames = {
  Male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Thomas", "Charles", "Daniel", "Matthew", "Andrew", "Paul", "Mark", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald"],
  Female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Margaret", "Lisa", "Betty", "Dorothy", "Sandra", "Ashley", "Kimberly", "Donna", "Emily"]
};

const surnames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Roberts", "Johnson", "Walker", "Wright", "Robinson", "Thompson", "White", "Hughes", "Edwards", "Green", "Hall", "Wood", "Harris", "Martin", "Jackson", "Clarke", "Lewis", "Lee", "Allen", "Scott", "King"];

const streets = ["High Street", "Church Road", "Station Road", "Main Street", "Park Avenue", "Victoria Road", "The Green", "Manor Road", "Church Lane", "Mill Lane", "Queens Road", "King Street", "The Avenue", "School Lane", "York Road", "London Road", "New Street", "Elm Grove", "The Close", "Park Lane"];

const towns = ["Manchester", "Birmingham", "Leeds", "Sheffield", "Bristol", "Liverpool", "Leicester", "Newcastle", "Nottingham", "Southampton", "Portsmouth", "Reading", "Bradford", "Brighton", "Derby", "Norwich", "Exeter", "Cambridge", "Gloucester", "Plymouth"];

function generatePatient(age: number, gender: "Male" | "Female"): Patient {
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const houseNumber = Math.floor(Math.random() * 200) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const town = towns[Math.floor(Math.random() * towns.length)];
  const postcode = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const nhsNumber = Array(10).fill(0).map(() => Math.floor(Math.random() * 10)).join('');

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

export const scenarios: Scenario[] = [
  // Scenario 1: Heart Failure
  {
    patient: {
      ...generatePatient(76, "Male"),
      presentation: "Shortness of breath, ankle swelling, fatigue for 3 days",
      medicalHistory: ["Heart failure", "Atrial fibrillation", "Type 2 diabetes"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Furosemide")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily in the morning" },
      { medication: medications.find(m => m.name === "Bisoprolol")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" }
    ],
    dispatchInfo: "76 year old male, difficulty breathing, history of heart problems. Patient conscious and alert."
  },
  
  // Scenario 2: Atrial Fibrillation
  {
    patient: {
      ...generatePatient(68, "Female"),
      presentation: "Palpitations, dizziness, chest discomfort",
      medicalHistory: ["Atrial fibrillation", "Hypertension", "Previous stroke"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Digoxin")!, quantity: "28 tablets", instructions: "Take one 125mcg tablet once daily" },
      { medication: medications.find(m => m.name === "Apixaban")!, quantity: "56 tablets", instructions: "Take one 5mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily at night" }
    ],
    dispatchInfo: "68 year old female, irregular heartbeat, feeling dizzy. Patient sitting, appears anxious."
  },

  // Scenario 3: COPD Exacerbation
  {
    patient: {
      ...generatePatient(72, "Male"),
      presentation: "Increased breathlessness, productive cough, wheeze",
      medicalHistory: ["COPD", "Ex-smoker", "Hypertension"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol")!, quantity: "1 inhaler", instructions: "Two puffs four times daily and as required" },
      { medication: medications.find(m => m.name === "Ipratropium")!, quantity: "1 inhaler", instructions: "Two puffs four times daily" },
      { medication: medications.find(m => m.name === "Amoxicillin")!, quantity: "21 capsules", instructions: "Take one 500mg capsule three times daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" }
    ],
    dispatchInfo: "72 year old male, severe breathing difficulty, history of lung disease. Patient using accessory muscles."
  },

  // Scenario 4: Type 2 Diabetes
  {
    patient: {
      ...generatePatient(58, "Female"),
      presentation: "High blood sugar readings, increased thirst, tiredness",
      medicalHistory: ["Type 2 diabetes", "Obesity", "High cholesterol"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 1g tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Gliclazide")!, quantity: "28 tablets", instructions: "Take one 80mg tablet once daily before breakfast" },
      { medication: medications.find(m => m.name === "Simvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily at night" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 2.5mg tablet once daily" }
    ],
    dispatchInfo: "58 year old female, feeling unwell, diabetic. Blood sugar reading elevated at home."
  },

  // Scenario 5: Epilepsy
  {
    patient: {
      ...generatePatient(34, "Male"),
      presentation: "Recent seizure, post-ictal confusion",
      medicalHistory: ["Epilepsy", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Levetiracetam")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 50mg tablet once daily" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" }
    ],
    dispatchInfo: "34 year old male, witnessed seizure, now recovering. Patient confused but breathing normally."
  },

  // Scenario 6: Depression and Chronic Pain
  {
    patient: {
      ...generatePatient(45, "Female"),
      presentation: "Low mood, chronic back pain, poor sleep",
      medicalHistory: ["Depression", "Chronic back pain", "Fibromyalgia"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Amitriptyline")!, quantity: "28 tablets", instructions: "Take one 50mg tablet once daily at night" },
      { medication: medications.find(m => m.name === "Gabapentin")!, quantity: "84 capsules", instructions: "Take one 300mg capsule three times daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily as required" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "45 year old female, crisis call, low mood and pain. Patient tearful but cooperative."
  },

  // Scenario 7: Post-MI (Myocardial Infarction)
  {
    patient: {
      ...generatePatient(62, "Male"),
      presentation: "Chest tightness on exertion, recovering from heart attack",
      medicalHistory: ["Previous MI", "Hypertension", "High cholesterol"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Bisoprolol")!, quantity: "28 tablets", instructions: "Take one 2.5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 80mg tablet once daily" },
      { medication: medications.find(m => m.name === "Apixaban")!, quantity: "56 tablets", instructions: "Take one 2.5mg tablet twice daily" }
    ],
    dispatchInfo: "62 year old male, chest discomfort, previous heart attack. Patient anxious, chest pain on exertion."
  },

  // Scenario 8: UTI (Urinary Tract Infection)
  {
    patient: {
      ...generatePatient(82, "Female"),
      presentation: "Burning on urination, confusion, fever",
      medicalHistory: ["Recurrent UTIs", "Dementia", "Osteoporosis"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Trimethoprim")!, quantity: "6 tablets", instructions: "Take one 200mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily" },
      { medication: medications.find(m => m.name === "Adcal D3")!, quantity: "56 tablets", instructions: "Take one tablet twice daily" }
    ],
    dispatchInfo: "82 year old female, confused, care home resident. Carer concerned about infection."
  },

  // Scenario 9: Asthma Attack
  {
    patient: {
      ...generatePatient(28, "Female"),
      presentation: "Severe wheeze, breathlessness, unable to complete sentences",
      medicalHistory: ["Asthma", "Eczema"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Salbutamol")!, quantity: "2 inhalers", instructions: "Two puffs four times daily and as required for wheeze" }
    ],
    dispatchInfo: "28 year old female, severe asthma attack, struggling to breathe. Patient using own inhaler with little effect."
  },

  // Scenario 10: Cellulitis
  {
    patient: {
      ...generatePatient(55, "Male"),
      presentation: "Red, swollen, painful leg, fever",
      medicalHistory: ["Diabetes", "Peripheral vascular disease"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Flucloxacillin")!, quantity: "28 capsules", instructions: "Take one 500mg capsule four times daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Ibuprofen")!, quantity: "84 tablets", instructions: "Take one 400mg tablet three times daily with food" }
    ],
    dispatchInfo: "55 year old male, infected leg, diabetic. Patient limping, leg hot and red."
  },

  // Scenario 11: Gastroenteritis
  {
    patient: {
      ...generatePatient(38, "Female"),
      presentation: "Vomiting, diarrhea, abdominal pain",
      medicalHistory: ["IBS", "Anxiety"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Cyclizine")!, quantity: "30 tablets", instructions: "Take one 50mg tablet three times daily as required" },
      { medication: medications.find(m => m.name === "Citalopram")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "38 year old female, severe vomiting and diarrhea, dehydrated. Patient weak and pale."
  },

  // Scenario 12: Parkinson's Disease
  {
    patient: {
      ...generatePatient(71, "Male"),
      presentation: "Increased tremor, mobility problems, falls",
      medicalHistory: ["Parkinson's disease", "Hypertension", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-codamol")!, quantity: "100 tablets", instructions: "Take two 30/500mg tablets four times daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 30mg tablet once daily at night" },
      { medication: medications.find(m => m.name === "Senna")!, quantity: "60 tablets", instructions: "Take two tablets once daily at night" }
    ],
    dispatchInfo: "71 year old male, fallen at home, Parkinson's disease. Patient on floor, tremoring, unable to stand."
  },

  // Scenario 13: Pneumonia
  {
    patient: {
      ...generatePatient(79, "Female"),
      presentation: "Productive cough, fever, breathlessness, chest pain",
      medicalHistory: ["COPD", "Atrial fibrillation"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Co-amoxiclav")!, quantity: "21 tablets", instructions: "Take one 625mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Clarithromycin")!, quantity: "14 tablets", instructions: "Take one 500mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Digoxin")!, quantity: "28 tablets", instructions: "Take one 62.5mcg tablet once daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily" }
    ],
    dispatchInfo: "79 year old female, very breathless, high fever, productive cough. Patient SpO2 low, needs oxygen."
  },

  // Scenario 14: Migraine
  {
    patient: {
      ...generatePatient(32, "Female"),
      presentation: "Severe headache, photophobia, nausea",
      medicalHistory: ["Migraine", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ibuprofen")!, quantity: "84 tablets", instructions: "Take two 400mg tablets as required (max 3 times daily)" },
      { medication: medications.find(m => m.name === "Metoclopramide")!, quantity: "30 tablets", instructions: "Take one 10mg tablet three times daily as required" },
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" }
    ],
    dispatchInfo: "32 year old female, severe headache, vomiting, in dark room. Patient distressed, light sensitive."
  },

  // Scenario 15: Hypertension
  {
    patient: {
      ...generatePatient(64, "Male"),
      presentation: "Headache, high BP readings at home",
      medicalHistory: ["Hypertension", "High cholesterol", "Family history of stroke"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Bendroflumethiazide")!, quantity: "28 tablets", instructions: "Take one 2.5mg tablet once daily in the morning" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily" }
    ],
    dispatchInfo: "64 year old male, headache, BP very high at home. Patient anxious, no chest pain."
  },

  // Scenario 16: Constipation
  {
    patient: {
      ...generatePatient(85, "Female"),
      presentation: "Abdominal pain, no bowel movement for 5 days",
      medicalHistory: ["Constipation", "Hypothyroidism", "Osteoarthritis"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Lactulose")!, quantity: "500ml", instructions: "Take 15ml twice daily" },
      { medication: medications.find(m => m.name === "Senna")!, quantity: "60 tablets", instructions: "Take two tablets once daily at night" },
      { medication: medications.find(m => m.name === "Levothyroxine")!, quantity: "28 tablets", instructions: "Take one 100mcg tablet once daily before breakfast" },
      { medication: medications.find(m => m.name === "Co-codamol")!, quantity: "100 tablets", instructions: "Take two 8/500mg tablets four times daily" }
    ],
    dispatchInfo: "85 year old female, abdominal pain, constipated. Patient in discomfort, abdomen distended."
  },

  // Scenario 17: Thyroid Problems
  {
    patient: {
      ...generatePatient(52, "Female"),
      presentation: "Fatigue, weight gain, feeling cold",
      medicalHistory: ["Hypothyroidism", "Depression", "High cholesterol"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Levothyroxine")!, quantity: "28 tablets", instructions: "Take one 125mcg tablet once daily 30 minutes before breakfast" },
      { medication: medications.find(m => m.name === "Citalopram")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily" },
      { medication: medications.find(m => m.name === "Simvastatin")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily at night" }
    ],
    dispatchInfo: "52 year old female, extreme tiredness, feels unwell. Patient lethargic but conscious."
  },

  // Scenario 18: Anaemia
  {
    patient: {
      ...generatePatient(48, "Female"),
      presentation: "Tiredness, pale, dizzy spells",
      medicalHistory: ["Iron deficiency anaemia", "Heavy periods"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ferrous Sulphate")!, quantity: "84 tablets", instructions: "Take one 200mg tablet twice daily" },
      { medication: medications.find(m => m.name === "Folic Acid")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "48 year old female, feeling faint, very pale. Patient sitting, appears exhausted."
  },

  // Scenario 19: Gout
  {
    patient: {
      ...generatePatient(56, "Male"),
      presentation: "Severe pain in big toe, red and swollen",
      medicalHistory: ["Gout", "Hypertension", "Obesity"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ibuprofen")!, quantity: "84 tablets", instructions: "Take one 400mg tablet three times daily with food" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" }
    ],
    dispatchInfo: "56 year old male, severe foot pain, unable to weight bear. Patient in severe discomfort, toe very swollen."
  },

  // Scenario 20: Post-operative
  {
    patient: {
      ...generatePatient(67, "Male"),
      presentation: "Post hip replacement, pain management needed",
      medicalHistory: ["Osteoarthritis", "Hypertension"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Tramadol")!, quantity: "56 capsules", instructions: "Take one 50mg capsule four times daily" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Senna")!, quantity: "60 tablets", instructions: "Take two tablets at night" }
    ],
    dispatchInfo: "67 year old male, post-surgery, pain not controlled. Patient at home, mobilizing with frame."
  },

  // Additional scenarios 21-30 for variety
  {
    patient: {
      ...generatePatient(43, "Female"),
      presentation: "Severe anxiety, panic attacks",
      medicalHistory: ["Anxiety disorder", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Sertraline")!, quantity: "28 tablets", instructions: "Take one 100mg tablet once daily" },
      { medication: medications.find(m => m.name === "Mirtazapine")!, quantity: "28 tablets", instructions: "Take one 15mg tablet once daily at night" }
    ],
    dispatchInfo: "43 year old female, panic attack, hyperventilating. Patient very anxious, trembling."
  },

  {
    patient: {
      ...generatePatient(69, "Male"),
      presentation: "DVT suspected, leg swollen and painful",
      medicalHistory: ["Previous DVT", "Warfarin therapy"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Warfarin")!, quantity: "28 tablets", instructions: "Take as directed by anticoagulation clinic" },
      { medication: medications.find(m => m.name === "Paracetamol")!, quantity: "100 tablets", instructions: "Take two 500mg tablets four times daily as required" }
    ],
    dispatchInfo: "69 year old male, swollen calf, previous blood clots. Patient limping, calf hot and tender."
  },

  {
    patient: {
      ...generatePatient(51, "Female"),
      presentation: "Chest infection, productive cough",
      medicalHistory: ["Asthma", "Hypertension"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Amoxicillin")!, quantity: "21 capsules", instructions: "Take one 500mg capsule three times daily" },
      { medication: medications.find(m => m.name === "Salbutamol")!, quantity: "1 inhaler", instructions: "Two puffs as required" },
      { medication: medications.find(m => m.name === "Amlodipine")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" }
    ],
    dispatchInfo: "51 year old female, breathless, productive cough. Patient wheezy, using inhaler frequently."
  },

  {
    patient: {
      ...generatePatient(77, "Male"),
      presentation: "Confusion, possible sepsis",
      medicalHistory: ["Dementia", "Hypertension", "Prostate problems"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 10mg tablet once daily" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily at night" }
    ],
    dispatchInfo: "77 year old male, confused, unwell, possible infection. Patient drowsy, low blood pressure."
  },

  {
    patient: {
      ...generatePatient(39, "Female"),
      presentation: "Severe back pain, sciatica",
      medicalHistory: ["Chronic back pain", "Depression"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Gabapentin")!, quantity: "84 capsules", instructions: "Take one 300mg capsule three times daily" },
      { medication: medications.find(m => m.name === "Ibuprofen")!, quantity: "84 tablets", instructions: "Take one 400mg tablet three times daily with food" },
      { medication: medications.find(m => m.name === "Amitriptyline")!, quantity: "28 tablets", instructions: "Take one 25mg tablet once daily at night" },
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "39 year old female, severe back pain, unable to move. Patient in severe pain, difficulty walking."
  },

  {
    patient: {
      ...generatePatient(61, "Male"),
      presentation: "Angina, chest tightness",
      medicalHistory: ["Ischaemic heart disease", "Diabetes", "High cholesterol"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Atenolol")!, quantity: "28 tablets", instructions: "Take one 50mg tablet once daily" },
      { medication: medications.find(m => m.name === "Metformin")!, quantity: "56 tablets", instructions: "Take one 500mg tablet twice daily with food" },
      { medication: medications.find(m => m.name === "Atorvastatin")!, quantity: "28 tablets", instructions: "Take one 80mg tablet once daily" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" }
    ],
    dispatchInfo: "61 year old male, chest tightness, cardiac history. Patient anxious, pain on exertion."
  },

  {
    patient: {
      ...generatePatient(74, "Female"),
      presentation: "Fall, rib pain, anticoagulated",
      medicalHistory: ["Atrial fibrillation", "Osteoporosis", "Falls"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Rivaroxaban")!, quantity: "28 tablets", instructions: "Take one 20mg tablet once daily with food" },
      { medication: medications.find(m => m.name === "Adcal D3")!, quantity: "56 tablets", instructions: "Take one tablet twice daily" },
      { medication: medications.find(m => m.name === "Co-codamol")!, quantity: "100 tablets", instructions: "Take two 8/500mg tablets four times daily" }
    ],
    dispatchInfo: "74 year old female, fallen, rib pain, on blood thinners. Patient fallen at home, painful chest wall."
  },

  {
    patient: {
      ...generatePatient(46, "Male"),
      presentation: "Alcohol withdrawal, tremor, sweating",
      medicalHistory: ["Alcohol dependence", "Liver disease"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Omeprazole")!, quantity: "28 capsules", instructions: "Take one 20mg capsule once daily" }
    ],
    dispatchInfo: "46 year old male, alcohol withdrawal symptoms, shaking. Patient sweating, tremoring, anxious."
  },

  {
    patient: {
      ...generatePatient(66, "Female"),
      presentation: "Nausea, vomiting, medication review",
      medicalHistory: ["Cancer treatment", "Hypertension"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Ondansetron")!, quantity: "30 tablets", instructions: "Take one 8mg tablet three times daily" },
      { medication: medications.find(m => m.name === "Morphine")!, quantity: "60ml", instructions: "Take 10ml every 4 hours as required" },
      { medication: medications.find(m => m.name === "Ramipril")!, quantity: "28 tablets", instructions: "Take one 5mg tablet once daily" },
      { medication: medications.find(m => m.name === "Senna")!, quantity: "60 tablets", instructions: "Take two tablets once daily at night" }
    ],
    dispatchInfo: "66 year old female, severe nausea, cancer patient. Patient weak, vomiting, dehydrated."
  },

  {
    patient: {
      ...generatePatient(81, "Male"),
      presentation: "Stroke symptoms, facial droop, weak arm",
      medicalHistory: ["Previous TIA", "Atrial fibrillation", "Hypertension"]
    },
    prescriptions: [
      { medication: medications.find(m => m.name === "Warfarin")!, quantity: "28 tablets", instructions: "Take as directed by anticoagulation clinic" },
      { medication: medications.find(m => m.name === "Atenolol")!, quantity: "28 tablets", instructions: "Take one 50mg tablet once daily" },
      { medication: medications.find(m => m.name === "Simvastatin")!, quantity: "28 tablets", instructions: "Take one 40mg tablet once daily at night" }
    ],
    dispatchInfo: "81 year old male, FAST positive, facial droop. TIME CRITICAL - suspected stroke."
  }
];
