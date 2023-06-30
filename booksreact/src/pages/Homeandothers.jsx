import React from 'react'
import { UserContext } from '../context'
import{ useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Home } from './author/Home';

export function Homeandothers() {
    const user_id =  useContext(UserContext)
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null)
        {                   
            window.location.href = '/login'
        }
        else{
                (async () => {
                    try {
                        const response = await axios.get(`http://127.0.0.1:8000/user/${user_id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                            }
                            });
                        setUser(response.data);
                        setIsLoading(false);
                        console.log(user);
                } catch (e) {
                    console.log(e)
                    console.log('not auth')
                }
                })()
            };
    }, []);

    if (isLoading) {
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading...</h1></div>;
    }
    console.log(user)

    return (
        <div>

            { !user.is_active && (<div>you need to activate your email {user.id}</div>) }
            { (user.is_active) && (!user.first_registeration) && (<div>you need fill this form </div>) }
            { (user.is_active) && (user.first_registeration) && <Home></Home>}

        </div>
    )
}
