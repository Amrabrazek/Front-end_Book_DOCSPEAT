import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext} from '../context'
import { Carousel } from "react-bootstrap";
import './slider.css';


export  function Slider() {

const author_id =  useContext(UserContext) 

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
        const filteredBooks = res.data.filter(book => book.author == author_id && book.book_cover);
        setBooks(filteredBooks);
      })
      .catch(err => {
        console.log(err);
      });
  };
}, []);


  return (
    <div>
      {books.length == 0 ? 
      (<div></div>) : 
      (<Carousel>
        {books.map((book) => {
          return <Carousel.Item className='carousel-itemx' key={book.id}  interval={2000}>
            <img 
              className="carousel-image"
              src= {`${book.book_cover}`}
              alt="dawdwad"
            />
              <Carousel.Caption className="text-dark">
                <h3>{book.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          })}
    </Carousel>)}
        
    </div>
  )
}
