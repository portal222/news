import axios from "axios";
import React, { useEffect, useState } from "react";
import guLogo from "../../public/assets/guardianLogo.png"

const GuardianHome = () => {

    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {

        const url = ` https://content.guardianapis.com/search?page=1&q=London&pageSize=12&api-key=3a1c68d6-e496-40cc-ac56-7a3f15d42227`
        try {
            const response = await axios.get(url);
            const data = response.data.response

            setNews(data.results);

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