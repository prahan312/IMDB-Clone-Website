import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {item} = useParams()
    const [status,setStatus]=useState("false");
    const getData = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${item}`);
          const data = await response.json();
          setMovieList(data.results);
          setStatus("true");
          console.log(data,item)
        } catch (error) {
            setStatus("false");
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [item])


    return <>{status?
        <div className="movie__list">
            <h2 className="list__title">Search</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
        :<p>No results</p>
            }
    </>
}

export default MovieList