import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  
  // State holds all possible fields
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', role: 'Donor', city: '',
    // Donor specific
    bloodGroup: 'O+', age: '', weight: '',
    // Hospital specific
    hospitalName: '', registrationNumber: '', contactPerson: ''
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 🚨 Build the exact payload your backend controller expects
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        profileData: {
          city: formData.city
        }
      };

      // Nest the specific fields based on the chosen role
      if (formData.role === 'Donor') {
        payload.profileData.bloodGroup = formData.bloodGroup;
        payload.profileData.age = Number(formData.age);
        payload.profileData.weight = Number(formData.weight);
        // Default coordinate stub to prevent backend crash until GPS is fully hooked up
        payload.profileData.homeLocation = { type: 'Point', coordinates: [80.6480, 16.5062] }; 
      } else {
        payload.profileData.hospitalName = formData.hospitalName;
        payload.profileData.registrationNumber = formData.registrationNumber;
        payload.profileData.contactPerson = formData.contactPerson;
        payload.profileData.location = { type: 'Point', coordinates: [80.6480, 16.5062] };
      }

      await api.post('/auth/register', payload);
      navigate('/login');
      
    } catch (err) {
      console.error("Backend Error:", err.response?.data);
      setError(err.response?.data?.message || 'Server Error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">LifeLink</h2>
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">Create your account</h3>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm font-medium">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Role Toggle */}
          <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
            <button type="button" className={`flex-1 py-2 text-sm font-bold rounded-md transition ${formData.role === 'Donor' ? 'bg-white shadow text-red-600' : 'text-gray-500'}`} onClick={() => setFormData({ ...formData, role: 'Donor' })}>Donor</button>
            <button type="button" className={`flex-1 py-2 text-sm font-bold rounded-md transition ${formData.role === 'Hospital' ? 'bg-white shadow text-red-600' : 'text-gray-500'}`} onClick={() => setFormData({ ...formData, role: 'Hospital' })}>Hospital</button>
          </div>

          {/* Core Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{formData.role === 'Hospital' ? 'Hospital Admin Name' : 'Full Name'}</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" placeholder="e.g. Vijayawada" />
          </div>

          {/* Conditional Donor Fields */}
          {formData.role === 'Donor' && (
            <div className="flex gap-4 border-t pt-4 mt-2 border-gray-100">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500 bg-white">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" name="age" min="18" required value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input type="number" name="weight" min="45" required value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
              </div>
            </div>
          )}

          {/* Conditional Hospital Fields */}
          {formData.role === 'Hospital' && (
            <div className="space-y-4 border-t pt-4 mt-2 border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                <input type="text" name="hospitalName" required value={formData.hospitalName} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reg. Number</label>
                  <input type="text" name="registrationNumber" required value={formData.registrationNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded outline-none focus:border-red-500" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition mt-4 disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;