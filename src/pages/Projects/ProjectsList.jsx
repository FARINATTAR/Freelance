// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ProjectsList = () => {
//   const [projects, setProjects] = useState([]);
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.userId;

//   useEffect(() => {
//     if (!userId) return;

//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}/projects/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProjects(res.data || []))
//       .catch((err) => console.error("❌ Failed to fetch projects:", err));
//   }, [userId]);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Your Projects</h2>
//         <Link
//           to="/projects/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add New
//         </Link>
//       </div>

//       {projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div key={project._id} className="bg-white p-4 rounded shadow">
//               <h3 className="text-xl font-semibold">{project.title}</h3>
//               <p className="text-gray-600 text-sm mt-1">{project.description}</p>
//               <p className="text-sm mt-2 font-mono">Tech: {project.techStack}</p>

//               <Link
//                 to={`/projects/${project._id}`}
//                 className="mt-4 inline-block text-blue-600 hover:underline text-sm"
//               >
//                 View / Edit
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectsList;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState({});
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // Fetch projects of current user
  useEffect(() => {
    if (!userId) return;

    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/projects/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProjects(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, [userId]);

  // Fetch all services (to get service name by ID)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`);
        const serviceMap = {};
        (res.data.services || []).forEach((s) => {
          serviceMap[s._id] = s.title;
        });
        setServices(serviceMap);
      } catch (err) {
        console.error("❌ Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <Link
          to="/projects/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{project.description}</p>

              <p className="text-sm text-gray-500 mt-2">
                Service:{" "}
                <span className="font-medium">
                  {services[project.serviceId] || "Unknown"}
                </span>
              </p>

              <p className="text-sm text-gray-500">Date: {project.projectDate?.slice(0, 10)}</p>

              <Link
                to={`/projects/${project._id}`}
                className="mt-4 inline-block text-blue-600 hover:underline text-sm"
              >
                View / Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
