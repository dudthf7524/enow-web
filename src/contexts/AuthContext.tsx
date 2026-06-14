import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, MOCK_USERS } from "@/data/mock";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("dp_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  function login(email: string, password: string): boolean {
    const found = MOCK_USERS.find((u) => u.email === email);
    if (!found || password.length < 4) return false;
    setUser(found);
    localStorage.setItem("dp_user", JSON.stringify(found));
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("dp_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
