import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignIn } from "../utils/userSignedIn";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useSignIn();
    const navigate = useNavigate();

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Get hold of token and send to useSignIn()
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, password: password})
            })
            const data = await response.json();
            if(response.ok) {
                login(data.token); //Save token and update state
                navigate('/'); //Redirect to home page
            } else {
                alert(data.message); //handle errors
            }
        } catch (error) {
            console.log('Login failed', error);
        }
        setPassword("");        //Clearing the Password Input Section
    };



  return (
        <div className="w-full flex justify-center h-[calc(100vh-6rem)] md:pt-32 md:pb-96">
            <div className="bg-gray-800 p-8 md:rounded-xl shadow-lg w-full md:w-96 md:h-fit border">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                        type="email"
                        className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold transition"
                    >
                        Login
                    </button>
                </form>

                {/* Sign Up & Forgot Password Links */}
                <div className="mt-4 text-gray-400 text-sm text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to='/signup' className="text-red-400 hover:underline">
                        Sign Up
                        </Link>
                    </p>
                    <p>
                        <Link className="text-red-400 hover:underline">
                        Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
  );
};

export default Login;
