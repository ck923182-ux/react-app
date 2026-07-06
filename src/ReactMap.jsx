function ReactMap() {
  const arr = ["chandan", "rahul", "amit"];
  const fruitlist = ["apple", "banana", "cherry"];
  const list = ["apple", "banana", "cherry"];

  const users1 = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
  ];

  function objectfun(users1) {
    return (
      <li>
        name :{users1.name} age : {users1.age}
      </li>
    );
  }

  const users = [
    { id: 1, name: "Chandan", age: 26 },
    { id: 2, name: "harneet", age: 31 },
    { id: 3, name: "ritick", age: 22 },
  ];
  function spelist(list, index) {
    return (
      <li className="lis" id={index}>
        {list}
      </li>
    );
  }
  const u1 = [{ id: 1, name: "Aman", age: 25, msg: "love" }];

  function newarr(itme) {
    return <li>{itme.name.toUpperCase()} </li>;
  }
  const students = [
    { id: 1, name: "Rahul", marks: 80 },
    { id: 2, name: "Priya", marks: 45 },
    { id: 3, name: "Karan", marks: 60 },
  ];

    function result (res){
  
      if(res.marks > 50){
        console.log("fail");
        return  <li>pass : {res.name}</li>
      }else{
        return  <li> Fail : {res.name}</li>
      }

    }
  return (
    <div className="container">
      <h1>React List Rendering and React map function </h1>
      {arr.map((arr, index) => ((<h5>{index}</h5>), (<h5>{arr}</h5>)))}
      {fruitlist.map((getData) => (
        <li>{getData}</li>
      ))}
      <div className="test">{list.map(spelist)}</div>
      <div className="object">
        <ul>
          {users.map((users) => (
            <li id={users.id}>
              {" "}
              Nme: {users.name} age : {users.age}
            </li>
          ))}
        </ul>
      </div>
      <div className="objectsepeart">
        <ul>{users1.map(objectfun)}</ul>
      </div>
      <div className="Ui">
        <ul>{u1.map(newarr)}</ul>
      </div>
      <div className="studetnresult">
        {students.map(result)}
      </div>
    </div>
  );
}
export default ReactMap;
