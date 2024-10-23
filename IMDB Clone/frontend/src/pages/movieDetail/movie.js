import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../userAth";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Movie = () => {
    const { user, setUser, loginstatus, setLoginstatus } = useContext(UserContext);
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    const [isActive,setIsActive]= useState(true)
    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=805cffc7ea2a19b9fa8a72a704c19b2e&language=en-US`)
        .then(res => res.json())
        .then((data) => {setMovie(data) 
            const a=user.fav_list.filter(movie=>movie.id === currentMovieDetail.id)
            setIsActive(a.length > 0);
        })
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [id])

    const handleClick = () =>{
        if(loginstatus){
            if(isActive){
                setIsActive(false);
                user.fav_list=user.fav_list.filter(movie=> movie.id !== currentMovieDetail.id)
                axios.post("http://localhost:8000/changefavorite",user).then((response)=>{
                    if(response.data.message==="Done"){
                        alert("movie added to favlist");
                    }
                    else{
                        alert(response.data.message);
                    }
                }).catch((err) => console.log(err));
                alert("movie is removed from favlist");
                console.log(user.fav_list)
                return;
            }
            else{
                user.fav_list=[currentMovieDetail,...user.fav_list];
                setIsActive(true);
                axios.post("http://localhost:8000/changefavorite",user).then((response)=>{
                    if(response.data.message==="Done"){
                        alert("movie added to favlist");
                    }
                    else{
                        alert(response.data.message);
                    }
                }).catch((err) => console.log(err));
                console.log("movie",user.fav_list);
            }
        }
        else{
         alert("please login to use favoutie") ;
        }
    }
    return (
        <div className="movie" >
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="" />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span> </>
                                    
                                )) 
                                : 
                                ""
                            }
                             
                            <FaHeart className="heart" color={isActive?"red":"white"} size={20} onClick={ handleClick} />
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank"  rel="noreferrer" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank"  rel="noreferrer" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path}  alt=""/>
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie;