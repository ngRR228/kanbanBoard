import { createContext, useReducer } from "react";
import type { State } from "../../Types/ReducerStateType";
import type {  BoardContextType } from "../../Types/ContextBoardType";
import type { Action } from "../../Types/ReducerStateType";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { initialState } from "../../InitialState";
import type { DragEndEvent } from "@dnd-kit/react";
// export const initialState: State = {
// boards: {
//     1: {boardId: 1 , boardTitle:'todo'} ,
//     2: {boardId: 2 , boardTitle:'homework'} ,
// } ,
// boardIds: [1 , 2 ] ,

// columns:{
//     1: {boardId: 1 , columnId: 1 , columnTitle:'in the q to be done'},
//     2: {boardId: 1 , columnId: 2 , columnTitle:'in progress'},
//     3: {boardId: 1 , columnId: 3 , columnTitle:'done'},
// } ,
// columnIds: [1 , 2 , 3] ,

// cards: {
// 1: {columnId: 1 ,cardId:1 , cardTitle:'router new version'},
// 2: {columnId: 2 ,cardId:2 , cardTitle:'useReducer'},
// 3: {columnId: 2 ,cardId:3 , cardTitle:'normalization'},
// 4: {columnId: 1 ,cardId:4 , cardTitle:'context'},
// } ,
// cardIds:[ 1 , 2 , 3 , 4 ]

// }

export const BoardContext = createContext<BoardContextType | null>(null)



function reducer (state:State, action:Action){
    if(action.type === 'delete_board'){
        let copyBoards = {...state.boards}
        for(const board of Object.values(copyBoards)) {
            if(board.boardId === action.payload){
                delete copyBoards[board.boardId]
            }
        }
        let copyBoardIds = [...state.boardIds]
        copyBoardIds = copyBoardIds.filter((id) => id !== action.payload)

         return {...state , boards: copyBoards , boardIds: copyBoardIds }
    }

    if(action.type === 'add_board'){
        let copyBoardIds = {...state.boardIds}
        let arrayBoardIds = Object.values(copyBoardIds) as number[]
        let max = arrayBoardIds.length > 0 ? Math.max(...arrayBoardIds) + 1 : 1
        copyBoardIds = [...state.boardIds , max]
        let copyBoards = {...state.boards}
        copyBoards[max] = {boardId: max , boardTitle:"new board"}

        return {...state , boards: copyBoards , boardIds: copyBoardIds }
    }



    if(action.type === 'delete_column'){
        let copyColumns = {...state.columns}
        delete copyColumns[action.payload]

        let copyColumnIds = [...state.columnIds]
        copyColumnIds = copyColumnIds.filter((id) => id !== action.payload)

        let copyCards = {...state.cards}
        let copyCardIds =[...state.cardIds]
        for(const card of Object.values(state.cards) ) {
                if(card.columnId === action.payload){
                    delete copyCards[card.cardId] 
                    copyCardIds = copyCardIds.filter((id) => id !== card.cardId)
                }
        }
        return {
            ...state ,
             columnIds: copyColumnIds  , 
              columns: copyColumns ,
              cards: copyCards ,
               cardIds: copyCardIds 
             }
    }

    if(action.type === 'delete_card'){
        let copyCardIds = [...state.cardIds]
        copyCardIds = copyCardIds.filter((el) => el !== action.payload)

        let copyCards = {...state.cards}
        delete copyCards[action.payload]
        
        return {...state , cardIds: copyCardIds ,  cards: copyCards }
        
    } 
    if(action.type === 'add_card'){
        let copyCard = {...state.cards}
        let copyCardIds = [...state.cardIds]
         let meow = Object.values(copyCardIds) as number[]
   
                 let max = meow.length > 0 ? Math.max(...meow) + 1 : 1
                copyCardIds = [...state.cardIds , max]
                copyCard[max] = { columnId: action.payload , cardId: max , cardTitle: "new"}

     return {...state , cards:copyCard ,  cardIds: copyCardIds }
        
    }
    if(action.type === 'add_column'){
        let copyColumnIds = [...state.columnIds]
        let arrayCopyColumnIds = Object.values(copyColumnIds) as number[]
        let max = arrayCopyColumnIds.length > 0 ? Math.max(...arrayCopyColumnIds) + 1 : 1
        copyColumnIds = [...state.columnIds , max]

        let copyColumns = {...state.columns}
        copyColumns[max] = {boardId: action.payload , columnId: max , columnTitle:"new column"}

        return {...state , columns: copyColumns , columnIds: copyColumnIds}
    }
    if(action.type === 'rename_board'){
        let copyBoards = {...state.boards}
        let copyBoard = {...state.boards[action.payload.boardId]}

        copyBoard.boardTitle = action.payload.inputBoardsValue
        copyBoards[action.payload.boardId] = { boardId: copyBoard.boardId  , boardTitle: copyBoard.boardTitle}
        
         return {...state , boards: copyBoards  }
    } 
    if(action.type === "rename_column"){
        const copyColumns = {...state.columns}
        const copyColumn = {...state.columns[action.payload.columnId]}

        copyColumn.columnTitle = action.payload.inputColumnValue
        copyColumns[action.payload.columnId] = copyColumn
        
        return {...state , columns: copyColumns}
                 
    } 
    if(action.type === "rename_card"){
        const copyCards = {...state.cards}
        const copyCard = {...state.cards[action.payload.cardId]}
        
        copyCard.cardTitle = action.payload.inputCardValue
        copyCards[action.payload.cardId] = copyCard

        return {...state , cards: copyCards }
        
    } 
    if(action.type === "drag_card"){
 let copyCards = {...state.cards}
 let copyCard = {...copyCards[action.payload.cardId]}

copyCard.columnId = action.payload.columnId
copyCards[action.payload.cardId] = copyCard
 return {...state , cards: copyCards}
    }

    return state
}

export default function BoardProvider ({children}) {

const[state , dispatch] = useReducer(reducer , initialState , (initialState) => {
    const saved = localStorage.getItem('reducer')
    return saved ? JSON.parse(saved) as State : initialState
})
        useLocalStorage("reducer" , state)



// function handleDragEnd(event: DragEndEvent){
//     const { active , over } = event

//     if(!over) return;

//     const cardId = active.id as string;
//     const newStatus = over.id as State
// }

    return(
       <BoardContext.Provider value={{state , dispatch}}>
            {children}
       </BoardContext.Provider>
    )
     
}