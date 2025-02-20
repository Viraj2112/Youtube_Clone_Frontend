import dummyButtons from "../utils/dummyButtonsData.js";
import { useSidebar } from "../utils/sidebarContext.jsx";
import { useRef } from "react";
import { useSearchText } from "../utils/searchText.jsx";

function FilterButtons() {

    const { isExpanded } = useSidebar();
    const scrollContainerRef = useRef(null);
    const { setSearchText } = useSearchText();
    const handleFilter = (btnName) => {
        btnName==="All" ? setSearchText("") : setSearchText(btnName);
    }

    // Scroll right by 150px
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
        }
    };

    // Scroll left by 150px
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
        }
    };
    
    return (
        <>
           <div className="relative mb-7 px-1 py-2 flex items-center bg-white md:fixed md:top-16 ">

                {/* Scroll Button */}

                <button
                    onClick={scrollLeft}
                    className="hidden md:block  w-10 h-10 p-1 bg-gray-100 rounded-full shadow hover:bg-gray-300 transition-all"
                >
                    <img src="/images/less-icon.png" alt="" />
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    className={`flex gap-5 overflow-x-auto scrollbar-hide flex-nowrap ${isExpanded ? 'md:w-[calc(100vw-22rem)]' : 'md:w-[calc(100vw-12rem)]'} px-2`}
                >
                    {/* Filter Buttons */}
                    {dummyButtons.map((button, index) => (
                    <button
                        onClick={() => handleFilter(button)}
                        key={index}
                        className="text-lg px-2 rounded-md bg-gray-100 shadow-sm flex items-center justify-center whitespace-nowrap"
                    >
                        <p className="text-sm md:text-base">{button}</p>
                    </button>
                    ))}
                </div>

                {/* Scroll Button */}
                <button
                    onClick={scrollRight}
                    className="hidden md:block w-10 h-10 bg-gray-100 rounded-full shadow hover:bg-gray-300 transition-all"
                >
                    <img src="/images/greater-icon.png" alt="" />
                </button>
            </div>

        </>
    );
}

export default FilterButtons;