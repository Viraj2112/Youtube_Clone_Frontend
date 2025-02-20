import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSignIn } from "../utils/userSignedIn.jsx";

function FloatingTab(props) {

    const visibility = props.visibility;
    const setTab = props.setTab;
    const navigate = useNavigate();
    const tabRef = useRef(null);
    const { logout, user } = useSignIn();

    // Go to Channel Section Function
    function goToChannel() {
        setTab(prev => !prev);
        navigate('/channel');

    }

    // Logout Function
    const handleLogout = () => {
        logout();           //Created custom logout function using createcontext
        navigate('/login');
    }

    // Functionality for when the mouse is clicked outside of the Floating tab.
    useEffect(() => {
        function handleClickOutside(event) {
            if(tabRef.current && !tabRef.current.contains(event.target)) {
                setTab(false);
            }
        }

        if(visibility) document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [visibility, setTab]);

    return (
        <>
            { visibility && (
                <div ref={tabRef} 
                    className={`absolute top-3 right-20 z-20 w-80 bg-white shadow-2xl rounded-md`}>
                        {/* User Details */}
                    <div className="w-full p-5 flex gap-5">
                        <img className="w-10 h-10 rounded-full" src="/images/Profile.png" alt="Profile picture" />
                        <div className="flex flex-col">
                            <p>{ user?.username }</p>
                            <p>{ user?.email }</p>
                            {/* Go to Channel Button */}
                            <button type="button"
                                onClick={goToChannel}
                                className="text-start text-indigo-500 hover:text-indigo-700 hover:transition-all hover:duration-300 hover:scale-105 hover:cursor-pointer">
                            View your channel
                            </button>
                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="text-start text-red-500 hover:transition-all hover:duration-300 hover:scale-105 hover:cursor-pointer">
                            Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
}

export default FloatingTab;