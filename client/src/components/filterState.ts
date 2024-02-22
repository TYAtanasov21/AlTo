import { useState, Dispatch, SetStateAction } from "react";

export interface FilterState {
  filter: number;
  setFilter: Dispatch<SetStateAction<number>>;
}
 
export const useFilterState = (): FilterState => {
  const [filter, setFilter] = useState(0);
  return { filter, setFilter };
};