import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveRadar = () => {
  const { requestId } = useParams();
  const [data, setData] = useState({ request: null, donors: [] });

  useEffect(() => {
    const fetchRadar = async () => {
      const { data } = await api.get(`/request/radar/${requestId}`);
      setData(data);
    };
    fetchRadar();
  }, [requestId]);

  if (!data.request) return <div>Loading Map...</div>;

  const [lng, lat] = data.request.location.coordinates;

  return (
    <div className="h-screen w-full">
      <MapContainer center={[lat, lng]} zoom={14} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Hospital/Emergency Marker */}
        <Marker position={[lat, lng]}>
          <Popup>Emergency: {data.request.patientName}</Popup>
        </Marker>

        {/* Donor Markers */}
            {data.donors.map(donor => {
            // 1. Safety check: Only render if location and coordinates actually exist
            if (!donor.location?.coordinates) return null;

            return (
                <Marker 
                key={donor._id} 
                position={[donor.location.coordinates[1], donor.location.coordinates[0]]}
                >
                <Popup>Donor: {donor.userId.name}</Popup>
                </Marker>
            );
            })}
      </MapContainer>
    </div>
  );
};

export default LiveRadar;