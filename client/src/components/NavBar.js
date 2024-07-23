import React from 'react';
import {Link} from 'react-router-dom';

function NavBar({onLogout}){
    return(
        <nav>
            <Link className={"navLink"} to="/">Home</Link>
            <Link className={"navLink"} to="/newgame">New Game</Link>
            <Link className={"navLink"} to="/allgames">All Games</Link>

            <Link className={"navLink"} to="/newreview">New Review</Link>
            <Link className={"navLink"} to="allreviews">All Reviews</Link>
            
            <Link className={"navLink"} to="/login">Log In</Link>
            <Link className={"navLink"} to="/signup">Sign Up</Link>
            <button className={"navLink"} onClick={onLogout}>Log Out</button>
        </nav>
    )
}

export default NavBar;