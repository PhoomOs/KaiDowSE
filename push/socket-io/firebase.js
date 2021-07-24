const e = require('cors');
const firebase = require('firebase');
const { on } = require('nodemon');
const config = require('./config');

class Firebase {
  constructor(socket, store) {
    this.socket = socket;
    this.store = store;

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
      // console.log('initialized Firebase');
    } else {
      // console.log('initialing Firebase . . .');
    }
    this.isInitialKitchen = 1;
    // this.isInitialOrder = 1;

    this.currentManu = [];
    this.currentOrder = [];
    this.currentPaymentLog = [];
    this.currentOrderLogs = [];
  }

  comparer = (others) => (current) => {
    // console.log('current = ', current);
    return (
      others.filter(
        (other) =>
          other.status == current.status &&
          other.quantity == current.quantity &&
          other.orderType == current.orderType &&
          other.id === current.id
      ).length === 0
    );
  };

  // a.filter(comparer(b));
  // let diffMenuBefore = this.currentManu.filter(
  //   this.comparer(newMenu)
  // );

  comparerLog = (others) => (current) => {
    // console.log('current = ', current);
    return others.filter((other) => other.id === current.id).length === 0;
  };

  comparerOrder = (others) => (current) => {
    return (
      others.filter(
        (other) =>
          other.guest == current.guest &&
          other.paymentStatus == current.paymentStatus &&
          other.status == current.status &&
          other.type == current.type &&
          other.totalPrice == current.totalPrice &&
          other.id == current.id
      ).length == 0
    );
  };

  // listeningOrderEvent = () => {
  //   this.unSucscribeOrder = firebase
  //   .firestore()
  //   .collection(`stores/${this.store}/order/`)
  //   .onSnapshot((snapshot)=>{
  //       snapshot.docChanges().map((change=>{
  //         if(change.type == 'added'){
  //           if(this.isInitialOrder==1){
  //             this.isInitialOrder = 0
  //             //set data
  //             //เพิม ลบ order
  //             //เพิ่ม ลบ menu
  //             //status เมนูเปลี่ยน
  //             //
  //             change.doc.data().orderItems.map(order=>{
  //               currentOrder.push(order)
  //             })
  //           }
  //           if (change.type === 'modified') {
  //             let changeOrderData = []
  //             change.doc.data().orderItems.map(order=>{
  //               changeOrderData.push(order)
  //             })
  //           }
  //           let diffOrderBefore = this.currentOrder.filter(this.comparer(changeOrderData));
  //           let diffOrderAfter = changeOrderData.filter(this.comparer(this.currentOrder));
  //           let changeOrders = [];

  //         }

  //       })
  //   })
  // }

  listeningKitchenEvent = () => {
    // console.log('listening id : ', this.socket.id);

    this.unSubscribeLog = firebase
      .firestore()
      .collection(`stores/${this.store}/log/`)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          console.log('changeDoc data = ', change.doc.data());
          if (change.type === 'added') {
            this.currentPaymentLog = [...change.doc.data().paymentLogs];
            this.currentOrderLog = [...change.doc.data().orderLogs];
          }
          if (change.type === 'modified') {
            let newPaymentLog = [...change.doc.data().paymentLogs];
            let newOrderLogs = [...change.doc.data().orderLogs];

            let diffPaymentLogBefore = this.currentPaymentLog.filter(
              this.comparer(newPaymentLog)
            );
            let diffPaymentLogAfter = newPaymentLog.filter(
              this.comparer(this.currentPaymentLog)
            );

            let diffOrderLogBefore = this.currentOrderLog.filter(
              this.comparer(newOrderLogs)
            );
            let diffOrderLogAfter = newOrderLogs.filter(
              this.comparer(this.currentOrderLog)
            );
            let chageOrderLogs = [];

            for (let i = 0; i < diffOrderLogBefore.length; i++) {
              let find = false;
              for (let j = 0; j < diffOrderLogAfter.length; j++) {
                if (diffOrderLogAfter[j].id == diffOrderLogBefore[i].id) {
                  find = true;
                  chageOrderLogs.push({
                    status: 'update',
                    before: diffOrderLogBefore[i],
                    after: diffOrderLogAfter[j],
                  });
                  diffOrderLogAfter.splice(j, 1);
                  break;
                }
              }
              if (find === false) {
                chageOrderLogs.push({
                  status: 'delete',
                  before: diffOrderLogBefore[i],
                  after: {},
                });
              }
            }

            let changeLogs = [];

            for (let i = 0; i < diffPaymentLogBefore.length; i++) {
              let find = false;
              for (let j = 0; j < diffPaymentLogAfter.length; j++) {
                if (diffPaymentLogAfter[j].id == diffPaymentLogBefore[i].id) {
                  find = true;
                  changeLogs.push({
                    status: 'update',
                    before: diffPaymentLogBefore[i],
                    after: diffPaymentLogAfter[j],
                  });
                  diffPaymentLogAfter.splice(j, 1);
                  break;
                }
              }
              if (find === false) {
                changeLogs.push({
                  status: 'delete',
                  before: diffPaymentLogBefore[i],
                  after: {},
                });
              }
            }
            if (diffPaymentLogAfter.length) {
              diffPaymentLogAfter.map((el) => {
                changeLogs.push({
                  status: 'add',
                  before: {},
                  after: el,
                });
              });
            }
            // console.log('change Logs = ', changeLogs);

            if (changeLogs.length || chageOrderLogs.length) {
              // console.log('orderChange ', changeOrders);
              this.socket.emit('logChange', {
                paymentLogs: changeLogs,
                orderLogs: chageOrderLogs,
              });
            }

            this.currentPaymentLog = newPaymentLog;
            this.currentOrderLogs = newOrderLogs;
            changeLogs = [];
            chageOrderLogs = [];
          }
        });
      });

    this.unSucscribeKitchen = firebase
      .firestore()
      .collection(`stores/${this.store}/order/`)
      .onSnapshot((snapshot) => {
        // console.log('snap ', snapshot);
        snapshot.docChanges().map((change) => {
          if (change.type === 'added') {
            if (this.isInitialKitchen == 1) {
              this.isInitialKitchen = 0;
              change.doc.data().orderItems.map((order) => {
                this.currentOrder.push({
                  ...order,
                  menuItems: [],
                });
                order.menuItems.map((item) => {
                  item.addOn.map((addOn) => {
                    this.currentManu.push({ ...addOn, orderId: order.id });
                  });
                  this.currentManu.push({
                    ...item,
                    orderId: order.id,
                    addOn: [],
                  });
                });
              });
            } else {
              // console.log('data : ', this.currentManu);
            }
          }

          if (change.type === 'modified') {
            // console.log('modi');
            let newMenu = [];
            let newOrder = [];
            change.doc.data().orderItems.map((order) => {
              newOrder.push({
                ...order,
                menuItems: [],
              });
              order.menuItems.map((item) => {
                item.addOn.map((addOn) => {
                  newMenu.push({ ...addOn, orderId: order.id });
                });
                newMenu.push({
                  ...item,
                  orderId: order.id,
                  addOn: [],
                });
              });
            });

            let diffMenuBefore = this.currentManu.filter(
              this.comparer(newMenu)
            );
            let diffMenuAfter = newMenu.filter(this.comparer(this.currentManu));
            // console.log('beforemanu = ', this.currentManu);
            // console.log('Aftermanu = ', newMenu);
            // console.log('diffMenuBefore = ', diffMenuBefore);
            // console.log('diffMemuAfter = ', diffMenuAfter);
            let diffOrderBefore = this.currentOrder.filter(
              this.comparerOrder(newOrder)
            );
            let diffOrderAfter = newOrder.filter(
              this.comparerOrder(this.currentOrder)
            );

            let changeMenus = [];
            let changeOrders = [];

            // for check ORDER ************************************************************
            for (let i = 0; i < diffOrderBefore.length; i++) {
              let find = false;
              for (let j = 0; j < diffOrderAfter.length; j++) {
                if (diffOrderAfter[j].id == diffOrderBefore[i].id) {
                  find = true;
                  changeOrders.push({
                    status: 'update',
                    before: diffOrderBefore[i],
                    after: diffOrderAfter[j],
                  });
                  diffOrderAfter.splice(j, 1);
                  break;
                }
              }
              if (find === false) {
                changeOrders.push({
                  status: 'delete',
                  before: diffOrderBefore[i],
                  after: {},
                });
              }
            }
            if (diffOrderAfter.length) {
              diffOrderAfter.map((el) => {
                changeOrders.push({
                  status: 'add',
                  before: {},
                  after: el,
                });
              });
            }
            // for check menu ************************************************************

            for (let i = 0; i < diffMenuBefore.length; i++) {
              let find = false;
              for (let j = 0; j < diffMenuAfter.length; j++) {
                if (diffMenuAfter[j].id == diffMenuBefore[i].id) {
                  find = true;
                  changeMenus.push({
                    status: 'update',
                    before: diffMenuBefore[i],
                    after: diffMenuAfter[j],
                  });
                  diffMenuAfter.splice(j, 1);
                  break;
                }
              }
              if (find === false) {
                changeMenus.push({
                  status: 'delete',
                  before: diffMenuBefore[i],
                  after: {},
                });
              }
            }
            if (diffMenuAfter.length) {
              diffMenuAfter.map((el) => {
                changeMenus.push({
                  status: 'add',
                  before: {},
                  after: el,
                });
              });
            }
            // ************************************ Performance change only status or orderId
            // console.log('menuChange : ', changeMenus);
            // console.log('changeOrders : ', changeOrders);

            if (changeOrders.length) {
              // console.log('orderChange ', changeOrders);
              this.socket.emit('orderChange', changeOrders);
            }
            if (changeMenus.length) {
              // console.log('menuChange Send! ', changeMenus);
              this.socket.emit('menuChange', changeMenus);
            }

            this.currentManu = newMenu;
            this.currentOrder = newOrder;
            newMenu = [];
            newOrder = [];
          }
        });
      });
  };

  orderChangeStatus = (newObj) => {
    firebase
      .firestore()
      .collection('stores')
      .doc(`/${this.store}/order/orderItems`)
      .get()
      .then((doc) => {
        firebase
          .firestore()
          .collection('stores')
          .doc(`/${this.store}/order/orderItems`)
          .update({
            ...doc.data,
            orderItems: doc.data().orderItems.map((order) => ({
              ...order,
              menuItems: order.menuItems.map((menu) =>
                menu.id == newObj.id
                  ? { ...menu, ...newObj }
                  : {
                      ...menu,
                      addOn: menu.addOn.map((addOn) =>
                        addOn.id == newObj.id
                          ? { ...addOn, ...newObj }
                          : { ...addOn }
                      ),
                    }
              ),
            })),
          });
      })
      .catch((e) => {
        console.log('**************error : ', e);
      });
  };

  addOrder = (orderObject) => {
    firebase
      .firestore()
      .collection('stores')
      .doc(`/${this.store}/order/orderItems`)
      .update(
        'orderItems',
        firebase.firestore.FieldValue.arrayUnion(orderItem)
      );
  };

  unListeningKitchenEvent = () => {
    this.unSucscribeKitchen();
    this.unSubscribeLog();
  };

  subscribeInternetBanking = async (req, res, next) => {
    console.log(req.body);
    const { email, name, amount, token } = req.body;
    // console.log('asjbsduivijsd', email, name, amount, token);
    try {
      // const charge = await omise.customers.create({
      //   email,
      //   description: name,
      //   card: token,
      // });
      const charge = await omise.charges.create({
        amount,
        source: token,
        currency: 'thb',
        // return_uri: "http://localhost:3000/message"
      });
    } catch (err) {
      console.log(err);
    }
    next();
  };
}
module.exports = Firebase;
