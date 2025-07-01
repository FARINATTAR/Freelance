// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TechDashboardHomepage from "./pages/Home";

// // Layout
// import MainLayout from "./layout/MainLayout";

// // Auth Pages
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// // Main Pages
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Chat from "./pages/Chat";

// // Service Pages
// import ServicesList from "./pages/Services/ServicesList";
// import AddService from "./pages/Services/AddService";
// import ServiceDetails from "./pages/Services/ServiceDetails";

// // Project Pages
// import ProjectsList from "./pages/Projects/ProjectsList";
// import ProjectDetails from "./pages/Projects/ProjectDetails";
// import AddProject from "./pages/Projects/AddProject";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public Home Page */}
//         <Route path="/" element={<TechDashboardHomepage />} />

//         {/* Auth Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Main Routes (Dashboard Section) */}
//         <Route path="/dashboard" element={<MainLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="chat" element={<Chat />} />

//           {/* Services */}
//           <Route path="services" element={<ServicesList />} />
//           <Route path="services/add" element={<AddService />} />
//           <Route path="services/:id" element={<ServiceDetails />} />

//           {/* Projects */}
//           <Route path="projects" element={<ProjectsList />} />
//           <Route path="projects/add" element={<AddProject />} />
//           <Route path="projects/:projectId" element={<ProjectDetails />} />
//           <Route path="projects/:id/portfolio" element={<AddProject />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TechDashboardHomepage from "./pages/Home";

// Layout
import MainLayout from "./layout/MainLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

// Service Pages
import ServicesList from "./pages/Services/ServicesList";
import AddService from "./pages/Services/AddService";
import ServiceDetails from "./pages/Services/ServiceDetails";

// Project Pages
import ProjectsList from "./pages/Projects/ProjectsList";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import AddProject from "./pages/Projects/AddProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Home Page */}
        <Route path="/" element={<TechDashboardHomepage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          {/* Dashboard Section */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />

          {/* Services Section */}
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services/:id" element={<ServiceDetails />} />

          {/* Projects Section */}
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:id/portfolio" element={<AddProject />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
