import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <nav>
            <Link className={"navLink"} to="/">Home</Link>
            <Link className={"navLink"} to="/login">Login</Link>
            <Link className={"navLink"} to="allreviews">All Reviews</Link>
        </nav>
    )
}

export default NavBar;