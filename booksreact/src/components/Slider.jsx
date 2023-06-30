import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { UserContext} from '../context'
import { Carousel } from "react-bootstrap";
import './slider.css';


export  function Slider(prop) {

  let {books} = prop
  const filteredBooks = books.filter(book => book.book_cover);

              
  return (
    <div>
      {filteredBooks.length == 0 ? 
      (<div></div>) : 
      (<Carousel>
        {filteredBooks.map((book) => {
          return <Carousel.Item className='carousel-itemx' key={book.id}  interval={2000}>
            <img 
              className="carousel-image"
              src= {`http://localhost:8000${book.book_cover}`}
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
