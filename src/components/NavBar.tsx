import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";

// Styled-components
const Nav = styled(motion.nav)`
    z-index: 1000;
    display: flex;
    position: fixed;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    margin-bottom: 60px;
`;
const Col = styled.div`
    display: flex;
    align-items: center;
`;
const Items = styled.ul`
    display: flex;
    align-items: center;
`;
const LogoBox = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(9, 132, 227, 1);
`;
const Logo = styled(motion.svg)`
    width: 40px;
    margin-left: 30px;
    margin-right: 10px;
`;
const LogoTitle = styled(motion.h1)`
    font-size: 32px;
`;
const Item = styled.li`
    position: relative;
    padding: 10px;
    margin: 0px 10px;
    display: flex;
    justify-content: center;
    transition: color 0.4s ease;
    &:hover {
        color: rgba(9, 132, 227, 1);
    }
`;
const Pointer = styled(motion.div)`
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    top: 40px;
    background-color: rgba(9, 132, 227, 1);
`;
const SearchBox = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    cursor: pointer;
    &:hover {
        color: rgba(9, 132, 227, 1);
    }
`;
const Magnifify = styled(motion.svg)`
    z-index: 10;
`;
const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 50px;
    text-align: center;
    height: 30px;
    border-radius: 15px;
    border: none;
`;

// Variants
const LogoVariants = {
    normal: {
        fill: "rgba(116, 185, 255,1.0)",
    },
    active: {
        fill: "rgba(9, 132, 227,1.0)",
    },
};
const navVariants = {
    top: {
        backgroundColor: "rgba(116, 185, 255,0)",
    },
    scroll: {
        backgroundColor: "rgba(116, 185, 255,0.3)",
    },
    hover: {
        backgroundColor: "rgba(116, 185, 255,0.2)",
    },
};

// Interface
interface SearchForm {
    keyword: string;
}
export default function Header() {
    const { pathname } = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
    const { register, handleSubmit, reset } = useForm<SearchForm>();
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();
    const navMenus = ["home", "about", "project", "skill"];
    const navKorMenus = ["홈", "소개", "프로젝트", "기술"];

    console.log(curState);

    const onvalid = (data: SearchForm) => {
        navigate(`/search?keyword=${data.keyword}`);
        console.log(data);
    };
    const toggleSearch = () => setSearchOpen((cur) => !cur);
    useEffect(() => {
        scrollY.onChange(() => {
            // console.log(scrollY.get());
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, []);
    useEffect(() => {
        console.log(pathname);
        // setCurState();
    }, [pathname]);
    return (
        <Nav variants={navVariants} initial="top" animate={navAnimation} whileHover="hover">
            <Col>
                <Link to="/">
                    <LogoBox onClick={() => setCurState("home")}>
                        <Logo
                            variants={LogoVariants}
                            initial="normal"
                            whileHover="active"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <motion.path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                        </Logo>
                        <LogoTitle>CHS</LogoTitle>
                    </LogoBox>
                </Link>
            </Col>
            <Col>
                <Items>
                    {navMenus.map((menu, index) => (
                        <Link key={index} to={menu === "home" ? "/" : menu}>
                            <Item onClick={() => setCurState(menu)}>
                                {navKorMenus[index]}
                                {curState === menu && <Pointer layoutId="point" />}
                            </Item>
                        </Link>
                    ))}
                </Items>
            </Col>
            <Col>
                <SearchBox onSubmit={handleSubmit(onvalid)}>
                    <Magnifify
                        onClick={toggleSearch}
                        width={20}
                        fill="rgba(99, 110, 114, 1.0)"
                        animate={{ x: searchOpen ? -145 : 0 }}
                        transition={{ duration: 0.6 }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                    </Magnifify>
                    <AnimatePresence>
                        {searchOpen && (
                            <Input
                                {...register("keyword", {
                                    required: "검색어를 입력해주세요",
                                    minLength: {
                                        value: 2,
                                        message: "두글자 이상 입력해주세요",
                                    },
                                })}
                                type="text"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ duration: 0.6 }}
                                placeholder="Search for movie"
                            />
                        )}
                    </AnimatePresence>
                </SearchBox>
                {/* <div>
                    <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                </div> */}
            </Col>
        </Nav>
    );
}
