import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../utils/sidebarContext";
import { useSignIn } from "../utils/userSignedIn.jsx";

function Profile() {
    const buttonSet1 = ['videos', 'downloads', 'badges'];
    const buttonSet2 = ['Switch Account','Google Account', 'Turn on Incognito', 'Share Channel'];
    const { isExpanded } = useSidebar();
    const { logout } = useSignIn();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <div className={`w-screen h-[calc(100vh-6rem)] md:absolute md:top-20 ${ isExpanded ? 'md:pl-60' : 'md:pl-24'} transform ease-in-out duration-300`}>
                <div className=" p-4 flex flex-col w-full h-full overflow-y-scroll">
                    
                    {/* Heading Div */}
                    <div className="w-full h-fit flex gap-3">

                        {/* Image */}
                        <img className="w-16 h-16 md:w-32 md:h-32 rounded-full" src="/images/profile-picture.jpg" alt="profile-picture" />
                        
                        {/* Name and UserName and View Channel Link */}
                        <div className="flex flex-col justify-center font-light md:gap-1">
                            <h1 className="text-2xl md:text-4xl font-bold">Viraj Nagarkar</h1>
                            <div className="text-sm md:text-base flex flex-wrap gap-2">
                                <span>@virajnagarkar4177</span>
                                <span>•</span>
                                <Link 
                                    to='/channel' 
                                    className="text-nowrap text-blue-600 md:hidden">
                                View Channel &gt;
                                </Link>
                            </div>

                            {/* Some Buttons in horizontal for Web View */}
                            <div className="hidden md:flex flex-wrap gap-2 py-2">
                                {buttonSet2.map(button => {
                                    return (
                                        <p className="text-nowrap text-sm rounded-2xl px-3 py-1 font-semibold bg-gray-200">{button}</p>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Some Buttons in horizontal for Mobile View*/}
                    <div className="flex gap-2 py-2 overflow-x-auto md:hidden">
                        {buttonSet2.map(button => {
                            return (
                                <p className="text-nowrap text-sm rounded-2xl px-3 font-semibold bg-gray-200">{button}</p>
                            );
                        })}
                    </div>
                    
                    {/* Vertical Buttons */}
                    <div className="pt-5 flex flex-col gap-3 py-2 md:hidden">
                        {/* Each button */}
                        {/* Videos, Downloads, Badges Button */}
                        {buttonSet1.map(button => {
                            return (
                                <div className="flex gap-3">
                                    <img className="w-7 h-7" src={`/images/${button}-icon.png`} alt="button" />
                                    <p className="my-auto capitalize">{button}</p>
                                </div>
                            );
                        })}
                        {/* Your movies button */}
                        <div className="flex gap-3 pt-3 border-t border-t-gray-300">
                            <img className="w-7 h-7" src='/images/Movies.png' alt="button" />
                            <p className="my-auto ">Your movies</p>
                        </div>
                        {/* Youtube Premium Button */}
                        <div className="flex gap-3">
                            <img className="w-6 h-4" src='/images/Youtube-Symbol.png' alt="button" />
                            <p className="my-auto">Get YouTube Premium</p>
                        </div>
                        {/* Time Watched Section */}
                        <div className="flex gap-3 pt-3 border-t border-t-gray-300">
                            <img className="w-7 h-7" src='/images/bar-graph.png' alt="button" />
                            <p className="my-auto">Time watched</p>
                        </div>
                        {/* Help and Feedback */}
                        <div className="flex gap-3">
                            <img className="w-7 h-7" src='/images/question.png' alt="button" />
                            <p className="my-auto ">Help and feedback</p>
                        </div>
                        {/* Logout button */}
                        <button onClick={handleLogout} className="flex gap-3 text-red-500 pl-10">
                            <p className="my-auto ">Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;