
import React, { useContext, useState } from "react";
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import type { CardsType } from "../Shared/Types/ReducerStateType";

type CardComponentProps = {
  columnId: number,
  filteredCards: CardsType[] | number[],
  searchQuery: string
};

export function CardComponent({ columnId , filteredCards  }: CardComponentProps) {
  const context = useContext(BoardContext);

  const [isEditingCard, setIsEditingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number>();
  const [inputCardValue, setInputCardValue] = useState("");

  if (!context) return null;

const { state, dispatch } = context;

  return (
<div>
     <ul>
      {filteredCards.map((el) => {
        const cardId = el
        
        const card = state.cards[cardId] 

        console.log(card);
        
        if (!card || card.columnId !== columnId) return null;

        return (
          <li key={cardId} style={{border:"2px solid black"}}  
        draggable 
         onDragStart={(event: React.DragEvent<HTMLLIElement>) => {
            event.dataTransfer.setData("cardId" , String(cardId))
        }}>
            <p>{card.cardTitle}</p>
            <p>{card.cardId}</p>
            <button
              onClick={() => {
                setSelectedCard(cardId);
                setIsEditingCard(
                  selectedCard === cardId ? !isEditingCard : true
                );
              }}
            >
              Rename card
            </button>

            {selectedCard === cardId && isEditingCard && (
              <div>
                <input
                  type="text"
                  value={inputCardValue}
                  onChange={(e) => setInputCardValue(e.target.value)}
                  placeholder="Enter card title"
                />

                <button
                  onClick={() => {
                    dispatch({
                      type: "rename_card",
                      payload: { cardId, inputCardValue },
                    });

                    setIsEditingCard(false);
                    setInputCardValue("");
                  }}
                >
                  Apply new title
                </button>
              </div>
            )}

            <button
              onClick={() =>
                dispatch({
                  type: "delete_card",
                  payload: cardId,
                })
              }
            >
              Delete card
            </button>
          </li>
        );
      })}
    </ul> 
</div>
  );
}
