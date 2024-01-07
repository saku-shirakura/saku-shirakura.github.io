import React from "react";
import {MyProfile} from "./page/MyProfile";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Header} from "./parts/Header";
import {Footer} from "./parts/Footer";
import "bootstrap/dist/css/bootstrap.min.css"
import {StarOrbitClock} from "./page/StarOrbitClock";
import {Login} from "./page/Login";

export const App = () => {
    return (
        <>
            <HashRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<MyProfile/>}/>
                    <Route path="/star_orbit_clock/" element={<StarOrbitClock/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                <Footer/>
            </HashRouter>
        </>
    );
}