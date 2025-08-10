
import { useState } from 'react';
import User_v1 from './User_v1';

const user = {
    name : "Nguyen khac dat",
    age : 22
}
function App_v1() {
    const [count , setCount] = useState(user.age)
    function handleIncrease(){
       setCount((prev) => prev + 1)
    }
    return (
        <div>
            <User_v1 dataUser = {user} age = {count} increase = {handleIncrease}/>
        </div>
    )
}

export default App_v1
