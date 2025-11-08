import { Outlet } from "react-router-dom"
import NavBar from "../features/ui/NavBar"
import ToggleDarkMode from "../features/ui/ToggleDarkMode"


function Mainlayout() {
    return (
        <div>
            <header>
            <ToggleDarkMode />
            <NavBar />
            </header>
            <main>
            <Outlet />
            </main>
        </div>
    )
}

export default Mainlayout
