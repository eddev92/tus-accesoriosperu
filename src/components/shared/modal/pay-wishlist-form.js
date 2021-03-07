import React from 'react';
import { Modal, Alert  } from 'antd';
import { Form, Input, Button, InputNumber, Card, Row, Col, Table, Tag, Space } from 'antd';

const PayNowWishListForm = ({ products = [], payNow = () => {}, finalOrder = null, quantitySelected = 1, setQuantity = null, backToShop = null, responseSentEmail = null, productSelected = {}, visible = false, closeModal = () => {}, onFinishFailed = () =>{}, onFinish = () =>{},
tailLayout, layout }) => {
  return (
<Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
              <Form.Item
                label="Nombres y apellidos"
                name="fullNames"
                rules={[{ required: true, message: 'Nombres y apellidos son requeridos' }]}
              >
                <Input
                />
              </Form.Item>
              <Form.Item
                label="DNI"
                name="dni"
                rules={[{ required: true, message: 'DNI es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Teléfono de contacto"
                name="phones"
                rules={[{ required: true, message: 'Teléfono de contacto es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Dirección de envío"
                name="address"
                rules={[{ required: true, message: 'Dirección de envío es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Cantidad">
            <Form.Item name="quantityItems" noStyle >
              <InputNumber min={1} max={10} defaultValue={1} value={productSelected.quantity} onChange={setQuantity}/>
            </Form.Item>
            <span className="ant-form-text"> unidades</span>
          </Form.Item>
              <Form.Item name={['clientComment', 'comment']} label="Referencia de dirección:" rules={[{ required: true, message: 'Referencia es requerida' }]}>
                <Input.TextArea value={productSelected.comment} />
              </Form.Item>
              <Alert
                  description="El precio no incluye delivery"
                  type="warning"
                  showIcon
                />
              <Form.Item {...tailLayout}>
                <strong>
                TOTAL: S/ {(quantitySelected && productSelected && productSelected.price) ? quantitySelected * productSelected.price : ''}
                </strong>
                <br/>
                <Button type="primary" htmlType="submit">
                  PEDIR YA!
                </Button>
              </Form.Item>
            </Form>
  )
}

export default PayNowWishListForm;
