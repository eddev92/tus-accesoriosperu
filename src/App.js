import React, { useState } from 'react';
import Dashboard from './components/dashboard';
import ShopComponent from './components/shop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Tooltip, Button } from 'antd';import './App.css';
 import firebase from 'firebase';
 import config from './config';
// import ModalComponent from './components/shared/modal';
// import ContentGoProShop from './components/shared/modal/content-modal';
// import { urlWhatsApp } from './constants/routes';
// import TusAccesoriosPeruServices from './services/services';



firebase.initializeApp(config);
const publicationRef = firebase.database();
const ref =	publicationRef.ref('/');

function App() {

 console.log(ref)
  return (
      <BrowserRouter>
      <div>
          <Switch>
            {/* <Route path="/tienda">
              <About />
            </Route> */}
            <Route path="/dashboard">
              <Dashboard  reference={ref}/>
            </Route>
            <Route path="/">
              <ShopComponent reference={ref}/>
            </Route>
          </Switch>
      </div>
      
      </BrowserRouter>
  );
}

export default App;
