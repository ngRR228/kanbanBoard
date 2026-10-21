import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import styles from './Board.module.css'

export default function Board () {

const { boardId } = useParams()
useEffect(() => {
localStorage.setItem('boardId' , boardId) 
}, [boardId])
const context = useContext(BoardContext)
if(!context) return null
const { state,  dispatch } = context
const navigate = useNavigate()


    return (
        <>
        <h1>Current Board</h1>
          <button onClick={() => { dispatch({type: 'add_board' , payload: Number(boardId)}) , navigate('/boards') }}>create new board</button>
                <button onClick={() => { dispatch({type:"delete_board" , payload: Number(boardId)}) , navigate('/boards') }}>delete board</button>
        <div className={styles.boardCard}>
            <p>Board</p>
                <p>{state.boards[boardId].boardId}</p>
                <p>{state.boards[boardId].boardTitle}</p>
                     <button>rename board title</button>
                        <button onClick={() => dispatch({type: 'add_column' , payload: Number(boardId)})}>add column</button>
                   

            <div className={styles.columns}>
                {state.columnIds.map((columnId) =>  {
                return  state.columns[columnId].boardId === Number(boardId) && (
                    <ul key={columnId} >
                        <li>ColumnTitle {state.columns[columnId].columnTitle}</li>
                        <li>ColumnId {state.columns[columnId].columnId}</li>
                         <li><button>rename column title</button></li>
                          <li><button  onClick={() => { dispatch({ type:'delete_column' , payload: columnId})}}>delete column </button></li>
                                <li><button onClick={() => dispatch({type: 'add_card' , payload: columnId })}>add card</button></li>
                                    <li>
                                       <ul>
                                        {state.cardIds.map((cardId) => {
                                          return state.cards[cardId].columnId === columnId && (
                                        <li className="" key={cardId}>
                                        <p>{state.cards[cardId].cardTitle}</p>
                                             <button>rename card</button>
                                                 <button onClick={() => dispatch({type: 'delete_card' , payload:cardId})}>delete card </button>
                                            </li>
                                             )
                                        })} </ul>
                                        </li>
                                    </ul>
                )
            })
            
}
</div>
        </div>
        </>
    )
}