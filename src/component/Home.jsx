import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import NewsapiOrg from "./NewsapiOrg";
import NewYorkTimes from "./NewYorkTimes";
import GuardianHome from "./GuardianHome";
import gnewsLogo from "../assets/gnewsLogo.svg"

const Home = () => {

    const [error, setError] = useState(null);

    const [gnews, setGnews] = useState([]);
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();





    useEffect(() => {
        axios.get(`./categories.json`).then(res => {
            const data = res.data;

            setCategory(data)

        })
    }, []);


    useEffect(() => {

        getGNews();
    }, []);



    const getGNews = async () => {

        const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=7aaab2d977061a3e92aab036882182d7`
        try {
            const response = await axios.get(url);
            const data = response
            setGnews(data.data.articles);

            console.log("GN news podaci tehnologija", data.data);
        } catch (err) {
            setError(err);
        }
    }

    const handleOption = (event) => {
        const LinkTo = `/option/${event.target.value}`;
        navigate(LinkTo);
    }


    const selectRef0 = useRef(null);
    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);

   const scrollToSelect0 = () => {
        selectRef0.current?.scrollIntoView({ behavior: "smooth" });
    };
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
                    <button onClick={scrollToSelect0}>Newsapi org</button>
                    <button onClick={scrollToSelect}>GNews</button>
                    <button onClick={scrollToSelect2}>The New York Times</button>
                    <button onClick={scrollToSelect3}>The Guardian</button>
                </div>

            </div>
            <div ref={selectRef0}></div>

            <NewsapiOrg />
            <div className="news" ref={selectRef}>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={gnewsLogo} alt="" className="gnlogo" />

                    <div>

                        <select onChange={handleOption} className="select">
                            <option value="" disabled>choose category</option>
                            {category.map((categ, id) => (
                                <option key={id} value={categ.title} className="option">
                                    {categ.title}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="newsGrid">

                    {gnews.map((gn, id) => (
                        <div key={id} className="gridContent">

                            <h1>{gn.title}</h1>
                            <p>{gn.content}</p>
                            {gn.image && (
                                <img src={gn.image} alt="no picture" className="image" />
                            )}
                            <p>{gn.publishedAt.split('T')[0]}</p>
                            <p>
                                <a href={gn.url} target="_blanc">{gn.source.name + " "}</a>
                                {" " + gn.source.country}
                            </p>


                        </div>

                    ))}
                </div>

            </div>
            <div ref={selectRef2}></div>
            <NewYorkTimes />
            <div ref={selectRef3}></div>
            <GuardianHome />



        </>
    )

}
export default Home;