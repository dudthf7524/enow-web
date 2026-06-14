import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_USERS, ROLE_LABELS, ROLE_COLORS, formatDate } from "@/data/mock";
import type { UserRole } from "@/data/mock";
import { Plus, Shield, X, CheckCircle } from "lucide-react";

export default function UsersPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState<typeof MOCK_USERS>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "DESIGNER" as UserRole, company: "" });
  const [success, setSuccess] = useState(false);

  if (user?.role !== "ADMIN") return (
    <AppShell>
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-3">
          <Shield size={20} className="text-red-500" />
          <div>
            <div className="font-semibold text-red-800">접근 불가</div>
            <div className="text-sm text-red-600">관리자 권한이 필요합니다.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  const allUsers = [...MOCK_USERS, ...added];

  function handleAdd() {
    if (!form.name || !form.email) return;
    setAdded((prev) => [...prev, { id: "u" + Date.now(), ...form, createdAt: new Date().toISOString() }]);
    setForm({ name: "", email: "", role: "DESIGNER", company: "" });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setShowModal(false); }, 1500);
  }

  return (
    <AppShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
            <p className="text-sm text-gray-500 mt-1">역할 기반 접근 제어 (RBAC) — 총 {allUsers.length}명</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> 사용자 초대
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {(["ADMIN","DESIGNER","MD","FACTORY"] as UserRole[]).map((role) => (
            <div key={role} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`inline-flex text-xs px-2 py-1 rounded font-medium mb-2 ${ROLE_COLORS[role]}`}>{ROLE_LABELS[role]}</div>
              <div className="text-xs text-gray-500">
                {role === "ADMIN" && "전체 권한 · 사용자 관리 · 로그 열람"}
                {role === "DESIGNER" && "업로드 · 인증서 · 공유 링크 생성"}
                {role === "MD" && "업로드 · 공유 링크 생성 · 조회"}
                {role === "FACTORY" && "조회 전용 · 다운로드 불가"}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["사용자", "역할", "소속", "가입일", "권한"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider first:px-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${ROLE_COLORS[u.role]}`}>{ROLE_LABELS[u.role]}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{u.company}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {u.role !== "FACTORY" && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">업로드</span>}
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">조회</span>
                      {u.role !== "FACTORY" && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">공유</span>}
                      {u.role === "ADMIN" && <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">관리</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">사용자 초대</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            {success ? (
              <div className="py-8 text-center">
                <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
                <div className="font-semibold text-gray-800">초대 완료!</div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: "이름", key: "name", placeholder: "홍길동" },
                  { label: "이메일", key: "email", placeholder: "user@company.com" },
                  { label: "소속", key: "company", placeholder: "회사명" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input value={form[key as keyof typeof form]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">역할</label>
                  <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    {(["DESIGNER","MD","FACTORY","ADMIN"] as UserRole[]).map((r) => (
                      <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleAdd} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">초대 발송</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors">취소</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
