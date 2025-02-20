import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting
import { useSignIn } from "../utils/userSignedIn.jsx";

// Custom Form the Create a Channel
function ChannelForm() {
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelBanner, setChannelBanner] = useState("");
    const { user } = useSignIn();
    const navigate = useNavigate();

    // On Submit of the form register a channel into the database and navigate user to the channel
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?._id) {
            alert("You must be logged in to create a channel.");
            return;
        }

        const channelData = {
            channelName,
            ownerId: user._id, // Owner is the logged-in user
            description,
            channelBanner
        };
        // console.log('Channel Data: ', channelData)

        // Submit the form to the backend
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/createChannel`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(channelData)
            });

            if (!response.ok) {
                throw new Error("Failed to create channel");
            }

            const data = await response.json();
            alert("Channel created successfully!");
            navigate(`/channel`); // Redirect to channel page
        } catch (error) {
            console.error("Error creating channel:", error);
        }
    };

    return (
        <>
            {/* Custom Form */}
            <div className="w-full flex justify-center h-[calc(100vh-6rem)] md:pt-32 md:pb-96">
                <div className="bg-gray-800 p-8 md:rounded-xl shadow-lg w-full md:w-96 md:h-fit border text-white">
                    <h2 className="text-2xl font-bold mb-4">Create a Channel</h2>
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                        {/* Channel Name */}
                        <input
                            type="text"
                            placeholder="Channel Name"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                            required
                        />
                        {/* Channel Description */}
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                        />
                        {/* Channel Banner if Any */}
                        <input
                            type="text"
                            placeholder="Channel Banner URL"
                            value={channelBanner}
                            onChange={(e) => setChannelBanner(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                        />
                        {/* Submit Form Button */}
                        <button type="submit" className="w-full p-2 bg-red-500 rounded hover:bg-red-600">
                            Create Channel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChannelForm;