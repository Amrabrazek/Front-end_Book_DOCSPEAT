import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Pageview  from '../components/Pageview';
import { Addpage }  from '../components/Addpage';
import {  TypeContext } from '../context'
import axios from "axios";
import { RenewableEnergy } from '../components/RenewableEnergy';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';


export function PageViewPage() {
    const { book_id } = useParams();
    const usertype =  useContext(TypeContext)[0]
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [book, setBook] = useState({});
    const [bookpages, setBookpages] = useState([]);
    let bookAPIUrl = `http://127.0.0.1:8000/book/${book_id}`
    let bookpagesAPIUrl = `http://127.0.0.1:8000/page/bookpages/${book_id}`

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
        .get(bookpagesAPIUrl,
        {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        })
        
        .then(res => {
            setBookpages(res.data);
            setIsLoading2(false);
        //   console.log(author)
        })
        .catch(err => {
            setBookpages([]);
            console.log(err);
        });
        
    };
}, []);


if (isLoading1 || isLoading2) {
    return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading...</h1></div>;
}
console.log(bookpages)

return (
    <div>
        { bookpages.length === 0? <div>No pages in this book</div> : 
        <div>
            <a className='text-dark m-5' href={`/book/view/${book.id}`}>
                <h1>{book.title}</h1>
                </a>
            <Pageview pages={bookpages} ></Pageview>
        </div>}

        { usertype==="author" && <h1>Add Page</h1>}
        { usertype==="author" && <h1>page number {bookpages.length +1}</h1>}

        { usertype==="author" && <Addpage book_id={book.id} page_number={bookpages.length +1} ></Addpage>}

        <RenewableEnergy />
        <ContactUs />
        <Footer />
    </div>
);
}