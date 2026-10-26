import { NavLink } from "react-router";
import styles from "./Header.module.css"
import { useContext, useEffect } from "react";
import { ThemeContext } from "../Shared/Context/ThemeContext/ThemeContext";

export default function Header () {
const  savedBoardId  =  localStorage.getItem("boardId")
savedBoardId ? JSON.parse(savedBoardId) : savedBoardId

const {currentTheme , setCurrentTheme} = useContext(ThemeContext)
console.log(currentTheme);

    return (
        <>
        <header className={styles.headerLinks}>
        <NavLink to={"/"}>home</NavLink>
        <NavLink to={"/boards"}>my boards</NavLink>
        <NavLink to={`/boards/${savedBoardId}`}>board</NavLink>
        <button onClick={() => currentTheme === 'light' ? setCurrentTheme('dark') : setCurrentTheme('light')}>change theme</button>
        </header>
        </>
    )
}