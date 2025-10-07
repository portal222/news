import { useRef } from "react";
import NewYorkTimes from "./NewYorkTimes";
import GuardianHome from "./GuardianHome";
import CurrentsApi from "./CurrentsApi";

const Home = () => {
  
    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);


    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect2 = () => {
        selectRef2.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect3 = () => {
        selectRef3.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="navigation" >
                <div className="quick" >
                    <button onClick={scrollToSelect}>Currents Api</button>
                    <button onClick={scrollToSelect2}>The New York Times</button>
                    <button onClick={scrollToSelect3}>The Guardian</button>
                </div>
            </div>
        
            <div ref={selectRef}></div>
            <CurrentsApi />
            <div ref={selectRef2}></div>
            <NewYorkTimes />
            <div ref={selectRef3}></div>
            <GuardianHome />
        </>
    )
}
export default Home;