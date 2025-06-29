// // 📁 src/pages/AddProject.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddProject = () => {
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [projectDate, setProjectDate] = useState('');
//   const [files, setFiles] = useState([]);
//   const [serviceId, setServiceId] = useState(''); // ⬅️ serviceId field

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.userId || !serviceId) {
//       alert('User ID and Service ID are required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('userId', user.userId);
//     formData.append('serviceId', serviceId);
//     formData.append('title', title);
//     formData.append('location', location);
//     formData.append('description', description);
//     formData.append('projectDate', projectDate);
//     for (const file of files) {
//       formData.append('files', file);
//     }

//     try {
//       await axios.post(
//         'http://localhost:3000/api/projects/create',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       alert('✅ Project added successfully!');
//       navigate('/projects');
//     } catch (error) {
//       console.error('❌ Error creating project:', error);
//       alert('Error creating project. Check console.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add New Project</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         ></textarea>
//         <input
//           type="date"
//           value={projectDate}
//           onChange={(e) => setProjectDate(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Service ID"
//           value={serviceId}
//           onChange={(e) => setServiceId(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setFiles(e.target.files)}
//           className="mb-4"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Project
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProject;

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
  const [services, setServices] = useState([]); // 🔹 Initialize services list

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

        {/* 🔹 Service Dropdown */}
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select a Service</option>
          {Array.isArray(services) &&
            services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
        </select>

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
