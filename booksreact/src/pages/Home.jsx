import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { Bookscards } from '../components/Bookscards';
import { Slider } from '../components/Slider';
import { RenewableEnergy } from '../components/RenewableEnergy';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';
import { UserContext, TypeContext} from '../context'
import axios from "axios";
export function Home() {

  const user_id =  useContext(UserContext)[0]
  const user_type =  useContext(TypeContext)[0]
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  let apiUrl = ""
  if (user_type == 'author') {
    apiUrl = `http://127.0.0.1:8000/book/authorbooks/${user_id}`
    console.log(apiUrl)
  }
  else {
    apiUrl = `http://127.0.0.1:8000/book/`
  }
  

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
    else{
        axios
        .get(apiUrl,
          {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
          })
        .then(res => {
          setBooks(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    };
}, []);

if (isLoading) {
  return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
}

return (
    <div>
      {books.length === 0 ? 
      (<div>
        <h1>Are you Ready to start Writing?</h1>
        <NavLink className="nav-link m-5 text-success" to={`/book/add`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </NavLink >
      </div>) :
      
        <div>
            <Slider books={books} ></Slider>
            <h1>Books</h1>
            <Bookscards books={books}></Bookscards>
        </div> 
      }

      <RenewableEnergy />
      <ContactUs />
      <Footer />
        
    </div>
);
}