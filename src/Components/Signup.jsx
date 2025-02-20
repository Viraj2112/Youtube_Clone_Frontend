import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to submit the form and register the user into our database
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setFormData({ username: '', email: '', password: '' });
      alert('Form Submitted Please Login.');
      navigate('/login');

    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="w-full flex justify-center h-[calc(100vh-6rem)] md:mt-24 md:pb-96 ">
      <div className="bg-gray-800 p-8 md:rounded-xl shadow-lg w-full md:max-w-md md:h-fit">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-gray-400 text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link to='/login' className="text-red-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
