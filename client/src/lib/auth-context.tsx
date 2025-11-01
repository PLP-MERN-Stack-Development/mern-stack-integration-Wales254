import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  user: { id: string; username: string; email: string; fullName?: string; profilePicture?: string } | null;
  login: (user: any, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isReady, setIsReady] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    enabled: !!localStorage.getItem("token") && isReady,
    retry: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const login = (userData: any, token: string) => {
    setUser(userData);
    localStorage.setItem("token", token);
    setIsReady(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setIsReady(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading: isLoading && !isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
