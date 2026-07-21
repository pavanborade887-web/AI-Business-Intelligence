import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Preview from "./pages/Preview";
import Analysis from "./pages/Analysis";
import Train from "./pages/Train";
import Predict from "./pages/Predict";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      {/* Redirect Root */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/train" element={<Train />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;