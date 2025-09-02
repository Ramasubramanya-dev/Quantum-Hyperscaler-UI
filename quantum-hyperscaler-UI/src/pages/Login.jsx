import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../auth/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import styles from "../styles/auth.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ type: "", text: "" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/console/app", { replace: true });
    } catch (err) {
      setMsg({ type: "err", text: "Invalid credentials" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Log in</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className={styles.input} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className={styles.btn} disabled={submitting}>{submitting ? "..." : "Log in"}</button>
      </form>
      <div className={styles.sep}>or</div>
      <button className={styles.btn} onClick={()=>signInWithPopup(auth, googleProvider)}>Continue with Google</button>
      {msg.text && <div className={msg.type==="err"?styles.err:styles.ok}>{msg.text}</div>}
    </div>
  );
}
