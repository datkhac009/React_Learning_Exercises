import { useState } from "react"

function useCounter({counter}) {
    console.log(counter)
    const [count,setCount] = useState(counter)
    
    function decrease(){
        setCount((count) => count - 1);
    }
    function increase(){
        setCount((count) => count + 1);
    }
    function reset(){
        setCount(counter);
    }
    return {count,decrease,increase,reset}
}

export default useCounter
