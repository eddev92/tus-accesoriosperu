import React, { useState } from 'react';
import { Menu, Switch } from 'antd';

const { SubMenu } = Menu;

const MenuComponent = ({ optionActive = null }) => {
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
    <>
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
          <SubMenu key="sub1" title="Categorías">
            {optionActive && <Menu.Item key="1"><a href="/">TUSACCESORIOSPERU</a></Menu.Item>}
            {optionActive !== "blackramps" && <Menu.Item key="2"><a href="/skateboarding">SKATEBOARDING</a></Menu.Item>}
            <Menu.Item key="3"><a href="/technology">TECNOLOGIA</a></Menu.Item>
            {/* <Menu.Item key="4">INMOBILIARIA</Menu.Item> */}
          </SubMenu>
          
        </Menu>
      </>
  )
}

export default MenuComponent;
