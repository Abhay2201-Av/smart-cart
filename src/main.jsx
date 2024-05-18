import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from './redux/store.jsx';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';
// import { CartProvider } from './components/context/cartItemes.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <HashRouter >
  <Provider store={store}>
    <App />
    <Toaster
  position="bottom-center"
  reverseOrder={true}
  containerStyle={{fontFamily:"Prompt"}}
/></Provider>
  </HashRouter>
  
  </>,
)
