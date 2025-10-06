import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const First = () => {

    const [error, setError] = useState(null);

     const params = useParams()
    const id = params.id;



console.log("preneseni id", id);

    useEffect(() => {
getNews(id);
    }, [id])

    const getNews = async (id) => {

        const url = ` https://content.guardianapis.com/${id}&api-key=e33e0d13-595a-4688-a23c-f17a1f0a7235`

      
     
   try {
    const response = await axios.get(url);
    const data = response

    console.log("detalji podaci", data);
   } catch (err) {
            setError(err);
        }
    }

    return (
        <>
        <h1>detalji vesti</h1>
        </>
    )

}
export default First;