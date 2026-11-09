import { reducer } from "../Context/BoardContext/BoardContext"
import { initialState } from "../InitialState"
import type { CopyBoardType, State } from "../Types/ReducerStateType"

export type HistoryStateType = {
    past: State[],
    present: State ,
    future: State[]
}
export const historyState = {
    past: []  ,
    present: initialState,
    future: [] 
}

export type HistoryAction = {type:"UNDO" , payload: number} | {type:"REDO" , payload: number} | {type: 'COPY' , payload: CopyBoardType}

export function historyReducer (historyState: HistoryStateType , action:HistoryAction) {

    if (action.type === "UNDO") {

  if (historyState.past.length === 0) return historyState;

  let copyHistoryStatePresent = { ...historyState.present };
  let copyHistoryStatePast = [...historyState.past];
  let copyHistoryFuture = [...historyState.future];

  let copyHistoryStatePastLast = copyHistoryStatePast.pop();
        
      const lastStatePast = copyHistoryStatePastLast;
    if(historyState.past.length === 0) return historyState;
      copyHistoryFuture = [
        ...copyHistoryFuture,
        copyHistoryStatePresent,
      ];
      copyHistoryStatePresent = lastStatePast!;
    return {
    past:  copyHistoryStatePast ,
    present: copyHistoryStatePresent  , 
    future: copyHistoryFuture
  }
}
       
    if(action.type === "REDO"){
        if(historyState.future.length === 0) return historyState;

        let copyHistoryStatePresent = {...historyState.present}
        let copyHistoryStatePast = [...historyState.past]
        let copyHistoryFuture = [...historyState.future]
        let lastElOfArrFuture = copyHistoryFuture.pop() 
            
        copyHistoryStatePast = [...copyHistoryStatePast , copyHistoryStatePresent]
        copyHistoryStatePresent = lastElOfArrFuture

        return {past: copyHistoryStatePast, present: copyHistoryStatePresent , future: copyHistoryFuture}
    } 
        if(action.type === "COPY"){
          console.log("action" , action.payload);
          const bothOldAndNext = action.payload
          console.log(bothOldAndNext.nextBoardId);
          const nextBoardId = bothOldAndNext.nextBoardId
            let copyPast = [...historyState.past  ]
            let copyFuture = [...historyState.future]
            let copyPresent = {...historyState.present}


            let copyPresentBoardIds = [...historyState.present.boardIds  ]
            let copyPresentBoards = {...historyState.present.boards }
            
            let copyPresentColumnIds = [...historyState.present.columnIds]
            let copyPresentColumns = {...historyState.present.columns}

            let copyPresentCardIds = [...historyState.present.cardIds]
            let copyPresentCards = {...historyState.present.cards}

            console.log("next" , bothOldAndNext.nextBoardId);
            
          // let newBoardId = copyPresentBoardIds.length > 0 ?  Math.max(...copyPresentBoardIds) + 1 : 1
          copyPresentBoardIds = [...copyPresentBoardIds , nextBoardId]
          copyPresentBoards[nextBoardId] = {boardId: nextBoardId , boardTitle: `dublicate of ${action.payload.boardId}`}

            let oldColumnId = 0
            let newColumnIdToPass = 0
            console.log(copyPresentColumns);
            Object.values(copyPresentColumns).forEach((column) => {
                if(Number(action.payload.boardId) === column.boardId){
                let newColumnId = copyPresentBoardIds.length > 0 ?  Math.max(...copyPresentColumnIds) + 1 : 1;
                copyPresentColumnIds = [...copyPresentColumnIds , newColumnId]

                  copyPresentColumns[newColumnId] = {
                    ...column ,
                    boardId: nextBoardId ,
                    columnId:  newColumnId ,
                  
                  }
                  oldColumnId = column.columnId
                  newColumnIdToPass = newColumnId
                    }
              })
                  
              Object.values(copyPresentCards).forEach((card) => {
                if(card.columnId === oldColumnId){
                let newCardId = copyPresentBoardIds.length > 0 ?  Math.max(...copyPresentCardIds) + 1 : 1;
                copyPresentCardIds = [...copyPresentCardIds , newCardId]

                copyPresentCards[newCardId] = {
                  ...card ,
                  columnId: newColumnIdToPass ,
                  cardId: newCardId,
                  cardTitle: "hahhhah"
                }
                }
              })
            return {past: copyPast  , present:{...copyPresent , boardIds: copyPresentBoardIds  , boards: copyPresentBoards ,  columns: copyPresentColumns , columnIds: copyPresentColumnIds , cards: copyPresentCards , cardIds: copyPresentCardIds } , future: copyFuture }
        }
const newPresent = reducer(historyState.present, action);
return {
    past: [...historyState.past, historyState.present],
    present: newPresent,
    future: []
};
}
