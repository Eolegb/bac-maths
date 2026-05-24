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
  // ========== MODULE 0 : DÉRIVATION ==========
  0: {
    debutant: [
      () => {
        const n = rnd(2, 6);
        const coef = [2, 3, 4, 5, -2, -3][rnd(0, 5)];
        const res = coef * n;
        return {
          category: "Puissances",
          eq: `f(x) = ${coef}x^${n}`,
          instr: "Calculer $f'(x)$.",
          ans: `${res}x^${n-1}`,
          aliases: [`${res}x^{${n - 1}}`],
          steps: [`$(x^${n})' = ${n}x^{${n-1}}$`, `$f'(x) = ${coef} \\times ${n}x^{${n-1}} = ${res}x^{${n-1}}$`],
          pourquoi: "On descend l'exposant devant et on le réduit de 1. Le coefficient reste."
        };
      },
      () => {
        const a = rndNZ(-5, 5);
        const b = rndNZ(-5, 5);
        const c = rndNZ(-5, 5);
        return {
          category: "Somme de fonctions",
          eq: `f(x) = ${a}x^3 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: "Calculer $f'(x)$.",
          ans: `${3 * a}x^2 ${b >= 0 ? '+' : ''}${b}`,
          steps: [`$(x^3)' = 3x^2$, $(${b}x)' = ${b}$, $(${c})' = 0$`, `$f'(x) = ${3 * a}x^2 ${b >= 0 ? '+' : ''}${b}$`],
          pourquoi: "On dérive chaque terme séparément. La dérivée d'une constante est toujours 0."
        };
      },
      () => {
        const a = rnd(1, 4);
        return {
          category: "Nombre dérivé",
          eq: `f(x) = x^2, \\quad a = ${a}`,
          instr: `Calculer le nombre d\u00e9riv\u00e9 $f'(${a})$ (pente de la tangente).`,
          ans: String(2 * a),
          steps: [`$f'(x) = 2x$`, `$f'(${a}) = 2 \\times ${a} = ${2 * a}$`],
          pourquoi: "Le nombre dérivé en a est la pente de la tangente à la courbe au point d'abscisse a."
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rndNZ(-3, 3);
        const b = rndNZ(-4, 4);
        const resA = 3 * a;
        const resB = 2 * b;
        return {
          category: "Produit uv",
          eq: `f(x) = (${a}x ${b >= 0 ? '+' : ''}${b}) \\times x^2`,
          instr: "Calculer $f'(x)$ en utilisant la formule du produit.",
          ans: `${resA}x^2 ${resB >= 0 ? '+' : ''}${resB}x`,
          aliases: [`${resA}x^{2} ${resB >= 0 ? '+' : ''}${resB}x`],
          steps: [`$u = ${a}x ${b >= 0 ? '+' : ''}${b}$, $u' = ${a}$`, `$v = x^2$, $v' = 2x$`, `$f' = u'v + uv' = ${a} \\cdot x^2 + (${a}x ${b >= 0 ? '+' : ''}${b}) \\cdot 2x = ${a}x^2 + ${2*a}x^2 ${2*b >= 0 ? '+' : ''}${2*b}x$`, `$= ${resA}x^2 ${resB >= 0 ? '+' : ''}${resB}x$`],
          pourquoi: "Ne jamais dériver chaque facteur séparément. Toujours appliquer u'v + uv' et développer."
        };
      },
      () => {
        const mp = rndNZ(-3, 3);
        const sign = mp > 0;
        const mstr = sign ? `+${mp}` : `${mp}`;
        const crois = mp > 0 ? "croissante" : "décroissante";
        return {
          category: "Variations",
          eq: `f'(x) = ${mstr}`,
          instr: `Quel est le sens de variation de $f$ ? (justifier avec le signe de $f'$)`,
          ans: crois,
          steps: [`$f'(x) = ${mstr}$ est ${sign ? 'positif' : 'négatif'} pour tout $x$.`, `Donc $f$ est ${crois} sur $\\mathbb{R}$.`],
          pourquoi: "Le signe de la dérivée donne le sens de variation. Si f' est positive, f monte. Si f' est négative, f descend."
        };
      },
      () => {
        const a = rndNZ(-3, 3);
        const b = rndNZ(-5, 5);
        const c = rndNZ(-2, 2);
        const fprime = `${2 * a}x ${b >= 0 ? '+' : ''}${b}`;
        const rac = -b / (2 * a);
        const sign = a > 0;
        return {
          category: "Tableau de variations",
          eq: `f(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: `Donner le tableau de variations de $f$ (sens de variation avant/apr\u00e8s le sommet).`,
          ans: `${sign ? 'décroissante puis croissante' : 'croissante puis décroissante'}`,
          steps: [`$f'(x) = ${fprime}$`, `$f'(x) = 0 \\iff x = ${Math.round(rac * 10) / 10}$`, `$a = ${a} ${sign ? '> 0' : '< 0'}$ donc ${sign ? 'd\u00e9croissante avant le sommet, croissante apr\u00e8s' : 'croissante avant, d\u00e9croissante apr\u00e8s'}.`],
          pourquoi: "Pour un trinôme, le signe de a détermine tout : a > 0 → parabole en U (décroît puis croît), a < 0 → parabole en ∩.",
          plot: {
            type: "function",
            data: { fn: (x: number) => a * x * x + b * x + c, domain: [-6, 6], range: [-8, 8], points: [{ x: -b / (2 * a), y: (-b * b + 4 * a * c) / (4 * a), color: "#f0c040" }] }
          }
        };
      }
    ]
  },

  // ========== MODULE 1 : FONCTION EXPONENTIELLE ==========
  1: {
    debutant: [
      () => {
        const a = rnd(1, 5);
        const b = rnd(1, 5);
        return {
          category: "Produit",
          eq: `e^{${a}} \\times e^{${b}}`,
          instr: "Simplifier sous la forme $e^n$.",
          ans: `e^{${a + b}}`,
          steps: [`$e^a \\times e^b = e^{a+b}$`, `$e^{${a}} \\times e^{${b}} = e^{${a + b}}$`],
          pourquoi: "L'exponentielle transforme une somme d'exposants en produit : e^a × e^b = e^(a+b)."
        };
      },
      () => {
        const a = rnd(3, 8);
        const b = rnd(1, a - 1);
        return {
          category: "Quotient",
          eq: `\\dfrac{e^{${a}}}{e^{${b}}}`,
          instr: "Simplifier sous la forme $e^n$.",
          ans: `e^{${a - b}}`,
          steps: [`$\\dfrac{e^a}{e^b} = e^{a-b}$`, `$\\dfrac{e^{${a}}}{e^{${b}}} = e^{${a - b}}$`],
          pourquoi: "Pour une division d'exponentielles, on soustrait les exposants."
        };
      },
      () => {
        return {
          category: "Valeur de base",
          eq: "e^0 = ? \\qquad e^1 = ?",
          instr: "Donner les deux valeurs fondamentales de l'exponentielle.",
          ans: "e^0=1, e^1=e",
          aliases: ["1 et e", "1, e", "e^0=1 e^1=e"],
          steps: [`$e^0 = 1$ (comme toute puissance)`, `$e^1 = e$ (par d\u00e9finition)`],
          pourquoi: "e^0 = 1 car toute puissance 0 vaut 1. e^1 = e par définition du nombre e ≈ 2,718."
        };
      }
    ],
    intermediaire: [
      () => {
        const coefs = [1, 2, 3, -2, -3];
        const k = coefs[rnd(0, coefs.length - 1)];
        return {
          category: "Dérivée e^u",
          eq: `f(x) = e^{${k}x}`,
          instr: "Calculer $f'(x)$.",
          ans: `${k}e^{${k}x}`,
          steps: [`$u(x) = ${k}x$, $u'(x) = ${k}$`, `$f'(x) = u' \\cdot e^u = ${k} \\cdot e^{${k}x}$`],
          pourquoi: "La dérivée de e^u est u' × e^u. On dérive l'exposant et on le place devant."
        };
      },
      () => {
        const a = rnd(2, 5);
        const b = rndNZ(-4, 4);
        const c = rndNZ(-3, 3);
        const coeff = a * 2;
        const uPrime = b === 0 ? `${coeff}x` : `${coeff}x ${b >= 0 ? '+' : ''}${b}`;
        const poly = `${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;
        return {
          category: "Dérivée e^u (composée)",
          eq: `f(x) = e^{${poly}}`,
          instr: "Calculer $f'(x)$.",
          ans: `(${uPrime})e^{${poly}}`,
          steps: [`$u(x) = ${poly}$`, `$u'(x) = ${uPrime}$`, `$f'(x) = u' \\cdot e^u = (${uPrime})e^{${poly}}$`],
          pourquoi: "On dérive l'exposant (comme un polynôme classique) et on le colle devant l'exponentielle. La constante c disparaît dans u'."
        };
      },
      () => {
        const a = rndNZ(-4, 4);
        const b = rndNZ(-5, 5);
        const target = a > 0 ? rnd(1, 4) : rnd(-3, -1);
        const rhs = a * target + b;
        return {
          category: "Équation",
          eq: `e^{${a}x ${b >= 0 ? '+' : ''}${b}} = e^{${rhs}}`,
          instr: "Résoudre l'équation.",
          ans: String(target),
          steps: [`$e^A = e^B \\iff A = B$`, `$${a}x ${b >= 0 ? '+' : ''}${b} = ${rhs}$`, `$${a}x = ${rhs - b}$, $x = ${target}$`],
          pourquoi: "Deux exponentielles sont égales si et seulement si leurs exposants sont égaux. L'exponentielle est injective."
        };
      }
    ]
  },

  // ========== MODULE 2 : SUITES NUMÉRIQUES ==========
  2: {
    debutant: [
      () => {
        const u0 = rnd(1, 10);
        const r = rndNZ(-5, 5);
        const n = rnd(2, 5);
        const un = u0 + n * r;
        return {
          category: "Terme arithmétique",
          eq: `u_0 = ${u0}, \\quad r = ${r}`,
          instr: `Calculer $u_{${n}}$ (suite arithmétique).`,
          ans: String(un),
          steps: [`$u_n = u_0 + nr$`, `$u_{${n}} = ${u0} + ${n} \\times ${r < 0 ? '(' + r + ')' : r} = ${un}$`],
          pourquoi: "Pour une suite arithmétique, on ajoute n fois la raison au terme initial."
        };
      },
      () => {
        const u0 = rnd(1, 5);
        const q = rnd(2, 4);
        const n = rnd(2, 4);
        const un = u0 * Math.pow(q, n);
        return {
          category: "Terme géométrique",
          eq: `u_0 = ${u0}, \\quad q = ${q}`,
          instr: `Calculer $u_{${n}}$ (suite géométrique).`,
          ans: String(un),
          steps: [`$u_n = u_0 \\times q^n$`, `$u_{${n}} = ${u0} \\times ${q}^${n} = ${u0} \\times ${Math.pow(q, n)} = ${un}$`],
          pourquoi: "Pour une suite géométrique, on multiplie n fois par la raison. Attention : c'est q^n, pas n×q."
        };
      },
      () => {
        const vals = [
          { term: `u_n = 3 + 2n`, nature: "Arithmétique" },
          { term: `u_n = 4 \\times 3^n`, nature: "Géométrique" },
          { term: `u_n = 5 - n`, nature: "Arithmétique" },
          { term: `u_n = 2^n`, nature: "Géométrique" },
          { term: `u_n = 10 + 5n`, nature: "Arithmétique" },
          { term: `u_n = 7 \\times 0,5^n`, nature: "Géométrique" }
        ];
        const v = vals[rnd(0, vals.length - 1)];
        return {
          category: "Nature",
          eq: v.term,
          instr: "Quelle est la nature de cette suite ?",
          ans: v.nature,
          steps: [`Si $u_n = u_0 + nr$ → arithmétique.`, `Si $u_n = u_0 \\times q^n$ → géométrique.`],
          pourquoi: "Arithmétique = addition répétée (forme a + bn). Géométrique = multiplication répétée (forme a × b^n)."
        };
      }
    ],
    intermediaire: [
      () => {
        const u0 = rnd(1, 5);
        const r = rnd(2, 4);
        const n = rnd(4, 8);
        const un = u0 + n * r;
        const sumArith = (n + 1) * (u0 + un) / 2;
        return {
          category: "Somme arithmétique",
          eq: `u_0 = ${u0}, \\quad r = ${r}`,
          instr: `Calculer la somme $S = u_0 + u_1 + \\cdots + u_{${n}}$ (${n + 1} termes).`,
          ans: String(sumArith),
          steps: [`$u_{${n}} = u_0 + nr = ${u0} + ${n} \\times ${r} = ${un}$`, `Nombre de termes : ${n + 1}`, `$S = (\\text{nb}) \\times \\frac{u_{\\text{premier}} + u_{\\text{dernier}}}{2} = ${n + 1} \\times \\frac{${u0} + ${un}}{2} = ${sumArith}$`],
          pourquoi: "Somme arithmétique = moyenne des extrêmes × nombre de termes. Attention : de u_0 à u_n, il y a n+1 termes."
        };
      },
      () => {
        const u0 = rnd(1, 3);
        const q = 2;
        const n = rnd(3, 5);
        const sumGeo = u0 * (1 - Math.pow(q, n + 1)) / (1 - q);
        return {
          category: "Somme géométrique",
          eq: `u_0 = ${u0}, \\quad q = ${q}`,
          instr: `Calculer la somme $S = u_0 + u_1 + \\cdots + u_{${n}}$.`,
          ans: String(sumGeo),
          steps: [`$S = u_0 \\times \\frac{1 - q^{\\text{nb}}}{1 - q}$`, `$= ${u0} \\times \\frac{1 - ${q}^{${n + 1}}}{1 - ${q}} = ${u0} \\times \\frac{1 - ${Math.pow(q, n + 1)}}{-1}$`, `$= ${u0} \\times ${Math.pow(q, n + 1) - 1} = ${sumGeo}$`],
          pourquoi: "Formule de la somme géométrique. Attention au nombre de termes (n+1 si on commence à u_0)."
        };
      },
      () => {
        const r = rndNZ(-4, 4);
        const sens = r > 0 ? "croissante" : r < 0 ? "décroissante" : "constante";
        return {
          category: "Monotonie",
          eq: `u_{n+1} = u_n ${r >= 0 ? '+' : ''}${r}`,
          instr: "Déterminer le sens de variation de cette suite.",
          ans: sens,
          steps: [`$u_{n+1} - u_n = ${r}$`, `Signe de la différence : ${r > 0 ? 'positif' : r < 0 ? 'négatif' : 'nul'}.`, `Donc la suite est ${sens}.`],
          pourquoi: "Pour une suite arithmétique, la variation dépend directement du signe de la raison r."
        };
      }
    ]
  },

  // ========== MODULE 3 : SECOND DEGRÉ ==========
  3: {
    debutant: [
      () => {
        const a = 1;
        const x1 = rnd(-3, -1);
        const x2 = rnd(1, 3);
        const b = -(x1 + x2);
        const c = x1 * x2;
        const delta = b * b - 4 * a * c;
        return {
          category: "Racines (discriminant)",
          eq: `x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`,
          instr: "Trouver les deux racines de cette équation.",
          ans: `${x1} et ${x2}`,
          aliases: [`${x1} ou ${x2}`, `${x2} et ${x1}`, `${x2} ou ${x1}`],
          steps: [`$\\Delta = ${b}^2 - 4 \\times 1 \\times ${c < 0 ? '(' + c + ')' : c} = ${b * b} ${-4 * c >= 0 ? '+' : ''}${-4 * c} = ${delta}$`, `$\\sqrt{\\Delta} = ${Math.round(Math.sqrt(delta))}$`, `$x_1 = \\frac{${-b} - ${Math.round(Math.sqrt(delta))}}{2} = ${x1}$, $x_2 = \\frac{${-b} + ${Math.round(Math.sqrt(delta))}}{2} = ${x2}$`],
          pourquoi: "On calcule Δ puis les racines avec la formule -b ± √Δ / 2a. Le discriminant permet de savoir combien de solutions existent.",
          plot: {
            type: "function",
            data: { fn: (x: number) => x * x + b * x + c, domain: [-6, 6], range: [-6, 10], points: [{ x: x1, y: 0 }, { x: x2, y: 0 }] }
          }
        };
      },
      () => {
        const alpha = rnd(-4, 4);
        const beta = rnd(-5, 5);
        const b = -2 * alpha;
        const c = alpha * alpha + beta;
        return {
          category: "Sommet (alpha)",
          eq: `f(x) = x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: "Donner l'abscisse $\\alpha$ du sommet de cette parabole.",
          ans: String(alpha),
          steps: [`$\\alpha = -\\dfrac{b}{2a} = -\\dfrac{${b}}{2 \\times 1} = ${alpha}$`],
          pourquoi: "L'abscisse du sommet se calcule avec α = -b/(2a). Le sommet est le point où la parabole change de sens.",
          plot: {
            type: "function",
            data: { fn: (x: number) => x * x + b * x + c, domain: [-6, 6], range: [-10, 8], points: [{ x: alpha, y: beta, color: "#f0c040" }] }
          }
        };
      },
      () => {
        const a = rndNZ(-3, 3);
        const b = rndNZ(-6, 6);
        return {
          category: "Calcul de Δ",
          eq: `f(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x`,
          instr: "Calculer le discriminant $\\Delta$ de ce trinôme (avec $c=0$).",
          ans: String(b * b),
          steps: [`$a = ${a}$, $b = ${b}$, $c = 0$`, `$\\Delta = b^2 - 4ac = ${b}^2 - 4 \\times ${a} \\times 0 = ${b * b}$`],
          pourquoi: "Quand c = 0, Δ = b². Attention à toujours mettre b entre parenthèses s'il est négatif : (-3)² = 9, pas -9."
        };
      }
    ],
    intermediaire: [
      () => {
        const a = rndNZ(-3, 3);
        const alpha = rnd(-2, 2);
        const beta = rnd(-4, 4);
        const b = -2 * a * alpha;
        const c = a * alpha * alpha + beta;
        return {
          category: "Forme canonique",
          eq: `f(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: "Mettre $f$ sous forme canonique $a(x - \\alpha)^2 + \\beta$.",
          ans: `${a}(x ${alpha >= 0 ? '-' : '+'}${Math.abs(alpha)})^2 ${beta >= 0 ? '+' : ''}${beta}`,
          steps: [`$\\alpha = -b/(2a) = ${alpha}$`, `$\\beta = f(\\alpha) = ${beta}$`, `$f(x) = ${a}(x - (${alpha}))^2 + ${beta}$`],
          pourquoi: "La forme canonique révèle le sommet S(α;β) et permet d'étudier les variations sans calculer la dérivée."
        };
      },
      () => {
        const a = rndNZ(-3, 3);
        const x1 = rnd(-4, -1);
        const x2 = rnd(1, 4);
        const b = -a * (x1 + x2);
        const c = a * x1 * x2;
        const sign = a > 0 ? "positif" : "négatif";
        return {
          category: "Signe du trinôme",
          eq: `f(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`,
          instr: `D\u00e9terminer le signe de $f(x)$ pour $x = 0$ et $x = ${x2 + 1}$.`,
          ans: `${a > 0 ? (c > 0 ? 'positif' : 'négatif') : (c > 0 ? 'négatif' : 'positif')} puis ${sign}`,
          steps: [`Racines : $x_1 = ${x1}$, $x_2 = ${x2}$`, `$a = ${a}$ ${a > 0 ? '> 0' : '< 0'}$`, `$0$ est entre les racines → signe de $-a$`, `$${x2 + 1}$ est \u00e0 l'ext\u00e9rieur → signe de $a$`],
          pourquoi: "Entre les racines, le signe est celui de -a. À l'extérieur, c'est le signe de a. Le discriminant > 0 donne cette alternance."
        };
      },
      () => {
        const x1 = rnd(-4, -1);
        const x2 = rnd(1, 4);
        const b = -(x1 + x2);
        const c = x1 * x2;
        return {
          category: "Inéquation",
          eq: `x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} \\le 0`,
          instr: "Résoudre cette inéquation du second degré.",
          ans: `[${x1}; ${x2}]`,
          aliases: [`${x1} ≤ x ≤ ${x2}`, `x ∈ [${x1}; ${x2}]`, `x \\in [${x1}, ${x2}]`],
          steps: [`Racines : $x_1 = ${x1}$, $x_2 = ${x2}$`, `$a = 1 > 0$, donc le trinôme est n\u00e9gatif entre les racines.`, `Solution : $x \\in [${x1}; ${x2}]$.`],
          pourquoi: "Pour a > 0, le trinôme est ≤ 0 entre ses racines. Toujours faire le tableau de signes pour ne pas se tromper."
        };
      }
    ]
  },

  // ========== MODULE 4 : VARIABLES ALÉATOIRES ==========
  4: {
    debutant: [
      () => {
        const missing = 0.1 * rnd(1, 8);
        const known = Math.round((1 - missing) * 10) / 10;
        return {
          category: "Loi de probabilité",
          eq: `P(X=0)=${known.toFixed(1)}, \\quad P(X=1)=\\ ?`,
          instr: "Compléter la loi de probabilité (la somme doit faire 1).",
          ans: String(missing.toFixed(1)),
          steps: [`La somme des probabilit\u00e9s doit \u00eatre \u00e9gale \u00e0 $1$.`, `$1 - ${known.toFixed(1)} = ${missing.toFixed(1)}$`],
          pourquoi: "La somme de toutes les probabilités d'une loi vaut toujours 1. C'est le premier réflexe à avoir."
        };
      },
      () => {
        const x1 = 0;
        const x2 = 10;
        const p1 = 0.4;
        const p2 = 0.6;
        const e = x1 * p1 + x2 * p2;
        return {
          category: "Espérance simple",
          eq: "X \\in \\{0; 10\\}, \\quad P(X=0)=0{,}4, \\quad P(X=10)=0{,}6",
          instr: "Calculer l'espérance $E(X)$.",
          ans: String(e),
          steps: [`$E(X) = 0 \\times 0{,}4 + 10 \\times 0{,}6$`, `$= 0 + 6 = 6$`],
          pourquoi: "L'espérance est la moyenne pondérée des valeurs par leurs probabilités. Chaque valeur × sa proba, puis on somme."
        };
      },
      () => {
        const x1 = rnd(-5, 0);
        const x2 = rnd(1, 10);
        const x3 = rnd(10, 20);
        const p1 = Math.round(rnd(1, 4) * 10) / 100;
        const p2 = Math.round(rnd(2, 5) * 10) / 100;
        const p3 = Math.round((1 - p1 - p2) * 100) / 100;
        const e = x1 * p1 + x2 * p2 + x3 * p3;
        return {
          category: "Espérance (3 valeurs)",
          eq: `X \\in \\{${x1}; ${x2}; ${x3}\\}, \\quad P_1=${p1.toFixed(2)}, P_2=${p2.toFixed(2)}, P_3=${p3.toFixed(2)}`,
          instr: "Calculer l'espérance $E(X)$.",
          ans: String(Math.round(e * 100) / 100),
          steps: [`$E(X) = ${x1} \\times ${p1.toFixed(2)} + ${x2} \\times ${p2.toFixed(2)} + ${x3} \\times ${p3.toFixed(2)}$`, `$= ${Math.round(x1 * p1 * 100) / 100} + ${Math.round(x2 * p2 * 100) / 100} + ${Math.round(x3 * p3 * 100) / 100} = ${Math.round(e * 100) / 100}$`],
          pourquoi: "On multiplie chaque valeur par sa probabilité, puis on additionne. Les valeurs négatives diminuent l'espérance."
        };
      }
    ],
    intermediaire: [
      () => {
        const x1 = 0;
        const p1 = 0.3;
        const x2 = 5;
        const p2 = 0.5;
        const x3 = 10;
        const p3 = 0.2;
        const e = x1 * p1 + x2 * p2 + x3 * p3;
        const e2 = x1 * x1 * p1 + x2 * x2 * p2 + x3 * x3 * p3;
        const v = e2 - e * e;
        return {
          category: "Variance",
          eq: `X \\in \\{0; 5; 10\\}, \\quad P=(0{,}3; 0{,}5; 0{,}2)`,
          instr: "Calculer la variance $V(X)$ avec la formule $E(X^2) - [E(X)]^2$.",
          ans: String(v),
          steps: [`$E(X) = 0{,}3 \\times 0 + 0{,}5 \\times 5 + 0{,}2 \\times 10 = ${e}$`, `$E(X^2) = 0{,}3 \\times 0 + 0{,}5 \\times 25 + 0{,}2 \\times 100 = ${e2}$`, `$V(X) = ${e2} - ${e}^2 = ${e2} - ${e * e} = ${v}$`],
          pourquoi: "La variance = moyenne des carrés moins le carré de la moyenne. Ne pas confondre E(X²) et [E(X)]²."
        };
      },
      () => {
        const mise = rnd(2, 5);
        const gain = mise * 2;
        const probGain = 0.4;
        const probPerte = 0.6;
        const e = (gain - mise) * probGain + (-mise) * probPerte;
        const eRounded = Math.round(e * 10) / 10;
        const equitable = eRounded === 0 ? "équitable" : eRounded > 0 ? "favorable au joueur" : "défavorable au joueur";
        return {
          category: "Jeu équitable",
          eq: `\\text{Mise } = ${mise}\u20ac,\\ \\text{Gain } = ${gain}\u20ac\\ (P=${probGain}),\\ \\text{Perte } (P=${probPerte})`,
          instr: "Calculer l'espérance de gain algébrique et dire si le jeu est équitable.",
          ans: `${eRounded} \u20ac, ${equitable}`,
          steps: [`Gain alg\u00e9brique : gain brut $-$ mise = ${gain - mise}\u20ac ou $-$mise = ${-mise}\u20ac.`, `$E = ${gain - mise} \\times ${probGain} + (${-mise}) \\times ${probPerte} = ${eRounded}\u20ac$`, `$E ${eRounded > 0 ? '> 0' : eRounded < 0 ? '< 0' : '= 0'}$ → jeu ${equitable}.`],
          pourquoi: "Un jeu est équitable si E = 0. Il faut toujours soustraire la mise pour obtenir le gain algébrique."
        };
      },
      () => {
        const x1 = 0;
        const x2 = 5;
        const p1 = 0.3;
        const p2 = 0.7;
        const e = x1 * p1 + x2 * p2;
        const e2 = x1 * x1 * p1 + x2 * x2 * p2;
        const v = e2 - e * e;
        const sigma = Math.sqrt(v);
        return {
          category: "Écart-type",
          eq: `X \\in \\{0; 5\\}, \\quad P=(0{,}3; 0{,}7)`,
          instr: "Calculer l'écart-type $\\sigma(X)$ (arrondir au centième).",
          ans: String(Math.round(sigma * 100) / 100),
          steps: [`$E(X) = ${e}$`, `$V(X) = E(X^2) - [E(X)]^2 = ${e2} - ${e * e} = ${v}$`, `$\\sigma = \\sqrt{${v}} \\approx ${Math.round(sigma * 100) / 100}$`],
          pourquoi: "L'écart-type = √(variance). Il mesure la dispersion moyenne autour de l'espérance, dans la même unité que X."
        };
      }
    ]
  },

  // ========== MODULE 5 : PROBA CONDITIONNELLES ==========
  5: {
    debutant: [
      () => {
        const pa = Math.round(rnd(1, 8) * 10) / 100;
        const pasb = Math.round(rnd(1, 9) * 10) / 100;
        const res = Math.round(pa * pasb * 100) / 100;
        return {
          category: "Intersection",
          eq: `P(A) = ${pa.toFixed(2)}, \\quad P_A(B) = ${pasb.toFixed(2)}`,
          instr: "Calculer $P(A \\cap B)$.",
          ans: String(res),
          steps: [`$P(A \\cap B) = P(A) \\times P_A(B)$`, `$${pa.toFixed(2)} \\times ${pasb.toFixed(2)} = ${res}$`],
          pourquoi: "Sur un arbre, on multiplie le long du chemin. P(A∩B) = P(A) × P_A(B)."
        };
      },
      () => {
        const pa = Math.round(rnd(2, 5) * 10) / 100;
        const pai = Math.round(pa * rnd(3, 8) * 10) / 100;
        const res = Math.round(pai / pa * 100) / 100;
        return {
          category: "Conditionnelle",
          eq: `P(A) = ${pa.toFixed(2)}, \\quad P(A \\cap B) = ${pai.toFixed(2)}`,
          instr: "Calculer $P_A(B)$.",
          ans: String(res),
          steps: [`$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$`, `$= \\dfrac{${pai.toFixed(2)}}{${pa.toFixed(2)}} = ${res}$`],
          pourquoi: "La probabilité conditionnelle = intersection divisée par la probabilité de la condition. On réduit l'univers à A."
        };
      },
      () => {
        const pa = 0.3;
        const pasb = 0.6;
        const pnona = 0.7;
        const pnonasb = 0.2;
        const pb = pa * pasb + pnona * pnonasb;
        return {
          category: "Arbre simple",
          eq: `P(A)=0{,}3,\\ P_A(B)=0{,}6,\\ P_{\\bar{A}}(B)=0{,}2`,
          instr: "Calculer $P(B)$ en utilisant l'arbre.",
          ans: String(pb),
          steps: [`$P(B) = P(A) \\times P_A(B) + P(\\bar{A}) \\times P_{\\bar{A}}(B)$`, `$= 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2 = 0{,}18 + 0{,}14 = 0{,}32$`],
          pourquoi: "B peut arriver via A ou via non-A. On additionne les deux chemins de l'arbre qui mènent à B."
        };
      }
    ],
    intermediaire: [
      () => {
        const pa = 0.3;
        const pasb = 0.8;
        const pnona = 0.7;
        const pnonasb = 0.1;
        const pb = pa * pasb + pnona * pnonasb;
        const pbas = pa * pasb / pb;
        return {
          category: "Formule de Bayes",
          eq: `P(A)=0{,}3,\\ P_A(B)=0{,}8,\\ P_{\\bar{A}}(B)=0{,}1`,
          instr: "Calculer $P_B(A)$ (probabilité de A sachant B).",
          ans: String(Math.round(pbas * 100) / 100),
          steps: [`$P(B) = 0{,}3 \\times 0{,}8 + 0{,}7 \\times 0{,}1 = ${pb}$`, `$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}3 \\times 0{,}8}{${pb}} \\approx ${Math.round(pbas * 100) / 100}$`],
          pourquoi: "La formule de Bayes permet d'inverser le conditionnement : passer de P_A(B) à P_B(A)."
        };
      },
      () => {
        const pa = Math.round(rnd(2, 5) * 10) / 100;
        const pasb = Math.round(rnd(3, 8) * 10) / 100;
        const pnona = Math.round((1 - pa) * 100) / 100;
        const pnonasb = Math.round(rnd(1, 4) * 10) / 100;
        const pb = Math.round((pa * pasb + pnona * pnonasb) * 100) / 100;
        return {
          category: "Probabilités totales",
          eq: `P(A)=${pa.toFixed(2)},\\ P_A(B)=${pasb.toFixed(2)},\\ P_{\\bar{A}}(B)=${pnonasb.toFixed(2)}`,
          instr: "Calculer $P(B)$ par la formule des probabilités totales.",
          ans: String(pb),
          steps: [`$P(B) = P(A)P_A(B) + P(\\bar{A})P_{\\bar{A}}(B)$`, `$= ${pa.toFixed(2)} \\times ${pasb.toFixed(2)} + ${pnona.toFixed(2)} \\times ${pnonasb.toFixed(2)}$`, `$= ${Math.round(pa * pasb * 100) / 100} + ${Math.round(pnona * pnonasb * 100) / 100} = ${pb}$`],
          pourquoi: "La formule des probabilités totales décompose P(B) en additionnant toutes les intersections qui mènent à B."
        };
      },
      () => {
        const pa = 0.5;
        const pasb = 0.7;
        const pnona = 0.5;
        const pnonasb = 0.3;
        const pb = pa * pasb + pnona * pnonasb;
        return {
          category: "Arbre complet",
          eq: `P(A)=0{,}5,\\ P_A(B)=0{,}7,\\ P_{\\bar{A}}(B)=0{,}3`,
          instr: "Construire l'arbre et calculer $P(\\bar{B})$.",
          ans: String(Math.round((1 - pb) * 100) / 100),
          steps: [`$P(B) = 0{,}5 \\times 0{,}7 + 0{,}5 \\times 0{,}3 = 0{,}35 + 0{,}15 = 0{,}5$`, `$P(\\bar{B}) = 1 - P(B) = 0{,}5$`],
          pourquoi: "La probabilité de l'événement contraire = 1 - P(B). Toujours vérifier qu'on a bien tous les chemins."
        };
      }
    ]
  },

  // ========== MODULE 6 : PRODUIT SCALAIRE ==========
  6: {
    debutant: [
      () => {
        const ux = rndNZ(-5, 5);
        const uy = rndNZ(-5, 5);
        const vx = rndNZ(-5, 5);
        const vy = rndNZ(-5, 5);
        const res = ux * vx + uy * vy;
        return {
          category: "Calcul analytique",
          eq: `\\vec{u}\\begin{pmatrix}${ux}\\\\${uy}\\end{pmatrix}, \\quad \\vec{v}\\begin{pmatrix}${vx}\\\\${vy}\\end{pmatrix}`,
          instr: "Calculer $\\vec{u} \\cdot \\vec{v}$.",
          ans: String(res),
          steps: [`$\\vec{u} \\cdot \\vec{v} = xx' + yy'$`, `$= ${ux} \\times ${vx < 0 ? '(' + vx + ')' : vx} + ${uy} \\times ${vy < 0 ? '(' + vy + ')' : vy} = ${ux * vx} ${uy * vy >= 0 ? '+' : ''}${uy * vy} = ${res}$`],
          pourquoi: "Produit scalaire = somme des produits des coordonnées correspondantes. Attention aux signes dans les multiplications."
        };
      },
      () => {
        const ux = rnd(1, 5);
        const uy = rnd(1, 5);
        const norm = Math.sqrt(ux * ux + uy * uy);
        const normRounded = Math.round(norm * 100) / 100;
        return {
          category: "Norme",
          eq: `\\vec{u}\\begin{pmatrix}${ux}\\\\${uy}\\end{pmatrix}`,
          instr: "Calculer la norme $\\|\\vec{u}\\|$ (arrondir au centième).",
          ans: String(normRounded),
          steps: [`$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$`, `$= \\sqrt{${ux}^2 + ${uy}^2} = \\sqrt{${ux * ux + uy * uy}}$`, `$\\approx ${normRounded}$`],
          pourquoi: "La norme = longueur du vecteur, obtenue par Pythagore. Si le résultat est entier, garder la valeur exacte."
        };
      },
      () => {
        const ux = rndNZ(-3, 3);
        const uy = rndNZ(-3, 3);
        const genOrth = rnd(0, 1) === 0;
        let vx: number, vy: number;
        if (genOrth) {
          vx = -uy;
          vy = ux;
        } else {
          vx = rndNZ(-3, 3);
          vy = rndNZ(-3, 3);
          if (ux * vx + uy * vy === 0) { vx += 1; }
        }
        const dot = ux * vx + uy * vy;
        return {
          category: "Orthogonalité",
          eq: `\\vec{u}\\begin{pmatrix}${ux}\\\\${uy}\\end{pmatrix}, \\quad \\vec{v}\\begin{pmatrix}${vx}\\\\${vy}\\end{pmatrix}`,
          instr: "Ces deux vecteurs sont-ils orthogonaux ? (oui/non)",
          ans: dot === 0 ? "oui" : "non",
          steps: [`$\\vec{u} \\cdot \\vec{v} = ${ux} \\times ${vx < 0 ? '(' + vx + ')' : vx} + ${uy} \\times ${vy < 0 ? '(' + vy + ')' : vy} = ${dot}$`, dot === 0 ? `$= 0$ → les vecteurs sont orthogonaux.` : `$\\neq 0$ → les vecteurs ne sont pas orthogonaux.`],
          pourquoi: "Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul. C'est un test infaillible."
        };
      }
    ],
    intermediaire: [
      () => {
        const angle = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, 3 * Math.PI / 4][rnd(0, 6)];
        const angleStr = ["0", "\\pi/6", "\\pi/4", "\\pi/3", "\\pi/2", "2\\pi/3", "3\\pi/4"][[0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, 3 * Math.PI / 4].indexOf(angle)];
        const nu = rnd(2, 5);
        const nv = rnd(2, 5);
        const cos = Math.cos(angle);
        const res = Math.round(nu * nv * cos * 100) / 100;
        return {
          category: "Avec cosinus",
          eq: `\\|\\vec{u}\\| = ${nu}, \\quad \\|\\vec{v}\\| = ${nv}, \\quad \\theta = ${angleStr}`,
          instr: "Calculer $\\vec{u} \\cdot \\vec{v}$ avec la formule du cosinus.",
          ans: String(res),
          steps: [`$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$`, `$= ${nu} \\times ${nv} \\times \\cos(${angleStr})$`, `$= ${nu * nv} \\times ${Math.round(cos * 1000) / 1000} \\approx ${res}$`],
          pourquoi: "Quand on connaît les normes et l'angle, on utilise la définition géométrique. cos(π/2) = 0 → produit scalaire nul."
        };
      },
      () => {
        const ux = rnd(1, 4);
        const uy = 0;
        const vx = rnd(1, 4);
        const vy = rnd(1, 4);
        const dot = ux * vx + uy * vy;
        const nu = Math.sqrt(ux * ux + uy * uy);
        const nv = Math.sqrt(vx * vx + vy * vy);
        const cosVal = dot / (nu * nv);
        const angleApprox = Math.round(Math.acos(Math.max(-1, Math.min(1, cosVal))) * 180 / Math.PI);
        return {
          category: "Angle entre vecteurs",
          eq: `\\vec{u}\\begin{pmatrix}${ux}\\\\${uy}\\end{pmatrix}, \\quad \\vec{v}\\begin{pmatrix}${vx}\\\\${vy}\\end{pmatrix}`,
          instr: "Calculer l'angle entre $\\vec{u}$ et $\\vec{v}$ (en degrés, arrondi).",
          ans: String(angleApprox),
          aliases: [`${angleApprox}°`, `${angleApprox} degrés`],
          steps: [`$\\vec{u} \\cdot \\vec{v} = ${ux} \\times ${vx} + ${uy} \\times ${vy} = ${dot}$`, `$\\|\\vec{u}\\| = ${nu}$, $\\|\\vec{v}\\| = ${Math.round(nv * 100) / 100}$`, `$\\cos\\theta = \\frac{${dot}}{${nu} \\times ${Math.round(nv * 100) / 100}} \\approx ${Math.round(cosVal * 1000) / 1000}$`, `$\\theta \\approx ${angleApprox}^\\circ$`],
          pourquoi: "cos θ = (u·v) / (||u|| × ||v||). Si cos θ > 0, l'angle est aigu. Si cos θ < 0, l'angle est obtus."
        };
      }
    ]
  },

  // ========== MODULE 7 : TRIGONOMÉTRIE ==========
  7: {
    debutant: [
      () => {
        const angles = [
          { deg: 30, rad: "\\pi/6", v: Math.PI / 6 },
          { deg: 45, rad: "\\pi/4", v: Math.PI / 4 },
          { deg: 60, rad: "\\pi/3", v: Math.PI / 3 },
          { deg: 90, rad: "\\pi/2", v: Math.PI / 2 },
          { deg: 180, rad: "\\pi", v: Math.PI }
        ];
        const a = angles[rnd(0, angles.length - 1)];
        return {
          category: "Conversion degrés → radians",
          eq: `${a.deg}^\\circ`,
          instr: "Convertir cet angle en radians.",
          ans: a.rad,
          steps: [`On multiplie par $\\pi/180$ : $${a.deg} \\times \\dfrac{\\pi}{180} = ${a.rad}$`],
          pourquoi: "Le radian est l'unité du cercle trigonométrique. 180° = π rad. Pour convertir : multiplier par π/180.",
          plot: { type: "cercle", data: { angle: a.v } }
        };
      },
      () => {
        const angles = [
          { angle: "0", cos: "1" },
          { angle: "\\pi/6", cos: "\\sqrt{3}/2" },
          { angle: "\\pi/4", cos: "\\sqrt{2}/2" },
          { angle: "\\pi/3", cos: "1/2" },
          { angle: "\\pi/2", cos: "0" }
        ];
        const a = angles[rnd(0, angles.length - 1)];
        return {
          category: "Cosinus remarquable",
          eq: `\\cos(${a.angle})`,
          instr: "Donner la valeur exacte de ce cosinus.",
          ans: a.cos,
          steps: [`Valeur \u00e0 conna\u00eetre par c\u0153ur : $\\cos(${a.angle}) = ${a.cos}$`],
          pourquoi: "Les cosinus des angles remarquables se lisent sur l'axe horizontal du cercle trigonométrique."
        };
      },
      () => {
        const angles = [
          { angle: "0", sin: "0" },
          { angle: "\\pi/6", sin: "1/2" },
          { angle: "\\pi/4", sin: "\\sqrt{2}/2" },
          { angle: "\\pi/3", sin: "\\sqrt{3}/2" },
          { angle: "\\pi/2", sin: "1" }
        ];
        const a = angles[rnd(0, angles.length - 1)];
        return {
          category: "Sinus remarquable",
          eq: `\\sin(${a.angle})`,
          instr: "Donner la valeur exacte de ce sinus.",
          ans: a.sin,
          steps: [`Valeur \u00e0 conna\u00eetre par c\u0153ur : $\\sin(${a.angle}) = ${a.sin}$`],
          pourquoi: "Les sinus des angles remarquables se lisent sur l'axe vertical du cercle trigonométrique."
        };
      }
    ],
    intermediaire: [
      () => {
        const angles = [
          { cos: "1/2", alpha: "\\pi/3" },
          { cos: "\\sqrt{3}/2", alpha: "\\pi/6" },
          { cos: "\\sqrt{2}/2", alpha: "\\pi/4" },
          { cos: "0", alpha: "\\pi/2" }
        ];
        const a = angles[rnd(0, angles.length - 1)];
        return {
          category: "Équation cos x = a",
          eq: `\\cos x = ${a.cos}`,
          instr: "Résoudre dans $\\mathbb{R}$ (donner les deux familles de solutions).",
          ans: `x = ${a.alpha} + 2k\\pi \\text{ ou } x = -${a.alpha} + 2k\\pi`,
          aliases: [`x = ${a.alpha} + 2k\\pi \\text{ ou } x = -${a.alpha} + 2k\\pi \\ (k \\in \\mathbb{Z})`, `${a.alpha} + 2k\\pi \\text{ ou } -${a.alpha} + 2k\\pi`],
          steps: [`$\\cos(${a.alpha}) = ${a.cos}$`, `1re famille : $x = ${a.alpha} + 2k\\pi$`, `2e famille : $x = -${a.alpha} + 2k\\pi$`, `$k \\in \\mathbb{Z}$`],
          pourquoi: "cos x = cos α a deux familles de solutions (symétrie / axe horizontal). Toujours donner les deux."
        };
      },
      () => {
        const sinVal = "1/2";
        const alphaStr = "\\pi/6";
        return {
          category: "Équation sin x = a",
          eq: `\\sin x = ${sinVal}`,
          instr: "Résoudre dans $\\mathbb{R}$ (donner les deux familles).",
          ans: `x = ${alphaStr} + 2k\\pi \\text{ ou } x = 5\\pi/6 + 2k\\pi`,
          aliases: [`x = ${alphaStr} + 2k\\pi \\text{ ou } x = \\pi - ${alphaStr} + 2k\\pi`],
          steps: [`$\\sin(${alphaStr}) = ${sinVal}$`, `1re famille : $x = ${alphaStr} + 2k\\pi$`, `2e famille : $x = \\pi - ${alphaStr} + 2k\\pi$`, `$k \\in \\mathbb{Z}$`],
          pourquoi: "sin x = sin α : 1re famille x = α, 2e famille x = π - α (symétrie / axe vertical)."
        };
      },
      () => {
        const cosVal = ["1/2", "\\sqrt{2}/2", "\\sqrt{3}/2", "3/5", "4/5"][rnd(0, 4)];
        const cosValNum = cosVal === "1/2" ? 0.5 : cosVal === "\\sqrt{2}/2" ? Math.sqrt(2) / 2 : cosVal === "\\sqrt{3}/2" ? Math.sqrt(3) / 2 : cosVal === "3/5" ? 0.6 : 0.8;
        const sinValNum = Math.sqrt(1 - cosValNum * cosValNum);
        const sinRounded = Math.round(sinValNum * 10000) / 10000;
        return {
          category: "cos² + sin² = 1",
          eq: `\\cos x = ${cosVal}, \\quad x \\in [0; \\pi/2]`,
          instr: "En d\u00e9duire $\\sin x$ avec la relation $\\cos^2 + \\sin^2 = 1$.",
          ans: String(sinRounded),
          steps: [`$\\sin^2 x = 1 - \\cos^2 x = 1 - (${cosVal})^2$`, `$= 1 - ${Math.round(cosValNum * cosValNum * 10000) / 10000} = ${Math.round(sinValNum * sinValNum * 10000) / 10000}$`, `$x \\in [0; \\pi/2]$ donc $\\sin x \\ge 0$, $\\sin x = ${sinRounded}$`],
          pourquoi: "cos² + sin² = 1 est la relation fondamentale. On isole sin², on prend la racine et on choisit le signe selon le quadrant."
        };
      }
    ]
  }
};

export function checkAnswer(userInput: string, correct: string, aliases?: string[]): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  const u = norm(userInput);
  const c = norm(correct);
  return u === c || (aliases?.some(a => norm(a) === u) ?? false);
}
