class TusAccesoriosPeruServices {
  constructor(ref) {
    this.ref = ref;
  }
	deleteClientDB = (client) => {
		const clientsRef = this.ref.child("clients");
		return clientsRef.child(client.id).remove();
  }
  
	updateClientDB = (id, client) => {
		const clientsRef = this.ref.child("clients");

		return clientsRef.child(id).child('client').update(client);
  }
  
  saveClient = (order, productSelected) => {
    let newOrder = {}
    newOrder = { ...order }
    console.log(newOrder, "newOrder")
    console.log(order)
    newOrder.price = productSelected.price
    console.log(productSelected)
		const clientsRef = this.ref.child("clients");
		return clientsRef.push(newOrder);
	}
}

export default TusAccesoriosPeruServices;
