export interface MathProblem {
  eq: string;
  instr: string;
  ans: string;
  aliases?: string[];
  steps: string[];
  pourquoi: string; // Explication conceptuelle
  category: string; // Pour le bilan structuré
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
  // Module 0: Signes & Priorités
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
          pourquoi: "L'addition de deux nombres de signes contraires revient à soustraire leurs valeurs absolues et garder le signe du plus grand."
        };
      }
    ],
    intermediaire: []
  },
  // Module 5: Trigonométrie
  5: {
    debutant: [
      () => {
        const values = [
          { deg: 0, rad: "0" }, { deg: 30, rad: "\\pi/6" }, { deg: 45, rad: "\\pi/4" }, 
          { deg: 60, rad: "\\pi/3" }, { deg: 90, rad: "\\pi/2" }, { deg: 180, rad: "\\pi" }
        ];
        const v = values[rnd(0, values.length - 1)];
        return {
          category: "Trigonométrie",
          eq: `${v.deg}^\\circ`,
          instr: "Convertir cet angle en radians.",
          ans: v.rad,
          steps: [`On applique la règle de proportionnalité : $180^\\circ$ correspond à $\\pi$ rad.`, `Calcul : $${v.deg} \\times \\frac{\\pi}{180} = ${v.rad}$.`],
          pourquoi: "Le radian mesure la longueur de l'arc de cercle intercepté sur un cercle de rayon 1."
        };
      }
    ],
    intermediaire: [
      () => {
        const values = [
          { q: "\\cos(\\pi/3)", a: "1/2" }, { q: "\\sin(\\pi/6)", a: "1/2" },
          { q: "\\cos(\\pi/4)", a: "\\sqrt{2}/2" }, { q: "\\sin(\\pi/3)", a: "\\sqrt{3}/2" }
        ];
        const v = values[rnd(0, values.length - 1)];
        return {
          category: "Valeurs remarquables",
          eq: v.q,
          instr: "Donner la valeur exacte.",
          ans: v.a,
          steps: ["Se référer au cercle trigonométrique."],
          pourquoi: "Ces valeurs proviennent des propriétés géométriques des triangles équilatéraux et des carrés coupés en deux."
        };
      }
    ]
  },
  // Module 6: Produit Scalaire
  6: {
    debutant: [
      () => {
        const ux = rnd(-5, 5); const uy = rnd(-5, 5);
        const vx = rnd(-5, 5); const vy = rnd(-5, 5);
        const res = ux * vx + uy * vy;
        return {
          category: "Produit Scalaire",
          eq: "\\vec{u} \\begin{pmatrix} " + ux + " \\\\ " + uy + " \\end{pmatrix} \\cdot \\vec{v} \\begin{pmatrix} " + vx + " \\\\ " + vy + " \\end{pmatrix}",
          instr: "Calculer le produit scalaire $\\vec{u} \\cdot \\vec{v}$.",
          ans: String(res),
          steps: [`$\\vec{u} \\cdot \\vec{v} = xx' + yy'$`, `$${ux} \\times ${vx} + ${uy} \\times ${vy} = ${ux * vx} + ${uy * vy} = ${res}$.`],
          pourquoi: "Le produit scalaire mesure à quel point deux vecteurs vont dans la même direction."
        };
      }
    ],
    intermediaire: []
  },
  // Module 7: Exponentielle
  7: {
    debutant: [
      () => {
        const a = rnd(2, 8); const b = rnd(2, 8);
        return {
          category: "Exponentielle",
          eq: "e^{" + a + "} \\times e^{" + b + "}",
          instr: "Simplifier l'expression sous la forme $e^n$.",
          ans: "e^{" + (a + b) + "}",
          steps: [`Propriété : $e^a \\times e^b = e^{a+b}$`, `$e^{${a}+${b}} = e^{${a + b}}$`],
          pourquoi: "La fonction exponentielle transforme les sommes en produits, c'est sa propriété fondamentale."
        };
      }
    ],
    intermediaire: []
  },
  // Module 8: Probabilités
  8: {
    debutant: [
      () => {
        const pa = 0.1 * rnd(1, 9);
        const pb_sachant_a = 0.1 * rnd(1, 9);
        const res = Number((pa * pb_sachant_a).toFixed(2));
        return {
          category: "Probabilités conditionnelles",
          eq: "P(A) = " + pa.toFixed(1) + ", \\quad P_A(B) = " + pb_sachant_a.toFixed(1),
          instr: "Calculer $P(A \\cap B)$.",
          ans: String(res),
          steps: [`$P(A \\cap B) = P(A) \\times P_A(B)$`, `$${pa.toFixed(1)} \\times ${pb_sachant_a.toFixed(1)} = ${res}$`],
          pourquoi: "C'est la règle du chemin dans un arbre : on multiplie les probabilités rencontrées le long des branches."
        };
      }
    ],
    intermediaire: []
  }
};

export function checkAnswer(userInput: string, correct: string, aliases?: string[]): boolean {
  const norm = (str: string) => str.trim().toLowerCase().replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  const cu = norm(userInput);
  const cc = norm(correct);
  if (cu === cc) return true;
  if (aliases) return aliases.some(a => norm(a) === cu);
  return false;
}
