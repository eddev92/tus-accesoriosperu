import React from 'react';
import { Modal, Alert  } from 'antd';
import { Form, Input, Button, InputNumber, Card, Row, Col, Table, Tag, Space } from 'antd';
import {urlWhatsApp,urlWhatsAppModified} from "../../../constants/routes"

function ModalComponent({ finalOrder = null, quantitySelected = 1, setQuantity = null, backToShop = null, responseSentEmail = null, productSelected = {}, visible = false, closeModal = () => {}, onFinishFailed = () =>{}, onFinish = () =>{},
tailLayout, layout }) {
  console.log(responseSentEmail)
  console.log(productSelected)
  console.log(finalOrder)
  const urlAux = (finalOrder && responseSentEmail && productSelected) && urlWhatsApp()
  console.log(urlAux)
  if (productSelected) {
    return (
      <Modal
      destroyOnClose={true}
        title={(productSelected && productSelected.name) && productSelected.name.toUpperCase().replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}
        centered
        visible={visible}
        okButtonProps={{hidden: true}}
        cancelButtonProps={{hidden: responseSentEmail ? true : false}}
        // onOk={() => setVisible(state)}
        onCancel={() => closeModal()}
        width={800}
      >
      <Row gutter={{ xs: 16, sm: 6, md: 6, lg: 32 }}>
          <Col className="gutter-row">
          <Card
          style={{ width: 'auto' }}
          id="card-product-selected"
          cover={
            <img
              alt="example"
              src={productSelected.img}
            />
          }
        >
          <table id="table-info-product">
          <thead>
            <tr>
              <th scope="col">PRECIO</th>
              <th scope="col">DESCRIPCION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Precio">S/ {productSelected.price}</td>
              <td data-label="Descripcion" id="desc-product" >{(productSelected && productSelected.desc) && productSelected.desc}</td>
            </tr>
          </tbody>
        </table>
        </Card>
          </Col>
          {
            (responseSentEmail && responseSentEmail.data && responseSentEmail.data.whatsAppMsg) ?
          <Col span={16}>
            <div className="content-result-buy" >
            <Alert
                  message={responseSentEmail.data.status === 200 ? "Tu pedido ha sido generado con éxito!" : "Ocurrió un problema, intentalo nuevamente por favor"}
                  description={`Vamos a comunicarnos contigo lo más pronto posible. También puedes comunicarte al siguiente enlace para confirmar tu fecha de envío y hacer seguimiento de tu orden:`}
                  type="success"
                  showIcon
                />
                <br></br>
                <Tag color="blue">
                  <a target="_blank" href={urlAux}>{responseSentEmail.data.whatsAppMsg}</a></Tag>
                {/* <br></br>
                  <Button type="primary" onClick={backToShop}>
                  CONFIRMAR FECHA DE ENVIO
                </Button> */}
                <br></br>
                <br></br>
                  <Button type="primary" onClick={backToShop}>
                  SEGUIR COMPRANDO
                </Button>
            </div>
          </Col>
            :
            <Col span={16}>
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
          </Col>
          }
      </Row>
      </Modal>
    )
  }
}

export default ModalComponent;
