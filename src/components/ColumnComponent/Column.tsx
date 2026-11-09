import { useContext, useState } from "react";
import { BoardContext } from "../Shared/Context/BoardContext/BoardContext";
import { CardComponent } from "../CardComponent/CardComponent";
import styles from "./Column.module.css";
import type { CardsType } from "../Shared/Types/ReducerStateType";

type ColumnComponentProps = {
  columnId: number,
  filteredCards: CardsType[] | number[],
  searchQuery: string
};

export function ColumnComponent({ columnId , filteredCards , searchQuery}: ColumnComponentProps) {
  const context = useContext(BoardContext);

  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [inputColumnValue, setInputColumnValue] = useState("");

  if (!context) return null;

  const { state, dispatch } = context;
  const column = state.columns[columnId];

  if (!column) return null;

  return (
    <div className={styles.columns} style={{border:"4px solid red"}}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }}
  onDrop={(event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const cardId: number = Number(event.dataTransfer.getData("cardId")) 
    console.log(cardId);
    dispatch({type:'drag_card' , payload: { cardId , columnId }})
  }}
    >
      <ul>
        <li>{column.columnTitle}</li>
        <li>{column.columnId}</li>

        <li>
          <button onClick={() => setIsEditingColumn(!isEditingColumn)}>
            Rename column
          </button>
        </li>

        {isEditingColumn && (
          <li>
            <input
              type="text"
              value={inputColumnValue}
              onChange={(e) => setInputColumnValue(e.target.value)}
              placeholder="Enter column title"
            />

            <button
              onClick={() => {
                dispatch({
                  type: "rename_column",
                  payload: {
                    columnId,
                    inputColumnValue,
                  },
                });

                setIsEditingColumn(false);
                setInputColumnValue("");
              }}
            >
              Apply new title
            </button>
          </li>
        )}

        <li>
          <button
            onClick={() =>
              dispatch({
                type: "delete_column",
                payload: columnId,
              })
            }
          >
            Delete column
          </button>
        </li>

        <li>
          <button
            onClick={() =>
              dispatch({
                type: "add_card",
                payload: columnId,
              })
            }
          >
            Add card
          </button>
        </li>
      </ul>

      <CardComponent  filteredCards={filteredCards}columnId={columnId} searchQuery={searchQuery} />
    </div>
  );
}