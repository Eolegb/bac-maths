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
    title: "Dérivation",
    sub: "Calculer une dérivée en 3 secondes et relier son signe aux variations.",
    rules: [
      {
        head: "Dérivées des fonctions usuelles",
        body: "Connaître ces 4 formules <b>par cœur</b>. La dérivée d'une constante est <b>toujours 0</b>.",
        eq: "(x^n)' = nx^{n-1} \\qquad (\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}} \\qquad \\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2} \\qquad (k)' = 0",
        piege: "Erreur : $(3)' = 3$ — Non. La d\u00e9riv\u00e9e de n'importe quelle constante est $0$.",
        etapes: [
          "Identifier le type de fonction (puissance, racine, inverse, constante)",
          "Appliquer la formule correspondante",
          "Conserver le coefficient multiplicateur devant",
          "Simplifier l'expression obtenue"
        ]
      },
      {
        head: "D\u00e9riv\u00e9e d'un produit $uv$",
        body: "Deux blocs qui se <b>multiplient</b> → on applique $u'v + uv'$. Ne <b>jamais</b> d\u00e9river chaque facteur s\u00e9par\u00e9ment.",
        eq: "(u \\times v)' = u'v + uv' \\qquad \\text{ex : } ((2x+1)(x^2))' = 2 \\cdot x^2 + (2x+1) \\cdot 2x",
        piege: "Erreur : $(x^2 \\times 3x)' = 2x \\times 3$ — Non. On applique $u'v+uv' = 2x \\cdot 3x + x^2 \\cdot 3$.",
        etapes: [
          "Poser $u(x) = \\dots$ et $v(x) = \\dots$ au brouillon",
          "Calculer $u'(x)$ et $v'(x)$ s\u00e9par\u00e9ment",
          "Assembler : $u'v + uv'$",
          "D\u00e9velopper et simplifier le r\u00e9sultat"
        ]
      },
      {
        head: "Signe de $f'$ → variations de $f$",
        body: "Le <b>signe</b> de $f'(x)$ commande les variations de $f$. $f'(x) > 0$ → $f$ <b>monte</b>. Le signe de $f(x)$ n'a rien \u00e0 voir.",
        eq: "f'(x) > 0 \\implies f \\nearrow \\qquad f'(x) < 0 \\implies f \\searrow \\qquad f'(x) = 0 \\implies \\text{tangente horizontale}",
        piege: "Erreur : $f(x) > 0$ donc $f$ est croissante — Non. C'est le <b>signe de $f'$</b> qui donne la variation, pas le signe de $f$.",
        etapes: [
          "Calculer $f'(x)$ et factoriser au maximum",
          "R\u00e9soudre $f'(x) = 0$ pour trouver les points critiques",
          "\u00c9tudier le signe de $f'(x)$ sur chaque intervalle",
          "Dresser le tableau : ligne $f'(x)$ (signes) → ligne $f$ (fl\u00e8ches)"
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Fonction exponentielle",
    sub: "Propri\u00e9t\u00e9s, d\u00e9rivation et \u00e9quations avec $e^x$.",
    rules: [
      {
        head: "Propri\u00e9t\u00e9s de calcul de $e^x$",
        body: "L'exponentielle transforme une <b>somme en produit</b>. $e^x$ est <b>toujours strictement positive</b>. Il n'y a <b>aucune r\u00e8gle</b> pour l'addition.",
        eq: "e^a \\cdot e^b = e^{a+b} \\qquad \\dfrac{e^a}{e^b} = e^{a-b} \\qquad (e^a)^n = e^{na} \\qquad e^0 = 1",
        piege: "Erreur : $e^a + e^b = e^{a+b}$ — Non. On ne peut <b>jamais</b> simplifier une addition d'exponentielles. Seule la multiplication a une r\u00e8gle.",
        etapes: [
          "Rep\u00e9rer les $e$ qui se multiplient ou se divisent (pas les additions !)",
          "Additionner les exposants pour un produit : $e^a \\cdot e^b = e^{a+b}$",
          "Soustraire les exposants pour un quotient : $e^a / e^b = e^{a-b}$",
          "V\u00e9rifier : $e^a + e^b$ → on laisse tel quel, pas de simplification"
        ]
      },
      {
        head: "D\u00e9riv\u00e9e de $e^u$",
        body: "La d\u00e9riv\u00e9e de $e^{u(x)}$ = $e^{u(x)}$ <b>multipli\u00e9 par</b> la d\u00e9riv\u00e9e de l'exposant $u'$. On ne d\u00e9rive pas que l'exponentielle.",
        eq: "(e^u)' = u' \\cdot e^u \\qquad \\text{ex : } (e^{5x})' = 5e^{5x} \\qquad (e^{x^2})' = 2x \\cdot e^{x^2}",
        piege: "Erreur : $(e^{x^2})' = e^{x^2}$ — Non. L'exposant $x^2$ doit aussi \u00eatre d\u00e9riv\u00e9 : $(e^{x^2})' = 2x \\cdot e^{x^2}$.",
        etapes: [
          "Isoler l'exposant : $u(x) = \\dots$",
          "Calculer $u'(x)$",
          "\u00c9crire le produit final : $u' \\times e^u$",
          "Ne pas d\u00e9velopper, garder la factorisation par $e^u$ (utile pour le signe)"
        ]
      },
      {
        head: "\u00c9quations avec $e^x$",
        body: "$e^A = e^B \\iff A = B$. L'exponentielle est <b>injective</b> : deux exponentielles sont \u00e9gales si et seulement si leurs exposants sont \u00e9gaux.",
        eq: "e^{2x} = e^{x+3} \\iff 2x = x+3 \\iff x = 3 \\qquad e^{2x} \\neq 2e^x \\ \\text{(pi\u00e8ge classique !)}",
        piege: "Erreur : $e^{2x} = 2e^x$ — Non. $e^{2x} = (e^x)^2$, ce n'est <b>pas</b> $2 \\times e^x$. L'exposant ne sort pas devant.",
        etapes: [
          "Isoler $e^u$ \u00e0 gauche et $e^v$ \u00e0 droite",
          "\u00c9galiser les exposants : $u(x) = v(x)$",
          "R\u00e9soudre l'\u00e9quation obtenue (souvent du 1er degr\u00e9)",
          "V\u00e9rifier : $e^x$ toujours $>0$, donc pas de valeur interdite"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Suites num\u00e9riques",
    sub: "Terme g\u00e9n\u00e9ral, somme et monotonie des suites arithm\u00e9tiques et g\u00e9om\u00e9triques.",
    rules: [
      {
        head: "Terme g\u00e9n\u00e9ral $u_n$",
        body: "Deux formules pour calculer <b>directement</b> n'importe quel terme sans passer par les pr\u00e9c\u00e9dents. Arithm\u00e9tique = <b>addition</b>, G\u00e9om\u00e9trique = <b>puissance</b>.",
        eq: "\\text{Arith : } u_n = u_0 + nr \\qquad \\text{G\u00e9o : } u_n = u_0 \\times q^n \\qquad (\\text{si } 1^{er} \\text{ terme } u_1,\\ n \\to n-1)",
        piege: "Erreur : g\u00e9om\u00e9trique → $u_n = u_0 \\times n \\times q$ — Non. La raison est \u00e0 la <b>puissance</b> $n$ : $u_n = u_0 \\times q^n$, pas une multiplication.",
        etapes: [
          "Identifier la nature : arithm\u00e9tique ($+r$) ou g\u00e9om\u00e9trique ($\\times q$)",
          "Noter le terme initial $u_0$ (ou $u_1$) et la raison ($r$ ou $q$)",
          "Appliquer la formule avec $n$ (attention : si 1er terme $u_1$, utiliser $n-1$)",
          "Calculer en respectant les priorit\u00e9s : puissance d'abord pour $q^n$"
        ]
      },
      {
        head: "Somme des termes",
        body: "Arithm\u00e9tique : <b>moyenne</b> extr\u00eames × nombre de termes. G\u00e9om\u00e9trique : $1^{er}$ terme × $(1-q^{\\text{nb}})/(1-q)$.",
        eq: "S_{\\text{arit}} = (\\text{nb}) \\times \\dfrac{u_{\\text{premier}} + u_{\\text{dernier}}}{2} \\qquad S_{\\text{g\u00e9o}} = u_{\\text{premier}} \\times \\dfrac{1 - q^{\\text{nb}}}{1 - q}",
        piege: "Erreur : de $u_0$ \u00e0 $u_{10}$, il y a $10$ termes — Non. De $u_0$ \u00e0 $u_{10}$, il y a <b>$11$</b> termes. Toujours compter : $n+1$ si on part de $u_0$.",
        etapes: [
          "Compter le nombre de termes (de l'indice de d\u00e9part \u00e0 l'indice d'arriv\u00e9e + 1)",
          "Calculer le premier et le dernier terme de la somme",
          "Appliquer la formule selon la nature (moyenne ou $(1-q^{\\text{nb}})$)",
          "V\u00e9rifier que $q \\neq 1$ pour la formule g\u00e9om\u00e9trique"
        ]
      },
      {
        head: "Sens de variation",
        body: "On \u00e9tudie le <b>signe</b> de la diff\u00e9rence $u_{n+1} - u_n$. Arithm\u00e9tique : signe de $r$. G\u00e9om\u00e9trique : d\u00e9pend de $q$ et du signe de $u_0$.",
        eq: "u_{n+1} - u_n > 0 \\iff (u_n) \\nearrow \\qquad \\text{Arith : } r > 0 \\implies \\nearrow \\qquad \\text{G\u00e9o : si } q>1 \\text{ et } u_0>0 \\implies \\nearrow",
        piege: "Erreur : regarder le signe de $u_n$ pour d\u00e9terminer la variation — Non. C'est la <b>diff\u00e9rence</b> $u_{n+1}-u_n$ qui compte, pas la valeur de $u_n$.",
        etapes: [
          "Exprimer $u_{n+1}$ en fonction de $n$",
          "Calculer $u_{n+1} - u_n$ et factoriser",
          "\u00c9tudier le signe de cette diff\u00e9rence (pour tout $n \\in \\mathbb{N}$)",
          "Conclure : croissante si $>0$, d\u00e9croissante si $<0$, constante si $=0$"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Second degr\u00e9",
    sub: "Discriminant, forme canonique et signe du trin\u00f4me.",
    rules: [
      {
        head: "Discriminant $\\Delta$ et racines",
        body: "$\\Delta = b^2 - 4ac$ d\u00e9termine tout. <b>Toujours mettre $b$ entre parenth\u00e8ses</b> s'il est n\u00e9gatif avant de le mettre au carr\u00e9.",
        eq: "\\Delta = b^2 - 4ac \\qquad x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} \\qquad \\Delta < 0 \\implies \\text{pas de racine r\u00e9elle}",
        piege: "Erreur : $(-3)^2 = -9$ — Non. Un carr\u00e9 est <b>toujours positif</b>. Mettre $b$ entre parenth\u00e8ses : $(-3)^2 = 9$. La calculette non plus ne devine pas.",
        etapes: [
          "Identifier $a$, $b$, $c$ dans l'\u00e9criture $ax^2 + bx + c = 0$",
          "Calculer $\\Delta = b^2 - 4ac$ (parenth\u00e8ses autour de $b$ si n\u00e9gatif !)",
          "Si $\\Delta \\ge 0$ : $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$",
          "Si $\\Delta < 0$ : pas de solution r\u00e9elle, \u00e9crire $\\varnothing$"
        ]
      },
      {
        head: "Forme canonique et sommet",
        body: "R\u00e9\u00e9criture unique qui fait appara\u00eetre le <b>sommet</b> $S(\\alpha ; \\beta)$. Le signe <b>moins</b> dans $(x-\\alpha)$ est obligatoire.",
        eq: "f(x) = a(x - \\alpha)^2 + \\beta \\qquad \\alpha = -\\dfrac{b}{2a},\\quad \\beta = f(\\alpha) \\qquad a > 0 \\implies \\text{minimum en } \\beta",
        piege: "Erreur : \u00e9crire $(x + \\alpha)^2$ au lieu de $(x - \\alpha)^2$ — Non. La formule est <b>toujours</b> $(x - \\alpha)^2$. Si $\\alpha = -3$, alors $(x - (-3))^2 = (x+3)^2$.",
        etapes: [
          "Calculer $\\alpha = -b/(2a)$ (attention au signe moins !)",
          "Calculer $\\beta = f(\\alpha)$ en rempla\u00e7ant $x$ par $\\alpha$",
          "\u00c9crire $f(x) = a(x - \\alpha)^2 + \\beta$",
          "Identifier le sommet $S(\\alpha ; \\beta)$ et la nature (min si $a>0$, max si $a<0$)"
        ]
      },
      {
        head: "Signe du trin\u00f4me",
        body: "Le signe d\u00e9pend de $\\Delta$ et du <b>signe de $a$</b>. Si $\\Delta \\le 0$, le trin\u00f4me est <b>du signe de $a$ partout</b>.",
        eq: "\\Delta > 0 : \\text{signe de } a \\text{ \u00e0 l'ext\u00e9rieur des racines} \\qquad \\Delta \\le 0 : \\text{signe de } a \\text{ partout}",
        piege: "Erreur : $\\Delta < 0$ donc $f(x) > 0$ — Non. Si $a$ est <b>n\u00e9gatif</b>, $f$ est n\u00e9gative partout. Toujours v\u00e9rifier le signe de $a$.",
        etapes: [
          "Calculer $\\Delta$ et les racines si $\\Delta > 0$",
          "Noter le signe de $a$ (positif ou n\u00e9gatif)",
          "Si $\\Delta > 0$ : signe de $a$ \u00e0 l'ext\u00e9rieur des racines, $-a$ entre elles",
          "Si $\\Delta \\le 0$ : signe constant = signe de $a$"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Variables al\u00e9atoires",
    sub: "Loi de probabilit\u00e9, esp\u00e9rance, variance et \u00e9cart-type.",
    rules: [
      {
        head: "Loi de probabilit\u00e9",
        body: "Tableau associant chaque valeur possible $x_i$ \u00e0 sa probabilit\u00e9 $P(X=x_i)$. La <b>somme de toutes les probas doit valoir $1$</b>.",
        eq: "\\sum_{i=1}^n P(X = x_i) = 1 \\qquad 0 \\le P(X = x_i) \\le 1",
        piege: "Erreur : somme des probas $\\neq 1$ et ne pas le remarquer — Toujours <b>v\u00e9rifier la somme</b> avant de continuer. Si $\\sum p_i \\neq 1$, il manque une issue ou il y a une erreur.",
        etapes: [
          "Lister toutes les valeurs possibles $x_i$ de $X$",
          "Calculer chaque probabilit\u00e9 $P(X = x_i)$",
          "V\u00e9rifier que $\\sum P(X=x_i) = 1$",
          "Pr\u00e9senter le tableau \u00e0 deux lignes : $x_i$ et $P(X=x_i)$"
        ]
      },
      {
        head: "Esp\u00e9rance $E(X)$",
        body: "La <b>moyenne pond\u00e9r\u00e9e</b> des valeurs par leurs probabilit\u00e9s. Chaque $x_i$ est multipli\u00e9 par sa proba, <b>pas par son effectif</b>.",
        eq: "E(X) = x_1 p_1 + x_2 p_2 + \\cdots + x_n p_n = \\sum_{i=1}^n x_i p_i",
        piege: "Erreur : multiplier les $x_i$ par les effectifs au lieu des probabilit\u00e9s — Non. $E(X)$ utilise les <b>probabilit\u00e9s</b> $p_i$, pas le nombre d'occurrences.",
        etapes: [
          "Reprendre le tableau $(x_i, p_i)$ de la loi de probabilit\u00e9",
          "Calculer chaque produit $x_i \\times p_i$",
          "Additionner tous ces produits",
          "Interpr\u00e9ter : gain moyen par partie sur un grand nombre de r\u00e9p\u00e9titions"
        ]
      },
      {
        head: "Variance $V(X)$ et \u00e9cart-type $\\sigma$",
        body: "La variance mesure la <b>dispersion</b> autour de l'esp\u00e9rance. Toujours utiliser la formule $V(X)=E(X^2)-[E(X)]^2$, c'est la plus rapide.",
        eq: "V(X) = E(X^2) - [E(X)]^2 \\qquad \\sigma(X) = \\sqrt{V(X)} \\qquad E(X^2) = \\sum x_i^2 p_i",
        piege: "Erreur : croire que $E(X^2) = [E(X)]^2$ — Non. $E(X^2) = \\sum x_i^2 p_i$ : on \u00e9l\u00e8ve <b>chaque valeur</b> au carr\u00e9, puis on pond\u00e8re. Ce n'est pas le carr\u00e9 de l'esp\u00e9rance.",
        etapes: [
          "Calculer $E(X)$",
          "Calculer $E(X^2) = \\sum x_i^2 p_i$ (chaque valeur au carr\u00e9 × sa proba)",
          "Appliquer $V(X) = E(X^2) - [E(X)]^2$",
          "Prendre la racine carr\u00e9e pour obtenir $\\sigma(X)$"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Proba conditionnelles",
    sub: "Probabilit\u00e9s sachant un \u00e9v\u00e9nement, arbres pond\u00e9r\u00e9s et formule des probabilit\u00e9s totales.",
    rules: [
      {
        head: "Probabilit\u00e9 conditionnelle $P_A(B)$",
        body: "Probabilit\u00e9 que $B$ arrive <b>sachant que</b> $A$ est d\u00e9j\u00e0 r\u00e9alis\u00e9. On r\u00e9duit l'univers \u00e0 $A$. Ne pas confondre avec $P(A \\cap B)$.",
        eq: "P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} \\qquad P(A \\cap B) = P(A) \\times P_A(B) \\qquad (P(A) \\neq 0)",
        piege: "Erreur : confondre $P_A(B)$ et $P(A \\cap B)$ — Non. $P(A \\cap B)$ = probabilit\u00e9 des <b>deux</b> \u00e9v\u00e9nements. $P_A(B)$ = probabilit\u00e9 de $B$ <b>parmi ceux qui ont d\u00e9j\u00e0</b> $A$.",
        etapes: [
          "Identifier la condition : $A$ est l'\u00e9v\u00e9nement qu'on suppose r\u00e9alis\u00e9",
          "Calculer $P(A \\cap B)$ et $P(A)$",
          "Appliquer $P_A(B) = P(A \\cap B) / P(A)$",
          "V\u00e9rifier que le r\u00e9sultat est bien entre $0$ et $1$"
        ]
      },
      {
        head: "Arbre pond\u00e9r\u00e9",
        body: "Sch\u00e9ma o\u00f9 chaque n\u0153ud repr\u00e9sente une <b>condition</b>. On <b>multiplie</b> le long d'un chemin pour obtenir l'intersection. On <b>additionne</b> les chemins qui arrivent au m\u00eame \u00e9v\u00e9nement.",
        eq: "P(A \\cap B) = P(A) \\times P_A(B) \\qquad \\text{Chemin : } A \\xrightarrow{P(A)} \\xrightarrow{P_A(B)} B",
        piege: "Erreur : additionner le long d'un chemin ($P(A) + P_A(B)$) — Non. Sur un chemin on <b>multiplie</b>. On additionne uniquement les <b>chemins diff\u00e9rents</b> qui arrivent au m\u00eame endroit.",
        etapes: [
          "Placer les branches de 1er niveau ($A$ et $\\bar{A}$) avec leurs probas",
          "Pour chaque branche, ajouter le 2e niveau avec les probas conditionnelles",
          "Multiplier le long de chaque chemin complet",
          "Additionner les chemins qui aboutissent au m\u00eame \u00e9v\u00e9nement"
        ]
      },
      {
        head: "Probabilit\u00e9s totales",
        body: "Pour calculer $P(B)$, on <b>additionne toutes les intersections</b> qui m\u00e8nent \u00e0 $B$. $B$ peut arriver par $A$ <b>OU</b> par $\\bar{A}$.",
        eq: "P(B) = P(A \\cap B) + P(\\bar{A} \\cap B) = P(A)P_A(B) + P(\\bar{A})P_{\\bar{A}}(B)",
        piege: "Erreur : oublier le chemin via $\\bar{A}$ — Non. $B$ peut arriver <b>par tous les chemins</b> de l'arbre. Si on n'en prend qu'un, le r\u00e9sultat est faux.",
        etapes: [
          "Rep\u00e9rer sur l'arbre tous les chemins qui aboutissent \u00e0 $B$",
          "Calculer la probabilit\u00e9 de chaque chemin (produit des branches)",
          "Additionner tous ces chemins",
          "V\u00e9rifier que $P(B) \\le 1$"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Produit scalaire",
    sub: "Calcul analytique, formule avec le cosinus et orthogonalit\u00e9.",
    rules: [
      {
        head: "Formule analytique (coordonn\u00e9es)",
        body: "Avec les coordonn\u00e9es, le produit scalaire = <b>$x \\times x' + y \\times y'$</b>. On multiplie coordonn\u00e9e par coordonn\u00e9e, puis on additionne. Simple.",
        eq: "\\vec{u} \\cdot \\vec{v} = xx' + yy' \\qquad \\vec{u}\\begin{pmatrix}x\\\\y\\end{pmatrix},\\ \\vec{v}\\begin{pmatrix}x'\\\\y'\\end{pmatrix}",
        piege: "Erreur : $\\vec{u} \\cdot \\vec{v} = (x+y) \\times (x'+y')$ — Non. On fait $x \\times x' + y \\times y'$. Pas de croisement $x \\times y'$.",
        etapes: [
          "Extraire $x$ et $y$ de $\\vec{u}$, $x'$ et $y'$ de $\\vec{v}$",
          "Calculer $x \\times x'$",
          "Calculer $y \\times y'$",
          "Additionner les deux produits"
        ]
      },
      {
        head: "Formule avec le cosinus",
        body: "Utile quand on conna\u00eet les <b>normes</b> (longueurs) et l'<b>angle</b> $\\theta$ entre les deux vecteurs. Attention au <b>mode radians</b> de la calculatrice.",
        eq: "\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\theta) \\qquad \\|\\vec{u}\\| = \\sqrt{x^2 + y^2}",
        piege: "Erreur : calculatrice en degr\u00e9s au lieu de radians — Si l'angle est donn\u00e9 en rad ($\\pi/3$, etc.), v\u00e9rifier que la calculatrice est en <b>mode radian</b>.",
        etapes: [
          "Calculer les normes $\\|\\vec{u}\\|$ et $\\|\\vec{v}\\|$",
          "D\u00e9terminer l'angle $\\theta$ (en radians)",
          "Multiplier : $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$",
          "Si le r\u00e9sultat est n\u00e9gatif → l'angle est obtus ($> 90^\\circ$)"
        ]
      },
      {
        head: "Orthogonalit\u00e9",
        body: "Deux vecteurs sont <b>orthogonaux</b> si et seulement si leur produit scalaire <b>vaut $0$</b>. C'est LE seul test \u00e0 faire.",
        eq: "\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\qquad \\text{ex : } \\vec{u}(1;2),\\ \\vec{v}(-4;2) \\implies 1\\times(-4) + 2\\times2 = -4+4 = 0",
        piege: "Erreur : des vecteurs qui n'ont pas l'air orthogonaux sur le dessin ne le sont pas forc\u00e9ment — Ne pas se fier au dessin. <b>Seul le calcul</b> $\\vec{u} \\cdot \\vec{v} = 0$ prouve l'orthogonalit\u00e9.",
        etapes: [
          "Calculer $\\vec{u} \\cdot \\vec{v}$ (par la m\u00e9thode la plus simple)",
          "V\u00e9rifier si le r\u00e9sultat est \u00e9gal \u00e0 $0$",
          "Si $= 0$ → $\\vec{u} \\perp \\vec{v}$ (angle droit)",
          "Si $\\neq 0$ → calculer $\\cos\\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}$ pour trouver l'angle"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Trigonom\u00e9trie",
    sub: "Cercle trigonom\u00e9trique, valeurs remarquables et \u00e9quations trigonom\u00e9triques.",
    rules: [
      {
        head: "Cercle trigonom\u00e9trique",
        body: "Cercle de rayon $1$. Le <b>cosinus</b> se lit sur l'axe des $x$ (horizontal), le <b>sinus</b> sur l'axe des $y$ (vertical). $180^\\circ = \\pi$ radians.",
        eq: "\\theta \\mapsto (\\cos\\theta,\\ \\sin\\theta) \\qquad 0:(1,0)\\ \\ \\pi/6:(\\sqrt{3}/2,1/2)\\ \\ \\pi/4:(\\sqrt{2}/2,\\sqrt{2}/2)\\ \\ \\pi/3:(1/2,\\sqrt{3}/2)\\ \\ \\pi/2:(0,1)",
        piege: "Erreur : inverser $\\cos$ et $\\sin$ pour $\\pi/6$ et $\\pi/3$ — \u00c0 $\\pi/6=30^\\circ$, l'angle est <b>petit</b> donc $\\sin$ petit ($1/2$), $\\cos$ grand ($\\sqrt{3}/2$). \u00c0 $\\pi/3$, c'est l'inverse.",
        etapes: [
          "Convertir l'angle en radians si n\u00e9cessaire : $\\times \\pi/180$",
          "Placer l'angle sur le cercle trigonom\u00e9trique",
          "Lire $\\cos\\theta$ sur l'axe horizontal (abscisse du point)",
          "Lire $\\sin\\theta$ sur l'axe vertical (ordonn\u00e9e du point)"
        ]
      },
      {
        head: "Relation fondamentale",
        body: "Pour un <b>m\u00eame angle</b> $x$, la somme des carr\u00e9s du cosinus et du sinus vaut <b>toujours $1$</b>. Permet de trouver l'un si on conna\u00eet l'autre.",
        eq: "\\cos^2(x) + \\sin^2(x) = 1 \\qquad \\text{ex : } \\cos(\\pi/3) = \\dfrac{1}{2} \\implies \\sin(\\pi/3) = \\sqrt{1 - \\dfrac{1}{4}} = \\dfrac{\\sqrt{3}}{2}",
        piege: "Erreur : \u00e9crire $\\cos(x^2)$ au lieu de $\\cos^2(x)$ — $\\cos^2(x)$ signifie $(\\cos x)^2$, on \u00e9l\u00e8ve le <b>r\u00e9sultat</b> du cosinus au carr\u00e9, pas l'angle.",
        etapes: [
          "Calculer $\\cos^2(x)$ ou $\\sin^2(x)$ selon ce qui est connu",
          "Soustraire \u00e0 $1$ pour obtenir l'autre carr\u00e9",
          "Prendre la racine carr\u00e9e : $\\pm\\sqrt{\\dots}$",
          "Choisir le signe (+ ou -) selon le quadrant de l'angle"
        ]
      },
      {
        head: "\u00c9quations $\\cos x = a$ et $\\sin x = a$",
        body: "R\u00e9soudre sur le cercle. $\\cos x = \\cos\\alpha$ donne <b>deux familles</b> de solutions (sym\u00e9trie par rapport \u00e0 l'axe des $x$).",
        eq: "\\cos x = \\cos\\alpha \\iff x = \\alpha + 2k\\pi \\ \\text{ ou }\\ x = -\\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})",
        piege: "Erreur : ne donner qu'une seule solution — Pour $\\cos x = 1/2$, on a $x = \\pi/3$ <b>ET</b> $x = -\\pi/3$ (modulo $2\\pi$). Il y a toujours <b>deux</b> familles.",
        etapes: [
          "Identifier l'angle remarquable $\\alpha$ tel que $\\cos\\alpha = a$ (ou $\\sin\\alpha = a$)",
          "1re famille : $x = \\alpha + 2k\\pi$",
          "2e famille : $x = -\\alpha + 2k\\pi$ (pour cos) ou $x = \\pi-\\alpha + 2k\\pi$ (pour sin)",
          "Sp\u00e9cifier $k \\in \\mathbb{Z}$"
        ]
      }
    ]
  }
];

export const BAC_EXERCISES: Record<number, BacExercise[]> = {
  0: [
    {
      title: "Optimisation du volume d'une bo\u00eete",
      enonce: "On d\u00e9coupe un carr\u00e9 de c\u00f4t\u00e9 $x$ \u00e0 chaque coin d'une plaque carr\u00e9e de c\u00f4t\u00e9 $12$ cm, puis on rel\u00e8ve les bords pour former une bo\u00eete. Montrer que le volume $V(x) = 4x(6-x)^2$, puis d\u00e9terminer $x$ pour que le volume soit maximal.",
      correction: "$V(x) = x \\times (12-2x)^2 = x \\times 4(6-x)^2 = 4x(6-x)^2$. On d\u00e9rive : $V'(x) = 4(6-x)^2 + 4x \\cdot 2(6-x)(-1) = 4(6-x)[(6-x) - 2x] = 4(6-x)(6-3x)$. $V'(x) = 0$ pour $x=6$ ou $x=2$. $x \\in [0;6]$. Tableau de signe : $V'(x) > 0$ sur $[0;2]$, $V'(x) < 0$ sur $[2;6]$. Maximum en $x=2$ cm. $V_{\\max} = 4 \\times 2 \\times 16 = 128$ cm\u00b3.",
      points: ["Expression de $V(x)$ correcte", "D\u00e9riv\u00e9e correctement factoris\u00e9e", "\u00c9tude du signe de $V'$", "Conclusion avec justification"],
      keyTerms: ["V(x) = 4x(6-x)^2", "x=2", "maximum"]
    }
  ],
  1: [
    {
      title: "\u00c9tude compl\u00e8te avec exponentielle",
      enonce: "Soit $f(x) = e^{2x} - 4e^x + 3$ d\u00e9finie sur $\\mathbb{R}$. \u00c9tudier les variations de $f$ en utilisant le changement de variable $X = e^x$.",
      correction: "On pose $X = e^x$ ($X > 0$). Alors $f(x) = X^2 - 4X + 3 = (X-1)(X-3)$. $f'(x) = 2e^{2x} - 4e^x = 2e^x(e^x - 2)$. $f'(x) = 0 \\iff e^x = 2 \\iff x = \\ln 2$. $f'(x) < 0$ si $x < \\ln 2$, $f'(x) > 0$ si $x > \\ln 2$. $f$ d\u00e9cro\u00eet puis cro\u00eet. Minimum $f(\\ln 2) = 4 - 8 + 3 = -1$. $f(x) = 0 \\iff X=1$ ou $X=3 \\iff x=0$ ou $x=\\ln 3$.",
      points: ["Changement de variable $X=e^x$", "D\u00e9riv\u00e9e et factorisation", "Signe de $f'$", "Racines trouv\u00e9es"],
      keyTerms: ["X = e^x", "x = ln 2", "x = 0", "x = ln 3"]
    }
  ],
  2: [
    {
      title: "\u00c9pargne avec int\u00e9r\u00eats",
      enonce: "Un capital de $5\\,000$\u20ac est plac\u00e9 \u00e0 int\u00e9r\u00eats compos\u00e9s au taux annuel de $3\\%$. On note $C_n$ le capital apr\u00e8s $n$ ann\u00e9es. Exprimer $C_n$ en fonction de $n$, calculer le capital au bout de $10$ ans, et d\u00e9terminer au bout de combien d'ann\u00e9es le capital aura doubl\u00e9.",
      correction: "$C_n = 5000 \\times 1{,}03^n$ (suite g\u00e9om\u00e9trique de raison $q = 1{,}03$). $C_{10} = 5000 \\times 1{,}03^{10} \\approx 6\\,720$\u20ac. Pour le doublement : $5000 \\times 1{,}03^n \\ge 10\\,000 \\iff 1{,}03^n \\ge 2$. Par essais : $n=23 \\implies 1{,}03^{23} \\approx 1{,}97$ ; $n=24 \\implies 1{,}03^{24} \\approx 2{,}03$. Donc $n \\ge 24$ ans.",
      points: ["Expression de $C_n$", "Calcul de $C_{10}$", "Mise en \u00e9quation du doublement", "R\u00e9solution par essais successifs"],
      keyTerms: ["1,03^n", "6720", "24 ans"]
    }
  ],
  3: [
    {
      title: "Trajectoire d'un projectile",
      enonce: "La hauteur d'un projectile est donn\u00e9e par $h(t) = -5t^2 + 20t + 1{,}5$ (en m\u00e8tres, $t$ en secondes). D\u00e9terminer la hauteur maximale atteinte et l'instant o\u00f9 le projectile touche le sol.",
      correction: "Forme canonique : $\\alpha = -20/(2 \\times (-5)) = 2$, $\\beta = h(2) = -20 + 40 + 1{,}5 = 21{,}5$. Hauteur max = $21{,}5$ m \u00e0 $t = 2$ s. Sol : $-5t^2 + 20t + 1{,}5 = 0$. $\\Delta = 400 + 30 = 430$. $t_1 = \\frac{-20+\\sqrt{430}}{-10} \\approx -0{,}07$ (rejet\u00e9), $t_2 = \\frac{-20-\\sqrt{430}}{-10} \\approx 4{,}07$ s.",
      points: ["Calcul de $\\alpha$ et $\\beta$", "Hauteur maximale correcte", "\u00c9quation $h(t)=0$ pos\u00e9e", "Solution positive retenue"],
      keyTerms: ["21,5 m", "t = 2 s", "t ≈ 4,07 s"]
    }
  ],
  4: [
    {
      title: "Jeu de grattage",
      enonce: "Un ticket de loterie co\u00fbte $2$\u20ac. Les gains possibles sont : $0$\u20ac (probabilit\u00e9 $0{,}6$), $5$\u20ac (probabilit\u00e9 $0{,}3$), $20$\u20ac (probabilit\u00e9 $0{,}1$). Soit $X$ le gain alg\u00e9brique du joueur. Donner la loi de $X$, calculer $E(X)$ et dire si le jeu est \u00e9quitable.",
      correction: "Loi de $X$ : $X=-2$ (perte de la mise) avec $P=0{,}6$, $X=3$ avec $P=0{,}3$, $X=18$ avec $P=0{,}1$. V\u00e9rification : $0{,}6+0{,}3+0{,}1 = 1$. $E(X) = (-2) \\times 0{,}6 + 3 \\times 0{,}3 + 18 \\times 0{,}1 = -1{,}2 + 0{,}9 + 1{,}8 = 1{,}5$\u20ac. $E(X) > 0$, le jeu est favorable au joueur (pas \u00e9quitable).",
      points: ["Soustraction du prix du ticket", "Loi de probabilit\u00e9 correcte", "Somme des probas = 1", "Esp\u00e9rance calcul\u00e9e et interpr\u00e9t\u00e9e"],
      keyTerms: ["-2", "3", "18", "E(X)=1,5", "favorable"]
    }
  ],
  5: [
    {
      title: "Test de d\u00e9pistage",
      enonce: "Une maladie touche $2\\%$ de la population. Un test est fiable \u00e0 $95\\%$ (si on est malade, test positif \u00e0 $95\\%$ ; si on est sain, test n\u00e9gatif \u00e0 $95\\%$). Calculer la probabilit\u00e9 qu'une personne soit r\u00e9ellement malade sachant que son test est positif.",
      correction: "Soit $M$ = malade, $T$ = test positif. $P(M) = 0{,}02$, $P_M(T) = 0{,}95$, $P_{\\bar{M}}(T) = 0{,}05$. $P(T) = P(M)P_M(T) + P(\\bar{M})P_{\\bar{M}}(T) = 0{,}02 \\times 0{,}95 + 0{,}98 \\times 0{,}05 = 0{,}019 + 0{,}049 = 0{,}068$. $P_T(M) = \\frac{P(M \\cap T)}{P(T)} = \\frac{0{,}019}{0{,}068} \\approx 0{,}279$. Seulement $28\\%$ de chances d'\u00eatre malade malgr\u00e9 un test positif !",
      points: ["Arbre ou tableau correct", "$P(T)$ par probas totales", "Application de Bayes", "Interpr\u00e9tation du r\u00e9sultat"],
      keyTerms: ["0,068", "0,279", "28%"]
    }
  ],
  6: [
    {
      title: "Triangle rectangle \u00e0 d\u00e9montrer",
      enonce: "Dans un rep\u00e8re orthonorm\u00e9, on donne $A(-2;1)$, $B(3;-1)$ et $C(1;4)$. D\u00e9montrer que le triangle $ABC$ est rectangle en $A$.",
      correction: "$\\vec{AB} = (3-(-2); -1-1) = (5;-2)$ et $\\vec{AC} = (1-(-2); 4-1) = (3;3)$. $\\vec{AB} \\cdot \\vec{AC} = 5 \\times 3 + (-2) \\times 3 = 15 - 6 = 9$. Le produit scalaire n'est pas nul, donc le triangle n'est <b>pas</b> rectangle en $A$. V\u00e9rifions en $B$ : $\\vec{BA} = (-5;2)$, $\\vec{BC} = (-2;5)$. $\\vec{BA} \\cdot \\vec{BC} = (-5)(-2) + 2 \\times 5 = 10 + 10 = 20 \\neq 0$. En $C$ : $\\vec{CA} = (-3;-3)$, $\\vec{CB} = (2;-5)$. $\\vec{CA} \\cdot \\vec{CB} = (-3)(2) + (-3)(-5) = -6 + 15 = 9 \\neq 0$. Le triangle n'est pas rectangle. (Cet exercice montre qu'il faut v\u00e9rifier les trois sommets.)",
      points: ["Coordonn\u00e9es des vecteurs", "Calcul du produit scalaire", "Test des trois sommets", "Conclusion argument\u00e9e"],
      keyTerms: ["AB(5;-2)", "AC(3;3)", "9", "non rectangle"]
    }
  ],
  7: [
    {
      title: "\u00c9quation trigonom\u00e9trique",
      enonce: "R\u00e9soudre dans $\\mathbb{R}$ l'\u00e9quation $\\cos(2x) = \\dfrac{\\sqrt{3}}{2}$, puis donner les solutions dans $[0 ; 2\\pi]$.",
      correction: "$\\cos(2x) = \\frac{\\sqrt{3}}{2} \\iff \\cos(2x) = \\cos(\\pi/6)$. Donc $2x = \\pi/6 + 2k\\pi$ ou $2x = -\\pi/6 + 2k\\pi$. Soit $x = \\pi/12 + k\\pi$ ou $x = -\\pi/12 + k\\pi$. Dans $[0;2\\pi]$ : $k=0 \\implies \\pi/12$ et $11\\pi/12$ (via $-\\pi/12+\\pi$) ; $k=1 \\implies 13\\pi/12$ et $23\\pi/12$. Les 4 solutions : $\\pi/12$, $11\\pi/12$, $13\\pi/12$, $23\\pi/12$.",
      points: ["Reconnaissance de $\\cos(\\pi/6)$", "\u00c9criture des deux familles", "Division par 2 correcte", "Solutions dans $[0;2\\pi]$"],
      keyTerms: ["cos(π/6)", "π/12", "11π/12", "13π/12", "23π/12"]
    }
  ]
};
