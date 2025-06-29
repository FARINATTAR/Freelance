import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [files, setFiles] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('Select a Service');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔹 Fetch all available services for the dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/services');
        setServices(res.data.services || []);
      } catch (err) {
        console.error('❌ Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    setServiceId(service._id);
    setSelectedServiceName(service.title || service.name); // Use title first, fallback to name
    setIsDropdownOpen(false);
    console.log('Selected service:', service.title || service.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.userId || !serviceId) {
      alert('User ID and Service ID are required');
      return;
    }

    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('serviceId', serviceId);
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('projectDate', projectDate);
    for (const file of files) {
      formData.append('files', file);
    }

    try {
      await axios.post('http://localhost:3000/api/projects/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Project added successfully!');
      navigate('/projects');
    } catch (error) {
      console.error('❌ Error creating project:', error);
      alert('Error creating project. Check console.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        ></textarea>
        <input
          type="date"
          value={projectDate}
          onChange={(e) => setProjectDate(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* 🔹 Custom Service Dropdown */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '12px', zIndex: 9999 }}>
          <button
            type="button"
            onClick={() => {
              console.log('Dropdown clicked, current state:', isDropdownOpen);
              console.log('Services data:', services);
              setIsDropdownOpen(!isDropdownOpen);
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: serviceId ? '#000000' : '#6b7280',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <span>{selectedServiceName}</span>
            <span style={{ 
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}>
              ▼
            </span>
          </button>

          {isDropdownOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderTop: 'none',
                borderRadius: '0 0 6px 6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 10000
              }}
            >
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service, index) => (
                  <div
                    key={service._id}
                    onClick={() => {
                      console.log('Service selected:', service);
                      handleServiceSelect(service);
                    }}
                    style={{
                      padding: '12px 16px',
                      color: '#000000',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      borderBottom: index < services.length - 1 ? '1px solid #f3f4f6' : 'none',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ffffff';
                    }}
                  >
                    {service.title || service.name}
                  </div>
                ))
              ) : (
                <div style={{ 
                  padding: '12px 16px', 
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  No services available
                </div>
              )}
            </div>
          )}

          {/* Hidden input for form validation */}
          <input
            type="hidden"
            value={serviceId}
            required
          />
        </div>

        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              zIndex: 9998
            }}
            onClick={() => setIsDropdownOpen(false)}
          ></div>
        )}

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;