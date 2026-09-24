import type { AssessmentInput, SelectOption, FieldMapping, FAQ, Testimonial, HealthInsight } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Field Mappings — API keys → User-facing labels
// ─────────────────────────────────────────────────────────────────────────────
export const FIELD_MAPPINGS: FieldMapping[] = [
  { key: 'age', label: 'Age', description: 'Years old' },
  { key: 'gender', label: 'Gender' },
  { key: 'height', label: 'Height', description: 'Centimetres (cm)' },
  { key: 'weight', label: 'Weight', description: 'Kilograms (kg)' },
  { key: 'ap_hi', label: 'Systolic Blood Pressure', description: 'mmHg (upper number)' },
  { key: 'ap_lo', label: 'Diastolic Blood Pressure', description: 'mmHg (lower number)' },
  { key: 'cholesterol', label: 'Cholesterol', description: 'Cholesterol level category' },
  { key: 'gluc', label: 'Blood Glucose', description: 'Blood glucose level category' },
  { key: 'smoke', label: 'Smoking', description: 'Current smoker' },
  { key: 'alco', label: 'Alcohol Consumption', description: 'Regular alcohol use' },
  { key: 'active', label: 'Physical Activity', description: 'Physically active' },
];

export function getFieldLabel(key: keyof AssessmentInput): string {
  return FIELD_MAPPINGS.find((f) => f.key === key)?.label ?? key;
}

// Feature importance key → label mapping (for charts)
export const FEATURE_LABEL_MAP: Record<string, string> = {
  age: 'Age',
  gender: 'Gender',
  height: 'Height',
  weight: 'Weight',
  ap_hi: 'Systolic Blood Pressure',
  ap_lo: 'Diastolic Blood Pressure',
  cholesterol: 'Cholesterol',
  gluc: 'Blood Glucose',
  smoke: 'Smoking',
  alco: 'Alcohol',
  active: 'Physical Activity',
  bmi: 'BMI',
};

// ─────────────────────────────────────────────────────────────────────────────
// Option Value Maps (backend numeric codes ↔ display labels)
// ─────────────────────────────────────────────────────────────────────────────

/** Cardiovascular dataset: 1 = Female, 2 = Male */
export const GENDER_OPTIONS: SelectOption[] = [
  { label: 'Female', value: 1, description: '', icon: '♀' },
  { label: 'Male', value: 2, description: '', icon: '♂' },
  { label: 'Other / Prefer not to say', value: 2, description: 'We will use the closest match for the model', icon: '⚧' },
];

export const GENDER_MAP: Record<number, string> = {
  1: 'Female',
  2: 'Male',
};

export const CHOLESTEROL_OPTIONS: SelectOption[] = [
  { label: 'Normal', value: 1, description: 'Within recommended ranges', icon: '✓' },
  { label: 'Above Normal', value: 2, description: 'Slightly elevated', icon: '↑' },
  { label: 'Well Above Normal', value: 3, description: 'Significantly elevated', icon: '↑↑' },
];

export const CHOLESTEROL_MAP: Record<number, string> = {
  1: 'Normal',
  2: 'Above Normal',
  3: 'Well Above Normal',
};

export const GLUCOSE_OPTIONS: SelectOption[] = [
  { label: 'Normal', value: 1, description: 'Within healthy range', icon: '✓' },
  { label: 'Above Normal', value: 2, description: 'Slightly elevated', icon: '↑' },
  { label: 'Well Above Normal', value: 3, description: 'Significantly elevated', icon: '↑↑' },
];

export const GLUCOSE_MAP: Record<number, string> = {
  1: 'Normal',
  2: 'Above Normal',
  3: 'Well Above Normal',
};

