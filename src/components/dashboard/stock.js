import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Card , Row, Col, Image, Tag, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TusAccesoriosPeruServices from '../../services/services';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Meta } = Card;
const StockView = ({ products = [], showProducts = () => {}, refSaveProducts }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAllProducts, setShowAllroducts] = useState(false);
  const [fileList, setFileList] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  console.log(products)
  let acumTotalAmount = 0;
  let totalAmounts = []
  totalAmounts = products && products.map(el => el.price * el.stock)
  console.log(totalAmounts)
  acumTotalAmount = (totalAmounts && totalAmounts.length) && totalAmounts.reduce((a,b) => a +b ) 
  console.log(acumTotalAmount)

  const showProductsUI = () => {
    if (showAddProduct) setShowAddProduct(false) 
    showProducts()
    setShowAllroducts(true)
  }

  const addProduct= () => {
    if (showAllProducts) setShowAllroducts(false)
    setShowAddProduct(true)
  }

  const onFinishAddProduct = (values) => {
    if (values && products) {
      const service = new TusAccesoriosPeruServices(refSaveProducts)

      values.soldUnits = 0
      values.img = "./images/gopro/48_1.png"
      values.cod = products[products.length - 1] && products[products.length - 1].cod + 1
      console.log(products)
      console.log(values)
      service.saveProductBD(values)
    }
  }
  const onFinishFailedAddProduct = (errorInfo) =>{

  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result)
        resolve(reader.result);
      }
      reader.onerror = error => reject(error);
    });
  }
  const handleCancel = () => setPreviewVisible(false)
  const handleChange = ({fileList}) => {
    let resultAux = null
    if (fileList) {
      setFileList(fileList)
      const result = getBase64(fileList[0].originFileObj)
      if (result) {
        console.log(result)
        const formData = new FormData()
        fileList.forEach((file, i) => {
          formData.append(i, file)
        })
        result.then(response => resultAux = response)
        fetch(`http://grupoinversionistalinus.com/public_html/tusaccesoriosperu.com/images/gopro`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: resultAux
        })
        .then(res => res.json())
      }
    }
  }
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log("fileList", fileList)
    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <React.Fragment>
    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row">
    <div className="1 card-real-estate" onClick={() => showProductsUI()}>
      <div className="card_image">
        <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
        <div className="card_title title-white">
            <p>PRODUCTOS </p>
          </div>
      </div>
      </div>
      </Col>
      <Col className="gutter-row">
      <div className="1 card-real-estate" onClick={() => addProduct()}>
      <div className="card_image">
        <img src="./images/btn-dashboard.jpg" className="img-responsive"/>
        <div className="card_title title-white">
            <p>AGREGAR </p>
          </div>
      </div>
      </div>
    </Col>
    </Row>
    {(showAllProducts || showAddProduct) && <hr id="hr-stock" />}
    {
      showAddProduct &&
      <div>
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishAddProduct}
      onFinishFailed={onFinishFailedAddProduct}
    >
        <Form.Item
          label="Nombre del producto"
          name="name"
        >
          <Input style={{ width: 320 }} />
        </Form.Item>

        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>

        <Form.Item
          label="Descripción"
          name="desc"
        >
          <Input style={{ width: 320 }} />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="price"
        >
        <InputNumber min={1} value="" onPressEnter={() => null} />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
        >
          <InputNumber min={1} value="" onPressEnter={() => null} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          AGREGAR PRODUCTO
        </Button>
      </Form>
      </div>
    }
    {showAllProducts && <Tag color="#f50">INVERSION </Tag>}
    {showAllProducts && <Tag color="#87d068">TOTAL INVENTARIO <br /><b>{acumTotalAmount && `S/ ${acumTotalAmount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b></Tag>}
    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }} id="row-all-stock">
    {
      (showAllProducts && products) && products.map(el => {
        return (
          <Col>
          <Card
              hoverable
              id="card-product-stock"
              className="card-all-stock"
              style={{ width: 180 }}
              cover={
                <Image
                  width={180}
                  src={(el && el.img) && el.img}
                  className="normal img-responsive"
                  placeholder="Cargando..."
                />}
              >
                <Meta
              title={(el.name) && el.name.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ")}
              description={`CANTIDAD... ${el.stock} \b PRECIO... ${el.price}`}
            />
              <br></br>
              <table id="table-stock">
          <thead>
            <tr>
              <td>VENDIDOS</td>
              <td>STOCK</td>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>{el.soldUnits}</td>
                <td>{el.stock - el.soldUnits}</td>
              </tr>
              </tbody>
              </table>
              <br></br>
              <Button type="primary" size="large">AÑADIR</Button>
          </Card>
          </Col>
        )
      })      
    }
    </Row>
  </React.Fragment>
  )
}

export default StockView;
