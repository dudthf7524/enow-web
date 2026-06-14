import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, FolderOpen, Upload, Award, Link2,
  ShieldCheck, Users, LogOut, ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "대시보드", icon: LayoutDashboard, roles: ["ADMIN","DESIGNER","MD","FACTORY"] },
  { to: "/assets", label: "디자인 에셋", icon: FolderOpen, roles: ["ADMIN","DESIGNER","MD","FACTORY"] },
  { to: "/assets/upload", label: "파일 등록", icon: Upload, roles: ["ADMIN","DESIGNER","MD"] },
  { to: "/certificates", label: "인증서 관리", icon: Award, roles: ["ADMIN","DESIGNER","MD"] },
  { to: "/share", label: "공유 링크", icon: Link2, roles: ["ADMIN","DESIGNER","MD"] },
  { to: "/verify", label: "해시 검증", icon: ShieldCheck, roles: ["ADMIN","DESIGNER","MD","FACTORY"] },
  { to: "/users", label: "사용자 관리", icon: Users, roles: ["ADMIN"] },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-60 min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-bold">D</div>
          <div>
            <div className="font-bold text-sm leading-tight">Design Protect</div>
            <div className="text-xs text-gray-400 leading-tight">패션 디자인 보안 플랫폼</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to || (pathname.startsWith(item.to + "/") && item.to !== "/assets/upload");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="px-3 py-4 border-t border-gray-800">
          <div className="px-3 py-2 mb-1">
            <div className="text-sm font-medium text-white">{user.name}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      )}
    </aside>
  );
}
