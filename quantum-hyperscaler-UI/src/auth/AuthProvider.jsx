import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> onAuthStateChanged(auth, u => { setUser(u); setLoading(false); }),[]);
  async function idToken(force=false){ return user ? await user.getIdToken(force) : null; }

  return <Ctx.Provider value={{ user, loading, idToken }}>{children}</Ctx.Provider>;
}
