import React, { useEffect, useState } from "react";
import axios from "axios";
import currents from "../assets/currents.png"

const CurrentsResult = (props) => {

    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);

    const search = props.search

    useEffect(() => {
        getGNews(search);
    }, [search]);

    const getGNews = async (search) => {
        var url = `https://api.currentsapi.services/v1/search?keywords=${search}&language=en&apiKey=EmBgxNlNZYu52U0GH9uV35B2xcPZq3gCTBHYzIxy1Bce5Sot`;

        try {
            const response = await axios.get(url);
            const data = response
            setNews(data.data.news)

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="news">
                <div className="place"></div>
                <div className="logoPlace">
                    <img src={currents} alt="" className="logo" />
                </div>
                <div className="newsGrid">
                    {news.map((gn, id) => (
                        <div key={id} className="gridContent">
                            <h1>{gn.title}</h1>
                            <h2>{gn.description}</h2>
                            {gn.image && (
                                <img src={gn.image} alt=" no picture" className="image" />
                            )}
                            <p>{gn.published.split('+')[0]}</p>
                            {gn.author && (
                                <p>Author: {gn.author}</p>
                            )}
                            <p>
                                <a href={gn.url} target="_blanc">more...</a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default CurrentsResult;