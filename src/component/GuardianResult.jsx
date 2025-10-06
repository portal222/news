import axios from "axios";
import React, { useEffect, useState } from "react";

import guLogo from "../assets/guardianLogo.png"


const GuardianResult = (props) => {

    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalNews, setTotalNews] = useState(0);
    const [news, setNews] = useState([]);

    const search = props.search


    useEffect(() => {
        getNews(search, page);
    }, [search, page]);

    const getNews = async (search, page) => {

        const url = ` https://content.guardianapis.com/search?page=${page}&q=${search}&pageSize=12&api-key=e33e0d13-595a-4688-a23c-f17a1f0a7235`
        try {
            const response = await axios.get(url);
            const data = response.data.response

            setTotalNews(data.total);
            setNews(data.results);

            console.log("guardian pretraga", data);
        } catch (err) {
            setError(err);
        }
    }

    const totalPages = Math.ceil(totalNews / 12);

    return (
        <>
            <div className="news">
                <div className="top3" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={guLogo} alt="" className="gnlogo" />

                    <h4> {totalNews} results for {search} page {page}</h4>

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
export default GuardianResult;