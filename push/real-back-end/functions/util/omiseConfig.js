require("dotenv").config();

module.exports = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

// console.log(OMISE_PUBLIC_KEY)