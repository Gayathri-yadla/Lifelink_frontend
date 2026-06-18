import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import api from '../services/api';
import EmergencyRequestModal from '../components/EmergencyRequestModal';

const HospitalDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // We will build this modal component next!
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHospitalRequests = async () => {
    try {
      // Assuming your backend has a route to fetch requests by the logged-in hospital
      const response = await api.get('/request/my-requests');
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Area */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Command Center</h1>
          <p className="text-gray-600">Facility: {user?.name}</p>
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white font-bold px-6 py-2 rounded shadow hover:bg-red-700 transition animate-pulse"
          >
            🚨 Initiate Emergency
          </button>
          <button 
            onClick={logout}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Active Emergencies Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Active & Past Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Patient</th>
                <th className="px-6 py-3 font-medium">Blood Group</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Operation Time</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading records...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No emergency requests found.</td></tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{req.patientName}</td>
                    <td className="px-6 py-4 font-bold text-red-600">{req.bloodGroup} ({req.unitsRequired} Units)</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        req.status === 'Searching' ? 'bg-yellow-100 text-yellow-700' :
                        req.status === 'Accepted' ? 'bg-blue-100 text-blue-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(req.operationTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/hospital/radar/${req._id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                      >
                        Open Radar 📍
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* The Live Emergency Modal */}
      <EmergencyRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchHospitalRequests} 
      />
      
    </div>
  );
};

export default HospitalDashboard;