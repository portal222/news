import React, { useState } from "react";

const GlobalContext = React.createContext({
    searchStringValue: '',
    setSearchStringFn: () => {},
 
});

export const GlobalProvider = ({ children }) => {
    const [searchStringValue, setSearchStringFn] = useState('');
  
    return (
        <GlobalContext.Provider value={{
            searchStringValue,
            setSearchStringFn,
       
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;