import { createContext, useReducer } from "react";
import type { State } from "../../Types/ReducerStateType";



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
cardIds:[ 1 , 2 , 3, 4]

}


export const BoardContext = createContext(initialState)

function reducer (state, action){

}

export default function BoardProvider ({children}) {

 const[state , dispatch] = useReducer(reducer , initialState)


    return(
       <BoardContext.Provider value={state}>
            {children}
       </BoardContext.Provider>
    )
     
}