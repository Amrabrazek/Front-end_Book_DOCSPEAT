import React, { useState, useEffect,useContext } from 'react';
import { Bookscards } from '../components/Bookscards';
import axios from "axios";
import { UserContext } from '../context';
import { RenewableEnergy } from '../components/RenewableEnergy';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';


export function ReaderBooksPage() {
    const user_id =  useContext(UserContext)[0]
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [books, setBooks] = useState([]);
    const [readerBooks, setReaderBooks] = useState([]);
    let  readerBooksAPIUrl= `http://127.0.0.1:8000/book/readersbooks`
    let booksAPIUrl = `http://127.0.0.1:8000/book`



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
            
        })
        .catch(err => {
            console.log(err);
        });

        axios
        .get(readerBooksAPIUrl,
        {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        })
        .then(res => {
            let all = res.data
            let filtered = all.filter((set) => set.reader.id == user_id )
            setReaderBooks(filtered);
            setIsLoading2(false);
        })
        .catch(err => {
            console.log(err);
        });
        
    };
}, []);

let Booksbeingread = readerBooks.map((set) => set.book);
console.log(Booksbeingread)
let remainingbooks = books.filter(book => !Booksbeingread.includes(book));
console.log(remainingbooks)


if (isLoading1 || isLoading2) {
    return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading profile page ...</h1></div>;
}

return (
<div>
    <h1 className='m-5'>Currently Reading</h1>
    {readerBooks.length === 0 ? <h2>No Books Added Yet</h2> 
    : <Bookscards books={Booksbeingread}></Bookscards>
    }
    <h1 className='m-5'>You might Also be Interested In</h1>
    <Bookscards books={remainingbooks}></Bookscards>
    <RenewableEnergy />
    <ContactUs />
    <Footer />
</div>
);
}