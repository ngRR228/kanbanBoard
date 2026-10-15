import { useContext, useEffect } from "react";
import { useParams } from "react-router"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import styles from './Board.module.css'

export default function Board () {

const { boardId } = useParams()
console.log(boardId);
useEffect(() => {
localStorage.setItem('boardId' , boardId)
}, [])
//åif(boardId!) return "no boardId provided ;("
const state = useContext(BoardContext)
console.log(state);
console.log(state.columns[boardId]);



    return (
        <>
        <h1>Current Board</h1>
        <div className={styles.boardCard}>
                <p>{state.boards[boardId].boardId}</p>
                <p>{state.boards[boardId].boardTitle}</p>

                {state.columnIds.map((id) =>  {
                return  state.columns[id].boardId === Number(boardId) && (
                    <ul key={id}>
                        <li>{state.columns[id].columnTitle}</li>
                        <li>{state.columns[id].columnId}</li>
                    </ul>
                )
            })
}
        </div>
        </>
    )
}