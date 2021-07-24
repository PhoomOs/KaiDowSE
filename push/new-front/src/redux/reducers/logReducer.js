import { CodeSharp } from '@material-ui/icons';
import { SET_LOG, LOG_CHANGE, REFUND_LOG } from '../types';

const initialState = {
  logs: [],
  orderLogs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOG:
      // console.log('setlogs = ', action.payload);
      return {
        ...state,
        logs: action.payload,
      };
    case REFUND_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
      };
    case LOG_CHANGE:
      console.log('before log change : ', state);
      console.log('change = ', action.payload);
      let logChange = state.logs;
      let orderLogsChange = state.orderLogs;
      if (action.payload.paymentLogs.length) {
        logChange = action.payload.paymentLogs.reduce((prev, change) => {
          if (change.status === 'delete') {
            return prev.filter((item) => item.id !== change.before.id);
          } else if (change.status == 'add') {
            return [...prev, { ...change.after }];
          }
        }, state.logs);
      }

      if (action.payload.orderLogs.length) {
        orderLogsChange = action.payload.orderLogs.reduce((prev, change) => {
          if (change.status === 'delete') {
            return prev.filter((item) => item.id !== change.before.id);
          } else if (change.status == 'add') {
            return [...prev, { ...change.after }];
          }
        }, state.orderLogs);
      }
      console.log('after change log : ', {
        logs: logChange,
        orderLogs: orderLogsChange,
      });
      return { logs: logChange, orderLogs: orderLogsChange };

    default:
      return state;
  }
}
