import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext"
import styles from "./BoardComponent.module.css"
import { useNavigate } from "react-router"

type BoardComponentProps = {
    boardId: string
}
export  function BoardComponent ({boardId}: BoardComponentProps) {
const context = useContext(BoardContext)
const {dispatch , state} = context
if(!context) return null
const navigate = useNavigate()

const[isEdiditingBoard , setIsEditingBoard] = useState<boolean>(true)
const[inputBoardsValue , setInputBoardsValue] = useState<string>('')
console.log(boardId);

useEffect(() => {
    console.log("state is calling!");
    
}, [state])

const onKeyDown = (event) => {
if(event.key.toLowerCase() === 'z' && event.metaKey  && !event.shiftKey){
    console.log('user wnats to undo');
    dispatch({type:'UNDO' , payload: Number(boardId)})

}
if(event.key.toLowerCase() === 'z' &&  event.metaKey  && event.shiftKey){
    console.log("REDO")
    dispatch({type:'REDO' , payload: Number(boardId)})
    
}

if(event.key.toLowerCase() === 'd' && event.ctrlKey){
    console.log(state.boardIds);
    // state берется старый , он обонвляет в редюсере а тут старый берется
        let nextBoardId = state.boardIds.length > 0 ? Math.max(...state.boardIds) + 1 : 1
        console.log(nextBoardId);
        
        dispatch({type:'COPY' , payload: {boardId ,  nextBoardId }})
        navigate(`/boards/${nextBoardId}`)

        console.log(event);
        
    }
}

useEffect(() => {
window.addEventListener("keydown" , onKeyDown)

return () => window.removeEventListener("keydown" , onKeyDown)
}, [state.boardIds])


console.log(state);




    return(
        <>
    <div className="">
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
                        </div>
    </div> </>
    )
}