import {
  KITCHEN_ADD_CARD,
  KITCHEN_DRAG_HAPPENDED,
  KITCHEN_DELETE_CARD,
  KITCHEN_SET_ALL_ORDER,
  KITCHEN_CHANGE,
} from '../types';
import axios from 'axios';
export const addCardKitchen = (status, id, name) => (dispatch) => {
  dispatch({
    type: KITCHEN_ADD_CARD,
    payload: { name, id, status },
  });
};

export const deleteCardKitchen = (status, id, name) => (dispatch) => {
  dispatch({
    type: KITCHEN_DELETE_CARD,
    payload: { name, id, status },
  });
};

export const kitchenChange = (change) => (dispatch) => {
  dispatch({
    type: KITCHEN_CHANGE,
    payload: change,
  });
};

export const setKitchenData = () => (dispatch) => {
  let menus = [];
  axios
    .get('http://localhost:5000/kaidow-se/asia-southeast2/api/getAllOrder')
    .then((res) => {
      let data = res.data.data;
      // console.log('data = ', data);
      data.map((item) => {
        item.menuItems.map((menu) => {
          menu.addOn.map((addOn) => {
            menus.push({
              status: addOn.status,
              id: addOn.id,
              name: addOn.name,
              quantity: addOn.quantity,
              orderType: addOn.orderType,
            });
            // dispatch(addCardKitchen(addOn.status, addOn.id, addOn.name));
          });
          menus.push({
            status: menu.status,
            id: menu.id,
            name: menu.name,
            orderType: menu.orderType,
            quantity: menu.quantity,
          });
          // dispatch(addCardKitchen(menu.status, menu.id, menu.name));
        });
      });
      // console.log('total = ', menus);
      dispatch({ type: KITCHEN_SET_ALL_ORDER, payload: menus });
    });
};

export const sortKitchen = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  socket
) => (dispatch) => {
  const Socket = socket.current;
  dispatch({
    type: KITCHEN_DRAG_HAPPENDED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      Socket,
    },
  });
  // socket.emit
};
