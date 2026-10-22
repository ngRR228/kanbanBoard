import { useContext, useEffect, useState } from "react";
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

const [isEdiditingBoard , setIsEditingBoard] = useState<boolean>(true)
const[inputBoardsValue , setInputBoardsValue] = useState<string>('')


const[isEditingColumn , setIsEditingColumn] = useState<boolean>(false)
const[selectedColumn , setSelectedColumn] = useState<number>()
const[inputColumnValue , setInputColumnValue] = useState<string>('')


const[isEditingCard, setIsEditingCard] =  useState<boolean>(false)
const[selectedCard , setSelectedCard] = useState<number>()
const[inputCardValue , setInputCardValue] = useState<string>('')

    return (
        <>
        <h1>Current Board</h1>
          <button onClick={() => { dispatch({type: 'add_board' , payload: Number(boardId)}) , navigate('/boards') }}>create new board</button>
                <button onClick={() => { dispatch({type:"delete_board" , payload: Number(boardId)}) , navigate('/boards') }}>delete board</button>
        <div className={styles.boardCard}>
            <p>Board</p>
                <p>{state.boards[boardId].boardId}</p>
                <p>{state.boards[boardId].boardTitle}</p>
                     <button onClick={() => isEdiditingBoard ? setIsEditingBoard(false) : setIsEditingBoard(true) }>rename board title</button>
                     {isEdiditingBoard && (
                        <div className="">
                        <input type="text" value={inputBoardsValue} placeholder="type..." onChange={(e) => setInputBoardsValue(e.target.value)
                        } />
                        <button onClick={() =>{  dispatch({type: 'rename_board' , payload:{ boardId , inputBoardsValue }}) , setIsEditingBoard(false) }}>apply new board title</button>
                        </div>
                     )}
                        <button onClick={() => dispatch({type: 'add_column' , payload: Number(boardId)})}>add column</button>
                   

            <div className={styles.columns}>
                {state.columnIds.map((columnId) =>  {
                return  state.columns[columnId].boardId === Number(boardId) && (
                    <ul key={columnId} >
                        <li>{state.columns[columnId].columnTitle}</li>
                        <li>{state.columns[columnId].columnId}</li>
                         <li><button onClick={() => {
                            setSelectedColumn(columnId)
                            isEditingColumn ? setIsEditingColumn(false) : setIsEditingColumn(true) 
                            }}>rename column title</button></li>
                            {selectedColumn === columnId && isEditingColumn === true  &&  (
                            <div className="">
                                <input type="text" value={inputColumnValue} onChange={(e) =>  setInputColumnValue(e.target.value)} />
                                <button onClick={() => { dispatch({type:"rename_column" , payload:{columnId:columnId , inputColumnValue:inputColumnValue}}), setIsEditingColumn(false) }}>apply new column title</button>
                            </div>
                         )}
                          <li><button  onClick={() => { dispatch({ type:'delete_column' , payload: columnId})}}>delete column </button></li>
                                <li><button onClick={() => dispatch({type: 'add_card' , payload: columnId })}>add card</button></li>
                                    <li>
                                       <ul>
                                        {state.cardIds.map((cardId) => {
                                          return state.cards[cardId].columnId === columnId && (
                                        <li className="" key={cardId}>
                                        <p>{state.cards[cardId].cardTitle}</p>
                                             <button onClick={() => {
                                                setSelectedCard(cardId)
                                                isEditingCard ? setIsEditingCard(false) : setIsEditingCard(true) }}>
                                                rename card</button>
                                                {selectedCard === cardId && isEditingCard && (
                                                    <div className="">
                                                        <input type="text" value={inputCardValue} onChange={(e) => setInputCardValue(e.target.value)} />
                                                        <button onClick={() => { dispatch({type:"rename_card" , payload:{cardId:cardId , inputCardValue:inputCardValue}}), setIsEditingCard(false) }}>apply new card title</button>
                                                    </div>
                                                )}
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