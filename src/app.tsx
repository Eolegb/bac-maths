import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Flame,
  CheckCircle2,
  XCircle,
  Share,
  Sparkles,
  Award,
  Download,
  RefreshCw,
  Info,
  ArrowRight,
  BookMarked,
  PlusCircle,
  PlusSquare,
  AlertCircle
} from "lucide-react";
import "katex/dist/katex.min.css";
import { MODULES, BAC_EXERCISES, BacExercise } from "./data/modules";
import { GENERATORS, checkAnswer, MathProblem, rnd } from "./utils/generators";
import { Latex } from "./components/Latex";

export default function App() {
  // Navigation & Module states
  const [activeTab, setActiveTab] = useState<"exos" | "memo">("exos");
  const [currentModuleId, setCurrentModuleId] = useState<number>(0);
  const [level, setLevel] = useState<"debutant" | "intermediaire" | "bac">("debutant");

  // Stats & Progress
  const [score, setScore] = useState<{ ok: number; tot: number }>({ ok: 0, tot: 0 });
  const [streak, setStreak] = useState<number>(0);
  const [history, setHistory] = useState<("ok" | "bad")[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(1);

  // Exercise state
  const [autoProblem, setAutoProblem] = useState<MathProblem | null>(null);
  const [bacProblem, setBacProblem] = useState<BacExercise | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showBacCorrection, setShowBacCorrection] = useState<boolean>(false);
  const [bacTextResponse, setBacTextResponse] = useState<string>(`Étape 1 : \nÉtape 2 : \nConclusion : `);

  // PWA & UI states
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const capTargetRef = useRef<HTMLDivElement>(null);

  // Initialize and load state
  useEffect(() => {
    // Detect PWA status
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    // Detect iOS
    const detectIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(detectIOS);

    // Load score from localStorage if available
    const savedScore = localStorage.getItem("spe_maths_score");
    const savedStreak = localStorage.getItem("spe_maths_streak");
    const savedHistory = localStorage.getItem("spe_maths_history");
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (e) {}
    }
    if (savedStreak) setStreak(parseInt(savedStreak, 10) || 0);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {}
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (score.tot > 0) {
      localStorage.setItem("spe_maths_score", JSON.stringify(score));
      localStorage.setItem("spe_maths_streak", String(streak));
      localStorage.setItem("spe_maths_history", JSON.stringify(history));
    }
  }, [score, streak, history]);

  // Generate a problem on load/change
  useEffect(() => {
    generateNewExercise();
  }, [currentModuleId, level]);

  const generateNewExercise = () => {
    setUserInput("");
    setHasChecked(false);
    setShowBacCorrection(false);
    
    if (level === "bac") {
      const pool = BAC_EXERCISES[currentModuleId];
      if (pool && pool.length > 0) {
        // Randomly select or cycle through bac questions
        const index = rnd(0, pool.length - 1);
        setBacProblem(pool[index]);
        setBacTextResponse(`Étape 1 : \nÉtape 2 : \nConclusion : `);
      } else {
        setBacProblem(null);
      }
      setAutoProblem(null);
    } else {
      const moduleGens = GENERATORS[currentModuleId];
      if (moduleGens) {
        const pool = level === "debutant" ? moduleGens.debutant : moduleGens.intermediaire;
        if (pool && pool.length > 0) {
          const genFunc = pool[rnd(0, pool.length - 1)];
          setAutoProblem(genFunc());
        }
      }
      setBacProblem(null);
    }
    
    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Keyboard shortcut helper for inserting mathematical symbols on mobile
  const insertSymbol = (symbol: string) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const start = input.selectionStart ?? userInput.length;
    const end = input.selectionEnd ?? userInput.length;
    const newValue = userInput.substring(0, start) + symbol + userInput.substring(end);
    setUserInput(newValue);
    
    setTimeout(() => {
      input.focus();
      const newPos = start + symbol.length;
      input.setSelectionRange(newPos, newPos);
    }, 0);
  };

  // Validate answer for auto-generated exercises
  const handleCheckAuto = () => {
    if (!autoProblem || hasChecked) return;
    
    const correct = checkAnswer(userInput, autoProblem.ans, autoProblem.aliases);
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      setScore(prev => ({ ok: prev.ok + 1, tot: prev.tot + 1 }));
      setStreak(prev => prev + 1);
      setHistory(prev => [...prev, "ok"]);
    } else {
      setStreak(0);
      setHistory(prev => [...prev, "bad"]);
      setScore(prev => ({ ...prev, tot: prev.tot + 1 }));
    }
    
    setCurrentProblemIndex(prev => prev + 1);
  };

  // Handle student self-evaluation for BAC questions
  const handleSelfGrade = (grade: "bon" | "partiel" | "erreur") => {
    setHasChecked(true);
    if (grade === "bon") {
      setScore(prev => ({ ok: prev.ok + 1, tot: prev.tot + 1 }));
      setStreak(prev => prev + 1);
      setHistory(prev => [...prev, "ok"]);
    } else if (grade === "partiel") {
      // Counts towards total but doesn't increment streak
      setScore(prev => ({ ...prev, tot: prev.tot + 1 }));
      setStreak(0);
      setHistory(prev => [...prev, "ok"]);
    } else {
      setScore(prev => ({ ...prev, tot: prev.tot + 1 }));
      setStreak(0);
      setHistory(prev => [...prev, "bad"]);
    }
    setCurrentProblemIndex(prev => prev + 1);
  };

  const handleNext = () => {
    generateNewExercise();
  };

  // Clean stats
  const handleResetStats = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser toutes vos statistiques ?")) {
      setScore({ ok: 0, tot: 0 });
      setStreak(0);
      setHistory([]);
      localStorage.removeItem("spe_maths_score");
      localStorage.removeItem("spe_maths_streak");
      localStorage.removeItem("spe_maths_history");
    }
  };

  // Download score card using html2canvas
  const handleDownloadCard = async () => {
    if (!capTargetRef.current) return;
    try {
      const canvas = await html2canvas(capTargetRef.current, {
        backgroundColor: "#131318",
        scale: 2,
        useCORS: true
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `spe-maths-bilan-${new Date().toISOString().slice(0,10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur lors de la capture d'écran", err);
    }
  };

  // Check if a specific keyword matches in the student's handwritten response (mini local diagnostics)
  const getMockAIDiagnostics = () => {
    if (!bacProblem) return null;
    const responseLower = bacTextResponse.toLowerCase().replace(/\s+/g, "");
    
    // Check key mathematical expressions
    const matchedTerms = bacProblem.keyTerms.filter(term => {
      const normTerm = term.toLowerCase().replace(/\s+/g, "");
      return responseLower.includes(normTerm);
    });

    if (matchedTerms.length === bacProblem.keyTerms.length) {
      return {
        status: "bon",
        text: "Tous les résultats finaux attendus semblent figurer dans votre copie. Très bon calcul littéral !",
        count: matchedTerms.length
      };
    } else if (matchedTerms.length > 0) {
      return {
        status: "partiel",
        text: `Certains résultats clés (${matchedTerms.join(", ")}) ont été détectés, mais il manque des éléments. Relisez attentivement le corrigé.`,
        count: matchedTerms.length
      };
    } else {
      return {
        status: "erreur",
        text: "Aucun résultat final attendu n'a été détecté dans vos étapes. Examinez la correction pour repérer l'erreur.",
        count: 0
      };
    }
  };

  const selectedModule = MODULES[currentModuleId];
  const successRate = score.tot > 0 ? Math.round((score.ok / score.tot) * 100) : 0;

  // Custom virtual keys based on level/module
  const mathKeys = [
    { label: "x", value: "x" },
    { label: "x²", value: "x^2" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: "/", value: "/" },
    { label: "+", value: "+" },
    { label: "-", value: "-" },
    { label: "=", value: "=" },
    { label: "<", value: "<" },
    { label: ">", value: ">" },
    { label: "ou", value: " ou " }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0f] text-[#ededf5] pb-10">
      
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#131318]/90 backdrop-blur-md border-b border-[#252530] px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f0c040] to-[#e8a020] flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="font-['Syne'] font-extrabold text-black text-xl">√</span>
          </div>
          <div>
            <h1 className="font-['Syne'] font-extrabold text-base md:text-lg tracking-tight text-white leading-tight">
              Spé Maths <span className="text-[#f0c040]">Bac</span>
            </h1>
            <span className="text-[10px] text-[#8888a8] block font-mono">CALCUL LITTÉRAL · 1ÈRE &amp; SECONDE</span>
          </div>
        </div>

        {/* Module selection drop down */}
        <div className="relative min-w-[180px] sm:min-w-[240px]">
          <select
            value={currentModuleId}
            onChange={(e) => setCurrentModuleId(parseInt(e.target.value, 10))}
            className="w-full appearance-none bg-[#1a1a22] border border-[#32323f] text-[#ededf5] text-xs font-semibold py-2 pl-4 pr-10 rounded-full cursor-pointer focus:outline-none focus:border-[#f0c040] transition-colors"
          >
            {MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                {`0${m.id + 1} · ${m.title}`}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8888a8] text-[10px]">
            ▼
          </div>
        </div>

        {/* Right Header Side: Stats & Installation button */}
        <div className="flex items-center gap-2">
          {/* iOS Install Prompt Button */}
          {!isStandalone && (
            <button
              onClick={() => setShowInstallModal(true)}
              className="bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-[#f0c040] text-xs font-medium py-1.5 px-3 rounded-full flex items-center gap-1.5 transition-all"
            >
              <PlusCircle size={13} />
              <span className="hidden sm:inline">
                {isIOS ? "Installer sur Safari" : "Installer l'App"}
              </span>
              <span className="sm:hidden">Installer</span>
            </button>
          )}

          {/* Stats quick view */}
          <button
            onClick={() => setShowStatsModal(true)}
            className="bg-[#1a1a22] border border-[#252530] rounded-full py-1.5 px-3 text-xs flex items-center gap-2 hover:border-[#f0c040] transition-all"
          >
            <span className="text-[#3ecfa0] font-mono font-bold">{score.ok}</span>
            <span className="text-[#484860]">/</span>
            <span className="text-[#8888a8] font-mono">{score.tot}</span>
            <span className="text-[#484860]">|</span>
            <span className="text-[#f0c040] flex items-center gap-0.5 font-bold font-mono">
              <Flame size={12} className="fill-[#f0c040] animate-pulse" />
              {streak}
            </span>
          </button>
        </div>
      </header>

      {/* ── SUB-TABS (Exercices vs Formulaire) ── */}
      <div className="bg-[#131318] border-b border-[#252530] px-4 md:px-8 flex items-center justify-between">
        <div className="flex">
          <button
            onClick={() => setActiveTab("exos")}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "exos"
                ? "border-[#f0c040] text-[#ededf5]"
                : "border-transparent text-[#484860] hover:text-[#8888a8]"
            }`}
          >
            <Sparkles size={14} />
            Entraînement
          </button>
          <button
            onClick={() => setActiveTab("memo")}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "memo"
                ? "border-[#f0c040] text-[#ededf5]"
                : "border-transparent text-[#484860] hover:text-[#8888a8]"
            }`}
          >
            <BookMarked size={14} />
            Fiches Mémo
          </button>
        </div>
        
        {/* Module Title Display */}
        <div className="hidden lg:block text-right">
          <span className="text-xs text-[#8888a8] font-mono">Chapitre actif :</span>
          <p className="text-xs font-bold text-white uppercase tracking-wider">{selectedModule.title}</p>
        </div>
      </div>

      {/* ── APP BODY CONTENT ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 pt-6 md:pt-10">
        {activeTab === "exos" ? (
          <div className="space-y-6">
            
            {/* Level Selector & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131318] p-4 rounded-2xl border border-[#252530]">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#8888a8] uppercase">Chapitre {selectedModule.id + 1}</span>
                <h2 className="text-lg font-bold text-white leading-tight font-['Syne'] mt-0.5">{selectedModule.title}</h2>
              </div>
              
              {/* Level Buttons */}
              <div className="flex bg-[#0c0c0f] p-1 rounded-xl border border-[#252530]">
                <button
                  onClick={() => setLevel("debutant")}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 text-xs font-semibold rounded-lg transition-all ${
                    level === "debutant"
                      ? "bg-[#f0c040] text-black shadow-sm"
                      : "text-[#8888a8] hover:text-white"
                  }`}
                >
                  Débutant
                </button>
                <button
                  onClick={() => setLevel("intermediaire")}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 text-xs font-semibold rounded-lg transition-all ${
                    level === "intermediaire"
                      ? "bg-[#f0c040] text-black shadow-sm"
                      : "text-[#8888a8] hover:text-white"
                  }`}
                >
                  Intermédiaire
                </button>
                <button
                  onClick={() => setLevel("bac")}
                  className={`flex-1 sm:flex-initial py-1.5 px-4 text-xs font-semibold rounded-lg transition-all ${
                    level === "bac"
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "text-[#8888a8] hover:text-white"
                  }`}
                >
                  Type Bac
                </button>
              </div>
            </div>

            {/* ── AUTO-GENERATED EXERCISE (DEBUTANT & INTERMEDIAIRE) ── */}
            {level !== "bac" && autoProblem && (
              <div className="bg-[#131318] rounded-3xl border border-[#252530] p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#252530]/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-[#3ecfa0] border border-emerald-500/20">
                      Calcul Auto
                    </span>
                    <span className="text-xs text-[#8888a8] font-mono">Exo #{currentProblemIndex}</span>
                  </div>
                  <button
                    onClick={generateNewExercise}
                    className="text-[#8888a8] hover:text-white text-xs flex items-center gap-1 transition-all"
                  >
                    <RefreshCw size={13} /> Pas de côté
                  </button>
                </div>

                {/* Progress dot indicator */}
                <div className="flex gap-1.5 justify-start">
                  {history.slice(-10).map((h, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        h === "ok" ? "bg-[#3ecfa0]" : "bg-[#f05060]"
                      }`}
                    />
                  ))}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f0c040] animate-ping" />
                </div>

                {/* Instruction */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8888a8]">Consigne</h3>
                  <p className="text-base text-[#ededf5]">{autoProblem.instr}</p>
                </div>

                {/* Beautiful Math Display (iPhone responsive & scrollable) */}
                <div className="w-full flex justify-center bg-slate-950/60 border border-slate-900 rounded-2xl p-6 shadow-inner relative overflow-hidden group">
                  <div className="overflow-x-auto max-w-full text-center scrollbar-none">
                    <div className="inline-block py-2 px-1 whitespace-nowrap text-xl sm:text-2xl md:text-3xl text-yellow-400 font-medium">
                      <Latex math={autoProblem.eq} block={true} />
                    </div>
                  </div>
                </div>

                {/* Input block */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={hasChecked}
                      placeholder={hasChecked ? "" : "Écrire votre réponse littérale..."}
                      className={`flex-1 bg-[#1a1a22] border-2 rounded-xl py-3 px-4 text-sm font-mono text-white focus:outline-none transition-all ${
                        hasChecked
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-500/5 text-emerald-400"
                            : "border-rose-500 bg-rose-500/5 text-rose-400"
                          : "border-[#32323f] focus:border-[#f0c040]"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          hasChecked ? handleNext() : handleCheckAuto();
                        }
                      }}
                    />
                    {!hasChecked ? (
                      <button
                        onClick={handleCheckAuto}
                        disabled={!userInput.trim()}
                        className="bg-[#f0c040] hover:bg-[#e8a020] text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Valider
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="bg-[#f0c040] hover:bg-[#e8a020] text-black font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Exercice suivant
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>

                  {/* Smart Mobile Virtual Helper */}
                  {!hasChecked && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-[#8888a8] w-full mb-1">Raccourcis clavier mobile :</span>
                      {mathKeys.map((k) => (
                        <button
                          key={k.label}
                          onClick={() => insertSymbol(k.value)}
                          className="bg-[#1a1a22] hover:bg-[#252530] border border-[#32323f] text-[#ededf5] text-xs font-mono font-medium py-1.5 px-3 rounded-lg active:scale-95 transition-all"
                        >
                          {k.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Feedback block */}
                  {hasChecked && (
                    <div
                      className={`p-5 rounded-2xl border transition-all animate-fadeIn ${
                        isCorrect
                          ? "bg-emerald-500/5 border-emerald-500/20 text-[#ededf5]"
                          : "bg-rose-500/5 border-rose-500/20 text-[#ededf5]"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={18} className="text-emerald-400" />
                            <span className="font-bold text-emerald-400 text-sm">Excellent calcul !</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={18} className="text-[#f05060]" />
                            <span className="font-bold text-[#f05060] text-sm">Correction</span>
                          </>
                        )}
                      </div>

                      {/* Display correct result & steps */}
                      <div className="space-y-4">
                        {!isCorrect && (
                          <div className="text-xs text-[#8888a8] font-mono">
                            Réponse attendue :{" "}
                            <span className="text-[#f0c040] font-bold text-sm bg-slate-900 py-1 px-2.5 rounded border border-[#252530]">
                              <Latex math={autoProblem.ans} />
                            </span>
                          </div>
                        )}

                        <div className="border-t border-[#252530]/50 pt-3">
                          <h4 className="text-[10px] font-bold text-[#8888a8] uppercase tracking-wider mb-2">Étapes de calcul :</h4>
                          <ul className="space-y-2">
                            {autoProblem.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-2 items-start text-xs text-[#8888a8] leading-relaxed">
                                <span className="font-mono text-[#f0c040] bg-slate-900 border border-[#252530] px-1.5 py-0.5 rounded text-[10px]">
                                  {idx + 1}
                                </span>
                                <div>
                                  <Latex math={step} />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── HAND-CRAFTED EXERCISE (TYPE BAC) ── */}
            {level === "bac" && bacProblem && (
              <div className="bg-[#131318] rounded-3xl border border-indigo-500/20 p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-[#252530]/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-indigo-500/20 text-[#88a8f0] border border-indigo-500/30">
                      Sujet Bac
                    </span>
                    <span className="text-xs text-[#8888a8] font-mono">Exercice #{currentProblemIndex}</span>
                  </div>
                  <button
                    onClick={generateNewExercise}
                    className="text-[#8888a8] hover:text-white text-xs flex items-center gap-1 transition-all"
                  >
                    <RefreshCw size={13} /> Autre sujet
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white font-['Syne']">{bacProblem.title}</h3>
                  
                  {/* Subject Enonce block */}
                  <div className="bg-[#0c0c0f] border border-[#252530] rounded-2xl p-5 text-sm leading-relaxed text-[#ededf5]">
                    <Latex math={bacProblem.enonce} />
                  </div>
                </div>

                {/* Response text area */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#8888a8]">Votre copie</label>
                    <span className="text-[10px] text-[#484860]">Rédigez vos étapes intermédiaires</span>
                  </div>
                  <textarea
                    rows={4}
                    value={bacTextResponse}
                    onChange={(e) => setBacTextResponse(e.target.value)}
                    disabled={showBacCorrection}
                    placeholder="Écrivez vos étapes de résolution..."
                    className="w-full bg-[#1a1a22] border border-[#32323f] focus:border-indigo-500 focus:outline-none rounded-xl p-4 text-xs font-mono text-[#ededf5] leading-relaxed resize-none"
                  />
                  
                  {!showBacCorrection ? (
                    <button
                      onClick={() => setShowBacCorrection(true)}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/10 cursor-pointer text-sm"
                    >
                      Afficher la correction &amp; s'évaluer
                    </button>
                  ) : (
                    /* Self Evaluation buttons & Diagnostic */
                    <div className="space-y-4 animate-fadeIn border-t border-[#252530]/50 pt-5">
                      
                      {/* Diagnostic Assisté */}
                      {getMockAIDiagnostics() && (
                        <div className="bg-slate-900 border border-[#252530] rounded-xl p-4 flex gap-3">
                          <Info className="text-indigo-400 shrink-0 mt-0.5" size={16} />
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8888a8] block">Analyse de votre copie</span>
                            <p className="text-xs text-[#ededf5]/90 mt-1 leading-relaxed">
                              {getMockAIDiagnostics()?.text}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Official Correction */}
                      <div className="bg-[#0c0c0f] border border-[#252530] rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#252530]/50 pb-3">
                          <Award size={15} className="text-[#f0c040]" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Corrigé &amp; Barème Officiel</span>
                        </div>
                        
                        <div className="text-xs text-[#8888a8] leading-relaxed space-y-2 whitespace-pre-wrap">
                          <Latex math={bacProblem.correction} />
                        </div>

                        <div className="border-t border-[#252530]/50 pt-3">
                          <span className="text-[10px] font-bold text-[#8888a8] uppercase tracking-wider block mb-2">Points du barème :</span>
                          <ul className="space-y-1">
                            {bacProblem.points.map((pt, i) => (
                              <li key={i} className="text-[11px] text-[#8888a8] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Student Evaluation Prompt */}
                      <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5 text-center space-y-4">
                        <span className="text-xs font-bold text-[#ededf5]">En comparant avec le barème, évaluez-vous :</span>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => handleSelfGrade("bon")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs py-2 px-6 rounded-lg transition-all"
                          >
                            🟢 Tout correct
                          </button>
                          <button
                            onClick={() => handleSelfGrade("partiel")}
                            className="bg-[#f0c040] hover:bg-[#e8a020] text-black font-bold text-xs py-2 px-6 rounded-lg transition-all"
                          >
                            🟡 Partiel
                          </button>
                          <button
                            onClick={() => handleSelfGrade("erreur")}
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2 px-6 rounded-lg transition-all"
                          >
                            🔴 À retravailler
                          </button>
                        </div>
                      </div>

                      {/* Next button */}
                      {hasChecked && (
                        <button
                          onClick={handleNext}
                          className="w-full bg-[#f0c040] hover:bg-[#e8a020] text-black font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                        >
                          Sujet suivant
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty stats indicator warning */}
            {level === "bac" && !bacProblem && (
              <div className="bg-[#131318] p-6 rounded-2xl border border-rose-500/20 text-center">
                <p className="text-sm text-[#8888a8]">Aucun exercice type Bac configuré pour ce module.</p>
              </div>
            )}

          </div>
        ) : (
          /* ── FICHE MÉMO (FORMULES) ── */
          <div className="space-y-6">
            
            {/* Memo Intro */}
            <div className="bg-[#131318] p-6 rounded-2xl border border-[#252530] space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#f0c040] uppercase">MÉMO DU CHAPITRE</span>
              <h2 className="text-xl font-bold text-white font-['Syne']">{selectedModule.title}</h2>
              <p className="text-xs text-[#8888a8] leading-relaxed">{selectedModule.sub}</p>
            </div>

            {/* List of rules & traps */}
            <div className="space-y-4">
              {selectedModule.rules.map((rule, idx) => (
                <div key={idx} className="bg-[#131318] rounded-2xl border border-[#252530] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-[#252530] text-xs font-bold font-mono text-[#f0c040] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{rule.head}</h3>
                  </div>

                  <p className="text-xs text-[#8888a8] leading-relaxed">{rule.body}</p>

                  {/* Math Rule Equation (iPhone responsive dark container) */}
                  <div className="w-full flex justify-center bg-slate-950/60 border border-slate-900 rounded-xl p-4 shadow-inner relative overflow-hidden group">
                    <div className="overflow-x-auto max-w-full text-center scrollbar-none">
                      <div className="inline-block whitespace-nowrap text-lg text-white font-medium">
                        <Latex math={rule.eq} block={true} />
                      </div>
                    </div>
                  </div>

                  {/* Trap block */}
                  <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-[#f05060]">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#f05060] font-bold mb-0.5">Piège classique :</strong>
                      {rule.piege}
                    </div>
                  </div>

                  {/* Steps method */}
                  <div className="border-t border-[#252530]/50 pt-3">
                    <span className="text-[10px] font-bold text-[#8888a8] uppercase tracking-wider block mb-2">Méthode pas-à-pas :</span>
                    <ol className="space-y-2">
                      {rule.etapes.map((step, stepIdx) => (
                        <li key={stepIdx} className="text-xs text-[#8888a8] flex items-start gap-2.5">
                          <span className="font-mono text-[#f0c040] mt-0.5">
                            {stepIdx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>

      {/* ── OVERLAY: STATS & PROGRESS REPORT ── */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131318] border border-[#252530] rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-[#8888a8] hover:text-white"
            >
              ✕
            </button>

            {/* Target element to capture via html2canvas */}
            <div ref={capTargetRef} className="p-4 bg-[#131318] rounded-2xl border border-[#252530] space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-['Syne'] font-extrabold text-base text-white">Spé Maths · Bilan</h3>
                  <span className="text-[9px] font-mono text-[#8888a8] block uppercase">CALCUL LITTÉRAL 2025-2026</span>
                </div>
                <span className="text-[10px] font-mono text-[#8888a8]">
                  {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                </span>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-slate-900 border border-[#252530] p-3 rounded-xl text-center">
                  <span className="text-[#3ecfa0] font-mono text-xl font-bold">{score.ok}</span>
                  <span className="text-[9px] text-[#8888a8] block uppercase tracking-wider mt-1">Corrects</span>
                </div>
                <div className="bg-slate-900 border border-[#252530] p-3 rounded-xl text-center">
                  <span className="text-[#f05060] font-mono text-xl font-bold">{score.tot - score.ok}</span>
                  <span className="text-[9px] text-[#8888a8] block uppercase tracking-wider mt-1">Erreurs</span>
                </div>
                <div className="bg-slate-900 border border-[#252530] p-3 rounded-xl text-center">
                  <span className="text-[#f0c040] font-mono text-xl font-bold">
                    {successRate}%
                  </span>
                  <span className="text-[9px] text-[#8888a8] block uppercase tracking-wider mt-1">Succès</span>
                </div>
              </div>

              {/* Progress History Dots */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-[#8888a8] uppercase tracking-wider block">Derniers entraînements</span>
                {history.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {history.slice(-30).map((h, i) => (
                      <div
                        key={i}
                        className={`w-3.5 h-3.5 rounded-full ${
                          h === "ok" ? "bg-[#3ecfa0]" : "bg-[#f05060]"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#484860]">Aucun historique d'entraînement pour le moment.</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadCard}
                className="flex-1 bg-[#f0c040] hover:bg-[#e8a020] text-black font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Download size={14} />
                Télécharger PNG
              </button>
              <button
                onClick={handleResetStats}
                className="bg-[#1a1a22] hover:bg-rose-500/10 border border-[#32323f] hover:border-rose-500 text-[#8888a8] hover:text-rose-500 text-xs py-2.5 px-3 rounded-xl transition-all"
                title="Réinitialiser"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PWA SAFARI INSTALL GUIDELINES MODAL ── */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131318] border border-[#252530] rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl relative text-center">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-[#8888a8] hover:text-white"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 text-[#f0c040] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <PlusSquare size={24} />
            </div>

            <div className="space-y-1">
              <h3 className="font-['Syne'] font-extrabold text-base text-white">Installer l'application</h3>
              <p className="text-xs text-[#8888a8]">
                Ajoutez Spé Maths à votre écran d'accueil sur iPhone pour l'utiliser sans barre de navigation Safari.
              </p>
            </div>

            <div className="space-y-3 bg-[#0c0c0f] border border-[#252530] p-4 rounded-xl text-left text-xs leading-relaxed text-[#ededf5]">
              <div className="flex gap-3">
                <span className="font-bold text-[#f0c040]">1.</span>
                <p>
                  Appuyez sur le bouton **Partager** <Share className="inline-block mx-1 w-3.5 h-3.5 text-[#f0c040]" /> dans Safari.
                </p>
              </div>
              <div className="flex gap-3 border-t border-[#252530] pt-2.5">
                <span className="font-bold text-[#f0c040]">2.</span>
                <p>
                  Faites défiler vers le bas et sélectionnez **Sur l'écran d'accueil** <PlusSquare className="inline-block mx-1 w-3.5 h-3.5 text-[#f0c040]" />.
                </p>
              </div>
              <div className="flex gap-3 border-t border-[#252530] pt-2.5">
                <span className="font-bold text-[#f0c040]">3.</span>
                <p>
                  Appuyez sur **Ajouter** en haut à droite. C'est tout !
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-[#1a1a22] hover:bg-[#252530] border border-[#32323f] text-[#ededf5] text-xs font-semibold py-2.5 px-4 rounded-xl transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
