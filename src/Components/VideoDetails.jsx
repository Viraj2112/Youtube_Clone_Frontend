import LikeDislikeSection from "./LikeDislikeSection";
import CommentsSection from "./CommentsSection";
import { useEffect, useState } from "react";
import { useSignIn } from "../utils/userSignedIn";

function VideoDetails({ video, openOptions, setOpenOptions }) {
    const { user } = useSignIn();
    const [channel, setChannel] = useState({});

    useEffect(() => {
        // Get hold of the channel
        const fetchChannel = async () => {
            if (!user?._id) return;         //Ensure User is Logged In
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/videos/by-user/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok) throw new Error("Failed to Fetch Videos");

                const data = await response.json();
                setChannel(data.channel);

            } catch (error) {
                console.log("Channel Data was not Fetched", error)
            }
        }

        fetchChannel();
    }, [video._id]);
    return (
        <div className="px-2 flex flex-col gap-2 lg:w-2xl smooth-transition">
            
            {/* Video Title & Description */}
            <h1 className="text-xl font-bold">{video.title}</h1>
            <p className="px-3 py-1 rounded-md text-sm bg-gray-200">{video.description}</p>
            <p className="text-end text-sm">{video.views} views</p>
            
            {/* Channel Details */}
            <div className="flex gap-3 items-center">
                <img className="w-10 h-10 rounded-full" src={video.thumbnailUrl} alt="Channel Logo" />
                <p className="font-semibold">{ channel?.channelName }</p>
            </div>

            {/* Like & Dislike Section */}
            <LikeDislikeSection video={video} />

            {/* Comments Section */}
            <CommentsSection video={video} openOptions={openOptions} setOpenOptions={setOpenOptions} />
        </div>
    );
}

export default VideoDetails;
