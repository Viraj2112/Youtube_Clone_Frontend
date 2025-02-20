import { useEffect, useMemo, useState } from "react";
import { useSidebar } from "../utils/sidebarContext.jsx";
import { Link } from "react-router-dom";
import { fetchVideosData } from "../utils/api.js";
import { useSearchText } from "../utils/searchText.jsx"
import ShowVideos from "./ShowVideos.jsx";

function Video() {
    const { isExpanded } = useSidebar();
    const [allVideos, setAllVideos] = useState([]); // Store all videos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { searchText } = useSearchText();

    // Retrieve the JWT token from localStorage or your context
    const jwtToken = localStorage?.getItem('token');

    // After the frontend loads get hold of all the videos.
    useEffect(() => {
        // Define an async function to call your fetch helper
        const getVideos = async () => {
        try {
            const data = await fetchVideosData(jwtToken);
            setAllVideos(data); // Store original video data

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        };

        getVideos();
    }, [jwtToken]);

    const filteredVideos = useMemo(() => {
        return searchText.trim() === ""
            ? allVideos
            : allVideos.filter(video => 
                video.title.toLowerCase().includes(searchText.trim().toLowerCase())
            );
    }, [searchText, allVideos]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <>  
        {/* Video Thumbnails */}
        { filteredVideos.length===0 
            ? <p>No Videos Found</p>
            : (
                filteredVideos?.map(video => {
                    return (<ShowVideos key={video._id} video={video} />);
                })
            ) 
        }

        </>
    );
}

export default Video;