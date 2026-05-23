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
    sub: "Les bases indispensables : calculs avec parenthèses, fractions et puissances.",
    rules: [
      {
        head: "Règle des signes",
        body: "Pour le produit ou le quotient : même signe $\\rightarrow (+)$, signes contraires $\\rightarrow (-)$.",
        eq: "(-3) \\times (-4) = 12 ; \\quad \\frac{-10}{2} = -5",
        piege: "L'addition n'est pas une multiplication : $-3-4 = -7$ (on cumule les dettes).",
        etapes: ["Identifier l'opération", "Compter les signes moins", "Calculer la valeur absolue"]
      },
      {
        head: "Priorités (PEMDAS)",
        body: "L'ordre est : Parenthèses, Exposants, Multiplications/Divisions, Additions/Soustractions.",
        eq: "5 + 2 \\times 3^2 = 5 + 2 \\times 9 = 23",
        piege: "Calculer de gauche à droite sans respecter les priorités ($5+2=7 \\rightarrow 7 \\times 9 = 63$ est FAUX).",
        etapes: ["Calculer les puissances", "Effectuer les produits", "Sommer en dernier"]
      }
    ]
  },
  {
    id: 1,
    title: "Second Degré : Équations",
    sub: "Résolution d'équations, calcul du discriminant et factorisation.",
    rules: [
      {
        head: "Le Discriminant",
        body: "Permet de connaître le nombre de solutions de $ax^2+bx+c=0$.",
        eq: "\\Delta = b^2 - 4ac",
        piege: "Oublier les parenthèses si $b$ est négatif : $(-3)^2 = 9$ et non $-9$.",
        etapes: ["Calculer $\\Delta$", "Si $\\Delta>0$ : 2 racines", "Si $\\Delta=0$ : 1 racine", "Si $\\Delta<0$ : aucune"]
      },
      {
        head: "Somme et Produit des racines",
        body: "Si $x_1, x_2$ sont racines, alors leur somme et produit sont liés aux coefficients.",
        eq: "x_1 + x_2 = -\\frac{b}{a} ; \\quad x_1 x_2 = \\frac{c}{a}",
        piege: "Inverser le signe pour la somme (ne pas oublier le 'moins').",
        etapes: ["Trouver une racine évidente", "Déduire la seconde par le produit $c/a$"]
      }
    ]
  },
  {
    id: 2,
    title: "Probabilités conditionnelles",
    sub: "Étude des événements dépendants et formule des probabilités totales.",
    rules: [
      {
        head: "Probabilité de B sachant A",
        body: "La probabilité que B se réalise sachant que A est déjà réalisé.",
        eq: "P_A(B) = \\frac{P(A \\cap B)}{P(A)}",
        piege: "Confondre $P_A(B)$ et $P_B(A)$ (sens de la flèche dans l'arbre).",
        etapes: ["Identifier l'événement de référence", "Calculer l'intersection", "Diviser par $P(A)$"]
      },
      {
        head: "Formule des Probabilités Totales",
        body: "Calculer $P(B)$ à partir d'un système complet d'événements.",
        eq: "P(B) = P(A) \\times P_A(B) + P(\\bar{A}) \\times P_{\\bar{A}}(B)",
        piege: "Oublier une branche du système complet dans la somme.",
        etapes: ["Dessiner l'arbre pondéré", "Multiplier le long des branches", "Sommer les résultats des feuilles"]
      }
    ]
  },
  {
    id: 3,
    title: "Trigonométrie",
    sub: "Cercle trigonométrique, radians, cosinus et sinus.",
    rules: [
      {
        head: "Le Radian",
        body: "Mesure de l'arc de cercle intercepté. $\\pi$ radians = $180^\\circ$.",
        eq: "\\alpha(\\text{rad}) = \\alpha(\\text{deg}) \\times \\frac{\\pi}{180}",
        piege: "Oublier de mettre sa calculatrice en mode Radian pour les calculs.",
        etapes: ["Convertir l'angle si besoin", "Utiliser le cercle trigonométrique"]
      },
      {
        head: "Valeurs Remarquables",
        body: "Coordonnées des points clés sur le cercle.",
        eq: "\\cos(\\pi/3) = 1/2 ; \\quad \\sin(\\pi/3) = \\sqrt{3}/2",
        piege: "Inverser Cos (abscisse $x$) et Sin (ordonnée $y$).",
        etapes: ["Mémoriser la table : $0, \\pi/6, \\pi/4, \\pi/3, \\pi/2$"]
      }
    ]
  },
  {
    id: 4,
    title: "2nd Degré : Variations & Signe",
    sub: "Sens de variations, sommet de la parabole et signe du trinôme.",
    rules: [
      {
        head: "Sommet de la Parabole",
        body: "La courbe $y=ax^2+bx+c$ admet un extremum en $\\alpha$.",
        eq: "\\alpha = -\\frac{b}{2a} ; \\quad \\beta = f(\\alpha)",
        piege: "Le sommet est un minimum si $a>0$, un maximum si $a<0$.",
        etapes: ["Calculer $\\alpha$", "Calculer l'image $\\beta$"]
      },
      {
        head: "Signe du trinôme",
        body: "Le trinôme est du signe de $a$ à l'extérieur des racines.",
        eq: "\\text{Signe de } a \\dots 0 \\dots \\text{Signe de } -a \\dots 0 \\dots \\text{Signe de } a",
        piege: "Croire que c'est toujours positif entre les racines.",
        etapes: ["Trouver les racines", "Repérer le signe de $a$"]
      }
    ]
  },
  {
    id: 5,
    title: "Suites Numériques : Généralités",
    sub: "Génération, monotonie et algorithmique.",
    rules: [
      {
        head: "Relation de Récurrence",
        body: "Calculer un terme à partir du précédent.",
        eq: "u_{n+1} = f(u_n)",
        piege: "Calculer $u_{10}$ demande de calculer $u_1, u_2 \\dots u_9$ (long sans tableur).",
        etapes: ["Partir de $u_0$", "Appliquer la formule successivement"]
      },
      {
        head: "Monotonie",
        body: "Étudier si la suite est croissante ou décroissante.",
        eq: "u_{n+1} - u_n > 0 \\implies \\text{Croissante}",
        piege: "Confondre le signe de $u_n$ et le signe de la différence $u_{n+1}-u_n$.",
        etapes: ["Calculer la différence", "Étudier son signe"]
      }
    ]
  },
  {
    id: 6,
    title: "Nombre dérivé & Tangente",
    sub: "Taux d'accroissement et équation de la tangente.",
    rules: [
      {
        head: "Nombre dérivé f'(a)",
        body: "Pente de la tangente à la courbe au point d'abscisse $a$.",
        eq: "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
        piege: "Une fonction n'est pas dérivable là où sa courbe a un 'pic' (ex: valeur absolue en 0).",
        etapes: ["Calculer le taux d'accroissement", "Passer à la limite $h \\to 0$"]
      },
      {
        head: "Équation de la tangente",
        body: "La droite qui approche la courbe au plus près.",
        eq: "y = f'(a)(x - a) + f(a)",
        piege: "Oublier de multiplier la pente par $(x-a)$ avant d'ajouter $f(a)$.",
        etapes: ["Calculer $f(a)$", "Calculer $f'(a)$", "Appliquer la formule"]
      }
    ]
  },
  {
    id: 7,
    title: "Produit Scalaire",
    sub: "Calculs vectoriels, norme et angles.",
    rules: [
      {
        head: "Expression analytique",
        body: "Calcul avec les coordonnées dans une base orthonormée.",
        eq: "\\vec{u} \\cdot \\vec{v} = xx' + yy'",
        piege: "Ne fonctionne que dans un repère ORTHONORMÉ.",
        etapes: ["Vérifier le repère", "Multiplier les abscisses", "Multiplier les ordonnées", "Sommer"]
      },
      {
        head: "Al-Kashi",
        body: "Théorème de Pythagore généralisé pour n'importe quel triangle.",
        eq: "a^2 = b^2 + c^2 - 2bc \\cos(\\hat{A})",
        piege: "Inverser l'angle $\\hat{A}$ (il doit être opposé au côté $a$).",
        etapes: ["Identifier les 3 côtés et l'angle", "Isoler l'inconnue"]
      }
    ]
  },
  {
    id: 8,
    title: "Variables aléatoires",
    sub: "Loi de probabilité, espérance et variance.",
    rules: [
      {
        head: "Espérance E(X)",
        body: "Moyenne théorique des résultats pondérés par leurs probabilités.",
        eq: "E(X) = \\sum p_i x_i",
        piege: "Oublier de vérifier que la somme des probabilités vaut bien 1.",
        etapes: ["Dresser le tableau de la loi", "Multiplier chaque valeur par sa proba", "Sommer"]
      },
      {
        head: "Écart-type",
        body: "Mesure la dispersion des valeurs autour de la moyenne.",
        eq: "\\sigma(X) = \\sqrt{V(X)}",
        piege: "La variance est toujours positive, si vous trouvez un nombre négatif, il y a une erreur.",
        etapes: ["Calculer $E(X^2)$", "Appliquer la formule de König-Huygens"]
      }
    ]
  },
  {
    id: 9,
    title: "Applications de la dérivation",
    sub: "Étude des variations et recherche d'extrema.",
    rules: [
      {
        head: "Signe de f' et Variations",
        body: "Le signe de la dérivée donne le sens de variation de la fonction.",
        eq: "f'(x) > 0 \\iff f \\text{ est croissante}",
        piege: "Confondre le signe de $f(x)$ et le signe de $f'(x)$.",
        etapes: ["Calculer $f'(x)$", "Étudier le signe de $f'(x)$", "Dresser le tableau"]
      }
    ]
  },
  {
    id: 10,
    title: "Suites Arith. & Géo.",
    sub: "Calcul du terme général et sommes de termes.",
    rules: [
      {
        head: "Suite Arithmétique",
        body: "Passe au suivant par addition de la raison $r$.",
        eq: "u_n = u_0 + n \\times r",
        piege: "Si le premier terme est $u_1$, la formule est $u_n = u_1 + (n-1)r$.",
        etapes: ["Identifier la raison", "Appliquer la formule de la somme si besoin"]
      },
      {
        head: "Suite Géométrique",
        body: "Passe au suivant par multiplication par la raison $q$.",
        eq: "u_n = u_0 \\times q^n",
        piege: "Attention aux puissances de $q < 1$ (la suite tend vers 0).",
        etapes: ["Identifier $q$", "Utiliser la formule de la somme géométrique"]
      }
    ]
  },
  {
    id: 11,
    title: "Fonction Exponentielle",
    sub: "Étude de la fonction $e^x$, unique telle que f'=f.",
    rules: [
      {
        head: "Propriétés algébriques",
        body: "L'exponentielle transforme les sommes en produits.",
        eq: "e^a \\times e^b = e^{a+b} ; \\quad (e^a)^n = e^{na}",
        piege: "L'exponentielle $e^x$ est TOUJOURS strictement positive.",
        etapes: ["Simplifier les expressions", "Résoudre des équations $e^A = e^B \\iff A=B$"]
      }
    ]
  },
  {
    id: 12,
    title: "Géométrie repérée",
    sub: "Équations de droites et de cercles.",
    rules: [
      {
        head: "Équation de cercle",
        body: "L'ensemble des points à distance $r$ du centre $\\Omega(x_C, y_C)$.",
        eq: "(x-x_C)^2 + (y-y_C)^2 = r^2",
        piege: "Oublier le carré sur le rayon ($r^2$).",
        etapes: ["Repérer les coordonnées du centre", "Élever le rayon au carré"]
      }
    ]
  }
];

