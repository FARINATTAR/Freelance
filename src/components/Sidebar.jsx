import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/profile">👤 Profile</Link>
        <Link to="/chat">💬 Chat</Link>
        <Link to="/services">🛠️ Services</Link>
        <Link to="/projects">📁 Projects</Link>
        <button
          onClick={handleLogout}
          className="mt-6 text-red-600 hover:underline text-left"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
