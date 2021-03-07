import React, { useState } from 'react';
import { Modal, Alert  } from 'antd';
import PayNowWishListForm from './pay-wishlist-form';

const WishListModalComponent = ({ visible, closeModal = () => {}, products = [], payNow = () => {}, payNowUI }) => {
  console.log(products)
  return (
<Modal
      // destroyOnClose={true}
      className="modal-wishlist"
        title="LISTA DE DESEO"
        visible={visible}
        // okButtonProps={{hidden: true}}
        // cancelButtonProps={{hidden: responseSentEmail ? true : false}}
        onOk={() => payNow()}
        onCancel={() => closeModal()}
        cancelText="CERRAR"
        okText="PAGAR YA!"
        width={400}
      > {
        (!payNowUI) ?
<table id="table-wishlist">
          <thead>
            <tr>
              <td>PRODUCTO</td>
              <td>TITULO</td>
              <td>PRECIO</td>
              <td>CANTIDAD</td>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map(e => {
                if (e && e.img && e.name && e.price && e.checked === true)
                return (
                  <tr>
                    <td><img src={e.img} className="img-responsive" /></td>
                    <td>{e.name}</td>
                    <td>S/ {e.price}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>      
        :
            <PayNowWishListForm />
      }
        </Modal>
  )
}

export default WishListModalComponent;
