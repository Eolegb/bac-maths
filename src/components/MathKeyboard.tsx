import React from "react";

interface MathKeyboardProps {
  onSymbolClick: (symbol: string) => void;
}

export const MathKeyboard: React.FC<MathKeyboardProps> = ({ onSymbolClick }) => {
  const keyGroups = [
    {
      name: "Variables",
      keys: [
        { label: "x", value: "x" },
        { label: "y", value: "y" },
        { label: "z", value: "z" },
        { label: "π", value: "\\pi" },
        { label: "e", value: "e" },
      ]
    },
    {
      name: "Opérateurs",
      keys: [
        { label: "+", value: "+" },
        { label: "-", value: "-" },
        { label: "×", value: "\\times" },
        { label: "÷", value: "\\div" },
        { label: "=", value: "=" },
      ]
    },
    {
      name: "Comparaisons",
      keys: [
        { label: "<", value: "<" },
        { label: ">", value: ">" },
        { label: "≤", value: "\\leq" },
        { label: "≥", value: "\\geq" },
        { label: "≠", value: "\\neq" },
      ]
    },
    {
      name: "Puissances & Racines",
      keys: [
        { label: "x²", value: "x^2" },
        { label: "x³", value: "x^3" },
        { label: "²", value: "^2" },
        { label: "√", value: "\\sqrt{}" },
        { label: "ⁿ", value: "^{n}" },
      ]
    },
    {
      name: "Fractions & Parenthèses",
      keys: [
        { label: "/", value: "/" },
        { label: "(", value: "(" },
        { label: ")", value: ")" },
        { label: "[", value: "[" },
        { label: "]", value: "]" },
      ]
    },
    {
      name: "Fonctions",
      keys: [
        { label: "sin", value: "\\sin" },
        { label: "cos", value: "\\cos" },
        { label: "tan", value: "\\tan" },
        { label: "ln", value: "\\ln" },
        { label: "log", value: "\\log" },
      ]
    },
    {
      name: "Logique",
      keys: [
        { label: "et", value: " et " },
        { label: "ou", value: " ou " },
        { label: "¬", value: "\\neg " },
        { label: "∈", value: "\\in " },
        { label: "∉", value: "\\notin " },
      ]
    },
  ];

  return (
    <div className="space-y-2 pt-2">
      <span className="text-[10px] text-[#8888a8] w-full mb-2 block font-mono uppercase">Clavier mathématique :</span>
      
      <div className="grid grid-cols-5 gap-1.5 md:gap-2">
        {keyGroups.map((group) => (
          <React.Fragment key={group.name}>
            {group.keys.map((key) => (
              <button
                key={`${group.name}-${key.label}`}
                onClick={() => onSymbolClick(key.value)}
                title={`Insérer ${key.label}`}
                className="bg-[#1a1a22] hover:bg-[#252530] border border-[#32323f] hover:border-[#f0c040] text-[#ededf5] text-xs font-mono font-medium py-2 px-2 rounded-lg active:scale-95 transition-all duration-150"
              >
                {key.label}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Quick spacer note */}
      <div className="text-[9px] text-[#484860] mt-2 px-1">
        💡 Appuyez sur un bouton pour insérer le symbole à votre position actuelle
      </div>
    </div>
  );
};
