export type UserRole = "ADMIN" | "DESIGNER" | "MD" | "FACTORY";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  originalName: string;
  fileType: "IMAGE" | "PDF" | "CAD" | "CLO" | "EXCEL" | "OTHER";
  mimeType: string;
  size: number;
  sha256: string;
  txHash: string;
  blockHeight: number;
  certId: string;
  status: "ACTIVE" | "REVOKED";
  uploadedAt: string;
  uploaderId: string;
  uploaderName: string;
  uploaderRole: UserRole;
  thumbnailColor: string;
}

export interface ShareLink {
  id: string;
  token: string;
  assetId: string;
  assetName: string;
  fileType: string;
  createdById: string;
  expiresAt: string;
  maxViews: number | null;
  viewCount: number;
  allowDownload: boolean;
  note: string;
  createdAt: string;
  isRevoked: boolean;
}

export interface AccessLog {
  id: string;
  assetName: string;
  userName: string;
  action: string;
  ipAddress: string;
  timestamp: string;
}

export const MOCK_USERS: User[] = [
  { id: "u1", email: "admin@fashion.co", name: "김철수", role: "ADMIN", company: "패션브랜드 A", createdAt: "2024-01-10T09:00:00Z" },
  { id: "u2", email: "designer@fashion.co", name: "이영희", role: "DESIGNER", company: "패션브랜드 A", createdAt: "2024-01-15T09:00:00Z" },
  { id: "u3", email: "md@fashion.co", name: "박민준", role: "MD", company: "패션브랜드 A", createdAt: "2024-02-01T09:00:00Z" },
  { id: "u4", email: "factory@partner.com", name: "최성훈", role: "FACTORY", company: "협력공장 B", createdAt: "2024-02-15T09:00:00Z" },
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: "a1", originalName: "SS25_재킷_디자인_최종.png", fileType: "IMAGE", mimeType: "image/png",
    size: 4250000, sha256: "e3b0c44298fc1c149afbf4c8996fb924a7ae41e4649b934ca495991b7852b855",
    txHash: "0x3a5f2c1d8b4e9f7a6c0d2e8b1f4a7c9e2d5b8a0f3c6e9a2d5f8b1c4e7a0d3f6",
    blockHeight: 19847231, certId: "CERT-A1B2C3D4", status: "ACTIVE",
    uploadedAt: "2025-03-15T14:23:00Z", uploaderId: "u2", uploaderName: "이영희", uploaderRole: "DESIGNER",
    thumbnailColor: "#6366f1",
  },
  {
    id: "a2", originalName: "FW25_패턴_작업지시서.pdf", fileType: "PDF", mimeType: "application/pdf",
    size: 1820000, sha256: "f4a7c9e2d5b8a0f3c6e9a2d5f8b1c4e7a0d3f6e9c2b5a8d1f4c7e0a3d6f9b2c5",
    txHash: "0x9c2b5a8d1f4c7e0a3d6f9b2c5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2",
    blockHeight: 19847890, certId: "CERT-E5F6G7H8", status: "ACTIVE",
    uploadedAt: "2025-03-20T10:05:00Z", uploaderId: "u2", uploaderName: "이영희", uploaderRole: "DESIGNER",
    thumbnailColor: "#ef4444",
  },
  {
    id: "a3", originalName: "SS25_블라우스_CLO3D.cloz", fileType: "CLO", mimeType: "application/octet-stream",
    size: 8960000, sha256: "b8c3d6a9f2e5b8c1d4f7a0c3e6b9a2f5d8c1b4e7f0a3c6d9b2e5f8a1c4d7e0b3",
    txHash: "0x5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2d5a8f1b4c7e0d3f6a9c2b5e8",
    blockHeight: 19850123, certId: "CERT-I9J0K1L2", status: "ACTIVE",
    uploadedAt: "2025-04-01T16:40:00Z", uploaderId: "u2", uploaderName: "이영희", uploaderRole: "DESIGNER",
    thumbnailColor: "#8b5cf6",
  },
  {
    id: "a4", originalName: "FW25_셔츠_CAD도면.dxf", fileType: "CAD", mimeType: "application/octet-stream",
    size: 512000, sha256: "d1f4c7e0a3d6f9b2c5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2d5a8f1b4",
    txHash: "0x2d5a8f1b4c7e0d3f6a9c2b5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2d5",
    blockHeight: 19851456, certId: "CERT-M3N4O5P6", status: "ACTIVE",
    uploadedAt: "2025-04-08T09:12:00Z", uploaderId: "u3", uploaderName: "박민준", uploaderRole: "MD",
    thumbnailColor: "#f59e0b",
  },
  {
    id: "a5", originalName: "SS25_원단발주서.xlsx", fileType: "EXCEL", mimeType: "application/vnd.ms-excel",
    size: 185000, sha256: "a7d0f3c6b9e2d5a8f1b4c7e0d3f6a9c2b5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0",
    txHash: "0x8f1b4c7e0d3f6a9c2b5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2d5a8f1",
    blockHeight: 19853012, certId: "CERT-Q7R8S9T0", status: "ACTIVE",
    uploadedAt: "2025-04-12T11:30:00Z", uploaderId: "u3", uploaderName: "박민준", uploaderRole: "MD",
    thumbnailColor: "#10b981",
  },
  {
    id: "a6", originalName: "FW24_아카이브_코트.png", fileType: "IMAGE", mimeType: "image/png",
    size: 3100000, sha256: "c6b9e2d5a8f1b4c7e0d3f6a9c2b5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9",
    txHash: "0x1b4c7e0d3f6a9c2b5e8a1d4f7c0b3e6a9d2f5c8b1e4a7d0f3c6b9e2d5a8f1b4",
    blockHeight: 19854789, certId: "CERT-U1V2W3X4", status: "REVOKED",
    uploadedAt: "2025-01-20T08:45:00Z", uploaderId: "u2", uploaderName: "이영희", uploaderRole: "DESIGNER",
    thumbnailColor: "#6b7280",
  },
];

