import React, { useEffect, useState } from "react";
import axios from "axios";
import newsapiLogo from "../assets/naLogo.png"


const NewsapiOrgResult = (props) => {

    const [error, setError] = useState(null);
    const [apiOrg, setApiOrg] = useState([]);
    const [page, setPage] = useState(1);
    const [totalNews, setTotalNews] = useState(0);

    const search = props.search

    useEffect(() => {
        getNewsapi(search, page);

    }, [search, page]);

    const getNewsapi = async (search, page) => {

        const url = `https://newsapi.org/v2/everything?q=${search}&page=${page}&pageSize=12&language=en&apiKey=7b6497946143476c81a145410f49f1ce`
        try {
            const response = await axios.get(url);
            const data = response.data

            setApiOrg(data.articles)
            setTotalNews(data.totalResults)

            console.log("pretraga newsAPI sajta", data);
        } catch (err) {
            setError(err);
        }
    }

    const totalPages = Math.ceil(totalNews / 12);

    return (
        <>
            <div className="news">
                <div className="top" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={newsapiLogo} alt="" className="gnlogo" />

                    <h4> {totalNews} results for {search} page {page}</h4>

                </div>

                <div className="newsGrid">
                    {apiOrg.map((apio, id) => (
                        <div key={id} className="gridContent">
                            <h1>{apio.title}</h1>
                            <h2>{apio.description}</h2>
                            <p>{apio.content}</p>
                            {apio.urlToImage && (
                                <img src={apio.urlToImage} alt="no picture" className="image" />
                            )}
                            <p>{apio.publishedAt.split('T')[0]}</p>
                            {apio.author && (
                                <p>Author {apio.author}</p>
                            )}
                            <p>
                                <a href={apio.url} target="_blanc">{apio.source.name}</a>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="artNum">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <div className={page === i + 1 ? 'numbAct' : 'numb'}
                            key={i + 1}
                            onClick={() => {
                                setPage(i + 1);
                                document.querySelector('.top').scrollIntoView({ behavior: 'smooth' });
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
export default NewsapiOrgResult;