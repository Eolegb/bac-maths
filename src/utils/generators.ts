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
  // Module 0: Signes & Priorités
  0: {
    debutant: [
      () => {
        const a = rndNZ(-20, 20); const b = rndNZ(-20, 20);
        return {
          category: "Calcul de base",
          eq: `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la somme des deux nombres relatifs.",
          ans: String(a + b),
          steps: [`$${a} + ${b} = ${a + b}$`],
          pourquoi: "C'est l'addition fondamentale des nombres relatifs. On garde le signe de celui qui a la plus grande distance à zéro si les signes diffèrent."
        };
      }
    ],
    intermediaire: []
  },
  // Module 1: Second Degré - Équations
  1: {
    debutant: [
      () => {
        const x1 = rnd(-3, 0); const x2 = rnd(1, 3);
        const b = -(x1 + x2); const c = x1 * x2;
        return {
          category: "Racines",
          eq: `x^2 ${b >= 0 ? '+' : ''}${b === 0 ? '' : b+'x'} ${c >= 0 ? '+' : ''}${c} = 0`,
          instr: "Trouver les racines de cette équation du second degré.",
          ans: `${x1} ou ${x2}`,
          aliases: [`${x2} ou ${x1}`],
          steps: [`Calculer $\\Delta = b^2 - 4ac$`, `Appliquer les formules des racines.`],
          pourquoi: "Les racines sont les valeurs qui annulent le trinôme.",
          plot: {
            type: "function",
            data: { fn: (x:number) => x*x + b*x + c, domain: [-5, 5], range: [-5, 10], points: [{x:x1, y:0}, {x:x2, y:0}] }
          }
        };
      }
    ],
    intermediaire: []
  },
  // Module 2: Probabilités conditionnelles
  2: {
    debutant: [
      () => {
        const pa = 0.1 * rnd(1, 9);
        const pasb = 0.1 * rnd(1, 9);
        const res = Number((pa * pasb).toFixed(2));
        return {
          category: "Intersection",
          eq: `P(A) = ${pa.toFixed(1)}, \\quad P_A(B) = ${pasb.toFixed(1)}`,
          instr: "Calculer $P(A \\cap B)$.",
          ans: String(res),
          steps: [`$P(A \\cap B) = P(A) \\times P_A(B)$`, `$${pa.toFixed(1)} \\times ${pasb.toFixed(1)} = ${res}$`],
          pourquoi: "C'est la règle du produit : pour que A et B arrivent, il faut que A arrive, PUIS que B arrive sachant A."
        };
      }
    ],
    intermediaire: []
  },
  // Module 3: Trigonométrie
  3: {
    debutant: [
      () => {
        const angles = [
          { deg: 30, rad: "\\pi/6", v: Math.PI/6 },
          { deg: 45, rad: "\\pi/4", v: Math.PI/4 },
          { deg: 60, rad: "\\pi/3", v: Math.PI/3 }
        ];
        const a = angles[rnd(0, angles.length-1)];
        return {
          category: "Conversion",
          eq: `${a.deg}^\\circ`,
          instr: "Convertir cet angle en radians.",
          ans: a.rad,
          steps: [`On multiplie par $\\pi/180$.`],
          pourquoi: "Le radian est la longueur de l'arc de cercle. Un demi-cercle fait $180^\\circ$ ou $\\pi$ radians.",
          plot: { type: "cercle", data: { angle: a.v } }
        };
      }
    ],
    intermediaire: []
  },
  // Module 4: 2nd Degré - Variations
  4: {
    debutant: [
      () => {
        const alpha = rnd(-3, 3); const beta = rnd(-3, 3);
        const b = -2 * alpha; const c = alpha*alpha + beta;
        return {
          category: "Sommet",
          eq: `f(x) = x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: "Donner l'abscisse $\\alpha$ du sommet de la parabole.",
          ans: String(alpha),
          steps: [`$\\alpha = -b/2a = ${-b}/2 = ${alpha}$`],
          pourquoi: "Le sommet est le point où la fonction change de sens de variation.",
          plot: {
            type: "function",
            data: { fn: (x:number) => x*x + b*x + c, domain: [-6, 6], range: [-10, 10], points: [{x:alpha, y:beta, color: "#f0c040"}] }
          }
        };
      }
    ],
    intermediaire: []
  },
  // Module 5: Suites - Généralités
  5: {
    debutant: [
      () => {
        const u0 = rnd(1, 5); const r = rnd(2, 5);
        const n = rnd(2, 4);
        return {
          category: "Termes",
          eq: `u_0 = ${u0}, \\quad u_{n+1} = u_n + ${r}`,
          instr: `Calculer $u_{${n}}$.`,
          ans: String(u0 + n*r),
          steps: [`$u_1 = ${u0+r}$`, `$u_2 = ${u0+2*r}$`, `...`],
          pourquoi: "Chaque étape ajoute la raison au terme précédent."
        };
      }
    ],
    intermediaire: []
  },
  // Module 6: Nombre dérivé
  6: {
    debutant: [
      () => {
        const a = rnd(1, 5);
        return {
          category: "Dérivée",
          eq: `f(x) = x^2, \\quad a = ${a}`,
          instr: "Calculer le nombre dérivé $f'(" + a + ")$.",
          ans: String(2*a),
          steps: [`$f'(x) = 2x$`, `$f'(${a}) = 2 \\times ${a} = ${2*a}$`],
          pourquoi: "Le nombre dérivé est la pente de la tangente à la courbe en ce point."
        };
      }
    ],
    intermediaire: []
  },
  // Module 7: Produit Scalaire
  7: {
    debutant: [
      () => {
        const ux = rnd(-5, 5); const uy = rnd(-5, 5);
        const vx = rnd(-5, 5); const vy = rnd(-5, 5);
        const res = ux * vx + uy * vy;
        return {
          category: "Analytique",
          eq: "\\vec{u} \\begin{pmatrix} " + ux + " \\\\ " + uy + " \\end{pmatrix}, \\quad \\vec{v} \\begin{pmatrix} " + vx + " \\\\ " + vy + " \\end{pmatrix}",
          instr: "Calculer $\\vec{u} \\cdot \\vec{v}$.",
          ans: String(res),
          steps: [`$xx' + yy' = ${ux} \\times ${vx} + ${uy} \\times ${vy} = ${res}$`],
          pourquoi: "Le produit scalaire quantifie la projection d'un vecteur sur l'autre."
        };
      }
    ],
    intermediaire: []
  },
  // Module 8: Variables aléatoires
  8: {
    debutant: [
      () => {
        const x1 = 0; const x2 = 10;
        const p1 = 0.4; const p2 = 0.6;
        const e = x1*p1 + x2*p2;
        return {
          category: "Espérance",
          eq: "X \\in \\{0; 10\\}, \\quad P(X=0)=0,4, \\quad P(X=10)=0,6",
          instr: "Calculer l'espérance $E(X)$.",
          ans: String(e),
          steps: [`$0 \\times 0,4 + 10 \\times 0,6 = 6$`],
          pourquoi: "L'espérance est la moyenne que l'on obtiendrait en répétant l'expérience un grand nombre de fois."
        };
      }
    ],
    intermediaire: []
  },
  // Module 9: Applications dérivation
  9: {
    debutant: [
      () => {
        const a = rndNZ(-5, 5);
        return {
          category: "Variations",
          eq: `f'(x) = ${a}`,
          instr: `Quel est le sens de variation de $f$ si sa dérivée est ${a} ?`,
          ans: a > 0 ? "Croissante" : "Décroissante",
          steps: [`Le signe de la dérivée est ${a > 0 ? 'positif' : 'négatif'}.`],
          pourquoi: "Si la pente est positive, la courbe monte."
        };
      }
    ],
    intermediaire: []
  },
  // Module 10: Suites Arith/Géo
  10: {
    debutant: [
      () => {
        const u0 = rnd(1, 10); const r = rnd(2, 6);
        return {
          category: "Général",
          eq: `u_n = ${u0} + n \\times ${r}`,
          instr: "Quelle est la nature de cette suite ?",
          ans: "Arithmétique",
          steps: ["La forme est $u_0 + nr$."],
          pourquoi: "On ajoute une valeur constante à chaque étape."
        };
      }
    ],
    intermediaire: []
  },
  // Module 11: Exponentielle
  11: {
    debutant: [
      () => {
        const a = rnd(2, 5); const b = rnd(2, 5);
        return {
          category: "Propriétés",
          eq: `e^{${a}} \\times e^{${b}}`,
          instr: "Simplifier l'expression sous la forme $e^n$.",
          ans: `e^{${a+b}}`,
          steps: [`$e^a \\times e^b = e^{a+b}$`],
          pourquoi: "La fonction exponentielle transforme les additions d'exposants en multiplications de puissances."
        };
      }
    ],
    intermediaire: []
  },
  // Module 12: Géométrie repérée
  12: {
    debutant: [
      () => {
        const r = rnd(2, 5);
        return {
          category: "Cercle",
          eq: `x^2 + y^2 = ${r*r}`,
          instr: "Donner le rayon $r$ de ce cercle centré en l'origine.",
          ans: String(r),
          steps: [`L'équation est $x^2 + y^2 = r^2$.`],
          pourquoi: "C'est l'application directe du théorème de Pythagore pour tous les points à distance constante du centre."
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
