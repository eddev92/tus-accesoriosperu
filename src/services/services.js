class TusAccesoriosPeruServices {
  constructor(ref) {
    this.ref = ref;
  }
	deleteClientDB = (client) => {
		const clientsRef = this.ref.child("clients");
		return clientsRef.child(client.id).remove();
  }
  
  
  saveClientWishLIst = (order) => {
    if (this.ref) {
      const clientsRef = this.ref.child("clients");
      return clientsRef.push(order);
    }
	}
// ADMIN DASHBOARD

updateStockDB = (id, product) => {
  const aux = id && id.replace('IDSALE', '')
  console.log(aux)
  console.log(product)
  const clientsRef = this.ref.child("products");

  return clientsRef.child(aux).update(product);
}
updateStockDBfromWeb = (id, product) => {
  const clientsRef = this.ref.child("products");

  return clientsRef.child(id).update(product);
}

updateSaleDB = (id, sale) => {
  const aux = id && id.replace('IDAUX', '')
  console.log(aux)
  console.log(sale)
  const clientsRef = this.ref.child("sales");

  return clientsRef.child(aux).update(sale);
}

  loadProducts = (products) => {
    if (this.ref) {
      const clientsRef = this.ref.child("products");
      if (products) {
        products.forEach(element => {
          return clientsRef.push(element);
        });
      }      
    }
	}

  loadSells = (element) => {
    if (this.ref) {
      const clientsRef = this.ref.child("sales");
      if (element) {
          return clientsRef.push(element);
      }      
    }
  }
  
  loadClientsBD = (client) => {
    if (this.ref) {
      const clientsRef = this.ref.child("clientsBD");
      if (client) {
          return clientsRef.push(client);
      }      
    }
  }
  
  saveClientBD = (client) => {
    if (this.ref) {
      const clientsRef = this.ref.child("clientsBD");
      return clientsRef.push(client);
    }
	}
  
  saveProviderBD = (provider) => {
    if (this.ref) {
      const clientsRef = this.ref.child("providersBD");
      return clientsRef.push(provider);
    }
	}

  saveSaleBD = (sale) => {
    if (this.ref) {
      const clientsRef = this.ref.child("sales");
      return clientsRef.push(sale);
    }
	}

  saveProductBD = (product) => {
    if (this.ref) {
      const clientsRef = this.ref.child("products");
      return clientsRef.push(product);
    }
	}
  // saveClient = (order, productSelected) => {
  //   if (this.ref) {
  //     console.log(this.ref)
  //   let newOrder = {}
  //   newOrder = { ...order }
  //   console.log(newOrder, "newOrder")
  //   console.log(order)
  //   newOrder.price = productSelected.price
  //   console.log(productSelected)
  //   console.log(newOrder, "newOrder")
  //     // const clientsRef = this.ref.child("clients");
  //     // return clientsRef.push(newOrder);
  //   }
	// }
}

export default TusAccesoriosPeruServices;
