import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = io('http://localhost:4000');
  }
  setDetail = (
    store,
    kitchenChange,
    orderChange,
    orderMenuChange,
    logChange
  ) => {
    this.kitchenChange = kitchenChange;
    this.store = store;
    this.orderChange = orderChange;
    this.orderMenuChange = orderMenuChange;
    this.logChange = logChange;
  };
  listeningKitchen = () => {
    console.log('start : ', this.store);
    this.socket.emit('startListeningMenu', this.store);
    this.socket.on('orderChange', (data) => {
      console.log('orderChange : ', data);
      this.orderChange(data);
    });
    this.socket.on('menuChange', (data) => {
      console.log('menuChange : ', data);
      this.kitchenChange(data);
      this.orderMenuChange(data);
    });
    this.socket.on('logChange', (data) => {
      console.log('logChange : ', data);
      this.logChange(data);
    });
  };
  sendChange = (message) => {
    this.socket.emit('orderChangeStatus', message);
  };
  unListeningKitchen = () => {
    console.log('stopListening : ', this.store);
    this.socket.emit('stopListeningMenu', this.store);
    this.socket.disconnect();
  };
}

export default Socket;
