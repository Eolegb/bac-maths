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
    title: "Second degré",
    sub: "Étude des fonctions polynomiales de la forme $ax^2+bx+c$, racines et discriminant.",
    rules: [
      {
        head: "Discriminant et Racines",
        body: "Pour résoudre $ax^2 + bx + c = 0$, on calcule le discriminant $\\Delta = b^2 - 4ac$.",
        eq: "\\Delta = b^2 - 4ac",
        piege: "Si $\\Delta < 0$, il n'y a pas de racines réelles. Ne pas essayer de calculer $\\sqrt{\\Delta}$.",
        etapes: [
          "Identifier les coefficients $a, b, c$.",
          "Calculer $\\Delta$.",
          "Si $\\Delta > 0$, deux racines : $x_1 = \\frac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\frac{-b+\\sqrt{\\Delta}}{2a}$.",
          "Si $\\Delta = 0$, une racine double : $x_0 = -\\frac{b}{2a}$."
        ]
      },
      {
        head: "Forme factorisée et canonique",
        body: "Toute fonction du second degré peut s'écrire sous forme canonique pour faire apparaître le sommet $(\\alpha, \\beta)$.",
        eq: "f(x) = a(x-\\alpha)^2 + \\beta \\quad \\text{avec} \\quad \\alpha = -\\frac{b}{2a}",
        piege: "Dans la forme factorisée $a(x-x_1)(x-x_2)$, ne pas oublier le coefficient $a$ devant les parenthèses.",
        etapes: [
          "Calculer $\\alpha = -b/(2a)$.",
          "Calculer $\\beta = f(\\alpha)$.",
          "Écrire la forme $a(x-\\alpha)^2 + \\beta$."
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Suites Numériques",
    sub: "Modes de génération, sens de variation et étude des suites arithmétiques et géométriques.",
    rules: [
      {
        head: "Suites Arithmétiques",
        body: "Une suite est arithmétique si l'on passe d'un terme au suivant en ajoutant toujours le même nombre $r$ (la raison).",
        eq: "u_{n+1} = u_n + r \\implies u_n = u_0 + n \\times r",
        piege: "Confondre la raison $r$ avec le premier terme $u_0$.",
        etapes: [
          "Vérifier que $u_{n+1} - u_n$ est constant.",
          "Identifier le premier terme et la raison.",
          "Utiliser la formule du terme général pour calculer n'importe quel rang."
        ]
      },
      {
        head: "Suites Géométriques",
        body: "Une suite est géométrique si l'on passe d'un terme au suivant en multipliant toujours par le même nombre $q$ (la raison).",
        eq: "u_{n+1} = u_n \\times q \\implies u_n = u_0 \\times q^n",
        piege: "Attention aux puissances : $q^n$ augmente très vite si $q > 1$ et tend vers $0$ si $0 < q < 1$.",
        etapes: [
          "Vérifier que $u_{n+1} / u_n$ est constant.",
          "Identifier $u_0$ et $q$.",
          "Appliquer la formule de la somme : $S = \\text{1er terme} \\times \\frac{1-q^{\\text{nb termes}}}{1-q}$."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Dérivation",
    sub: "Calcul du nombre dérivé, étude des variations et équations de tangentes.",
    rules: [
      {
        head: "Dérivées usuelles",
        body: "Le tableau des dérivées permet de trouver instantanément la pente de la tangente en tout point.",
        eq: "(x^n)' = n x^{n-1}, \\quad (\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}, \\quad (\\frac{1}{x})' = -\\frac{1}{x^2}",
        piege: "La dérivée d'une constante est toujours $0$. Ne pas dériver $5$ en $1$ !",
        etapes: [
          "Identifier la forme de la fonction.",
          "Appliquer la règle correspondante du tableau.",
          "Simplifier l'expression obtenue pour étudier son signe."
        ]
      },
      {
        head: "Équation de la tangente",
        body: "La tangente à la courbe de $f$ au point d'abscisse $a$ est une droite dont le coefficient directeur est $f'(a)$.",
        eq: "y = f'(a)(x - a) + f(a)",
        piege: "Confondre $f(a)$ (ordonnée) et $f'(a)$ (pente).",
        etapes: [
          "Calculer $f(a)$.",
          "Calculer la dérivée $f'(x)$ puis évaluer $f'(a)$.",
          "Remplacer dans la formule $y = f'(a)(x-a) + f(a)$."
        ]
      }
    ]
  }
];

export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  0: [
    {
      title: "Sujet Blanc 2026 - Automatismes",
      enonce: "Donner une valeur approchée de $A = 2 + 10^{-15}$ et calculer l'image de $-1$ par $f(x) = -x^2 + 2x + 3$.",
      correction: "1) $10^{-15}$ est négligeable, donc $A \\approx 2$. \n\n 2) $f(-1) = -(-1)^2 + 2(-1) + 3 = -1 - 2 + 3 = 0$.",
      points: ["Ordre de grandeur", "Calcul d'image"],
      keyTerms: ["2", "0"]
    }
  ],
  2: [
    {
      title: "Optimisation de l'aire (Bac Blanc)",
      enonce: "Soit $f(x) = 2x^2 - 8x + 16$ l'aire d'un carré $MNPQ$ inscrit dans un carré de côté $4$. \n\n 1) Déterminer les coordonnées du sommet de la parabole. \n 2) En déduire la position de $x$ pour laquelle l'aire est minimale.",
      correction: "1) $\\alpha = -b/(2a) = -(-8)/(2 \\times 2) = 2$. \n $\\beta = f(2) = 2(2)^2 - 8(2) + 16 = 8 - 16 + 16 = 8$. \n Le sommet est $(2, 8)$. \n\n 2) Comme $a=2 > 0$, l'aire est minimale pour $x=2$ et vaut $8$.",
      points: ["Calcul de alpha/beta", "Interprétation de l'extremum"],
      keyTerms: ["2", "8", "minimal"]
    }
  ],
  3: [
    {
      title: "Évolution de population (Suite)",
      enonce: "Une population de bactéries augmente de $20\\%$ chaque jour. On part de $1000$ bactéries. On retire $100$ bactéries chaque soir. \n\n 1) Justifier que $u_{n+1} = 1,2u_n - 100$. \n 2) Calculer la population après 2 jours.",
      correction: "1) Augmentation de $20\\% \\rightarrow \\times 1,2$. Retrait de $100 \\rightarrow - 100$. \n\n 2) $u_1 = 1,2(1000) - 100 = 1100$. \n $u_2 = 1,2(1100) - 100 = 1320 - 100 = 1220$.",
      points: ["Modélisation récurrente", "Calcul de termes"],
      keyTerms: ["1,2", "1100", "1220"]
    }
  ],
  4: [
    {
      title: "Étude de fonction exponentielle (Bac)",
      enonce: "Soit $f(x) = (4x^2 - 14x + 8)e^{0,5x}$. \n\n Montrer que $f'(x) = (2x^2 + x - 10)e^{0,5x}$.",
      correction: "On utilise $(uv)' = u'v + uv'$ avec $u = 4x^2 - 14x + 8$ et $v = e^{0,5x}$. \n\n $u' = 8x - 14$, $v' = 0,5e^{0,5x}$. \n\n $f'(x) = (8x - 14)e^{0,5x} + (4x^2 - 14x + 8)(0,5e^{0,5x})$ \n\n $f'(x) = e^{0,5x} [8x - 14 + 2x^2 - 7x + 4]$ \n\n $f'(x) = (2x^2 + x - 10)e^{0,5x}$.",
      points: ["Dérivation d'un produit", "Factorisation par exp"],
      keyTerms: ["2x^2+x-10", "produit"]
    }
  ]
};
