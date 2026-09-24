import { useEffect, useRef } from 'react';

interface RiskGaugeProps {
  probability?: number; // 0.0 – 1.0
  riskLevel?: string;
  size?: number;
  className?: string;
}

export default function RiskGauge({ probability, riskLevel, size = 220, className = '' }: RiskGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const currentAngle = useRef(0);

  const pct = probability !== undefined ? Math.min(Math.max(probability, 0), 1) : null;
  const isHighRisk = pct !== null ? pct > 0.5 : riskLevel?.toLowerCase().includes('high');

  // Color stops for gauge arc
  function getColor(p: number): string {
    if (p < 0.35) return '#10b981';
    if (p < 0.6) return '#f59e0b';
    return '#ef4444';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const s = size;
    canvas.width = s * dpr;
    canvas.height = s * dpr;
    canvas.style.width = `${s}px`;
    canvas.style.height = `${s}px`;
    ctx.scale(dpr, dpr);

    const cx = s / 2;
    const cy = s / 2 + 15;
    const r = s * 0.38;
    const startAngle = Math.PI * 0.75;
    const totalArc = Math.PI * 1.5;

    const targetAngle = pct !== null ? startAngle + totalArc * pct : startAngle + totalArc * 0.5;
    currentAngle.current = startAngle;

    let start: number | null = null;
    const duration = 1400;

    function draw(progress: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, s, s);

      // Track background arc
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + totalArc);
      ctx.strokeStyle = 'rgba(148,163,184,0.15)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Value arc — gradient color
      const endA = startAngle + totalArc * progress;
      const gradient = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.5, '#f59e0b');
      gradient.addColorStop(1, '#ef4444');

      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endA);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glow on tip
      const tipX = cx + r * Math.cos(endA);
      const tipY = cy + r * Math.sin(endA);
      const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 18);
      glow.addColorStop(0, getColor(pct ?? 0.5));
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(tipX, tipY, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Center text
      if (pct !== null) {
        ctx.textAlign = 'center';
        ctx.fillStyle = getColor(pct);
        ctx.font = `bold ${Math.round(s * 0.17)}px Manrope, Inter, sans-serif`;
        ctx.fillText(`${Math.round(pct * 100)}%`, cx, cy - 6);

        ctx.fillStyle = 'rgba(148,163,184,0.9)';
        ctx.font = `${Math.round(s * 0.065)}px Inter, sans-serif`;
        ctx.fillText('Estimated Risk', cx, cy + 18);
      } else {
        ctx.textAlign = 'center';
        ctx.fillStyle = isHighRisk ? '#ef4444' : '#10b981';
        ctx.font = `bold ${Math.round(s * 0.1)}px Manrope, Inter, sans-serif`;
        ctx.fillText(riskLevel ?? '—', cx, cy + 8);
      }

      // Tick marks
      for (let i = 0; i <= 10; i++) {
        const a = startAngle + (totalArc * i) / 10;
        const inner = r - 14;
        const outer = r - 22;
        ctx.beginPath();
        ctx.moveTo(cx + inner * Math.cos(a), cy + inner * Math.sin(a));
        ctx.lineTo(cx + outer * Math.cos(a), cy + outer * Math.sin(a));
        ctx.strokeStyle = 'rgba(148,163,184,0.3)';
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.stroke();
      }
    }

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      draw(pct !== null ? pct * eased : 0.5 * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [probability, riskLevel, size]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <canvas ref={canvasRef} aria-label={`Risk gauge: ${pct !== null ? Math.round(pct * 100) + '%' : riskLevel}`} />
      {pct !== null && (
        <div className={`mt-1 text-sm font-semibold ${isHighRisk ? 'text-red-500' : 'text-emerald-500'}`}>
          {isHighRisk ? 'Higher Estimated Risk' : 'Lower Estimated Risk'}
        </div>
      )}
    </div>
  );
}
