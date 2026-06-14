import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import AssetsPage from "@/pages/AssetsPage";
import UploadPage from "@/pages/UploadPage";
import AssetDetailPage from "@/pages/AssetDetailPage";
import CertificatesPage from "@/pages/CertificatesPage";
import CertificateDetailPage from "@/pages/CertificateDetailPage";
import VerifyPage from "@/pages/VerifyPage";
import SharePage from "@/pages/SharePage";
import ShareViewerPage from "@/pages/ShareViewerPage";
import UsersPage from "@/pages/UsersPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/assets/upload" element={<UploadPage />} />
          <Route path="/assets/:id" element={<AssetDetailPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/certificates/:id" element={<CertificateDetailPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/share/:token" element={<ShareViewerPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
