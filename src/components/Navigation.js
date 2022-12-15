import React from "react";
import { Link } from "react-router-dom";

const Navigation = ( {loginedUser} ) => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{loginedUser.displayName} Profile</Link>
            </li>
        </ul>
    )
}

export default Navigation;