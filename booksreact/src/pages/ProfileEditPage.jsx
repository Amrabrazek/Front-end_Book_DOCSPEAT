import React, { useState, useEffect, useContext } from 'react';
import { ProfileEdit } from '../components/ProfileEdit';
import axios from "axios";
import { UserContext } from '../context';
import { RenewableEnergy } from '../components/RenewableEnergy';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';


export function ProfileEditPage() { 
    const user_id =  useContext(UserContext)[0]
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
    let apiUrl = `http://127.0.0.1:8000/user/${user_id}`

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
            setUser(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }}, []);
    
    if (isLoading) {
        return <div className="d-flex justify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
    }

    return (
    <div>
        <div><h1>Edit Book</h1></div>
        <ProfileEdit user={user}></ProfileEdit>
        <RenewableEnergy />
        <ContactUs />
        <Footer />
    </div>
    )
}