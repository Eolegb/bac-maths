import React from "react";
import { Latex } from "./Latex";

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
    { label: "x^2", value: "^2" },
    { label: "x^n", value: "^" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: "\\sqrt{x}", value: "\\sqrt{" },
    { label: "\\pi", value: "\\pi" },
    { label: "\\text{ou}", value: " ou " },
  ];

  const operatorKeys = [
    { label: "+", value: "+" },
    { label: "-", value: "-" },
    { label: "\\times", value: "*" },
    { label: "\\div", value: "/" },
    { label: "=", value: "=" },
    { label: "<", value: "<" },
    { label: ">", value: ">" },
    { label: ",", value: "," },
  ];

  const numberKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  const baseBtn = "h-12 rounded-xl font-medium text-sm active:scale-95 transition-all duration-100 flex items-center justify-center select-none shadow-sm";

  return (
    <div className="bg-[#131318] border border-[#252530] rounded-2xl p-3 mt-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] text-[#8888a8] font-mono uppercase tracking-widest">
          Outils de calcul
        </span>
        <div className="flex gap-2">
          {onClear && (
            <button
              onClick={onClear}
              className="text-[10px] text-rose-400/80 hover:text-rose-400 font-bold uppercase tracking-tighter px-2 py-1 bg-rose-500/5 rounded-lg transition-colors border border-rose-500/10"
            >
              Effacer
            </button>
          )}
          {onBackspace && (
            <button
              onClick={onBackspace}
              className="text-[#8888a8] hover:text-white bg-[#1a1a22] border border-[#32323f] rounded-lg px-3 py-1 active:scale-95 transition-all text-xs"
            >
              ⌫
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {/* Symboles */}
        <div className="col-span-3 grid grid-cols-2 gap-1.5">
          {symbolKeys.map((k, i) => (
            <button
              key={`sym-${i}`}
              onClick={() => onSymbolClick(k.value)}
              className={`${baseBtn} bg-[#1a1a22] border border-[#32323f] text-[#f0c040] hover:bg-[#252530]`}
            >
              <Latex math={k.label} />
            </button>
          ))}
        </div>

        {/* Opérateurs */}
        <div className="col-span-3 grid grid-cols-2 gap-1.5">
          {operatorKeys.map((k, i) => (
            <button
              key={`op-${i}`}
              onClick={() => onSymbolClick(k.value)}
              className={`${baseBtn} bg-[#1a1a22] border border-[#32323f] text-white hover:bg-[#252530]`}
            >
              <Latex math={k.label} />
            </button>
          ))}
        </div>

        {/* Chiffres */}
        <div className="col-span-4 grid grid-cols-3 gap-1.5">
          {numberKeys.map((n) => (
            <button
              key={`num-${n}`}
              onClick={() => onSymbolClick(n)}
              className={`${baseBtn} bg-[#1f1f2a] border border-[#3a3a4a] text-white text-base hover:bg-[#2a2a38]`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => onSymbolClick("0")}
            className={`${baseBtn} col-span-2 bg-[#1f1f2a] border border-[#3a3a4a] text-white text-base hover:bg-[#2a2a38]`}
          >
            0
          </button>
          <button
            onClick={() => onSymbolClick(".")}
            className={`${baseBtn} bg-[#1f1f2a] border border-[#3a3a4a] text-white text-base hover:bg-[#2a2a38]`}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};
