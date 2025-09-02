import { auth } from "../auth/firebase";

const API_BASE = import.meta.env.VITE_API_BASE; // your Cloud Run URL or http://localhost:8080

export async function api(path, opts={}){
  const token = await auth.currentUser?.getIdToken();
  const headers = { "Content-Type": "application/json", ...(opts.headers||{}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
