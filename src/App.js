import React from 'react';

import Header from './components/Header';
import {Home} from "./pages/Home";

import './scss/app.scss';
import {NotFoundPage} from "./pages/NotFoundPage";
import {Routes, Route} from "react-router-dom";
import {Cart} from "./pages/Cart";

function App() {
  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="*" element={<NotFoundPage />}/>
              <Route path="/cart" element={<Cart />}/>
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
