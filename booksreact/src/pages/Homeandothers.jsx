import React from 'react'
import { UserContext } from '../context'
import{ useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Home } from './Home';

export function Homeandothers() {
    const user_id =  useContext(UserContext)[0]
    console.log(user_id)
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let apiUrl = `http://127.0.0.1:8000/user/${user_id}`
    console.log(apiUrl)

    useEffect(() => {
        if(localStorage.getItem('access_token') === null)
        {                   
            window.location.href = '/login'
        }
        else{
                (async () => {
                    try {
                        const response = await axios.get(apiUrl, {
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
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>check Activation</h1></div>;
    }
    // console.log(user)

    return (
        <div>
            <Home></Home>
            {/* { !user.is_active && (<div>check your email for acitvation {user.id}</div>) }
            { (user.is_active) &&  <Home></Home>} */}

        </div>
    )
}
