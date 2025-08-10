function Status({user  ,handleStatus }) {
    console.log(user.done)
    return (
        <div>
            <p className={user.done ? "check" : ""}>{user.statusName} <button onClick={()=>handleStatus(user.statusName)}>Done</button></p>
        </div>
    )
}

export default Status
