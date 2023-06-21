import React from 'react';
import { Bookscards } from '../../components/Bookscards';
import { Slider } from '../../components/Slider';
import { Mynav } from '../../components/Mynav';


export function Home() {

  // console.log(author)

  return (
    <div>
      <Mynav></Mynav>
      <Slider  ></Slider>
      <h1>Book</h1>
      <Bookscards  ></Bookscards>
    </div>
  );
}