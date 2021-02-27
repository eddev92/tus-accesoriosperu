export const urlWhatsApp = () => "https://wa.me/51994381708";
export const urlWhatsAppModified = (order, product) => {
  let url = ''
  if (order && product) {
    product.name = product.name.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
    order.fullNames = order.fullNames.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
    order.address = order.address.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
    url = `https://wa.me/51994381708?texto=Quisiera%este%producto%${product.name}%cantidad%${order.quantityItems}%direccion%${order.address}%preguntar%por:%${order.fullNames}%telefono:%${order.phones}%precio:%${product.price}`
  }    
  return url
};