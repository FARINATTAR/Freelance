const Dashboard = () => {
  // dummy values — can be fetched from backend later
  const userName = "Farin";
  const totalServices = 3;
  const totalProjects = 5;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <p className="text-4xl mt-2">{totalServices}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <p className="text-4xl mt-2">{totalProjects}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Profile Status</h2>
          <p className="mt-2">Looks good 👍</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.href = "/profile"}
          >
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
