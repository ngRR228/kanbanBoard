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
    cardIds: number[]

}