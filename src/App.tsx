import React from 'react';

import Header from './components/Header.tsx';
import {Home} from "./pages/Home.tsx";

import './scss/app.scss';
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {Routes, Route} from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import {FullPizza} from "./pages/FullPizza.tsx";

export const SearchContext = React.createContext();
function App() {
    const [searchValue, setSearchValue] = React.useState('');
  return (
      <div className="wrapper">
          <SearchContext.Provider value = {{ searchValue, setSearchValue }}>
              <Header />
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Home />}/>
                      <Route path="*" element={<NotFoundPage />}/>
                      <Route path="/pizza/:id" element={<FullPizza />}/>
                      <Route path="/cart" element={<Cart />}/>
                  </Routes>
              </div>
          </SearchContext.Provider>
      </div>
  );
}

export default App;
