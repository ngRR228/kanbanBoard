import { NavLink } from "react-router";
import styles from "./Header.module.css"

export default function Header () {
const  savedBoardId  =  localStorage.getItem("boardId")
savedBoardId ? JSON.parse(savedBoardId) : savedBoardId
    return (
        <>
        <header className={styles.headerLinks}>
        <NavLink to={"/"}>home</NavLink>
        <NavLink to={"/boards"}>my boards</NavLink>
        <NavLink to={`/boards/${savedBoardId}`}>board</NavLink>
        </header>
        </>
    )
}