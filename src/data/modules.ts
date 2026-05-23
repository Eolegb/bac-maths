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
    sub: "Bases du calcul littéral et numérique.",
    rules: [
      {
        head: "Règle des signes",
        body: "Multiplication/Division : même signe (+) ; signes contraires (-).",
        eq: "(-3) \times (-4) = 12 ; \quad (-5) \times 2 = -10",
        piege: "Ne pas confondre avec l'addition : -3 + (-4) = -7.",
        etapes: ["Identifier les signes", "Multiplier les distances à zéro", "Appliquer le signe final"]
      }
    ]
  },
  {
    id: 1,
    title: "Second Degré",
    sub: "Équations, discriminant et forme canonique.",
    rules: [
      {
        head: "Le Discriminant",
        body: "Pour résoudre $ax^2+bx+c=0$, on utilise $\Delta$.",
        eq: "\Delta = b^2 - 4ac",
        piege: "Si $\Delta < 0$, il n'y a aucune solution réelle.",
        etapes: ["Calculer Delta", "Chercher les racines x1 et x2", "Factoriser a(x-x1)(x-x2)"]
      }
    ]
  },
  {
    id: 2,
    title: "Dérivation",
    sub: "Nombre dérivé et variations des fonctions.",
    rules: [
      {
        head: "Équation de la tangente",
        body: "La droite qui 'frotte' la courbe au point d'abscisse $a$.",
        eq: "y = f'(a)(x - a) + f(a)",
        piege: "Confondre f(a) et f'(a).",
        etapes: ["Dériver la fonction", "Calculer f'(a)", "Appliquer la formule"]
      }
    ]
  },
  {
    id: 3,
    title: "Suites Numériques",
    sub: "Suites arithmétiques et géométriques.",
    rules: [
      {
        head: "Somme des termes",
        body: "Calculer la somme d'une suite arithmétique.",
        eq: "S = \frac{(u_0 + u_n) \times (n+1)}{2}",
        piege: "Oublier que le nombre de termes de 0 à n est n+1.",
        etapes: ["Identifier le 1er et dernier terme", "Compter le nombre de termes", "Calculer"]
      }
    ]
  },
  {
    id: 4,
    title: "Probabilités",
    sub: "Conditionnement et variables aléatoires.",
    rules: [
      {
        head: "Probabilités totales",
        body: "Sommer les chemins d'un arbre pondéré.",
        eq: "P(B) = P(A \cap B) + P(\bar{A} \cap B)",
        piege: "Oublier de multiplier le long des branches.",
        etapes: ["Tracer l'arbre", "Multiplier sur chaque branche", "Sommer les résultats"]
      }
    ]
  },
  {
    id: 5,
    title: "Exponentielle",
    sub: "Propriétés de la fonction $e^x$.",
    rules: [
      {
        head: "Propriétés algébriques",
        body: "L'exponentielle transforme les sommes en produits.",
        eq: "e^a \times e^b = e^{a+b} ; \quad e^{-a} = 1/e^a",
        piege: "Croire que e^a + e^b = e^{a+b} (C'EST FAUX !).",
        etapes: ["Repérer les puissances", "Additionner les exposants pour un produit"]
      }
    ]
  },
  {
    id: 6,
    title: "Trigonométrie",
    sub: "Cercle trigonométrique, cosinus et sinus.",
    rules: [
      {
        head: "Relation fondamentale",
        body: "Lien entre cosinus et sinus pour tout réel $x$.",
        eq: "\cos^2(x) + \sin^2(x) = 1",
        piege: "Inverser les axes (Cos est en abscisse, Sin en ordonnée).",
        etapes: ["Placer le point sur le cercle", "Lire les coordonnées"]
      }
    ]
  },
  {
    id: 7,
    title: "Produit Scalaire",
    sub: "Calculs vectoriels et orthogonalité.",
    rules: [
      {
        head: "Expression analytique",
        body: "Calculer le produit scalaire avec les coordonnées.",
        eq: "\vec{u} \cdot \vec{v} = xx' + yy'",
        piege: "Oublier que si le résultat est 0, les vecteurs sont orthogonaux.",
        etapes: ["Identifier x, y, x', y'", "Multiplier et sommer"]
      }
    ]
  }
];

export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  1: [
    {
      title: "Optimisation de l'aire",
      enonce: "Soit $f(x) = 2x^2 - 8x + 16$ l'aire d'un carré $MNPQ$ inscrit dans un carré de côté 4. Montrer que l'aire est minimale pour $x=2$.",
      correction: "On calcule $\alpha = -b/(2a) = 8/4 = 2$. Comme $a > 0$, c'est un minimum.",
      points: ["Calcul de alpha", "Justification du minimum"],
      keyTerms: ["2", "minimum"]
    }
  ]
};
