import React from "react";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./router/About";
import Home from "./router/Home";
import Project from "./router/Project";
import Skill from "./router/Skill";
import NavBar from "./components/NavBar";
import styled from "styled-components";
const ContentWrap = styled.div`
    padding-top: 60px;
`;
export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <ContentWrap>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/skill" element={<Skill />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </ContentWrap>
        </BrowserRouter>
    );
}
