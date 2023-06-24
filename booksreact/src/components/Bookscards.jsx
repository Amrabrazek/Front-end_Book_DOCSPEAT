import axios from "axios";
import { UserContext } from '../context'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';


export function Bookscards(prop) {
  
  const author_id =  useContext(UserContext) 
  // console.log(author_id)
  const [books, setBooks] = useState([]);
  let apiUrl = 'http://127.0.0.1:8000/api/book'


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
            const filteredBooks = res.data.filter(book => book.author == author_id);
            setBooks(filteredBooks);
          })
          .catch(err => {
            console.log(err);
          });
      };
  }, []);


  return (
    
    <div className="d-flex justify-content-center">
      {books.length === 0 ? 
      (<div>no books</div>) : 
      (<div className="container m-4 d-flex flex-wrap justify-content-center align-items-center">
            {books.map((book) => ( <div><Mycard key={book.id} book={book} /></div>))}
      </div>)}
          
    </div>

  )
}
