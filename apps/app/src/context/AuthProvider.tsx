import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase.client";
import { type User } from "@supabase/supabase-js";

interface AuthContextType {
  // todo look to move this elsewhere
  user: User | null;
  auth: boolean;
  signIn: (data: any) => void;
  signUp: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType); // todo check safety on this initialization method
const useAuth = () => useContext(AuthContext);

const actions = {
  signIn: (data: any) => supabase.auth.signInWithPassword(data),
  signUp: (data: any) => supabase.auth.signUp(data),
  logout: () => supabase.auth.signOut(),
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session != null) {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
