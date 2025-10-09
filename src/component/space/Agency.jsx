import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../Loader";

const Agency = () => {

    const [error, setError] = useState(null);
    const [space, setSpace] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const name = params.name;

    const location = useLocation();
    const image = location.state?.image;

    useEffect(() => {
        getSpace(page, name);
    }, [page, name]);

    const getSpace = async (page, name) => {

        const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${page}0&summary_contains=${name}`

        try {
            const response = await axios.get(url);
            const data = response

            setSpace(data.data.results);
            setTotal(data.data.count)
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const totalPagesSpace = Math.ceil(total / 10);

    if (isLoading) {
        return (
            <>
                <div className="news">
                    <div className="place"></div>
                </div>
                <Loader />
                <div className="news">
                    <div className="place"></div>
                    <div className="place"></div>
                    <div className="place"></div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="news">
                <div className="top5" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={image} alt="" className="gnlogo" />
                    <h4> {total} results page {page}</h4>
                </div>
                <div className="newsGrid">
                    {space.map((spa, id) => (
                        <div key={id} className="gridContent">
                            <h1>{spa.title}</h1>
                            <h2>{spa.summary}</h2>
                            {spa.image_url && (
                                <img src={spa.image_url} alt=" no picture" className="image" />
                            )}
                            <p>{spa.published_at.split('T')[0]}</p>
                            {spa.authors?.[0]?.name && (
                                <p>Author {spa.authors?.[0]?.name}</p>
                            )}
                            <p>
                                <a href={spa.url} target="_blanc">{spa.news_site}</a>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="artNum">
                    {Array.from({ length: totalPagesSpace }, (_, i) => (
                        <div className={page === i + 1 ? 'numbAct' : 'numb'}
                            key={i + 1}
                            onClick={() => {
                                setPage(i + 1);
                                document.querySelector('.top5').scrollIntoView({ behavior: 'smooth' });
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
};
export default Agency;