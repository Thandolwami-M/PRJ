import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PairDevice from "./pages/PairDevice";
import LiveDrive from "./pages/LiveDrive";
import TripSummary from "./pages/TripSummary";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pair-device" element={<PairDevice />} />
      <Route path="/live-drive" element={<LiveDrive />} />
      <Route path="/trip-summary" element={<TripSummary />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;