import React, { useEffect, useState } from "react";
import axios from "axios";
import gnewsLogo from "../assets/Gnews.png";

const GNewsResult = (props) => {

    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);
    const [gnews, setGnews] = useState([]);
    const [gpage, setGpage] = useState(1);
    const [totalGnews, setTotalGnews] = useState(0);

    const search = props.search

    useEffect(() => {
        getGNews(search, gpage);
    }, [search, gpage]);

    const getGNews = async (search, gpage) => {
        const url = `https://gnews.io/api/v4/search?q=${search}&lang=en&page=${gpage}&apikey=7aaab2d977061a3e92aab036882182d7`

        try {
            const response = await axios.get(url);
            const data = response
            setGnews(data.data.articles);
            setTotalGnews(data.data.totalArticles);
            setArticles(data.data);

        } catch (err) {
            setError(err);
        }
    }

    const totalGpages = Math.ceil(totalGnews / 10);

    return (
        <>
            <div className="news">
                <div className="top1" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={gnewsLogo} alt="" className="gnlogo" />
                    <h4> {totalGnews} results for {search} page {gpage}</h4>
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
                {articles?.articlesRemovedFromResponse?.historicalArticles?.message && (
                    <div className="holdSelect">
                        <h4>{articles?.articlesRemovedFromResponse?.historicalArticles?.message.split('Upgrade')[0]}</h4>
                    </div>
                )}
                <div className="artNum">
                    {Array.from({ length: totalGpages }, (_, i) => (
                        <div className={gpage === i + 1 ? 'numbAct' : 'numb'}
                            key={i + 1}
                            onClick={() => {
                                setGpage(i + 1);
                                document.querySelector('.top1').scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={i + 1 === gpage}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default GNewsResult;