import { useState, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { computeSHA256, simulateBlockchainRecord, generateCertId } from "@/data/mock";
import { Upload, FileCheck, Shield, CheckCircle, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";

type Step = "idle" | "hashing" | "blockchain" | "done";

interface Result {
  filename: string;
  size: number;
  sha256: string;
  txHash: string;
  blockHeight: number;
  certId: string;
  uploadedAt: string;
}

export default function UploadPage() {
  const { user } = useAuth();
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState<Step>("idle");
  const [result, setResult] = useState<Result | null>(null);

  const handleFile = useCallback(async (f: File) => {
    setStep("hashing");
    setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    const buffer = await f.arrayBuffer();
    const sha256 = await computeSHA256(buffer);
    setStep("blockchain");
    await new Promise((r) => setTimeout(r, 1200));
    const { txHash, blockHeight } = simulateBlockchainRecord(sha256);
    const certId = generateCertId();
    setResult({ filename: f.name, size: f.size, sha256, txHash, blockHeight, certId, uploadedAt: new Date().toISOString() });
    setStep("done");
  }, []);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function reset() { setStep("idle"); setResult(null); }

  const STEPS = [
    { key: "hashing", label: "SHA-256 해시 생성", icon: FileCheck },
    { key: "blockchain", label: "블록체인 타임스탬프", icon: Shield },
    { key: "done", label: "인증서 발급", icon: CheckCircle },
  ];

  return (
    <AppShell>
      <div className="p-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">파일 등록</h1>
          <p className="text-sm text-gray-500 mt-1">업로드 즉시 SHA-256 해시와 블록체인 타임스탬프로 소유권을 증명합니다.</p>
        </div>

        <div className="flex items-center gap-0 mb-8 flex-wrap gap-y-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.key;
            const isCompleted = (step === "blockchain" && i === 0) || step === "done";
            return (
              <div key={s.key} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  isActive ? "bg-indigo-600 text-white" : isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"
                }`}>
                  {isCompleted && !isActive ? <CheckCircle size={13} /> : <Icon size={13} />}
                  {s.label}
                </div>
                {i < 2 && <div className={`w-8 h-px mx-1 ${isCompleted ? "bg-emerald-300" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>

        {step === "idle" && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-colors cursor-pointer ${
              dragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
            }`}
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload size={28} className="text-indigo-500" />
            </div>
            <p className="text-gray-700 font-medium mb-1">파일을 드래그하거나 클릭하여 선택</p>
            <p className="text-gray-400 text-sm mb-6">이미지, PDF, CAD, CLO3D, Excel 등 모든 형식 지원</p>
            <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              파일 선택
              <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </label>
            <div className="mt-8 grid grid-cols-3 gap-4 text-left max-w-md mx-auto">
              {[
                { label: "SHA-256 해시", desc: "즉시 디지털 지문 생성" },
                { label: "블록체인 기록", desc: "변조 불가 시점 증명" },
                { label: "인증서 발급", desc: "법적 소유권 증명서" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs font-semibold text-gray-700">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(step === "hashing" || step === "blockchain") && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Loader2 size={28} className="text-indigo-500 animate-spin" />
            </div>
            <p className="font-semibold text-gray-900 mb-1">
              {step === "hashing" ? "SHA-256 해시 생성 중..." : "블록체인에 타임스탬프 기록 중..."}
            </p>
          </div>
        )}

        {step === "done" && result && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-5 flex items-center gap-3">
              <CheckCircle size={22} className="text-emerald-500" />
              <div>
                <div className="font-semibold text-emerald-800">등록 완료 — 소유권이 증명되었습니다</div>
                <div className="text-xs text-emerald-600 mt-0.5">{result.filename}</div>
              </div>
              <button onClick={reset} className="ml-auto text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">인증서 ID</div>
                <span className="font-mono text-lg font-bold text-indigo-600">{result.certId}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">SHA-256 디지털 지문</div>
                <div className="font-mono text-xs text-gray-700 break-all bg-white border border-gray-200 rounded-lg p-3">{result.sha256}</div>
                <p className="text-xs text-gray-400 mt-2">이 파일이 단 1비트라도 변경되면 완전히 다른 해시값이 생성됩니다.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">블록체인 트랜잭션</div>
                  <div className="font-mono text-xs text-gray-700 break-all">{result.txHash.slice(0, 24)}…</div>
                  <div className="text-xs text-gray-400 mt-1">Block #{result.blockHeight.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">타임스탬프</div>
                  <div className="text-sm font-medium text-gray-900">{new Date(result.uploadedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</div>
                  <div className="text-xs text-gray-400 mt-1">KST</div>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700">
                <strong>분쟁 시 활용:</strong> 이 인증서 ID와 원본 파일을 함께 제출하면 창작 시점을 법적으로 증명할 수 있습니다.
              </div>
              <div className="flex gap-3">
                <Link to={`/certificates/${result.certId}`} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  <Shield size={16} /> 인증서 보기
                </Link>
                <button onClick={reset} className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  <Upload size={16} /> 다른 파일 등록
                </button>
              </div>
            </div>
          </div>
        )}
        {/* suppress unused var warning */}
        {user && null}
      </div>
    </AppShell>
  );
}
