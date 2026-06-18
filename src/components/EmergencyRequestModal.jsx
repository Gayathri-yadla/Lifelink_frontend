import { useState, useEffect } from 'react';
import api from '../services/api';

const EmergencyRequestModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsRequired: 1,
    urgencyLevel: 'High',
    operationTime: ''
  });
  
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Grab the GPS coordinates the moment the modal opens
const [locationLoading, setLocationLoading] = useState(true);

useEffect(() => {
  if (isOpen) {
    setLocationLoading(true); // Reset loading when opened
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationLoading(false); // Success!
        },
        (err) => {
          setLocationError("Location access denied. Please enable GPS in your browser settings.");
          setLocationLoading(false);
        }
      );
    }
  }
}, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!location.latitude || !location.longitude) {
    setError("Cannot broadcast request without valid GPS coordinates.");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      ...formData,
      // Change this to match the GeoJSON schema your backend expects
      operationTime: new Date(formData.operationTime).toISOString(),
      hospitalLocation: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude] // Note: Longitude first!
      }
    };

    await api.post('/request/create', payload); 
    onSuccess();
    onClose();
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to broadcast emergency.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full border-t-4 border-red-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Broadcast Emergency</h2>
        <p className="text-gray-600 mb-6 text-sm">This will instantly ping eligible donors within a 3km radius.</p>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
        {locationError && <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-sm font-medium">⚠️ {locationError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Patient Name</label>
            <input 
              type="text" name="patientName" required value={formData.patientName} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="e.g., Jane Doe"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Blood Group</label>
              <select 
                name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 outline-none bg-white"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Units Required</label>
              <input 
                type="number" name="unitsRequired" min="1" max="10" required value={formData.unitsRequired} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Urgency Level</label>
              <select 
                name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 outline-none bg-white"
              >
                <option value="Standard">Standard</option>
                <option value="High">High</option>
                <option value="Critical">Critical (Immediate)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Operation Time</label>
              <input 
                type="datetime-local" name="operationTime" required value={formData.operationTime} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || locationLoading || !!locationError}
              className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {locationLoading ? 'Getting GPS...' : loading ? 'Broadcasting...' : 'Confirm Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyRequestModal;