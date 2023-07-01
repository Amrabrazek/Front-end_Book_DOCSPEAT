import React, { useState, useEffect } from 'react';

import { Editbook } from '../../components/Editbook';
import axios from "axios";
import { useParams } from "react-router-dom";



export function Editbookpage() { 

    let { book_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState([]);
    let apiUrl = `http://127.0.0.1:8000/book/${book_id}`

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
            console.log(res.data)
            setBook(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }}, []);
    
    if (isLoading) {
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
    }

    return (
    <div>
        <div><h1>Edit Book</h1></div>
        <Editbook book={book}></Editbook>
    </div>
    )
}