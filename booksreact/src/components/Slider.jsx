import React from "react";
import { Carousel } from "react-bootstrap";
import './slider.css';


export  function Slider(prop) {

  let {books} = prop
  const filteredBooks = books.filter(book => book.book_cover).slice(0, 5);;

              
  return (
    <div>
      {filteredBooks.length === 0 ? 
      (<div></div>) : 
      (<Carousel>
        {filteredBooks.map((book) => {
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
