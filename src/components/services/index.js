import React, { useState, useEffect } from 'react';
import { Tooltip, Col, Row, Card, Alert   } from 'antd';
import ModalComponent from '../../components/shared/modal';
import ContentGoProShop from '../../components/shared/modal/content-modal';
import { urlWhatsApp } from '../../constants/routes';
import TusAccesoriosPeruServices from '../../services/services';
import WishListModalComponent from '../shared/modal/wishlist-modal';
import { ServicesStores } from './../../constants/constants'
import MenuComponent from '../shared/menu';
import Footer from '../shared/footer';
import { EditOutlined, WhatsAppOutlined, FacebookOutlined, PhoneOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ServicesComponent = ({ reference }) => {
  return (
<div className="App blackramps">
        <Alert message="Espacio comercial de TUSACCESORIOS PERU" type="info" closable={false} onClick={() => window.location.href="/"} />
    <a href="tel:+51994381708" target="_blank" className="call-img">
        <img src="./images/logo-call.png" />
    </a>
        <a href="https://wa.me/51994381708" target="_blank" className="whats-img">
        <Tooltip placement="left" title={<span>En qué podemos ayudarte?</span>}>
            <img src="./images/logo-whats.png" />
      </Tooltip>
        </a>
       <div className="block">
                <div className="container">
                    <div className="document gopro">
                    <div className="document__header">
                            <MenuComponent optionActive="services" />
                            <img src="./images/logo-oficial.png" className="img-responsive" />
                            <h1 className="document__title">COMERCIOS</h1>
                            <h2 className="document__subtitle">Encuentra los <b>EXPERTOS</b> en lo que necesites</h2>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                              <div>
                              <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                                {
                                    (ServicesStores && ServicesStores.length > 0) ? ServicesStores.map(el => {
                                      return (
                                        <Col className="gutter-row">
                                        <Card
                                          style={{ width: 300 }}
                                          cover={
                                            <img
                                              alt="example"
                                              src={el.logo}
                                            />
                                          }
                                          actions={[
                                            <a target="_blank" href={`https://wa.me/51${el.phone}`}><WhatsAppOutlined /></a>,
                                            <a target="_blank" href={el.facebook}><FacebookOutlined /></a>,
                                            <EditOutlined key="edit" />,
                                          ]}
                                        >
                                          <Meta
                                            title={el.name}
                                            description={el.slogan}
                                          />
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
                              
                               </div>
                                {/* <ContentGoProShop openModal={openModal} onChange={handleProduct} products={productsInitial} /> */}

                                {/* <div className="document__signature">
                                    <AppImage src="/images/signature.jpg" width="160" height="55" />
                                </div> */}
                            </div>
                        </div>
                       <Footer openYapeModal={() => {}} />
                    </div>
                    </div>
                    </div>
                    </div>
  )
}

export default ServicesComponent;
