function User_v1({dataUser,age ,test ,setCount}) {
    console.log(test)
    console.log(dataUser)
    return (
        <div>
            <p>User name: {dataUser.name}</p>
            <p>Age: {age} <button onClick={() => setCount((prev)=> prev + 1)}> + </button></p>
        </div>
    )
}

export default User_v1
