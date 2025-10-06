import axios from "axios";
import React, { useRef, useContext, useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useNavigate } from "react-router-dom";
import NewsapiOrgResult from "./NewsapiOrgResult";
import GNewsResult from "./GNewsResult";
import NewYorkTimesResult from "./NewYorkTimesResult";
import guLogo from "../assets/guardianLogo.png"





const Guardian = () => {

    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalNews, setTotalNews] = useState(0);
    const [news, setNews] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue

    useEffect(() => {
        getNews(searchStringValue, page);
    }, [searchStringValue, page]);

    const getNews = async (searchStringValue, page) => {

        const url = ` https://content.guardianapis.com/search?page=${page}&q=${searchStringValue}&pageSize=12&api-key=e33e0d13-595a-4688-a23c-f17a1f0a7235`
        try {
            const response = await axios.get(url);
            const data = response.data.response

            setTotalNews(data.total);
            setNews(data.results);

            console.log("news podaci", data);
        } catch (err) {
            setError(err);
        }
    }



    const totalPages = Math.ceil(totalNews / 12);

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

            <NewsapiOrgResult search={searchStringValue} />
            <div ref={selectRef}></div>

            <GNewsResult search={searchStringValue} />
            <div ref={selectRef2}></div>

            <NewYorkTimesResult search={searchStringValue} />
            <div ref={selectRef3}></div>

            <div className="news">
                <div className="top3" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={guLogo} alt="" className="gnlogo" />

                    <h4> {totalNews} results for {searchStringValue} page {page}</h4>

                </div>

                <div className="guardianGrid">
                    {news.map((gu, id) => (
                        <div key={id} className="guContent">
                            <h2>{gu.pillarName + " " + gu.sectionName}</h2>
                            <h1>{gu.webTitle}</h1>
                            <p>{gu.webPublicationDate.split('T')[0]}</p>
                            <a href={gu.webUrl} target="_blanc">The Guardian</a>
                        </div>
                    ))}
                </div>

                <div className="artNum">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <div className={page === i + 1 ? 'numbAct' : 'numb'}
                            key={i + 1}
                            onClick={() => {
                                setPage(i + 1);
                                document.querySelector('.top3').scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={i + 1 === page}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}
export default Guardian;