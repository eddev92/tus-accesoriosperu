import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Modal, Menu, Switch, Alert  } from 'antd';
import '../../App.css';
import ModalComponent from '../../components/shared/modal';
import ContentGoProShop from '../../components/shared/modal/content-modal';
import { urlWhatsApp } from '../../constants/routes';
import TusAccesoriosPeruServices from '../../services/services';
import WishListModalComponent from '../shared/modal/wishlist-modal';
import { TechnologyProducts } from './../../constants/constants'
import MenuComponent from '../shared/menu';

const TechnologyComponent = ({ reference }) => {
  useEffect(() => {
    setTimeout(() => {
        setProductsInitial(TechnologyProducts)
    }, 1200)
})
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
const [productsInitial, setProductsInitial] = useState([])


const [wishList, setWishList] = useState([])
const [openModalWishListUI, setOpenModalWishList] = useState(false)
const [payNowUI, setPayNowUI] = useState(false)
const [quantityWishList, setQuantityWishList] = useState(1)
const [responseSentOrderWishList, setResponseSentOrderWishList] = useState(null)

const [yapeModal, setOpenYapeModal] = useState(false)

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
console.log('close modal wishlist')
console.log(responseSentOrderWishList)
setOpenModalWishList(false)
setPayNowUI(false)
if (responseSentOrderWishList && responseSentOrderWishList.data) {
    // handleReturnOption(1)
    setWishList([])
    setProductsInitial([])
    setResponseSentOrderWishList(null)
}
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
values.storeCode = '01'
}
service.saveClient(values, productSelected)

setResponseSentEmail({
    data: {
        status: 200,
        whatsAppMsg: urlWhatsApp(values)
    }
})
};

const onFinishWishList = (values) => {
console.log(reference)
const service = new TusAccesoriosPeruServices(reference);

setFinalOrder(values)
let aux = { ...values }
console.log(values)
console.log(wishList)
aux.products = []
aux.products = wishList
console.log(aux)
aux.storeCode = '01'
service.saveClientWishLIst(aux)

setResponseSentOrderWishList({
    data: {
        status: 200,
        whatsAppMsg: urlWhatsApp(values)
    }
})
}

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
const payFinishOrder = () => {

}
const backToShop = () => {
    closeModal()
    setResponseSentEmail(null)
}
const handleReturnOption = (option) => {
    if (option === 1) {
        setResponseSentOrderWishList(null)
        let aux = [ ...wishList ]
        aux = aux.map(e => {
            if (e.checked) e.checked = false
            return e;
        })
        setWishList(aux)
        setProductsInitial([])
        setWishList([])
    }
    
        closeModalWishList()
        let aux = [ ...wishList ]
        aux = aux.map(e => {
            if (e.checked) e.checked = false
            return e;
        })
        setWishList(aux)
        setProductsInitial([])
        setWishList([])

}
const backToShopFromWishList = () => {
    setOpenModalWishList(false)
    setResponseSentOrderWishList(null)
    let aux = [ ...wishList ]
    aux = aux.map(e => {
        if (e.checked) e.checked = false
        return e;
    })
    setPayNowUI(false)
    setWishList(aux)
    setProductsInitial([])
    setWishList([])
    console.log(wishList)
}
const onChangeQuantity = (e, productSelected) => {
    let aux = [ ...wishList]
    if (e) {
        console.log(e)
        console.log(productSelected)
        console.log(wishList)
        if (wishList) {
            aux = aux.map(el => {
                if (productSelected.cod === el.cod) {
                    console.log(el)
                    el.quantity = e
                }
                return el
            })
        }
        setWishList(aux)
    }
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
                    if ((el) && el.quantity) el.quantity = 1
                }
                return el
            })
        } else {
            auxProduct.checked = e.target.checked
            auxProduct.quantity = 1
            auxList.push(auxProduct)
        }
        auxList.forEach(e => {if (e && e.cod)filterArray.push(e)})
        console.log(filterArray)
        setWishList(filterArray)
    }
}
const openYapeModal = () => {
    setOpenYapeModal(true)
}
const closeYapeModal = () => {
    setOpenYapeModal(false)
}
console.log(wishList, "wishList")
const handleCategory = () => {}
return (
<div className="App">
    <Alert message="Espacio tecnológico de TUSACCESORIOS PERU" type="info" closable={false} onClick={() => window.location.href="/"} />
<a href="tel:+51994381708" target="_blank" className="call-img">
    <img src="./images/logo-call.png" />
</a>
    <a href="https://wa.me/51994381708" target="_blank" className="whats-img">
    <Tooltip placement="left" title={<span>En qué podemos ayudarte?</span>}>
        <img src="./images/logo-whats.png" />
  </Tooltip>
    </a>
   <div className="block">
            <div className="container">
                <div className="document gopro">
                    <div className="document__header">
                        <MenuComponent onClick={handleCategory}/>
                        <img src="./images/logo-oficial.png" className="img-logo" />
                        <h1 className="document__title">VARIEDAD </h1>
                        <h2 className="document__subtitle">Encuentra diversos productos al <b>MEJOR</b> precio</h2>
                    </div>
                    <div className="document__content card">
                        <div className="typography">
                            <ContentGoProShop openModal={openModal} onChange={handleProduct} products={productsInitial} />

                            {/* <div className="document__signature">
                                <AppImage src="/images/signature.jpg" width="160" height="55" />
                            </div> */}
                        </div>
                    </div>
                    <div className="document__footer">
                        <footer class="site-footer">
                            {/* <p><a mailto="ventas@starscorporation.pe">ventas@starscorporation.pe</a></p> */}
                            <hr></hr>
                            <div class="container">
                                <div class="row">
                                <div class="col-md-8 col-sm-6 col-xs-12">
                                    <p class="copyright-text">Copyright &copy; 2020 - 2021 Todos los derechos reservados por 
                                <a href="https://starscorporation.pe/" target="_blank"> Stars Corporation</a>
                                    </p>
                                </div>

                                <div class="col-md-4 col-sm-6 col-xs-12 brands-payments">
                                    <ul>
                                    <li>
                                        <img src="./images/visa.png" />
                                    </li>
                                    <li>
                                        <img src="./images/mscd.png" />
                                    </li>
                                    <li onClick={openYapeModal}>
                                        <img src="./images/yape.png" style={{cursor: 'pointer'}}/>
                                    </li>
                                    </ul>
                                </div>
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
        payFinishOrder={payFinishOrder}
        onFinishWishList={onFinishWishList}
        onChangeQuantity={onChangeQuantity}
        quantityWishList={quantityWishList}
        responseSentOrderWishList={responseSentOrderWishList}
        backToShopFromWishList={backToShopFromWishList}
        />
        <Modal visible={yapeModal} onCancel={() => closeYapeModal()} width={240} cancelText="CERRAR"
            okButtonProps={{hidden: true}} closable={true}
        >
            <img  src="./images/yape-modal.jpeg" className="yape-qr"/>
        </Modal>
</div>
);
}

export default TechnologyComponent;
