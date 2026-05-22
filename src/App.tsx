import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Flame, CheckCircle2, XCircle, Sparkles, Award, Download, RefreshCw, 
  Info, ArrowRight, BookMarked, AlertCircle, LogOut, User, HelpCircle, 
  BrainCircuit, TrendingUp, Target
} from "lucide-react";
import "katex/dist/katex.min.css";
import { MODULES, BAC_EXERCISES, BacExercise } from "./data/modules";
import { GENERATORS, checkAnswer, MathProblem, rnd } from "./utils/generators";
import { Latex } from "./components/Latex";
import { LoginScreen } from "./components/LoginScreen";
import { MathKeyboard } from "./components/MathKeyboard";

const storageKey = (user: string, key: string) => `spe_maths::${user}::${key}`;
const CURRENT_USER_KEY = "spe_maths_current_user";

export default function App() {
  const [activeTab, setActiveTab] = useState<"exos" | "memo">("exos");
  const [currentModuleId, setCurrentModuleId] = useState<number>(0);
  const [level, setLevel] = useState<"debutant" | "intermediaire" | "bac">("debutant");
  const [score, setScore] = useState<{ ok: number; tot: number }>({ ok: 0, tot: 0 });
  const [streak, setStreak] = useState<number>(0);
  const [history, setHistory] = useState<("ok" | "bad")[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(1);
  const [autoProblem, setAutoProblem] = useState<MathProblem | null>(null);
  const [bacProblem, setBacProblem] = useState<BacExercise | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showBacCorrection, setShowBacCorrection] = useState<boolean>(false);
  const [bacTextResponse, setBacTextResponse] = useState<string>(`Étape 1 : \nÉtape 2 : \nConclusion : `);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showBilan, setShowBilan] = useState<boolean>(false);
  const [sessionStats, setSessionStats] = useState<Record<string, { ok: number, tot: number }>>({});
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const capTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) setCurrentUser(savedUser);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const savedScore = localStorage.getItem(storageKey(currentUser, "score"));
    const savedStreak = localStorage.getItem(storageKey(currentUser, "streak"));
    const savedHistory = localStorage.getItem(storageKey(currentUser, "history"));
    if (savedScore) setScore(JSON.parse(savedScore));
    setStreak(savedStreak ? parseInt(savedStreak, 10) || 0 : 0);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    if (score.tot > 0) {
      localStorage.setItem(storageKey(currentUser, "score"), JSON.stringify(score));
      localStorage.setItem(storageKey(currentUser, "streak"), String(streak));
      localStorage.setItem(storageKey(currentUser, "history"), JSON.stringify(history));
    }
  }, [score, streak, history, currentUser]);

  const handleLogin = (username: string) => {
    localStorage.setItem(CURRENT_USER_KEY, username);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  useEffect(() => {
    generateNewExercise();
  }, [currentModuleId, level]);

  const generateNewExercise = () => {
    setUserInput("");
    setHasChecked(false);
    setShowBacCorrection(false);
    setShowExplanation(false);
    if (level === "bac") {
      const pool = BAC_EXERCISES[currentModuleId];
      if (pool && pool.length > 0) {
        setBacProblem(pool[rnd(0, pool.length - 1)]);
        setBacTextResponse(`Étape 1 : \nÉtape 2 : \nConclusion : `);
      } else setBacProblem(null);
      setAutoProblem(null);
    } else {
      const moduleGens = GENERATORS[currentModuleId];
      if (moduleGens) {
        const pool = level === "debutant" ? moduleGens.debutant : moduleGens.intermediaire;
        if (pool && pool.length > 0) setAutoProblem(pool[rnd(0, pool.length - 1)]());
      }
      setBacProblem(null);
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCheckAuto = () => {
    if (!autoProblem || hasChecked) return;
    const correct = checkAnswer(userInput, autoProblem.ans, autoProblem.aliases);
    setIsCorrect(correct);
    setHasChecked(true);
    setSessionStats(prev => {
      const cat = autoProblem.category;
      const current = prev[cat] || { ok: 0, tot: 0 };
      return { ...prev, [cat]: { ok: current.ok + (correct ? 1 : 0), tot: current.tot + 1 } };
    });
    if (correct) {
      setScore(prev => ({ ok: prev.ok + 1, tot: prev.tot + 1 }));
      setStreak(prev => prev + 1);
      setHistory(prev => [...prev, "ok"]);
    } else {
      setStreak(0);
      setHistory(prev => [...prev, "bad"]);
      setScore(prev => ({ ...prev, tot: prev.tot + 1 }));
    }
    if ((score.tot + 1) % 30 === 0) setShowBilan(true);
  };

  const handleNext = () => {
    setCurrentProblemIndex(prev => prev + 1);
    generateNewExercise();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!hasChecked) handleCheckAuto();
      else handleNext();
    }
  };

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

  const handleBackspace = () => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart ?? userInput.length;
    const end = inputRef.current.selectionEnd ?? userInput.length;
    if (start === 0 && end === 0) return;
    let newValue = start === end ? userInput.substring(0, start - 1) + userInput.substring(end) : userInput.substring(0, start) + userInput.substring(end);
    setUserInput(newValue);
    setTimeout(() => {
      inputRef.current?.focus();
      const newPos = start === end ? start - 1 : start;
      inputRef.current?.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleClearInput = () => {
    setUserInput("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleDownloadCard = async () => {
    if (!capTargetRef.current) return;
    const canvas = await html2canvas(capTargetRef.current, { backgroundColor: "#131318", scale: 2 });
    const link = document.createElement("a");
    link.download = `spe-maths-bilan-${new Date().toISOString().slice(0,10)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const selectedModule = MODULES[currentModuleId];
  const successRate = score.tot > 0 ? Math.round((score.ok / score.tot) * 100) : 0;

  if (!authReady) return <div className="min-h-screen bg-[#0c0c0f]" />;
  if (!currentUser) return <LoginScreen onLogin={handleLogin} currentUser={currentUser} />;

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0f] text-[#ededf5] pb-10" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="sticky top-0 z-40 bg-[#131318]/90 backdrop-blur-md border-b border-[#252530] px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f0c040] to-[#e8a020] flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="font-extrabold text-black text-xl">√</span>
          </div>
          <div>
            <h1 className="font-bold text-base md:text-lg text-white leading-tight">Spé Maths <span className="text-[#f0c040]">Coach</span></h1>
          </div>
        </div>
        <select value={currentModuleId} onChange={(e) => setCurrentModuleId(parseInt(e.target.value, 10))} className="appearance-none bg-[#1a1a22] border border-[#32323f] text-[#ededf5] text-xs font-semibold py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-[#f0c040]">
          {MODULES.map((m) => <option key={m.id} value={m.id}>{`0${m.id + 1} · ${m.title}`}</option>)}
        </select>
        <button onClick={() => setShowStatsModal(true)} className="bg-[#1a1a22] border border-[#252530] rounded-full py-1.5 px-3 text-xs flex items-center gap-2 hover:border-[#f0c040]">
          <Flame size={12} className="fill-[#f0c040] text-[#f0c040]" /> {streak} | <span className="text-[#3ecfa0]">{score.ok}</span>/{score.tot}
        </button>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 pt-6">
        {activeTab === "exos" && autoProblem && (
          <div className="space-y-6">
            <div className="bg-[#131318] rounded-3xl border border-[#252530] p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px] text-[#8888a8] font-mono uppercase tracking-widest">
                <span>{autoProblem.category}</span>
                <span>Exo #{currentProblemIndex}</span>
              </div>
              <div className="text-lg text-[#ededf5]"><Latex math={autoProblem.instr} /></div>
              <div className="w-full flex justify-center bg-slate-950/60 border border-slate-900 rounded-2xl p-8 shadow-inner">
                <div className="text-3xl text-yellow-400 font-medium"><Latex math={autoProblem.eq} block forceMath /></div>
              </div>

              <div className="space-y-4">
                {userInput && !hasChecked && (
                  <div className="p-4 bg-slate-900/40 border border-[#252530] rounded-2xl text-center">
                    <span className="text-[10px] text-[#8888a8] block mb-1">Aperçu :</span>
                    <div className="text-2xl text-[#f0c040]"><Latex math={userInput} forceMath /></div>
                  </div>
                )}
                <div className="flex gap-3">
                  <input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={hasChecked} inputMode="none" className={`flex-1 bg-[#1a1a22] border-2 rounded-xl py-4 px-6 text-xl font-mono text-white focus:outline-none transition-all ${hasChecked ? (isCorrect ? "border-emerald-500 bg-emerald-500/5 text-emerald-400" : "border-rose-500 bg-rose-500/5 text-rose-400") : "border-[#32323f] focus:border-[#f0c040]"}`} />
                  {!hasChecked ? <button onClick={handleCheckAuto} disabled={!userInput.trim()} className="bg-[#f0c040] text-black font-bold py-4 px-10 rounded-xl">Valider</button> : <button onClick={handleNext} className="bg-[#f0c040] text-black font-bold py-4 px-10 rounded-xl flex items-center gap-2">Suivant <ArrowRight size={18}/></button>}
                </div>
                {!hasChecked && <MathKeyboard onSymbolClick={insertSymbol} onBackspace={handleBackspace} onClear={handleClearInput} />}
                
                {hasChecked && (
                  <div className={`p-6 rounded-2xl border ${isCorrect ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {isCorrect ? <CheckCircle2 className="text-emerald-400"/> : <XCircle className="text-rose-500"/>}
                        <span className={`font-bold ${isCorrect ? "text-emerald-400" : "text-rose-500"}`}>{isCorrect ? "Excellent !" : "Correction"}</span>
                      </div>
                      <button onClick={() => setShowExplanation(!showExplanation)} className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                        <BrainCircuit size={14}/> Pourquoi ?
                      </button>
                    </div>
                    {!isCorrect && <div className="mb-4 text-[#f0c040] text-lg bg-slate-900 p-3 rounded-xl border border-[#252530] text-center"><Latex math={autoProblem.ans} forceMath /></div>}
                    {showExplanation && (
                      <div className="mb-4 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl animate-fadeIn">
                        <p className="text-xs text-indigo-200 leading-relaxed italic"><Latex math={autoProblem.pourquoi} /></p>
                      </div>
                    )}
                    <div className="space-y-2">
                      {autoProblem.steps.map((s, i) => (
                        <div key={i} className="flex gap-3 text-sm text-[#8888a8]">
                          <span className="text-[#f0c040] font-bold">{i+1}.</span> <Latex math={s} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {showBilan && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#131318] border border-[#f0c040]/30 rounded-3xl p-8 max-w-2xl w-full space-y-8 shadow-[0_0_50px_-12px_rgba(240,192,64,0.3)]">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-[#f0c040]/10 rounded-2xl mb-2"><Award className="text-[#f0c040]" size={32}/></div>
              <h2 className="text-2xl font-bold text-white">Bilan de Maîtrise (Palier 30)</h2>
              <p className="text-[#8888a8] text-sm">Voici l'analyse de vos points forts et axes d'amélioration.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(sessionStats).map(([cat, s]) => {
                const rate = Math.round((s.ok/s.tot)*100);
                return (
                  <div key={cat} className="p-4 bg-[#1a1a22] border border-[#252530] rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{cat}</span>
                      <span className={`text-xs px-2 py-1 rounded-md font-bold ${rate > 80 ? "bg-emerald-500/10 text-emerald-400" : rate > 50 ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"}`}>{rate}%</span>
                    </div>
                    <div className="h-1.5 bg-[#0c0c0f] rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${rate > 80 ? "bg-emerald-500" : rate > 50 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${rate}%` }} />
                    </div>
                    <p className="text-[10px] text-[#8888a8]">
                      {rate > 80 ? "Maîtrisé - Continuez ainsi." : rate > 50 ? "Fragile - Consolidation recommandée." : "À réviser en priorité."}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <button onClick={handleDownloadCard} className="flex-1 bg-[#1a1a22] text-white border border-[#32323f] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#252530]"><Download size={18}/> Exporter le bilan</button>
              <button onClick={() => {setShowBilan(false); setSessionStats({});}} className="flex-1 bg-[#f0c040] text-black py-4 rounded-xl font-bold">Continuer l'entraînement</button>
            </div>
          </div>
        </div>
      )}

      {showStatsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131318] border border-[#252530] rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl relative">
            <button onClick={() => setShowStatsModal(false)} className="absolute top-4 right-4 text-[#8888a8]">✕</button>
            <div ref={capTargetRef} className="p-4 bg-[#131318] rounded-2xl border border-[#252530] space-y-5">
              <h3 className="font-bold text-lg text-white">Progression Globale</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl text-center"><span className="text-2xl font-bold text-[#3ecfa0]">{score.ok}</span><span className="text-[9px] block text-[#8888a8] uppercase mt-1">Succès</span></div>
                <div className="bg-slate-900 p-3 rounded-xl text-center"><span className="text-2xl font-bold text-[#f05060]">{score.tot - score.ok}</span><span className="text-[9px] block text-[#8888a8] uppercase mt-1">Échecs</span></div>
                <div className="bg-slate-900 p-3 rounded-xl text-center"><span className="text-2xl font-bold text-[#f0c040]">{successRate}%</span><span className="text-[9px] block text-[#8888a8] uppercase mt-1">Ratio</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
