import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserContext from "../../userAth";
import './signin.css'
import {Link} from 'react-router-dom'
function Login() {
  const { user, setUser, loginstatus, setLoginstatus } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const data = {
      email,
      password
    };

    axios.post("http://localhost:8000/login", data)
      .then((response) => {
        if (response.data.message === "success") {
          setLoginstatus(true);
          setUser(response.data.user);
          console.log(user);
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => console.log(err));
      
  }

  return <>{loginstatus? <Navigate to="/" />:(
    <div className="cont">
    <div className="container">
      <div className="row">
        <div className='col-12 col-sm-8 col-md-6 m-auto'>
          <div>
            <h2>Login</h2>
            <div>
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p>don't you have account? </p><Link to="../signup">create accout</Link>
          </div>
        </div>
        </div>
      </div>
    </div>)

  }</>

}

export default Login;
