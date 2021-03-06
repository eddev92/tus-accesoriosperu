import React, { useState } from 'react';

const renderRow = (list) => list && list.map(e => <tr>
  <td>{e.productSelected}</td>
  <td>{e.quantityItems}</td>
  <td>{e.price}</td>
  <td>{e.fullNames}</td>
  <td>{e.dni}</td>
  <td>{e.address}</td>
  <td>{e.phones}</td>
  <td>{(e.clientComment && e.clientComment.comment) && e.clientComment.comment}</td>
</tr>)

// const renderCol = (col) => col && <td>{col}</td>

function TableComponent({ data = [] }) {
  if (data) {
    console.log(data)
    return (
      <table id="list-orders">
        <thead>
          <tr>
            <td>Producto</td>
            <td>Cantidad</td>
            <td>Precio</td>
            <td>Nombres</td>
            <td>DNI</td>
            <td>Direccion</td>
            <td>Telefono</td>
            <td>Comentario</td>
          </tr>
        </thead>
        <tbody>        
        {
          renderRow(data)
        }
        </tbody>
      </table>
    )
  }  
  
}

export default TableComponent;
