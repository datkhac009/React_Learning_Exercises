import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div>
            <Link to ='/'>Home Page</Link>
            <Link to ='/createuser'>CreateUser</Link>
        </div>
    )
}

export default NavBar
