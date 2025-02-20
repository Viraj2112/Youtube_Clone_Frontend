import { useSidebar } from "../utils/sidebarContext.jsx";
import { Link } from "react-router-dom";
import { useSignIn } from "../utils/userSignedIn.jsx";
import { useLocation, matchPath } from "react-router-dom";

function OptionBar() {

  const { isExpanded, setIsExpanded } = useSidebar();
  const buttons = ['Home', 'Shorts', 'Subscriptions', 'Profile', 'History'];
  const extraButtons = ['Trending', 'Shopping', 'Music', 'Movies', 'Live', 'Gaming', 'News', 'Sports', 'Courses', 'Fashion_Beauty', 'Podcasts']
  const { signIn} = useSignIn();
  const location = useLocation();
  const isWatchPage = matchPath('/watch', location.pathname);

  function handleClick() {
    setIsExpanded(prev => !prev);
  }

  return (
  <>
    {/* Here below we have used the custom height i.e h-[calc(100vh-4rem)] for our option Bar. */}
    <div 
      className={`hidden z-10 fixed my-16 left-0 bg-white md:flex flex-col h-[calc(100vh-4rem)] 
        overflow-y-auto scrollbar-hide items-center transition-all duration-300 
        ${isExpanded ? 'w-60' : (isWatchPage ? 'w-20 gap-2' : 'w-0')}`}
      >
          
      {/* Main Buttons */}
      {buttons
        .filter((button) => !(signIn && button === "Profile")) // Exclude 'Profile' when signed in
        .map((button, index) => (
          <Link
            to={`/${button !== "Home" ? button.toLowerCase() : ""}`}
            onClick={handleClick}
            key={index}
            className={`${isExpanded ? "expanded-side-bar" : "minimised-side-bar"} 
                        ${button === "Home" && isExpanded ? "bg-gray-100" : ""}`}
          >
            <img className="mx-6 w-7 h-7" src={`/images/${button}.png`} alt={`${button} button`} />
            <p className={`${isExpanded ? "py-1" : "text-xs mx-auto"}`}>{button === "Profile" ? "You" : button}</p>
          </Link>
        ))}

      {/* Sign In Section */}
      {isExpanded && !signIn && (
        <div className="pl-6 py-5 border-t border-t-gray-200">
          <p>Sign in to like videos, comment, and subscribe.</p>
          <Link
            to="/login"
            className="my-2 w-28 flex gap-2 items-center border border-slate-300 inset-shadow-xs rounded-full px-3 py-1.5 
                        hover:cursor-pointer hover:bg-blue-100"
          >
            <img className="w-5 max-w-full max-h-full object-contain" src="/images/Profile.png" alt="profile-icon" />
            <p className="text-blue-600 text-sm font-semibold">Sign in</p>
          </Link>
        </div>
      )}

      {/* Explore Section */}
      {isExpanded && (
        <>
          <div className="px-6 pt-4 text-lg font-semibold border-t border-t-gray-200 w-full">Explore</div>
          {extraButtons.map((button, index) => (
            <Link to='/invalid_page' key={index} className="expanded-side-bar">
              <img className="mx-6 w-7 h-7" src={`/images/${button}.png`} alt={`${button} button`} />
              <p className="py-1">{button}</p>
            </Link>
          ))}
        </>
      )}
    </div>
  </>
  );
}

export default OptionBar;