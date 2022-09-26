import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./router/About";
import Home from "./router/Home";
import Project from "./router/Project";
import Skill from "./router/Skill";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
