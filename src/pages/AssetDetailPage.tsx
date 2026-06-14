import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_ASSETS, MOCK_SHARE_LINKS, MOCK_LOGS, formatBytes, formatDate, FILE_ICONS, ROLE_LABELS } from "@/data/mock";
import { Shield, Link2, Download, Copy, CheckCircle, AlertTriangle, Clock, Eye, XCircle, Fingerprint } from "lucide-react";

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [shareHours, setShareHours] = useState(24);
  const [shareCreated, setShareCreated] = useState<string | null>(null);

  const asset = MOCK_ASSETS.find((a) => a.id === id);
  if (!asset) return (
    <AppShell><div className="p-8 text-gray-500">에셋을 찾을 수 없습니다.</div></AppShell>
  );

  const assetLogs = MOCK_LOGS.filter((l) => l.assetName === asset.originalName);
  const assetLinks = MOCK_SHARE_LINKS.filter((l) => l.assetId === id);
  const wmText = user ? `${user.name} | ${new Date().toLocaleDateString("ko-KR")}` : "";

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function createShareLink() {
    const token = Math.random().toString(36).slice(2, 18);
    setShareCreated(`${window.location.origin}/share/${token}`);
    setShowShare(false);
  }

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/assets" className="text-gray-400 hover:text-gray-600 text-sm">← 에셋 목록</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 text-sm font-medium truncate">{asset.originalName}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-emerald-500" />
                  <span className="text-xs font-medium text-gray-600">보안 뷰어 — 다운로드 차단됨</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Eye size={12} />
                  <Fingerprint size={12} className="text-indigo-400" />
                  <span>워터마크 활성</span>
                </div>
              </div>
              <div className="relative secure-content bg-gray-100 overflow-hidden" style={{ height: 360 }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">{FILE_ICONS[asset.fileType]}</div>
                    <div className="text-gray-500 text-sm font-medium">{asset.originalName}</div>
                    <div className="text-gray-400 text-xs mt-1">{formatBytes(asset.size)}</div>
                  </div>
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 10 }}>
                  {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 4 }).map((_, col) => (
                      <div key={`${row}-${col}`} className="absolute text-gray-400 font-medium text-xs whitespace-nowrap opacity-30"
                        style={{ top: row * 70 - 20, left: col * 200 - 40, transform: "rotate(-30deg)", fontSize: "11px" }}>
                        {wmText}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex items-center gap-2 text-xs text-amber-700">
                <AlertTriangle size={12} />
                화면 캡처 및 다운로드가 차단되어 있습니다. 모든 접근은 기록됩니다.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-semibold text-sm text-gray-900">접근 로그</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {assetLogs.length === 0 && <div className="px-5 py-8 text-center text-gray-400 text-sm">기록 없음</div>}
                {assetLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 px-5 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.action === "DOWNLOAD_ATTEMPT" ? "bg-red-400" : "bg-gray-300"}`} />
                    <div className="flex-1">
                      <span className={`text-xs font-medium ${log.action === "DOWNLOAD_ATTEMPT" ? "text-red-600" : log.action === "UPLOAD" ? "text-blue-600" : "text-gray-600"}`}>
                        {log.action === "DOWNLOAD_ATTEMPT" ? "⚠️ 다운로드 시도" : log.action === "UPLOAD" ? "업로드" : "조회"}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">{log.userName} · {log.ipAddress}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(log.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-sm text-gray-900 mb-4">파일 정보</h3>
              <dl className="space-y-3">
                {[
                  { label: "파일명", value: asset.originalName },
                  { label: "유형", value: asset.fileType },
                  { label: "크기", value: formatBytes(asset.size) },
                  { label: "등록자", value: `${asset.uploaderName} (${ROLE_LABELS[asset.uploaderRole]})` },
                  { label: "등록일", value: formatDate(asset.uploadedAt) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className="text-sm font-medium text-gray-800 mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">무결성 해시</h3>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-700 break-all relative group">
                {asset.sha256}
                <button onClick={() => copy(asset.sha256, "sha")} className="absolute top-2 right-2 p-1 rounded bg-white border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied === "sha" ? <CheckCircle size={12} className="text-emerald-500" /> : <Copy size={12} className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                <Shield size={14} className="text-indigo-500" /> 블록체인 기록
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">트랜잭션 해시</div>
                  <div className="font-mono text-xs text-gray-600 bg-gray-50 rounded p-2 break-all">{asset.txHash}</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div><span className="text-gray-400">블록 높이</span><br /><span className="font-medium text-gray-800">#{asset.blockHeight.toLocaleString()}</span></div>
                  <div className="text-right"><span className="text-gray-400">인증서 ID</span><br /><span className="font-mono font-medium text-indigo-600">{asset.certId}</span></div>
                </div>
                <Link to={`/certificates/${asset.certId}`} className="flex items-center gap-2 text-xs text-indigo-600 hover:underline">
                  <Shield size={12} /> 인증서 보기
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              {user?.role !== "FACTORY" && (
                <button onClick={() => setShowShare(true)} className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                  <Link2 size={15} /> 공유 링크 생성
                </button>
              )}
              <button disabled className="flex items-center justify-center gap-2 w-full border border-gray-200 bg-gray-50 text-gray-400 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed">
                <Download size={15} /> 다운로드 (차단됨)
              </button>
            </div>

            {assetLinks.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">공유 링크 현황</h3>
                <div className="space-y-2">
                  {assetLinks.map((link) => {
                    const expired = new Date(link.expiresAt) < new Date() || link.isRevoked;
                    return (
                      <div key={link.id} className={`rounded-lg p-3 text-xs ${expired ? "bg-gray-50" : "bg-blue-50"}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-gray-500">{link.token.slice(0, 12)}…</span>
                          {expired
                            ? <span className="flex items-center gap-1 text-gray-400"><XCircle size={11} /> 만료</span>
                            : <span className="flex items-center gap-1 text-blue-600"><Clock size={11} /> 활성</span>}
                        </div>
                        <div className="text-gray-500">{link.note}</div>
                        <div className="text-gray-400 mt-1">조회 {link.viewCount}{link.maxViews ? `/${link.maxViews}` : ""}회</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showShare && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-bold text-gray-900 mb-4">공유 링크 생성</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">유효 시간</label>
                <select value={shareHours} onChange={(e) => setShareHours(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {[1, 6, 24, 72, 168].map((h) => <option key={h} value={h}>{h < 24 ? `${h}시간` : `${h / 24}일`}</option>)}
                </select>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-700">
                공유 링크는 <strong>조회 전용</strong>입니다. 다운로드는 차단되며 모든 접근이 기록됩니다.
              </div>
              <div className="flex gap-3">
                <button onClick={createShareLink} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">링크 생성</button>
                <button onClick={() => setShowShare(false)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors">취소</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shareCreated && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={22} className="text-emerald-500" />
              <h2 className="font-bold text-gray-900">공유 링크가 생성되었습니다</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-700 break-all mb-4">{shareCreated}</div>
            <div className="flex gap-3">
              <button onClick={() => copy(shareCreated, "share")} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                {copied === "share" ? <CheckCircle size={15} /> : <Copy size={15} />}
                {copied === "share" ? "복사됨!" : "링크 복사"}
              </button>
              <button onClick={() => setShareCreated(null)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors">닫기</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
