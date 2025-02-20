import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useSidebar } from "../utils/sidebarContext.jsx";
import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";
import { useParams } from "react-router-dom";
import { fetchVideosData } from "../utils/api.js";              //Custom Function to Fetch video data using jwt token
import ShowVideos from "./ShowVideos.jsx";
import { useSignIn } from "../utils/userSignedIn.jsx";

function Watch() {
    const [showControls, setShowControls] = useState(false);
    const { signIn } = useSignIn();
    const videoRef = useRef(null);
    const { isExpanded } = useSidebar();
    const [openOptions, setOpenOptions] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const videoId = params.id;

    useEffect(() => {
        // Get all the videos from the database
        const getVideos = async () => {
            try {
                const jwtToken = localStorage.getItem('token');  // Fetch token inside useEffect
                const data = await fetchVideosData(jwtToken);
                setData(data);
                // console.log(data);
            } catch (err) {
                setError(err.message); // Store error message
            } finally {
                setLoading(false);
            }
        };
        getVideos();
        
    }, []);

    const video = useMemo(() => data.find(video => video._id === videoId), [data, videoId]);

    // Function to ensure video can play when tapped (Mobile Fix)
    const handleTouchStart = useCallback(() => {
        setShowControls(true);
        if (videoRef.current.paused) {
            videoRef.current.play().catch(error => console.log("Autoplay blocked:", error));
        }
    }, [videoRef]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <div 
                className={`h-[calc(100vh-6rem)] overflow-scroll md:h-auto w-full md:pt-20 ${isExpanded && 'blur-xs'} lg:flex lg:pl-40`}>
                {/* Video Player & Details */}
                <div>
                    { video ? (     //If video is Present
                            <>
                                <VideoPlayer video={video} setShowControls={setShowControls} handleTouchStart={handleTouchStart} />
                                <VideoDetails video={video} openOptions={openOptions} setOpenOptions={setOpenOptions} />
                            </>
                        ) : (           //If video not found
                            <div>Video Not Found</div>
                        )}
                </div>

                {/* Recommended Videos */}
                <div className="w-full flex flex-col lg:px-5">
                    { data.map(video => {
                        return (
                            <ShowVideos key={video._id} video={video}/>
                        );
                    }) }
                </div>
            </div>
        </>
    );
}

export default Watch;
