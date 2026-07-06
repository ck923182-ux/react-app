import { useState } from "react";

function ReactUseState() {
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(0);
  const [reset , setReset] = useState(10);
  const [car,setCar]= useState({
    brand: "Fourd",
    model:"Mustange",
    year:"2000",
    color:"red"
  });
  
  const updateColor = ()=>{
    setCar(prestate =>{
      return {...prestate, color:"blue" , year:"2020"}
    })
  }

  const [bca , setBca] = useState({
    namee:"chandan",
    rollno :2222,
    room: 143,
    year: 2000
  });

  const updatebca = () =>{
    setBca(pre =>{
      return {...pre, rollno:333 , room:0}
    })
  }
  return (
    <div className="container">
      <h1>Start UseState Hook </h1>
      <p>Count value {count}</p>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Update count value using setCount function{" "}
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Update count value using setCount function{" "}
        </button>
      </div>
      <div className="like">
         <p>Like {like}</p>
        <button onClick={()=>{setLike(like + 2)}}>Increase LIke</button>
        <button onClick={()=>{setLike(like - 2)}}>Decrease LIke</button>
      </div>
      <div className="reset">
        <p>Reset Count {reset}</p>
        <button onClick={()=>{setReset(0)}}>reset Button </button>
      </div>
      <div className="car">
        <p>my car brand {car.brand} Model {car.model} Year {car.year} Color {car.color}</p>
              <button onClick={updateColor}>Update Object value </button>

      </div>
      <div className="bca">
        <p>My Name is {bca.name} my rool number {bca.rollno} and my room number {bca.room} and year {bca.year}</p>
        <button onClick={updatebca}>Update object value </button>
      </div>
    </div>
  );
}
export default ReactUseState;
