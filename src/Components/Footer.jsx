import { Link } from "react-router-dom";

function Footer() {
    // Following Footer Section is only for Mobile View
    const mobileButtons = ['Home', 'Shorts', 'Subscriptions', 'Profile']
    return (
        <>
            <div className="bg-white border-t-2 border-t-gray-300 flex justify-evenly items-center h-12 md:hidden">
                {/* Home, Shorts, Subscriptions and Profile Buttons */}
                {mobileButtons.map((button, index) => {
                    return (
                        <Link key={index} to={`${ button=='Home' ? '/' : `/${button.toLowerCase()}` }`} className="flex flex-col items-center">
                            <img className="w-6 h-6" 
                            src={`/images/${button}.png`} 
                            alt={`${button} button`}/>
                            <p className="text-xs">{button=='Profile' ? 'You' : button}</p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Footer;