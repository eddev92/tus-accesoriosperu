import React, { useState } from 'react';
import { Menu, Button } from 'antd';

const { SubMenu } = Menu;

const MenuComponent = ({ optionActive = null, handleLogin = () => {} }) => {
  const [theme, setTheme] = useState('dark')
  const [current, setCurrent] = useState('1')

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light')
    // this.setState({
    //   theme: value ? 'dark' : 'light',
    // });
  };

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key)
    // this.setState({
    //   current: e.key,
    // });
  };
  return (
    <div>
        <Button danger id ="btn-login" onClick={() => handleLogin()}>LOGIN</Button>
        <Menu
        id="menu-content"
          theme={theme}
          onClick={handleClick}
          style={{ width: 180 }}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          selectedKeys={current}
          mode="inline"
        >
          <SubMenu key="sub1" title="CATEGORIAS">
            {optionActive && <Menu.Item key="1"><a href="/">TUSACCESORIOSPERU</a></Menu.Item>}
            {optionActive !== "blackramps" && <Menu.Item key="2"><a href="/skateboarding">SKATEBOARDING</a></Menu.Item>}
            <Menu.Item key="3"><a href="/technology">VARIEDAD</a></Menu.Item>
            <Menu.Item key="4"><a href="/epps">EPPS</a></Menu.Item>
            <Menu.Item key="5"><a href="/services">SERVICIOS</a></Menu.Item>
          </SubMenu>
          
        </Menu>
      </div>
  )
}

export default MenuComponent;
