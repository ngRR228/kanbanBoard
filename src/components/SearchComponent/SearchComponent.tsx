import type { State } from "../Shared/Types/ReducerStateType";

type SearchComponentProps = {
   searchQuery: string ,
   state:State ,
   setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}
export default function SearchComponent ({ searchQuery  , setSearchQuery}:SearchComponentProps) {


    
    return(
        <input type="text" value={searchQuery} onChange={(e) =>{
             setSearchQuery(e.target.value);
        }} />
    )
}