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

export function fmtSign(n: number): string {
  return n >= 0 ? "+" : "-";
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
      // Type 1: Somme de 2 relatifs (Simple)
      () => {
        const a = rndNZ(-20, 20);
        const b = rndNZ(-20, 20);
        const ans = String(a + b);
        return {
          eq: `${a < 0 ? `(${a})` : a} + ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la somme des deux nombres relatifs.",
          ans,
          steps: [
            `On additionne $${a}$ et $${b}$.`,
            a * b > 0 
              ? `Les deux nombres ont le même signe : on garde le signe et on additionne les distances à zéro.`
              : `Les deux nombres sont de signes contraires : on prend le signe de celui qui a la plus grande distance à zéro ($|${Math.abs(a)}|$ vs $|${Math.abs(b)}|$) et on soustrait les distances à zéro.`,
            `Le résultat est $${ans}$.`
          ]
        };
      },
      // Type 2: Soustraction (Transformation en somme)
      () => {
        const a = rndNZ(-15, 15);
        const b = rndNZ(-15, 15);
        const ans = String(a - b);
        return {
          eq: `${a < 0 ? `(${a})` : a} - ${b < 0 ? `(${b})` : b}`,
          instr: "Calculer la différence.",
          ans,
          steps: [
            `Soustraire un nombre revient à additionner son opposé.`,
            `L'expression devient : $${a < 0 ? `(${a})` : a} + ${-b < 0 ? `(${-b})` : -b}$.`,
            `Calcul final : $${ans}$.`
          ]
        };
      },
      // Type 3: Chaîne de 3 termes
      () => {
        const a = rndNZ(-10, 10);
        const b = rndNZ(-10, 10);
        const c = rndNZ(-10, 10);
        const ans = String(a + b + c);
        return {
          eq: `${a < 0 ? `(${a})` : a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`,
          instr: "Calculer cette suite d'additions et soustractions.",
          ans,
          steps: [
            `On effectue les calculs de gauche à droite.`,
            `$${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${a + b}$.`,
            `Puis $${a + b} ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${ans}$.`
          ]
        };
      },
      // Type 4: Parenthèses simples
      () => {
        const a = rndNZ(10, 30);
        const b = rnd(2, 15);
        const c = rnd(2, 15);
        const isPlus = Math.random() > 0.5;
        const op = isPlus ? '+' : '-';
        const inner = b - c;
        const ans = isPlus ? a + inner : a - inner;
        return {
          eq: `${a} ${op} (${b} - ${c})`,
          instr: "Calculer en respectant la priorité de la parenthèse.",
          ans: String(ans),
          steps: [
            `Calculons d'abord l'intérieur de la parenthèse : $${b} - ${c} = ${inner}$.`,
            `L'expression devient : $${a} ${op} ${inner < 0 ? `(${inner})` : inner}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      // Type 5: Contexte température
      () => {
        const t1 = rnd(-5, 10);
        const diff = rndNZ(-8, 8);
        const t2 = t1 + diff;
        return {
          eq: `T_1 = ${t1}^\\circ\\text{C} \\xrightarrow{\\text{variation}} ${diff >= 0 ? '+' : ''}${diff}^\\circ\\text{C}`,
          instr: "Un thermomètre affiche $T_1$. La température varie de la valeur indiquée. Quelle est la nouvelle température ?",
          ans: String(t2),
          steps: [
            `On part de $${t1}$.`,
            `On ${diff >= 0 ? 'ajoute' : 'retranche'} $|${diff}|$.`,
            `$${t1} + (${diff}) = ${t2}$.`
          ]
        };
      }
    ],
    intermediaire: [
      // Type 1: Fractions et priorités
      () => {
        const a = rnd(1, 5);
        const b = rnd(2, 4);
        const c = rnd(1, 5);
        const d = rnd(2, 4);
        const num = a * d + b * c;
        const den = b * d;
        return {
          eq: `\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}}`,
          instr: "Additionner ces deux fractions.",
          ans: `${num}/${den}`,
          steps: [
            `Mise au même dénominateur ($${b} \\times ${d} = ${den}$) :`,
            `$\\dfrac{${a} \\times ${d}}{${den}} + \\dfrac{${c} \\times ${b}}{${den}} = \\dfrac{${a * d}}{${den}} + \\dfrac{${b * c}}{${den}}$.`,
            `On additionne les numérateurs : $\\dfrac{${a * d} + ${b * c}}{${den}} = \\dfrac{${num}}{${den}}$.`
          ]
        };
      },
      // Type 2: Multiplication de relatifs (Règle des signes)
      () => {
        const a = rndNZ(-9, 9);
        const b = rndNZ(-9, 9);
        const c = rndNZ(-9, 9);
        const ans = String(a * b * c);
        return {
          eq: `(${a}) \\times (${b}) \\times (${c})`,
          instr: "Calculer le produit.",
          ans,
          steps: [
            `Comptons le nombre de facteurs négatifs : ${[a, b, c].filter(x => x < 0).length}.`,
            `Le résultat sera donc ${ans >= 0 ? 'positif' : 'négatif'}.`,
            `Calcul : $|${a} \\times ${b} \\times ${c}| = ${Math.abs(Number(ans))}$.`,
            `Finalement : $${ans}$.`
          ]
        };
      },
      // Type 3: Isoler une variable (Physique/Maths) - Inspiré du Sujet Blanc
      () => {
        const types = [
          { f: "V = \\dfrac{1}{3}B \\times h", target: "h", res: "3V/B" },
          { f: "U = R \\times I", target: "I", res: "U/R" },
          { f: "P = 2(L + \\ell)", target: "L", res: "P/2 - \\ell" }
        ];
        const t = types[rnd(0, types.length - 1)];
        return {
          eq: t.f,
          instr: `Dans cette formule, exprimer $${t.target}$ en fonction des autres variables.`,
          ans: t.res,
          steps: [
            `On cherche à isoler $${t.target}$.`,
            `On effectue les opérations inverses sur les deux membres de l'égalité.`,
            `La réponse attendue est $${t.res}$.`
          ]
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
        const ans = `${k * a}x${k * b >= 0 ? '+' : ''}${k * b}`;
        return {
          eq: `${k}(${a}x ${b >= 0 ? '+' : ''}${b})`,
          instr: "Développer l'expression.",
          ans,
          steps: [
            `On distribue le facteur $${k}$ : $${k} \\times ${a}x + ${k} \\times (${b})$.`,
            `$${k * a}x + (${k * b}) = ${ans}$.`
          ]
        };
      },
      // Identités remarquables avec coeff
      () => {
        const a = rnd(2, 5);
        const b = rnd(1, 6);
        const a2 = a * a;
        const b2 = b * b;
        const ab2 = 2 * a * b;
        return {
          eq: `(${a}x + ${b})^2`,
          instr: "Développer en utilisant $(a+b)^2 = a^2 + 2ab + b^2$.",
          ans: `${a2}x^2+${ab2}x+${b2}`,
          steps: [
            `Ici, $A = ${a}x$ et $B = ${b}$.`,
            `$A^2 = (${a}x)^2 = ${a2}x^2$.`,
            `$2AB = 2 \\times ${a}x \\times ${b} = ${ab2}x$.`,
            `$B^2 = ${b}^2 = ${b2}$.`,
            `Résultat : $${a2}x^2 + ${ab2}x + ${b2}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rndNZ(1, 3);
        const b = rndNZ(-4, 4);
        const c = rndNZ(1, 3);
        const d = rndNZ(-4, 4);
        const q2 = a * c;
        const q1 = a * d + b * c;
        const q0 = b * d;
        const ans = `${q2 === 1 ? '' : q2 === -1 ? '-' : q2}x^2${q1 >= 0 ? '+' : ''}${q1}x${q0 >= 0 ? '+' : ''}${q0}`;
        return {
          eq: `(${a}x ${b >= 0 ? '+' : ''}${b})(${c}x ${d >= 0 ? '+' : ''}${d})`,
          instr: "Développer par double distributivité.",
          ans,
          steps: [
            `$(${a}x) \\times (${c}x) = ${q2}x^2$.`,
            `$(${a}x) \\times (${d}) = ${a * d}x$.`,
            `$(${b}) \\times (${c}x) = ${b * c}x$.`,
            `$(${b}) \\times (${d}) = ${q0}$.`,
            `Réduction : $${q2}x^2 + (${a * d} + ${b * c})x + ${q0} = ${ans}$.`
          ]
        };
      }
    ]
  },
  // Module 2: Factoriser
  2: {
    debutant: [
      () => {
        const k = rnd(2, 9);
        const b = rndNZ(-9, 9);
        const ans = `${k}(x${b >= 0 ? '+' : ''}${b})`;
        return {
          eq: `${k}x ${k * b >= 0 ? '+' : ''}${k * b}`,
          instr: "Factoriser par le plus grand facteur commun.",
          ans,
          steps: [
            `Le facteur commun est $${k}$.`,
            `On divise chaque terme par $${k}$ : $x$ et $${b}$.`,
            `Résultat : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rnd(2, 10);
        const a2 = a * a;
        return {
          eq: `x^2 - ${a2}`,
          instr: "Factoriser (identité remarquable).",
          ans: `(x-${a})(x+${a})`,
          aliases: [`(x+${a})(x-${a})`],
          steps: [
            `C'est une forme $A^2 - B^2$ avec $A=x$ et $B=${a}$.`,
            `On applique $(A-B)(A+B)$.`,
            `Résultat : $(x-${a})(x+${a})$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rndNZ(-4, 4);
        const b = rnd(2, 4);
        const coeffX = b + 1;
        return {
          eq: `(x ${a >= 0 ? '+' : ''}${a})(${b}x + 1) + (x ${a >= 0 ? '+' : ''}${a})`,
          instr: "Factoriser (attention au terme 'fantôme' !).",
          ans: `(x${a >= 0 ? '+' : ''}${a})(${b}x+2)`,
          steps: [
            `Le facteur commun est $(x ${a >= 0 ? '+' : ''}${a})$.`,
            `On écrit : $(x ${a >= 0 ? '+' : ''}${a}) [(${b}x + 1) + 1]$.`,
            `Simplification du crochet : $${b}x + 2$.`,
            `Résultat : $(x ${a >= 0 ? '+' : ''}${a})(${b}x + 2)$.`
          ]
        };
      }
    ]
  },
  // Module 3: Fractions algébriques
  3: {
    debutant: [
      () => {
        const k = rnd(2, 7);
        const a = rndNZ(-5, 5);
        return {
          eq: `\\dfrac{${k}x ${k * a >= 0 ? '+' : ''}${k * a}}{${k}}`,
          instr: "Simplifier la fraction.",
          ans: `x${a >= 0 ? '+' : ''}${a}`,
          steps: [
            `On factorise le numérateur : $${k}(x ${a >= 0 ? '+' : ''}${a})$.`,
            `On simplifie par $${k}$ en haut et en bas.`,
            `Résultat : $x ${a >= 0 ? '+' : ''}${a}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const c = rnd(1, 3);
        return {
          eq: `\\dfrac{1}{x} + \\dfrac{1}{x + ${c}}`,
          instr: "Réduire au même dénominateur.",
          ans: `(2x+${c})/(x(x+${c}))`,
          steps: [
            `Le dénominateur commun est $x(x + ${c})$.`,
            `$\\dfrac{1(x+${c})}{x(x+${c})} + \\dfrac{1(x)}{x(x+${c})}$.`,
            `$\\dfrac{x+${c}+x}{x(x+${c})} = \\dfrac{2x+${c}}{x(x+${c})}$.`
          ]
        };
      }
    ]
  },
  // Module 4: Équations & inéquations
  4: {
    debutant: [
      () => {
        let a, b, c, x;
        while (a === 0 || (c - b) % a !== 0) {
          a = rndNZ(-5, 5);
          b = rndNZ(-12, 12);
          c = rndNZ(-12, 12);
        }
        x = (c - b) / a;
        return {
          eq: `${a}x ${b >= 0 ? '+' : ''}${b} = ${c}`,
          instr: "Résoudre l'équation.",
          ans: String(x),
          steps: [
            `On isole le terme en $x$ : $${a}x = ${c} - (${b}) = ${c - b}$.`,
            `On divise par $${a}$ : $x = \\dfrac{${c - b}}{${a}} = ${x}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const x1 = rnd(-5, 5);
        let x2 = rnd(-5, 5);
        while (x2 === x1) x2 = rnd(-5, 5);
        const a = rndNZ(1, 3);
        const b = -a * x1;
        const c = rndNZ(1, 3);
        const d = -c * x2;
        return {
          eq: `(${a}x ${b >= 0 ? '+' : ''}${b})(${c}x ${d >= 0 ? '+' : ''}${d}) = 0`,
          instr: "Résoudre (Équation produit nul).",
          ans: `x=${x1} ou x=${x2}`,
          aliases: [`x=${x2} ou x=${x1}`],
          steps: [
            `Un produit est nul si l'un de ses facteurs est nul.`,
            `$${a}x ${b >= 0 ? '+' : ''}${b} = 0 \\implies x = ${x1}$.`,
            `$${c}x ${d >= 0 ? '+' : ''}${d} = 0 \\implies x = ${x2}$.`,
            `Solutions : $x = ${x1}$ ou $x = ${x2}$.`
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
