import React from 'react';
import { Bookscards } from '../../components/Bookscards';
import { Profiledetails } from '../../components/Profiledetails';
import { Mynav } from '../../components/Mynav';


export function Profile() {

  // console.log(author)
  
  return (
    <div>
      <Mynav></Mynav>
      <Profiledetails  ></Profiledetails>
      <h1 className='m-5'>Book</h1>
      <Bookscards  ></Bookscards>
    </div>
  );
}