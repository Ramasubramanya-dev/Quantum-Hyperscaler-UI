import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function ConsoleLayout() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "260px 1fr",
      minHeight: "calc(100dvh - 72px)"
    }}>
      <Sidebar />
      <main style={{ padding: "24px 28px" }}>
        {/* Remove the line below later—just to prove render path */}
        <div style={{opacity:.5, fontSize:12, marginBottom:8}}>/console/app</div>
        <Outlet />
      </main>
    </div>
  );
}
