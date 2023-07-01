import React, { useState, useEffect, useContext } from 'react';
import { Editpage } from '../../components/Editpage';
import axios from "axios";
import { useParams } from "react-router-dom";
import { TypeContext} from '../../context'


export function PageEditPage() { 

    let { page_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState([]);
    const user_type =  useContext(TypeContext)[0]
    let apiUrl = `http://127.0.0.1:8000/page/${page_id}`

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else if(user_type !="author"){
            window.location.href = '/'
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
            setPage(res.data);
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
        <div><h1>Edit Page</h1></div>
        <div><h1>{page.book.title}</h1></div>
        <div><h1>page: {page.page_number}</h1></div>
        <Editpage page={page}></Editpage>
    </div>
    )
}