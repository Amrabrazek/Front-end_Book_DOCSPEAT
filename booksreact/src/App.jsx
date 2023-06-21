import './App.css';
import React, { useState, Component } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/Notfound';
import { Profile } from './pages/author/Profile';
import { Home } from './pages/author/Home';

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
          <Route path="author/profile/:author_id" element={<Profile />} />
          <Route path="author/home/:author_id" element={<Home />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
