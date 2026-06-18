import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import LiveRadar from './pages/LiveRadar';

// We will build these pages in the next phase!
const Placeholder = ({ title }) => <div className="p-10 text-2xl font-bold">{title}</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Placeholder title="Landing Page" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* HOSPITAL ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['Hospital']} />}>
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          {/* SWAP THIS LINE */}
          <Route path="/hospital/radar/:requestId" element={<LiveRadar />} />
        </Route>

        {/* USER/DONOR ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['Donor']} />}>
          <Route path="/user/dashboard" element={<Placeholder title="Unified User Dashboard" />} />
          <Route path="/user/active-mission/:requestId" element={<Placeholder title="Donor Action Map" />} />
          <Route path="/user/track-donor/:requestId" element={<Placeholder title="Recipient Waiting Map" />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;