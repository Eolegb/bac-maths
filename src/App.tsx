import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Flame, CheckCircle2, XCircle, Award, Download, RefreshCw, 
  ArrowRight, BookMarked, AlertCircle, LogOut, BrainCircuit, Sparkles
} from "lucide-react";
import "katex/dist/katex.min.css";
import { MODULES, BAC_EXERCISES } from "./data/modules";
import { GENERATORS, checkAnswer, rnd } from "./utils/generators";
import { Latex } from "./components/Latex";
import { LoginScreen } from "./components/LoginScreen";
import { MathKeyboard } from "./components/MathKeyboard";
import { MathPlot } from "./components/MathPlot";

const CURRENT_USER_KEY = "spe_maths_current_user";
const storageKey = (user: string, key: string) => `spe_maths::${user}::${key}`;

export default function App() {
  const [activeTab, setActiveTab] = useState<"exos" | "memo">("exos");
  const [currentModuleId, setCurrentModuleId] = useState<number>(0);
  const [level, setLevel] = useState<"debutant" | "intermediaire" | "bac">("debutant");
  const [score, setScore] = useState({ ok: 0, tot: 0 });
  const [streak, setStreak] = useState(0);
  const [autoProblem, setAutoProblem] = useState<any>(null);
  const [userInput, setUserInput] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showBilan, setShowBilan] = useState(false);
  const [sessionStats, setSessionStats] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const capRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (user) setCurrentUser(user);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const s = localStorage.getItem(storageKey(currentUser, "score"));
    if (s) setScore(JSON.parse(s));
  }, [currentUser]);

  useEffect(() => {
    generateNewExercise();
  }, [currentModuleId, level]);

  const generateNewExercise = () => {
    setUserInput(""); setHasChecked(false); setShowExplanation(false);
    const moduleGens = GENERATORS[currentModuleId];
    if (moduleGens) {
      const pool = level === "intermediaire" ? moduleGens.intermediaire : moduleGens.debutant;
      if (pool.length > 0) setAutoProblem(pool[rnd(0, pool.length - 1)]());
      else setAutoProblem(null);
    }
  };

  const handleCheck = () => {
    if (!autoProblem || hasChecked) return;
    const ok = checkAnswer(userInput, autoProblem.ans, autoProblem.aliases);
    setIsCorrect(ok); setHasChecked(true);
    setSessionStats((p:any) => {
      const c = autoProblem.category;
      const cur = p[c] || { ok: 0, tot: 0 };
      return { ...p, [c]: { ok: cur.ok + (ok ? 1 : 0), tot: cur.tot + 1 } };
    });
    setScore(p => {
      const n = { ok: p.ok + (ok ? 1 : 0), tot: p.tot + 1 };
      localStorage.setItem(storageKey(currentUser!, "score"), JSON.stringify(n));
      return n;
    });
    setStreak(s => ok ? s + 1 : 0);
    if ((score.tot + 1) % 30 === 0) setShowBilan(true);
  };

  const insertSymbol = (s: string) => {
    const start = inputRef.current?.selectionStart || userInput.length;
    const val = userInput.slice(0, start) + s + userInput.slice(start);
    setUserInput(val);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (!authReady) return null;
  if (!currentUser) return <LoginScreen onLogin={(u) => { localStorage.setItem(CURRENT_USER_KEY, u); setCurrentUser(u); }} currentUser={null} />;

  const module = MODULES[currentModuleId];

  return (
    <div className="min-h-screen bg-[#0c0c0f] text-white flex flex-col font-sans">
      <header className="p-4 bg-[#131318] border-b border-[#252530] flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center font-bold text-black text-xl">√</div>
          <h1 className="font-bold hidden sm:block">Maths<span className="text-amber-400">Coach</span></h1>
        </div>
        <select value={currentModuleId} onChange={(e) => setCurrentModuleId(Number(e.target.value))} className="bg-[#1a1a22] border border-[#32323f] rounded-full px-4 py-1.5 text-xs font-bold outline-none focus:border-amber-400">
          {MODULES.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
        </select>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold"><Flame size={16} fill="currentColor"/> {streak}</div>
          <button onClick={() => {localStorage.removeItem(CURRENT_USER_KEY); setCurrentUser(null);}} className="p-2 hover:bg-white/5 rounded-full"><LogOut size={18}/></button>
        </div>
      </header>

      <nav className="flex bg-[#131318] border-b border-[#252530]">
        <button onClick={() => setActiveTab("exos")} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'exos' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'}`}><Sparkles size={14}/> Entraînement</button>
        <button onClick={() => setActiveTab("memo")} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'memo' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500'}`}><BookMarked size={14}/> Cours</button>
      </nav>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {activeTab === "exos" ? (
          <div className="space-y-6">
            <div className="flex gap-2 bg-[#131318] p-1 rounded-xl border border-[#252530]">
              {["debutant", "intermediaire", "bac"].map(l => (
                <button key={l} onClick={() => setLevel(l as any)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${level === l ? 'bg-amber-400 text-black' : 'text-gray-500 hover:text-white'}`}>{l}</button>
              ))}
            </div>

            {autoProblem ? (
              <div className="bg-[#131318] rounded-3xl border border-[#252530] p-6 space-y-6 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center opacity-50 font-mono text-[10px] uppercase">
                  <span>{autoProblem.category}</span>
                  <button onClick={generateNewExercise} className="flex items-center gap-1 hover:text-white"><RefreshCw size={12}/> Nouveau</button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-6 w-full">
                    <div className="text-xl leading-relaxed"><Latex math={autoProblem.instr} /></div>
                    <div className="bg-slate-950/60 p-8 rounded-2xl border border-slate-900 flex justify-center shadow-inner">
                      <div className="text-3xl text-amber-400"><Latex math={autoProblem.eq} block forceMath /></div>
                    </div>
                  </div>
                  {autoProblem.plot && <MathPlot type={autoProblem.plot.type} data={autoProblem.plot.data} className="w-full md:w-64" />}
                </div>

                <div className="space-y-4">
                  {userInput && !hasChecked && (
                    <div className="text-center p-2 bg-amber-400/5 rounded-xl border border-amber-400/10 text-amber-400 text-xl font-mono"><Latex math={userInput} forceMath /></div>
                  )}
                  <div className="flex gap-3">
                    <input ref={inputRef} value={userInput} onChange={e => setUserInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (hasChecked ? generateNewExercise() : handleCheck())} disabled={hasChecked} className={`flex-1 bg-[#1a1a22] border-2 rounded-2xl py-4 px-6 text-2xl font-mono focus:outline-none transition-all ${hasChecked ? (isCorrect ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400') : 'border-[#32323f] focus:border-amber-400'}`} placeholder="Réponse..." />
                    <button onClick={hasChecked ? generateNewExercise : handleCheck} className="bg-amber-400 text-black font-black px-8 rounded-2xl hover:scale-105 transition-transform">{hasChecked ? <ArrowRight/> : "OK"}</button>
                  </div>
                  {!hasChecked && <MathKeyboard onSymbolClick={insertSymbol} onBackspace={() => setUserInput(s => s.slice(0,-1))} onClear={() => setUserInput("")} />}
                  {hasChecked && (
                    <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'} animate-fadeIn`}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 font-bold">{isCorrect ? <CheckCircle2 className="text-emerald-400"/> : <XCircle className="text-rose-400"/>} {isCorrect ? "BRAVO !" : "CORRECTION"}</div>
                        <button onClick={() => setShowExplanation(!showExplanation)} className="text-[10px] font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-white/10"><BrainCircuit size={14}/> Pourquoi ?</button>
                      </div>
                      {!isCorrect && <div className="text-amber-400 text-center text-2xl font-mono mb-4 bg-black/20 py-3 rounded-xl"><Latex math={autoProblem.ans} forceMath /></div>}
                      {showExplanation && <div className="bg-amber-400/5 p-4 rounded-xl border border-amber-400/20 text-sm italic mb-4 leading-relaxed"><Latex math={autoProblem.pourquoi} /></div>}
                      <div className="space-y-3">
                        {autoProblem.steps.map((s:string, i:number) => <div key={i} className="flex gap-3 text-sm text-gray-400"><span className="text-amber-400 font-bold">{i+1}.</span><Latex math={s} /></div>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : <div className="p-12 text-center text-gray-600 font-bold uppercase tracking-widest border-2 border-dashed border-[#252530] rounded-3xl">Module en cours de chargement...</div>}
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-3xl text-black shadow-xl">
              <h2 className="text-3xl font-black mb-2">{module.title}</h2>
              <p className="font-bold opacity-80">{module.sub}</p>
            </div>
            <div className="space-y-4">
              {module.rules.map((r, i) => (
                <div key={i} className="bg-[#131318] p-6 rounded-3xl border border-[#252530] space-y-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center font-bold">{i+1}</div>
                    <h3 className="text-lg font-bold">{r.head}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed"><Latex math={r.body} /></p>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex justify-center text-xl text-amber-400"><Latex math={r.eq} block forceMath /></div>
                  <div className="bg-rose-500/5 p-4 rounded-2xl border border-rose-500/10 flex gap-3 text-xs text-rose-400 leading-relaxed">
                    <AlertCircle size={18} className="shrink-0"/>
                    <div><span className="font-bold block mb-1">PIÈGE À ÉVITER</span><Latex math={r.piege}/></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showBilan && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div ref={capRef} className="bg-[#131318] border border-amber-400/30 rounded-[2.5rem] p-8 max-w-2xl w-full space-y-8 shadow-[0_0_100px_-12px_rgba(240,192,64,0.2)]">
             <div className="text-center space-y-4">
               <Award className="text-amber-400 mx-auto" size={48}/>
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">Bilan des 30 Questions</h2>
             </div>
             <div className="grid sm:grid-cols-2 gap-4">
               {Object.entries(sessionStats).map(([cat, s]:any) => {
                 const r = Math.round((s.ok/s.tot)*100);
                 return (
                   <div key={cat} className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-3">
                     <div className="flex justify-between font-bold text-xs"><span>{cat}</span><span className={r > 80 ? 'text-emerald-400' : 'text-amber-400'}>{r}%</span></div>
                     <div className="h-1.5 bg-black rounded-full overflow-hidden"><div className={`h-full ${r > 80 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{width: `${r}%`}} /></div>
                   </div>
                 );
               })}
             </div>
             <button onClick={() => setShowBilan(false)} className="w-full bg-amber-400 text-black py-5 rounded-2xl font-black text-xl hover:scale-95 transition-transform uppercase italic tracking-tighter">Continuer le combat</button>
          </div>
        </div>
      )}
    </div>
  );
}
