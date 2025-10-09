import React, { useRef, useContext } from "react";
import GlobalContext from "./GlobalContext";
import NewsapiOrgResult from "./NewsapiOrgResult";
import NewYorkTimesResult from "./NewYorkTimesResult";
import GuardianResult from "./GuardianResult";
import CurrentsResult from "./CurrentsResult";
import SpaceResult from "./space/SpaceResult";

const SearchResult = () => {

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue

    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);
    const selectRef4 = useRef(null);

 
    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect2 = () => {
        selectRef2.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect3 = () => {
        selectRef3.current?.scrollIntoView({ behavior: "smooth" });
    };
       const scrollToSelect4 = () => {
        selectRef4.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="navigation" >
                <div className="quick" >
                    <button onClick={scrollToSelect}>Currents api</button>
                    <button onClick={scrollToSelect2}>New York Times</button>
                    <button onClick={scrollToSelect3}>Guardian</button>
                    <button onClick={scrollToSelect4}>Space</button>
                </div>
            </div>

        
            <div ref={selectRef}></div>
            <CurrentsResult search={searchStringValue} />
            <div ref={selectRef2}></div>
            <NewYorkTimesResult search={searchStringValue} />
            <div ref={selectRef3}></div>
            <GuardianResult search={searchStringValue} />
             <div ref={selectRef4}></div>
            <SpaceResult search={searchStringValue} />

        </>
    )
}
export default SearchResult;