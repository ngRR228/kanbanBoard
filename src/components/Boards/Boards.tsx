import { Link } from "react-router"
import styles from "./Boards.module.css"
import { useContext } from "react"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext"

export default function Boards () {

    const state = useContext(BoardContext)
    console.log(state)
    const id = state.boardIds.map((id) =>  {
        console.log("to display" ,state.boards[id]);
        
        state.boards[id]
    })
    console.log(id);
    console.log(state.boards[1]);
    


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