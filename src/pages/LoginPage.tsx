import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Shield, Lock, Fingerprint } from "lucide-react";

const DEMO_ACCOUNTS = [
  { email: "admin@fashion.co", label: "관리자", color: "bg-purple-100 text-purple-700" },
  { email: "designer@fashion.co", label: "디자이너", color: "bg-blue-100 text-blue-700" },
  { email: "md@fashion.co", label: "생산 MD", color: "bg-emerald-100 text-emerald-700" },
  { email: "factory@partner.com", label: "외부 공장", color: "bg-orange-100 text-orange-700" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("admin@fashion.co");
  const [password, setPassword] = useState("password123");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (!ok) setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    else navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 p-16 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-white text-lg">D</div>
            <span className="text-white font-semibold text-lg">Design Protect</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            패션 디자인<br />
            <span className="text-indigo-400">완전 보호</span> 플랫폼
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            포렌식 워터마킹, 블록체인 타임스탬프,<br />
            제로트러스트 공급망 보안으로<br />
            당신의 창작물을 지킵니다.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: Fingerprint, text: "포렌식 워터마킹으로 유출 경로 추적", sub: "육안 불가 · 법적 증거 효력" },
            { icon: Shield, text: "블록체인 창작 시점 증명", sub: "SHA-256 해시 + 타임스탬프" },
            { icon: Lock, text: "시한부 공유 링크 & RBAC", sub: "역할별 권한 · IP 제한" },
          ].map(({ icon: Icon, text, sub }) => (
            <div key={text} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">{text}</div>
                <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">D</div>
            <span className="font-bold text-gray-900">Design Protect</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">로그인</h2>
          <p className="text-gray-500 text-sm mb-8">계정에 로그인하여 플랫폼을 이용하세요.</p>

          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-2 font-medium">데모 계정 선택</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  onClick={() => { setEmail(a.email); setPassword("password123"); }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                    email === a.email ? a.color + " border-current" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                placeholder="이메일 주소" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-11 bg-white"
                  placeholder="비밀번호" required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">데모: 비밀번호 아무거나 4자 이상</p>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-600">{error}</div>
            )}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
