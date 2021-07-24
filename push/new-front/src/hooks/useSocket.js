import io from 'socket.io-client';
import { useState } from 'react';
const useSocket = () => {
  const [store, setStore] = useState('');
  const [addCard, setAddCard] = useState(() => {});
  const [deleteCard, setDeleteCard] = useState(() => {});
  const socket = io('http://localhost:4000');
  const startListeningKitchen = () => {
    this.socket.emit('startListeningMenu', this.store);
    this.socket.on('menuChange', (data) => {
      data.after.forEach((el, index) => {
        this.addCard(el.status, el.id, el.name);
        this.deleteCard(
          data.before[index].status,
          data.before[index].id,
          data.before[index].name
        );
      });
    });
  };
  const stopListeningKitchen = () => {
    this.socket.emit('stopListeningMenu');
  };
};
