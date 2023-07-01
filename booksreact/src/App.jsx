import './App.css';
import React, { useState, Component, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Registeration } from './pages/Registeration';
import { Loginpage } from './pages/Loginpage';
import { NotFound } from './pages/Notfound';
import { Profile } from './pages/Profile';
import { Homeandothers } from './pages/Homeandothers';
import { Home } from './pages/Home';

import { Addbookpage } from './pages/Addbookpage';
import { Editbookpage } from './pages/Editbookpage';
import { BookViewPage } from './pages/BookViewPage';

import { PageViewPage } from './pages/PageViewPage';
import { PageEditPage } from './pages/PageEditPage';

import { ProfileEditPage } from './pages/ProfileEditPage';

import { ReaderBooksPage } from './pages/ReaderBooksPage';


import {Mynav} from "./components/Mynav";

import {
  UserContext,
  TypeContext
} from './context';

function App() {

  // getting authenticated used_id
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      if(localStorage.getItem('access_token') === null){                   
          console.log("not auth yet")
          setIsLoading(false);
      }
      else{
      (async () => {
          try {
          const {data} = await axios.get(   
                          'http://localhost:8000/user/home/', {
                          headers: 
                          {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                          }}
                          );
            setUserId(data.msg);
            setType(data.type);
            setIsLoading(false);
          console.log("inhome")
          console.log(data)
      } catch (e) {
          console.log(e)
          console.log('not auth')
          
      }
      })()};


  }, []);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
        
      }
    }, [isAuth]);
  // setAuthUser({id:1})


  if (isLoading) {
    return <div className="d-flex justify-content-center m-5 align-items-center"><h1>Loading user info ......</h1></div>;
  }

  const user_id = userId

  return (
    <div className="App">
      <UserContext.Provider value={user_id}>
      <TypeContext.Provider value={type}>
          {isAuth ? <Mynav></Mynav> :  null}
          <Routes>
            <Route path="/register" element={<Registeration />} />
            <Route path="/login" element={<Loginpage/>}/>

            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:profile_id" element={<Profile />} />

            <Route path="/book/add" element={<Addbookpage />} />
            <Route path="/book/edit/:book_id" element={<Editbookpage />} />
            <Route path="/book/view/:book_id" element={<BookViewPage />} />


            <Route path="/page/edit/:page_id" element={<PageEditPage />} />
            <Route path="/page/view/:book_id" element={<PageViewPage />} />

            <Route path="/profile/edit" element={<ProfileEditPage />} />

            <Route path="/myreadings" element={<ReaderBooksPage />} />


            

            
            <Route path="*" element={<NotFound />} />

            {/* author */}
            {/* <Route path="register" element={<Registeration />} />
            <Route path="login" element={<Loginpage />} />

            <Route path="author/home/:author_id" element={<Home />} /> */}


          </Routes>
      </TypeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
