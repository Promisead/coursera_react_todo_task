import { useState } from "react"

function New(){
const [count,setCount] = useState(0)
const handleDecrease = (e) =>{
 console.log ("clicked")
    setCount (count - 1)
    e.preventDefault()
}
const handleIncrease = () =>{
    console.log ("clicked")
    setCount (count + 1) 


}

    return(
        <div>
            <button onClick={handleDecrease}>-</button>
            <p>{count}</p>
            <button onClick={handleIncrease}>+</button>
        </div>
    )
}

export default New