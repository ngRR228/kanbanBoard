interface BoardsType {
    boardId : number ,
    boardTitle: string
}

interface ColumnsType {
    boardId: number ,
    columnId: number ,
    columnTitle: string
}

interface CardsType {
    columnId: number ,
    cardId: number , 
    cardTitle: string
}

export interface State {
   boards: Record<number ,BoardsType> ,
    boardIds: number[] ,

    columns: Record<number , ColumnsType> ,
    columnIds: number[] ,

    cards: Record<number , CardsType> ,
    cardIds: number[] ,
}
type RenameBoardType = {
    boardId: string  ,
    inputBoardsValue: string
 }

type RenameColumnType = {
    columnId: number ,
    inputColumnValue: string
}
type RenameCardType = {
    cardId: number ,
    inputCardValue: string 
}
type DragCardType = {
    cardId: number ,
    columnId: number
}
export type Action = 
    | {type:"delete_column" , payload: number}
    | {type:"delete_card" , payload: number}
    | {type:"delete_board" , payload: number}
    | {type:"add_card" , payload: number}
    | {type:"add_column" , payload: number}
    | {type:"add_board" , payload: number}
    | {type:"rename_board" , payload: RenameBoardType}
    | {type:"rename_column" , payload: RenameColumnType}
    | {type:"rename_card", payload: RenameCardType }
    | {type:"drag_card" , payload: DragCardType}
    | {type: "UNDO"}
    | {type: "REDO"}