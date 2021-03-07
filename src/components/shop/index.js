import React, { useState } from 'react';
import { Tooltip, Button, Checkbox  } from 'antd';
import '../../App.css';
import ModalComponent from '../../components/shared/modal';
import ContentGoProShop from '../../components/shared/modal/content-modal';
import { urlWhatsApp } from '../../constants/routes';
import TusAccesoriosPeruServices from '../../services/services';
import WishListModalComponent from '../shared/modal/wishlist-modal';

const ShopComponent = ({reference}) => {
  const finalOrderObj = {
    fullNames:'',
    dni: '',
    phone: '',
    address: '',
    quantity: 1,
    comment: ''
}
const productSelectedInitial = {
    comment: '',
    quantity: 1
}
const [openModalUI, setOpenModalUI] = useState(false)
const [quantitySelected, seQquantitySelected] = useState(1)
const [responseSentEmail, setResponseSentEmail] = useState(null)
const [productSelected, setProductSelected] = useState(productSelectedInitial)
const [finalOrder, setFinalOrder] = useState(finalOrderObj)


const [wishList, setWishList] = useState([])
const [openModalWishListUI, setOpenModalWishList] = useState(false)
const [payNowUI, setPayNowUI] = useState(false)

const openModal = (el) => {
  console.log('open modal', el)
  setProductSelected(el)
  setOpenModalUI(true)
}
const openModalWishList = (el) => {
  console.log('open modal', el)
//   setProductSelected(el)
  setOpenModalWishList(true)
}
const closeModalWishList = () => {
    setOpenModalWishList(false)
}
const closeModal = () => {
    const listInputs = [
        'basic_fullNames',
        'basic_dni',
        'basic_phones',
        'basic_username',
        'basic_quantityItems',
        'basic_clientComment',
    ]

    listInputs.forEach((el) => {
        const aux = document.querySelectorAll(`#${el}`)
        if (aux && aux[0] && aux[0].id === 'basic_quantityItems') {
            console.log(aux[0])
            aux[0].value = 1
        }
        if (aux && aux[0]) {
            console.log(aux[0])
            aux[0].value = ''
        }
    })
    console.log('close modal')
    setOpenModalUI(false)

  setFinalOrder(finalOrderObj)
}
const onFinish = (values) => {
    console.log(reference)
    const service = new TusAccesoriosPeruServices(reference);

    if (values && values.quantityItems === undefined) {
        values.quantityItems = 1
    }
    setFinalOrder(values)
    console.log(values)
    console.log(productSelected)
    if (productSelected && productSelected.name) {
        values.productSelected = productSelected.name
    console.log('Success:', values);
    }
    service.saveClient(values, productSelected)

    setResponseSentEmail({
        data: {
            status: 200,
            whatsAppMsg: urlWhatsApp(values)
        }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const payNow = () => {
setPayNowUI(true)
  }
const backToShop = () => {
    closeModal()
    setResponseSentEmail(null)
}
    const setQuantity = (evt) => {
        if (evt) {
            console.log(evt)
            seQquantitySelected(evt)
        }
    }
    const handleProduct = (e) => {
        console.log(e)
        let auxList = [...wishList]
        let filterArray = []
        const auxProduct = { ...e.target.value}
        console.log(e.target.checked)
        console.log(e.target.value)
        if (e) {
            if (!e.target.checked) {
                console.log("entro")
                auxList = auxList.map((el, index) => {
                    if (el.cod === e.target.value.cod) {
                        el.checked = false
                        el = {}
                    }
                    return el
                })
            } else {
                auxProduct.checked = e.target.checked
                auxList.push(auxProduct)
            }
            auxList.forEach(e => {if (e && e.cod) filterArray.push(e)})
            setWishList(filterArray)
        }
    }
    console.log(wishList, "wishList")
  return (
    <div className="App">
        <a href="https://wa.me/51994381708" target="_blank" className="whats-img">
        <Tooltip placement="left" title={<span>En qué podemos ayudarte?</span>}>
            <img src="./images/logo-whats.png" />
      </Tooltip>
        </a>
       <div className="block">
                <div className="container">
                    <div className="document gopro">
                        <div className="document__header">
                            <h1 className="document__title">BIENVENIDO A NUESTRA FERRETERIA DE LAS CAMARAS</h1>
                            <h2 className="document__subtitle">Encuentra diversos accesorios para tu cámara de acción</h2>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                                <ContentGoProShop openModal={openModal} onChange={handleProduct} />

                                {/* <div className="document__signature">
                                    <AppImage src="/images/signature.jpg" width="160" height="55" />
                                </div> */}
                            </div>
                        </div>
                        <div className="document__footer">
                            <footer class="site-footer">
                                <p><a mailto="ventas@starscorporation.pe">ventas@starscorporation.pe</a></p>
                                <hr></hr>
                                <div class="container">
                                    <div class="row">
                                    <div class="col-md-8 col-sm-6 col-xs-12">
                                        <p class="copyright-text">Copyright &copy; 2020 - 2021 Todos los derechos reservados por 
                                    <a href="https://starscorporation.pe/" target="_blank"> Stars Corporation</a>
                                        </p>
                                    </div>

                                    {/* <div class="col-md-4 col-sm-6 col-xs-12">
                                        <ul class="social-icons">
                                        <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                        <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                        <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                                        <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
                                        </ul>
                                    </div> */}
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
            <Button type="primary" onClick={openModalWishList} danger id="btn-wishlist" className={(wishList.length > 0 ) ? "active" : "desactive"}>
            MI LISTA DE DESEO
            </Button>
            <ModalComponent 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                finalOrder={finalOrder}
                visible={openModalUI}
                closeModal={closeModal}
                productSelected={productSelected}
                layout={layout}
                tailLayout={tailLayout}
                responseSentEmail={responseSentEmail}
                backToShop={backToShop}
                setQuantity={setQuantity}
                quantitySelected={quantitySelected}
            />
            <WishListModalComponent 
            visible={openModalWishListUI}
            closeModal={closeModalWishList}
            products={wishList}
            payNow={payNow}
            payNowUI={payNowUI}
            />
    </div>
  );
}

export default ShopComponent;
