import React, {useContext, useState, useEffect} from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserContext, TypeContext } from '../context'
import './mynav.css';
import axios from 'axios';

export  function Mynav() {

  const author_id =  useContext(UserContext) 
  let user = author_id
  const type =  useContext(TypeContext) 
  // console.log(author_id)



  const [isAuth, setIsAuth] = useState(false);
  // check if there is a a logged in user 
  // console.log(localStorage.getItem('access_token') !== "")
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);




  let navigate = useNavigate();
  function goHome() {
    navigate(`/admin/${user}/home`);
  }

// using 
  // let logout = () => {  
  //   axios
  //         .post(`http://127.0.0.1:8000/api/dj-rest-auth/logout/`)
  //         .then((response) => {
  //             console.log("done logout!");
  //           })
  //         .catch(err => {
  //             console.log(err.response.data)
  //           });

  //   navigate(`/login`)
  // }

  return (
    <div className='my-3'>


      <div>
      <div className="navTop align-items-center d-flex">
        <div className="navLogo" onClick={goHome}>
          Books
        </div>

        { type=="author"? 
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
        </svg>:
        null }

        <div className="cart">
          
          <NavLink className="nav-link" to={`/`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
            </svg>
          </NavLink >


          <NavLink className="nav-link" to={`/book/add`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
          </NavLink >

            <NavLink className="nav-link" to={`/profile/${user}`}>
              <div className='d-flex dropdown' >
                <strong className='m-1  fs-5'>{user}</strong>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
              </div>
            </NavLink>
            

            <Nav.Link href="/logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-door-closed-fill" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </Nav.Link>

{/*             
            <div className='d-flex cursor-pointer' onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-door-closed-fill" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </div>
             */}


        </div>
      </div>
      <div className="navBottom"></div>
    </div>
    </div>
    
  )
}
