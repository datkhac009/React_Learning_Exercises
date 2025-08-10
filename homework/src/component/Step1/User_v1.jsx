function User_v1({dataUser,increase ,age}) {
    console.log(dataUser)
    return (
        <div>
            <p>User name: {dataUser.name}</p>
            <p>Age: {age} <button onClick={increase}> + </button></p>
        </div>
    )
}

export default User_v1
