import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bookscards } from '../../components/Bookscards';
import { Profiledetails } from '../../components/Profiledetails';
import axios from "axios";


export function Profile() {
  const { profile_id } = useParams();
  console.log(profile_id);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
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
              setIsLoading1(false);
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
            setIsLoading2(false);
            console.log(author)
        })
        .catch(err => {
          console.log(err);
        });
        
    };
}, []);

if (isLoading1 || isLoading2) {
  return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading profile page ...</h1></div>;
}

  return (
    <div>
      <Profiledetails author={author} ></Profiledetails>
      <h1 className='m-5'>Book</h1>
      <Bookscards books={books}></Bookscards>
    </div>
  );
}