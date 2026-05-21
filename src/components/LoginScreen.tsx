import React, { useState } from "react";
import { LogOut } from "lucide-react";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  currentUser: string | null;
  onLogout: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  currentUser,
  onLogout,
}) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 2) {
      setError("Le pseudo doit avoir au moins 2 caractères");
      return;
    }

    if (trimmedUsername.length > 20) {
      setError("Le pseudo ne doit pas dépasser 20 caractères");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      setError("Utilisez uniquement des lettres, chiffres, - et _");
      return;
    }

    onLogin(trimmedUsername);
    setUsername("");
    setError("");
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0c0c0f] text-[#ededf5] pt-safe">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f0c040] to-[#e8a020] flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <span className="font-['Syne'] font-extrabold text-black text-3xl">√</span>
              </div>
              <div>
                <h1 className="font-['Syne'] font-extrabold text-2xl tracking-tight text-white">
                  Spé Maths <span className="text-[#f0c040]">Bac</span>
                </h1>
                <p className="text-xs text-[#8888a8] font-mono mt-1">
                  CALCUL LITTÉRAL · 1ÈRE &amp; SECONDE
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8888a8] block">
                  Entrez votre pseudo
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="Ex: MathsGénie2025"
                  maxLength={20}
                  className="w-full bg-[#1a1a22] border-2 border-[#32323f] focus:border-[#f0c040] rounded-xl py-3 px-4 text-sm text-[#ededf5] placeholder-[#484860] focus:outline-none transition-all"
                />
                <p className="text-[10px] text-[#484860]">
                  {username.length}/20 caractères
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-xs text-rose-400">
                  {error}
                </div>
              )}

              {/* Info box */}
              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3 text-xs text-[#8888a8] leading-relaxed space-y-1">
                <p>
                  💾 <strong>Vos statistiques seront sauvegardées</strong> avec ce pseudo
                </p>
                <p>
                  🔄 Vous pourrez retrouver votre progression en vous reconnectant
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={username.trim().length < 2}
                className="w-full bg-[#f0c040] hover:bg-[#e8a020] disabled:bg-[#484860] disabled:opacity-50 text-black font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer text-sm"
              >
                Commencer
              </button>
            </form>

            {/* Footer */}
            <div className="text-center space-y-2 border-t border-[#252530] pt-6">
              <p className="text-[10px] text-[#484860]">
                Pseudo peut être modifié à tout moment
              </p>
              <p className="text-[11px] text-[#8888a8]">
                v1.0 · Créé pour les révisions Spé Maths 📚
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
