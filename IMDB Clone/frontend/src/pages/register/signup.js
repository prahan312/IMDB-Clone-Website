import { useState } from 'react';
import axios from 'axios';
import './signup.css'; 
import { Navigate } from 'react-router-dom';

function Signup() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = () => {
    const data = {
      first,
      last,
      email,
      password
    };
    console.log(data);
    axios.post("http://localhost:8000/register", data)
      .then((res) => {
        alert(res.message)
        console.log(data);
        setStatus(true);
      })
      .catch((err) => console.log(err));
  }; 

  return <>{status?<Navigate to="/login" />:
    <div className='cont'>
      <div className="container">
        <div className='card shadow'>
          <div className="card-header">Sign Up</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label my-2 py-2">First Name</label>
              <input
                type="text"
                className="form-control"
                value={first}
                placeholder="Enter your first name"
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label my-2 py-2">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={last}
                placeholder="Enter your last name"
                onChange={(e) => setLast(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label my-2 py-2">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control my-2 py-2"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
}</>
}

export default Signup;
