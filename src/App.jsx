import { React, useState } from "react";
import Login from "./login";
import Register from "./register";
import Navbar from "./navbar";
import Dashboard from "./dashboard";
import { HashRouter } from "react-router-dom";
import { Route, Routes, } from "react-router";
import { usercontext } from "./createcontext";
import Store from "./store";

function App() {
    let [user, setUser] = useState({
        isloggin: false,
        userid: null,
        username: null,
    }
    )
    return (
        <usercontext.Provider value={{ user, setUser }}>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" exact={true} Component={Login} />
                    <Route path="/register" Component={Register} />
                    <Route path="/dashboard" Component={Dashboard} />
                    <Route path="/store" Component={Store} />
                    {/* <Route path="*" component={NoMatchPage} /> */}
                </Routes>
            </HashRouter>

        </usercontext.Provider>

    );
}
export default App;
