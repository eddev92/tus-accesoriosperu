import React, { useState, useEffect } from 'react';
import { Table, Col, Row, Tag, Button, Form, Input, Select, Modal, Image, Card } from 'antd';
const columns = [
  {
    title: 'Nombres',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Telefono',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Direccion',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Referencia',
    dataIndex: 'reference',
    key: 'reference',
  },
  {
    title: 'Producto(s)',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: 'Monto total',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Tipo de pago',
    dataIndex: 'payType',
    key: 'payType',
  },
  {
    title: 'Tipo de envío',
    dataIndex: 'deliveryType',
    key: 'deliveryType',
  },
  {
    title: 'Comentario',
    dataIndex: 'comment',
    key: 'comment',
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    phone: 32,
    address: 'New York No. 1 Lake Park',
    order: 'New York No. 1 Lake Park',
    amount: 'New York No. 1 Lake Park',
    payType: 'New York No. 1 Lake Park',
    deliveryType: '2',
    comment: '2'
  },
];
const Meta = { Card }
const SellsView = ({ reference, referenceAllStock }) => {
  const [showTableSells, setShowTableSells] = useState(false)
  const [showAddSale, setShowAddSale] = useState(false)
  const [listSales, setListSales] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [openModalProducts, setOpenModalProducts] = useState(false)

  const getAllStockFirebase = () => {
    let productsAux = []
    referenceAllStock.on("value", (snapshot) => {
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
  }

  const openModalUI = () => {
    setOpenModalProducts(true)
  }
  
  const closeModalProducts = () => {
    setOpenModalProducts(false)
  }
  const showSales = () => {
    if (showAddSale) setShowAddSale(false)
    setShowTableSells(true)
    getAllSalesFirebase()
  }
  const addSale = () => {
    if (showTableSells) setShowTableSells(false)
    setShowAddSale(true)
    getAllStockFirebase()
  }
  console.log(listProducts)
  console.log(openModalProducts)
  const getAllSalesFirebase = () => {
    let salesAux = []
       reference.on("value", (snapshot) => {
         if (snapshot.val() !== null) {
           salesAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
           salesAux = Object.values(salesAux)
           setListSales(salesAux)
           console.log(salesAux, "productsAux")
         }
         return;
       }, (error) => {
         console.log("ERROR: " + error.code);
       });
    }
    console.log(listSales)
    let aux = [ ...listSales ]
    aux = aux && aux.map(e => {
      e.order = "sdas"
      return e
    })
    console.log(aux)
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
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
  return (
    <div className="main-sells">
       <React.Fragment>
      <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row">
        <div className="1 card-real-estate" onClick={() => showSales()} >
          <div className="card_image">
            <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
            <div className="card_title title-white">
                <p>TOTAL </p>
              </div>
          </div>
          </div>
          </Col>
          <Col className="gutter-row">
          <div className="1 card-real-estate" onClick={() => addSale()} >
          <div className="card_image">
            <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
            <div className="card_title title-white">
                <p>AGREGAR</p>
              </div>
          </div>
          </div>
        </Col>
      </Row>
      {(showTableSells || showAddSale) && <hr id="hr-stock" />}
      {(showTableSells) && <Tag color="#108ee9">ACTUAL ACUMULADO</Tag>}
      {(showTableSells && listSales && listSales.length) && <Table columns={columns} dataSource={aux} /> }
      {
        showAddSale &&
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nombres completos"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{ width: 320 }} />
      </Form.Item>
      <Form.Item
        label="Telefono"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{ width: 130 }} />
      </Form.Item>
      <Form.Item
        label="Direccion de envio"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{ width: 320 }} />
      </Form.Item>
      <Form.Item
        label="Referencia"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{ width: 280 }}/>
      </Form.Item>

      {/* <Form.Item
        label="Producto"
        name="distric"
        rules={[{ required: true, message: 'Productos' }]}
      >
      <Select defaultValue="LIMA" style={{ width: 220 }} >
        
      <Select.Option value={"e"}>dsad</Select.Option>
        
        </Select>
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <Button danger onClick={() => openModalUI() } >
          SELECCIONAR PRODUCTO
        </Button>
      </Form.Item>

       <Form.Item
        label="Tipo de pago"
        name="distric"
        rules={[{ required: true, message: 'Productos' }]}
      >
      <Select defaultValue="LIMA" style={{ width: 220 }} >
        
      <Select.Option value={"e"}>dsad</Select.Option>
        
        </Select>
      </Form.Item>

       <Form.Item
        label="Tipo de envío"
        name="distric"
        rules={[{ required: true, message: 'Productos' }]}
      >
      <Select defaultValue="LIMA" style={{ width: 220 }} >
        
      <Select.Option value={"e"}>dsad</Select.Option>
        
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          VENDER
        </Button>
      </Form.Item>
    </Form>
      }
     </React.Fragment>
     <Modal visible={openModalProducts} onCancel={() => closeModalProducts()} width={650} cancelText="CERRAR"
                okButtonProps={{hidden: true}} closable={true} style={{ top: 20 }} className="modal-select-sale"
      >
        <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }} id="row-all-stock">
          {
            listProducts && listProducts.map(el => {
              return (
                <Col>
                <Card
                    hoverable
                    id="card-product-stock"
                    className="card-all-stock"
                    style={{ width: 150 }}
                    cover={
                      <img
                        width={150}
                        src={(el && el.img) && el.img}
                        className="normal img-responsive"
                      />}
                    >
                      <h5>{(el && el.name) && el.name}</h5>
                </Card>
                <br/>
                </Col>
              )
            }) 
          }
          </Row>
      </Modal>
  </div>
  )
}

export default SellsView;
