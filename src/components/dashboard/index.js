import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import TableComponent from '../shared/table';

let clientsAux = [];

const Dashboard = ({ reference }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    console.log('render!');
    if (list === []) return () => getClientsFirebase()
  })
  const getClientsFirebase = () => {
    // clientsAux = []
    console.log(clientsAux)
    if (reference) {
      // console.log(list)
      // if (list === []) {
        reference.on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            clientsAux = Object.values(snapshot.val()) && Object.values(snapshot.val())[0];
            clientsAux = Object.values(clientsAux)
            const idsAux = Object.keys(Object.values(snapshot.val())[0]);
            setList(clientsAux)
            return console.log(clientsAux, "clientsAux")            
            // return 
          }
          return;
        }, (error) => {
          console.log("ERROR: " + error.code);
        });
      // }
    }
  }
  console.log(list)
  console.log(clientsAux)
  if (list) {
    return (
      <div>
        <button size="large" onClick={() => getClientsFirebase()}>REFRESCAR</button>
        <div style={{"overflow-x":"auto"}}>
      <TableComponent data={list} />
        </div>
      </div>
    )
  }
}

export default Dashboard;
