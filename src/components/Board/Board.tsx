import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import styles from './Board.module.css'
import { ColumnComponent } from "../ColumnComponent/Column";
import { BoardComponent } from "../BoardComponent/BoardComponent";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function Board () {

const { boardId } = useParams()
useEffect(() => {
localStorage.setItem('boardId' , boardId) 
}, [boardId])

const context = useContext(BoardContext)
if(!context) return null
const { state } = context


    const[searchQuery , setSearchQuery] = useState<string>('')
    console.log(searchQuery);
    console.log(state.cardIds);
    
      const filteredCards = !searchQuery ?  state.cardIds : Object.values(state.cardIds).filter((el) => {
      if(state.cards[el].cardTitle.toLocaleLowerCase().trim().includes(searchQuery.toLowerCase().trim())){
              return el
            }
        })  
//фильтр по тегам
// теги хранятся в initialState
// tags: ['forntend' , 'backend']
// tagIds: [1 , 2]
// 
// нажимаю на кнопку add new tag
// кнопка пропадает
// появляется input --> dispatch 
// в редюсере добавляется   tagId  и нововведенный tag  (потом сделать dragNdrop )
// в карточке кнопка через которую можно добавить tag для карточки в поле cardTags[] 
// 
    return (
        <>
        <div className={styles.boardCard}>
          <SearchComponent 
          searchQuery = {searchQuery} 
           state={state}
            setSearchQuery={setSearchQuery}
            />
            <div className={styles.board}>
                <BoardComponent boardId={boardId} />
            </div>
<ul>
    <li className={styles.columns}>{state.columnIds.map((columnId) =>
  state.columns[columnId].boardId === Number(boardId) && (
    <ul key={columnId}>
        <li>
      <ColumnComponent
      filteredCards={filteredCards}
      searchQuery={searchQuery}
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