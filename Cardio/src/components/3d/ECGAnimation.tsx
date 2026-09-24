interface ECGAnimationProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number;
  speed?: number;
}

export default function ECGAnimation({
  className = '',
  color = '#22d3ee',
  width = '100%',
  height = 60,
}: ECGAnimationProps) {
  // ECG path: flat line → spike → return
  const ecgPath = `M0,30 L40,30 L50,30 L55,5 L60,55 L65,15 L70,30 L120,30 L130,30 L135,30 L140,5 L145,55 L150,15 L155,30 L200,30`;

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 200 ${height}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="30%" stopColor={color} stopOpacity="1" />
            <stop offset="70%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="ecg-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background dim line */}
        <path
          d={ecgPath}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.15"
        />

        {/* Animated bright line */}
        <path
          d={ecgPath}
          fill="none"
          stroke="url(#ecg-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecg-glow)"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: 600,
            animation: 'ecg-draw 3s linear infinite',
          }}
        />

        <style>{`
          @keyframes ecg-draw {
            0%   { stroke-dashoffset: 600; opacity: 0; }
            5%   { opacity: 1; }
            85%  { opacity: 1; }
            100% { stroke-dashoffset: -600; opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}
