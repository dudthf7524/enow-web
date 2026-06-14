import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Link } from "react-router-dom";
import { MOCK_ASSETS, formatBytes, formatDate, FILE_ICONS, ROLE_COLORS, ROLE_LABELS } from "@/data/mock";
import { Search, Upload, Filter, CheckCircle, XCircle } from "lucide-react";

const FILE_TYPES = ["전체", "IMAGE", "PDF", "CAD", "CLO", "EXCEL"];

export default function AssetsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");

  const filtered = MOCK_ASSETS.filter((a) => {
    const matchSearch = a.originalName.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "전체" || a.fileType === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">디자인 에셋</h1>
            <p className="text-sm text-gray-500 mt-1">총 {filtered.length}개 파일 · SHA-256 해시 보호됨</p>
          </div>
          <Link to="/assets/upload" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Upload size={16} />
            파일 등록
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="파일명 검색..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-wrap">
            <Filter size={14} className="text-gray-400" />
            {FILE_TYPES.map((t) => (
              <button
                key={t} onClick={() => setTypeFilter(t)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                  typeFilter === t ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">파일</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">크기</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">등록자</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: asset.thumbnailColor + "20" }}>
                        {FILE_ICONS[asset.fileType]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.originalName}</div>
                        <div className="text-xs text-gray-400 font-mono">{asset.sha256.slice(0, 16)}…</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">{asset.fileType}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatBytes(asset.size)}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{asset.uploaderName}</div>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${ROLE_COLORS[asset.uploaderRole]}`}>
                      {ROLE_LABELS[asset.uploaderRole]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatDate(asset.uploadedAt)}</td>
                  <td className="px-4 py-4">
                    {asset.status === "ACTIVE" ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle size={13} /> 보호됨
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                        <XCircle size={13} /> 폐기됨
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <Link to={`/assets/${asset.id}`} className="text-xs text-indigo-600 hover:underline font-medium">
                      상세 보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
