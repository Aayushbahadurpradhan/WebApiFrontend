import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Api";
import { json } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function'

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    //step1: check data in console
    console.log(email, password);
    //creating json data()
    const data = {
      email: email,
      password: password,
    }
    //send data to backend
    loginApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message)
        } else {
          toast.success(res.data.message)
          // set token 
          localStorage.setItem("token",res.data.token)
          //convering incoming json
          const convertedJson=JSON.stringify(res.data.userData)
          localStorage.setItem("user",convertedJson)
        }
      })
      .catch((err) => {
        console.log(err)
        toast.success("Server error");
      });
  };
  return (
    <div>
      <>
        <h1 className="m-3">Sign in to your Account!</h1>
        <form className="m-3 w-25">
          <label>Email</label>
          <input
            onChange={changeEmail}
            className="form-control mb-2"
            type="email"
            placeholder="enter your email"
          />
          <label>Password</label>
          <input
            onChange={changePassword}
            className="form-control mb-2"
            type="password"
            placeholder="enter your password"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-outline-primary w-100"
          >
            Submit
          </button>
        </form>
      </>
    </div>
  );
};

export default Login;
