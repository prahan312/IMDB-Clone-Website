import React, {useEffect, useState} from "react"
import "./Favourites.css"
import { useParams } from "react-router-dom"
import Cards from "./Fav_card"
import {useContext} from 'react';
import UserContext from '../../userAth'

const MovieList = () => {
    const {user,setUser}=useContext(UserContext);

    const [movieList, setMovieList] = useState(user.fav_list);

    return (

        <div className="movie__list">
            <h2 className="list__title">My Favourites</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList