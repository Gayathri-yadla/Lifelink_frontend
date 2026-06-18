import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users when the dashboard loads
  const fetchUsers = async () => {
    try {
      // Assuming you have a route to get all users: GET /api/admin/users
      const response = await api.get('/admin/users'); 
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // The function to trigger the deleteUserAndNotify controller
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`🚨 Are you sure you want to permanently delete ${userName} and send a termination email? This cannot be undone.`)) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      alert("User deleted and notification sent.");
      // Refresh the list immediately to remove the deleted user from the screen
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <button 
          onClick={logout}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Platform Users</h2>
        </div>
        
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No users found.</td></tr>
              ) : (
                users.map((platformUser) => (
                  <tr key={platformUser._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{platformUser.name}</td>
                    <td className="px-6 py-4 text-gray-600">{platformUser.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        platformUser.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                        platformUser.role === 'Hospital' ? 'bg-blue-100 text-blue-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {platformUser.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {platformUser.role !== 'Admin' && (
                        <button 
                          onClick={() => handleDeleteUser(platformUser._id, platformUser.name)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                        >
                          Delete & Notify
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;