import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import { authApi } from "../../api/authApi";
import "./loginpage.css";
import axios from 'axios';


export function Loginpage() {
    const navigate = useNavigate();
    // const { authUser, setAuthUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({
      submit: false,
    });

     // Create the submit method.
    const submitx = async e => {
        e.preventDefault();
        const user = {
                email: email,
                password: password
                };
        // console.log("0000000000000000000000")
        // console.log(user)

        // Create the POST requuest
        try{
          const { data } = await axios.post('http://localhost:8000/token/', user,
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
          );
          console.log(data)

                   // Initialize the access & refresh token in localstorage.      
          localStorage.clear();
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          axios.defaults.headers.common['Authorization'] = 
                                          `Bearer ${data['access']}`;
          window.location.href = '/reg'
          } 
        catch (err) {
          console.log(err);
          setError({
            submit: true,
          });
        }
    }


    const submit = async e => {
      e.preventDefault();
      const user = {
        email: email,
        password: password
      };
    
      try {
        const { data } = await axios.post('http://localhost:8000/token/', user, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
    
        // Store the access and refresh tokens in local storage
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
    
        // Set the Authorization header for all subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        
        

        // Redirect to the home page
        window.location.href = '/reg';
      } catch (err) {
        console.log(err);
        setError({
          submit: true,
        });
      }
    };



  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-dark">BOOKS</h1>
      <Form
        onSubmit={submit}
        className="login-form bg-dark p-5 d-flex flex-column"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* Email Field */}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={e => {setEmail(e.target.value)}}
            type="email"
            placeholder="Enter email"
            name="username"
            className={`${error.email ? "border border-3 border-danger" : ""}`}
            required
          />
          {error.email && (
            <p className="text-danger mx-2 my-2">Not a valid email</p>
          )}
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={e => {setPassword(e.target.value)}}
            type="password"
            placeholder="Password"
            name="password"
            className={`${
              error.password ? "border border-3 border-danger" : ""
            }`}
            required
          />
          {error.password && (
            <dir>incorrect password</dir>
            )}
        </Form.Group>

        {/* Login Button */}
        <Button
          variant="primary"
          type="submit"
          className="login-btn w-75 mx-auto"
        >
          Login
        </Button>
        {error.submit && (
          <p className="text-danger align-self-center py-2">
            {error.submitText}
          </p>
        )}

        {/* Register Button */}
        <div className="my-3 w-100">
          <p className="register-text text-center  w-100">
            First time? : Join us now{" "}
            <span onClick={()=> {navigate(`/register`)}} className="lead">
              Register
            </span>
          </p>
        </div>

        {error.submit && (
          <p className="text-danger align-self-center py-2">
            Invalid Compination !!
          </p>
        )}
      </Form>
    </div>
  );
}
