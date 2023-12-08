import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";

const Register = () => {
  //1step: creating a state variable
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // step 2 : Create a function for changing the state variable
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  //handle after clicking the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    //step1: check data in console
    console.log(firstname, lastname, email, password);
    //creating json data()
    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    };
    //send data to backend
    registerApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)

        }
      })
      .catch((err) => {
        console.log(err);
        toast.success("Internal server error")
      });
  };
  return (
    <>
      <h1 className="m-3">Create an Account!</h1>
      <form className="m-3 w-25">
        <label> Firstname </label>
        <input
          onChange={changeFirstName}
          className="form-control  mb-2"
          type="text"
          placeholder="Enter your firstname"
        />
        <label>Lastname</label>
        <input
          onChange={changeLastName}
          type="text"
          className="form-control mb-2"
          placeholder="Enter your lastname"
        />
        <label>Email</label>
        <input
          onChange={changeEmail}
          type="text"
          className="form-control mb-2"
          placeholder="Enter you Email"
        />
        <label>Password</label>
        <input
          onChange={changePassword}
          type="text"
          className="form-control mb-2"
          placeholder="Enter you password"
        />
        <button className="btn btn-danger w-100" onClick={handleSubmit}>
          Submit
        </button>
        <a href="" className="text-decoration-done text-black">
          Already have an account?
        </a>
      </form>
    </>
  );
};

export default Register;
