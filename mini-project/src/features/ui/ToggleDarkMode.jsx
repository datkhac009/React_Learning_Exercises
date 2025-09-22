import useTheme from "../context/useTheme"

function ToggleDarkMode() {
        const {mode ,toggler} =  useTheme()
    return (
        <div>
            <button onClick={toggler} className="btn-darkmode">
              <p>{mode ? "☀️" : "🌑"}</p>  
            </button>
        </div>
    )
}

export default ToggleDarkMode
