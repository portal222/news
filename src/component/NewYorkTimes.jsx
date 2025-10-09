import React, { useEffect, useState } from "react";
import axios from "axios";

const NewYorkTimes = () => {

    const [error, setError] = useState(null);
    const [nyTimes, setNyTimes] = useState([]);

    useEffect(() => {
        getNewsapi();
    }, []);

    const getNewsapi = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new york&page=1&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        try {
            const response = await axios.get(url);
            const data = response
            setNyTimes(data.data.response.docs);

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="news">
                <div className="place"></div>
                <div className="holdSelect">
                    <p className="times">The New York Times </p>
                </div>
                <div className="newsGrid">
                    {nyTimes.map((times, id) => (
                        <div key={id} className="gridContent">
                            <h1>{times.headline.main}</h1>
                            <h2>{times.abstract}</h2>
                            <p>{times.multimedia.caption}</p>
                            {times.multimedia.default.url && (
                                <img src={times.multimedia.default.url} alt=" no picture" className="image" />
                            )}
                            <p>{times.pub_date.split('T')[0]}</p>
                            <p>Author {times.byline.original}</p>
                            <p>
                                <a href={times.web_url} target="_blanc">New York Times</a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default NewYorkTimes;