// ─────────────────────────────────────────────────────────────────────────────
// Default Assessment Input (blank form)
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_ASSESSMENT: AssessmentInput = {
  age: 0,
  gender: 2,
  height: 0,
  weight: 0,
  ap_hi: 0,
  ap_lo: 0,
  cholesterol: 1,
  gluc: 1,
  smoke: 0,
  alco: 0,
  active: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// Blood Pressure Categories
// ─────────────────────────────────────────────────────────────────────────────
export function getBPCategory(systolic: number, diastolic: number): {
  label: string;
  color: string;
  description: string;
} {
  if (systolic < 120 && diastolic < 80) return { label: 'Normal', color: 'text-emerald-500', description: 'Optimal range' };
  if (systolic < 130 && diastolic < 80) return { label: 'Elevated', color: 'text-yellow-500', description: 'Slightly above normal' };
  if (systolic < 140 || diastolic < 90) return { label: 'High (Stage 1)', color: 'text-orange-500', description: 'Consult a healthcare provider' };
  return { label: 'High (Stage 2)', color: 'text-red-500', description: 'Seek medical advice' };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────
export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What is cardiovascular disease?',
    answer: 'Cardiovascular disease (CVD) is a broad term for conditions affecting the heart and blood vessels, including coronary artery disease, heart attack, stroke, and heart failure. It remains one of the leading causes of illness worldwide, though many risk factors can be addressed through lifestyle changes and medical care.',
    category: 'General',
  },
  {
    id: '2',
    question: 'What does the assessment measure?',
    answer: 'The assessment collects several health and lifestyle indicators — age, gender, height, weight, blood pressure, cholesterol, blood glucose, smoking status, alcohol use, and physical activity — and submits them to a machine learning model trained on cardiovascular health data. The model returns an estimated risk classification.',
    category: 'Assessment',
  },
  {
    id: '3',
    question: 'How does the assessment work?',
    answer: 'You enter your health information in a simple multi-step form. When you click "Analyze My Risk," that data is sent to an existing machine learning API. The API processes your information and returns a result, which CardioSense AI then displays in a clear, visual format.',
    category: 'Assessment',
  },
  {
    id: '4',
    question: 'Is the result a medical diagnosis?',
    answer: 'No. CardioSense AI provides an estimated risk assessment for educational purposes only. The result reflects a statistical model\'s output based on the information you provided and should not be interpreted as a medical diagnosis or clinical advice. Always consult a qualified healthcare professional for medical guidance.',
    category: 'Medical',
  },
  {
    id: '5',
    question: 'What information do I need to complete the assessment?',
    answer: 'You will need your age, gender, height, weight, blood pressure readings (systolic and diastolic), and general information about your cholesterol level, blood glucose level, smoking habits, alcohol use, and physical activity level.',
    category: 'Assessment',
  },
  {
    id: '6',
    question: 'How long does the assessment take?',
    answer: 'The assessment typically takes 3–5 minutes to complete. The form has four straightforward steps and requires no complex calculations on your part — the application handles BMI automatically.',
    category: 'Assessment',
  },
  {
    id: '7',
    question: 'Can I retake the assessment?',
    answer: 'Yes. You can take the assessment as many times as you like. If your health data changes — for example, after adopting a new exercise routine or following a healthcare provider\'s guidance — you can reassess to see an updated result.',
    category: 'Assessment',
  },
  {
    id: '8',
    question: 'How is my information used?',
    answer: 'The health information you enter is submitted directly to the prediction API for processing. CardioSense AI does not share your individual health data with third parties for advertising purposes. Refer to the Privacy Policy for full details on data handling.',
    category: 'Privacy',
  },
  {
    id: '9',
    question: 'Why are blood pressure and cholesterol included?',
    answer: 'Blood pressure and cholesterol are among the most well-researched indicators associated with cardiovascular health. Elevated blood pressure can strain the heart and blood vessels, while abnormal cholesterol levels can contribute to arterial changes. Their inclusion reflects standard cardiovascular health research.',
    category: 'Medical',
  },
  {
    id: '10',
    question: 'When should I consult a healthcare professional?',
    answer: 'You should consult a healthcare professional regularly for routine check-ups, and promptly if you experience symptoms such as chest pain, shortness of breath, irregular heartbeat, dizziness, or extreme fatigue. The result of this assessment should always be discussed with a qualified provider.',
    category: 'Medical',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials (Sample User Feedback — clearly labeled)
// ─────────────────────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Health-conscious professional',
    content: 'The assessment made it genuinely easy to understand which health indicators were being considered. The visualizations were clear and I appreciated the educational context alongside the result.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James T.',
    role: 'Fitness enthusiast',
    content: 'I\'ve tried several health tools, and this stands out for how clearly it presents information. No jargon, no sensationalism — just a clean result with practical context. I shared it with my GP.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya K.',
    role: 'Nursing student',
    content: 'The feature importance chart is a great educational tool. It helps illustrate how different risk factors interact. Excellent for people learning about cardiovascular health.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Daniel R.',
    role: 'Software developer',
    content: 'The interface is beautifully designed. I tested it after a health check-up and the result aligned well with what my doctor had explained. The BMI visualization was particularly helpful.',
    rating: 4,
  },
  {
    id: '5',
    name: 'Amara O.',
    role: 'Public health advocate',
    content: 'Responsible language, clear disclaimers, and a genuinely useful tool for raising awareness. The multi-step form is intuitive and the loading animation made the wait feel worthwhile.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Marcus L.',
    role: 'Personal trainer',
    content: 'I recommend this to clients who want to understand their cardiovascular indicators before committing to a fitness program. The recommendations section provides good general guidance.',
    rating: 4,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Health Insights (Educational Articles)
// ─────────────────────────────────────────────────────────────────────────────
export const HEALTH_INSIGHTS: HealthInsight[] = [
  {
    id: '1',
    title: 'Understanding Blood Pressure Numbers',
    summary: 'Learn what systolic and diastolic readings mean and what ranges are considered healthy by major health organisations.',
    category: 'Blood Pressure',
    read_time: 4,
    icon: '❤️',
    content: `Blood pressure is recorded as two numbers: systolic (the upper number, measured when your heart beats) over diastolic (the lower number, measured between beats). A normal reading is typically below 120/80 mmHg. Elevated blood pressure, or hypertension, can gradually damage blood vessels and increase the workload on the heart. Regular monitoring and lifestyle adjustments — such as reducing sodium intake, exercising regularly, and managing stress — are key components of blood pressure management.`,
  },
  {
    id: '2',
    title: 'Cholesterol and Cardiovascular Health',
    summary: 'Explore the difference between LDL, HDL, and total cholesterol, and how each relates to heart health.',
    category: 'Cholesterol',
    read_time: 5,
    icon: '🔬',
    content: `Cholesterol is a fatty substance produced by the liver and obtained through food. LDL (low-density lipoprotein) is often called "bad" cholesterol because high levels can lead to plaque build-up in arteries. HDL (high-density lipoprotein) is considered "good" cholesterol because it helps remove other forms of cholesterol from the bloodstream. A diet rich in vegetables, whole grains, and healthy fats can support healthy cholesterol levels.`,
  },
  {
    id: '3',
    title: 'The Role of Physical Activity in Heart Health',
    summary: 'Discover how regular exercise supports cardiovascular function and what types of activity are most beneficial.',
    category: 'Exercise',
    read_time: 4,
    icon: '🏃',
    content: `Regular physical activity strengthens the heart muscle, helps maintain a healthy weight, and supports healthy blood pressure and cholesterol levels. Major health organisations recommend at least 150 minutes of moderate-intensity aerobic activity per week for most adults. Activities such as brisk walking, cycling, swimming, and dancing all count toward this goal. Resistance training twice a week provides additional cardiovascular and metabolic benefits.`,
  },
  {
    id: '4',
    title: 'Understanding BMI and Heart Health',
    summary: 'What body mass index measures, its limitations, and why it remains a widely used cardiovascular indicator.',
    category: 'Weight',
    read_time: 3,
    icon: '⚖️',
    content: `Body Mass Index (BMI) is calculated by dividing weight in kilograms by the square of height in metres. It provides a general classification of body weight relative to height. While BMI does not distinguish between muscle and fat mass, it remains a commonly used screening tool. A BMI between 18.5 and 24.9 is generally considered within the normal range. Excess weight can increase the heart's workload and is associated with higher blood pressure, cholesterol, and blood glucose levels.`,
  },
  {
    id: '5',
    title: 'Smoking and Cardiovascular Risk',
    summary: 'How smoking damages the cardiovascular system and the health benefits that begin after quitting.',
    category: 'Smoking',
    read_time: 4,
    icon: '🚭',
    content: `Smoking damages the lining of blood vessels, reduces oxygen in the blood, and raises blood pressure and heart rate. It is one of the strongest modifiable risk factors for cardiovascular disease. The good news is that cardiovascular risk begins to decrease within hours of stopping smoking. Within a year, the risk of coronary heart disease drops substantially. Support programmes, nicotine replacement therapies, and prescription medications can all improve quit rates.`,
  },
  {
    id: '6',
    title: 'Blood Glucose and the Heart',
    summary: 'The connection between elevated blood glucose, diabetes, and cardiovascular disease risk.',
    category: 'Glucose',
    read_time: 4,
    icon: '🩸',
    content: `Elevated blood glucose over time can damage blood vessels and nerves, increasing the risk of cardiovascular complications. People with type 2 diabetes have a significantly higher risk of heart disease. Maintaining healthy blood glucose levels through diet, physical activity, and — where prescribed — medication, is an important part of cardiovascular risk management. Regular screening for prediabetes and diabetes is recommended for adults with additional risk factors.`,
  },
  {
    id: '7',
    title: 'Heart-Healthy Nutrition Principles',
    summary: 'Evidence-based dietary patterns that support cardiovascular health, based on current nutritional research.',
    category: 'Nutrition',
    read_time: 5,
    icon: '🥗',
    content: `A heart-healthy diet emphasises vegetables, fruits, whole grains, legumes, nuts, and lean proteins. Limiting ultra-processed foods, added sugars, excessive sodium, and saturated fats supports healthier blood pressure and cholesterol levels. Dietary patterns such as the Mediterranean diet have strong evidence for cardiovascular benefit. Small, consistent changes — such as replacing refined carbohydrates with whole grains or cooking with olive oil — can have meaningful long-term effects.`,
  },
  {
    id: '8',
    title: 'Stress, Sleep, and Your Heart',
    summary: 'How chronic stress and poor sleep quality contribute to cardiovascular risk, and practical strategies to address them.',
    category: 'Stress',
    read_time: 4,
    icon: '😴',
    content: `Chronic stress activates the body's stress response, raising heart rate and blood pressure over time. Poor sleep — both insufficient duration and poor quality — is associated with higher blood pressure, inflammation, and metabolic changes linked to cardiovascular disease. Strategies such as regular physical activity, mindfulness practices, good sleep hygiene, and — when needed — professional support can help manage both stress and sleep quality. Adults generally need 7–9 hours of sleep per night.`,
  },
  {
    id: '9',
    title: 'Alcohol and Cardiovascular Health',
    summary: 'What the evidence says about alcohol consumption and heart health, including current guidance.',
    category: 'Alcohol',
    read_time: 3,
    icon: '🍷',
    content: `The relationship between alcohol and heart health is complex. Some older research suggested moderate alcohol consumption was associated with lower cardiovascular risk, but more recent evidence questions this interpretation. Heavy alcohol use is clearly associated with elevated blood pressure, irregular heart rhythms (atrial fibrillation), and other cardiovascular complications. Current health guidance generally recommends limiting alcohol intake, and many people choose to avoid it entirely.`,
  },
  {
    id: '10',
    title: 'Age as a Cardiovascular Risk Factor',
    summary: 'How the ageing process affects the cardiovascular system and what proactive steps can make a meaningful difference.',
    category: 'Heart Health',
    read_time: 3,
    icon: '📅',
    content: `Cardiovascular risk increases with age. As we age, blood vessels naturally become less elastic, blood pressure tends to rise, and the risk of plaque accumulation increases. Men generally face elevated cardiovascular risk earlier than women, though women's risk increases significantly after menopause. While age cannot be changed, it highlights the importance of regular health monitoring and proactive lifestyle habits at every stage of life.`,
  },
  {
    id: '11',
    title: 'Understanding Cardiovascular Screening',
    summary: 'What regular cardiovascular screening involves and why it matters for early awareness.',
    category: 'Heart Health',
    read_time: 4,
    icon: '🏥',
    content: `Cardiovascular screening typically includes blood pressure measurement, cholesterol testing, blood glucose testing, BMI calculation, and a review of lifestyle factors. These tests can identify elevated risk before symptoms develop. Many cardiovascular conditions develop gradually and may not cause noticeable symptoms until they are advanced. Regular screening — typically every 1–5 years depending on age and risk factors — allows for early awareness and the opportunity to take preventive action.`,
  },
  {
    id: '12',
    title: 'Managing Multiple Risk Factors Together',
    summary: 'Why addressing several cardiovascular risk factors simultaneously is more effective than tackling them one at a time.',
    category: 'Heart Health',
    read_time: 5,
    icon: '🎯',
    content: `Cardiovascular risk factors do not act in isolation — they interact and amplify each other's effects. For example, someone who smokes and has elevated blood pressure and cholesterol faces a risk substantially higher than the sum of each individual factor. This is why a comprehensive approach — addressing diet, activity, smoking, stress, and medical management together — is more effective than focusing on any single factor. Healthcare providers use tools such as risk calculators to assess combined risk and prioritise interventions.`,
  },
  {
    id: '13', title: 'How to Track Blood Pressure at Home', category: 'Blood Pressure', read_time: 4, icon: '🩺',
    summary: 'A practical guide to collecting home readings that are useful to discuss with your healthcare professional.',
    content: `Home monitoring can help show how blood pressure changes outside a clinic, but it does not replace professional care. An automatic upper-arm cuff is generally preferred. Follow the device instructions, sit quietly with your back supported and feet flat, keep your bare arm supported at heart level, and avoid talking during the measurement. Record the date, time, readings, and any relevant notes. Never change prescribed medication based only on home readings without speaking with a healthcare professional.`,
  },
  {
    id: '14', title: 'Sodium: Where It Hides in Everyday Food', category: 'Nutrition', read_time: 4, icon: '🧂',
    summary: 'Learn why sodium matters for blood pressure and how to spot frequent sources beyond the salt shaker.',
    content: `Most dietary sodium comes from packaged, restaurant, and prepared foods rather than salt added at the table. Breads, sauces, soups, snack foods, cured meats, and take-away meals can all contribute. Compare nutrition labels, choose lower-sodium options when available, and use herbs, spices, citrus, or vinegar to build flavour. If you have kidney disease, heart failure, or another condition that affects your diet, ask your clinician for advice tailored to you.`,
  },
  {
    id: '15', title: 'Family History and Heart Health', category: 'Heart Health', read_time: 3, icon: '👪',
    summary: 'Why knowing close relatives’ health history can make preventive conversations more useful.',
    content: `A family history of early heart disease, stroke, high cholesterol, diabetes, or high blood pressure can be important context for your healthcare professional. It does not mean that a condition is inevitable, but it can help guide when to check certain risk factors and how often to follow up. Ask close relatives about major diagnoses and the age at which they occurred, then share that information at routine health visits.`,
  },
  {
    id: '16', title: 'Break Up Long Periods of Sitting', category: 'Exercise', read_time: 3, icon: '🚶',
    summary: 'Small movement breaks can make an active day easier to build, especially for desk-based routines.',
    content: `Planned exercise is valuable, but daily movement matters too. If you spend much of the day seated, try adding short movement breaks: stand during a call, take a brief walk after a meal, or set a reminder to stretch and move regularly. Choose activities that fit your ability and routine so they are easier to repeat. If you have chest pain, unusual breathlessness, fainting, or a known heart condition, ask a healthcare professional which activity level is appropriate before starting or increasing an exercise programme.`,
  },
  {
    id: '17', title: 'Sleep Apnea: When to Start a Conversation', category: 'Sleep', read_time: 4, icon: '🌙',
    summary: 'Understand common signs of disrupted breathing during sleep and why they are worth discussing.',
    content: `Sleep apnea is a condition in which breathing repeatedly stops or becomes shallow during sleep. Loud habitual snoring, witnessed pauses in breathing, gasping at night, morning headaches, and daytime sleepiness can be possible signs, though only a qualified professional can diagnose the cause. If these symptoms apply to you, especially alongside high blood pressure or persistent fatigue, discuss them with a healthcare professional rather than trying to self-diagnose.`,
  },
  {
    id: '18', title: 'Preparing for a Heart-Health Check-up', category: 'Heart Health', read_time: 3, icon: '📋',
    summary: 'A short checklist to help you make the most of a routine preventive appointment.',
    content: `Bring a list of current medications, supplements, allergies, and questions. If you monitor blood pressure or glucose at home, bring recent readings and the name of the device you use. Note changes in activity, sleep, smoking, alcohol use, or family history. Ask which tests are appropriate for your age, history, and current health. Seek urgent care for severe or sudden symptoms rather than waiting for a scheduled visit.`,
  },
  {
    id: '19', title: 'Recognising When Symptoms Need Urgent Care', category: 'Heart Health', read_time: 3, icon: '⚠️',
    summary: 'Know the difference between everyday health education and signs that should be assessed immediately.',
    content: `Educational tools and articles cannot assess urgent symptoms. Seek emergency help right away for chest pressure or pain, sudden shortness of breath, fainting, weakness or numbness on one side of the body, trouble speaking, or symptoms that feel severe or rapidly worsen. Symptoms can vary between people. When in doubt, use local emergency services or seek urgent medical care.`,
  },
  {
    id: '20', title: 'Small Habits That Support a Healthier Routine', category: 'Heart Health', read_time: 4, icon: '✨',
    summary: 'Make heart-health changes feel manageable by building around repeatable daily cues.',
    content: `Lasting behaviour change usually starts small. Choose one specific habit, connect it to an existing routine, and make it easy to track. For example, take a ten-minute walk after lunch, prepare vegetables before a busy week, or set a regular wind-down reminder before bed. Review what worked after a week and adjust rather than aiming for perfection. A personalised plan from a qualified clinician or dietitian may be helpful when you are managing medical conditions or taking medication.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Recommendations (shown when backend doesn't return any)
// ─────────────────────────────────────────────────────────────────────────────
export const GENERAL_RECOMMENDATIONS = [
  {
    id: '1',
    icon: '🏃',
    title: 'Stay Physically Active',
    description: 'Aim for at least 150 minutes of moderate-intensity aerobic activity per week. Regular movement supports cardiovascular function and helps maintain a healthy weight.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: '2',
    icon: '🩺',
    title: 'Monitor Your Blood Pressure',
    description: 'Regular blood pressure monitoring helps you and your healthcare provider track changes over time. Home monitors are widely available and easy to use.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: '3',
    icon: '⚖️',
    title: 'Maintain a Healthy Weight',
    description: 'A BMI within the normal range reduces the strain on your heart and blood vessels. Gradual, sustainable changes to diet and activity are more effective than rapid weight loss.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: '4',
    icon: '🥗',
    title: 'Follow a Balanced Diet',
    description: 'Prioritise vegetables, fruits, whole grains, and lean proteins. Reduce ultra-processed foods, added sugars, and excessive sodium to support cardiovascular health.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: '5',
    icon: '🚭',
    title: 'Avoid Smoking',
    description: 'Smoking is one of the most significant modifiable cardiovascular risk factors. Quitting at any age has measurable health benefits, and support is available.',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: '6',
    icon: '🍷',
    title: 'Limit Alcohol Intake',
    description: 'Heavy alcohol use is associated with elevated blood pressure and irregular heart rhythms. Current guidance recommends limiting alcohol consumption.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: '7',
    icon: '🏥',
    title: 'Schedule Regular Check-ups',
    description: 'Regular health screenings allow for early awareness of changes in blood pressure, cholesterol, glucose, and other cardiovascular indicators. Discuss your risk factors with a healthcare provider.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: '8',
    icon: '😴',
    title: 'Prioritise Quality Sleep',
    description: 'Adults generally need 7–9 hours of sleep per night. Poor sleep quality is associated with higher cardiovascular risk through effects on blood pressure and metabolic health.',
    color: 'from-violet-500 to-purple-600',
  },
];
