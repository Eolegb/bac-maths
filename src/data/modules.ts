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
  keyTerms: string[]; // key terms to check in user response for mock auto-grading
}

export const MODULES: ModuleData[] = [
  {
    id: 0,
    title: "Signes & priorités",
    sub: "Les règles de calcul de base indispensables pour éviter les erreurs de signe et d'inattention.",
    rules: [
      {
        head: "Règle des signes (Multiplication & Division)",
        body: "Deux signes identiques donnent un résultat positif (+), deux signes différents donnent un résultat négatif (-). Attention : cette règle ne s'applique qu'au produit et au quotient.",
        eq: "(-3) \\times (-4) = 12 \\quad \\text{et} \\quad (-5) \\times 2 = -10",
        piege: "Ne confondez pas avec l'addition : -3 + (-4) = -7 (on ne multiplie pas, on accumule les valeurs négatives).",
        etapes: [
          "Identifier les signes des deux nombres à multiplier ou diviser.",
          "Appliquer la règle : même signe → +, signes contraires → -.",
          "Multiplier ou diviser les valeurs numériques absolues."
        ]
      },
      {
        head: "Priorités opératoires (PEMDAS)",
        body: "L'ordre des opérations doit toujours être respecté : 1. Parenthèses, 2. Exposants (puissances), 3. Multiplications et Divisions (de gauche à droite), 4. Additions et Soustractions (de gauche à droite).",
        eq: "5 + 2 \\times (-3)^2 = 5 + 2 \\times 9 = 5 + 18 = 23",
        piege: "Calculer de gauche à droite sans priorité : faire 5 + 2 = 7 puis multiplier est une erreur classique.",
        etapes: [
          "Calculer l'intérieur des parenthèses les plus internes d'abord.",
          "Calculer les puissances (carrés, cubes, etc.).",
          "Effectuer les multiplications et divisions de gauche à droite.",
          "Effectuer les additions et soustractions en dernier."
        ]
      },
      {
        head: "Signe moins (-) devant une parenthèse",
        body: "Un signe moins devant des parenthèses équivaut à distribuer le facteur -1. Cela inverse le signe de CHAQUE terme situé à l'intérieur.",
        eq: "-(3x - 5) = -3x + 5 \\quad \\text{et} \\quad -(x^2 - x + 2) = -x^2 + x - 2",
        piege: "N'inverser que le premier terme et oublier les suivants. Par exemple, -(2x - 3) = -2x - 3 est faux !",
        etapes: [
          "Repérer tous les termes séparés par des + ou - à l'intérieur de la parenthèse.",
          "Changer le signe de chacun d'eux.",
          "Supprimer la parenthèse et simplifier l'expression."
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
        piege: "Dans k(a - b), n'oubliez pas le signe moins : k(a - b) = ka - kb.",
        etapes: [
          "Identifier les termes à multiplier.",
          "Distribuer le premier facteur sur tous les termes suivants.",
          "Multiplier les coefficients et regrouper les puissances de x."
        ]
      },
      {
        head: "Identités remarquables",
        body: "Trois formules indispensables à connaître par cœur pour développer instantanément les expressions carrées.",
        eq: "(a+b)^2 = a^2 + 2ab + b^2 \\quad (a-b)^2 = a^2 - 2ab + b^2 \\quad (a-b)(a+b) = a^2 - b^2",
        piege: "Oublier le double produit (2ab) : (x + 3)^2 n'est pas égal à x^2 + 9, mais à x^2 + 6x + 9 !",
        etapes: [
          "Identifier la formule correspondante (somme carrée, différence carrée, ou produit conjugué).",
          "Déterminer les termes représentant 'a' et 'b'.",
          "Appliquer la formule en faisant attention aux carrés (ex: (2x)^2 = 4x^2)."
        ]
      },
      {
        head: "Réduire une expression",
        body: "Réduire consiste à regrouper les termes semblables (de même puissance) pour simplifier l'écriture au maximum.",
        eq: "3x^2 - 5x + 4 + 2x^2 + 2x - 7 = 5x^2 - 3x - 3",
        piege: "Vouloir regrouper des termes de degrés différents, par exemple additionner x^2 et x.",
        etapes: [
          "Trier les termes par famille : les x^2, les x, puis les constantes numériques.",
          "Additionner ou soustraire les coefficients de chaque famille.",
          "Écrire le résultat ordonné par puissances décroissantes."
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
        piege: "Quand le facteur commun est tout un terme, ne pas oublier le '1' restant. Ex: (x+2) + (x+2)(x-3) = (x+2)(1 + x - 3).",
        etapes: [
          "Analyser chaque terme pour repérer un nombre ou une expression en commun.",
          "Extraire ce facteur commun et ouvrir des crochets.",
          "Écrire le reste des termes à l'intérieur des crochets, puis simplifier."
        ]
      },
      {
        head: "Factorisation par identité remarquable",
        body: "Reconnaître une structure de type a^2 - b^2 pour la factoriser en produit conjugué.",
        eq: "a^2 - b^2 = (a - b)(a + b) \\quad \\text{ex:} \\quad 9x^2 - 16 = (3x - 4)(3x + 4)",
        piege: "Oublier de prendre la racine carrée des coefficients. Ex: 4x^2 - 25 se factorise en (2x-5)(2x+5), pas (4x-25)(4x+25).",
        etapes: [
          "Vérifier si l'expression comporte deux termes séparés par un signe moins.",
          "Prendre la racine carrée de chaque terme pour identifier 'a' et 'b'.",
          "Écrire la forme factorisée : (a - b)(a + b)."
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Fractions algébriques",
    sub: "Manipuler et simplifier des quotients d'expressions littérales sans faire d'erreurs de dénominateur.",
    rules: [
      {
        head: "Conditions d'existence (C.E.)",
        body: "Une fraction n'est définie que si son dénominateur est différent de zéro. C'est la première étape indispensable avant tout calcul.",
        eq: "\\frac{2x+3}{x-5} \\quad \\text{existe ssi} \\quad x \\neq 5",
        piege: "Commencer à simplifier ou additionner sans poser les valeurs interdites au préalable.",
        etapes: [
          "Poser l'équation : Dénominateur = 0.",
          "Résoudre cette équation pour trouver la ou les valeurs interdites.",
          "Déclarer l'ensemble de définition (ex: R privé de 5)."
        ]
      },
      {
        head: "Simplification de fraction",
        body: "On ne peut simplifier une fraction qu'en éliminant des facteurs communs au numérateur et au dénominateur (jamais des termes additionnés).",
        eq: "\\frac{x^2 - 9}{x-3} = \\frac{(x-3)(x+3)}{x-3} = x + 3 \\quad (x \\neq 3)",
        piege: "Simplifier des termes isolés : par exemple, rayer les x^2 dans (x^2+5)/(x^2+2) pour obtenir 5/2 est totalement faux.",
        etapes: [
          "Factoriser entièrement le numérateur.",
          "Factoriser entièrement le dénominateur.",
          "Simplifier les facteurs identiques présents en haut et en bas."
        ]
      },
      {
        head: "Mise au même dénominateur",
        body: "Pour additionner ou soustraire deux fractions, il faut trouver un dénominateur commun, puis multiplier les numérateurs en conséquence.",
        eq: "\\frac{3}{x} + \\frac{2}{x+2} = \\frac{3(x+2) + 2x}{x(x+2)} = \\frac{5x+6}{x(x+2)}",
        piege: "Additionner directement les numérateurs et dénominateurs entre eux (ex: 1/a + 1/b = 2/(a+b) est faux).",
        etapes: [
          "Déterminer le dénominateur commun (généralement le produit des dénominateurs).",
          "Multiplier le numérateur de chaque fraction par les facteurs manquants de son dénominateur.",
          "Additionner les numérateurs obtenus sur le dénominateur unique."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Équations & inéquations",
    sub: "Résoudre des équations linéaires, des équations produit nul, et des inéquations avec changement de sens.",
    rules: [
      {
        head: "Équations du 1er degré",
        body: "Isoler l'inconnue x d'un côté du signe égal en effectuant les opérations inverses étape par étape.",
        eq: "3x - 7 = 5 \\implies 3x = 12 \\implies x = 4",
        piege: "Oublier de changer le signe d'un terme lorsqu'on le déplace de l'autre côté du signe égal.",
        etapes: [
          "Regrouper tous les termes en x d'un côté (généralement à gauche).",
          "Regrouper les termes constants (les nombres) de l'autre côté.",
          "Diviser par le coefficient devant x pour trouver sa valeur."
        ]
      },
      {
        head: "Équations produit nul",
        body: "Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul. Permet de résoudre des équations de degré supérieur.",
        eq: "(2x - 4)(x + 5) = 0 \\implies 2x - 4 = 0 \\quad \\text{ou} \\quad x + 5 = 0 \\implies x = 2 \\quad \\text{ou} \\quad x = -5",
        piege: "Vouloir développer l'expression au lieu de poser directement chaque facteur égal à zéro.",
        etapes: [
          "Vérifier que l'équation est bien de la forme A(x) * B(x) = 0 (le membre de droite doit être 0).",
          "Écrire la règle du produit nul.",
          "Résoudre séparément chaque équation simple du premier degré."
        ]
      },
      {
        head: "Inéquations et inversion de signe",
        body: "La résolution d'une inéquation est similaire à une équation, à une exception cruciale : si on multiplie ou divise par un nombre négatif, on doit inverser le sens de l'inégalité.",
        eq: "-3x \\le 12 \\implies x \\ge \\frac{12}{-3} \\implies x \\ge -4",
        piege: "Diviser par un nombre négatif sans changer le sens du symbole (ex: -2x < 6 devient x < -3, ce qui est faux).",
        etapes: [
          "Isoler le terme en x comme pour une équation.",
          "Si le coefficient de x est négatif, inverser le symbole d'inégalité lors de la division.",
          "Donner la solution sous forme d'intervalle (ex: x >= -4 correspond à [-4 ; +infini[)."
        ]
      }
    ]
  }
];

// Hand-crafted Bac Exercises for each module
export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  0: [
    {
      title: "Simplification et priorités numériques complexes",
      enonce: "Calculer l'expression numérique suivante en indiquant toutes les étapes de calcul et donner le résultat sous forme de fraction irréductible :\n\n$$A = \\frac{7}{3} - \\frac{2}{3} \\times \\left( 5 - \\frac{1}{4} \\right)$$\n\nJustifier soigneusement les priorités appliquées.",
      correction: "Pour calculer $A = \\frac{7}{3} - \\frac{2}{3} \\times \\left( 5 - \\frac{1}{4} \\right)$ :\n\n**Étape 1 : Calculer l'intérieur des parenthèses en mettant au même dénominateur**\n$$5 - \\frac{1}{4} = \\frac{20}{4} - \\frac{1}{4} = \\frac{19}{4}$$\n\n**Étape 2 : Effectuer la multiplication prioritaire**\n$$\\frac{2}{3} \\times \\frac{19}{4} = \\frac{2 \\times 19}{3} = \\frac{19}{6}$$\n\n**Étape 3 : Soustraire les deux fractions en les mettant au dénominateur commun (6)**\n$$A = \\frac{7}{3} - \\frac{19}{6} = \\frac{14}{6} - \\frac{19}{6} = -\\frac{5}{6}$$\n\nLe résultat final est donc $A = -\\frac{5}{6}$ (qui est déjà irréductible).",
      points: [
        "Mise au dénominateur commun dans la parenthèse (obtention de 19/4).",
        "Calcul de la multiplication prioritaire (simplification pour obtenir 19/6).",
        "Dénominateur commun pour la soustraction finale.",
        "Signe négatif préservé et fraction simplifiée sous forme irréductible (-5/6)."
      ],
      keyTerms: ["19/4", "19/6", "14/6", "-5/6"]
    },
    {
      title: "Gestion des signes et parenthèses imbriquées",
      enonce: "Soit l'expression littérale suivante :\n\n$$B(x) = -[4x - (3 - 2x)] + 3(2 - x)$$\n\n1. Développer et réduire $B(x)$.\n2. Calculer la valeur exacte de $B(x)$ pour $x = -\\frac{1}{3}$.",
      correction: "1. **Développement de $B(x)$ :**\n\nSimplifions d'abord l'intérieur du premier crochet :\n$$4x - (3 - 2x) = 4x - 3 + 2x = 6x - 3$$\n\nAppliquons maintenant le signe moins devant le crochet :\n$$-[6x - 3] = -6x + 3$$\n\nDéveloppons le deuxième terme :\n$$3(2 - x) = 6 - 3x$$\n\nRegroupons et réduisons le tout :\n$$B(x) = (-6x + 3) + (6 - 3x) = -6x - 3x + 3 + 6$$\n$$B(x) = -9x + 9$$\n\n2. **Calcul de $B(x)$ pour $x = -\\frac{1}{3}$ :**\n\nEn remplaçant $x$ par $-\\frac{1}{3}$ dans la forme réduite :\n$$B\\left(-\\frac{1}{3}\\right) = -9 \\times \\left(-\\frac{1}{3}\\right) + 9$$\n$$B\\left(-\\frac{1}{3}\\right) = 3 + 9 = 12$$\n\nLe résultat pour $x = -1/3$ est donc $12$.",
      points: [
        "Retrait correct de la parenthèse intérieure : 4x - 3 + 2x.",
        "Application correcte du signe moins devant le crochet : -6x + 3.",
        "Développement du deuxième membre : 6 - 3x.",
        "Expression réduite finale : -9x + 9.",
        "Remplacement correct et gestion des signes pour x = -1/3 pour obtenir 12."
      ],
      keyTerms: ["-9x+9", "-9x + 9", "12", "6x - 3", "-6x + 3"]
    }
  ],
  1: [
    {
      title: "Différence de carrés et réduction de polynôme",
      enonce: "On considère l'expression littérale suivante :\n\n$$C(x) = (2x - 3)^2 - 4(x + 1)(x - 2)$$\n\n1. Développer et réduire $C(x)$.\n2. Que peut-on dire du degré du polynôme obtenu ? En déduire sa nature.",
      correction: "1. **Développement et réduction de $C(x)$ :**\n\n- Commençons par développer le premier carré avec l'identité remarquable $(a-b)^2$ :\n$$(2x - 3)^2 = (2x)^2 - 2 \\times 2x \\times 3 + 3^2 = 4x^2 - 12x + 9$$\n\n- Développons ensuite le produit double $(x + 1)(x - 2)$ :\n$$(x + 1)(x - 2) = x^2 - 2x + x - 2 = x^2 - x - 2$$\n\n- Multiplions ce produit par $-4$ :\n$$-4(x^2 - x - 2) = -4x^2 + 4x + 8$$\n\n- Assemblons et réduisons l'expression complète :\n$$C(x) = (4x^2 - 12x + 9) + (-4x^2 + 4x + 8)$$\n$$C(x) = (4x^2 - 4x^2) + (-12x + 4x) + (9 + 8)$$\n$$C(x) = -8x + 17$$\n\n2. **Analyse du degré :**\n\nLes termes en $x^2$ s'annulent ($4x^2 - 4x^2 = 0$). Il ne reste qu'un terme en $x$ de puissance 1. Le polynôme est donc de **degré 1**, c'est une fonction affine de la forme $ax + b$ avec $a = -8$ et $b = 17$.",
      points: [
        "Développement correct de (2x-3)^2 en 4x^2 - 12x + 9 (attention au coefficient 4 de x^2 et au double produit).",
        "Développement correct de (x+1)(x-2) en x^2 - x - 2.",
        "Distribution correcte du facteur -4 sur tous les termes.",
        "Simplification correcte des x^2 et obtention de l'expression affine finale -8x + 17.",
        "Conclusion correcte sur le degré 1 (fonction affine)."
      ],
      keyTerms: ["4x^2-12x+9", "-4x^2", "-8x+17", "-8x + 17", "degré 1", "affine"]
    },
    {
      title: "Développement avec identités remarquables combinées",
      enonce: "Développer, réduire et ordonner l'expression littérale suivante :\n\n$$D(x) = (3x + 2)(3x - 2) - (3x - 1)^2$$\n\nIndiquer clairement les identités remarquables utilisées.",
      correction: "Pour développer $D(x) = (3x + 2)(3x - 2) - (3x - 1)^2$ :\n\n- **Première partie : $(3x + 2)(3x - 2)$**\nIl s'agit d'une différence de deux carrés de la forme $(a+b)(a-b) = a^2 - b^2$ avec $a=3x$ et $b=2$.\n$$(3x + 2)(3x - 2) = (3x)^2 - 2^2 = 9x^2 - 4$$\n\n- **Deuxième partie : $(3x - 1)^2$**\nIl s'agit d'un carré parfait de la forme $(a-b)^2 = a^2 - 2ab + b^2$ avec $a=3x$ et $b=1$.\n$$(3x - 1)^2 = (3x)^2 - 2 \\times 3x \\times 1 + 1^2 = 9x^2 - 6x + 1$$\n\n- **Soustraction des deux parties :**\nAttention au signe moins devant la deuxième partie, qui change les signes de chaque terme :\n$$D(x) = (9x^2 - 4) - (9x^2 - 6x + 1)$$\n$$D(x) = 9x^2 - 4 - 9x^2 + 6x - 1$$\n$$D(x) = (9x^2 - 9x^2) + 6x - 4 - 1$$\n$$D(x) = 6x - 5$$\n\nL'expression réduite finale est donc $D(x) = 6x - 5$.",
      points: [
        "Reconnaissance et développement de la troisième identité (3x+2)(3x-2) = 9x^2 - 4.",
        "Reconnaissance et développement de la deuxième identité (3x-1)^2 = 9x^2 - 6x + 1.",
        "Application correcte du signe moins devant la parenthèse (changement des signes).",
        "Simplification correcte des termes en x^2 et obtention de 6x - 5."
      ],
      keyTerms: ["9x^2-4", "9x^2 - 6x + 1", "6x-5", "6x - 5"]
    }
  ],
  2: [
    {
      title: "Factorisation par facteur commun complexe",
      enonce: "Soit l'expression algébrique suivante :\n\n$$E(x) = (2x - 3)(x + 5) - (2x - 3)^2 + 4x - 6$$\n\n1. Factoriser le terme $4x - 6$.\n2. En déduire une factorisation complète de $E(x)$ sous forme d'un produit de deux facteurs du premier degré.",
      correction: "1. **Factorisation de $4x - 6$ :**\nOn remarque que 2 est un diviseur commun aux deux termes :\n$$4x - 6 = 2(2x - 3)$$\n\n2. **Factorisation complète de $E(x)$ :**\nRéécrivons $E(x)$ en faisant apparaître le terme $(2x-3)$ dans chaque partie :\n$$E(x) = (2x - 3)(x + 5) - (2x - 3)(2x - 3) + 2(2x - 3)$$\n\nLe facteur commun évident est donc $(2x - 3)$. Mettons-le en facteur :\n$$E(x) = (2x - 3) \\left[ (x + 5) - (2x - 3) + 2 \\right]$$\n\nSimplifions à l'intérieur du crochet en faisant attention au signe moins :\n$$x + 5 - 2x + 3 + 2 = -x + 10$$\n\nL'expression factorisée finale est :\n$$E(x) = (2x - 3)(-x + 10)$$\n(ou sous forme équivalente : $(2x - 3)(10 - x)$).",
      points: [
        "Factorisation correcte de 4x - 6 en 2(2x - 3).",
        "Identification du facteur commun global (2x - 3).",
        "Mise en facteur correcte et ouverture des crochets.",
        "Simplification correcte à l'intérieur des crochets en gérant le signe moins.",
        "Expression factorisée finale (2x - 3)(-x + 10) ou (2x - 3)(10 - x)."
      ],
      keyTerms: ["2(2x-3)", "2(2x - 3)", "(2x-3)", "(2x - 3)", "-x+10", "10-x", "-x + 10", "10 - x"]
    },
    {
      title: "Différence de carrés imbriquée",
      enonce: "Factoriser au maximum l'expression suivante en utilisant les identités remarquables :\n\n$$F(x) = (3x + 1)^2 - (x - 4)^2$$",
      correction: "Pour factoriser $F(x) = (3x + 1)^2 - (x - 4)^2$ :\n\nIl s'agit d'une différence de deux carrés de la forme $a^2 - b^2 = (a - b)(a + b)$ avec :\n- $a = 3x + 1$\n- $b = x - 4$\n\nAppliquons la formule :\n$$F(x) = \\left[ (3x + 1) - (x - 4) \\right] \\left[ (3x + 1) + (x - 4) \\right]$$\n\nSimplifions chaque crochet :\n- Premier crochet (attention au signe moins qui distribue) :\n$$(3x + 1) - (x - 4) = 3x + 1 - x + 4 = 2x + 5$$\n\n- Deuxième crochet :\n$$(3x + 1) + (x - 4) = 3x + 1 + x - 4 = 4x - 3$$\n\nL'expression factorisée finale est :\n$$F(x) = (2x + 5)(4x - 3)$$",
      points: [
        "Identification de la forme a^2 - b^2.",
        "Écriture de la structure avec les crochets [(3x+1)-(x-4)][(3x+1)+(x-4)].",
        "Simplification correcte du premier crochet en gérant le signe moins (2x + 5).",
        "Simplification correcte du deuxième crochet (4x - 3).",
        "Résultat final : (2x + 5)(4x - 3)."
      ],
      keyTerms: ["2x+5", "2x + 5", "4x-3", "4x - 3", "(2x+5)(4x-3)"]
    }
  ],
  3: [
    {
      title: "Simplification et domaine de définition",
      enonce: "On donne la fraction rationnelle suivante :\n\n$$H(x) = \\frac{2x^2 - 8}{x^2 - 4x + 4}$$\n\n1. Déterminer la condition d'existence (C.E.) de cette fraction.\n2. Factoriser le numérateur et le dénominateur.\n3. Simplifier la fraction $H(x)$ sur son domaine de définition.",
      correction: "1. **Condition d'existence (C.E.) :**\nLe dénominateur ne doit pas s'annuler :\n$$x^2 - 4x + 4 = 0$$\nOn reconnaît l'identité remarquable $(x-2)^2 = 0$, ce qui impose :\n$$x - 2 = 0 \\implies x = 2$$\nLa fraction existe donc si et seulement si $x \\neq 2$.\n\n2. **Factorisation :**\n- Numérateur : $2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)$ (différence de deux carrés).\n- Dénominateur : $x^2 - 4x + 4 = (x - 2)^2$.\n\n3. **Simplification :**\nPour $x \\neq 2$, nous pouvons simplifier par le facteur commun $(x - 2)$ :\n$$H(x) = \\frac{2(x - 2)(x + 2)}{(x - 2)^2} = \\frac{2(x + 2)}{x - 2}$$\n\nL'expression simplifiée est donc $\\frac{2x + 4}{x - 2}$ définie pour $x \\neq 2$.",
      points: [
        "Reconnaissance du dénominateur comme carré parfait (x-2)^2 et exclusion de la valeur x = 2.",
        "Factorisation correcte du numérateur en 2(x-2)(x+2).",
        "Factorisation correcte du dénominateur en (x-2)^2.",
        "Simplification de la fraction en supprimant un facteur (x-2) au numérateur et dénominateur.",
        "Expression finale correcte : 2(x+2)/(x-2) ou (2x+4)/(x-2)."
      ],
      keyTerms: ["x != 2", "x !=2", "x\\neq 2", "2(x-2)(x+2)", "(x-2)^2", "2(x+2)/(x-2)", "(2x+4)/(x-2)"]
    },
    {
      title: "Mise au même dénominateur avec variables",
      enonce: "Simplifier et écrire sous la forme d'une unique fraction rationnelle l'expression suivante :\n\n$$I(x) = \\frac{3}{x - 1} - \\frac{2}{x + 1}$$\n\nPréciser les valeurs interdites pour cette expression.",
      correction: "1. **Valeurs interdites (C.E.) :**\nLes dénominateurs ne doivent pas s'annuler, donc $x - 1 \\neq 0 \\implies x \\neq 1$, et $x + 1 \\neq 0 \\implies x \\neq -1$.\nLes valeurs interdites sont donc $1$ et $-1$.\n\n2. **Mise au même dénominateur :**\nLe dénominateur commun est le produit des deux, soit $(x - 1)(x + 1) = x^2 - 1$.\nMultiplions chaque numérateur par le dénominateur opposé :\n$$I(x) = \\frac{3(x + 1)}{(x - 1)(x + 1)} - \\frac{2(x - 1)}{(x - 1)(x + 1)}$$\n$$I(x) = \\frac{3x + 3 - (2x - 2)}{(x - 1)(x + 1)}$$\n\nAttention au signe moins qui s'applique sur TOUTE la seconde fraction :\n$$I(x) = \\frac{3x + 3 - 2x + 2}{(x - 1)(x + 1)}$$\n$$I(x) = \\frac{x + 5}{(x - 1)(x + 1)}$$\n(ou $\\frac{x + 5}{x^2 - 1}$).\n\nL'expression simplifiée est donc $\\frac{x + 5}{x^2 - 1}$.",
      points: [
        "Identification correcte des valeurs interdites x = 1 et x = -1.",
        "Choix du dénominateur commun (x-1)(x+1) ou x^2 - 1.",
        "Mise au même dénominateur des numérateurs 3(x+1) et 2(x-1).",
        "Gestion correcte de la soustraction des numérateurs (attention au signe : 3x+3 - 2x + 2).",
        "Expression finale sous forme de fraction unique : (x+5)/((x-1)(x+1)) ou (x+5)/(x^2-1)."
      ],
      keyTerms: ["1 et -1", "1 et -1", "x != 1", "x != -1", "3(x+1)", "2(x-1)", "x+5", "x^2-1"]
    }
  ],
  4: [
    {
      title: "Résolution d'inéquation produit et tableau de signes",
      enonce: "Résoudre dans $\\mathbb{R}$ l'inéquation suivante :\n\n$$(2x - 6)(3 - x) \\ge 0$$\n\nJustifier en étudiant les signes de chaque facteur et en dressant un tableau de signes complet.",
      correction: "Pour résoudre l'inéquation $(2x - 6)(3 - x) \\ge 0$ :\n\n**Étape 1 : Trouver les valeurs d'annulation de chaque facteur**\n- $2x - 6 = 0 \\implies 2x = 6 \\implies x = 3$\n- $3 - x = 0 \\implies x = 3$\n\n**Étape 2 : Dresser le tableau de signes**\nLes deux facteurs s'annulent en $x = 3$. Étudions leurs signes :\n- $2x - 6$ est négatif pour $x < 3$, nul en $x = 3$, et positif pour $x > 3$.\n- $3 - x$ est positif pour $x < 3$, nul en $x = 3$, et négatif pour $x > 3$.\n\nCréons le tableau de signes :\n- Pour $x \\in ]-\\infty ; 3[$ : $(2x-6)$ est $-$ et $(3-x)$ est $+$, donc le produit est $-$.\n- Pour $x = 3$ : les deux sont nuls, le produit est nul ($0$).\n- Pour $x \\in ]3 ; +\\infty[$ : $(2x-6)$ est $+$ et $(3-x)$ est $-$, donc le produit est $-$.\n\n**Étape 3 : Conclure**\nL'inéquation demande quand le produit est supérieur ou égal à 0 (positif ou nul).\nD'après le tableau de signes, le produit n'est jamais strictement positif. Il est nul uniquement pour $x = 3$.\nLa seule solution est donc la valeur unique :\n$$\\mathcal{S} = \\{3\\}$$",
      points: [
        "Recherche correcte de la racine du premier facteur : x = 3.",
        "Recherche correcte de la racine du deuxième facteur : x = 3.",
        "Analyse de signe correcte pour 2x - 6 (négatif puis positif).",
        "Analyse de signe correcte pour 3 - x (positif puis négatif, attention au coefficient -1 devant x).",
        "Tableau de signes ou étude logique qui montre que le produit est négatif partout sauf en x = 3 où il est nul.",
        "Conclusion correcte sur l'ensemble des solutions : S = {3}."
      ],
      keyTerms: ["x = 3", "2x-6 = 0", "3-x = 0", "S = {3}", "S={3}"]
    },
    {
      title: "Équation rationnelle avec vérification de C.E.",
      enonce: "Résoudre dans $\\mathbb{R}$ l'équation suivante :\n\n$$\\frac{3x - 1}{x + 2} = 2$$\n\nPréciser d'abord la condition d'existence, puis résoudre l'équation.",
      correction: "Pour résoudre l'équation $\\frac{3x - 1}{x + 2} = 2$ :\n\n**Étape 1 : Condition d'existence (C.E.)**\nLe dénominateur ne doit pas s'annuler, donc :\n$$x + 2 \\neq 0 \\implies x \\neq -2$$\nL'ensemble de résolution est $\\mathbb{R} \\setminus \\{-2\\}$.\n\n**Étape 2 : Résolution de l'équation**\nOn multiplie les deux côtés par $(x+2)$ (qui est non nul car $x \\neq -2$) :\n$$3x - 1 = 2(x + 2)$$\n$$3x - 1 = 2x + 4$$\n\nRegroupons les termes en $x$ à gauche et les nombres à droite :\n$$3x - 2x = 4 + 1$$\n$$x = 5$$\n\n**Étape 3 : Vérification par rapport aux C.E.**\n$5 \\neq -2$, donc la valeur trouvée est bien une solution valide.\nL'ensemble des solutions est :\n$$\\mathcal{S} = \\{5\\}$$",
      points: [
        "Énoncé correct de la condition d'existence : x != -2.",
        "Multiplication par le dénominateur pour se ramener à une équation linéaire : 3x - 1 = 2(x + 2).",
        "Développement correct de 2(x + 2) en 2x + 4.",
        "Isoler correctement x pour trouver x = 5.",
        "Vérification de la solution avec la condition d'existence pour valider S = {5}."
      ],
      keyTerms: ["x != -2", "x !=-2", "3x - 1 = 2(x+2)", "3x-1=2x+4", "x = 5", "S = {5}", "S={5}"]
    }
  ]
};
