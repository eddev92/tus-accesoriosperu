import React, { useState, useEffect } from 'react';

const ClientsView = ({ clients = [] }) => {
  return (
    <div className="main-cients">
    <table>
        <thead>
          <tr>
            <td>CODIGO</td>
            <td>NOMBRES</td>
            <td>TELEFONO</td>
            <td>DIRECCION</td>
          </tr>
        </thead>
          <tbody>
            {
              clients && clients.map(e => {
                return (
                  <tr>
                    <td>{e.key}</td>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.address}</td>
                  </tr>
                )
              })
            }
        </tbody>
    </table>
</div>
  )
}

export default ClientsView;
