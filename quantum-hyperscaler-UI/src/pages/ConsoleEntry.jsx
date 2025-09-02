import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import styles from "../styles/console.module.css";

export default function ConsoleEntry(){
  const { user, loading } = useAuth();
  if (loading) return <div style={{padding:16}}>Loading…</div>;
  if (user) return <Navigate to="/console/app" replace/>;

  return (
    <div className={styles.wrap}>
      <div className={styles.col}><div className={styles.panel}><Login/></div></div>
      <div className={styles.dividerCol}><span className={styles.line}/><span className={styles.badge}>or</span></div>
      <div className={styles.col}><div className={styles.panel}><Signup/></div></div>
    </div>
  );
}
