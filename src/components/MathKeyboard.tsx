import React from "react";

interface MathKeyboardProps {
  onSymbolClick: (symbol: string) => void;
  onBackspace?: () => void;
  onClear?: () => void;
}

export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  onSymbolClick,
  onBackspace,
  onClear,
}) => {
  const symbolKeys = [
    { label: "x", value: "x" },
    { label: "x\u00b2", value: "^2" },
    { label: "x\u207f", value: "^{" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: "\u221a", value: "\\sqrt{" },
    { label: "\u03c0", value: "\\pi" },
    { label: "e", value: "e" },
    { label: "}", value: "}" },
  ];

  const operatorKeys = [
    { label: "+", value: "+" },
    { label: "\u2212", value: "-" },
    { label: "\u00d7", value: "*" },
    { label: "\u00f7", value: "/" },
    { label: "=", value: "=" },
    { label: "<", value: "<" },
    { label: ">", value: ">" },
    { label: "ou", value: " ou " },
  ];

  const numberKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  const baseBtn = "h-14 rounded-2xl font-bold text-lg active:scale-90 transition-all duration-75 flex items-center justify-center select-none shadow-md";

  return (
    <div className="bg-[#1a1a22] border border-[#32323f] rounded-3xl p-4 mt-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-[10px] text-[#8888a8] font-bold uppercase tracking-widest opacity-60">
          Clavier Math\u00e9matique
        </span>
        <div className="flex gap-3">
          {onClear && (
            <button onClick={onClear} className="text-[10px] text-rose-400 font-bold uppercase px-3 py-1.5 bg-rose-500/10 rounded-xl border border-rose-500/20 active:bg-rose-500/20">
              Effacer
            </button>
          )}
          {onBackspace && (
            <button onClick={onBackspace} className="text-[#ededf5] bg-[#32323f] px-4 py-1.5 rounded-xl active:bg-[#484860] transition-colors shadow-inner font-mono text-sm">
              \u232b
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-3 grid grid-cols-3 gap-2">
          {symbolKeys.map((k, i) => (
            <button key={`sym-${i}`} onClick={() => onSymbolClick(k.value)} className={`${baseBtn} bg-[#252530] text-[#f0c040] border border-amber-500/10 hover:border-amber-500/30`}>
              {k.label}
            </button>
          ))}
        </div>

        <div className="col-span-3 grid grid-cols-2 gap-2">
          {operatorKeys.map((k, i) => (
            <button key={`op-${i}`} onClick={() => onSymbolClick(k.value)} className={`${baseBtn} bg-[#252530] text-white border border-white/5`}>
              {k.label}
            </button>
          ))}
        </div>

        <div className="col-span-4 grid grid-cols-3 gap-2">
          {numberKeys.map((n) => (
            <button key={`num-${n}`} onClick={() => onSymbolClick(n)} className={`${baseBtn} bg-[#32323f] text-white text-xl`}>
              {n}
            </button>
          ))}
          <button onClick={() => onSymbolClick("0")} className={`${baseBtn} col-span-2 bg-[#32323f] text-white text-xl`}>0</button>
          <button onClick={() => onSymbolClick(".")} className={`${baseBtn} bg-[#32323f] text-white text-xl`}>.</button>
        </div>
      </div>
    </div>
  );
};
