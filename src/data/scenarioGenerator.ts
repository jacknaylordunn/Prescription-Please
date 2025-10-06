import { medications, type Medication } from "./medications";
import type { Scenario, Patient } from "./scenarios";

const firstNames = {
  Male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Thomas", "Charles", "Daniel", "Matthew", "Andrew", "Paul", "Mark", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Kevin", "Timothy", "Jason", "Jeffrey", "Ryan", "Gary", "Nicholas", "Eric", "Stephen", "Jacob"],
  Female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Margaret", "Lisa", "Betty", "Dorothy", "Sandra", "Ashley", "Kimberly", "Donna", "Emily", "Carol", "Michelle", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Laura", "Sharon", "Cynthia"]
};

const surnames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Roberts", "Johnson", "Walker", "Wright", "Robinson", "Thompson", "White", "Hughes", "Edwards", "Green", "Hall", "Wood", "Harris", "Martin", "Jackson", "Clarke", "Lewis", "Lee", "Allen", "Scott", "King", "Baker", "Adams", "Nelson", "Hill", "Carter", "Mitchell", "Phillips", "Turner", "Parker", "Collins"];

const streets = ["High Street", "Church Road", "Station Road", "Main Street", "Park Avenue", "Victoria Road", "The Green", "Manor Road", "Church Lane", "Mill Lane", "Queens Road", "King Street", "The Avenue", "School Lane", "York Road", "London Road", "New Street", "Elm Grove", "The Close", "Park Lane", "Bridge Street", "Albert Road", "Chapel Street", "Victoria Street", "Station Avenue"];

const towns = ["Manchester", "Birmingham", "Leeds", "Sheffield", "Bristol", "Liverpool", "Leicester", "Newcastle", "Nottingham", "Southampton", "Portsmouth", "Reading", "Bradford", "Brighton", "Derby", "Norwich", "Exeter", "Cambridge", "Gloucester", "Plymouth", "Coventry", "Bolton", "Sunderland", "Preston", "Wolverhampton"];

