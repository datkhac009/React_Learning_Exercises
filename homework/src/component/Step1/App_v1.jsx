
import { useState } from 'react';
import User_v1 from './User_v1';

const user = {
    name : "Nguyen khac dat",
    age : 22
}
function App_v1() {
    const [count , setCount] = useState(user.age)
    // function handleIncrease(){
    //    setCount((prev) => prev + 1)
    // }
    return (
        <div>
            <User_v1 test ="Test" dataUser = {user} age = {count} setCount = {setCount}/>
        </div>
    )
}

export default App_v1
