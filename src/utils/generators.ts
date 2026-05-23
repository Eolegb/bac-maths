export interface MathProblem {
  eq: string;
  instr: string;
  ans: string;
  aliases?: string[];
  steps: string[];
  pourquoi: string;
  category: string;
  plot?: {
    type: "function" | "cercle" | "vector";
    data: any;
  };
}

export function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rndNZ(min: number, max: number): number {
  let val = 0;
  while (val === 0) val = rnd(min, max);
  return val;
}

export const GENERATORS: Record<number, {
  debutant: (() => MathProblem)[];
  intermediaire: (() => MathProblem)[];
}> = {
  // Module 0: Calculs
  0: {
    debutant: [
      () => {
        const a = rndNZ(-15, 15); const b = rndNZ(-15, 15);
        return {
          category: "Calcul de base",
          eq: `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la somme.",
          ans: String(a + b),
          steps: [`$${a} + ${b} = ${a + b}$`],
          pourquoi: "C'est l'addition fondamentale des nombres relatifs."
        };
      }
    ],
    intermediaire: []
  },
  // Module 1: Second Degré (VISUEL)
  1: {
    debutant: [
      () => {
        const x1 = rnd(-3, 0); const x2 = rnd(1, 3);
        const a = rndNZ(1, 1);
        const b = -a * (x1 + x2);
        const c = a * x1 * x2;
        return {
          category: "Paraboles",
          eq: `f(x) = x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: "Trouver les deux racines.",
          ans: `${x1} ou ${x2}`,
          aliases: [`${x2} ou ${x1}`],
          steps: [`$\Delta = b^2 - 4ac$`, `Appliquer les formules.`],
          pourquoi: "Graphiquement, ce sont les points où la courbe traverse l'axe horizontal.",
          plot: {
            type: "function",
            data: { fn: (x:number) => x*x + b*x + c, domain: [-5, 5], range: [-10, 10], points: [{x:x1, y:0}, {x:x2, y:0}] }
          }
        };
      }
    ],
    intermediaire: []
  },
  // Module 6: Trigonométrie (VISUEL)
  6: {
    debutant: [
      () => {
        const angles = [
          { deg: 30, rad: "\\pi/6", v: Math.PI/6 },
          { deg: 120, rad: "2\\pi/3", v: 2*Math.PI/3 },
          { deg: 225, rad: "5\\pi/4", v: 5*Math.PI/4 }
        ];
        const a = angles[rnd(0, angles.length-1)];
        return {
          category: "Cercle Trigo",
          eq: `${a.deg}^\\circ`,
          instr: "Convertir en radians.",
          ans: a.rad,
          steps: [`Calculer ${a.deg} \times \pi / 180$.`],
          pourquoi: "Regardez la position de l'angle sur le cercle : il définit un point précis.",
          plot: { type: "cercle", data: { angle: a.v } }
        };
      }
    ],
    intermediaire: []
  }
};

export function checkAnswer(userInput: string, correct: string, aliases?: string[]): boolean {
  const norm = (s:string) => s.trim().toLowerCase().replace(/\s+/g,'').replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
  const u = norm(userInput);
  const c = norm(correct);
  return u === c || (aliases?.some(a => norm(a) === u) ?? false);
}
