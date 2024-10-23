import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Login from './pages/login/signin';
import SignUp from './pages/register/signup';
import FavMovie from './pages/MyFavourites/Favourites'
import MovieSearch from './components/Search/MovieSearch'
import {useContext,useState,createContext} from 'react';
import UserContext from './userAth'
function App() {
  const [user,setUser]=useState({});
  const [loginstatus,setLoginstatus]=useState(false);
  return (
    
    <div className="App">
        <UserContext.Provider value={{user,setUser,loginstatus,setLoginstatus}}>
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path='/favourites' element={<FavMovie />}></Route>
                <Route path='/movie/search/:item' element={<MovieSearch />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
        </UserContext.Provider>
    </div>
  );
}

export default App;
