import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import gnewsLogo from "../assets/gnewsLogo.svg";




const GNews = () => {

    const [error, setError] = useState(null);
    const [cunews, setCunews] = useState([]);
    const [gnews, setGnews] = useState([]);
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();




    const params = useParams();
    const categ = params.event;

    console.log("birana kategorija", categ)

    useEffect(() => {
        axios.get(`./categories.json`).then(res => {
            const data = res.data;
            console.log("provera kategorija", data);
            setCategory(data)

        })
    }, [])


    useEffect(() => {

        getGNews(categ);
    }, [categ]);



    const getGNews = async (categ) => {

        const url = `https://gnews.io/api/v4/top-headlines?category=${categ}&lang=en&apikey=7aaab2d977061a3e92aab036882182d7`
        try {
            const response = await axios.get(url);
            const data = response
            setGnews(data.data.articles);


            console.log("GN news birane kategorije", data.data);
        } catch (err) {
            setError(err);
        }
    }

    const handleOption = (event) => {
        const LinkTo = `/option/${event.target.value}`;
        navigate(LinkTo);
    }




    return (
        <>

            <div className="news">
                <div className="place"></div>
                <div className="holdSelect">
                    <img src={gnewsLogo} alt="" className="gnlogo" />
                    <div>
                        <select onChange={handleOption} className="select">
                            <option value="" disabled>choose category</option>
                            {category.map((categ, id) => (
                                <option key={id} value={categ.title} className="option">
                                    {categ.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="newsGrid">

                    {gnews.map((gn, id) => (
                        <div key={id} className="gridContent">

                            <h1>{gn.title}</h1>
                            <p>{gn.content}</p>
                            {gn.image && (
                                <img src={gn.image} alt="no picture" className="image" />
                            )}
                            <p>{gn.publishedAt.split('T')[0]}</p>
                            <p>
                                <a href={gn.url} target="_blanc">{gn.source.name + " "}</a>
                                {" " + gn.source.country}
                            </p>

                        </div>

                    ))}

                </div>
            </div>



        </>
    )

}
export default GNews;