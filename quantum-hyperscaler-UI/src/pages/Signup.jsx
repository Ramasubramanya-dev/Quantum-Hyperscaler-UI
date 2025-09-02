import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import styles from "../styles/auth.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  function friendly(err) {
    const m = String(err?.message || err);
    if (m.includes("auth/email-already-in-use")) return "That email is already registered.";
    if (m.includes("auth/weak-password")) return "Password is too weak.";
    if (m.includes("auth/invalid-email")) return "Invalid email address.";
    return "Sign up failed. Please try again.";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (password !== confirm) {
      setMsg({ type: "err", text: "Passwords do not match." });
      return;
    }

    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // (Optional) send verification email
      try { await sendEmailVerification(cred.user); } catch { /* ignore */ }

      setMsg({ type: "ok", text: "Account created! Redirecting…" });
      navigate("/console", { replace: true });
    } catch (err) {
      setMsg({ type: "err", text: friendly(err) });
    } finally {
      setSubmitting(false);
    }
  }

  async function signupWithGoogle() {
    setMsg({ type: "", text: "" });
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setMsg({ type: "ok", text: "Signed in with Google. Redirecting…" });
      navigate("/console/app", { replace: true });
    } catch (err) {
      setMsg({ type: "err", text: "Google sign-in failed." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sign up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className={styles.input} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <input className={styles.input} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm password" />
        <button className={styles.btn} disabled={submitting}>{submitting ? "…" : "Create account"}</button>
      </form>
      <div className={styles.sep}>or</div>
      <button className={styles.btn} disabled={submitting} onClick={signupWithGoogle}>
        Continue with Google
      </button>

      {msg.text && (
        <div className={msg.type === "err" ? styles.err : styles.ok} style={{ marginTop: 10 }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}
