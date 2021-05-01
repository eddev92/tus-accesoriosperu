import React, { useState, useEffect } from 'react';
import { Table, Col, Row, Tag, Button, Form, Input, Select, Modal, InputNumber, Card, AutoComplete, notification  } from 'antd';
import TusAccesoriosPeruServices from '../../services/services';

const ProvidersView = ({ refClientsBD, refProviders, providers }) => {
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
      registerProvider(values)
      closeModalAddClient()
    }
  }
  const registerProvider = (provider) => {
    const service = new TusAccesoriosPeruServices(refProviders);

    service.saveProviderBD(provider)
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
    <div className="main-providers">
            <Button type="dashed" onClick={() => openModalAddClientUI()} >AGREGAR PROOVEDOR</Button>
      <table>
          <thead>
            <tr>
              <td>PROOVEDOR</td>
              <td>TELEFONO</td>
              <td>DIRECCION</td>
            </tr>
          </thead>
            <tbody>
            {
              providers && providers.map(e => {
                return (
                  <tr>
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
            label="Nombre comercial"
            name="name"
            rules={[
              {
                required: true,
                message: 'Nombre comercial es requerido!',
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
                message: 'Teléfono es requerido!',
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
                message: 'Dirección es requerido!',
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
                message: 'Email es requerido!',
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

export default ProvidersView;
