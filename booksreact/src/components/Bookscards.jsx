import axios from "axios";
import { UserContext } from '../context'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';


export function Bookscards(prop) {
  let {books} = prop

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
