import { useContext } from "react";
import { ThemeContext } from "./Themectx"

export default function useTheme(){
    const ctx = useContext(ThemeContext)
    return ctx;
}
