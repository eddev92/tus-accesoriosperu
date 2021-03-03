import React, { useState } from 'react';
import { Tooltip, Button } from 'antd';import './App.css';
import firebase from 'firebase';
import config from './config';
import ModalComponent from './components/shared/modal';
import ContentGoProShop from './components/shared/modal/content-modal';
import { urlWhatsApp } from './constants/routes';
import TusAccesoriosPeruServices from './services/services';

firebase.initializeApp(config);
const publicationRef = firebase.database();
const ref =	publicationRef.ref('/');

function App() {
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

const openModal = (el) => {
  console.log('open modal', el)
  setProductSelected(el)
  setOpenModalUI(true)
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
    // const names: any = document.querySelectorAll('#')
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
//   setProductSelected({fullNames: ''})
  setFinalOrder(finalOrderObj)
}
const onFinish = (values) => {
    const service = new TusAccesoriosPeruServices(ref);

    if (values && values.quantityItems === undefined) {
        values.quantityItems = 1
    }
    setFinalOrder(values)
    console.log(values)
    console.log(productSelected)
    if (productSelected && productSelected.name) {
        values.productSelected = productSelected.name
    console.log('Success:', values);
    // sentMail(values)
    }
    // window.location="https://wa.me/51994381708?texto=Quisiera%20consultar%20sobre%20la%20oferta%20de%20departamento"
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
                                <ContentGoProShop openModal={openModal}/>

                                {/* <div className="document__signature">
                                    <AppImage src="/images/signature.jpg" width="160" height="55" />
                                </div> */}
                            </div>
                        </div>
                        <div className="document__footer">
                            <footer class="site-footer">
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
    </div>
  );
}

export default App;
