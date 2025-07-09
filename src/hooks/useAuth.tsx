import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const checkMockSession = () => {
    try {
      const mockUser = localStorage.getItem("acadnext_user");
      const mockSession = localStorage.getItem("acadnext_session");

      if (mockUser && mockSession) {
        console.log("Found mock session in localStorage");
        const parsedUser = JSON.parse(mockUser);
        const parsedSession = JSON.parse(mockSession);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
        setSession(parsedSession);
        setLoading(false);
        return true;
      }
      console.log("No mock session found in localStorage");
      return false;
    } catch (error) {
      console.error("Error parsing mock session:", error);
      // Clear corrupted data
      localStorage.removeItem("acadnext_user");
      localStorage.removeItem("acadnext_session");
      return false;
    }
  };

  const refreshUser = () => {
    console.log("Refreshing user state...");
    checkMockSession();
  };

  useEffect(() => {
    // Check for mock session first (for simplified authentication)
    if (checkMockSession()) {
      return;
    }

    // Set up auth state listener for Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    // Clear mock session
    localStorage.removeItem("acadnext_user");
    localStorage.removeItem("acadnext_session");

    // Clear Supabase session
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }

    // Reset state
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
