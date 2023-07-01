import React, {useContext, useEffect} from "react";
import { Addbook } from '../../components/Addbook';
import { TypeContext} from '../../context'


export function Addbookpage() { 
    const user_type =  useContext(TypeContext)[0]

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else if(user_type !="author"){
            window.location.href = '/'
        }
    }
    , []);

    return (
    <div>


        <div><h1>Add Book</h1></div>

        <Addbook></Addbook>
    </div>
    )
}
