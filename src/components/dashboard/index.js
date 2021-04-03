import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import TableComponent from '../shared/table';
import '../../styles/dashboard.css'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import StockView from './stock';
import ClientsView from './clients';
import ProvidersView from './providers';
import SellsView from './sales';
import TusAccesoriosPeruServices from '../../services/services';

const { Header, Sider, Content } = Layout;
let clientsAux = [];

const Dashboard = ({ reference, refClientsBD, refDashboardSales }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [handleOption, setHandleOPtion] = useState("1")
  const [listProducts, setListProducts] = useState([])
  // useEffect(() => {
  //    console.log(listProducts, 'render!');
  //    setTimeout(() => {
  //     if (!listProducts) getAllStockFirebase()
  //    },150)
  // }, [])
  const getAllStockFirebase = () => {
      let productsAux = []
      reference.on("value", (snapshot) => {
           if (snapshot.val() !== null) {
             productsAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
             productsAux = Object.values(productsAux)
             setListProducts(productsAux)
             console.log(productsAux, "productsAux")
           }
           return;
         }, (error) => {
           console.log("ERROR: " + error.code);
         });
  //     // }
  //   }
  }
  console.log(listProducts)
  // console.log(clientsAux)
  // if (list) {
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    
    const handleOptionUi = (option) => {
      // const service = new TusAccesoriosPeruServices(refClientsBD);
      // service.loadSells(
      //   {
      //     key: '1',
      //     idSell: '0000001',
      //     idClient: '1',
      //     // name: 'Victor Villalobos Velarde',
      //     // phone: "954517975",
      //     // address: 'Tarapoto',
      //     order: [
      //       {
      //         checked: true,
      //         cod: 100003,
      //         desc: "Soporte para superficies como el vidrio y sus variantes. Incluye sujetador de gancho",
      //         img: "./images/gopro/chupon.png",
      //         name: "Sujetador con chupón",
      //         price: 30,
      //         quantity: 1
      //       },
      //       {
      //         checked: true,
      //         cod: 100006,
      //         desc: "Adhesivos por ambos lados para base curvo o plana",
      //         img: "./images/gopro/pegatinas.png",
      //         name: "Pegatinas",
      //         price: 6,
      //         quantity: 4
      //       },
      //       {
      //         checked: true,
      //         cod: 100007,
      //         desc: "Base perfecta para superficies planas y de alta resistencia",
      //         img: "./images/gopro/base-plana.png",
      //         name: "Base plana para casco",
      //         price: 12,
      //         quantity: 2
      //       },
      //       {
      //         checked: true,
      //         cod: 100008,
      //         desc: "Base perfecta para superficies curvas y de alta resistencia",
      //         img: "./images/gopro/base-curvo.png",
      //         name: "Base curvo para casco",
      //         price: 16,
      //         quantity: 2
      //       },
      //       {
      //         checked: true,
      //         cod: 100028,
      //         desc: "Correa con soporte para cámara, incluye una correa adicional",
      //         img: "./images/gopro/arnes_casco_ciclismo.png",
      //         name: "Arnés para casco de ciclismo",
      //         price: 24,
      //         quantity: 2
      //       }
      //     ],
      //     amount: 158,
      //     payType: '4',
      //     deliveryType: '2',
      //     comment: "Se le obsequi 4 pegatinas, el monto final fue 140 con envío"
          
      //   }
      // )
      setHandleOPtion(option)
    };
    const showProducts = () => {
      getAllStockFirebase()
    }
    return (
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
        {!collapsed && <img src="./images/logo-oficial.png" className="img-logo" />}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => handleOptionUi("1")}>
            STOCK
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => handleOptionUi("2")}>
            CLIENTES
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => handleOptionUi("3")}>
            VENTAS
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />} onClick={() => handleOptionUi("4")}>
            PROOVEDORES
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })} */}
          <a onClick={toggle}><UserOutlined /></a>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {handleOption === "1" && <StockView products={listProducts} showProducts={showProducts} /> }
          {handleOption === "2" && <ClientsView products={[]} /> }
          {handleOption === "3" && <SellsView reference={refDashboardSales} referenceAllStock={reference} /> }
          {handleOption === "4" && <ProvidersView /> }
        </Content>
      </Layout>
    </Layout>
    )
  // }
}

export default Dashboard;
