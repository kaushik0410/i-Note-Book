import React, { useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const Navbar = (props) => {

    const navigate = useNavigate();

    let location = useLocation();
    useEffect(() => {}, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/signin")
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode==="light"?"primary":props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    {!localStorage.getItem('token') ? <div>
                        <Link class="btn btn-light" to="/signin" style={{marginRight: "5px", marginLeft: "5px"}}>Sign In</Link>
                        <Link class="btn btn-light" to="/signup" style={{marginRight: "5px", marginLeft: "5px"}}>Sign Up</Link>
                    </div> : <button class="btn btn-light" onClick={handleLogout} style={{marginRight: "5px", marginLeft: "5px"}}>Sign Out</button>} 
                        
                    <div className={`form-check form-switch text-${props.mode==='light'?'dark':'white'}`}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.modeText}</label>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;