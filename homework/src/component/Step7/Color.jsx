function Color({ setColor ,reset}) {
    const customColor = ["#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
  return (
    <div>
      <input
        type="color"
        aria-label="custom color"
        onInput={(e) => setColor(e.target.value)}
      />
     {customColor.map((color)=>(
        <button
        key={color}
        onClick={() => setColor(color)}
        style={{backgroundColor : color , height : "14px"}}
        >

        </button>
     ))}
      <button onClick={reset}>Reset color</button>
    </div>
  );
}

export default Color;
