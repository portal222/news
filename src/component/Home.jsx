import { useRef } from "react";
import NewYorkTimes from "./NewYorkTimes";
import GuardianHome from "./GuardianHome";
import CurrentsApi from "./CurrentsApi";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);

    const navigate = useNavigate();



    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect2 = () => {
        selectRef2.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect3 = () => {
        selectRef3.current?.scrollIntoView({ behavior: "smooth" });
    };

    const spaceClick = () => {
        const LinkTo = `space`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="navigation" >
                <div className="quick" >
                    <button onClick={scrollToSelect}>Currents Api</button>
                    <button onClick={scrollToSelect2}>New York Times</button>
                    <button onClick={scrollToSelect3}>Guardian</button>
                    <button onClick={() => {
                        spaceClick();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                        className="spaceButt">
                        SPACE
                    </button>
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