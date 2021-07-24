const omise = require('../util/omiseConfig');
const { admin, db } = require('../util/admin');

exports.subscribeCreditCard = async (req, res, next) => {
  console.log(req.body);
  const { email, name, amount, token } = req.body;
  try {
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token,
    });
    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      customer: customer.id,
    });
    console.log(customer);
    console.log(charge);

    const ref = await db
      .collection('stores')
      .doc(`/${req.user.store}/details/paymentDetail`)
      .get();

    const ref2 = await db
      .collection('stores')
      .doc(`/${req.user.store}/details/storeDetail`)
      .get();

    const ref3 = await db
      .collection('stores')
      .doc(`/${req.user.store}/details/storeDetail`)
      .update({ activated: true });

    let data = {
      paymentDetailYet: false,
      storeDetailYet: false,
    };
    ref.data().email === null
      ? (data.paymentDetailYet = false)
      : (data.paymentDetailYet = true);
    ref2.data().storeName == '[storeName]'
      ? (data.storeDetailYet = false)
      : (data.storeDetailYet = true);

    if (!data.paymentDetailYet) {
      res.send({ path: '/detailpayment' });
    } else if (!data.storeDetailYet) {
      res.send({ path: '/detailstore' });
    } else {
      res.send({ path: '/' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

// const omiseCheckoutInternetBanking = async (req, res, next) => {
//   try {
//     const { email, name, amount, token } = req.body;

//     const charge = await omise.charges.create({
//       amount,
//       source: token,
//       currency: "thb",
//       return_uri: "http://localhost:4000/message"
//     });

//     res.send({ authorizeUri: charge.authorize_uri });
//   } catch (err) {
//     console.log(err);
//   }
//   next();
// };

exports.subscribeInternetBanking = async (req, res, next) => {
  console.log('subscribeInternetBanking in reqBody ', req.body);
  const { email, name, amount, token } = req.body;
  // console.log("back-end internetBank", req.body);
  try {
    const charge = await omise.charges.create({
      amount,
      source: token,
      currency: 'thb',
      return_uri: `http://localhost:3000/${req.body.history}`,
    });
    console.log(charge);
    console.log('Status charge in back-end ', charge.status);
    res.send({
      authorizeUri: charge.authorize_uri,
    });
    // const ref = await db
    //   .collection('stores')
    //   .doc(`/${req.user.store}/details/paymentDetail`)
    //   .get();

    // const ref2 = await db
    //   .collection('stores')
    //   .doc(`/${req.user.store}/details/storeDetail`)
    //   .get();

    // const ref3 = await db
    //   .collection('stores')
    //   .doc(`/${req.user.store}/details/storeDetail`)
    //   .update({ activated: true });

    // let data = {
    //   paymentDetailYet: false,
    //   storeDetailYet: false,
    // };
    // ref.data().email === null
    //   ? (data.paymentDetailYet = false)
    //   : (data.paymentDetailYet = true);
    // ref2.data().storeName == '[storeName]'
    //   ? (data.storeDetailYet = false)
    //   : (data.storeDetailYet = true);

    // if (!data.paymentDetailYet) {
    //   res.send({ path: '/detailpayment' });
    // } else if (!data.storeDetailYet) {
    //   res.send({ path: '/detailstore' });
    // } else {
    //   res.send({ path: '/' });
    // }
  } catch (err) {
    console.log('error back-end ', err);
  }
  next();
};

exports.getRecipient = (req, res) => {
  let list;
  omise.recipients
    .list(function (err, resp) {
      list = resp.data;
      let recipientStatus = [];

      list.forEach((doc) => {
        if (doc.email === req.params.email) {
          recipientStatus.push({
            active: doc.active,
            verified: doc.verified,
            activated_at: doc.activated_at,
            verified_at: doc.verified_at,
          });
        }
      });

      // console.log(resp.data);
      return res.json({ recipientStatus });
    })

    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};

exports.omiseWebHooks = async (req, res, next) => {
  try {
    console.log('asdasdsa');
    const { data, key } = req.body;
    console.log('omiseWebhooks ', req.body);
    if (key === 'charge.complete') {
      if (data.status === 'successful' || data.status === 'failed') {
        const charge = {
          id: data.id,
          status: data.status,
          amount: data.funding_amount,
        };
        return res.json(charge);
      }
    }
  } catch (err) {
    console.log('error webhooks ', err);
  }
  next();
};

exports.getInternetBankingCharge = async (req, res, next) => {
  try {
    const charge = await readFileData();

    res.send({ ...charge });
    // await writeFile(filePath, JSON.stringify({}))
    return res.json(charge);
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.testPayment = async (req, res, next) => {
  try {
    const charge = await omise.charges.create({
      amount,
      source: token,
      currency: 'thb',
      return_uri: `http://localhost:3000/${req.body.history}`,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};
