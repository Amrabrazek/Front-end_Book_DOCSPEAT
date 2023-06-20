import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/Notfound';

import {
  UserContext,
} from './context';

function App() {
  const [authUser, setAuthUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={authUser.userName}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
