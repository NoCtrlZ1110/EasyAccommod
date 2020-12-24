import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/sass/react.style.scss';
import initializeStores from "./admin/stores/storeInitializer";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
const stores = initializeStores();
ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

