import { Heart, Activity, Apple, Zap, Scale, HeartPulse, CigaretteOff, Wine } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import GlassCard from '../components/common/GlassCard';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

const RISK_FACTORS = [
  { icon: <HeartPulse />, title: 'High Blood Pressure', desc: 'Forces the heart to work harder, thickening the heart muscle and increasing the risk of attack or stroke.' },
  { icon: <Activity />, title: 'High Cholesterol', desc: 'Can lead to plaque build-up in arteries, narrowing them and reducing blood flow to the heart.' },
  { icon: <Scale />, title: 'Excess Weight', desc: 'Increases the strain on the heart and is linked to higher blood pressure and blood glucose.' },
  { icon: <CigaretteOff />, title: 'Smoking', desc: 'Damages blood vessels, decreases oxygen to the heart, and promotes clot formation.' },
  { icon: <Zap />, title: 'High Blood Glucose', desc: 'Over time, elevated sugar levels damage blood vessels and nerves that control the heart.' },
];

const HABITS = [
  { icon: <Apple />, title: 'Balanced Diet', desc: 'Focus on fruits, vegetables, whole grains, and lean proteins. Limit saturated fats and excess sodium.' },
  { icon: <Activity />, title: 'Regular Exercise', desc: 'Aim for at least 150 minutes of moderate aerobic activity per week to strengthen the heart.' },
  { icon: <Wine />, title: 'Limit Alcohol', desc: 'Heavy drinking can increase blood pressure and lead to heart failure or stroke.' },
];

export default function HeartHealth() {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-navy-950">
      
      {/* Intro */}
      <section className="section-padding">
        <div className="container-max max-w-4xl text-center">
          <SectionHeader
            badge="Education"
            title="Understanding Heart Health"
            subtitle="Cardiovascular disease is a broad term for conditions affecting the heart and blood vessels. While some factors like age and genetics cannot be changed, many others are within your control."
            centered
          />
        </div>
      </section>

      {/* Common Risk Factors */}
      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-max">
          <SectionHeader title="Common Risk Factors" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RISK_FACTORS.map((factor, i) => (
              <GlassCard key={i} hover className="bg-white dark:bg-navy-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 shrink-0">
                  {factor.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{factor.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{factor.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Habits */}
      <section className="section-padding">
        <div className="container-max">
          <SectionHeader title="Heart-Healthy Habits" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HABITS.map((habit, i) => (
              <GlassCard key={i} gradient className="bg-white dark:bg-navy-900 border-gray-100 dark:border-navy-700 text-center flex flex-col items-center p-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white mb-6 shadow-lg">
                  {habit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{habit.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{habit.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="section-padding bg-blue-50 dark:bg-navy-900">
        <div className="container-max max-w-3xl">
          <div className="bg-white dark:bg-navy-800 rounded-3xl p-8 md:p-12 shadow-xl text-center border border-gray-100 dark:border-navy-700">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">When to Seek Medical Help</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-8">
              Seek immediate medical attention if you experience chest pain, shortness of breath, pain radiating to your arm or jaw, sudden dizziness, or extreme fatigue. These could be signs of a medical emergency.
            </p>
            <MedicalDisclaimer />
          </div>
        </div>
      </section>

    </div>
  );
}
