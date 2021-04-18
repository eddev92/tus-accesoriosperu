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

const Dashboard = ({ reference, refClientsBD, refDashboardSales, refDashboarClients }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [handleOption, setHandleOPtion] = useState("1")
  const [listProducts, setListProducts] = useState([])
  const [listAllClientsBD, setListAllClientsBD] = useState([])
  // useEffect(() => {
  //    console.log(listProducts, 'render!');
  //    setTimeout(() => {
  //     if (!listProducts) getAllStockFirebase()
  //    },150)
  // }, [])
  const getAllStockFirebase = () => {
    let allIds = []
      let productsAux = []
      reference.on("value", (snapshot) => {
           if (snapshot.val() !== null) {
            console.log("snapshot", snapshot)
            snapshot.forEach(e => {
              allIds.push(e.key)
            })
            console.log("allIds", allIds)
            
             productsAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
             productsAux = Object.values(productsAux)
             productsAux = productsAux.map((e, index) => {
               if (allIds.length) {
                allIds.forEach(k => {
                  e.keyBD = allIds[index]
                })
               }
               return e
             })
             console.log(productsAux, "productsAux")
             setListProducts(productsAux)
           }
           return;
         }, (error) => {
           console.log("ERROR: " + error.code);
         });
  //     // }
  //   }
  }
  const getAllClientsBDFirebase = () => {
    let productsAux = []
    refDashboarClients.on("value", (snapshot) => {
         if (snapshot.val() !== null) {
           productsAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
           productsAux = Object.values(productsAux)
           setListAllClientsBD(productsAux)
           console.log(productsAux, "productsAux")
         }
         return;
       }, (error) => {
         console.log("ERROR: " + error.code);
       });
//     // }
//   }
}
if (handleOption === "1" && listProducts.length === 0) getAllStockFirebase()
  console.log(listProducts)
  // console.log(clientsAux)
  // if (list) {
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    
    const handleOptionUi = (option) => {    
      if (option === "2" || option === "3") getAllClientsBDFirebase()
      setHandleOPtion(option)
    };
    const showProducts = () => {
      getAllStockFirebase()
    }
    return (
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
       style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      >
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
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <a onClick={toggle}><UserOutlined /></a>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            overflow: 'initial'
          }}
        >
          <div className="site-layout-background" style={{ padding: 24}}>
          {handleOption === "1" && <StockView products={listProducts} showProducts={showProducts} refSaveProducts={refClientsBD} /> }
          {handleOption === "2" && <ClientsView clients={listAllClientsBD} /> }
          {handleOption === "3" && <SellsView refClientsBD={refClientsBD} reference={refDashboardSales} refDashboarClients={refDashboarClients} referenceAllStock={reference} clients={listAllClientsBD} /> }
          {handleOption === "4" && <ProvidersView /> }
          </div>
        </Content>
      </Layout>
    </Layout>
    )
  // }
}

export default Dashboard;
