import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import type {
  ModelPredictions,
  ModelPredictionDetail,
} from '../../types';

interface ModelPredictionsPanelProps {
  data?: ModelPredictions;
  models?: Record<string, ModelPredictionDetail | undefined>;
  className?: string;
}

const MODEL_META = [
  {
    key: 'logistic_regression' as const,
    label: 'Logistic Regression',
    icon: '📈',
    description:
      'Linear boundary classifier — primary baseline model.',
    bgLight: 'bg-blue-50 dark:bg-blue-900/20',
    border:
      'border-blue-200 dark:border-blue-700/50',
    text:
      'text-blue-700 dark:text-blue-300',
    bar:
      'bg-gradient-to-r from-blue-400 to-blue-600',
  },
  {
    key: 'knn' as const,
    label: 'K-Nearest Neighbors',
    icon: '🔵',
    description:
      'Instance-based learner — compares to similar health profiles.',
    bgLight: 'bg-teal-50 dark:bg-teal-900/20',
    border:
      'border-teal-200 dark:border-teal-700/50',
    text:
      'text-teal-700 dark:text-teal-300',
    bar:
      'bg-gradient-to-r from-teal-400 to-teal-600',
  },
  {
    key: 'naive_bayes' as const,
    label: 'Naïve Bayes',
    icon: '🧮',
    description:
      'Probabilistic model — uses feature independence assumption.',
    bgLight: 'bg-purple-50 dark:bg-purple-900/20',
    border:
      'border-purple-200 dark:border-purple-700/50',
    text:
      'text-purple-700 dark:text-purple-300',
    bar:
      'bg-gradient-to-r from-purple-400 to-purple-600',
  },
  {
    key: 'decision_tree' as const,
    label: 'Decision Tree',
    icon: '🌳',
    description:
      'Rule-based model — traces decision paths through metrics.',
    bgLight: 'bg-amber-50 dark:bg-amber-900/20',
    border:
      'border-amber-200 dark:border-amber-700/50',
    text:
      'text-amber-700 dark:text-amber-300',
    bar:
      'bg-gradient-to-r from-amber-400 to-orange-500',
  },
];

