import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Bookscards } from '../../components/Bookscards';
import { Profiledetails } from '../../components/Profiledetails';
import { Mynav } from '../../components/Mynav';
import { UserContext, TypeContext} from '../../context'
import axios from "axios";


export function Profile() {
  const { profile_id } = useParams();
  console.log(profile_id);
  const user_type =  useContext(TypeContext)[0]
  console.log(user_type)
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState({});
  let booksAPIUrl = `http://127.0.0.1:8000/book/authorbooks/${profile_id}`
  let  userAPIUrl= `http://127.0.0.1:8000/user/${profile_id}`



  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
    else{

        axios
        .get(booksAPIUrl,
          {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
          })
        .then(res => {
          setBooks(res.data);
          console.log(books)

        })
        .catch(err => {
          console.log(err);
        });

        axios
        .get(userAPIUrl,
          {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
          })
        .then(res => {
          setAuthor(res.data);
          console.log(author)
        })
        .catch(err => {
          console.log(err);
        });
        
        setIsLoading(false);
    };
}, []);

if (isLoading) {
  return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
}

  return (
    <div>
      <Profiledetails author={author} ></Profiledetails>
      <h1 className='m-5'>Book</h1>
      <Bookscards books={books}></Bookscards>
    </div>
  );
}