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

const { Header, Sider, Content } = Layout;
let clientsAux = [];

const Dashboard = ({ reference }) => {
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
          <Menu.Item key="3" icon={<UploadOutlined />}>
            VENTAS
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
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
        </Content>
      </Layout>
    </Layout>
    )
  // }
}

export default Dashboard;
