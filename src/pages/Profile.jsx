import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phone: "",
    profilePhoto: "",
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch current user profile
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { email, phone, name, profilePhoto } = res.data;
        setProfile({ email, phone, name, profilePhoto });
      })
      .catch(() => setMessage("Error fetching profile"));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setProfile({ ...profile, profilePhoto: file });
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phone", profile.phone);
    if (profile.profilePhoto instanceof File) {
      formData.append("profilePhoto", profile.profilePhoto);
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message || "Profile updated successfully");
    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email - readonly */}
        <input
          type="email"
          value={profile.email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Profile Photo */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {/* Preview Image */}
        {(preview || profile.profilePhoto) && (
          <img
            src={preview || profile.profilePhoto}
            alt="Profile Preview"
            className="h-24 w-24 rounded-full object-cover mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
