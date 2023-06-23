import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import { authApi } from "../../api/authApi";
import "./register.css";
// import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';



export function RegisterPage() {

  const [users, setUsers] = useState({});

  useEffect(() => {
    // getttin the author info 
    axios
        .get(`http://127.0.0.1:8000/api/user`)
        .then(res => {
        setUsers(res.data);
        console.log(users)
    })
        .catch(err => {
        console.log(err);
    });
}, []);

  const navigate = useNavigate();

  //set the formValues state
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
});

  //set the error and validations state
  const [error, setError] = useState({
    submit: false,
    username: false,
    email: false,
    password1: false,
    password2: false,
  });

  // handle the input fields and change the fromValues according to current input
  const inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
      
    });
    console.log(formValues)
  };

  //handle the form submit, then login if valid
  
  //validate the user input when leave the input field
  //set the errors
  const validation = (e) => {
    
    console.log("valid?")
    const regex = {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[\w]{2,3}$/g,
      username:/^[a-zA-Z0-9_-]{5,15}$/,
      password1: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };
      const name = e.target.name;
      const value = formValues[name];
      const check = regex[e.target.name].test(value);
      
      setError({
        ...error,
        [e.target.name]: false,
      });

      if (!check) {
        setError({
          ...error,
          [e.target.name]: true,
        });
      }
  };

  // Check Password again and confirm that both passwords do match
  const passwordMatchHandler = (e) => {
    setError({
      ...error,
      password2: false,
    });
    
    if (e.target.value != formValues.password1) {
      setError({
        ...error,
        password2: true,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formValues)

    setError({ ...error,
            submit: false, 
            submitText: "" });
    
    // check if there is any errors
    if (error.password1 || error.password2 || error.email || error.username) {

      setError({
        ...error,
        submit: true,
        submitText: "Some Data Aren't Valid",
      });

      setTimeout(() => {
        setError({
          ...error,
          submit: false,
          submitText: "",
        });
      }, 1000);
      return;
    }

    axios
      .post(`http://127.0.0.1:8000/api/dj-rest-auth/registration/`, formValues)
      .then((response) => {
          console.log("done!");
          navigate(`/login`);
        })
      .catch(err => {
          console.log(err.response.data)
          if (err.response.data.email){
            setError({
              ...error,
              submit: true,
              submitText: "Email already registered",
            });
          }
    });

  };
  
  
  return (
    <div className="register d-flex flex-column justify-content-center align-items-center">
      {/* <h1 className="">Register to EHCO</h1> */}
      <h1 className="text-dark">books</h1>
      <Form
        onSubmit={submitHandler}
        className="register-form bg-dark p-5 d-flex flex-column"
      >
        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="email"
            placeholder="Enter email"
            name="email"
            className={`${error.email? "border border-3 border-danger": "" }`}
            required
          />

          {error.email && (
            <p className="text-danger mx-2 my-2">Not a valid email</p>
          )}
        </Form.Group>

        {/* username Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="text"
            placeholder="Enter username"
            name="username"
            className={`${error.email? "border border-3 border-danger": "" }`}
            required
          />

          {error.username && (
            <p className="text-danger mx-2 my-2">username should not be repeated and between [5-15]</p>
          )}
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="password"
            placeholder="Password"
            name="password1"
            className={`${error.password? "border border-3 border-danger": "" }`}
            required
          />
          {error.password1 && (
            <ul className="password-list text-danger m-0 p-2">
              <li>passwort length at least 8</li>
              <li>at least one uppercase</li>
              <li>at least one lowercase</li>
              <li>at least one special character</li>
            </ul>
          )}
        </Form.Group>

        {/* confirmPassword Field */}
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={passwordMatchHandler}
            type="password"
            placeholder="Password"
            name="password2"
            className={`${error.confirmPassword? "border border-3 border-danger": "" }`}
            required
          />
          {error.confirmPassword && (
            <p className="text-danger mx-2 my-2">Password Dosesn't match !!!</p>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="register-btn w-75 mx-auto"
        >
          Register
        </Button>

        {/* Register Button */}
        <div className="my-3 w-100">
          <p className="register-text text-center  w-100">
            Already Registered?{" "}
            <span onClick={()=> {navigate(`/login`)}} className="lead">
              Login
            </span>
          </p>
        </div>

        {error.submit && (
          <p className="text-danger align-self-center py-2">
            {error.submitText}
          </p>
        )}


      </Form>
    </div>
  );
}
