import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Bookscards } from '../components/Bookscards';
import { BookView } from '../components/BookView';
import { UserContext, TypeContext} from '../context'
import { RenewableEnergy } from '../components/RenewableEnergy';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';
import axios from "axios";


export function BookViewPage() {
    const { book_id } = useParams();
    const user_id =  useContext(UserContext)[0]
    const user_type =  useContext(TypeContext)[0]
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [book, setBook] = useState({});
    const [otherbooks, setOtherbooks] = useState([]);
    let bookAPIUrl = `http://127.0.0.1:8000/book/${book_id}`


    let otherBooksAPIRrl = ""
    if (user_type == 'author') {
        otherBooksAPIRrl = `http://127.0.0.1:8000/book/authorbooks/${user_id}`
      }
      else {
        otherBooksAPIRrl = `http://127.0.0.1:8000/book/`
      }
      

    useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
    else{
        axios
        .get(bookAPIUrl,
            {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
            })
        .then(res => {
            setBook(res.data);
            setIsLoading1(false);
            console.log(book)

        })
        .catch(err => {
            console.log(err);
        });

        axios
        .get(otherBooksAPIRrl,
        {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        })
        .then(res => {
            setOtherbooks(res.data);
            setIsLoading2(false);
        //   console.log(author)
        })
        .catch(err => {
            console.log(err);
        });
        

    };
}, []);


if (isLoading1 || isLoading2) {
    return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading book</h1></div>;
}
console.log(book)

return (
    <div>
        <BookView book={book} ></BookView>
        <h1 className='m-5'>Other Books</h1>
        <Bookscards books={otherbooks.slice(0,4)}></Bookscards>
        <RenewableEnergy />
        <ContactUs />
        <Footer />
        
    </div>
);
}