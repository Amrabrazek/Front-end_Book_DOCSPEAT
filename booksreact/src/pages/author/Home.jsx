import React, { useState, Component, useEffect } from 'react';
import { Bookscards } from '../../components/Bookscards';
import { Slider } from '../../components/Slider';
import { Mynav } from '../../components/Mynav';
import PostLoadingComponent from '../../components/PostLoading'

export function Home() {

  const PostLoading  = PostLoadingComponent(Bookscards)

  const [appState, setAppState] = useState ({
    loading:false,
    home:null,
  })

  useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `http://127.0.0.1:8000/api/book`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((home) => {
				setAppState({ loading: false, home: home });
			});
	}, [setAppState]);

  // console.log(author)

return (
    <div>

        <Slider  ></Slider>
        <h1>Book</h1>
        <PostLoading isLoading={appState.loading} home={appState.home} />
    </div>
);
}