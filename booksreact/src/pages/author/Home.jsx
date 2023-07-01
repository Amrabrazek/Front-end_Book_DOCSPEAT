import React, { useState, useEffect, useContext } from 'react';
import { Bookscards } from '../../components/Bookscards';
import { Slider } from '../../components/Slider';
import { UserContext, TypeContext} from '../../context'
import axios from "axios";
export function Home() {

  const user_id =  useContext(UserContext)[0]
  // console.log(user_id)
  const user_type =  useContext(TypeContext)[0]
  // console.log(user_type)
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  let apiUrl = ""
  if (user_type == 'author') {
    apiUrl = `http://127.0.0.1:8000/book/authorbooks/${user_id}`
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

        <div>
            <Slider books={books} ></Slider>
            <h1>Books</h1>
            <Bookscards books={books}></Bookscards>
        </div> 

        
    </div>
);
}