const functions = require('firebase-functions');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const storeRoutes = require('./routes/storeRoutes');

const app = express();
app.use(cors());
app.use(userRoutes);
app.use(paymentRoutes);
app.use(storeRoutes);

// app.post("/test", (req, res) => {
//   console.log(omise);
//   res.send(omise);
// });

// app.listen(5000, () => {
//   console.log('listening on *:4000');
// });
exports.api = functions.region('asia-southeast2').https.onRequest(app);
