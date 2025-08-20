import { useColor } from "../context/Color_ctx"

function App_v8() {
    const {fakeDark,setFakeDark} = useColor()

    return (
        <div>
            <button onClick={() => setFakeDark((c)=>!c )}>
                {fakeDark ? "☀" :"🌙"}
            </button>
        </div>
    )
}

export default App_v8
