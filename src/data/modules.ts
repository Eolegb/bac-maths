export interface Rule {
  head: string;
  body: string;
  eq: string;
  piege: string;
  etapes: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  sub: string;
  rules: Rule[];
}

export interface BacExercise {
  title: string;
  enonce: string;
  correction: string;
  points: string[];
  keyTerms: string[];
}

export const MODULES: ModuleData[] = [
  {
    id: 0,
    title: "Signes & priorités",
    sub: "Les règles de calcul de base indispensables pour éviter les erreurs de signe et d'inattention.",
    rules: [
      {
        head: "Règle des signes (Multiplication & Division)",
        body: "Deux signes identiques donnent un résultat positif ($+$), deux signes différents donnent un résultat négatif ($-$). Attention : cette règle ne s'applique qu'au produit et au quotient.",
        eq: "(-3) \\times (-4) = 12 \\quad \\text{et} \\quad (-5) \\times 2 = -10",
        piege: "Ne confondez pas avec l'addition : $-3 + (-4) = -7$ (on ne multiplie pas, on accumule les valeurs négatives).",
        etapes: [
          "Identifier les signes des deux nombres à multiplier ou diviser.",
          "Appliquer la règle : même signe $\\rightarrow$ $+$, signes contraires $\\rightarrow$ $-$.",
          "Multiplier ou diviser les valeurs numériques absolues."
        ]
      },
      {
        head: "Priorités opératoires (PEMDAS)",
        body: "L'ordre des opérations doit toujours être respecté : 1. Parenthèses, 2. Exposants (puissances), 3. Multiplications et Divisions (de gauche à droite), 4. Additions et Soustractions (de gauche à droite).",
        eq: "5 + 2 \\times (-3)^2 = 5 + 2 \\times 9 = 5 + 18 = 23",
        piege: "Calculer de gauche à droite sans priorité : faire $5 + 2 = 7$ puis multiplier est une erreur classique.",
        etapes: [
          "Calculer l'intérieur des parenthèses les plus internes d'abord.",
          "Calculer les puissances (carrés, cubes, etc.).",
          "Effectuer les multiplications et divisions de gauche à droite.",
          "Effectuer les additions et soustractions en dernier."
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Développer & réduire",
    sub: "Transformer un produit en somme algébrique en utilisant la distributivité et les identités remarquables.",
    rules: [
      {
        head: "Distributivité simple et double",
        body: "Distribuer consiste à multiplier le facteur externe par chaque terme de la parenthèse. La double distributivité applique ce principe à deux parenthèses.",
        eq: "k(a+b) = ka+kb \\quad \\text{et} \\quad (a+b)(c+d) = ac + ad + bc + bd",
        piege: "Dans $k(a - b)$, n'oubliez pas le signe moins : $k(a - b) = ka - kb$.",
        etapes: [
          "Identifier les termes à multiplier.",
          "Distribuer le premier facteur sur tous les termes suivants.",
          "Multiplier les coefficients et regrouper les puissances de $x$."
        ]
      },
      {
        head: "Identités remarquables",
        body: "Trois formules indispensables à connaître par cœur pour développer instantanément les expressions carrées.",
        eq: "(a+b)^2 = a^2 + 2ab + b^2 \\quad (a-b)^2 = a^2 - 2ab + b^2 \\quad (a-b)(a+b) = a^2 - b^2",
        piege: "Oublier le double produit ($2ab$) : $(x + 3)^2$ n'est pas égal à $x^2 + 9$, mais à $x^2 + 6x + 9$ !",
        etapes: [
          "Identifier la formule correspondante (somme carrée, différence carrée, ou produit conjugué).",
          "Déterminer les termes représentant $a$ et $b$.",
          "Appliquer la formule en faisant attention aux carrés (ex: $(2x)^2 = 4x^2$)."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Factoriser",
    sub: "Transformer une somme algébrique en produit de facteurs — la clé pour résoudre des équations complexes.",
    rules: [
      {
        head: "Recherche du facteur commun",
        body: "Identifier un diviseur ou un groupe commun à tous les termes pour le placer en facteur.",
        eq: "6x^2 - 9x = 3x(2x - 3) \\quad \\text{et} \\quad (x+2)(2x-1) + (x+2)(x-3) = (x+2)(3x - 4)",
        piege: "Quand le facteur commun est tout un terme, ne pas oublier le $1$ restant. Ex: $(x+2) + (x+2)(x-3) = (x+2)(1 + x - 3)$.",
        etapes: [
          "Analyser chaque terme pour repérer un nombre ou une expression en commun.",
          "Extraire ce facteur commun et ouvrir des crochets.",
          "Écrire le reste des termes à l'intérieur des crochets, puis simplifier."
        ]
      },
      {
        head: "Factorisation par identité remarquable",
        body: "Reconnaître une structure de type $a^2 - b^2$ pour la factoriser en produit conjugué.",
        eq: "a^2 - b^2 = (a - b)(a + b) \\quad \\text{ex:} \\quad 9x^2 - 16 = (3x - 4)(3x + 4)",
        piege: "Oublier de prendre la racine carrée des coefficients. Ex: $4x^2 - 25$ se factorise en $(2x-5)(2x+5)$, pas $(4x-25)(4x+25)$.",
        etapes: [
          "Vérifier si l'expression comporte deux termes séparés par un signe moins.",
          "Prendre la racine carrée de chaque terme pour identifier $a$ et $b$.",
          "Écrire la forme factorisée : $(a - b)(a + b)$."
        ]
      }
    ]
  }
];

export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  0: [
    {
      title: "Sujet Blanc 2026 - Automatismes 1",
      enonce: "Donner une valeur approchée de l'expression suivante : \n\n $$A = 2 + 10^{-15}$$",
      correction: "Comme $10^{-15}$ est un nombre extrêmement petit (proche de $0$), on a : \n\n $$2 + 10^{-15} \\approx 2$$",
      points: ["Compréhension des puissances négatives", "Ordre de grandeur"],
      keyTerms: ["2", "proche de 0"]
    },
    {
      title: "Sujet Blanc 2026 - Automatismes 2",
      enonce: "Un article augmente de $20\\%$ puis diminue de $20\\%$. Le prix final est-il égal au prix initial ?",
      correction: "Non. Augmenter de $20\\%$ revient à multiplier par $1,2$. Diminuer de $20\\%$ revient à multiplier par $0,8$. \n\n Multiplicateur global : $1,2 \\times 0,8 = 0,96$. \n\n Le prix a donc baissé de $4\\%$ ($1 - 0,96 = 0,04$).",
      points: ["Coefficients multiplicateurs", "Variation globale"],
      keyTerms: ["0,96", "inférieur", "4%"]
    },
    {
      title: "Sujet Blanc 2026 - Automatismes 3",
      enonce: "Calculer l'image de $-1$ par la fonction $f(x) = -x^2 + 2x + 3$.",
      correction: "$f(-1) = -(-1)^2 + 2(-1) + 3$ \n\n $f(-1) = -(1) - 2 + 3$ \n\n $f(-1) = -1 - 2 + 3 = 0$",
      points: ["Substitution correcte", "Gestion des carrés et signes"],
      keyTerms: ["0", "f(-1)=0"]
    }
  ],
  1: [
    {
      title: "Développement complexe (E3C)",
      enonce: "Développer et réduire l'expression suivante : \n\n $$C(x) = (2x + 1)(3x - 7)$$ \n\n (Extrait du sujet blanc 2026)",
      correction: "$C(x) = 2x \\times 3x + 2x \\times (-7) + 1 \\times 3x + 1 \\times (-7)$ \n\n $C(x) = 6x^2 - 14x + 3x - 7$ \n\n $C(x) = 6x^2 - 11x - 7$",
      points: ["Double distributivité", "Réduction des termes en x"],
      keyTerms: ["6x^2", "-11x", "-7"]
    }
  ],
  2: [
    {
      title: "Géométrie et Factorisation",
      enonce: "Le quadrilatère $ABCD$ est un carré de côté $4$. On place $M$ sur $[AB]$, $N$ sur $[BC]$, $P$ sur $[CD]$ et $Q$ sur $[DA]$ tels que $AM=BN=CP=DQ=x$. \n\n Montrer que l'aire du carré $MNPQ$ est $f(x) = 2x^2 - 8x + 16$.",
      correction: "L'aire de $MNPQ$ est l'aire de $ABCD$ ($4^2 = 16$) moins l'aire des 4 triangles rectangles identiques. \n\n Un triangle (ex: $AMQ$) a pour base $x$ et pour hauteur $(4-x)$. \n\n Aire d'un triangle : $\\dfrac{x(4-x)}{2}$. \n\n Somme des 4 triangles : $4 \\times \\dfrac{4x - x^2}{2} = 2(4x - x^2) = 8x - 2x^2$. \n\n Aire $MNPQ = 16 - (8x - 2x^2) = 2x^2 - 8x + 16$.",
      points: ["Calcul d'aire par soustraction", "Modélisation en fonction de x"],
      keyTerms: ["16", "2x^2-8x+16"]
    }
  ]
};
