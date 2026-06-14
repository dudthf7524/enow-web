import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { MOCK_SHARE_LINKS, formatDate, isExpired, FILE_ICONS } from "@/data/mock";
import { Link2, Clock, Eye, XCircle, CheckCircle, Copy, Shield, AlertTriangle } from "lucide-react";

export default function SharePage() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(token: string) {
    navigator.clipboard.writeText(`${window.location.origin}/share/${token}`);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  }

  const active = MOCK_SHARE_LINKS.filter((l) => !l.isRevoked && !isExpired(l.expiresAt));
  const expired = MOCK_SHARE_LINKS.filter((l) => l.isRevoked || isExpired(l.expiresAt));

  function LinkCard({ link, dim = false }: { link: typeof MOCK_SHARE_LINKS[0]; dim?: boolean }) {
    const exp = isExpired(link.expiresAt) || link.isRevoked;
    const viewPct = link.maxViews ? (link.viewCount / link.maxViews) * 100 : null;
    return (
      <div className={`bg-white rounded-xl border shadow-sm overflow-hidden ${dim ? "opacity-60 border-gray-100" : "border-gray-100"}`}>
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{FILE_ICONS[link.fileType]}</span>
              <div>
                <div className="text-sm font-semibold text-gray-900">{link.assetName}</div>
                <div className="text-xs text-gray-400">{link.note}</div>
              </div>
            </div>
            {exp
              ? <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full"><XCircle size={11} /> 만료</span>
              : <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle size={11} /> 활성</span>}
          </div>

          <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3 flex items-center gap-2">
            <span className="font-mono text-xs text-gray-500 flex-1 truncate">/share/{link.token}</span>
            <button onClick={() => copy(link.token)} className="shrink-0 p-1 hover:bg-white rounded transition-colors">
              {copied === link.token ? <CheckCircle size={13} className="text-emerald-500" /> : <Copy size={13} className="text-gray-400" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock size={11} /> 만료: {formatDate(link.expiresAt)}</span>
            <span className="flex items-center gap-1"><Eye size={11} /> 조회 {link.viewCount}{link.maxViews ? `/${link.maxViews}` : ""}회</span>
            <span className="flex items-center gap-1"><Shield size={11} /> {link.allowDownload ? "다운 허용" : "뷰어 전용"}</span>
          </div>

          {viewPct !== null && (
            <div className="mt-3">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${viewPct >= 100 ? "bg-red-400" : viewPct >= 80 ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ width: `${Math.min(viewPct, 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">공유 링크 관리</h1>
          <p className="text-sm text-gray-500 mt-1">시한부 링크 · 다운로드 차단 · 접근 횟수 제한</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            공유 링크는 <strong>조회 전용</strong>입니다. 수신자는 다운로드할 수 없으며 워터마크가 오버레이됩니다.
          </div>
        </div>

        {active.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Link2 size={14} className="text-emerald-500" /> 활성 공유 링크 ({active.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {active.map((l) => <LinkCard key={l.id} link={l} />)}
            </div>
          </div>
        )}

        {expired.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
              <XCircle size={14} className="text-gray-400" /> 만료 / 폐기된 링크 ({expired.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {expired.map((l) => <LinkCard key={l.id} link={l} dim />)}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
