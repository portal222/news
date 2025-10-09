import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const SpaceResult = (props) => {
    const [error, setError] = useState(null);
    const [space, setSpace] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);

    const search = props.search

    useEffect(() => {
        getSpace(page, search);
    }, [page, search]);

    const getSpace = async (page, search) => {

        const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${page}0&summary_contains=${search}`

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
                <div className="top7" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <p className="spaceFont"> SPACE <br></br> NEWS </p>
                    <h4> {total} results  for {search} page {page}</h4>
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
                                document.querySelector('.top7').scrollIntoView({ behavior: 'smooth' });
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
export default SpaceResult;