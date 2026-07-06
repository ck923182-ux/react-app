function ReactEvent(){

    // const shoot = () =>{
    // alert("shoot grat");
    // }

    // With Passing Arguments
    // const shoot = (a) =>{
    //     alert(a)
    // }
    const shoot = (a,b,e) =>{
        alert(b.type);
    }
    return (
        <div>
            <h1>React Event </h1>
            {/* <button onClick={shoot}>Click </button> */}
            {/* <button onClick={() => shoot("goal with argement ")}>Click with argument  </button> */}
            <button onClick={() => shoot("goal with argement ")}>Click with argument  </button>
            <button onClick={(e) => shoot("Goal!", e)}>Take the shot!</button>

        </div>
    );
}

export default ReactEvent;