export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  0: [
    {
      title: "Automatismes : Fractions & Puissances",
      enonce: "Simplifier l'expression $A = \\frac{7}{3} - \\frac{2}{3} \\times (5 - \\frac{1}{4})$.",
      correction: "Priorité à la parenthèse : $5 - 1/4 = 20/4 - 1/4 = 19/4$. \n\n Multiplication : $2/3 \\times 19/4 = 38/12 = 19/6$. \n\n Soustraction : $7/3 - 19/6 = 14/6 - 19/6 = -5/6$.",
      points: ["Parenthèse correcte", "Multiplication prioritaire", "Dénominateur commun", "Résultat irréductible"],
      keyTerms: ["19/4", "-5/6"]
    }
  ],
  1: [
    {
      title: "Bac Blanc : Équation du 2nd degré",
      enonce: "Résoudre $2x^2 - 8x + 6 = 0$.",
      correction: "$\\Delta = (-8)^2 - 4(2)(6) = 64 - 48 = 16$. \n\n $\\Delta > 0$, deux racines : \n\n $x_1 = (8-4)/4 = 1$ \n\n $x_2 = (8+4)/4 = 3$.",
      points: ["Calcul de Delta", "Nombre de racines", "Calcul de x1", "Calcul de x2"],
      keyTerms: ["16", "1", "3"]
    }
  ],
  2: [
    {
      title: "Probabilités : Arbre pondéré",
      enonce: "Une angine est bactérienne dans 20% des cas. Un test est positif pour 70% des angines bactériennes et 10% des virales. Calculer $P(T)$.",
      correction: "D'après la formule des probabilités totales : \n\n $P(T) = P(B) \\times P_B(T) + P(V) \\times P_V(T)$ \n\n $P(T) = 0,2 \\times 0,7 + 0,8 \\times 0,1 = 0,14 + 0,08 = 0,22$.",
      points: ["Formule citée", "Application numérique", "Résultat correct"],
      keyTerms: ["0,22", "totales"]
    }
  ],
  11: [
    {
      title: "Sujet Bac : Dérivée et Exponentielle",
      enonce: "Calculer la dérivée de $f(x) = (4x^2 - 14x + 8) e^{0,5x}$.",
      correction: "Formule $(uv)' = u'v + uv'$. \n\n $u' = 8x-14$, $v' = 0,5e^{0,5x}$. \n\n $f'(x) = (8x-14)e^{0,5x} + (4x^2-14x+8) \\times 0,5e^{0,5x}$ \n\n $f'(x) = (8x-14 + 2x^2-7x+4)e^{0,5x} = (2x^2+x-10)e^{0,5x}$.",
      points: ["Règle du produit", "Dérivée de u et v", "Factorisation par exp", "Simplification finale"],
      keyTerms: ["2x^2+x-10", "produit"]
    }
  ]
};
