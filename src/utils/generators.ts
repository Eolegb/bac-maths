export interface MathProblem {
  eq: string;
  instr: string;
  ans: string;
  aliases?: string[];
  steps: string[];
}

// Helper to generate a random integer in [min, max]
export function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to generate a random non-zero integer
export function rndNZ(min: number, max: number): number {
  let val = 0;
  while (val === 0) {
    val = rnd(min, max);
  }
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
        const a = rndNZ(-9, -2);
        const b = rndNZ(-9, -2);
        const ans = String(a * b);
        return {
          eq: `(${a}) \\times (${b})`,
          instr: "Calculer le produit en appliquant la règle des signes.",
          ans,
          steps: [
            `Déterminez le signe : multiplication de deux nombres négatifs, donc le résultat est **positif** ($+$).`,
            `Multipliez les valeurs absolues : $${Math.abs(a)} \\times ${Math.abs(b)} = ${ans}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(-9, 9);
        const b = rndNZ(2, 6);
        const c = rndNZ(-8, -2);
        const ans = String(a + b * c);
        return {
          eq: `${a} + ${b} \\times (${c})`,
          instr: "Calculer en respectant la priorité des opérations.",
          ans,
          steps: [
            `La multiplication est prioritaire sur l'addition : effectuez d'abord $${b} \\times (${c}) = ${b * c}$.`,
            `Effectuez ensuite l'addition : $${a} + (${b * c}) = ${ans}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(2, 9);
        const b = rndNZ(-9, -2);
        const ans = `-${a}x${-b >= 0 ? '+' : ''}${-b}`;
        const aliases = [`-${a}x + ${-b}`, `${-b} - ${a}x`];
        return {
          eq: `-(${a}x ${b >= 0 ? '+' : ''}${b})`,
          instr: "Développer et retirer les parenthèses en distribuant le signe moins.",
          ans,
          aliases,
          steps: [
            `Distribuez le signe moins devant les parenthèses à chaque terme à l'intérieur.`,
            `Le terme $${a}x$ devient $-${a}x$.`,
            `Le terme $${b}$ devient $-(${b}) = +${Math.abs(b)}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(2, 4);
        const b = rndNZ(-5, 5);
        const c = rnd(2, 4);
        const d = rndNZ(-5, 5);
        const x = rnd(1, 3);
        
        // -a(bx - c) - d(ex + f)
        // Let's do: -a(x + b) - c(x + d)
        // Reduced: -a x - a b - c x - c d = (-a - c)x - a b - c d
        const coeffX = -a - c;
        const constVal = -a * b - c * d;
        const valX = coeffX * x + constVal;
        
        return {
          eq: `f(x) = -${a}(x ${b >= 0 ? '+' : ''}${b}) - ${c}(x ${d >= 0 ? '+' : ''}${d})`,
          instr: `Développer, réduire l'expression, puis calculer sa valeur exacte pour $x = ${x}$.`,
          ans: String(valX),
          steps: [
            `Développons la première partie : $-${a}(x ${b >= 0 ? '+' : ''}${b}) = -${a}x ${-a*b >= 0 ? '+' : ''}${-a*b}$.`,
            `Développons la deuxième partie : $-${c}(x ${d >= 0 ? '+' : ''}${d}) = -${c}x ${-c*d >= 0 ? '+' : ''}${-c*d}$.`,
            `Regroupons les termes en $x$ et les constantes : $B(x) = (${coeffX})x ${constVal >= 0 ? '+' : ''}${constVal}$.`,
            `Calculons la valeur pour $x = ${x}$ : $B(${x}) = ${coeffX} \\times ${x} ${constVal >= 0 ? '+' : ''}${constVal} = ${valX}$.`
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
          instr: "Développer et réduire cette expression par distributivité simple.",
          ans,
          steps: [
            `Multipliez le facteur externe par le premier terme : $${k} \\times ${a}x = ${k * a}x$.`,
            `Multipliez le facteur externe par le second terme : $${k} \\times (${b}) = ${k * b}$.`,
            `Additionnez les résultats obtenus : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(1, 8);
        const a2 = a * a;
        const double = 2 * a;
        const ans = `x^2+${double}x+${a2}`;
        return {
          eq: `(x + ${a})^2`,
          instr: "Développer avec l'identité remarquable $(a+b)^2 = a^2 + 2ab + b^2$.",
          ans,
          steps: [
            `Ici, $a = x$ et $b = ${a}$.`,
            `Le carré du premier terme est $x^2$.`,
            `Le double produit est $2 \\times x \\times ${a} = ${double}x$.`,
            `Le carré du second terme est $${a}^2 = ${a2}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(1, 8);
        const a2 = a * a;
        const double = 2 * a;
        const ans = `x^2-${double}x+${a2}`;
        return {
          eq: `(x - ${a})^2`,
          instr: "Développer avec l'identité remarquable $(a-b)^2 = a^2 - 2ab + b^2$.",
          ans,
          steps: [
            `Ici, $a = x$ et $b = ${a}$.`,
            `Le carré du premier terme est $x^2$.`,
            `Le double produit (précédé d'un signe moins) est $-2 \\times x \\times ${a} = -${double}x$.`,
            `Le carré du second terme est $${a}^2 = ${a2}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(1, 10);
        const a2 = a * a;
        const ans = `x^2-${a2}`;
        return {
          eq: `(x - ${a})(x + ${a})`,
          instr: "Développer avec l'identité remarquable $(a-b)(a+b) = a^2 - b^2$.",
          ans,
          steps: [
            `Ici, $a = x$ et $b = ${a}$.`,
            `La formule donne directement la différence de deux carrés : $x^2 - ${a}^2$.`,
            `Résultat final : $${ans}$.`
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
          instr: "Développer et réduire en utilisant la double distributivité.",
          ans,
          steps: [
            `Distribuez chaque terme de la première parenthèse :`,
            `$${a}x \\times ${c}x = ${q2}x^2$.`,
            `$${a}x \\times (${d}) = ${a * d}x$.`,
            `$${b} \\times ${c}x = ${b * c}x$.`,
            `$${b} \\times (${d}) = ${q0}$.`,
            `Assemblez et réduisez : $${q2}x^2 + (${a * d}x + ${b * c}x) + (${q0}) = ${ans}$.`
          ]
        };
      },
      () => {
        const a = rnd(1, 4);
        const b = rnd(1, 4);
        
        // (x+a)^2 - x(x-b)
        // = (x^2 + 2ax + a^2) - (x^2 - bx)
        // = (2a + b)x + a^2
        const coeff = 2 * a + b;
        const constVal = a * a;
        const ans = `${coeff}x+${constVal}`;
        return {
          eq: `(x + ${a})^2 - x(x - ${b})`,
          instr: "Développer et réduire l'expression complexe.",
          ans,
          steps: [
            `Développez la première partie : $(x + ${a})^2 = x^2 + ${2 * a}x + ${a * a}$.`,
            `Développez la seconde partie (attention au signe moins devant le produit) : $-x(x - ${b}) = -x^2 + ${b}x$.`,
            `Additionnez les deux expressions : $(x^2 - x^2) + (${2 * a}x + ${b}x) + ${a * a}$.`,
            `Résultat final : $${ans}$.`
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
          instr: "Factoriser l'expression en recherchant le facteur commun.",
          ans,
          steps: [
            `Remarquez que le coefficient devant $x$ ($${k}$) et la constante ($${k * b}$) partagent le diviseur commun $${k}$.`,
            `Placez $${k}$ devant des parenthèses : $${k}(...)$.`,
            `Divisez chaque terme par le facteur commun : $${k}x \\div ${k} = x$ et $${k * b} \\div ${k} = ${b}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rnd(2, 10);
        const a2 = a * a;
        const ans = `(x-${a})(x+${a})`;
        const aliases = [`(x+${a})(x-${a})`];
        return {
          eq: `x^2 - ${a2}`,
          instr: "Factoriser avec l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$.",
          ans,
          aliases,
          steps: [
            `Ici, l'expression est de la forme $a^2 - b^2$ avec $a = x$ et $b = \\sqrt{${a2}} = ${a}$.`,
            `Appliquez la formule de factorisation.`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const ans = "x(x-1)";
        const aliases = ["x(x - 1)", "(x-1)x", "x*(x-1)"];
        return {
          eq: "x^2 - x",
          instr: "Factoriser cette expression simple.",
          ans,
          aliases,
          steps: [
            `Remarquez que $x$ est présent dans les deux termes : $x^2 = x \\times x$ et $x = x \\times 1$.`,
            `Mettez $x$ en facteur.`,
            `Résultat final : $${ans}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(2, 8);
        const a2 = a * a;
        const double = 2 * a;
        const ans = `(x+${a})^2`;
        return {
          eq: `x^2 + ${double}x + ${a2}`,
          instr: "Reconnaître l'identité remarquable pour factoriser ce carré parfait.",
          ans,
          steps: [
            `On cherche si l'expression correspond à la forme $x^2 + 2ax + a^2 = (x+a)^2$.`,
            `La constante $${a2}$ est le carré de $${a}$ ($${a}^2 = ${a2}$).`,
            `Le terme central $${double}x$ est bien le double produit de $x$ et $${a}$ ($2 \\times ${a} \\times x = ${double}x$).`,
            `Résultat final : $${ans}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(-4, 4);
        const b = rnd(1, 3);
        const c = rndNZ(1, 3);
        
        // (x+a)(bx + 1) + (x+a)(cx + 2)
        // = (x+a)[ (bx+1) + (cx+2) ]
        // = (x+a)[ (b+c)x + 3 ]
        const coeffX = b + c;
        const ans = `(x${a >= 0 ? '+' : ''}${a})(${coeffX}x+3)`;
        const aliases = [`(${coeffX}x+3)(x${a >= 0 ? '+' : ''}${a})`];
        return {
          eq: `(x ${a >= 0 ? '+' : ''}${a})(${b}x + 1) + (x ${a >= 0 ? '+' : ''}${a})(${c}x + 2)`,
          instr: "Factoriser en mettant en évidence le facteur commun parenthésé.",
          ans,
          aliases,
          steps: [
            `Le facteur commun présent dans les deux membres est l'expression $(x ${a >= 0 ? '+' : ''}${a})$.`,
            `Mettez-le en facteur et placez le reste dans un crochet : $(x ${a >= 0 ? '+' : ''}${a}) \\left[ (${b}x + 1) + (${c}x + 2) \\right]$.`,
            `Simplifiez l'intérieur du crochet : $${b}x + 1 + ${c}x + 2 = ${coeffX}x + 3$.`,
            `Résultat final : $${ans}$.`
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
        const ans = `x${a >= 0 ? '+' : ''}${a}`;
        return {
          eq: `\\dfrac{${k}x ${k * a >= 0 ? '+' : ''}${k * a}}{${k}}`,
          instr: "Simplifier la fraction algébrique en factorisant le numérateur.",
          ans,
          steps: [
            `Factorisez le numérateur par son facteur commun $${k}$ : $${k}x ${k * a >= 0 ? '+' : ''}${k * a} = ${k}(x ${a >= 0 ? '+' : ''}${a})$.`,
            `La fraction devient : $\\frac{${k}(x ${a >= 0 ? '+' : ''}${a})}{${k}}$.`,
            `Simplifiez en divisant le numérateur et le dénominateur par $${k}$.`,
            `Résultat final : $x ${a >= 0 ? '+' : ''}${a}$.`
          ]
        };
      },
      () => {
        const a = rnd(2, 6);
        const a2 = a * a;
        const ans = `x-${a}`;
        return {
          eq: `\\dfrac{x^2 - ${a2}}{x + ${a}}`,
          instr: "Simplifier la fraction en factorisant le numérateur (C.E. : $x \\neq -${a}$).",
          ans,
          steps: [
            `Condition d'existence (C.E.) : le dénominateur ne doit pas s'annuler, donc $x \\neq -${a}$.`,
            `Factorisez le numérateur qui est une différence de carrés : $x^2 - ${a2} = (x - ${a})(x + ${a})$.`,
            `Remplacez dans la fraction : $\\frac{(x - ${a})(x + ${a})}{x + ${a}}$.`,
            `Simplifiez par le facteur commun $(x + ${a})$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rnd(1, 3);
        const b = rnd(1, 3);
        const c = rnd(1, 3);
        
        // a/x + b/(x+c)
        // = (a(x+c) + bx) / (x(x+c))
        // = ((a+b)x + ac) / (x(x+c))
        const numCoeff = a + b;
        const numConst = a * c;
        
        const ans = `(${numCoeff}x+${numConst})/(x(x+${c}))`;
        const aliases = [
          `(${numCoeff}x+${numConst})/(x^2+${c}x)`,
          `(${numCoeff}x+${numConst})/(x^2 + ${c}x)`,
          `(${numCoeff}x + ${numConst})/(x(x + ${c}))`
        ];
        return {
          eq: `\\dfrac{${a}}{x} + \\dfrac{${b}}{x + ${c}}`,
          instr: "Mettre au même dénominateur et simplifier sous forme d'une unique fraction.",
          ans,
          aliases,
          steps: [
            `Le dénominateur commun est $x(x + ${c})$.`,
            `Mettez la première fraction au même dénominateur : $\\frac{${a}(x + ${c})}{x(x + ${c})}$.`,
            `Mettez la seconde fraction au même dénominateur : $\\frac{${b}x}{x(x + ${c})}$.`,
            `Additionnez les numérateurs : $${a}(x + ${c}) + ${b}x = ${a}x + ${a * c} + ${b}x = ${numCoeff}x + ${numConst}$.`,
            `Résultat final : $${ans}$.`
          ]
        };
      }
    ]
  },
  // Module 4: Équations & inéquations
  4: {
    debutant: [
      () => {
        let a = 0;
        let b = 0;
        let c = 0;
        let x = 0;
        // Ensure integer solutions
        while (a === 0 || (c - b) % a !== 0) {
          a = rndNZ(-5, 5);
          b = rndNZ(-12, 12);
          c = rndNZ(-12, 12);
        }
        x = (c - b) / a;
        return {
          eq: `${a}x ${b >= 0 ? '+' : ''}${b} = ${c}`,
          instr: "Résoudre cette équation du premier degré.",
          ans: String(x),
          steps: [
            `Déplacez la constante de l'autre côté en changeant son signe : $${a}x = ${c} - (${b}) = ${c - b}$.`,
            `Divisez par le coefficient de $x$ ($${a}$) : $x = \\frac{${c - b}}{${a}}$.`,
            `Résultat final : $x = ${x}$.`
          ]
        };
      },
      () => {
        const a = rndNZ(1, 5);
        const c = rndNZ(1, 5);
        
        // (ax+b)(cx+d) = 0
        // Roots: -b/a and -d/c
        // Let's make roots nice integers to avoid fraction inputs
        // x1 = -b/a -> b = -a*x1
        // x2 = -d/c -> d = -c*x2
        const x1 = rnd(-5, 5);
        let x2 = rnd(-5, 5);
        while (x2 === x1) { x2 = rnd(-5, 5); }
        
        const bVal = -a * x1;
        const dVal = -c * x2;
        
        const ans = `x=${x1} ou x=${x2}`;
        const aliases = [
          `x=${x2} ou x=${x1}`,
          `x=${x1} ou x = ${x2}`,
          `x = ${x1} ou x = ${x2}`,
          `x=${x1};x=${x2}`,
          `${x1} ou ${x2}`,
          `${x1};${x2}`
        ];
        
        const f1 = `${a === 1 ? '' : a === -1 ? '-' : a}x ${bVal >= 0 ? '+' : ''}${bVal}`;
        const f2 = `${c === 1 ? '' : c === -1 ? '-' : c}x ${dVal >= 0 ? '+' : ''}${dVal}`;
        
        return {
          eq: `(${f1})(${f2}) = 0`,
          instr: "Résoudre cette équation produit nul dans $\\mathbb{R}$. Répondre sous la forme : x=... ou x=...",
          ans,
          aliases,
          steps: [
            `Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul.`,
            `Posez le premier facteur égal à 0 : $${f1} = 0 \\implies x = ${x1}$.`,
            `Posez le second facteur égal à 0 : $${f2} = 0 \\implies x = ${x2}$.`,
            `Résultat final : $x = ${x1}$ ou $x = ${x2}$.`
          ]
        };
      },
      () => {
        const a = rnd(-5, -2); // Negative coefficient is crucial
        const x = rnd(-5, 5);
        const b = a * x;
        // ax < b => x > x (since a is negative, flip sign!)
        const ans = `x>${x}`;
        const aliases = [`x > ${x}`];
        return {
          eq: `${a}x < ${b}`,
          instr: "Résoudre cette inéquation (faites attention au signe du coefficient de $x$ !). Répondre sous la forme x>a ou x<a.",
          ans,
          aliases,
          steps: [
            `Pour isoler $x$, vous devez diviser les deux côtés par $${a}$.`,
            `Comme le diviseur $${a}$ est **négatif**, vous devez **inverser le sens de l'inégalité** ($<$ devient $>$).`,
            `Effectuez la division : $x > \\frac{${b}}{${a}} \\implies x > ${x}$.`,
            `Résultat final : $x > ${x}$ (l'intervalle est $]${x} ; +\\infty[$).`
          ]
        };
      }
    ],
    intermediaire: [
      () => {
        // Equation with fraction: (ax+b)/(cx+d) = 0
        // Root is -b/a, C.E. is x != -d/c
        // Let's make root = x1, value for denominator zero = x2
        const x1 = rnd(-4, 4);
        let x2 = rnd(-4, 4);
        while (x2 === x1) { x2 = rnd(-4, 4); }
        
        const a = rnd(1, 3);
        const c = rnd(1, 3);
        
        const b = -a * x1;
        const d = -c * x2;
        
        const num = `${a === 1 ? '' : a}x ${b >= 0 ? '+' : ''}${b}`;
        const den = `${c === 1 ? '' : c}x ${d >= 0 ? '+' : ''}${d}`;
        
        return {
          eq: `\\dfrac{${num}}{${den}} = 0`,
          instr: `Résoudre l'équation dans $\\mathbb{R}$ en précisant implicitement la valeur interdite.`,
          ans: String(x1),
          steps: [
            `Condition d'existence (C.E.) : le dénominateur ne doit pas s'annuler. $${den} \\neq 0 \\implies x \\neq ${x2}$.`,
            `Une fraction est nulle si et seulement si son numérateur est nul (et le dénominateur est non nul) : $${num} = 0$.`,
            `Résolvez le numérateur : $${a}x = ${-b} \\implies x = ${x1}$.`,
            `Vérifiez par rapport à la C.E. : $x = ${x1}$ est bien différent de la valeur interdite $${x2}$.`,
            `La solution unique est donc $x = ${x1}$.`
          ]
        };
      }
    ]
  }
};

// Check answer normalizing everything
export function checkAnswer(userInput: string, correct: string, aliases?: string[]): boolean {
  const norm = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '') // remove spaces
      .replace(/×/g, '*') // normalize multipliers
      .replace(/−/g, '-') // normalize minus signs
      .replace(/[\u2212\u2013\u2014]/g, '-') // common dash/minus characters
      .replace(/\^/g, '^') // ensure power caret is correct
      .replace(/ou/g, 'ou') // keep 'ou' delimiter
      .replace(/;/g, ',') // normalize separators
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

  // Support order of roots for equations like "x=3 ou x=-2" vs "x=-2 ou x=3"
  if (cleanCorrect.includes('ou') && cleanUser.includes('ou')) {
    const correctParts = cleanCorrect.split('ou').sort();
    const userParts = cleanUser.split('ou').sort();
    if (correctParts.length === userParts.length) {
      return correctParts.every((part, idx) => part === userParts[idx]);
    }
  }

  // Support factor ordering like "(x-3)(x+3)" vs "(x+3)(x-3)"
  const factorRegex = /^\(([^)]+)\)\(([^)]+)\)$/;
  const matchCorrect = cleanCorrect.match(factorRegex);
  const matchUser = cleanUser.match(factorRegex);
  if (matchCorrect && matchUser) {
    const c1 = matchCorrect[1];
    const c2 = matchCorrect[2];
    const u1 = matchUser[1];
    const u2 = matchUser[2];
    if ((u1 === c1 && u2 === c2) || (u1 === c2 && u2 === c1)) {
      return true;
    }
  }

  return false;
}
