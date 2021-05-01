import React, { useState, useEffect, useForm } from 'react';
import { Table, Col, Row, Tag, Button, Form, Input, Select, Modal, InputNumber, Card, AutoComplete, notification  } from 'antd';
import TusAccesoriosPeruServices from '../../services/services';
import { PAY_TYPES, DELIVERY_TYPES } from '../../constants/constants';
const columns = [
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
  // {
  //   title: 'Producto(s)',
  //   dataIndex: 'products',
  //   key: 'products',
  // },
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
const SellsView = ({ reference, referenceAllStock, clients, refDashboarClients, refClientsBD }) => {
  
  const [showTableSells, setShowTableSells] = useState(false)
  const [showAddSale, setShowAddSale] = useState(false)
  const [listSales, setListSales] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [openModalProducts, setOpenModalProducts] = useState(false)
  const [productsForSaleAdded, setProductsForSaleAdded] = useState([])
  const [openModalAddClient, setOpenModalAddClient] = useState(false)
  const [options, setOptions] = useState([]);
  const [clientSelected, setClientSelected] = useState({})
  const [totalAmountOrder, setTotalAmountOrder] = useState(0)
  const [deliveryAMount, setDeliveryAMount] = useState(0)
  const [openModalConfigSale, setOpenModalConfigSale] = useState(false)
  const [saleSelected, setSaleSelected] = useState({})

  const [initialAmount, setInitialAmount] = useState(totalAmountOrder)

  let aux = [ ...listSales ]

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

  const openNotification = () => {
    notification.success({
      message: `USUARIO REGISTRADO`,
      description:
        'El usuario se registro con éxito.',
    });
  };

  const openNotificationEmptyValues = () => {
    notification.warning({
      message: `FORMULARIO INCOMPLETO`,
      description:
        'Verifica que todos los campos esten completos correctamente.',
    });
  };

  const openNotificationSaleREgistered = () => {
    notification.success({
      message: `VENTA REGISTRADO`,
      description:
        'La venta se registro con éxito.',
    });
  };

  const getAllStockFirebase = () => {
    let allIds = []
    let productsAux = []
    referenceAllStock.on("value", (snapshot) => {
         if (snapshot.val() !== null) {
          snapshot.forEach(e => {
            allIds.push(e.key)
          })
          console.log(allIds)
           productsAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
           productsAux = Object.values(productsAux)
           console.log(productsAux)
           productsAux = productsAux.map((e, index) => {
            if (allIds.length) {
              allIds.forEach(k => {
                e.keyBD = allIds[index]
              })
            }
            e.quantitySelected = 0
            return e
          })
          console.log(productsAux, "productsAux")
           setListProducts(productsAux)
         }
         return;
       }, (error) => {
         console.log("ERROR: " + error.code);
       });
  }
  const openModalAddClientUI = () => {
    setOpenModalAddClient(true)
  }
  const closeModalAddClient = () => {
    setOpenModalAddClient(false)
  }

  const openModalConfigSaleUI = () => {
    setOpenModalConfigSale(true)
  }
  const closeModalConfigSaleUI = () => {
    setOpenModalConfigSale(false)
  }
  const registerClient = (client) => {
    const service = new TusAccesoriosPeruServices(refClientsBD);

    service.saveClientBD(client)
  }
  const openModalUI = () => {
    if (listProducts) {
      let aux = [ ...listProducts ]
      aux = aux.map(el => {
        el.isSelected = el.isSelected ? el.isSelected : false
        el.confirmed = el.confirmed ? el.confirmed : false
        el.quantitySelected = (el.quantitySelected) ? el.quantitySelected : (el.quantitySelected > 0) ? el.quantitySelected : 0;
        return el;
      })
      setListProducts(aux)
    }
    setOpenModalProducts(true)
  }

  const closeModalProducts = () => {
    setOpenModalProducts(false)
    if (productsForSaleAdded && productsForSaleAdded.length === 0) {
      setProductsForSaleAdded([])
    }
  }
  const confirmAndModalProducts = () => {
    console.log(productsForSaleAdded)
    let amtotalAmountsount = 0
        let acumTotalAmount = []
        acumTotalAmount = productsForSaleAdded && productsForSaleAdded.map(el => el.quantitySelected * el.price)
        console.log(acumTotalAmount)
        amtotalAmountsount = (acumTotalAmount && acumTotalAmount.length) && acumTotalAmount.reduce((a,b) => a +b )
        console.log(amtotalAmountsount)
        setTotalAmountOrder(amtotalAmountsount)
    setOpenModalProducts(false)
    // let aux = [ ...listProducts ]
    // aux = aux.map(el => {
    //   el.qua
    // })
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
    let allIds = []
    let salesAux = []
       reference.on("value", (snapshot) => {
         if (snapshot.val() !== null) {
          snapshot.forEach(e => {
            allIds.push(e.key)
          })
           salesAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
           salesAux = Object.values(salesAux)
           salesAux = salesAux.map((e, index) => {
            if (allIds.length) {
              e.keyBD = `IDAUX${allIds[index]}`
            }
            return e
          })
           setListSales(salesAux)
           console.log(salesAux, "salesAux")
         }
         return;
       }, (error) => {
         console.log("ERROR: " + error.code);
       });
    }
    const onFinish = (values) => {
      const service = new TusAccesoriosPeruServices(refClientsBD);
      if (values && clientSelected) {    
        console.log(values)    
        if((values.address && values.address.length) && (productsForSaleAdded && productsForSaleAdded.length) && (values.phone && values.phone.length) && (values.deliveryType) && (values.payType)) {
        console.log(productsForSaleAdded)
        values.products = []
        values.amount = 0
        values.products = productsForSaleAdded;
        let amtotalAmountsount = 0
        let acumTotalAmount = []
        acumTotalAmount = productsForSaleAdded && productsForSaleAdded.map(el => el.quantitySelected * el.price)
        console.log(acumTotalAmount)
        amtotalAmountsount = (acumTotalAmount && acumTotalAmount.length) && acumTotalAmount.reduce((a,b) => a +b )
        console.log(amtotalAmountsount)
        values.amount = amtotalAmountsount
        if (values.deliveryAmount > 0) values.amount = values.amount + values.deliveryAmount

        values.idSell = Math.floor(Math.random() * (1000000 - 10000)) + 100
        console.log(clientSelected)
        values.idClient = clientSelected.key
        delete values.username;
        values.comment = values.clientComment.comment
        delete values.clientComment;
        setTotalAmountOrder(values.amount)

        getAllStockFirebase()
        openNotificationSaleREgistered()
        getAllSalesFirebase()
        console.log(listProducts)
        console.log('Success:', values);
        values.products = values.products.map(el => {
          el.soldUnits = (el.soldUnits > 0) ? el.quantitySelected + el.soldUnits : el.quantitySelected
          el.keyBD = `IDSALE${el.keyBD}`
          delete el.confirmed;
          delete el.isSelected;
          console.log(el)
          // service.updateStockDB(el.keyBD, el)
          return el
        })
        if (values.deliveryAmount === 'undefined' || values.deliveryAmount === undefined) values.deliveryAmount = 0
        console.log('values after update:', values);
        values.state = 1
        //   saveSaleBD(values)          
        // setShowAddSale(false)
        // setShowTableSells(true)
        // setProductsForSaleAdded([])
        // setClientSelected({})
        }
        else {          
        console.log('values after update:', values);
        openNotificationEmptyValues()
        }
      }
    };
    const saveSaleBD = (order) => {
      const service = new TusAccesoriosPeruServices(refClientsBD);

      service.saveSaleBD(order);
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const handleProduct = (product) =>{
      console.log("AQUI handleProduct")
      let aux = [ ...listProducts ]
      let auxConfirmeds = [...productsForSaleAdded ];
      console.log(product)
      console.log(aux)
      if (aux) {
        aux = aux.map(e => {
          if (product && (product.cod === e.cod)) {
            if (e.isSelected) {
              e.confirmed = true
              console.log(e)
              auxConfirmeds.push(e)
              setProductsForSaleAdded(auxConfirmeds)
            }
            e.isSelected = true;
            // setSelectProductForSale(true)
          }
          return e;
        })
        setListProducts(aux)
      }
    }
    const handleQuantitySelected = (value, product) => {
      let aux = [ ...listProducts ]
      console.log(value)
      console.log(product)
      // product.quantitySelected = value;
      aux = aux.map(e => {
        if (e.cod === product.cod) {
          e.quantitySelected = value
        }
        return e
      })
      setListProducts(aux)
    }

    const onSelect = (data) => {
      console.log('clients', clients);
      console.log('onSelect', data);
      if (clients) {
        clients.forEach(e => {
          if (e.name === data) return setClientSelected(e)
        })
      }
    };
    console.log(clientSelected)
    const onSearch = (searchText) => {
      console.log(clients)
      let aux = [ ...clients ]
      aux = clients && clients.map(el => {
        el.value = el.name
        return el
      })
      setOptions(
        // [{label: "dsad"}]
        !searchText ? [] : aux,
      );
    };
    const onFinishRegister = (values) => {
      if (values) {
        console.log(values)
        values.key = Math.floor(Math.random() * (1000000 - 10000)) + 100

        console.log(values)
        openNotification()
        registerClient(values)
        closeModalAddClient()
      }
    }
    const recalculateInitialAmount = () => {
      let amtotalAmountsount = 0
      let acumTotalAmount = []
      acumTotalAmount = productsForSaleAdded && productsForSaleAdded.map(el => el.quantitySelected * el.price)
      console.log(acumTotalAmount)
      amtotalAmountsount = (acumTotalAmount && acumTotalAmount.length) && acumTotalAmount.reduce((a,b) => a +b )
      console.log(amtotalAmountsount)
      return amtotalAmountsount
    }
    const handleDeliveryAmount = (value) => {
      let parsed = Number(value.target.value)
      let aux = totalAmountOrder
      console.log(totalAmountOrder)
      let result = 0
      console.log("initialAmount",initialAmount)
      console.log(parsed)
      if (parsed > 0) {
      console.log(parsed)
      console.log(totalAmountOrder)
      const initial = recalculateInitialAmount()
       result = Number(parsed) + Number(initial)
      console.log(result)
      setTotalAmountOrder(result)
      }
       else {
         const auxResult = recalculateInitialAmount()
         console.log("recalcular monto", auxResult)
         setTotalAmountOrder(auxResult)
       }
       value.preventDefault()
    }
    const focus = () => {

    }
    console.log(productsForSaleAdded)
    console.log(options, "options")
    console.log(aux, "ALL SALES")
    console.log(totalAmountOrder)
    let totalAmountAllSales = 0
    if (aux.length) {
       let acumTotalAmountAllSales = []
       acumTotalAmountAllSales = aux && aux.map(el => el.amount)
       console.log(acumTotalAmountAllSales)
       totalAmountAllSales = (acumTotalAmountAllSales && acumTotalAmountAllSales.length) && acumTotalAmountAllSales.reduce((a,b) => a +b )
       console.log(totalAmountAllSales)
    }
    const selectPropertyToChangeState = (obj) => {
      console.log(obj)
      setSaleSelected(obj)
      openModalConfigSaleUI()
      // setPropertySelected(obj)
      // setShowModalChangeState(true)
    }
    console.log(saleSelected)
    
  console.log(listSales)
  console.log(listProducts)
  // aux = aux && aux.map(e => {
  //   // e.products = (e && e.products.length > 0) && e.products.length
  //   return e
  // })
  console.log(aux)
  const cancelSale = () => {
    const service = new TusAccesoriosPeruServices(refClientsBD)
    const aux = { ...saleSelected }
    aux.state = aux.state === 2 ? 1 : 2
    
    service.updateSaleDB(aux.keyBD, aux)
    setOpenModalConfigSale(false)
  }
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
      {(showTableSells) && <Tag color="#108ee9">ACTUAL ACUMULADO S/ {totalAmountAllSales && totalAmountAllSales}</Tag>}
      {(showTableSells && listSales && listSales.length) && 
      <Table columns={columns} dataSource={listSales} 
      onRow={(property, rowIndex) => {
        return {
          onClick: event => {
            selectPropertyToChangeState(property)
          }
        };
      }}
      /> }
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
          <Button type="dashed" onClick={() => openModalAddClientUI()} >NUEVO CLIENTE</Button>

      <Form.Item
        label="Nombres completos"
        name="username"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your username!',
        //   },
        // ]}
      >
        {/* <Input style={{ width: 320 }} /> */}
        <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        // open={true}
        placeholder="input here"
      />

      </Form.Item>
      <Form.Item
        label="Telefono"
        name="phone"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your username!',
        //   },
        // ]}
      >
        <Input style={{ width: 130 }} />
      </Form.Item>
      <Form.Item
        label="Direccion de envio"
        name="address"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your username!',
        //   },
        // ]}
      >
        <Input style={{ width: 320 }} />
      </Form.Item>
      <Form.Item
        label="Referencia"
        name="reference"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your username!',
        //   },
        // ]}
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
        name="payType"
        rules={[{ required: true, message: 'Tipo de pago es requerido' }]}
      >
      <Select placeholder="Selecciona" style={{ width: 220 }} onChange={null}>
          {
            PAY_TYPES && PAY_TYPES.map(e => <Select.Option value={e.value}>{e.label}</Select.Option>)
          }
        </Select>
      </Form.Item>

       <Form.Item
        label="Tipo de entrega"
        name="deliveryType"
        rules={[{ required: true, message: 'Tipo de envío es requerido' }]}
      >

      <Select placeholder="Selecciona" style={{ width: 220 }} onChange={null}>
          {
            DELIVERY_TYPES && DELIVERY_TYPES.map(e => <Select.Option value={e.value}>{e.label}</Select.Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="Costo de envío"
        name="deliveryAmount"
      >
      <InputNumber min={1} value={deliveryAMount} onPressEnter={(deliveryAMount) => handleDeliveryAmount(deliveryAMount)}/>
      </Form.Item>

      <Form.Item name={['clientComment', 'comment']} label="Comentario:">
                <Input.TextArea value="" style={{ width: 260 }} />
              </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          VENDER
        </Button>
      </Form.Item>
      <strong>
        TOTAL: S/ {totalAmountOrder && totalAmountOrder}
        </strong>
    </Form>
      }
     </React.Fragment>
     <Modal visible={openModalProducts} onCancel={() => closeModalProducts()} onOk={() => confirmAndModalProducts()} width={650} okText="CONFIRMAR" cancelText="CERRAR"
                okButtonProps={{hidden: false}} cancelButtonProps={{hidden: false}} style={{ top: 20 }} className="modal-select-sale"
      >
        <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }} id="row-all-stock">
          {
            listProducts && listProducts.map(el => {
              return (
                <Col>
                <Card
                    id="card-product-stock"
                    className="card-all-stock"
                    style={{ width: 150, border: '1px solid #bbb' }}
                    >
                      <img
                        width={150}
                        src={(el && el.img) && el.img}
                        className="normal img-responsive"
                      />
                      <h5>{(el && el.name) && el.name}</h5>
                    <Button type="primary" size="large"  disabled={el.confirmed} onClick={() => handleProduct(el)}>{(el.isSelected && el.confirmed) ? 'AÑADIDO' : 'AÑADIR'}</Button>
                    <br/>
                    {
                      (el.isSelected) &&
                        <table id="table-add-sale">
                          <thead>
                            <tr>
                              <td>CANTIDAD</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                              <InputNumber min={0} value={el.quantitySelected} disabled={el.confirmed} onChange={(e) => handleQuantitySelected(e, el)} />
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    }
                </Card>
                <br/>
                </Col>
              )
            })
          }
          </Row>
      </Modal>

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
      
        <Modal visible={openModalConfigSale} onCancel={() => closeModalConfigSaleUI()} onOk={() => cancelSale()} width={750} cancelText="CERRAR" okText={saleSelected.state === 1 ? "CANCELAR VENTA" : "CONFIRMAR VENTA"}
                okButtonProps={{hidden: false}} cancelButtonProps={{hidden: false}} style={{ top: 20 }} className="modal-select-sale"
      >
        {
          saleSelected &&
          <table id="table-add-sale">
              <thead>
                <tr>
                  <td>COD CLIENTE</td>
                  <td>PRODUCTO</td>
                  <td>CANTIDAD</td>
                  <td>PRECIO</td>
                  <td>COMENTARIO</td>
                </tr>
              </thead>
              <tbody>
                {
                  (saleSelected && saleSelected.products) && saleSelected.products.map(e => {
                    return (
                      <tr>
                        <td>{saleSelected.idClient}</td>
                        <td>{e.name}</td>
                        <td>{e.quantitySelected}</td>
                        <td>{e.price}</td>
                        <td>{saleSelected.comment}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
        }
        <p>Estado de la venta</p>
        <b>{saleSelected.state === 1 ? "CONCRETADA" : "CANCELADA"}</b>
      </Modal>
  </div>
  )
}

export default SellsView;
