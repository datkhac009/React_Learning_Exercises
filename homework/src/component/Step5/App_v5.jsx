import { useEffect, useState } from "react"
import Time from "./Time";

function App_v5() {
    const [time , setTime] = useState(new Date())
    useEffect(() => {
        
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000);
    
      return () => clearInterval(timer)
    }, [time])
    
    return (
        <div>
        <Time time = {time.toLocaleTimeString()}/>
          
        </div>
    )
}

export default App_v5
