import { useColor } from "../context/Color_ctx"

function App_v8() {
    const {fakeDark,setFakeDark} = useColor()

    return (<>

        <h2>Dark mode</h2>
        <div>
            <button onClick={() => setFakeDark((c)=>!c )}>
                {fakeDark ? "☀" :"🌙"}
            </button>
        </div>
    </>
    )
}

export default App_v8
