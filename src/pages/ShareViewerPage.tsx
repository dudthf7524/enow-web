import { useParams } from "react-router-dom";
import { MOCK_SHARE_LINKS, formatDate, isExpired, FILE_ICONS } from "@/data/mock";
import { Shield, Eye, AlertTriangle, XCircle, Download, Clock, Fingerprint } from "lucide-react";

export default function ShareViewerPage() {
  const { token } = useParams<{ token: string }>();
  const link = MOCK_SHARE_LINKS.find((l) => l.token === token);

  if (!link) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <XCircle size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">링크를 찾을 수 없습니다</h1>
        <p className="text-gray-400 text-sm">이 링크가 존재하지 않거나 삭제되었습니다.</p>
      </div>
    </div>
  );

  const expired = link.isRevoked || isExpired(link.expiresAt) || (link.maxViews !== null && link.viewCount >= link.maxViews);
  // asset data available for future viewer enhancement

  if (expired) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <Clock size={48} className="text-amber-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">링크가 만료되었습니다</h1>
        <p className="text-gray-400 text-sm">
          {link.isRevoked ? "이 링크는 소유자에 의해 폐기되었습니다." :
           link.maxViews && link.viewCount >= link.maxViews ? "최대 조회 횟수를 초과했습니다." :
           "링크 유효기간이 지났습니다."}
        </p>
        <div className="mt-4 text-xs text-gray-400">만료: {formatDate(link.expiresAt)}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">D</div>
          <span className="text-white font-semibold text-sm">Design Protect</span>
          <span className="text-gray-500 text-xs">· 보안 공유 뷰어</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><Eye size={12} /> 조회 {link.viewCount}{link.maxViews ? `/${link.maxViews}` : ""}회</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> 만료: {formatDate(link.expiresAt)}</span>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="bg-amber-900/20 border-b border-amber-800/30 px-6 py-2.5 flex items-center gap-2">
            <AlertTriangle size={13} className="text-amber-400" />
            <span className="text-amber-300 text-xs">이 파일은 <strong>조회 전용</strong>입니다. 다운로드, 화면 캡처가 차단되며 모든 접근이 기록됩니다.</span>
          </div>

          <div className="flex-1 relative bg-gray-800 secure-content overflow-hidden" style={{ minHeight: 420 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-6">{FILE_ICONS[link.fileType]}</div>
                <div className="text-white/70 text-lg font-medium">{link.assetName}</div>
                <div className="text-gray-500 text-sm mt-2">보안 뷰어에서 열람 중</div>
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 10 }}>
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => (
                  <div key={`${row}-${col}`} className="absolute text-white/10 font-medium whitespace-nowrap"
                    style={{ top: row * 80 - 20, left: col * 200 - 50, transform: "rotate(-30deg)", fontSize: "12px" }}>
                    DESIGN PROTECT · 공유 링크 조회 · 무단 복제 금지
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="w-72 bg-gray-950 border-l border-gray-800 p-5 space-y-5">
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">파일 정보</div>
            <div className="space-y-2.5">
              {[
                { label: "파일명", value: link.assetName },
                { label: "유형", value: link.fileType },
                { label: "메모", value: link.note || "-" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-sm text-white mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-5">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">보안 정보</div>
            <div className="space-y-2">
              {[
                { icon: Shield, label: "워터마크", value: "삽입됨", color: "text-emerald-400" },
                { icon: Download, label: "다운로드", value: "차단됨", color: "text-red-400" },
                { icon: Fingerprint, label: "접근 추적", value: "활성", color: "text-emerald-400" },
                { icon: Eye, label: "조회 제한", value: link.maxViews ? `${link.maxViews}회` : "무제한", color: "text-gray-300" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-gray-400"><Icon size={12} />{label}</span>
                  <span className={`text-xs font-medium ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-5">
            <div className="bg-gray-900 rounded-xl p-3 text-xs text-gray-400">
              이 파일은 Design Protect 플랫폼에 등록된 보호 자산입니다. 무단 복제 및 배포 시 법적 책임을 집니다.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
