import { act, createContext, useReducer } from "react";
import type { State } from "../../Types/ReducerStateType";
import type {  BoardContextType } from "../../Types/ContextBoardType";
import type { Action } from "../../Types/ReducerStateType";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export const initialState: State = {
boards: {
    1: {boardId: 1 , boardTitle:'todo'} ,
    2: {boardId: 2 , boardTitle:'homework'} ,
} ,
boardIds: [1 , 2 ] ,

columns:{
    1: {boardId: 1 , columnId: 1 , columnTitle:'in the q to be done'},
    2: {boardId: 1 , columnId: 2 , columnTitle:'in progress'},
    3: {boardId: 1 , columnId: 3 , columnTitle:'done'},
} ,
columnIds: [1 , 2 , 3] ,

cards: {
1: {columnId: 1 ,cardId:1 , cardTitle:'router new version'},
2: {columnId: 2 ,cardId:2 , cardTitle:'useReducer'},
3: {columnId: 2 ,cardId:3 , cardTitle:'normalization'},
4: {columnId: 1 ,cardId:4 , cardTitle:'context'},
} ,
cardIds:[ 1 , 2 , 3 , 4 ]

}

export const BoardContext = createContext<BoardContextType | null>(null)

function reducer (state:State, action:Action){
    if(action.type === 'delete_board'){
        
        let copyBoards = {...state.boards}
        for(const board of Object.values(copyBoards)) {

            
            if(board.boardId === action.payload){
                delete copyBoards[board.boardId]


            }
        }
        // скопировать состояние boards
        // превратить обьекты board в массив обьектов
        // пройтись циклом (каждый board)
        // условие если board[boardId].boardId === action.payload ? delete board[boardId] : оставить как есть
        // вернуть новое состояние с измененными параметрами  
        let copyBoardIds = [...state.boardIds]
        copyBoardIds = copyBoardIds.filter((id) => id !== action.payload)

         return {...state , boards: copyBoards , boardIds: copyBoardIds }
    }

    if(action.type === 'add_board'){
        console.log(state);
        
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
        console.log(state);

        let copyColumnIds = [...state.columnIds]
        let arrayCopyColumnIds = Object.values(copyColumnIds) as number[]
        console.log(arrayCopyColumnIds);
        let max = arrayCopyColumnIds.length > 0 ? Math.max(...arrayCopyColumnIds) + 1 : 1
        copyColumnIds = [...state.columnIds , max]

        console.log(max)
        
        let copyColumns = {...state.columns}
        copyColumns[max] = {boardId: action.payload , columnId: max , columnTitle:"new column"}

        return {...state , columns: copyColumns , columnIds: copyColumnIds}
    }
    return state
}

export default function BoardProvider ({children}) {

const[state , dispatch] = useReducer(reducer , initialState , (initialState) => {
    const saved = localStorage.getItem('reducer')
    return saved ? JSON.parse(saved) as State : initialState
})

        useLocalStorage("reducer" , state)

    return(
       <BoardContext.Provider value={{state , dispatch}}>
            {children}
       </BoardContext.Provider>
    )
     
}