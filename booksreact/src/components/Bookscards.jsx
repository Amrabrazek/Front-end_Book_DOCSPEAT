import axios from "axios";
import { UserContext, ProductsContext } from '../context'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';


export function Bookscards(prop) {

  const author_id =  useContext(UserContext) 
  console.log(author_id)
  
  // let {author_id} = prop
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // getting the author books
    axios
      .get(`http://127.0.0.1:8000/api/book`)
      .then(res => {
        const filteredBooks = res.data.filter(book => book.author.id == author_id);
        setBooks(filteredBooks);
      })
      .catch(err => {
        console.log(err);
      });
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
