import { React, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { usercontext } from './createcontext';

function Navbar(props) {
    let UserContext = useContext(usercontext);
    let onlogout = (event) => {
        event.preventDefault();
        UserContext.setUser({
            ...usercontext.user, isloggin: false, userid: null, username: null,
        })
        window.location.hash = "/";
    }
    return (
        <div>
            <nav class="navbar navbar-expand-sm nav-bg">
                <a class="navbar-brand" href="#"></a>
                <button class="navbar-toggler d-lg-none"
                    type="button" data-toggle="collapse" data-target="
                #collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"></button>

                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        {!UserContext.user.isloggin ? <li class="nav-item active btn btn-primary">
                            <Link to={"/#"} class="nav-link" href="#"> Login</Link>
                        </li> : ""}
                        {!UserContext.user.isloggin ? <li class="nav-item btn btn-success">
                            <Link to={"/register"} class="nav-link" href="#">Register</Link>
                        </li> : ""}
                        {UserContext.user.isloggin ? <li class="nav-item btn btn-info">
                            <Link to={"/dashboard"} class="nav-link" href="#">Dashboard</Link>
                        </li> : ""}
                        {UserContext.user.isloggin ? <li class="nav-item btn btn-primary">
                            <Link to={"/store"} class="nav-link" href="#">Store</Link>
                        </li> : ""}
                        {UserContext.user.isloggin ? <div class="btn-group" style={{ marginLeft: 80 + "vw" }}>
                            <button class="btn  dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                {UserContext.user.username} <i class="fa fa-User" aria-hidden="true"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                <a class="dropdown-item" href="#" onClick={onlogout}>logout</a>
                                <a class="dropdown-item" href="#"></a>
                            </div>
                        </div> : ""}

                    </ul>
                </div>
            </nav >

        </div >
    );
}

export default Navbar;