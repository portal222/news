import axios from "axios";
import React, { useEffect, useState } from "react";
import guLogo from "../assets/guardianLogo.png"

const GuardianHome = () => {

    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {

        const url = ` https://content.guardianapis.com/search?page=1&q=London&pageSize=12&api-key=e33e0d13-595a-4688-a23c-f17a1f0a7235`
        try {
            const response = await axios.get(url);
            const data = response.data.response

            setNews(data.results);

            console.log("guardian podaci", data);
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="news">
                <div className="place"></div>
                <div className="logoPlace">
                    <img src={guLogo} alt="" className="logo" />
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
            </div>
        </>
    )

}
export default GuardianHome;