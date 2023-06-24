import React from 'react'
import { UserContext } from '../context'
import{ useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Home } from './author/Home';

export function Homeandothers() {
    const author_id =  useContext(UserContext) 
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null)
        {                   
            window.location.href = '/login'
        }
        else{
                (async () => {
                    try {
                        const response = await axios.get(`http://127.0.0.1:8000/api/user/${author_id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                            }
                            });
                        setUser(response.data);
                        console.log(user);
                } catch (e) {
                    console.log(e)
                    console.log('not auth')
                }
                })()
            };
    }, []);

    return (
        <div>
            { !user.is_active && (<div>you need to activate your email {user.id}</div>) }
            { (user.is_active) && (!user.first_registeration) && (<div>you need fill this form </div>) }
            { (user.is_active) && (user.first_registeration) && <Home></Home>}

        </div>
    )
}
