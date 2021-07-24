import {
  COUPON_GET_ALL,
  COUPON_ADD,
  COUPON_DELETE,
  COUPON_UPDATE,
  LOADING_DATA,
} from '../types';

const initialState = {
  coupons: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUPON_GET_ALL:
      return {
        ...state,
        coupons: action.payload,
        loading: false,
      };

    case COUPON_ADD:
      console.log('before = ', state);
      console.log('after =', {
        ...state,
        coupons: [...state.coupons, action.payload],
        loading: false,
      });
      return {
        ...state,
        coupons: [...state.coupons, action.payload],
        loading: false,
      };

    case COUPON_DELETE:
      return {
        ...state,
        coupons: state.coupons.filter(
          (coupon) => coupon.couponId !== action.payload.couponId
        ),
      };

    //   case COUPON_UPDATE:
    //     return {
    //       ...state,
    //       menuItems: state.menuItems.map((menu) =>
    //         menu.menuId === action.payload.menuId
    //           ? { ...menu, ...action.payload }
    //           : menu
    //       ),
    //     };
    default:
      return state;
  }
}
