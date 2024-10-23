import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useContext ,useState} from "react"
import UserContext from '../../userAth';
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const {user,setUser}=useContext(UserContext);
    const {loginstatus,setLoginstatus}=useContext(UserContext);
    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleSignOut = () => {

        setLoginstatus(false);

      };
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt=""/></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
            <div className="headerRight">
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search..." onChange={e=> setSearchValue(e.target.value) } />
                    <Link to={`/movie/search/${searchValue}`} style={{textDecoration:"none"}} ><button type="submit" className="search-button">
                        <i className="fas fa-search"></i> 
                    </button></Link>
                </div>            
            {loginstatus?(<Link to="/favourites" style={{textDecoration: "none"}}><span>Favourites</span></Link>):null}
            {loginstatus?(<div className="profile-dropdown">
      <div className="profile-icon" onClick={toggleDropdown}>
        <FaUser />
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={handleSignOut}>
          <Link to="/login" style={{textDecoration: "none"}}><FaSignOutAlt /> <span>Sign Out</span></Link>
          </div>
        </div>
      )}
    </div>):(<Link to="/login" style={{textDecoration: "none"}}><span>Login</span></Link>)}
            </div>
        </div>
    ) 
}

export default Header