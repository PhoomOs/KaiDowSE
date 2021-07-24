import { CodeSharp } from '@material-ui/icons';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {
  ADD_ORDER_ITEM,
  ADD_MENU_IN_ORDER,
  DELETE_ORDER_ITEM,
  DELETE_MENU_IN_ORDER,
  UPDATE_ORDER_ITEM,
  GET_ALL_ORDER_ITEM,
  ORDER_CHANGE,
  EDIT_ORDER_ITEM,
  ORDER_MENU_CHANGE,
  CHANGE_BILL_LIST,
  SPLIT_ORDER_ITEM,
} from '../types';

const initialState = {
  orderItems: [],
  summary: 0,
  loading: false,
  changeBillList: { type: null, payload: [], isCheckAll: false },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDER_ITEM:
      return {
        ...state,
        orderItems: [...action.payload],
        loading: false,
      };
    case ADD_ORDER_ITEM:
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload],
        loading: false,
      };
    case EDIT_ORDER_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload }
            : order
        ),

        loading: false,
      };
    case DELETE_ORDER_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.filter(
          (orderSchema) => orderSchema.id !== action.payload
        ),
      };
    case CHANGE_BILL_LIST:
      return {
        ...state,
        changeBillList: action.payload,
      };
    case DELETE_MENU_IN_ORDER:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        orderItems: state.orderItems.filter(
          (orderSchema) => orderSchema.id !== action.payload.id // i don't know what it mean ?
        ),
      };
    case ORDER_CHANGE:
      // console.log('before orderChange : ', state);
      const a = action.payload.reduce((prev, change) => {
        // console.log('Change = ', change);
        if (change.status === 'update') {
          // console.log('UPDATE!!');
          // console.log('prev = ', prev.orderItems);
          return prev.orderItems.map((order) =>
            order.id === change.after.id
              ? { ...order, ...change.after, menuItems: order.menuItems }
              : order
          );
        } else if (change.status === 'delete') {
          // console.log('DELETE!!');
          return prev.orderItems.filter(
            (order) => order.id != change.before.id
          );
        } else if (change.status === 'add') {
          // console.log('ADD!!');
          let added = false;
          prev.orderItems.map((item) => {
            // console.log(
            //   'item id = ',
            //   item.id,
            //   '  change.after.id = ',
            //   change.after.id
            // );
            if (item.id === change.after.id) {
              // console.log('ALREADDDED!!');
              added = true;
            }
          });
          if (added === false) {
            return [...prev.orderItems, { ...change.after }];
          } else {
            return [...prev.orderItems];
          }
        }
      }, state);
      // console.log('after orderChange : ', { ...state, orderItems: a });
      return { ...state, orderItems: a };

    case ORDER_MENU_CHANGE:
      // console.log('orderMenuchange before = ', state);
      const ORDER = action.payload.reduce((prev, change) => {
        if (change.status === 'add') {
          if (change.after.type === 'menu') {
            let added = false;
            prev.map((order) => {
              if (order.id === change.after.orderId) {
                order.menuItems.map((menu) => {
                  if (menu.id === change.after.id) {
                    // console.log('ALREADY ADDED MENU');
                    added = true;
                  }
                });
              }
            });
            if (!added) {
              return prev.map((order) =>
                order.id === change.after.orderId
                  ? {
                      ...order,
                      menuItems: [...order.menuItems, { ...change.after }],
                    }
                  : order
              );
            } else {
              return prev;
            }
          } else {
            let added = false;
            prev.map((order) => {
              if (order.id === change.after.orderId) {
                order.menuItems.map((menu) => {
                  if (menu.id === change.after.menuId) {
                    menu.addOn.map((addOn) => {
                      if (addOn.id === change.after.id) {
                        added = true;
                      }
                    });
                  }
                });
              }
            });
            if (!added) {
              return prev.map((order) =>
                order.id === change.after.orderId
                  ? {
                      ...order,
                      menuItems: order.menuItems.map((menu) =>
                        menu.id === change.after.menuId
                          ? {
                              ...menu,
                              addOn: [...menu.addOn, { ...change.after }],
                            }
                          : menu
                      ),
                    }
                  : order
              );
            } else {
              return prev;
            }
          }
        } else if (change.status === 'update') {
          if (change.after.type === 'menu') {
            // console.log('update menu ', change.after);
            return prev.map((order) =>
              order.id === change.after.orderId
                ? {
                    ...order,
                    menuItems: order.menuItems.map((menu) =>
                      menu.id === change.after.id ? { ...change.after } : menu
                    ),
                  }
                : order
            );
          } else {
            return prev.map((order) =>
              order.id === change.after.orderId
                ? {
                    ...order,
                    menuItems: order.menuItems.map((menu) =>
                      menu.id === change.after.menuId
                        ? {
                            ...menu,
                            addOn: menu.addOn.map((addOn) =>
                              addOn.id === change.after.id
                                ? { ...change.after }
                                : addOn
                            ),
                          }
                        : menu
                    ),
                  }
                : order
            );
          }
        } else if (change.status === 'delete') {
          if (change.after.type === 'menu') {
            return prev.map((order) =>
              order.id === change.after.orderId
                ? {
                    ...order,
                    menuItems: order.menuItems.filter(
                      (menu) => menu.id !== change.after.id
                    ),
                  }
                : order
            );
          } else {
            return prev.map((order) =>
              order.id === change.after.orderId
                ? {
                    ...order,
                    menuItems: order.menuItems.map((menu) =>
                      menu.id === change.after.menuId
                        ? {
                            ...menu,
                            addOn: menu.addOn.filter(
                              (addOn) => addOn.id !== change.after.id
                            ),
                          }
                        : menu
                    ),
                  }
                : order
            );
          }
        }
      }, state.orderItems);

      // console.log('after orderMenu change : ', { ...state, orderItems: ORDER });
      return { ...state, orderItems: ORDER };

    case UPDATE_ORDER_ITEM:
      let oldId;
      return {
        ...state,
        orderItems: state.orderItems.map((orderSchema) => {
          if (orderSchema.id === action.payload.id) {
            oldId = orderSchema.id;
            return {
              ...state.orderItems,
              ...action.payload,
            };
          } else {
            return orderSchema;
          }
        }),
        items: state.items.map((item) =>
          item.id === oldId
            ? {
                ...item,
                orderSchema: action.payload.id,
              }
            : item
        ),
      };

    default:
      return state;
  }
}
