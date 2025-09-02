import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Home from "./pages/Home.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

import ConsoleEntry from "./pages/ConsoleEntry.jsx";
import ConsoleLayout from "./app/ConsoleLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import FleetCapacity from "./pages/optimization/FleetCapacity.jsx";
import RouteOptimization from "./pages/optimization/RouteOptimization.jsx";
import NetworkPartitioning from "./pages/optimization/NetworkPartitioning.jsx";
import ResourceAllocation from "./pages/optimization/ResourceAllocation.jsx";
import PackingScheduling from "./pages/optimization/PackingScheduling.jsx";
import Graph from "./pages/graph/Index.jsx";
import ML from "./pages/ml/Index.jsx";
import IAM from "./pages/iam/Index.jsx";
import Cost from "./pages/cost/Index.jsx";

export default function App() {
  return (
    <AuthProvider>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<ConsoleEntry />} />

        <Route
          path="/console/app"
          element={
            <ProtectedRoute redirectTo="/console">
              <ConsoleLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="optimization/fleet-capacity" element={<FleetCapacity />} />
          <Route path="optimization/route-optimization" element={<RouteOptimization />} />
          <Route path="optimization/network-partitioning" element={<NetworkPartitioning />} />
          <Route path="optimization/resource-allocation" element={<ResourceAllocation />} />
          <Route path="optimization/packing-scheduling" element={<PackingScheduling />} />
          <Route path="graph" element={<Graph />} />
          <Route path="ml" element={<ML />} />
          <Route path="iam" element={<IAM />} />
          <Route path="cost" element={<Cost />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
