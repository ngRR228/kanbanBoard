import type { State , Action } from "./ReducerStateType";
import type { HistoryAction } from "../ReducerForHotKeys/ReducerForHotKeys";
type AppAction =  Action | HistoryAction

export interface BoardContextType {
    state: State ,
    dispatch: React.Dispatch<AppAction>
}