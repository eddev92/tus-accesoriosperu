import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Card , Row, Col, Image, Tag, Space } from 'antd';

const { Meta } = Card;
const StockView = ({ products = [], showProducts = () => {} }) => {
  console.log(products)
  let acumTotalAmount = 0;
  let totalAmounts = []
  totalAmounts = products && products.map(el => el.price * el.stock)
  console.log(totalAmounts)
  acumTotalAmount = (totalAmounts && totalAmounts.length) && totalAmounts.reduce((a,b) => a +b ) 
  console.log(acumTotalAmount)
  return (
    <React.Fragment>
    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row">
    <div className="1 card-real-estate" onClick={() => showProducts()}>
      <div className="card_image">
        <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
        <div className="card_title title-white">
            <p>PRODUCTOS </p>
          </div>
      </div>
      </div>
      </Col>
      <Col className="gutter-row">
      <div className="1 card-real-estate" onClick={() => showProducts()}>
      <div className="card_image">
        <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
        <div className="card_title title-white">
            <p>AGREGAR </p>
          </div>
      </div>
      </div>
    </Col>
    </Row>
    <hr id="hr-stock" />
    <Tag color="#f50">INVERSION </Tag>
    <Tag color="#87d068">TOTAL INVENTARIO <br /><b>S/{acumTotalAmount && acumTotalAmount}</b></Tag>
    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }} id="row-all-stock">
    {
      products && products.map(el => {
        return (
          <Col>
          <Card
              hoverable
              id="card-product-stock"
              className="card-all-stock"
              style={{ width: 180 }}
              cover={
                <Image
                  width={180}
                  src={(el && el.img) && el.img}
                  className="normal img-responsive"
                  placeholder="Cargando..."
                />}
              >
                <Meta
              title={(el.name) && el.name.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}
              description={`CANTIDAD... ${el.stock} \b PRECIO... ${el.price}`}
            />
              <br></br>
              <table id="table-stock">
          <thead>
            <tr>
              <td>VENDIDOS</td>
              <td>STOCK</td>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
              </tbody>
              </table>
              <br></br>
              <Button type="primary" size="large">AÑADIR</Button>
          </Card>
          </Col>
        )
      })      
    }
    </Row>
  </React.Fragment>
  )
}

export default StockView;
