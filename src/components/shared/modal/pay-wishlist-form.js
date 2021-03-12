import React from 'react';
import { Modal, Alert  } from 'antd';
import { Form, Input, Button, InputNumber, Card, Row, Col, Table, Tag, Space } from 'antd';

const PayNowWishListForm = ({ total = 0, payNow = () => {}, finalOrder = null, quantitySelected = 1, setQuantity = null, backToShopFromWishList = null, responseSentOrderWishList = null, productSelected = {}, visible = false, closeModal = () => {}, onFinishFailed = () =>{}, onFinish = () =>{},
tailLayout, layout }) => {
  return (    
      (responseSentOrderWishList && responseSentOrderWishList.data) ?
    <Col span={16}>
      <div className="content-result-buy" >
      <Alert
            message={responseSentOrderWishList.data.status === 200 ? "Tu pedido ha sido generado con éxito!" : "Ocurrió un problema, intentalo nuevamente por favor"}
            description={`Vamos a comunicarnos contigo lo más pronto posible. También puedes comunicarte al siguiente enlace para confirmar tu fecha de envío y hacer seguimiento de tu orden:`}
            type="success"
            showIcon
          />
          <br></br>
          <Tag color="blue">
            <a target="_blank" href="https://wa.me/51994381708">{responseSentOrderWishList.data.whatsAppMsg}</a>
            </Tag>
          {/* <br></br>
            <Button type="primary" onClick={backToShop}>
            CONFIRMAR FECHA DE ENVIO
          </Button> */}
          <br></br>
          <br></br>
            <Button type="primary" onClick={backToShopFromWishList}>
            SEGUIR COMPRANDO
          </Button>
      </div>
      </Col>
      :
<Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
              <Form.Item
                label="Nombres y apellidos"
                name="fullNamesWishList"
                rules={[{ required: true, message: 'Nombres y apellidos son requeridos' }]}
              >
                <Input
                />
              </Form.Item>
              <Form.Item
                label="DNI"
                name="dniWishList"
                rules={[{ required: true, message: 'DNI es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Teléfono de contacto"
                name="phonesWishList"
                rules={[{ required: true, message: 'Teléfono de contacto es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Dirección de envío"
                name="addressWishList"
                rules={[{ required: true, message: 'Dirección de envío es requerido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={['clientCommentWishList', 'comment']} label="Referencia de dirección:" rules={[{ required: true, message: 'Referencia es requerida' }]}>
                <Input.TextArea value={productSelected.comment} />
              </Form.Item>
              <Alert
                  description="El precio no incluye delivery"
                  type="warning"
                  showIcon
                />
              <Form.Item {...tailLayout}>
                <strong>
                TOTAL: S/ {total && total}
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
