import React, { useEffect, useState } from "react";
import axios from "axios";
import newsapiLogo from "../assets/naLogo.png"

const NewsapiOrg = () => {

    const [error, setError] = useState(null);
    const [apiOrg, setApiOrg] = useState([]);

    useEffect(() => {
        getNewsapi();
    }, []);

    const getNewsapi = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=7b6497946143476c81a145410f49f1ce`
        try {
            const response = await axios.get(url);
            const data = response.data

            setApiOrg(data.articles)

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="news">
                <div className="place"></div>
                <div className="logoPlace">
                    <img src={newsapiLogo} alt="" className="logo" />
                </div>
                <div className="newsGrid">
                    {apiOrg.map((apio, id) => (
                        <div key={id} className="gridContent">
                            <h1>{apio.title}</h1>
                            <h2>{apio.description}</h2>
                            <p>{apio.content}</p>
                            {apio.urlToImage && (
                                <img src={apio.urlToImage} alt=" no picture" className="image" />
                            )}
                            <p>{apio.publishedAt.split('T')[0]}</p>
                            <p>Author {apio.author}</p>
                            <p>
                                <a href={apio.url} target="_blanc">{apio.source.name}</a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default NewsapiOrg;