import './App.css';
import React, { useState, Component, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Registeration } from './pages/Registeration';
import { Loginpage } from './pages/Loginpage';
import { NotFound } from './pages/Notfound';
import { Profile } from './pages/author/Profile';
import { Home } from './pages/author/Home';
import { Addbookpage } from './pages/author/Addbookpage';


import {
  UserContext,
} from './context';



function App() {

  const [authUser, setAuthUser] = useState({});

  // setAuthUser({id:1})

  const user_id = 2





  return (
    <div className="App">
      <UserContext.Provider value={user_id}>
        <Routes>

          {/* Auth */}
          {/* <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route path="register" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="activation/:type/:uuid" element={<ActivatinPage></ActivatinPage>}></Route>
           */}

          {/* author */}
          <Route path="register" element={<Registeration />} />
          <Route path="login" element={<Loginpage />} />

          <Route path="author/profile/:author_id" element={<Profile />} />
          <Route path="author/home/:author_id" element={<Home />} />
          <Route path="author/addbook" element={<Addbookpage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
