import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_ASSETS, MOCK_LOGS, MOCK_SHARE_LINKS, formatDate, ACTION_LABELS, FILE_ICONS } from "@/data/mock";
import { Shield, FolderOpen, Link2, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();

  const totalAssets = MOCK_ASSETS.filter((a) => a.status === "ACTIVE").length;
  const activeLinks = MOCK_SHARE_LINKS.filter((l) => !l.isRevoked && new Date(l.expiresAt) > new Date()).length;
  const blockedAttempts = MOCK_LOGS.filter((l) => l.action === "DOWNLOAD_ATTEMPT").length;
  const recentLogs = [...MOCK_LOGS].reverse().slice(0, 6);
  const recentAssets = MOCK_ASSETS.filter((a) => a.status === "ACTIVE").slice(0, 4);

  const stats = [
    { label: "등록된 에셋", value: totalAssets, icon: FolderOpen, color: "text-indigo-600", bg: "bg-indigo-50", change: "+3 이번 달" },
    { label: "활성 공유 링크", value: activeLinks, icon: Link2, color: "text-emerald-600", bg: "bg-emerald-50", change: "만료 1개" },
    { label: "차단된 다운로드", value: blockedAttempts, icon: Shield, color: "text-blue-600", bg: "bg-blue-50", change: "이번 주" },
    { label: "보안 알림", value: 1, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", change: "확인 필요" },
  ];

  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">안녕하세요, {user?.name}님 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">{new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500">{s.label}</span>
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon size={16} className={s.color} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900 text-sm">최근 등록 에셋</h2>
              <Link to="/assets" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                전체 보기 <TrendingUp size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentAssets.map((asset) => (
                <Link key={asset.id} to={`/assets/${asset.id}`} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: asset.thumbnailColor + "20" }}>
                    {FILE_ICONS[asset.fileType]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{asset.originalName}</div>
                    <div className="text-xs text-gray-400">{asset.uploaderName} · {formatDate(asset.uploadedAt)}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900 text-sm">최근 활동 로그</h2>
              <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={12} /> 실시간</span>
            </div>
            <div className="divide-y divide-gray-50">
              {recentLogs.map((log) => {
                const info = ACTION_LABELS[log.action] || { label: log.action, color: "text-gray-500" };
                return (
                  <div key={log.id} className="flex items-start gap-3 px-6 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.action === "DOWNLOAD_ATTEMPT" ? "bg-red-400" : "bg-gray-300"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${info.color}`}>{info.label}</span>
                        <span className="text-xs text-gray-400 truncate">{log.assetName}</span>
                      </div>
                      <div className="text-xs text-gray-400">{log.userName} · {log.ipAddress} · {formatDate(log.timestamp)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-800 text-sm">보안 알림</div>
            <div className="text-amber-700 text-sm mt-1">
              IP <code className="bg-amber-100 px-1 rounded text-xs">203.0.113.42</code>에서 <strong>FW25_패턴_작업지시서.pdf</strong>에 대한 다운로드 시도가 감지되었습니다.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
