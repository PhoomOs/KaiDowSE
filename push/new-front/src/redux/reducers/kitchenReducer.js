import { AccessTimeOutlined } from '@material-ui/icons';
import { act } from 'react-dom/test-utils';
import {
  KITCHEN_ADD_CARD,
  KITCHEN_DRAG_HAPPENDED,
  KITCHEN_DELETE_CARD,
  KITCHEN_SET_ALL_ORDER,
  KITCHEN_CHANGE,
} from '../types';

const initialState = [
  {
    id: `toDo`,
    title: 'รอรับออเดอร์',
    cards: [],
  },
  {
    title: 'กำลังทำ',
    id: `doing`,
    cards: [],
  },
  {
    title: 'ทำแล้ว',
    id: `done`,
    cards: [],
  },
  {
    title: 'เสริฟแล้ว',
    id: 'finish',
    cards: [],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case KITCHEN_SET_ALL_ORDER: {
      // console.log('kitchen set all ', action.payload);
      let lists = state;
      action.payload.map((menu) => {
        if (menu.status === 'toDo') {
          lists[0].cards.push(menu);
        } else if (menu.status === 'doing') {
          lists[1].cards.push(menu);
        } else if (menu.status === 'done') {
          lists[2].cards.push(menu);
        }
      });
      return lists;
    }
    case KITCHEN_CHANGE: {
      // console.log('change before = ', state);
      const a = action.payload.reduce((prev, change) => {
        if (change.status == 'update') {
          let removed = false;
          let newState = prev.map((list) => {
            if (list.id === change.before.status) {
              return {
                ...list,
                cards: list.cards.filter((card) => {
                  if (card.id === change.before.id) {
                    removed = true;
                  } else {
                    return card;
                  }
                }),
              };
            } else {
              return list;
            }
          });
          if (removed) {
            newState = newState.map((list) => {
              if (list.id === change.after.status) {
                return {
                  ...list,
                  cards: [...list.cards, change.after],
                };
              } else {
                return list;
              }
            });
          }
          return newState;
        } else if (change.status === 'delete') {
          let newState = prev.map((list) => {
            if (list.id === change.before.status) {
              return {
                ...list,
                cards: [
                  list.cards.filter((card) => card.id != change.before.id),
                ][0],
              };
            } else {
              return list;
            }
          });

          return newState;
        } else if (change.status == 'add') {
          let newState = prev.map((list) => {
            if (list.id === change.after.status) {
              return {
                ...list,
                cards: [...list.cards, change.after],
              };
            } else {
              return list;
            }
          });
          return newState;
        }
      }, state);
      // console.log('after = ', a);
      return a;
    }
    case KITCHEN_ADD_CARD: {
      const newCard = {
        name: action.payload.name,
        id: action.payload.id,
      };
      const newState = state.map((list) => {
        if (list.id === action.payload.status) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }
    case KITCHEN_DELETE_CARD: {
      const newState = state.map((list) => {
        if (list.id === action.payload.status) {
          return {
            ...list,
            cards: [
              list.cards.filter((card) => card.id !== action.payload.id),
            ][0],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case KITCHEN_DRAG_HAPPENDED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,

        Socket,
      } = action.payload;
      const newState = [...state];
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        const cardId = card[0].id;
        const cardItem = card[0];
        cardItem.status = droppableIdEnd;
        const Listid = listEnd.id;
        Socket.sendChange({ store: Socket.store, newObj: cardItem });
      }
      return newState;
    }

    default:
      return state;
  }
};
export default listsReducer;
