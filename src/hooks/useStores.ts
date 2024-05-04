import { useContext } from "react";
import { RootState } from "../stores/RootState";
import { StoreContext } from "../stores/StoreContext";

export function useStores(): RootState {
    return useContext(StoreContext);
}