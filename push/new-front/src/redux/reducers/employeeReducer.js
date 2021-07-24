import { CodeSharp } from '@material-ui/icons';
import {
  ADD_EMPLOYEE,
  LOADING_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_ALLEMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../types';

const initialState = {
  employees: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false,
      };
    case GET_ALLEMPLOYEE:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case LOADING_EMPLOYEE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.email !== action.payload
        ),
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.email === action.payload.email
            ? {
                ...employee,
                // name: action.payload.name,
                // surName: action.payload.surName,
                // phone: action.payload.phone,
                // role: action.payload.role,
                // userImage: action.payload.userImage,
                // password: action.payload.password,
                ...action.payload,
              }
            : employee
        ),
      };
    default:
      return state;
  }
}

// email: "email1@email.com",
//     name: "name1",
//     surName: "surname1",
//     phone: "phone1",
//     role: "role1",
//     userImage:
//     password: "123456",
