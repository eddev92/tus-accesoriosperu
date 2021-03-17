import React, { useState } from 'react';
import Dashboard from './components/dashboard';
import ShopComponent from './components/shop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Tooltip, Button } from 'antd';import './App.css';
 import firebase from 'firebase';
 import config from './config';
import EppsComponent from './components/epps';
import MtbComponent from './components/mtb';
import RealEstateComponent from './components/real-state';
import StakeBoardingComponent from './components/skate';
import TechnologyComponent from './components/tech';

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
            <Route path="/epps">
              <EppsComponent  reference={ref}/>
            </Route>
            <Route path="/technology">
              <TechnologyComponent  reference={ref}/>
            </Route>
            <Route path="/mtb">
              <MtbComponent  reference={ref}/>
            </Route>
            <Route path="/real-estate">
              <RealEstateComponent  reference={ref}/>
            </Route>
            <Route path="/skateboarding">
              <StakeBoardingComponent reference={ref}/>
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
