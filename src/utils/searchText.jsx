import { createContext, useState, useContext, useEffect } from "react";
// Creating Custom Context of Searching a Text
const SearchTextContext = createContext();

export const SearchTextProvider = ({children}) => {
    const [searchText, setSearchText] = useState("");

    return (
        <SearchTextContext.Provider value={{ searchText, setSearchText }}>
            { children }
        </SearchTextContext.Provider>
    );
};

export const useSearchText = () => useContext(SearchTextContext)
