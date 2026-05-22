export interface MathProblem {
  eq: string;
  instr: string;
  ans: string;
  aliases?: string[];
  steps: string[];
}

export function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rndNZ(min: number, max: number): number {
  let val = 0;
  while (val === 0) {
    val = rnd(min, max);
  }
  return val;
}

export function fmtTerm(coeff: number, variable: string): string {
  if (coeff === 0) return "";
  if (coeff === 1) return variable;
  if (coeff === -1) return `-${variable}`;
  return `${coeff}${variable}`;
}

export const GENERATORS: Record<number, {
  debutant: (() => MathProblem)[];
  intermediaire: (() => MathProblem)[];
}> = {
  // Module 0: Signes & Priorités
  0: {
    debutant: [
      () => {
        const a = rndNZ(-20, 20);
        const b = rndNZ(-20, 20);
        return {
          eq: `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la somme des deux nombres relatifs.",
          ans: String(a + b),
          steps: [`$${a} + ${b} = ${a + b}$.`]
        };
      },
      () => {
        const a = rndNZ(-15, 15);
        const b = rndNZ(-15, 15);
        return {
          eq: `${a < 0 ? `(${a})` : a} - ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la différence.",
          ans: String(a - b),
          steps: [`$${a} - (${b}) = ${a - b}$.`]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(1, 5);
        const b = rnd(2, 4);
        const c = rnd(1, 5);
        const d = rnd(2, 4);
        const num = a * d + b * c;
        const den = b * d;
        return {
          eq: `\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}}`,
          instr: "Additionner les fractions.",
          ans: `${num}/${den}`,
          steps: [`$\\dfrac{${a*d}}{${den}} + \\dfrac{${b*c}}{${den}} = \\dfrac{${num}}{${den}}$.`]
        };
      }
    ]
  },
  // Module 1: Développer & réduire
  1: {
    debutant: [
      () => {
        const k = rndNZ(-6, 6);
        const a = rndNZ(2, 5);
        const b = rndNZ(-8, 8);
        return {
          eq: `${k}(${a}x ${b >= 0 ? '+' : ''}${b})`,
          instr: "Développer l'expression.",
          ans: `${k * a}x${k * b >= 0 ? '+' : ''}${k * b}`,
          steps: [`$${k} \\times ${a}x + ${k} \\times (${b}) = ${k * a}x ${k * b >= 0 ? '+' : ''}${k * b}$.`]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(2, 4);
        const b = rnd(1, 5);
        const a2 = a * a;
        const ab2 = 2 * a * b;
        const b2 = b * b;
        return {
          eq: `(${a}x + ${b})^2`,
          instr: "Développer (Identité remarquable).",
          ans: `${a2}x^2+${ab2}x+${b2}`,
          steps: [`$(${a}x)^2 + 2 \\times ${a}x \\times ${b} + ${b}^2 = ${a2}x^2 + ${ab2}x + ${b2}$.`]
        };
      }
    ]
  },
  // Module 2: Second degré
  2: {
    debutant: [
      () => {
        const x1 = rnd(-5, 5);
        let x2 = rnd(-5, 5);
        while (x2 === x1) x2 = rnd(-5, 5);
        const a = rndNZ(1, 2);
        const b = -a * (x1 + x2);
        const c = a * x1 * x2;
        const delta = b * b - 4 * a * c;
        return {
          eq: `${fmtTerm(a, "x^2")} ${b >= 0 ? '+' : ''}${fmtTerm(b, "x")} ${c >= 0 ? '+' : ''}${c} = 0`,
          instr: "Calculer le discriminant $\\Delta$ de cette équation.",
          ans: String(delta),
          steps: [
            `$a = ${a}, b = ${b}, c = ${c}$.`,
            `$\\Delta = b^2 - 4ac = (${b})^2 - 4 \\times ${a} \\times ${c} = ${b*b} - ${4*a*c} = ${delta}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const x1 = rnd(-5, 5);
        let x2 = rnd(-5, 5);
        while (x2 === x1) x2 = rnd(-5, 5);
        const a = 1;
        const b = -(x1 + x2);
        const c = x1 * x2;
        return {
          eq: `x^2 ${b >= 0 ? '+' : ''}${fmtTerm(b, "x")} ${c >= 0 ? '+' : ''}${c} = 0`,
          instr: "Trouver les deux racines de l'équation (Format: x1 ou x2).",
          ans: `${x1} ou ${x2}`,
          aliases: [`${x2} ou ${x1}`, `x=${x1} ou x=${x2}`, `x=${x2} ou x=${x1}`],
          steps: [
            `$\\Delta = ${b*b - 4*c}$.`,
            `$x_1 = \\frac{${-b}-\\sqrt{${b*b - 4*c}}}{2} = ${x1}$.`,
            `$x_2 = \\frac{${-b}+\\sqrt{${b*b - 4*c}}}{2} = ${x2}$.`
          ]
        };
      }
    ]
  },
  // Module 3: Suites
  3: {
    debutant: [
      () => {
        const u0 = rnd(1, 10);
        const r = rnd(2, 6);
        const n = rnd(3, 10);
        return {
          eq: `u_n = ${u0} + n \\times ${r}`,
          instr: `Calculer le terme $u_{${n}}$ de cette suite arithmétique.`,
          ans: String(u0 + n * r),
          steps: [`$u_{${n}} = ${u0} + ${n} \\times ${r} = ${u0} + ${n*r} = ${u0 + n*r}$.`]
        };
      },
      () => {
        const u0 = rnd(1, 5);
        const q = rnd(2, 3);
        const n = rnd(2, 4);
        return {
          eq: `u_n = ${u0} \\times ${q}^n`,
          instr: `Calculer le terme $u_{${n}}$ de cette suite géométrique.`,
          ans: String(u0 * Math.pow(q, n)),
          steps: [`$u_{${n}} = ${u0} \\times ${q}^{${n}} = ${u0} \\times ${Math.pow(q, n)} = ${u0 * Math.pow(q, n)}$.`]
        };
      }
    ],
    intermediaire: [
      () => {
        const r = rndNZ(-5, 5);
        return {
          eq: `u_{n+1} = u_n ${r >= 0 ? '+' : ''}${r}`,
          instr: "Quel est le sens de variation de cette suite ?",
          ans: r > 0 ? "Croissante" : "Décroissante",
          aliases: [r > 0 ? "croissante" : "décroissante"],
          steps: [`La raison $r = ${r}$ est ${r > 0 ? 'positive' : 'négative'}.`]
        };
      }
    ]
  },
  // Module 4: Dérivation
  4: {
    debutant: [
      () => {
        const n = rnd(2, 6);
        return {
          eq: `f(x) = x^{${n}}`,
          instr: "Donner l'expression de la dérivée $f'(x)$.",
          ans: `${n}x^{${n-1}}`,
          steps: [`On applique la règle $(x^n)' = nx^{n-1}$.`]
        };
      },
      () => {
        const a = rndNZ(-10, 10);
        return {
          eq: `f(x) = ${a}x + 5`,
          instr: "Calculer $f'(x)$.",
          ans: String(a),
          steps: [`La dérivée d'une fonction affine $ax+b$ est son coefficient directeur $a$.`]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(1, 5);
        const fa = a * a;
        const fpa = 2 * a;
        return {
          eq: `f(x) = x^2, \\quad a = ${a}`,
          instr: `Trouver l'équation de la tangente au point d'abscisse $a = ${a}$.`,
          ans: `y=${fpa}x-${fa}`,
          steps: [
            `$f(${a}) = ${a}^2 = ${fa}$.`,
            `$f'(x) = 2x \\implies f'(${a}) = ${fpa}$.`,
            `$y = ${fpa}(x - ${a}) + ${fa} = ${fpa}x - ${fpa*a} + ${fa} = ${fpa}x - ${fa}$.`
          ]
        };
      }
    ]
  }
};

export function checkAnswer(userInput: string, correct: string, aliases?: string[]): boolean {
  const norm = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/×/g, '*')
      .replace(/−/g, '-')
      .replace(/[\u2212\u2013\u2014]/g, '-')
      .replace(/\^/g, '^')
      .replace(/ou/g, 'ou')
      .replace(/;/g, ',')
      .replace(/\(/g, '(')
      .replace(/\)/g, ')');
  };

  const cleanUser = norm(userInput);
  const cleanCorrect = norm(correct);
  if (cleanUser === cleanCorrect) return true;
  if (aliases) {
    for (const alias of aliases) {
      if (cleanUser === norm(alias)) return true;
    }
  }
  if (cleanCorrect.includes('ou') && cleanUser.includes('ou')) {
    const correctParts = cleanCorrect.split('ou').sort();
    const userParts = cleanUser.split('ou').sort();
    if (correctParts.length === userParts.length) {
      return correctParts.every((part, idx) => part === userParts[idx]);
    }
  }
  return false;
}
