import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import { authApi } from "../../api/authApi";
import "./loginComponent.css";
import axios from 'axios';


export function LoginComponent() {
    const navigate = useNavigate();
    // const { authUser, setAuthUser } = useContext(AuthContext);


  // create state for formValues to watch changes
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });

  // create state for formErrors
    const [error, setError] = useState({
        submit: false,
        username: false,
        password: false,
    });

  // handle the input fields and change the fromValues according to current input
    const inputHandler = (e) => {
        setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
        });
        console.log(formValues)
    };


  //validate the user input when leave the input field
  //set the errors
    const validation = (e) => {
    const regex = {
        username: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[\w]{2,3}$/g,
        password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

    //handle the form submit, then login if valid
    const submitHandler = async (e) => {
        e.preventDefault();
      
        axios
          .post(`http://127.0.0.1:8000/api/dj-rest-auth/login/`, formValues)
          .then((response) => {
              console.log("done!");
              navigate(`/home`);
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

        // try {
        //   let user = await authApi.getUser(
        //     formValues.email.toLowerCase(),
        //     formValues.userType,
        //   );
    
        //   let resObj1 = loginJS.checkDataIsWrongBeforeLogin(user, formValues);
    
        //   let resObj2 = await loginJS.checkIfUserIsActive(user);
    
        //   if (resObj1.success == "false" || resObj2.success == "false") {
        //     let msg = resObj1.success == "false" ? resObj1.msg : resObj2.msg;
        //     setError({
        //       ...error,
        //       submit: true,
        //       submitText: msg,
        //     });
        //     setTimeout(() => {
        //       setError({
        //         ...error,
        //         submit: false,
        //         submitText: "",
        //       });
        //     }, 1000);
        //     return;
        //   }
    
        //   setAuthUser({ ...user });
    
        //   user.type === "admin"
        //     ? navigator(`/admin/${user.userName}/home`)
        //     : navigator("/");
        // } catch (e) {
        //   return;
        // }
        };
    

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-dark">EHCO</h1>
      <Form
        onSubmit={submitHandler}
        className="login-form bg-dark p-5 d-flex flex-column"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* Email Field */}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={inputHandler}
            onBlur={validation}
            type="email"
            placeholder="Enter email"
            name="email"
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
            onChange={inputHandler}
            onBlur={validation}
            type="password"
            placeholder="Password"
            name="password"
            className={`${
              error.password ? "border border-3 border-danger" : ""
            }`}
            required
          />
          {error.password && (
            <ul className="password-list text-danger m-0 p-2">
                <li>passwort length at least 8</li>
                <li>at least one uppercase</li>
                <li>at least one lowercase</li>
                <li>at least one special character</li>
            </ul>
            )}
        </Form.Group>

        {/* User Type Radio Buttons */}
        <Form.Group
          className="mb-3 d-flex justify-content-around"
          controlId="formBasicCheckbox"
        >
          <label htmlFor="admin">
            <input
              type="radio"
              name="userType"
              id="admin"
              value="admin"
              onClick={inputHandler}
              required
            />{" "}
            Admin
          </label>
          <br></br>
          <label htmlFor="customer">
            <input
              type="radio"
              name="userType"
              id="customer"
              value="customer"
              onClick={inputHandler}
              required
            />{" "}
            Customer
          </label>
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
      </Form>
    </div>
  );
}
