import { medications, type Medication } from "./medications";
import type { Scenario, Patient, DocumentMetadata } from "./scenarios";

export type GPLetterType = "Blood Test Results" | "Appointment Summary" | "Appointment Confirmation" | "Medication Review";

const doctorNames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Anderson", "Mitchell", "Patterson", "Thompson", "Roberts", "Johnson"];

function generateDocumentMetadata(patientAge: number): DocumentMetadata {
  const today = new Date();
  const admissionDate = new Date(Date.now() - Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000);
  const appointmentTimes = ["09:30", "10:45", "14:20", "15:30"];
  const medicationChanges = ["Dose increased", "New medication added"];
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
    cholesterolValue: Math.random() > 0.5 ? "5.8 mmol/L (high)" : "4.2 mmol/L (target)",
    appointmentSummaryDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    heartRate: Math.floor(Math.random() * 20) + 72,
    appointmentTime: appointmentTimes[Math.floor(Math.random() * appointmentTimes.length)],
    medicationReviewDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    medicationChange: medicationChanges[Math.floor(Math.random() * medicationChanges.length)],
    patientDOB: dob.toLocaleDateString('en-GB'),
    respectReviewDate: respectReviewDate.toLocaleDateString('en-GB'),
    carePlanReviewDate: today.toLocaleDateString('en-GB')
  };
}

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
    presentation: "Shortness of breath, ankle swelling, fatigue for past week",
    medications: ["Furosemide", "Bisoprolol", "Ramipril", "Atorvastatin"],
    history: ["Heart failure NYHA Class III", "Atrial fibrillation", "Hypertension"],
    dispatch: "elderly patient, difficulty breathing, bilateral ankle swelling. Patient sitting upright, orthopnoea, RR 24, SpO2 91% on air.",
    gpLetters: ["Blood Test Results", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "COPD Exacerbation",
    ageRange: [55, 80],
    presentation: "Worsening breathlessness, productive cough with green sputum, wheeze for 3 days",
    medications: ["Salbutamol", "Ipratropium", "Amoxicillin", "Omeprazole"],
    history: ["COPD Gold Stage 3", "Ex-smoker 40 pack years", "Hypertension"],
    dispatch: "severe breathing difficulty, known COPD patient. Using accessory muscles, pursed lip breathing, audible wheeze, SpO2 88% on air.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Type 2 Diabetes",
    ageRange: [45, 75],
    presentation: "Hyperglycaemia with blood glucose 18mmol/L, polyuria, polydipsia, fatigue for 4 days",
    medications: ["Metformin", "Gliclazide", "Simvastatin", "Ramipril"],
    history: ["Type 2 diabetes poorly controlled HbA1c 72", "Obesity BMI 34", "Hyperlipidaemia"],
    dispatch: "diabetic emergency, BM 18 at home. Patient alert, appears dehydrated, increased urination, fruity breath noted.",
    gpLetters: ["Appointment Confirmation", "Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Atrial Fibrillation",
    ageRange: [60, 85],
    presentation: "Palpitations, dizziness, chest discomfort",
    medications: ["Digoxin", "Apixaban", "Bisoprolol", "Atorvastatin"],
    history: ["Atrial fibrillation", "Previous stroke", "Hypertension"],
    dispatch: "irregular heartbeat, feeling dizzy. Patient sitting, appears anxious, pulse irregular.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Epilepsy",
    ageRange: [20, 50],
    presentation: "Tonic-clonic seizure 10 minutes ago, post-ictal phase with confusion and drowsiness",
    medications: ["Levetiracetam", "Sertraline", "Folic Acid"],
    history: ["Generalised epilepsy", "Depression", "Non-compliance with medications"],
    dispatch: "witnessed tonic-clonic seizure, now post-ictal. Patient GCS 13/15 (E4 V4 M5), confused to time and place, tongue bitten, incontinent of urine."
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
    presentation: "Acute severe asthma exacerbation, unable to complete sentences, severe wheeze",
    medications: ["Salbutamol", "Omeprazole"],
    history: ["Asthma with previous ICU admission", "Eczema", "Hayfever"],
    dispatch: "life-threatening asthma attack, severe respiratory distress. Patient sat forward, RR 32, SpO2 90%, peak flow 40% predicted, used salbutamol 10 puffs with minimal effect."
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
    presentation: "Community acquired pneumonia with productive cough, fever 39.2°C, pleuritic chest pain, breathlessness for 5 days",
    medications: ["Co-amoxiclav", "Clarithromycin", "Digoxin", "Paracetamol"],
    history: ["COPD", "Atrial fibrillation rate controlled", "Previous pneumonia x2"],
    dispatch: "elderly patient, severe respiratory infection. Patient hypoxic SpO2 86% on air, pyrexial 39.2°C, RR 28, productive cough rusty sputum, reduced air entry left base, dull percussion."
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
    presentation: "Fall at home with resting tremor, bradykinesia, rigidity, postural instability",
    medications: ["Co-careldopa", "Ropinirole", "Selegiline", "Bisacodyl"],
    history: ["Parkinson's disease Hoehn & Yahr Stage 3", "Depression", "Constipation", "Multiple falls"],
    dispatch: "mechanical fall, known Parkinson's patient. Patient on floor unable to get up, pill-rolling tremor noted, cogwheel rigidity, no head injury, wearing off period noted.",
    gpLetters: ["Medication Review", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Chronic Kidney Disease",
    ageRange: [55, 80],
    presentation: "Fatigue, nausea, swelling",
    medications: ["Furosemide", "Ramipril", "Ferrous Sulphate", "Alfacalcidol"],
    history: ["CKD stage 4 eGFR 22", "Anaemia of chronic disease", "Hypertension"],
    dispatch: "unwell, kidney disease patient. Patient lethargic, appears pale, periorbital and bilateral ankle oedema, uraemic fetor noted.",
    gpLetters: ["Blood Test Results", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Rheumatoid Arthritis",
    ageRange: [40, 70],
    presentation: "Symmetrical polyarthritis with severe morning stiffness lasting 2 hours, swan-neck deformities, joint pain and swelling",
    medications: ["Methotrexate", "Folic Acid", "Naproxen", "Omeprazole"],
    history: ["Rheumatoid arthritis seropositive", "Hypertension", "Previous pericarditis"],
    dispatch: "severe joint pain, longstanding arthritis patient. Patient struggling to move, hands showing ulnar deviation and swan-neck deformities, warm swollen joints.",
    gpLetters: ["Medication Review", "Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Acute Gout",
    ageRange: [45, 70],
    presentation: "Severe pain and swelling in first metatarsophalangeal joint, red hot tender joint, unable to weight bear",
    medications: ["Colchicine", "Naproxen", "Omeprazole", "Allopurinol"],
    history: ["Recurrent gout", "Hypertension", "High alcohol intake"],
    dispatch: "acute severe foot pain. Patient in severe pain, first toe red hot and swollen, refusing to weight bear, previous gout episodes.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Hypothyroidism",
    ageRange: [30, 65],
    presentation: "Severe fatigue, weight gain 10kg over 6 months, cold intolerance, constipation, dry skin",
    medications: ["Levothyroxine", "Sertraline", "Vitamin D"],
    history: ["Primary hypothyroidism", "Depression", "Vitamin D deficiency"],
    dispatch: "very tired, feeling generally unwell. Patient sitting, appears exhausted but observations stable, bradycardic HR 52.",
    gpLetters: ["Blood Test Results", "Appointment Confirmation"] as GPLetterType[]
  },
  {
    condition: "Gastro-oesophageal Reflux",
    ageRange: [40, 70],
    presentation: "Severe retrosternal burning pain worse after meals and lying flat, regurgitation of acid, water brash",
    medications: ["Lansoprazole", "Gaviscon", "Ranitidine"],
    history: ["GORD", "Hiatus hernia", "Barrett's oesophagus on surveillance"],
    dispatch: "chest pain query cardiac, longstanding reflux history. Patient anxious about chest discomfort but observations stable, pain worse after eating.",
    gpLetters: ["Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Bipolar Disorder Manic Episode",
    ageRange: [25, 55],
    presentation: "Decreased need for sleep, racing thoughts, pressured speech, grandiose ideas, increased spending, risk-taking behaviour for 5 days",
    medications: ["Lithium", "Olanzapine", "Sodium Valproate", "Sertraline"],
    history: ["Bipolar affective disorder Type 1", "Previous suicide attempt", "Non-compliance with medication"],
    dispatch: "mental health concern, manic behaviour, family worried. Patient extremely talkative, flight of ideas, agitated but cooperative, family report financial concerns, needs mental health assessment.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Vascular Dementia with BPSD",
    ageRange: [75, 95],
    presentation: "Progressive cognitive decline, wandering at night, aggression towards carers, visual hallucinations, refusing care",
    medications: ["Memantine", "Risperidone", "Zopiclone", "Adcal D3"],
    history: ["Vascular dementia with behavioural disturbance", "Hypertension", "Previous falls x3", "Multiple TIAs"],
    dispatch: "confused elderly patient, care home calling. Patient agitated, trying to leave building, shouting at staff, MMSE 14/30, needs safeguarding assessment.",
    gpLetters: ["Medication Review", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Inflammatory Bowel Disease Flare",
    ageRange: [25, 50],
    presentation: "Severe abdominal cramping pain, bloody diarrhoea 15 times daily, weight loss 8kg, fever, mouth ulcers",
    medications: ["Mesalazine", "Azathioprine", "Prednisolone", "Folic Acid"],
    history: ["Crohn's disease terminal ileum and colon", "Anaemia", "Previous bowel resection"],
    dispatch: "severe abdominal pain, Crohn's disease patient in flare. Patient pale, cachectic, doubled over with pain, multiple toilet visits, tachycardic, appears dehydrated.",
    gpLetters: ["Blood Test Results", "Appointment Confirmation"] as GPLetterType[]
  },
  {
    condition: "Treatment-Resistant Schizophrenia",
    ageRange: [30, 60],
    presentation: "Auditory hallucinations commanding voices, paranoid delusions, thought disorder, neglecting self-care, non-compliance with depot",
    medications: ["Clozapine", "Aripiprazole", "Procyclidine", "Diazepam"],
    history: ["Paranoid schizophrenia", "Multiple hospital admissions", "Previous violence when unwell"],
    dispatch: "mental health crisis, hearing voices, threatening behaviour. Patient responding to internal stimuli, thought disordered speech, family very concerned, police may be required.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Multiple Sclerosis Relapse",
    ageRange: [30, 55],
    presentation: "Acute onset numbness and weakness in left leg, bladder urgency, optic neuritis with blurred vision, extreme fatigue",
    medications: ["Baclofen", "Gabapentin", "Solifenacin", "Fampridine"],
    history: ["Relapsing-remitting MS", "Previous relapses affecting mobility", "Neuropathic pain"],
    dispatch: "worsening weakness, known MS patient. Patient struggling to mobilize, left leg weakness, visual disturbance, needs urgent neurology input.",
    gpLetters: ["Appointment Summary", "Medication Review"] as GPLetterType[]
  },
  {
    condition: "Angina Pectoris",
    ageRange: [55, 80],
    presentation: "Central crushing chest pain on exertion walking uphill, relieved by rest, radiation to left arm and jaw, breathlessness",
    medications: ["Aspirin", "Atorvastatin", "Bisoprolol", "Isosorbide Mononitrate", "GTN Spray"],
    history: ["Stable angina CCS Class II", "Hypertension", "Type 2 diabetes", "Ex-smoker"],
    dispatch: "chest pain on exertion, known angina patient. Patient currently pain-free, anxious, used GTN spray with relief, ECG shows old changes.",
    gpLetters: ["Blood Test Results", "Appointment Confirmation"] as GPLetterType[]
  },
  {
    condition: "Peripheral Arterial Disease",
    ageRange: [60, 85],
    presentation: "Intermittent claudication right calf after 50 meters, rest pain at night, cold pale foot, absent pedal pulses",
    medications: ["Aspirin", "Atorvastatin", "Clopidogrel", "Ramipril"],
    history: ["Peripheral arterial disease", "Type 2 diabetes", "Active smoker 40 pack years", "Previous TIA"],
    dispatch: "leg pain, circulation problems. Patient pale foot noted, capillary refill 5 seconds, absent pulses, needs urgent vascular assessment.",
    gpLetters: ["Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Pulmonary Embolism",
    ageRange: [45, 75],
    presentation: "Sudden onset pleuritic chest pain and breathlessness, haemoptysis, recent long-haul flight, unilateral leg swelling",
    medications: ["Apixaban", "Paracetamol"],
    history: ["Previous DVT", "Factor V Leiden thrombophilia", "Oral contraceptive pill"],
    dispatch: "sudden breathlessness and chest pain. Patient tachycardic HR 118, tachypnoeic RR 26, SpO2 91% on air, pleuritic pain, swollen left calf, Wells score high risk PE.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Sepsis from UTI",
    ageRange: [75, 95],
    presentation: "Rigors, fever 39.8°C, confusion, hypotension, tachycardia, dysuria, offensive urine, reduced urine output",
    medications: ["Co-amoxiclav", "Paracetamol"],
    history: ["Recurrent UTIs", "Type 2 diabetes", "Chronic kidney disease stage 3"],
    dispatch: "unwell elderly patient, query sepsis. Patient confused baseline AMTS 4/10, pyrexial 39.8°C, HR 124, BP 88/54, RR 24, NEWS2 score 9 - RED flag sepsis criteria met.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Acute Coronary Syndrome",
    ageRange: [50, 80],
    presentation: "Crushing central chest pain 45 minutes, radiation to jaw and left arm, sweating, nausea, breathlessness, sense of impending doom",
    medications: ["Aspirin", "Atorvastatin", "Ramipril"],
    history: ["Hypertension", "High cholesterol", "Type 2 diabetes", "Family history of MI", "Smoker"],
    dispatch: "severe chest pain, possible heart attack. Patient pale, clammy, severe pain 9/10, BP 98/64, HR 108, ST elevation on ECG - STEMI activation required.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Alcohol Withdrawal",
    ageRange: [40, 70],
    presentation: "Tremor, sweating, agitation, visual hallucinations, confusion, last drink 48 hours ago, CIWA-Ar score 22",
    medications: ["Diazepam", "Thiamine", "Pabrinex"],
    history: ["Alcohol dependence 80 units/week", "Previous DTs", "Chronic liver disease", "Wernicke's encephalopathy"],
    dispatch: "alcohol withdrawal, becoming confused and agitated. Patient tremulous, tachycardic 118, hypertensive 168/98, seeing spiders on walls, needs urgent treatment to prevent seizures.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Acute Pancreatitis",
    ageRange: [40, 70],
    presentation: "Severe epigastric pain radiating to back, vomiting, unable to eat, pain worse lying flat, relieved by sitting forward",
    medications: ["Morphine", "Ondansetron"],
    history: ["Gallstones", "Heavy alcohol use", "Hyperlipidaemia"],
    dispatch: "severe abdominal pain radiating to back. Patient in agony, vomiting, epigastric tenderness, tachycardic, needs urgent hospital assessment.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Thyrotoxic Crisis",
    ageRange: [30, 60],
    presentation: "Severe agitation, confusion, fever 39.5°C, palpitations, diarrhoea, tremor, lid lag, goitre palpable",
    medications: ["Carbimazole", "Propranolol"],
    history: ["Graves disease", "Recent upper respiratory infection", "Non-compliance with carbimazole"],
    dispatch: "very unwell, thyroid problem. Patient extremely agitated, pyrexial 39.5°C, tachycardic AF 152, tremulous, life-threatening thyroid storm - needs immediate treatment.",
    gpLetters: ["Blood Test Results", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Diverticulitis",
    ageRange: [55, 80],
    presentation: "Left lower quadrant pain, fever, change in bowel habit, per rectal bleeding, nausea",
    medications: ["Co-amoxiclav", "Metronidazole", "Paracetamol"],
    history: ["Known diverticular disease", "Previous diverticulitis", "IBS"],
    dispatch: "abdominal pain left side, fever. Patient guarding left iliac fossa, tender on palpation, pyrexial 38.2°C, needs imaging to exclude perforation.",
    gpLetters: ["Appointment Confirmation"] as GPLetterType[]
  },
  {
    condition: "Giant Cell Arteritis",
    ageRange: [65, 85],
    presentation: "Severe temporal headache, scalp tenderness, jaw claudication, sudden vision loss right eye, temporal artery pulseless and tender",
    medications: ["Prednisolone", "Omeprazole", "Adcal D3"],
    history: ["Polymyalgia rheumatica", "Recent visual disturbance", "Weight loss"],
    dispatch: "severe headache and vision loss. Patient elderly, tender temples, cannot see from right eye, needs urgent high-dose steroids to save left eye - ophthalmology emergency.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Myasthenia Gravis Crisis",
    ageRange: [30, 65],
    presentation: "Progressive muscle weakness, ptosis bilateral, diplopia, dysphagia, dyspnoea, facial weakness, respiratory distress with reduced vital capacity",
    medications: ["Pyridostigmine", "Prednisolone", "Azathioprine"],
    history: ["Myasthenia gravis diagnosed 3 years ago", "Recent chest infection", "Previous myasthenic crisis requiring ICU"],
    dispatch: "severe muscle weakness, breathing difficulty. Patient unable to lift head, ptosis both eyes, weak voice, struggling to swallow secretions, RR 28, SpO2 89% - respiratory failure imminent, needs ICU.",
    gpLetters: ["Blood Test Results", "Appointment Summary"] as GPLetterType[]
  },
  {
    condition: "Addisonian Crisis",
    ageRange: [35, 70],
    presentation: "Severe vomiting, diarrhoea, abdominal pain, confusion, profound weakness, hyperpigmentation noted, recent gastroenteritis, missed steroid doses",
    medications: ["Hydrocortisone", "Fludrocortisone"],
    history: ["Primary adrenal insufficiency Addison's disease", "Autoimmune thyroiditis", "Type 1 diabetes"],
    dispatch: "collapsed at home, severe vomiting. Patient confused GCS 13/15, hypotensive 78/42, tachycardic 128, hypoglycaemic BM 2.8, hyponatraemic - life-threatening adrenal crisis.",
    gpLetters: ["Blood Test Results", "Medication Review"] as GPLetterType[]
  },
  {
    condition: "Necrotising Fasciitis",
    ageRange: [40, 75],
    presentation: "Rapidly spreading cellulitis lower leg with severe pain disproportionate to appearance, crepitus palpable, skin necrosis, systemic toxicity, fever 39.8°C",
    medications: ["Tazocin", "Clindamycin", "Meropenem"],
    history: ["Recent minor leg trauma", "Type 2 diabetes poorly controlled", "Peripheral vascular disease"],
    dispatch: "severe leg infection spreading rapidly. Patient systemically unwell, leg purple discolouration, crepitus felt, severe pain, tachycardic 132, hypotensive 88/56 - surgical emergency.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Acute Liver Failure",
    ageRange: [25, 60],
    presentation: "Jaundice, confusion hepatic encephalopathy grade 3, coagulopathy with spontaneous bruising, ascites, asterixis, paracetamol overdose 72 hours ago",
    medications: ["N-acetylcysteine", "Lactulose", "Vitamin K"],
    history: ["Paracetamol overdose 72 hours", "Previous suicide attempt", "Depression"],
    dispatch: "unresponsive patient, jaundiced. Patient GCS 9/15 (E3 V2 M4), deeply jaundiced, flapping tremor, liver failure - needs urgent hepatology/transplant assessment.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Eclampsia",
    ageRange: [20, 42],
    presentation: "Tonic-clonic seizure in pregnancy 36 weeks, severe headache, visual disturbance, epigastric pain, BP 178/118, proteinuria 3+",
    medications: ["Magnesium Sulphate", "Labetalol"],
    history: ["Primigravida 36 weeks", "Pre-eclampsia diagnosed last week", "No previous seizures"],
    dispatch: "pregnant woman having seizures. Patient post-ictal, 36 weeks pregnant, BP 178/118, severe headache, needs immediate magnesium and delivery - obstetric emergency.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Tension Pneumothorax",
    ageRange: [25, 60],
    presentation: "Sudden severe breathlessness and chest pain, tracheal deviation to left, hyperresonant right chest, absent breath sounds right, distended neck veins, hypotensive",
    medications: [],
    history: ["Recent rib fracture right side", "COPD", "Previous pneumothorax"],
    dispatch: "critical - severe breathing difficulty, possible pneumothorax. Patient cyanosed, trachea deviated, hyperresonant right chest, no air entry right, BP 82/54, needs immediate needle decompression.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Malignant Hyperthermia",
    ageRange: [20, 50],
    presentation: "Post-operative hyperthermia 42°C, muscle rigidity, tachycardia 156, rising CO2, acidosis, rhabdomyolysis with dark urine, general anaesthetic 2 hours ago",
    medications: ["Dantrolene"],
    history: ["Recent appendicectomy", "Family history of anaesthetic problems", "Previously well"],
    dispatch: "post-operative emergency, very high temperature. Patient rigid, pyrexial 42°C, tachycardic 156, dark urine, life-threatening reaction to anaesthetic - needs dantrolene immediately.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Bacterial Meningitis",
    ageRange: [18, 65],
    presentation: "Severe headache, photophobia, neck stiffness, non-blanching purpuric rash spreading rapidly, fever 39.6°C, drowsy GCS 13/15, Kernig's sign positive",
    medications: ["Ceftriaxone", "Dexamethasone"],
    history: ["Previously well", "Recent upper respiratory infection", "University student"],
    dispatch: "severe headache, rash spreading, drowsy. Patient GCS 13/15, pyrexial 39.6°C, neck stiffness, non-blanching rash thighs and trunk - meningococcal septicaemia, needs immediate antibiotics.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Aortic Dissection",
    ageRange: [50, 75],
    presentation: "Sudden tearing chest pain radiating to back between shoulder blades, blood pressure difference 40mmHg between arms, aortic regurgitation murmur, syncope",
    medications: ["Labetalol", "Morphine"],
    history: ["Hypertension poorly controlled", "Marfan syndrome", "Smoker"],
    dispatch: "severe chest and back pain, tearing sensation. Patient pale, clammy, BP 188/92 right arm 148/86 left arm, severe pain - aortic dissection suspected, needs urgent CT.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Serotonin Syndrome",
    ageRange: [25, 60],
    presentation: "Confusion, agitation, tremor, hyperreflexia, clonus, dilated pupils, hyperthermia 39.8°C, diaphoresis, started new antidepressant 3 days ago",
    medications: ["Sertraline", "Tramadol"],
    history: ["Depression", "Chronic pain", "Recently increased SSRI dose and started tramadol"],
    dispatch: "confused and agitated, on antidepressants. Patient hyperreflexic, clonus noted, dilated pupils, pyrexial 39.8°C, tachycardic 128 - serotonin syndrome, needs urgent treatment.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Neuroleptic Malignant Syndrome",
    ageRange: [30, 65],
    presentation: "Severe muscle rigidity lead-pipe, hyperthermia 40.2°C, confusion, autonomic instability, fluctuating consciousness, started antipsychotic 5 days ago",
    medications: ["Haloperidol", "Dantrolene"],
    history: ["Schizophrenia", "Recently started new antipsychotic", "Previous dystonic reaction"],
    dispatch: "critically unwell, new psychiatric medication. Patient rigid, pyrexial 40.2°C, confused, tachycardic 142, elevated CK - NMS suspected, needs ICU.",
    gpLetters: ["Medication Review"] as GPLetterType[]
  },
  {
    condition: "Hyperosmolar Hyperglycaemic State",
    ageRange: [55, 85],
    presentation: "Severe dehydration, drowsy GCS 11/15, blood glucose 45mmol/L, profound osmotic diuresis, no ketones, hypotension, tachycardia, dry mucous membranes",
    medications: ["Insulin", "Metformin"],
    history: ["Type 2 diabetes", "Stopped drinking fluids 4 days ago", "Recent UTI"],
    dispatch: "diabetic emergency, very high sugar, dehydrated. Patient drowsy GCS 11/15, BM >30 (meter reads HI), severely dehydrated, hypotensive 86/52 - HHS, needs slow careful rehydration.",
    gpLetters: ["Blood Test Results"] as GPLetterType[]
  },
  {
    condition: "Status Epilepticus",
    ageRange: [20, 60],
    presentation: "Continuous seizure activity 25 minutes, not regaining consciousness between seizures, tonic-clonic movements, cyanosed, hypoxic",
    medications: ["Lorazepam", "Levetiracetam", "Phenytoin"],
    history: ["Epilepsy", "Non-compliant with medication", "Recent alcohol binge"],
    dispatch: "continuous fitting 25 minutes. Patient still seizing, cyanosed, SpO2 82%, given buccal midazolam x2 no effect - status epilepticus, needs immediate IV benzodiazepine.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Hypertensive Emergency",
    ageRange: [45, 75],
    presentation: "Severe headache, visual disturbance, chest pain, nausea, BP 228/134, papilloedema on fundoscopy, acute kidney injury, microangiopathic haemolysis",
    medications: ["Labetalol", "Ramipril", "Amlodipine"],
    history: ["Hypertension", "Stopped taking medication 2 weeks ago", "Previous TIA"],
    dispatch: "severe headache, very high blood pressure. Patient headache 10/10, visual disturbance, BP 228/134, needs controlled BP reduction - hypertensive emergency with end-organ damage.",
    gpLetters: ["Blood Test Results", "Medication Review"] as GPLetterType[]
  },
  {
    condition: "Anaphylaxis",
    ageRange: [5, 70],
    presentation: "Sudden onset widespread urticarial rash, angioedema lips and tongue, stridor, wheeze, hypotension 76/42, ate peanuts 15 minutes ago",
    medications: ["Adrenaline", "Chlorphenamine", "Hydrocortisone"],
    history: ["Known peanut allergy", "Previous anaphylaxis requiring ICU", "Carries EpiPen but left at home"],
    dispatch: "severe allergic reaction, breathing difficulty. Patient widespread rash, swollen lips/tongue, stridor audible, wheeze, hypotensive 76/42 - anaphylaxis, needs immediate IM adrenaline.",
    gpLetters: [] as GPLetterType[]
  },
  {
    condition: "Subarachnoid Haemorrhage",
    ageRange: [40, 70],
    presentation: "Sudden onset thunderclap headache worst ever, vomiting, photophobia, neck stiffness, drowsy GCS 13/15, onset during straining at toilet",
    medications: ["Nimodipine"],
    history: ["Hypertension", "Smoker 30 pack years", "Family history of brain aneurysm"],
    dispatch: "sudden severe headache, worst ever. Patient drowsy GCS 13/15, severe headache, vomiting, neck stiff, photophobic - SAH suspected, needs urgent CT head.",
    gpLetters: [] as GPLetterType[]
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
    dispatchInfo: `${age} year old ${gender.toLowerCase()}, ${template.dispatch}`,
    gpLetters: template.gpLetters,
    documentMetadata: generateDocumentMetadata(patient.age)
  };
}