export function generateRandomPatient(age: number, gender: "Male" | "Female"): Patient {
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

// Condition templates with realistic medication combinations
const conditionTemplates = [
  {
    condition: "Heart Failure",
    ageRange: [65, 85],
    presentation: "Shortness of breath, ankle swelling, fatigue",
    medications: ["Furosemide", "Bisoprolol", "Ramipril", "Atorvastatin"],
    history: ["Heart failure", "Atrial fibrillation", "Hypertension"],
    dispatch: "elderly patient, difficulty breathing, swollen ankles. Patient conscious, appears breathless at rest."
  },
  {
    condition: "COPD Exacerbation",
    ageRange: [55, 80],
    presentation: "Increased breathlessness, productive cough, wheeze",
    medications: ["Salbutamol", "Ipratropium", "Amoxicillin", "Omeprazole"],
    history: ["COPD", "Ex-smoker", "Hypertension"],
    dispatch: "breathing difficulty, history of lung disease, productive cough. Patient using accessory muscles to breathe."
  },
  {
    condition: "Type 2 Diabetes",
    ageRange: [45, 75],
    presentation: "High blood sugar readings, increased thirst, tiredness",
    medications: ["Metformin", "Gliclazide", "Simvastatin", "Ramipril"],
    history: ["Type 2 diabetes", "Obesity", "High cholesterol"],
    dispatch: "diabetic patient feeling unwell, blood sugar elevated at home. Patient alert but lethargic."
  },
  {
    condition: "Atrial Fibrillation",
    ageRange: [60, 85],
    presentation: "Palpitations, dizziness, chest discomfort",
    medications: ["Digoxin", "Apixaban", "Bisoprolol", "Atorvastatin"],
    history: ["Atrial fibrillation", "Previous stroke", "Hypertension"],
    dispatch: "irregular heartbeat, feeling dizzy. Patient sitting, appears anxious, pulse irregular."
  },
  {
    condition: "Epilepsy",
    ageRange: [20, 50],
    presentation: "Recent seizure, post-ictal confusion",
    medications: ["Levetiracetam", "Sertraline", "Folic Acid"],
    history: ["Epilepsy", "Depression"],
    dispatch: "witnessed seizure, now recovering. Patient confused but breathing normally, GCS improving."
  },
  {
    condition: "Depression with Chronic Pain",
    ageRange: [35, 65],
    presentation: "Low mood, chronic pain, poor sleep",
    medications: ["Amitriptyline", "Gabapentin", "Paracetamol", "Omeprazole"],
    history: ["Depression", "Chronic back pain", "Fibromyalgia"],
    dispatch: "low mood, chronic pain patient. Patient tearful but cooperative, no immediate risk."
  },
  {
    condition: "Post-Myocardial Infarction",
    ageRange: [55, 75],
    presentation: "Chest tightness on exertion, recovering from heart attack",
    medications: ["Bisoprolol", "Ramipril", "Atorvastatin", "Rivaroxaban"],
    history: ["Previous MI", "Hypertension", "High cholesterol"],
    dispatch: "chest discomfort, previous heart attack. Patient anxious, pain on minimal exertion."
  },
  {
    condition: "Urinary Tract Infection",
    ageRange: [70, 90],
    presentation: "Burning on urination, confusion, fever",
    medications: ["Trimethoprim", "Paracetamol", "Adcal D3"],
    history: ["Recurrent UTIs", "Dementia", "Osteoporosis"],
    dispatch: "confused elderly patient, care home resident. Carer concerned about possible infection."
  },
  {
    condition: "Asthma",
    ageRange: [20, 45],
    presentation: "Severe wheeze, breathlessness, unable to complete sentences",
    medications: ["Salbutamol", "Omeprazole"],
    history: ["Asthma", "Eczema"],
    dispatch: "severe asthma attack, struggling to breathe. Patient using own inhaler with little effect."
  },
  {
    condition: "Cellulitis",
    ageRange: [45, 70],
    presentation: "Red, swollen, painful leg, fever",
    medications: ["Flucloxacillin", "Metformin", "Ibuprofen", "Omeprazole"],
    history: ["Diabetes", "Peripheral vascular disease"],
    dispatch: "infected leg, diabetic patient. Patient limping, leg hot, red and swollen."
  },
  {
    condition: "Pneumonia",
    ageRange: [65, 85],
    presentation: "Productive cough, fever, breathlessness, chest pain",
    medications: ["Co-amoxiclav", "Clarithromycin", "Digoxin", "Paracetamol"],
    history: ["COPD", "Atrial fibrillation"],
    dispatch: "very breathless, high fever, productive cough. Patient SpO2 low, needs oxygen."
  },
  {
    condition: "Hypertension",
    ageRange: [50, 75],
    presentation: "Headache, high BP readings at home",
    medications: ["Amlodipine", "Ramipril", "Bendroflumethiazide", "Atorvastatin"],
    history: ["Hypertension", "High cholesterol", "Family history of stroke"],
    dispatch: "headache, BP very high at home. Patient anxious, no chest pain noted."
  },
  {
    condition: "Parkinson's Disease",
    ageRange: [60, 80],
    presentation: "Tremor, rigidity, difficulty walking",
    medications: ["Co-careldopa", "Ropinirole", "Selegiline", "Bisacodyl"],
    history: ["Parkinson's disease", "Depression", "Constipation"],
    dispatch: "fallen at home, Parkinson's patient. Patient on floor, no obvious injury, tremor noted."
  },
  {
    condition: "Chronic Kidney Disease",
    ageRange: [55, 80],
    presentation: "Fatigue, nausea, swelling",
    medications: ["Furosemide", "Ramipril", "Ferrous sulfate", "Alfacalcidol"],
    history: ["CKD stage 4", "Anaemia", "Hypertension"],
    dispatch: "unwell, kidney disease patient. Patient lethargic, appears pale, ankles swollen."
  },
  {
    condition: "Rheumatoid Arthritis",
    ageRange: [40, 70],
    presentation: "Joint pain and swelling, morning stiffness",
    medications: ["Methotrexate", "Folic Acid", "Naproxen", "Omeprazole"],
    history: ["Rheumatoid arthritis", "Hypertension"],
    dispatch: "severe joint pain, arthritis patient. Patient struggling to move, hands swollen."
  },
  {
    condition: "Hypothyroidism",
    ageRange: [30, 65],
    presentation: "Fatigue, weight gain, cold intolerance",
    medications: ["Levothyroxine", "Sertraline", "Vitamin D"],
    history: ["Hypothyroidism", "Depression", "Vitamin D deficiency"],
    dispatch: "very tired, feeling unwell. Patient sitting, appears exhausted but stable."
  },
  {
    condition: "Gastro-oesophageal Reflux",
    ageRange: [40, 70],
    presentation: "Severe heartburn, chest discomfort, regurgitation",
    medications: ["Lansoprazole", "Gaviscon", "Ranitidine"],
    history: ["GORD", "Hiatus hernia"],
    dispatch: "chest pain query cardiac, reflux history. Patient anxious, chest discomfort but obs stable."
  },
  {
    condition: "Bipolar Disorder",
    ageRange: [25, 55],
    presentation: "Mood swings, manic episode, risk assessment needed",
    medications: ["Lithium", "Olanzapine", "Sodium valproate", "Sertraline"],
    history: ["Bipolar disorder", "Previous suicide attempt"],
    dispatch: "mental health concern, manic behaviour. Patient agitated but cooperative, family present."
  },
  {
    condition: "Dementia with Agitation",
    ageRange: [75, 95],
    presentation: "Confusion, agitation, wandering",
    medications: ["Memantine", "Risperidone", "Zopiclone", "Adcal D3"],
    history: ["Vascular dementia", "Hypertension", "Previous falls"],
    dispatch: "confused elderly patient, care home. Patient wandering, trying to leave, distressed."
  },
  {
    condition: "Inflammatory Bowel Disease",
    ageRange: [25, 50],
    presentation: "Abdominal pain, bloody diarrhea, weight loss",
    medications: ["Mesalazine", "Azathioprine", "Prednisolone", "Folic Acid"],
    history: ["Crohn's disease", "Anaemia"],
    dispatch: "severe abdominal pain, Crohn's patient. Patient doubled over, multiple toilet visits."
  },
  {
    condition: "Schizophrenia",
    ageRange: [30, 60],
    presentation: "Hallucinations, paranoia, non-compliance with medication",
    medications: ["Clozapine", "Aripiprazole", "Procyclidine", "Diazepam"],
    history: ["Schizophrenia", "Previous sectioning"],
    dispatch: "mental health crisis, paranoid behavior. Patient hearing voices, family concerned."
  }
];

export function generateRandomScenario(): Scenario {
  const template = conditionTemplates[Math.floor(Math.random() * conditionTemplates.length)];
  const age = Math.floor(Math.random() * (template.ageRange[1] - template.ageRange[0] + 1)) + template.ageRange[0];
  const gender = Math.random() > 0.5 ? "Male" : "Female";
  
  const patient: Patient = {
    ...generateRandomPatient(age, gender),
    presentation: template.presentation,
    medicalHistory: template.history
  };
  
  const prescriptions = template.medications
    .map(medName => medications.find(m => m.name === medName))
    .filter((med): med is Medication => med !== undefined)
    .map(medication => ({
      medication,
      quantity: medication.category === "Bronchodilator" ? "1 inhaler" : `${Math.floor(Math.random() * 56) + 28} tablets`,
      instructions: medication.frequency.includes("Once") 
        ? `Take one ${medication.dose} tablet once daily${medication.name === "Simvastatin" ? " at night" : ""}`
        : medication.frequency.includes("Twice")
        ? `Take one ${medication.dose} tablet twice daily`
        : medication.frequency.includes("Three")
        ? `Take one ${medication.dose} tablet three times daily`
        : medication.frequency.includes("Four")
        ? `Take ${medication.name === "Paracetamol" ? "two" : "one"} ${medication.dose} tablet${medication.name === "Paracetamol" ? "s" : ""} four times daily`
        : medication.frequency.includes("PRN")
        ? `Use as required for symptoms`
        : `Take as directed - ${medication.frequency}`
    }));

  return {
    patient,
    prescriptions,
    dispatchInfo: `${age} year old ${gender.toLowerCase()}, ${template.dispatch}`
  };
}
