import './App.css';
import React, { useState, Component, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Registeration } from './pages/Registeration';
import { Loginpage } from './pages/Loginpage';
import { NotFound } from './pages/Notfound';
import { Profile } from './pages/author/Profile';
import { Homeandothers } from './pages/Homeandothers';

import { Addbookpage } from './pages/author/Addbookpage';
import {Mynav} from "./components/Mynav";
// import {Home} from './components/home';
import {Logout} from './components/logout';

import {
  UserContext,
} from './context';



function App() {

  const [userId, setUserId] = useState('');
  useEffect(() => {
      if(localStorage.getItem('access_token') === null){                   
          console.log("not auth yet")
      }
      else{
      (async () => {
          try {
          const {data} = await axios.get(   
                          'http://localhost:8000/api/home/', {
                          headers: 
                          {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                          }}
                          );
            setUserId(data.msg);
          console.log("inhome")
          console.log(data)
      } catch (e) {
          console.log(e)
          console.log('not auth')
      }
      })()};
  }, []);

  const [isAuth, setIsAuth] = useState(false);
  // console.log(localStorage.getItem('access_token') !== "")
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
  // setAuthUser({id:1})

  const user_id = userId

  return (
    <div className="App">
      <UserContext.Provider value={user_id}>
      {isAuth ? <Mynav></Mynav> :  null}
        <Routes>
          <Route path="/register" element={<Registeration />} />
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/" element={<Homeandothers/>}/>

          <Route path="/logout" element={<Logout/>}/>
          <Route path="/author/profile/:author_id" element={<Profile />} />
          

          {/* author */}
          {/* <Route path="register" element={<Registeration />} />
          <Route path="login" element={<Loginpage />} />

          <Route path="author/home/:author_id" element={<Home />} />
          <Route path="author/addbook" element={<Addbookpage />} />

          <Route path="*" element={<NotFound />} /> */}

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
