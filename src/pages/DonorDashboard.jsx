import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function DonorDashboard() {
  const [donor, setDonor] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch profile and available emergency requests
      const [profileRes, reqRes] = await Promise.all([
        api.get("/donor/profile"),
        api.get("/request/all") // Ensure this returns filtered list
      ]);
      setDonor(profileRes.data);
      setRequests(reqRes.data.filter(r => r.status === 'Searching'));
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    await api.put("/donor/toggle-availability");
    fetchDashboardData();
  };

  if (loading) return <div className="p-10">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        
        {/* Profile Stats */}
        <header className="bg-white p-6 rounded-xl shadow border mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome, {donor.userId.name}</h1>
            <button onClick={toggleAvailability} className={`px-4 py-2 rounded font-bold ${donor.isAvailable ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
              {donor.isAvailable ? "Status: Available" : "Status: Unavailable"}
            </button>
          </div>
          <div className="flex gap-8 mt-4">
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>Reliability:</strong> {donor.reliabilityScore}</p>
            <p><strong>Donations:</strong> {donor.totalDonations}</p>
          </div>
        </header>

        {/* Emergency Requests */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Incoming Emergency Requests</h2>
          {requests.map(req => (
            <div key={req._id} className="bg-white p-6 rounded-lg shadow-sm border mb-3">
              <p><strong>Patient:</strong> {req.patientName} | <strong>Hospital:</strong> {req.requesterName}</p>
              <p><strong>Required Before:</strong> {new Date(req.operationTime).toLocaleString()}</p>
              <div className="mt-4 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Accept</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded">Cannot Donate</button>
              </div>
            </div>
          ))}
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow"><h3>Live Tracking</h3></div>
          <div className="bg-white p-4 rounded shadow"><h3>Donation History</h3></div>
          <div className="bg-white p-4 rounded shadow"><h3>Next Eligible: {donor.nextEligibleDate ? new Date(donor.nextEligibleDate).toLocaleDateString() : "Now"}</h3></div>
          <div className="bg-white p-4 rounded shadow"><h3>Notifications</h3></div>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;