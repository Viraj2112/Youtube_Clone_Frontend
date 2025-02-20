import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../utils/sidebarContext.jsx";
import { deleteVideo } from "../utils/api.js";

function ShowVideos({ video, setVideos }) {
    
    const { isExpanded } = useSidebar();
    const location = useLocation();
    const isWatchPage = location.pathname.startsWith("/watch/");
    const isChannelPage = location.pathname === "/channel";


    return (
        <>
            <div className={`${ isChannelPage ? 'flex flex-col justify-between items-center' : '' }`}>
                <Link
                    key={video._id}
                    to={`/watch/${video._id}`}
                    className={`block mx-auto ${
                        isWatchPage ? "flex flex-row" : isExpanded ? "sm:w-80 md:w-64 xl:w-96" : "sm:w-80 md:w-72"
                    }`}
                >
                    {/* Video Thumbnail */}
                    <div className={`overflow-hidden ${isWatchPage ? "w-36 sm:w-52 md:w-80 md:h-48" : "h-auto xl:rounded-xl"}`}>
                        <img className="w-full h-auto object-cover" src={video.thumbnailUrl} alt="thumbnail" />
                    </div>

                    {/* Video Info */}
                    <div className="py-3 flex gap-3">
                        {/* Channel Profile (Only visible outside watch page) */}
                        {!isWatchPage && <div className="w-6 h-6 md:w-10 md:h-10 border rounded-full flex-shrink-0"></div>}

                        {/* Description */}
                        <div className="flex-1">
                            <h1 className="text-sm sm:text-base font-semibold line-clamp-2">{video.title}</h1>
                            {!isWatchPage && <h2 className="text-xs sm:text-sm text-gray-600">{video.channelId}</h2>}

                            <div className="flex gap-2 text-xs sm:text-sm text-gray-500">
                                <p>{video.views} views</p>
                                <span>•</span>
                                <p>{ video.uploadDate.split("T")[0] }</p>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Delete button (Only visible on the channel page) */}
                {isChannelPage && (
                    <button onClick={() => deleteVideo(video._id, setVideos)} className="w-fit text-red-500 hover:cursor-pointer">
                        Delete
                    </button>
                )}
            </div>
            
        </>
    );
}

export default ShowVideos;