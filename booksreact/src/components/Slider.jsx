import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext} from '../context'
import { Carousel } from "react-bootstrap";
import './slider.css';


export  function Slider() {

const author_id =  useContext(UserContext) 
const [books, setBooks] = useState([]);

let selectedBooks = []

useEffect(() => {
  // getting the author books
  axios
    .get(`http://127.0.0.1:8000/api/book`)
    .then(res => {
      const filteredBooks = res.data.filter(book => book.author == author_id && book.book_cover );
      setBooks(filteredBooks);
    })
    .catch(err => {
      console.log(err);
    });
}, []);



  return (
    <div>
      {books.length === 0 ? 
      (<div>no books</div>) : 
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
