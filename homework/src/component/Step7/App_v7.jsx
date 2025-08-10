import { useEffect, useState } from "react";
import "./style.css";
import Color from "./Color";

function App_v7() {
  const [color, setColor] = useState("#ffff");
  useEffect(() => {
    
    document.body.style.backgroundColor = color;
    
  }, [color])
  function retsetColor(){
    setColor("#ffff")
  }
  console.log(color)
  return (
    <div className="app" style={{ backgroundColor: color }}>
      <Color setColor={setColor} reset = {retsetColor}/>
    </div>
  );
}

export default App_v7;
