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
import ServicesComponent from './components/services';

firebase.initializeApp(config);
const publicationRef = firebase.database();
const ref =	publicationRef.ref('/');
const refDashboard = publicationRef.ref('/products');
const refDashboardClientsBD = publicationRef.ref('/');
const refDashboardSales = publicationRef.ref('/sales');
const refDashboarClients = publicationRef.ref('/clientsBD');
const refProviders = publicationRef.ref("/");
const refProvidersBD = publicationRef.ref("/providersBD");

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
 render() {
  return (
    <BrowserRouter>
    <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard 
            reference={refDashboard} 
            refClientsBD={refDashboardClientsBD}
            refDashboardSales={refDashboardSales} refDashboarClients={refDashboarClients} 
            refProviders={refProviders}
            refProvidersBD={refProvidersBD}
            />
          </Route>
          <Route path="/epps">
            <EppsComponent reference={ref}/>
          </Route>
          <Route path="/technology">
            <TechnologyComponent reference={ref}/>
          </Route>
          <Route path="/mtb">
            <MtbComponent reference={ref}/>
          </Route>
          <Route path="/real-estate">
            <RealEstateComponent reference={ref}/>
          </Route>
          <Route path="/skateboarding">
            <StakeBoardingComponent reference={ref}/>
          </Route>
          <Route path="/services">
            <ServicesComponent reference={ref}/>
          </Route>
          <Route path="/" render={(props) => <ShopComponent reference={ref} propsAux={props} refDashboardProducts={refDashboard} refClientsBD={refDashboardClientsBD} />} />
        </Switch>
    </div>    
    </BrowserRouter>
  )
 }
}

export default App;
