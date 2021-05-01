import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Modal, Form, Input  } from 'antd';
import '../../App.css';
import ModalComponent from '../../components/shared/modal';
import ContentGoProShop from '../../components/shared/modal/content-modal';
import { urlWhatsApp } from '../../constants/routes';
import TusAccesoriosPeruServices from '../../services/services';
import WishListModalComponent from '../shared/modal/wishlist-modal';
import { AccesoriesGoPRo, USER_ADMIN } from './../../constants/constants'
import MenuComponent from '../shared/menu';
import Footer from '../shared/footer';

const ShopComponent = ({reference, propsAux, refDashboardProducts, refClientsBD}) => {
    useEffect(() => {
        setTimeout(() => {
            // setProductsInitial(AccesoriesGoPRo)
            if (productsInitial.length < 1) getAllStockFirebase()
        }, 1200)

        setTimeout(() => {
        //    if (!initModal) setInitModal(true)
        }, 350)
    }, [])
    
    const getAllStockFirebase = () => {
        let allIds = []
          let productsAux = []
          refDashboardProducts.on("value", (snapshot) => {
               if (snapshot.val() !== null) {
                console.log("snapshot", snapshot)
                snapshot.forEach(e => {
                  allIds.push(e.key)
                })
                console.log("allIds", allIds)
                
                 productsAux = Object.values(snapshot.val()) && Object.values(snapshot.val());
                 productsAux = Object.values(productsAux)
                 productsAux = productsAux.map((e, index) => {
                   if (allIds.length) {
                    allIds.forEach((k) => {
                      e.keyBD = allIds[index]
                    })
                   }
                   return e
                 })
                 console.log(productsAux, "productsAux")
                 setProductsInitial(productsAux)
               }
               return;
             }, (error) => {
               console.log("ERROR: " + error.code);
             });
      //     // }
      //   }
      }
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
const [headerStyles, setHeaderStyles] = useState({
    height: "40px",
    background: "cornflowerblue",
    marginTop: "-40px"
})


const [wishList, setWishList] = useState([])
const [openModalWishListUI, setOpenModalWishList] = useState(false)
const [payNowUI, setPayNowUI] = useState(false)
const [quantityWishList, setQuantityWishList] = useState(1)
const [responseSentOrderWishList, setResponseSentOrderWishList] = useState(null)

const [yapeModal, setOpenYapeModal] = useState(false)

const [initModal, setInitModal] = useState(false)

const [modalLoginActive, setModalLoginActive] = useState(false)

const closeInitModal = () => {
    setInitModal(false)
}

const closeModalLogin = () => {
    setModalLoginActive(false)
}
const openModal = (el) => {
  setProductSelected(el)
  setOpenModalUI(true)
}
const openModalWishList = (el) => {
//   setProductSelected(el)
  setOpenModalWishList(true)
}

const openModalLogin = () => {
    setModalLoginActive(true)
  }

const closeModalWishList = () => {
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
            aux[0].value = 1
        }
        if (aux && aux[0]) {
            aux[0].value = ''
        }
    })
    setOpenModalUI(false)

  setFinalOrder(finalOrderObj)
}
const onFinish = (values) => {
    if (values && productSelected) {
        const service = new TusAccesoriosPeruServices(reference);

        if (values && values.quantityItems === undefined) {
            values.quantityItems = 1
        }
        setFinalOrder(values)
        console.log(values)
        console.log(productSelected)
        if (productSelected && productSelected.name) {
            values.productSelected = productSelected.name
        values.storeCode = '01'
        }
        let auxProductSelected = { ...productSelected }

        auxProductSelected.soldUnits = auxProductSelected.soldUnits + values.quantityItems
        console.log(auxProductSelected)

        const saleFromShop = {
            address: values.address,
            amount: productSelected.price * values.quantityItems,
            comment: 'Venta desde la web',
            delivertAmount: 0,
            deliveryType: 0,
            idClient: "0",
            idSell: Math.floor(Math.random() * (1000000 - 10000)) + 100,
            payType: '',
            phone: values.phones,
            products: [auxProductSelected],
            reference: values.clientComment.comment,
            state: 1
        }
        service.saveSaleBD(saleFromShop)
        updateStockFromWeb(auxProductSelected)
    
        setResponseSentEmail({
            data: {
                status: 200,
                whatsAppMsg: urlWhatsApp(values)
            }
        })
    }   
  };

  const updateStockFromWeb = (product) => {
    const service = new TusAccesoriosPeruServices(refClientsBD);
    service.updateStockDBfromWeb(product.keyBD, product)
    
  }

  const onFinishWishList = (values) => {
    const service = new TusAccesoriosPeruServices(reference);

    setFinalOrder(values)
    let aux = { ...values }
    console.log(values)
    console.log(wishList)
    aux.products = []
    aux.products = wishList
    // aux.storeCode = '01'
    console.log(aux)
    let amout = wishList && wishList.map(e => e.price * e.quantity)
    const acumAmount = amout && amout.reduce((a, b) => a +b )
    let auxProducts = [ ...wishList ]
    auxProducts = auxProducts && auxProducts.map(e => {
        delete e.checked
        e.quantitySelected = e.quantity
        delete e.quantity
        return e
    })
    console.log(auxProducts)
    const sale = {
        address: values.addressWishList,
        amount: acumAmount,
        comment: 'Venta desde la web',
        delivertAmount: 0,
        deliveryType: 0,
        idClient: "0",
        idSell: Math.floor(Math.random() * (1000000 - 10000)) + 100,
        payType: 0,
        phone: values.phonesWishList,
        products: auxProducts,
        reference: values.clientCommentWishList.comment,
        state: 1
    }
    console.log(sale)
    service.saveSaleBD(sale)
    auxProducts && auxProducts.forEach(e => {
        if (e.soldUnits === 0) e.soldUnits = e.quantitySelected
        else e.soldUnits = e.soldUnits + e.quantitySelected
        updateStockFromWeb(e)
    })


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
    }
    const onChangeQuantity = (e, productSelected) => {
        let aux = [ ...wishList]
        if (e) {
            if (wishList) {
                aux = aux.map(el => {
                    if (productSelected.cod === el.cod) {
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
            seQquantitySelected(evt)
        }
    }
    const handleProduct = (e) => {
        let auxList = [...wishList]
        let filterArray = []
        const auxProduct = { ...e.target.value}
        if (e) {
            if (!e.target.checked) {
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
            setWishList(filterArray)
        }
    }
    const openYapeModal = () => {
        setOpenYapeModal(true)
    }
    const closeYapeModal = () => {
        setOpenYapeModal(false)
    }
    console.log("productsInitial", productsInitial)
    const handleCategory = () => {}

    // LOGIN
    const layoutLogin = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayoutLogin = {
        wrapperCol: { offset: 8, span: 16 },
      };
      
  
        const onFinishLogin = (values) => {
          console.log('Success:', values);
          if (values) {
              console.log(propsAux)
              if (values.username === USER_ADMIN.username && values.password === USER_ADMIN.password && propsAux && propsAux.history) 
              propsAux.history.push('/dashboard')
              else
                alert("USUARIO INVALIDO")
          }
        };
      
        const onFinishFailedLogin = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
        // SCROLL
        const divHeader = document.querySelectorAll(".banner-scrolled")
        const debounce = (fn) => {
            let acum = 0

            // This holds the requestAnimationFrame reference, so we can cancel it if we wish
            let frame;
          
            // The debounce function returns a new function that can receive a variable number of arguments
            return (...params) => {
              
              // If the frame variable has been defined, clear it now, and queue for next frame
              if (frame) { 
                cancelAnimationFrame(frame);
              }
          
              // Queue our function call for the next frame
              frame = requestAnimationFrame(() => {
                
                // Call our function and pass any params we received
                fn(...params);
              });
          
            } 
          };
          
          
          // Reads out the scroll position and stores it in the data attribute
          // so we can use it in our stylesheets
          const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY;
            console.log(window.scrollY)
            console.log(divHeader)
            // if (divHeader && divHeader.length > 0) {
                if (window.scrollY >= 300) {
                    const headerStylesAux = {
                        height: "40px",
                        background: "cornflowerblue",
                        marginTop: "0"
                    }
                    // setHeaderStyles(headerStylesAux)
                    if (divHeader && divHeader.length > 0) divHeader[0].style.marginTop = 0
                    if (divHeader && divHeader.length > 0) divHeader[0].style.position = "fixed"
                    if (divHeader && divHeader.length > 0) divHeader[0].style.width = "100%"
                    if (divHeader && divHeader.length > 0) divHeader[0].style.zIndex = 99
                } 
                 if (window.scrollY <= 150) 
                     if (divHeader && divHeader.length > 0) divHeader[0].style.marginTop = "-40px"
            // }
          }
          
          // Listen for new scroll events, here we debounce our `storeScroll` function
          document.addEventListener('scroll', debounce(storeScroll), { passive: true });
          
          // Update scroll position for first time
          
    storeScroll();
  return (
    <div className="App">
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
                            <div className="banner-scrolled">
                                <p>ENCUENTRA DIVERSOS PRODUCTOS AL MEJOR PRECIO!! SIGUENOS EN FACEBOOK COMO "Tus Accesorios Perú"</p>
                            </div>
                            <MenuComponent onClick={handleCategory} handleLogin={openModalLogin} />
                            <img src="./images/logo-oficial.png" className="img-logo" />
                            <h1 className="document__title">TIENDA ONLINE </h1>
                            <h2 className="document__subtitle">Encuentra diversos accesorios para tu cámara de acción</h2>
                        </div>
                        <div className="document__content card">
                            <div className="typography">
                                <ContentGoProShop openModal={openModal} onChange={handleProduct} products={productsInitial} />

                                {/* <div className="document__signature">
                                    <AppImage src="/images/signature.jpg" width="160" height="55" />
                                </div> */}
                            </div>
                        </div>
                        <Footer openYapeModal={openYapeModal}/>
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
            <Modal visible={initModal} onCancel={() => closeInitModal()} width={850} cancelText="CERRAR" style={{ top: 20 }}
                okButtonProps={{hidden: true}} closable={true} cancelButtonProps={{hidden: 'hidden'}}
            >
                <div id="modal-init">
                        {/* <div id="init-message">UNETE A NUESTRO GRUPO EN FACEBOOK Y ENTERATE DE LAS ULTIMAS NOVEDADES Y SORTEOS QUE TENEMOS PARA TI</div> */}
                    <img src="./images/sorteo_abril.png" className="img-responsive" />
                        {/* <Button ghost><a href="https://www.facebook.com/groups/1160131384409719/" target="_blank" >UNIRME</a></Button> */}
                </div>
            </Modal>
            <Modal visible={modalLoginActive} onCancel={() => closeModalLogin()} width={450} cancelText="CERRAR" style={{ top: 20 }}
                okButtonProps={{hidden: true}} closable={true} cancelButtonProps={{hidden: true}}
            >
                <div id="modal-login">
                <Form
                    {...layoutLogin}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishLogin}
                    onFinishFailed={onFinishFailedLogin}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input width="150px" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayoutLogin}>
                        <Button type="primary" htmlType="ENTRAR">
                        INGRESAR
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </Modal>
    </div>
  );
}

export default ShopComponent;
