import {
  ADD_MENU_ITEM,
  ADD_MENU_TYPE,
  GET_ALL_MENU,
  DELETE_MENU_ITEM,
  DELETE_MENU_TYPE,
  UPDATE_MENU_ITEM,
  UPDATE_MENU_TYPE,
} from '../types';

const initialState = {
  menuItems: [],
  menuTypes: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MENU:
      return {
        ...state,
        menuItems: action.payload.menuItems,
        menuTypes: action.payload.menuTypes,
        loading: false,
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
        loading: false,
      };
    case ADD_MENU_TYPE:
      return {
        ...state,
        menuTypes: [...state.menuTypes, action.payload],
        loading: false,
      };

    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.filter(
          (menuItem) => menuItem.id !== action.payload.menuId
        ),
      };

    case DELETE_MENU_TYPE:
      return {
        ...state,
        menuTypes: state.menuTypes.filter(
          (menuType) => menuType.typeId !== action.payload
        ),
        menuItems: state.menuItems.filter(
          (menuItem) => menuItem.menuType !== action.payload
        ),
      };

    case UPDATE_MENU_ITEM:
      return {
        ...state,
        menuItems: state.menuItems.map((menu) =>
          menu.menuId === action.payload.menuId
            ? { ...menu, ...action.payload }
            : menu
        ),
      };
    case UPDATE_MENU_TYPE:
      let oldType;
      return {
        ...state,
        menuTypes: state.menuTypes.map((menuType) => {
          if (menuType.id === action.payload.TypeId) {
            oldType = menuType.TypeName;
            return {
              ...state.menuTypes,
              ...action.payload,
            };
          } else {
            return menuType;
          }
        }),
        menuItems: state.menuItems.map((menuItem) =>
          menuItem.menuType === oldType
            ? {
                ...menuItem,
                menuType: action.payload.typeName,
              }
            : menuItem
        ),
      };

    default:
      return state;
  }
}
