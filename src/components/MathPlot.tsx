import React from "react";

interface MathPlotProps {
  type: "function" | "cercle" | "vector";
  data: any;
  className?: string;
}

export const MathPlot: React.FC<MathPlotProps> = ({ type, data, className = "" }) => {
  const width = 300;
  const height = 200;
  const padding = 20;

  // Helpers pour coordonées SVG
  const toX = (x: number, domain: [number, number]) => 
    padding + ((x - domain[0]) / (domain[1] - domain[0])) * (width - 2 * padding);
  const toY = (y: number, range: [number, number]) => 
    height - padding - ((y - range[0]) / (range[1] - range[0])) * (height - 2 * padding);

  if (type === "function") {
    const { fn, domain, range, points } = data;
    const steps = 50;
    const dx = (domain[1] - domain[0]) / steps;
    let path = "";
    
    for (let i = 0; i <= steps; i++) {
      const x = domain[0] + i * dx;
      const y = fn(x);
      const px = toX(x, domain);
      const py = toY(y, range);
      if (i === 0) path += `M ${px} ${py}`;
      else path += ` L ${px} ${py}`;
    }

    return (
      <div className={`bg-slate-950/40 rounded-2xl border border-slate-800 p-2 ${className}`}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Axes */}
          <line x1={toX(domain[0], domain)} y1={toY(0, range)} x2={toX(domain[1], domain)} y2={toY(0, range)} stroke="#334155" strokeWidth="1" />
          <line x1={toX(0, domain)} y1={toY(range[0], range)} x2={toX(0, domain)} y2={toY(range[1], range)} stroke="#334155" strokeWidth="1" />
          
          {/* Courbe */}
          <path d={path} fill="none" stroke="#f0c040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(240,192,64,0.4)]" />
          
          {/* Points spéciaux (ex: Sommet, racines) */}
          {points?.map((p: any, i: number) => (
            <circle key={i} cx={toX(p.x, domain)} cy={toY(p.y, range)} r="4" fill={p.color || "#3ecfa0"} />
          ))}
        </svg>
      </div>
    );
  }

  if (type === "cercle") {
    const angle = data.angle || 0; // en radians
    const cx = width / 2;
    const cy = height / 2;
    const r = 60;
    const targetX = cx + r * Math.cos(angle);
    const targetY = cy - r * Math.sin(angle);

    return (
      <div className={`bg-slate-950/40 rounded-2xl border border-slate-800 p-2 ${className}`}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="1" />
          <line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke="#334155" strokeWidth="0.5" />
          <line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke="#334155" strokeWidth="0.5" />
          
          {/* Angle ray */}
          <line x1={cx} y1={cy} x2={targetX} y2={targetY} stroke="#f0c040" strokeWidth="3" strokeLinecap="round" />
          <circle cx={targetX} cy={targetY} r="5" fill="#f0c040" className="animate-pulse" />
          
          {/* Arc */}
          <path d={`M ${cx + 20} ${cy} A 20 20 0 0 0 ${cx + 20 * Math.cos(angle)} ${cy - 20 * Math.sin(angle)}`} fill="none" stroke="#3ecfa0" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return null;
};
