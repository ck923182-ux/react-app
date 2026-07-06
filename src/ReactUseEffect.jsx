import { useEffect, useState } from "react";

function ReactUseEffect() {
  const [cunt, setCout] = useState(0);
  useEffect(() => {
    console.log("user effect load after componnet render ");
  }, []);

  const [like, setLike] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLike((like) => like + 1);
    }, 1000);
  }, []);

  const [count, setCount] = useState(0);
  const [calculater, setCalculater] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCalculater(() => count * 2);
    }, 1000);
  }, [count]);

  const [posts, setPost] = useState([]);

  // useEffect(()=>{
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((r)=>{
  //       console.log(r)
  //      return r.json();
  //   })
  //   .then((d)=>setPost(d));

  // },[]);

  const [student, setStudent] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((data) => {
          console.table(data); 
          console.log("Keys:", Object.keys(data[0])); 

        setStudent(data);
      });
  }, []);

  const[view ,setView] = useState(0);
  useEffect(()=>{
      setTimeout(() => {
        setView((view)=>view + 1);
      }, 1000);
  })
  return (
    <div className="container">
      <div className="row">
        <h2>React UseEffect Hooks view: {view}</h2>
        <p>count {cunt}</p>
        <button onClick={() => setCout(cunt + 1)}> count</button>
        <p>Like {like}</p>
        <p>count {count}</p>
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          {" "}
          +{" "}
        </button>
        <p>calculater {calculater}</p>
        {posts.slice(0, 5).map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
        <div className="user">
          <ul>
            {student.slice(0, 5).map((usee) => (
              <div className="usr">
                <h4>User name List</h4>
                <li>{usee.name}</li>
                <li>{usee.email}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ReactUseEffect;
