import { Link } from "react-router"
import styles from "./Boards.module.css"
import { useContext } from "react"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext"

export default function Boards () {
    const context = useContext(BoardContext)
    const { state } = context
    // const id = state.boardIds.map((id) =>  {
    //     state.boards[id]
    // })



    return (
        <>
        <h1>Boards</h1>
        <div className={styles.columns}>
        {state.boardIds.map((id) => (
            <ul key={id}>
                <li>{state.boards[id].boardId}</li>
                <li>{state.boards[id].boardTitle}</li>
                <Link to={`/boards/${id}`}>click</Link>
            </ul>
        ))}

            </div>
        
        </>
    )
}