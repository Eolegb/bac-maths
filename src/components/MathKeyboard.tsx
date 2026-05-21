import React from "react";

interface MathKeyboardProps {
  onSymbolClick: (symbol: string) => void;
  onBackspace?: () => void;
  onClear?: () => void;
}

/**
 * Clavier mathématique optimisé pour iPhone.
 *
 * Disposition en 3 colonnes :
 *  ┌────────────┬────────────┬────────┐
 *  │  Symboles  │ Opérateurs │ Pavé   │
 *  │ (x, x², …) │  + - = …   │ numér. │
 *  └────────────┴────────────┴────────┘
 *
 * Pensé pour qu'on puisse taper rapidement des expressions
 * du type "3x^2 + 2x - 5 = 0", "(x+1)(x-3)", "x < 4 ou x > 7", etc.
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  onSymbolClick,
  onBackspace,
  onClear,
}) => {
  // Colonne 1 : variables & expressions courantes
  const symbolKeys: { label: React.ReactNode; value: string }[] = [
    { label: "x", value: "x" },
    {
      label: (
        <>
          x<sup>2</sup>
        </>
      ),
      value: "x^2",
    },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: "√", value: "\\sqrt{}" },
    { label: "π", value: "\\pi" },
    { label: "ou", value: " ou " },
    { label: "et", value: " et " },
  ];

  // Colonne 2 : opérateurs et comparaisons
  const operatorKeys: { label: string; value: string }[] = [
    { label: "+", value: "+" },
    { label: "−", value: "-" },
    { label: "×", value: "*" },
    { label: "÷", value: "/" },
    { label: "=", value: "=" },
    { label: "<", value: "<" },
    { label: ">", value: ">" },
    { label: ",", value: "," },
  ];

  // Colonne 3 : pavé numérique (style iPhone)
  const numberKeys: string[] = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  const baseBtn =
    "h-11 rounded-xl font-mono font-semibold text-base active:scale-95 transition-all duration-100 flex items-center justify-center select-none";

  return (
    <div className="bg-[#0c0c0f] border border-[#252530] rounded-2xl p-2.5 mt-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider">
          Clavier maths
        </span>
        <div className="flex gap-1.5">
          {onClear && (
            <button
              onClick={onClear}
              className="text-[10px] text-[#8888a8] hover:text-rose-400 px-2 py-0.5 rounded transition-colors"
            >
              Effacer
            </button>
          )}
          {onBackspace && (
            <button
              onClick={onBackspace}
              aria-label="Supprimer"
              className="text-[#8888a8] hover:text-white bg-[#1a1a22] border border-[#32323f] rounded-lg px-2 py-0.5 active:scale-95 transition-all text-xs font-mono"
            >
              ⌫
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-9 gap-1.5">
        {/* ── Colonne 1 : Symboles (3 col) ── */}
        <div className="col-span-3 grid grid-cols-2 gap-1.5">
          {symbolKeys.map((k, i) => (
            <button
              key={`sym-${i}`}
              onClick={() => onSymbolClick(k.value)}
              className={`${baseBtn} bg-[#1a1a22] hover:bg-[#252530] border border-[#32323f] text-[#f0c040]`}
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* ── Colonne 2 : Opérateurs (2 col) ── */}
        <div className="col-span-2 grid grid-cols-2 gap-1.5">
          {operatorKeys.map((k, i) => (
            <button
              key={`op-${i}`}
              onClick={() => onSymbolClick(k.value)}
              className={`${baseBtn} bg-[#1a1a22] hover:bg-[#252530] border border-[#32323f] text-white`}
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* ── Colonne 3 : Pavé numérique (4 col) ── */}
        <div className="col-span-4 grid grid-cols-3 gap-1.5">
          {numberKeys.map((n) => (
            <button
              key={`num-${n}`}
              onClick={() => onSymbolClick(n)}
              className={`${baseBtn} bg-[#1f1f2a] hover:bg-[#2a2a38] border border-[#3a3a4a] text-white text-lg`}
            >
              {n}
            </button>
          ))}
          {/* Dernière ligne : 0 plus large + virgule décimale */}
          <button
            onClick={() => onSymbolClick("0")}
            className={`${baseBtn} col-span-2 bg-[#1f1f2a] hover:bg-[#2a2a38] border border-[#3a3a4a] text-white text-lg`}
          >
            0
          </button>
          <button
            onClick={() => onSymbolClick(".")}
            className={`${baseBtn} bg-[#1f1f2a] hover:bg-[#2a2a38] border border-[#3a3a4a] text-white text-lg`}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};
