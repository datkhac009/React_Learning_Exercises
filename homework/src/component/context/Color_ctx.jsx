import { createContext, useContext, useEffect, useState } from "react"

const ColorContext = createContext()
function Color_ctx({children}) {
    const [fakeDark,setFakeDark] = useState("")
useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode",fakeDark)      
}, [fakeDark])
    
const value = {fakeDark,setFakeDark}
    return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
}
function useColor(){
    const c = useContext(ColorContext)
    if(!c) throw new Error("Error ColorContext.Provider");
    return c;
} 
export {Color_ctx,useColor}


