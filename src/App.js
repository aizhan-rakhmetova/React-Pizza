import React from 'react';

import Header from './components/Header';
import {Home} from "./pages/Home";

import './scss/app.scss';
import {NotFoundPage} from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <NotFoundPage />
            {/*<Home />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
