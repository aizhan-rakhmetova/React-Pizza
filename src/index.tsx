import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
// @ts-ignore
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
// @ts-ignore
import { store } from './redux/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

