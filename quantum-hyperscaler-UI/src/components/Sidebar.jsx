import { NavLink } from "react-router-dom";

const BASE = "/console/app";

export default function Sidebar() {
  const link = (to, label, end=false) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      style={({isActive}) => ({
        display:"block", padding:"8px 10px", borderRadius:8,
        background: isActive ? "rgba(0,255,230,.10)" : "transparent"
      })}
    >{label}</NavLink>
  );

  return (
    <aside style={{borderRight:"1px solid rgba(255,255,255,.08)", padding:12}}>
      <div style={{fontWeight:700, margin:"6px 4px 10px"}}>Navigation</div>
      {link(`${BASE}`, "Dashboard", true)}

      <div style={{marginTop:12, fontWeight:600, opacity:.9}}>Optimization Suite</div>
      <div style={{marginLeft:8}}>
        {link(`${BASE}/optimization/fleet-capacity`, "Fleet Planning (CVRP)")}
        {link(`${BASE}/optimization/resource-allocation`, "Resource Planning & Allocation (Knapsack)")}
        {link(`${BASE}/optimization/route-optimization`, "Route Optimization (TSP)")}
        {link(`${BASE}/optimization/network-partitioning`, "Network Partitioning (Max-Cut)")}
        {link(`${BASE}/optimization/packing-scheduling`, "Packing and Scheduling")}
      </div>

      <div style={{marginTop:12, fontWeight:600, opacity:.9}}>Other</div>
      <div style={{marginLeft:8}}>
        {link(`${BASE}/graph`, "Graph Intelligence")}
        {link(`${BASE}/ml`, "AI & Machine Learning")}
        {link(`${BASE}/iam`, "IAM & Admin")}
        {link(`${BASE}/cost`, "Cost Management")}
      </div>
    </aside>
  );
}
