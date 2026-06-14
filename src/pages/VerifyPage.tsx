import { useState, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import { MOCK_ASSETS, computeSHA256, formatDate } from "@/data/mock";
import { ShieldCheck, Upload, CheckCircle, XCircle, Loader2, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

type VerifyState = "idle" | "computing" | "found" | "notfound";

interface VerifyResult {
  sha256: string;
  filename: string;
  asset?: typeof MOCK_ASSETS[0];
}

export default function VerifyPage() {
  const [state, setState] = useState<VerifyState>("idle");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [manualHash, setManualHash] = useState("");
  const [manualResult, setManualResult] = useState<typeof MOCK_ASSETS[0] | null | "notfound">(null);

  const handleFile = useCallback(async (file: File) => {
    setState("computing");
    setResult(null);
    await new Promise((r) => setTimeout(r, 1000));
    const buffer = await file.arrayBuffer();
    const sha256 = await computeSHA256(buffer);
    const found = MOCK_ASSETS.find((a) => a.sha256 === sha256);
    setResult({ sha256, filename: file.name, asset: found });
    setState(found ? "found" : "notfound");
  }, []);

  function handleManualVerify() {
    const trimmed = manualHash.trim().toLowerCase();
    if (!trimmed) return;
    const found = MOCK_ASSETS.find((a) => a.sha256 === trimmed);
    setManualResult(found || "notfound");
  }

  return (
    <AppShell>
      <div className="p-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">해시 검증</h1>
          <p className="text-sm text-gray-500 mt-1">파일을 업로드하거나 SHA-256 해시값을 직접 입력해 소유권을 검증합니다.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-sm text-gray-900 flex items-center gap-2"><FileSearch size={16} className="text-indigo-500" /> 파일로 검증</h2>
          </div>
          <div className="p-6">
            {state === "idle" && (
              <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-indigo-300 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Upload size={22} className="text-indigo-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">검증할 파일을 드래그하거나 선택하세요</p>
                <p className="text-xs text-gray-400 mb-4">원본과 동일한 파일이면 같은 해시값이 생성됩니다</p>
                <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                  파일 선택
                  <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </label>
              </div>
            )}

            {state === "computing" && (
              <div className="py-10 text-center">
                <Loader2 size={32} className="animate-spin text-indigo-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">SHA-256 해시 계산 중...</p>
              </div>
            )}

            {(state === "found" || state === "notfound") && result && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-2">계산된 SHA-256 해시</div>
                  <div className="font-mono text-xs text-gray-700 break-all">{result.sha256}</div>
                </div>

                {state === "found" && result.asset ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle size={22} className="text-emerald-500" />
                      <div>
                        <div className="font-semibold text-emerald-800">소유권 확인됨</div>
                        <div className="text-xs text-emerald-600 mt-0.5">{result.filename}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: "등록 파일명", value: result.asset.originalName },
                        { label: "등록자", value: result.asset.uploaderName },
                        { label: "등록 시점", value: formatDate(result.asset.uploadedAt) },
                        { label: "인증서 ID", value: result.asset.certId || "" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-500">{label}</span>
                          <span className={`font-medium ${label === "인증서 ID" ? "font-mono text-indigo-600" : "text-gray-900"}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link to={`/certificates/${result.asset.certId}`} className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        <ShieldCheck size={13} /> 인증서 보기
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center gap-3">
                    <XCircle size={22} className="text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-600">등록되지 않은 파일</div>
                      <div className="text-xs text-gray-400 mt-0.5">이 파일은 플랫폼에 등록된 기록이 없습니다.</div>
                    </div>
                  </div>
                )}

                <button onClick={() => { setState("idle"); setResult(null); }} className="text-sm text-indigo-600 hover:underline">다시 검증</button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-sm text-gray-900 flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-500" /> 해시값 직접 조회</h2>
          </div>
          <div className="p-6">
            <div className="flex gap-3">
              <input
                value={manualHash} onChange={(e) => { setManualHash(e.target.value); setManualResult(null); }}
                placeholder="SHA-256 해시값 입력 (64자 16진수)"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <button onClick={handleManualVerify} disabled={!manualHash.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                조회
              </button>
            </div>

            {manualResult && (
              <div className={`mt-4 rounded-xl p-4 ${manualResult === "notfound" ? "bg-gray-50 border border-gray-200" : "bg-emerald-50 border border-emerald-200"}`}>
                {manualResult === "notfound" ? (
                  <div className="flex items-center gap-2 text-gray-500 text-sm"><XCircle size={16} /> 등록된 파일을 찾을 수 없습니다.</div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle size={16} className="text-emerald-500" />
                      <span className="font-semibold text-emerald-800 text-sm">일치하는 파일 발견</span>
                    </div>
                    <div className="text-sm space-y-1.5">
                      <div className="flex justify-between"><span className="text-gray-500">파일명</span><span className="font-medium text-gray-900">{manualResult.originalName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">등록자</span><span className="font-medium text-gray-900">{manualResult.uploaderName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">등록 시점</span><span className="font-medium text-gray-900">{formatDate(manualResult.uploadedAt)}</span></div>
                    </div>
                    <Link to={`/certificates/${manualResult.certId}`} className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:underline font-medium">
                      <ShieldCheck size={12} /> 인증서 보기
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-500 mb-2">테스트용 샘플 해시</div>
              {MOCK_ASSETS.slice(0, 2).map((a) => (
                <button key={a.id} onClick={() => { setManualHash(a.sha256); setManualResult(null); }}
                  className="flex items-center gap-2 w-full text-left py-1.5 hover:bg-white rounded px-2 transition-colors group">
                  <span className="font-mono text-xs text-gray-500 group-hover:text-indigo-600 truncate">{a.sha256.slice(0, 40)}…</span>
                  <span className="text-xs text-gray-400 shrink-0">{a.originalName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
