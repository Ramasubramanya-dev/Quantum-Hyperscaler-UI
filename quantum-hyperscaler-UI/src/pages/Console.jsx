import { useAuth } from "../auth/AuthProvider";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import styles from "../styles/console.module.css";

export default function Console() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Dashboard />;

  return (
    <div className={styles.wrap}>
      <div className={styles.col}>
        <div className={styles.panel}>
          <Login />    {/* Login.jsx must render only the card (no outer wrap) */}
        </div>
      </div>

      {/* Vertical divider */}
      <div className={styles.dividerCol}>
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.badge}>or</span>
      </div>

      <div className={styles.col}>
        <div className={styles.panel}>
          <Signup />   {/* Signup.jsx must render only the card (no outer wrap) */}
        </div>
      </div>
    </div>
  );
}
