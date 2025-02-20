import { useEffect, useState } from "react";
import { useSidebar } from "../utils/sidebarContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import SignInButton from "./SignInButton.jsx";
import { useRef } from "react";
import { useSearchText } from "../utils/searchText.jsx";
import { useSignIn } from "../utils/userSignedIn.jsx";
import { checkUserChannel } from "../utils/api.js";

function Header() {
    const navigate = useNavigate();
    const [searchFocus, setSearchFocus] = useState(false);
    const { setIsExpanded } = useSidebar();
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null); // Create a reference for the input field
    // For Mobile Search Functionality
    const [searchActive, setSearchActive] = useState(false);
    const { setSearchText } = useSearchText();
    const [hasChannel, setHasChannel] = useState(false);
    const { user, signIn } = useSignIn();

    // Search function
    const Search = () => {
        console.log(inputValue);
        setSearchText(inputValue);
        setInputValue("");
    }

    // Handle input change
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    // Clear input field
    const clearInput = () => {
      setInputValue("");
      inputRef.current.focus(); // Refocus the input field
    };

    // Back Button for Mobile View
    function backButton() {
        setSearchActive(prev => !prev)
    }

    useEffect(() => {
        // Check if User has a channel
        checkUserChannel(user, setHasChannel);
    }, [user]);

    
    
    return (
        <>
            {/* Navigation Bar */}
            <nav className={`py-2 px-3 flex justify-between items-center md:fixed md:top-0 md:left-0 w-full md:z-10 bg-white `}>
                {/* Left Section: Burger Button and YouTube Logo */}
                <div className="flex gap-4 items-center">
                    {/* Burger Button */}
                    <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 transition-all duration-100 active:scale-95"
                        type="button"
                    >
                    <img
                        className="w-6 h-6 object-contain"
                        src="/images/burger-bar.png"
                        alt="Menu"
                    />
                    </button>

                    {/* Mobile Back Button */}
                    {searchActive && (
                        <div className="flex gap-2 md:hidden h-8 w-[calc(100vw-6rem)] mx-4 ">

                            <button className=" rounded-full shadow-md" onClick={backButton}>
                                <img className="w-8 h-8 rounded-full" src="/images/less-icon.png" alt="back-button" />
                            </button>
                            {/* Mobile Search Section */}
                            <div className="flex w-full items-center border border-slate-400 rounded-full overflow-hidden transition-all duration-300 ease-in-out">
                                {/* Search Icon (Visible on Focus) */}
                                <div className={`pl-4 ${searchFocus ? 'block' : 'hidden'}`}>
                                    <img
                                    className="w-4 h-4 object-contain"
                                    src="/images/search-icon.png"
                                    alt="Search"
                                    />
                                </div>

                                {/* Input Field */}
                                <input
                                    value={inputValue}
                                    ref={inputRef}
                                    onChange={handleInputChange}
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setSearchFocus(false)}
                                    className="w-full py-2 px-4 text-slate-900 focus:outline-none"
                                    type="text"
                                    placeholder="Search"
                                />

                                {/* Clear Input Button */}
                                {inputValue && (
                                    <button
                                    onClick={clearInput}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                    <img
                                        className="w-4 h-4 object-contain"
                                        src="/images/close-icon.png"
                                        alt="Clear"
                                    />
                                    </button>
                                )}

                                {/* Search Button */}
                                <button
                                    onClick={Search}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                                    type="button"
                                >
                                    <img
                                    className="w-4 h-4 object-contain"
                                    src="/images/search-icon.png"
                                    alt="Search"
                                    />
                                </button>
                        </div>

                        
                    </div>
                    )}
                

                    {/* YouTube Logo */}
                    {!searchActive && (
                        <button 
                            onClick={() => {
                                setSearchText("");
                                navigate('/');
                            }} 
                            className={`items-center md:flex hover:cursor-pointer flex`}>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/images/Youtube-Symbol.png"
                                alt="YouTube Logo"
                            />
                            <div className="flex items-center -ml-2">
                                <h1 className="font-bold text-2xl transform scale-x-75">YouTube</h1>
                                <span className="-ml-2 text-xs text-slate-500 self-start">IN</span>
                            </div>
                        </button>
                    )}
                </div>

                {/* Middle Section: Search Bar Web view */}
                <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
                    <div className="relative flex items-center w-full border border-slate-400 rounded-full overflow-hidden transition-all duration-300 ease-in-out">
                        {/* Search Icon (Visible on Focus) */}
                        <div className={`pl-4 ${searchFocus ? 'block' : 'hidden'}`}>
                            <img
                            className="w-4 h-4 object-contain"
                            src="/images/search-icon.png"
                            alt="Search"
                            />
                        </div>

                        {/* Input Field */}
                        <input
                            value={inputValue}
                            ref={inputRef}
                            onChange={handleInputChange}
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => setSearchFocus(false)}
                            className="w-full py-2 px-4 text-slate-900 focus:outline-none"
                            type="text"
                            placeholder="Search"
                        />

                        {/* Clear Input Button */}
                        {inputValue && (
                            <button
                            onClick={clearInput}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            >
                            <img
                                className="w-4 h-4 object-contain"
                                src="/images/close-icon.png"
                                alt="Clear"
                            />
                            </button>
                        )}

                        {/* Search Button */}
                        <button
                            onClick={Search}
                            className="p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                            type="button"
                        >
                            <img
                            className="w-4 h-4 object-contain"
                            src="/images/search-icon.png"
                            alt="Search"
                            />
                        </button>
                    </div>
                </div>


                {/* Right Section: Sign In and Mobile Search Button */}
                <div className="flex items-center gap-4 ">
                    
                    {/* Create Channel Link */}
                    { signIn && (!hasChannel && (<Link to='/create-channel' className="text-blue-600">Create Your Channel</Link>)) }
                    

                    {/* Sign In Button */}
                    <SignInButton />

                    {/* Mobile Search Button */}
                    {!searchActive && (
                        <button
                        onClick={() => setSearchActive(prev => !prev)}
                        className='md:hidden p-2 hover:bg-gray-100 rounded-full focus:outline-none'
                        type="button"
                        >
                        <img
                            className="w-4 h-4 object-contain"
                            src="/images/search-icon.png"
                            alt="Search"
                        />
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Header;