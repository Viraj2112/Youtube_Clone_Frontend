import { useSidebar } from "../utils/sidebarContext";
import { useSignIn } from "../utils/userSignedIn.jsx"; 
import { fetchVideosData, fetchVideos } from "../utils/api.js";
import { useEffect, useState } from "react";
import Video from "./Video.jsx";
import { Link } from "react-router-dom";
import ShowVideos from "./ShowVideos.jsx";

function Channel() {

    const buttonSet1 = ['Customize channel', 'Manage videos'];      //Dummy Buttons
    const { isExpanded } = useSidebar();            //importing isExpanded state from custom created context.
    const { user } = useSignIn();                   //Importing the details of the user signed in from the custom created context.
    const [filteredVideos, setFilteredVideos] = useState([]);
    const userToken = localStorage.getItem('token');        //Getting hold of the jwt stored in the localStorage
    const [videos, setVideos] = useState([]);
    const [channel, setChannel] = useState({});

    useEffect(() => {
        // Fetch all the videos Uploaded by the user on a Specific Channel
        fetchVideos(user, setVideos, setChannel);
    }, [user]);

    return (
        <>
            <div className={`w-screen h-[calc(100vh-6rem)] overflow-y-scroll md:absolute md:top-20 ${ isExpanded ? 'md:pl-64' : 'md:pl-24'} transform ease-in-out duration-300`} >
                <div className=" p-4 flex flex-col w-full h-full">
                    
                    {/* Heading Div */}
                    <div className="flex gap-3">

                        {/* Image */}
                        <img 
                            className="w-16 h-16 md:w-40 md:h-40 rounded-full" 
                            src="/images/Profile.png" 
                            alt="profile-picture" 
                        />
                       
                        {/* Name and UserName and View Channel Link */}
                        <div className="flex flex-col md:gap-2 justify-center font-light">
                            <h1 className="text-2xl md:text-4xl font-bold">{ user?.username }</h1>
                            <div className="text-sm flex flex-col gap-1 md:gap-2">
                                <span>{ channel?.channelName }</span>
                                <span>{ channel?.subscribers } Subscribers</span>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="mt-7 font-bold md:text-3xl">Videos</h1>
                    
                    {/* Show the Videos Uploaded on the Channel */}
                    <div className={`grid grid-cols-1 gap-y-5 ${ isExpanded ? 'md:grid-cols-2 md:px-1 lg:grid-cols-3 xl:grid-cols-3' : 'md:grid-cols-2 md:px-4 lg:grid-cols-3 xl:grid-cols-4' }`}>
                        { videos.map(video => {
                            return (<ShowVideos key={video?._id} video={video} setVideos={setVideos}/>);
                        }) }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Channel;