export const MOCK_SHARE_LINKS: ShareLink[] = [
  {
    id: "s1", token: "abc123def456ghi789", assetId: "a2", assetName: "FW25_패턴_작업지시서.pdf",
    fileType: "PDF", createdById: "u2", expiresAt: "2025-12-31T23:59:00Z", maxViews: 5,
    viewCount: 2, allowDownload: false, note: "협력공장 B 생산 확인용", createdAt: "2025-04-10T09:00:00Z", isRevoked: false,
  },
  {
    id: "s2", token: "xyz789uvw456rst123", assetId: "a3", assetName: "SS25_블라우스_CLO3D.cloz",
    fileType: "CLO", createdById: "u3", expiresAt: "2025-06-30T23:59:00Z", maxViews: null,
    viewCount: 7, allowDownload: false, note: "샘플 검토용", createdAt: "2025-04-05T14:00:00Z", isRevoked: false,
  },
  {
    id: "s3", token: "mno321pqr654stu987", assetId: "a4", assetName: "FW25_셔츠_CAD도면.dxf",
    fileType: "CAD", createdById: "u3", expiresAt: "2025-05-01T00:00:00Z", maxViews: 3,
    viewCount: 3, allowDownload: false, note: "만료된 링크", createdAt: "2025-03-25T10:00:00Z", isRevoked: true,
  },
];

export const MOCK_LOGS: AccessLog[] = [
  { id: "l1", assetName: "SS25_재킷_디자인_최종.png", userName: "이영희", action: "UPLOAD", ipAddress: "192.168.1.10", timestamp: "2025-03-15T14:23:00Z" },
  { id: "l2", assetName: "FW25_패턴_작업지시서.pdf", userName: "이영희", action: "UPLOAD", ipAddress: "192.168.1.10", timestamp: "2025-03-20T10:05:00Z" },
  { id: "l3", assetName: "FW25_패턴_작업지시서.pdf", userName: "최성훈", action: "VIEW", ipAddress: "203.0.113.42", timestamp: "2025-04-10T11:20:00Z" },
  { id: "l4", assetName: "FW25_패턴_작업지시서.pdf", userName: "익명", action: "DOWNLOAD_ATTEMPT", ipAddress: "203.0.113.42", timestamp: "2025-04-10T11:22:00Z" },
  { id: "l5", assetName: "SS25_블라우스_CLO3D.cloz", userName: "박민준", action: "VIEW", ipAddress: "192.168.1.15", timestamp: "2025-04-08T16:55:00Z" },
  { id: "l6", assetName: "SS25_재킷_디자인_최종.png", userName: "이영희", action: "SHARE_CREATE", ipAddress: "192.168.1.10", timestamp: "2025-04-09T09:00:00Z" },
  { id: "l7", assetName: "FW25_셔츠_CAD도면.dxf", userName: "박민준", action: "UPLOAD", ipAddress: "192.168.1.15", timestamp: "2025-04-08T09:12:00Z" },
  { id: "l8", assetName: "SS25_원단발주서.xlsx", userName: "박민준", action: "UPLOAD", ipAddress: "192.168.1.15", timestamp: "2025-04-12T11:30:00Z" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "관리자",
  DESIGNER: "디자이너",
  MD: "생산 MD",
  FACTORY: "외부 공장",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  ADMIN: "bg-purple-100 text-purple-700 border border-purple-200",
  DESIGNER: "bg-blue-100 text-blue-700 border border-blue-200",
  MD: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  FACTORY: "bg-orange-100 text-orange-700 border border-orange-200",
};

export const FILE_ICONS: Record<string, string> = {
  IMAGE: "🖼️", PDF: "📄", CAD: "📐", CLO: "👗", EXCEL: "📊", OTHER: "📁",
};

export const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  UPLOAD: { label: "업로드", color: "text-blue-600" },
  VIEW: { label: "조회", color: "text-green-600" },
  DOWNLOAD_ATTEMPT: { label: "다운로드 시도", color: "text-red-600" },
  SHARE_CREATE: { label: "공유 링크 생성", color: "text-purple-600" },
  VERIFY: { label: "해시 검증", color: "text-amber-600" },
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export function isExpired(iso: string): boolean {
  return new Date(iso) < new Date();
}

// Simulate SHA-256 via Web Crypto API (browser-side)
export async function computeSHA256(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function simulateBlockchainRecord(sha256: string) {
  const blockHeight = Math.floor(Date.now() / 1000) - 1700000000 + Math.floor(Math.random() * 1000);
  const txSeed = sha256.slice(0, 16) + Date.now().toString(16);
  const txHash = "0x" + Array.from(txSeed).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("").slice(0, 64);
  return { txHash, blockHeight };
}

export function generateCertId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return "CERT-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
