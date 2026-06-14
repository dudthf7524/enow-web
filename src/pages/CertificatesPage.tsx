import AppShell from "@/components/layout/AppShell";
import { MOCK_ASSETS, formatDate, FILE_ICONS } from "@/data/mock";
import { Award, ExternalLink, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function CertificatesPage() {
  const certified = MOCK_ASSETS.filter((a) => a.certId && a.status === "ACTIVE");

  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">인증서 관리</h1>
          <p className="text-sm text-gray-500 mt-1">블록체인 타임스탬프로 창작 시점이 증명된 디지털 소유권 인증서</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {certified.map((asset) => (
            <div key={asset.certId} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2" style={{ background: asset.thumbnailColor }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: asset.thumbnailColor + "20" }}>
                      {FILE_ICONS[asset.fileType]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 leading-tight">{asset.originalName}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{asset.uploaderName}</div>
                    </div>
                  </div>
                  <Award size={18} className="text-amber-400 shrink-0" />
                </div>
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">인증서 ID</span>
                    <span className="font-mono font-bold text-indigo-600">{asset.certId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">등록 시점</span>
                    <span className="text-gray-700">{formatDate(asset.uploadedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">블록 높이</span>
                    <span className="font-mono text-gray-700">#{asset.blockHeight.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 mb-4">
                  <div className="text-xs text-gray-400 mb-1">SHA-256</div>
                  <div className="font-mono text-xs text-gray-600 break-all leading-relaxed">{asset.sha256.slice(0, 32)}…</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/certificates/${asset.certId}`} className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-xs font-medium transition-colors">
                    <Shield size={13} /> 인증서 보기
                  </Link>
                  <Link to={`/assets/${asset.id}`} className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-xs transition-colors">
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
