import React from "react";
import { Mynav } from '../../components/Mynav';
import { Addbook } from '../../components/Addbook';

export function Addbookpage() { 
    return (
    <div>
        <Mynav></Mynav>


        <div><h1>Add Book</h1></div>

        <Addbook></Addbook>
    </div>
    )
}
