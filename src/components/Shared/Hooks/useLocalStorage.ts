


import { useEffect, useState } from "react";
import type { HistoryStateType } from "../ReducerForHotKeys/ReducerForHotKeys";

export function useLocalStorage(key: string, historyState: HistoryStateType) {

  const[debounceState , setDebounceState] = useState<HistoryStateType>()

  useEffect(() => {
const timer = setTimeout(() => {
  setDebounceState(historyState)
}, 100);

  return () => clearTimeout(timer)

  }, [key , historyState])


useEffect(() => {

  if(!debounceState) return;

localStorage.setItem(key , JSON.stringify(debounceState))

}, [debounceState])
}
