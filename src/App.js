import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ModalComponent from './components/shared/modal';
import ContentGoProShop from './components/shared/modal/content-modal';
import { urlWhatsApp } from './constants/routes';

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
// const sentMail = (order: any) => {
//     console.log(order)
//     // axios.defaults.headers.post['Content-Type'] ='application/json';
//     axios.defaults.headers.post['Authorization'] ='Pkb2TItFQuCBtCP-JROzEg';
//     axios.post({
//         method: 'post', //you can set what request you want to be
//         url: 'https://starscorporation.pe/api/email',
//         data: order,
//         headers: {
//           Authorization: 'Pkb2TItFQuCBtCP-JROzEg',
//           ContentType: 'application/json'
//         }})
//     .then(function (response: any) {
//       // handle success
//       console.log(response);
//       setResponseSentEmail(response)
//     })
//     .catch(function (error: any) {
//       // handle error
//       console.log(error);
//       setResponseSentEmail(error)
//     })
  
// }
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
       <div className="block">
                <div className="container">
                    <div className="document gopro">
                        <div className="document__header">
                            <h1 className="document__title">BIENVENIDO A NUESTRA FERRETERIA DE LAS CAMARAS</h1>
                            <h4 className="document__subtitle">Encuentra diversos accesorios para tu cámara de accion</h4>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                                <ContentGoProShop openModal={openModal}/>

                                {/* <div className="document__signature">
                                    <AppImage src="/images/signature.jpg" width="160" height="55" />
                                </div> */}
                            </div>
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
