import { useParams, Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { MOCK_ASSETS, MOCK_USERS, formatDate, formatBytes } from "@/data/mock";
import { Shield, Download, CheckCircle, ExternalLink } from "lucide-react";

export default function CertificateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const asset = MOCK_ASSETS.find((a) => a.certId === id);

  if (!asset) return (
    <AppShell><div className="p-8 text-gray-500">인증서를 찾을 수 없습니다.</div></AppShell>
  );

  const uploader = MOCK_USERS.find((u) => u.id === asset.uploaderId);

  return (
    <AppShell>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/certificates" className="text-gray-400 hover:text-gray-600 text-sm">← 인증서 목록</Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">디자인 창작 증명서</h1>
            <p className="text-sm text-gray-500 mt-1">Digital Design Ownership Certificate</p>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Download size={15} /> 인쇄 / PDF 저장
          </button>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-indigo-900 px-8 py-6 text-center">
            <div className="text-white/60 text-xs uppercase tracking-widest mb-2">Design Protect Platform</div>
            <h2 className="text-2xl font-bold text-white mb-1">디자인 창작 증명서</h2>
            <div className="text-white/70 text-sm">Digital Design Ownership Certificate</div>
            <div className="mt-4 inline-block bg-white/10 border border-white/20 rounded-lg px-6 py-2">
              <span className="font-mono font-bold text-white tracking-wider">{asset.certId}</span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">파일 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "파일명", value: asset.originalName },
                  { label: "파일 크기", value: formatBytes(asset.size) },
                  { label: "파일 유형", value: asset.fileType },
                  { label: "에셋 ID", value: asset.id, mono: true },
                ].map(({ label, value, mono }) => (
                  <div key={label}>
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className={`mt-0.5 ${mono ? "font-mono text-xs text-gray-600" : "font-medium text-gray-900"}`}>{value}</dd>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">창작자 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "창작자", value: uploader?.name || asset.uploaderName, bold: true },
                  { label: "이메일", value: uploader?.email || "" },
                  { label: "소속", value: uploader?.company || "" },
                  { label: "창작 확인 시점", value: `${formatDate(asset.uploadedAt)} KST`, bold: true },
                ].map(({ label, value, bold }) => (
                  <div key={label}>
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className={`mt-0.5 ${bold ? "font-semibold text-gray-900" : "text-gray-700"}`}>{value}</dd>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">무결성 검증 (SHA-256 해시)</h3>
              <p className="text-xs text-gray-500 mb-2">이 해시값은 파일이 단 1비트도 변경되지 않았음을 보장합니다.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-700 break-all">{asset.sha256}</div>
            </section>

            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">블록체인 타임스탬프 기록</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <dt className="text-xs text-gray-400">블록 높이</dt>
                  <dd className="font-mono font-semibold text-gray-900 mt-0.5">#{asset.blockHeight.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">네트워크</dt>
                  <dd className="font-semibold text-gray-900 mt-0.5">Polygon (시뮬레이션)</dd>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 font-mono text-xs text-gray-600 break-all">{asset.txHash}</div>
            </section>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-indigo-800 text-sm mb-1">법적 효력 안내</div>
                  <div className="text-indigo-700 text-xs leading-relaxed">
                    표절 분쟁 발생 시 이 증명서와 원본 파일을 함께 제출하면, 해시값 재계산을 통해
                    상기 시점에 해당 디자인을 소유하고 있었음을 법정 및 특허청에서 객관적인 증거로 제시할 수 있습니다.
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-gray-100">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-2">
                <CheckCircle size={15} className="text-emerald-500" />
                <span className="text-emerald-700 text-sm font-medium">공식 인증 완료</span>
              </div>
              <p className="text-xs text-gray-400 mt-3">발행일: {new Date().toLocaleString("ko-KR")}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to={`/assets/${asset.id}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline w-fit">
            <ExternalLink size={14} /> 에셋 상세 보기
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
