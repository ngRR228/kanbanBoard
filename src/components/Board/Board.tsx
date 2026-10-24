import { useContext, useEffect } from "react";
import { useParams } from "react-router"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import styles from './Board.module.css'
import { ColumnComponent } from "../ColumnComponent/Column";
import { BoardComponent } from "../BoardComponent/BoardComponent";

export default function Board () {

const { boardId } = useParams()
useEffect(() => {
localStorage.setItem('boardId' , boardId) 
}, [boardId])
const context = useContext(BoardContext)
if(!context) return null
const { state } = context

    return (
        <>
        <div className={styles.boardCard}>
            <div className={styles.board}>
                <BoardComponent boardId={boardId} />
            </div>
<ul>
    <li className={styles.columns}>
{state.columnIds.map((columnId) =>
  state.columns[columnId].boardId === Number(boardId) && (
    <ul key={columnId}>
        <li>
      <ColumnComponent
      key={columnId}
      columnId={columnId}
    /></li>
    </ul>

  )
)}</li>
</ul>
</div>

   
        </>
    )
}