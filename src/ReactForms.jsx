import { useState } from "react";

function ReactForms() {
  const myStyle = {
    margin: "15px auto",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [submittedData, setSubmittedData] = useState({
    name: "",
    email: "",
  });

  const handelchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
    console.log("Submitted:", form);
    setForm({
      name:"",
      email:""
    });
  };
  return (
    <div style={myStyle}>
      <h1>React Form </h1>
      <form action="" onSubmit={handelsubmit}>
        Name:{" "}
        <input
          style={myStyle}
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter your name"
          onChange={handelchange}
        />
        <br></br>
        Email:{" "}
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="Enter your Email"
          onChange={handelchange}
        />
        <button type="submit">submit</button>
      </form>

      <h4> your name is : {form.name} </h4>
      <h4>Your Email is : {form.email}</h4>
      {/* 3. Display the submittedData instead of the active form state */}
      <hr />
      <h4>Your submitted name is: {submittedData.name}</h4>
      <h4>Your submitted Email is: {submittedData.email}</h4>
    </div>
  );
}

export default ReactForms;
