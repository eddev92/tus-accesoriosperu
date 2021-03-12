import React, { useState } from 'react';
import { Modal, InputNumber   } from 'antd';
import PayNowWishListForm from './pay-wishlist-form';

const WishListModalComponent = ({ visible, closeModal = () => {}, products = [], payNow = () => {}, payNowUI, payFinishOrder = () => {},
onFinishWishList = () => {}, onChangeQuantity = () => {}, quantityWishList = 1, responseSentOrderWishList = null, backToShopFromWishList = () => {} }) => {
  console.log(products)
  let total = []
  let totalAmount = 0
  products && products.forEach(e => {
    const obj = e.quantity * e.price;
    total.push(obj)
  });

  console.log(total)
  totalAmount = (total && total.length > 0) && total.reduce((a,b) => a + b)
  console.log(totalAmount)
  return (
<Modal
      // destroyOnClose={true}
      className="modal-wishlist"
        title="LISTA DE DESEO"
        visible={visible}
        closable={false}
        okButtonProps={{hidden: payNowUI}}
        cancelButtonProps={{hidden: (responseSentOrderWishList && responseSentOrderWishList.data)}}
        onOk={() => payNow()}
        onCancel={() => closeModal()}
        cancelText="CERRAR"
        okText="PAGAR YA!"
        width={400}
      > 
             {/* // (!payNowUI) ? */}
             <div>
        <table id="table-wishlist">
          <thead>
            <tr>
              {!payNowUI && <td>PRODUCTO</td>}
              <td>TITULO</td>
              <td>PRECIO</td>
              <td>CANTIDAD</td>
            </tr>
          </thead>
            <tbody>
              {
                products && products.map(el => {
                  if (el && el.img && el.name && el.price && el.checked === true)
                  return (
                    <tr>
                      {!payNowUI && <td><img src={el.img} className="img-responsive" /></td>}
                      <td>{el.name}</td>
                      <td>S/ {el.price}</td>
                      {<td><InputNumber min={1} value={el.quantity} disabled={payNowUI} onChange={(e) => onChangeQuantity(e, el)} /></td>}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <br></br>
          {payNowUI && <PayNowWishListForm total={totalAmount} payNow={payFinishOrder} onFinish={onFinishWishList} responseSentOrderWishList={responseSentOrderWishList} backToShopFromWishList={backToShopFromWishList} />}
        </div>
        </Modal>
  )
}

export default WishListModalComponent;
