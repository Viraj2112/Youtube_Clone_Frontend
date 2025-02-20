import FilterButtons from "./FilterButtons.jsx";
import Video from "./Video.jsx";
import { useSidebar } from "../utils/sidebarContext.jsx";
import { useSignIn } from "../utils/userSignedIn.jsx";

function YoutubeThumbnail() {
    const { isExpanded } = useSidebar();
    const { signIn } = useSignIn();
    
    return (
        <>
            {/* If Signed show the following */}
            {signIn ? (
                <div 
                className={`h-[calc(100vh-6rem)] w-full overflow-scroll md:h-auto md:overflow-y-auto md:mt-32 transition-all duration-300 ${isExpanded ? 'md:ml-60 md:w-[calc(100vw-15rem)]' : 'md:ml-20 md:w-[calc(100vw-6rem)]'}`}
            >
                {/* Filter Buttons */}
                <FilterButtons />

                {/* Youtube Videos Grid */}
                <div className={`grid grid-cols-1 gap-y-5 ${ isExpanded ? 'md:grid-cols-2 md:px-1 lg:grid-cols-3 xl:grid-cols-3' : 'md:grid-cols-2 md:px-4 lg:grid-cols-3 xl:grid-cols-4' }`}>
                    <Video />
                </div>
            </div>
            ) : (
                // Not Signed In
                <div className="w-full h-[calc(100vh-6rem)] flex justify-center items-center text-3xl text-red-500">Please Sign in</div>
            )}
        </>
    );
}

export default YoutubeThumbnail;