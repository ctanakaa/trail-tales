import React from 'react';
import {useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'


export function NavBar(props) {
    const { currentUser } = props;
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const getClassName = (path) => {
        return location.pathname === path ? 'nav-link active text-light' : 'nav-link text-light';
    }

    const handleSignOut = () => {
        console.log("signing out");
        const auth = getAuth();
        signOut(auth);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-success text-light">
            <div className="container-fluid">
                <Link className="navbar-brand logo">
                    <img src="img/logo3.jpg" alt="logo" width="56" height="56" />
                </Link>

                <button className="navbar-toggler" type="button" onClick={toggleCollapse} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={getClassName('/')} aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getClassName('/post')} to="/post">
                                Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getClassName('/search')} aria-current="page" to="/search">
                                Search
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getClassName('/save')} aria-current="page" to="/save">
                                Save
                            </Link>
                        </li>
                    </ul>
                    <div className="navbar-nav">
                        {currentUser && (
                            <div className='container'>
                                <button className="btn btn-outline-light ms-5" onClick={handleSignOut}>Sign Out</button>
                            </div>
                        )}
                        {!currentUser && (
                        <li className="nav-item">
                            <Link className="btn btn-outline-light" to="/signin">
                                Login
                            </Link>
                        </li>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;