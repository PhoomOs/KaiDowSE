// import firebase from './firebase';
const firebase = require('./firebase');
const app = require('express')();
const http = require('http').createServer(app);
const socketio = require('socket.io');
let users = [];
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

const cors = require('cors');
// n = 0;
// const recursive = function (req, res) {
//   console.log('call SSE ');
//   res.set({
//     'Cache-Control': 'no-cache',
//     'Content-Type': 'text/event-stream',
//     Connection: 'keep-alive',
//   });
//   res.flushHeaders();
//   setInterval(() => {
//     console.log('send');
//     res.write('eiei');
//   }, 4000);
// };
// app.get('/testSSE', recursive);

// app.get('/checkPayment/:store/:id', (req, res) => {
//   console.log('store = ', req.params.store);
//   console.log('id = ', req.params.id);
// });

// app.get('/checkPayment2/:store/:id', (req, res) => {
//   res.write(
//     `start call paymentwo store : ${req.params.store} id : ${req.params.id}`
//   );
// });

const findStore2 = (id) => {
  // console.log('in fn id = ', id);
  // console.log('in fn user = ', users);
  let a;
  users.map((user) => {
    if (user.socket.id === id) {
      a = user;
    }
  });
  console.log('in fn a = ', a.socket.id);
  return a;
};

const checkStore = (socket) => {
  let data = users.filter((user) => user.socket == socket)[0];
  if (data != undefined) {
    console.log('current user');
    return data;
  } else {
    return null;
  }
};

io.on('connection', (socket) => {
  socket.on('startListeningMenu', (store) => {
    // console.log('store = ', store);
    // console.log('connect id = ', socket.id);
    user = new firebase(socket, store);
    user.listeningKitchenEvent();
    users.push(user);
  });

  console.log('a users connected');

  socket.on('orderChangeStatus', (data) => {
    // console.log('callOrderChange = ', socket.id);
    let newObj = data.newObj;
    // users.forEach((user) => console.log('in Users : ', user.socket.id));
    const a = findStore2(socket.id);
    // console.log('a = ', a);
    // console.log('aID = ', a.socket.id);
    a.orderChangeStatus(newObj);
    // users[0].orderChangeStatus(newObj);
  });

  socket.on('addOrder', (stores) => {
    let orderObject = data.newObj;
    findStore(store).addOrder(orderObject);
  });

  socket.on('stopListeningMenu', () => {
    console.log('unsub socket ', socket.id);
    findStore2(socket.id).unListeningKitchenEvent;
    console.log('before users = ', users.length);
    users = users.filter((user) => user.socket.id != socket.id);
    console.log('after users = ', users.length);
  });
});

app.use(cors());
// console.log('check users = ', users.length);

http.listen(4000, () => {
  console.log('listening on *:4000');
});
