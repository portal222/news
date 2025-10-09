import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
    const [error, setError] = useState(null);
    const [space, setSpace] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getSpace(page);
    }, [page]);

    const getSpace = async (page) => {
        const url = `https://api.spaceflightnewsapi.net/v4/reports/?limit=10&offset=${page}0`

        try {
            const response = await axios.get(url);
            const data = response

            setSpace(data.data.results);
            setTotal(data.data.count)

        } catch (err) {
            setError(err);
        }
    }

    const totalPagesSpace = Math.ceil(total / 10);

    return (
        <>
            <div className="news">
                <div className="top6" ></div>
                <div className="place"></div>
                  <div className="holdSelect">
                    <p className="spaceFont"> SPACE <br></br> REPORTS </p>
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
                                document.querySelector('.top6').scrollIntoView({ behavior: 'smooth' });
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
export default Reports;