export default function ModelPredictionsPanel({
  data,
  models,
  className = '',
}: ModelPredictionsPanelProps) {
  // Controls whether the detailed model analysis is visible.
  const [showAnalysis, setShowAnalysis] = useState(false);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut' as const,
      },
    },
  };

  // Check whether at least one model has data.
  const hasModelData = MODEL_META.some((model) => {
    const detail = models
      ? models[model.key]
      : undefined;

    const rawProba =
      detail?.probability ??
      (data
        ? data[model.key as keyof ModelPredictions]
        : undefined);

    return (
      rawProba !== undefined ||
      detail !== undefined
    );
  });

  if (!hasModelData) {
    return null;
  }

  return (
    <div className={`w-full min-w-0 ${className}`}>
      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 dark:text-slate-500 italic leading-relaxed">
          Each model independently assessed your clinical metrics.
          Results reflect algorithm predictions and calibrated
          confidence percentages.
          <strong className="text-gray-500 dark:text-slate-400">
            {' '}
            This is not a medical diagnosis.
          </strong>
        </p>
      </div>

      {/* =========================================================
          VIEW / HIDE MODEL ANALYSIS BUTTON
      ========================================================= */}
      <div className="flex justify-center mb-5">
        <button
          type="button"
          onClick={() =>
            setShowAnalysis((previous) => !previous)
          }
          aria-expanded={showAnalysis}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            w-full
            sm:w-auto
            min-h-[46px]
            px-5
            py-2.5
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            active:bg-blue-800
            text-white
            text-sm
            font-semibold
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
            touch-manipulation
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            dark:focus:ring-offset-navy-900
          "
        >
          <span
            className={`
              inline-flex
              transition-transform
              duration-300
              ${showAnalysis ? 'rotate-180' : ''}
            `}
          >
            ▼
          </span>

          {showAnalysis
            ? 'Hide Model Analysis'
            : 'View Model Analysis'}
        </button>
      </div>

      {/* =========================================================
          MODEL ANALYSIS
          Hidden until the user clicks the button.
      ========================================================= */}
      <motion.div
        initial={false}
        animate={{
          height: showAnalysis ? 'auto' : 0,
          opacity: showAnalysis ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: 'easeInOut',
        }}
        className="overflow-hidden"
      >
        <div className="pt-1">

          {/* =====================================================
              QUICK SUMMARY
          ===================================================== */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
            {MODEL_META.map((model) => {
              const detail = models
                ? models[model.key]
                : undefined;

              const rawProba =
                detail?.probability ??
                (data
                  ? data[
                      model.key as keyof ModelPredictions
                    ]
                  : undefined);

              if (
                rawProba === undefined &&
                detail === undefined
              ) {
                return null;
              }

              const isRisk = detail
                ? detail.risk === 'YES'
                : (rawProba ?? 0) >= 0.5;

              const riskText =
                detail?.risk ??
                (isRisk ? 'YES' : 'NO');

              return (
                <div
                  key={`summary-${model.key}`}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-2
                    p-3
                    rounded-xl
                    bg-gray-50
                    dark:bg-navy-800/80
                    border
                    border-gray-200
                    dark:border-navy-700
                    shadow-sm
                    min-w-0
                  "
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="text-sm shrink-0"
                      aria-hidden="true"
                    >
                      {model.icon}
                    </span>

                    <span
                      className="
                        font-semibold
                        text-xs
                        text-gray-800
                        dark:text-slate-200
                        truncate
                      "
                    >
                      {model.label}
                    </span>
                  </div>

                  <span
                    className={`
                      font-black
                      text-xs
                      px-2.5
                      py-0.5
                      rounded-full
                      shrink-0
                      ${
                        riskText === 'YES'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 border border-red-200 dark:border-red-700/50'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50'
                      }
                    `}
                  >
                    → {riskText}
                  </span>
                </div>
              );
            })}
          </div>

          {/* =====================================================
              FOUR MODEL CARDS
          ===================================================== */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              sm:gap-4
              min-w-0
            "
          >
            {MODEL_META.map((model) => {
              const detail = models
                ? models[model.key]
                : undefined;

              const rawProba =
                detail?.probability ??
                (data
                  ? data[
                      model.key as keyof ModelPredictions
                    ]
                  : undefined);

              if (
                rawProba === undefined &&
                detail === undefined
              ) {
                return null;
              }

              const probVal =
                rawProba !== undefined
                  ? rawProba
                  : 0;

              const pct =
                detail?.percentage !== undefined
                  ? detail.percentage
                  : Math.round(probVal * 100);

              const isRisk = detail
                ? detail.risk === 'YES'
                : probVal >= 0.5;

              const riskBadgeText =
                detail?.risk ??
                (isRisk ? 'YES' : 'NO');

              const accuracyStr =
                detail?.accuracy_percentage;

              return (
                <motion.div
                  key={model.key}
                  variants={item}
                  className={`
                    w-full
                    min-w-0
                    rounded-2xl
                    border
                    p-4
                    sm:p-5
                    ${model.bgLight}
                    ${model.border}
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    group
                    overflow-hidden
                  `}
                >
                  {/* =================================================
                      MODEL HEADER
                  ================================================= */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                      mb-4
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-2
                        min-w-0
                      "
                    >
                      <span
                        className="
                          text-2xl
                          shrink-0
                        "
                        aria-hidden="true"
                      >
                        {model.icon}
                      </span>

                      <div className="min-w-0">
                        <div
                          className={`
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            ${model.text}
                            break-words
                          `}
                        >
                          {model.label}
                        </div>

                        <div
                          className="
                            text-xs
                            text-gray-400
                            dark:text-slate-500
                            mt-0.5
                            leading-relaxed
                            break-words
                          "
                        >
                          {model.description}
                        </div>
                      </div>
                    </div>

                    {/* YES / NO */}
                    <span
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        self-start
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        uppercase
                        shrink-0
                        ${
                          isRisk
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-700/50'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50'
                        }
                      `}
                    >
                      {isRisk
                        ? '⚠️ YES'
                        : '✅ NO'}
                    </span>
                  </div>

                  {/* =================================================
                      PERCENTAGE + ACCURACY
                  ================================================= */}
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      mb-3
                    "
                  >
                    <div
                      className="
                        flex
                        items-baseline
                        justify-between
                        gap-3
                        flex-wrap
                      "
                    >
                      <div
                        className="
                          flex
                          items-baseline
                          gap-2
                          min-w-0
                        "
                      >
                        <motion.span
                          className={`
                            text-3xl
                            sm:text-4xl
                            font-bold
                            ${model.text}
                          `}
                          initial={{
                            opacity: 0,
                            scale: 0.6,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            delay: 0.2,
                            duration: 0.5,
                            ease: 'backOut',
                          }}
                        >
                          {pct}%
                        </motion.span>

                        <span
                          className="
                            text-xs
                            font-medium
                            text-gray-500
                            dark:text-slate-400
                          "
                        >
                          Risk Confidence
                        </span>
                      </div>

                      {accuracyStr && (
                        <span
                          className="
                            text-[11px]
                            font-semibold
                            text-slate-500
                            dark:text-slate-400
                            bg-white/60
                            dark:bg-navy-800/60
                            px-2
                            py-1
                            rounded
                            border
                            border-gray-200
                            dark:border-navy-700
                            shrink-0
                          "
                        >
                          Accuracy: {accuracyStr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      PROGRESS BAR
                  ================================================= */}
                  <div
                    className="
                      h-2.5
                      rounded-full
                      bg-gray-200
                      dark:bg-navy-700
                      overflow-hidden
                    "
                  >
                    <motion.div
                      className={`
                        h-full
                        rounded-full
                        ${model.bar}
                      `}
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${Math.min(
                          100,
                          Math.max(0, pct)
                        )}%`,
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut',
                        delay: 0.15,
                      }}
                    />
                  </div>

                  {/* =================================================
                      SCALE LABELS
                  ================================================= */}
                  <div
                    className="
                      flex
                      flex-wrap
                      justify-between
                      gap-1
                      mt-2
                      text-[10px]
                      sm:text-xs
                      text-gray-400
                      dark:text-slate-600
                    "
                  >
                    <span>0% (Low)</span>

                    <span>
                      Prediction:{' '}
                      <strong>
                        {riskBadgeText}
                      </strong>
                    </span>

                    <span>100% (High)</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}