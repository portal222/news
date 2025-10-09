import React, { useState, useEffect, useContext } from "react";
import Loader from "./Loader";


const NewYorkTimesResult = (props) => {

    const [nyTimes, setNyTimes] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNyt, setPageNyt] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    const search = props.search

    useEffect(() => {
        getTimes(search, pageNyt);
    }, [search, pageNyt]);

    const getTimes = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&page=${pageNyt}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        const dataHits = data.response.metadata.hits;

        setTotal(dataHits);
        setNyTimes(data.response.docs);
        setIsLoading(false);

    };

    const totalPagesNyt = Math.ceil(total / 10);

    if (isLoading) {
        return (
            <>
                <div className="news">
                    <div className="place"></div>
                    <div className="holdSelect">
                        <p className="times">The New York Times </p>
                    </div>
                </div>
                <Loader />
            </>
        )
    }
    return (
        <>
            <div className="news">
                <div className="top2" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <p className="times">The New York Times </p>
                    <h4> {total} results for {search} page {pageNyt}</h4>
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
                <div className="artNum">
                    {Array.from({ length: totalPagesNyt }, (_, i) => (
                        <div className={pageNyt === i + 1 ? 'numbAct' : 'numb'}
                            key={i + 1}
                            onClick={() => {
                                setPageNyt(i + 1);
                                document.querySelector('.top2').scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={i + 1 === pageNyt}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};
export default NewYorkTimesResult;