import React, { useState, useEffect } from 'react';
import { Table, Col, Row, Tag, Button, Form, Input, Select, Modal, InputNumber, Card, AutoComplete, notification  } from 'antd';
import TusAccesoriosPeruServices from '../../services/services';

const ClientsView = ({ clients = [], refClientsBD }) => {
  const [openModalAddClient, setOpenModalAddClient] = useState(false)
  const openModalAddClientUI = () => {
    setOpenModalAddClient(true)
  }  
  const closeModalAddClient = () => {
    setOpenModalAddClient(false)
  }
  const onFinishRegister = (values) => {
    if (values) {
      console.log(values)
      values.key = Math.floor(Math.random() * (1000000 - 10000)) + 100

      // console.log(values)
      openNotification()
      registerClient(values)
      closeModalAddClient()
    }
  }
  const registerClient = (client) => {
    const service = new TusAccesoriosPeruServices(refClientsBD);

    service.saveClientBD(client)
  }
  const openNotification = () => {
    notification.success({
      message: `USUARIO REGISTRADO`,
      description:
        'El usuario se registro con éxito.',
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <div className="main-cients">
      <Button type="dashed" onClick={() => openModalAddClientUI()} >NUEVO CLIENTE</Button>
    <table>
        <thead>
          <tr>
            <td>CODIGO</td>
            <td>NOMBRES</td>
            <td>TELEFONO</td>
            <td>DIRECCION</td>
          </tr>
        </thead>
          <tbody>
            {
              clients && clients.map(e => {
                return (
                  <tr>
                    <td>{e.key}</td>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.address}</td>
                  </tr>
                )
              })
            }
        </tbody>
    </table>
    <Modal visible={openModalAddClient} onCancel={() => closeModalAddClient()} width={450} cancelText="CERRAR"
                okButtonProps={{hidden: true}} cancelButtonProps={{hidden: false}} style={{ top: 20 }} className="modal-select-sale"
      >
         <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishRegister}
      onFinishFailed={onFinishFailed}
    >
      <br/>
          <Form.Item
            label="Nombres"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item
            label="Telefono"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item
            label="Direccion"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item
            label="Correo"
            name="mail"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input style={{ width: 280 }} />
          </Form.Item>
          <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          REGISTRAR
        </Button>
      </Form.Item>
      </Form>
        </Modal>
</div>
  )
}

export default ClientsView;
