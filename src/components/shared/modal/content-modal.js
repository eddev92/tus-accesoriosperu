// react,
import React, { useState } from 'react';
// application
import { Card, Row, Col, Button, Checkbox } from 'antd';
// import url from '~/services/url';
import { AccesoriesGoPRo } from '../../../constants/constants'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const gridStyle = {
  maxWidth: '30%',
  textAlign: 'center',
  border: '1px solid #ee791f',
  // margin: '14px',
};
const { Meta } = Card;
function ContentGoProShop({ openModal = () => {}, onChange = () => {}, products = [] }) {
  // const openModal = (el: any) => {
  //   console.log('open modal', el)
  // }
  console.log(products)
    return (
        <React.Fragment>
          <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
          {
                          (products && products.length > 0) ? products.map(el => {
                            return (
                              <Col className="gutter-row">
                                 <Card
                                    hoverable
                                    id="card-product"
                                    style={{ width: 300 }}
                                    cover={
                                      <img
                                        alt="example"
                                        src={(el && el.img) && el.img}
                                        className="img-responsive"
                                      />
                                    }
                                    >
                                      <Checkbox onChange={onChange} value={el} >Agregar a la lista</Checkbox>
                                    <br></br>
                                    <br></br>
                                    <Meta
                                      title={el.name && el.name.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}
                                      description={`Precio de...  S/ ${el.price}`}
                                    />
                                    <br></br>
                                    <Button type="primary" size="large" onClick={() => openModal(el)}>PEDIR</Button>
                                </Card>
                              </Col>                             
                              )
                          })
                          :
                          <div className="loader">
                            <div className="load">
                              <div className="circle" id="circle-1" ></div>
                              <div className="circle" id="circle-2" ></div>
                              <div className="circle" id="circle-3" ></div>
                            </div>
                          </div>

                        }
          </Row>                        
        </React.Fragment>
    );
}

export default ContentGoProShop;
