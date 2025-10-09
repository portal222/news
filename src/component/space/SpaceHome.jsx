import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import Reports from "./Reports";
import { useNavigate } from "react-router-dom";

const SpaceHome = () => {
    const [error, setError] = useState(null);
    const [space, setSpace] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [agency, setAgency] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`../agency.json`).then(res => {
            const data = res.data;
            setAgency(data)
        })
    }, [])

    useEffect(() => {
        getSpace(page);
    }, [page]);

    const getSpace = async (page) => {
        const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${page}0&title_contains=esa`

        try {
            const response = await axios.get(url);
            const data = response

            setSpace(data.data.results);
            setTotal(data.data.count)

        } catch (err) {
            setError(err);
        }
    }

    const selectRef = useRef(null);
    const selectRef2 = useRef(null);
    const selectRef3 = useRef(null);
    const selectRef4 = useRef(null);

    const clickSpace = (name, image) => {
        navigate(`/space/${name}`, {
            state: { image }
        });
    };


    const totalPagesSpace = Math.ceil(total / 10);

    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect2 = () => {
        selectRef2.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect3 = () => {
        selectRef3.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToSelect4 = () => {
        selectRef4.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="navigation" >
                <div className="quick" >
                    <button onClick={scrollToSelect}>Agencies</button>
                    <button onClick={scrollToSelect2}>News</button>
                    <button onClick={scrollToSelect3}>Blogs</button>
                    <button onClick={scrollToSelect4}>Reports</button>
                </div>
            </div>
            <div ref={selectRef}></div>
            <div className="news">
                <div className="place"></div>
                <div className="holdSelect">
                    <p className="spaceFont"> SPACE <br></br> AGENCIES </p>
                </div>
                <div className="guardianGrid">
                    {agency.map((ag, id) => (
                        <div key={id} className="guContent">
                            <img src={ag.image} alt="" className="spaceImg"
                                onClick={() => {
                                    clickSpace(ag.name, ag.image)
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                                } />
                            <p className="spaceTitle"
                                onClick={() => {
                                    clickSpace(ag.name, ag.image)
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                                }
                            >{ag.title}</p>
                            <h1>{ag.country}</h1>
                        </div>
                    ))}
                </div>

            </div>
            <div ref={selectRef2}></div>
            <div className="news">
                <div className="top4" ></div>
                <div className="place"></div>
                <div className="holdSelect">
                    <p className="spaceFont"> SPACE <br></br> NEWS </p>

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
                                document.querySelector('.top4').scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={i + 1 === page}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div ref={selectRef3}></div>
            <Blogs />
            <div ref={selectRef4}></div>
            <Reports />
        </>
    )
};
export default SpaceHome;