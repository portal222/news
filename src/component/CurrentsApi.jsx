import React, { useEffect, useState } from "react";
import axios from "axios";
import currents from "../../public/assets/currents.png"

const CurrentsApi = () => {

    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {
        getGNews();
    }, []);

    const getGNews = async () => {
        var url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=EmBgxNlNZYu52U0GH9uV35B2xcPZq3gCTBHYzIxy1Bce5Sot`;

        try {
            const response = await axios.get(url);
            const data = response
            setNews(data.data.news)
            console.log("currents pocetak", data);

        } catch (err) {
            if (err.response && err.response.status === 429) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError('An error occurred while loading the news.');
            }
        }
    }

    return (
        <>
            <div className="news">
                <div className="place"></div>
                <div className="logoPlace">
                    <img src={currents} alt="" className="logo" />
                </div>

                {error ? (
                    <div className="holdSelect">
                        <h4>{error}</h4>
                    </div>
                ) : (
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

                )
                };
            </div>
        </>
    )
}
export default CurrentsApi;