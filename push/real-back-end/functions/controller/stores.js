const omise = require('../util/omiseConfig');
const { admin, db } = require('../util/admin');
const busboy = require('busboy');
const { uuid } = require('uuidv4');

const {
  validatePaymentAccount,
  validateMenuItem,
} = require('../util/validators');
const firebase = require('firebase-admin');
// FieldValue = require('firebase-admin').firestore.FieldValue;
const config = require('../util/config');

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
exports.setPaymentDetail = async (req, res, next) => {
  // console.log(req.body);
  const {
    name,
    email,
    TIN,
    type,
    account_type,
    account_name,
    account_number,
  } = req.body;
  try {
    const data = {
      name,
      email,
      TIN,
      type,
      account_type,
      account_name,
      account_number,
    };
    const { valid, errors } = validatePaymentAccount(data);
    if (!valid) return res.status(400).json(errors);

    const ref = await omise.recipients.create({
      name: data.name,
      email: data.email,
      type: data.type,
      bank_account: {
        brand: data.account_type,
        number: data.account_number,
        name: data.account_name,
      },
      tax_id: data.TIN,
    });

    const ref2 = await db
      .collection('stores')
      .doc(`/${req.user.store}/details/storeDetail`)
      .get();

    let eiei = {
      paymentDetailYet: false,
      storeDetailYet: false,
    };
    ref2.data().storeName == '[storeName]'
      ? (eiei.storeDetailYet = false)
      : (eiei.storeDetailYet = true);
    console.log('eiei = ', eiei);

    const doc = await db
      .doc(`stores/${req.user.store}/details/paymentDetail`)
      .set(data);
    // console.log('success');

    eiei.storeDetailYet
      ? res.json({ path: '/' })
      : res.json({ path: '/detailstore' });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: err.code });
  }
  next();
};

exports.setStoreDetail = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    // console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 73275623846172483.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('field', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname == 'storeName') {
      console.log('cp2', file);
      return db.doc(`/stores/${req.user.store}/details/storeDetail`).update({
        storeName: file,
      });
    }
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/stores/${req.user.store}/details/storeDetail`).update({
          storeImg: imageUrl,
        });
      })
      .then(() => {
        return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
        console.log(req.user.store);
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};

exports.setStoreName = (req, res) => {
  db.collection('stores')
    .doc(`/${req.user.store}/details/storeDetail`)
    .update({
      storeName: req.body.storeName,
    })
    .then(() => {
      return res.json('edit success!');
    })
    .catch((err) => {
      console.err;
      return res.json({ err: err.code });
    });
};

exports.getStoreDetail = (req, res) => {
  db.collection('stores')
    .doc(`/${req.user.store}/details/storeDetail`)
    .get()
    .then((doc) => {
      let storeDetail = [];
      storeDetail.push({
        storeId: req.user.store,
        activated: doc.data().activated,
        storeImg: doc.data().storeImg,
        storeName: doc.data().storeName,
      });
      return res.json(storeDetail);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};

exports.getPaymentDetail = (req, res) => {
  db.collection('stores')
    .doc(`/${req.user.store}/details/paymentDetail`)
    .get()
    .then((doc) => {
      let paymentDetail = [];
      paymentDetail.push({
        storeId: req.user.store,
        name: doc.data().name,
        email: doc.data().email,
        TIN: doc.data().TIN,
        account_name: doc.data().account_name,
        account_number: doc.data().account_number,
        account_type: doc.data().account_type,
      });
      return res.json(paymentDetail);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};

exports.addMenutype = (req, res) => {
  // console.log('addTypeeeeeeeeeeeeeeeee ', req.body);
  let typeName = {
    typeDetail: {
      typeId: req.body.typeId,
      typeName: req.body.typeName,
      isTopping: req.body.isTopping,
    },
  };

  db.doc(`/stores/${req.user.store}/menu/menuType`)
    .update(
      'menuTypes',
      firebase.firestore.FieldValue.arrayUnion(typeName.typeDetail)
    )
    .then(() => {
      return res.json({ message: 'added' });
    })
    .catch((err) => {
      console.err;
      return res.json({ err: err.code });
    });
};

exports.addMenuItem = async (req, res) => {
  console.log('*************************addmenuItem************************');
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;
  let isImgUploaded = false;
  let noImg1 = 'no-img1.png';

  // String for image token
  let generatedToken = uuid();
  const menuItem = {
    menuDetail: {
      menuName: null,
      menuType: null,
      menuImg: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg1}?alt=media`,
      menuPrice: [],
      menuId: null,
    },
  };
  await busboy.on('field', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname == 'menuName') {
      menuItem.menuDetail.menuName = file;
    }
    if (fieldname == 'menuType') {
      menuItem.menuDetail.menuType = file;
    }
    if (fieldname == 'menuId') {
      menuItem.menuDetail.menuId = file;
    }
    if (fieldname == 'menuPrice') {
      console.log('price : ', file);
      let arr = file.split(',');
      arr.forEach((element) => {
        detail = element.split(':')[0];
        price = element.split(':')[1];
        if (detail && price) {
          console.log('checkprice : ', detail, price);
          menuItem.menuDetail.menuPrice.push({ detail, price });
        }
      });
    }
  });

  await busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'text/plain'
    ) {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];

    isImgUploaded = true;

    // 73275623846172483.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    console.log('finish', menuItem);
    if (isImgUploaded) {
      menuItem.menuDetail.menuImg = imageToBeUploaded;
      await admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          // console.log('upload success');
          // Append token to url
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

          menuItem.menuDetail.menuImg = imageUrl;
          // console.log('checklast : ', menuItem.menuDetail);
          return db
            .doc(`/stores/${req.user.store}/menu/menuItem/`)
            .update(
              'menuItems',
              firebase.firestore.FieldValue.arrayUnion(menuItem.menuDetail)
            )
            .then(() => {
              return res.json({ message: 'Add menu successfully.' });
            })
            .catch((err) => {
              console.log(req.user.store);
              console.error(err);
              return res.status(500).json({ error: 'something went wrong' });
            });
        });
    } else {
      return db
        .doc(`/stores/${req.user.store}/menu/menuItem/`)
        .update(
          'menuItems',
          firebase.firestore.FieldValue.arrayUnion(menuItem.menuDetail)
        )
        .then(() => {
          return res.json({ message: 'Add menu successfully.' });
        })
        .catch((err) => {
          console.log(req.user.store);
          console.error(err);
          return res.status(500).json({ error: 'something went wrong' });
        });
    }
  });
  busboy.end(req.rawBody);
};

exports.getAllMenuAndType = (req, res) => {
  let menuType = [];

  const menuAndType = {};

  db.collection('stores')
    .doc(`${req.user.store}/menu/menuType/`)
    .get()
    .then((doc) => {
      console.log('ref = ', `${req.user.store}/menu/menuType/`);
      console.log('doc data = ', doc.data());
      menuAndType.menuTypes = doc.data().menuTypes;
      // return db.doc(`/stores/${req.user.store}/menu/menuItem`).get()

      return db
        .collection('stores')
        .doc(`${req.user.store}/menu/menuItem/`)
        .get();
    })
    .then((doc) => {
      menuAndType.menuItems = doc.data().menuItems;
    })
    .then(() => {
      return res.json(menuAndType);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};
exports.updateMenuType = async (req, res) => {
  let typeName = {
    typeDetail: {
      typeId: req.body.typeId,
      typeName: req.body.typeName,
    },
    prevType: {
      typeId: req.body.prevTypeId,
      typeName: req.body.prevTypeName,
    },
  };
  console.log(typeName.typeDetail);
  ref = `/stores/${req.user.store}/menu/menuType`;
  try {
    await db.doc(ref).update({
      menuTypes: firebase.firestore.FieldValue.arrayRemove(typeName.prevType),
    });
    await db.doc(ref).update({
      menuTypes: firebase.firestore.FieldValue.arrayUnion(typeName.typeDetail),
    });
  } catch {
    (err) => {
      console.err;
      return res.json({ err: err.code });
    };
  }
};

exports.updateMenuItem = async (req, res) => {
  console.log(
    '*************************editMenuManage************************'
  );
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');
  let datas;
  let menuItemss;

  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;
  let isImgUploaded = false;
  let noImg1 = 'no-img1.png';

  // String for image token
  let generatedToken = uuid();
  const menuItem = {
    menuDetail: { menuPrice: [] },
  };
  await busboy.on('field', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname == 'menuName') {
      menuItem.menuDetail.menuName = file;
    }
    if (fieldname == 'menuType') {
      menuItem.menuDetail.menuType = file;
    }
    if (fieldname == 'menuId') {
      menuItem.menuDetail.menuId = file;
    }
    if (fieldname == 'menuPrice') {
      console.log('in price file = ', file);
      detail = file.split(':')[0];
      price = file.split(':')[1];
      menuItem.menuDetail.menuPrice.push({ detail, price });
    }
  });
  // [{detail:asdads,price:2121},{detail:sadasd,price : 455}]
  await busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'text/plain'
    ) {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];

    isImgUploaded = true;

    // 73275623846172483.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    console.log('ON FINISHHHHHHHHHHHHHHHHH');
    console.log(menuItem.menuDetail);
    if (isImgUploaded) {
      console.log('CALL  UploadImage');
      menuItem.menuDetail.menuImg = imageToBeUploaded;
      await admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              //Generate token to be appended to imageUrl
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          menuItem.menuDetail.menuImg = imageUrl;
          ref = `/stores/${req.user.store}/menu/menuItem/`;
          // console.log('************ ', menuItem.menuDetail);
          return db
            .doc(ref)
            .get()
            .then((res) => {
              menuItemss = res.data().menuItems;
              console.log('before = ', menuItemss);
              datas = res
                .data()
                .menuItems.map((el) =>
                  el.menuId == menuItem.menuDetail.menuId
                    ? { ...el, ...menuItem.menuDetail }
                    : el
                );
              console.log('after = ', datas);
            })
            .then(() => {
              return db.doc(ref).update('menuItems', datas);
            })
            .then(() => {
              return res.json({ message: 'Edit menu successfully.' });
            })
            .catch((err) => {
              console.log(req.user.store);
              console.error(err);
              return res.status(500).json({ error: 'something went wrong' });
            });
        });
    } else {
      console.log('CALL NOT UploadImage');
      ref = `/stores/${req.user.store}/menu/menuItem/`;
      await db
        .doc(ref)
        .get()
        .then((res) => {
          menuItemss = res.data().menuItems;
          console.log('before = ', menuItemss);
          datas = res
            .data()
            .menuItems.map((el) =>
              el.menuId == menuItem.menuDetail.menuId
                ? { ...el, ...menuItem.menuDetail }
                : el
            );
          console.log('after = ', datas);
        })
        .then(() => {
          return db.doc(ref).update('menuItems', datas);
        })
        .then(() => {
          return res.json({ message: 'Edit menu successfully.' });
        })
        .catch((err) => {
          console.log(req.user.store);
          console.error(err);
          return res.status(500).json({ error: 'something went wrong' });
        });
    }
  });
  busboy.end(req.rawBody);
};

exports.addOrder = async (req, res) => {
  let orderItem = {
    id: req.body.id,
    status: req.body.status,
    time: req.body.time,
    type: req.body.type,
    totalPrice: req.body.totalPrice,
    menuItems: req.body.menuItems,
    guest: req.body.guest,
    paymentStatus: req.body.paymentStatus,
  };
  console.log('orderItem = ', orderItem.menuItems[0].addOn);
  let ref = `stores/${req.user.store}/order/orderItems`;
  try {
    await db
      .doc(ref)
      .update(
        'orderItems',
        firebase.firestore.FieldValue.arrayUnion(orderItem)
      );
    res.json({ message: 'success' });
  } catch (error) {
    res.json({ error: 'got error ' + error });
  }
};
exports.editOrder = async (req, res) => {
  // console.log('editOrder************* ', req.body);
  let orderItem = {
    ...req.body,
  };

  console.log('orderItem = ', orderItem.menuItems);
  let ref = `stores/${req.user.store}/order/orderItems`;
  try {
    let getData = await db.doc(ref).get();
    // console.log('before data = ', getData.data());
    getData = getData
      .data()
      .orderItems.map((order) =>
        order.id === orderItem.id ? { ...order, ...orderItem } : order
      );
    // console.log('after data = ', getData);
    await db.doc(ref).update({ orderItems: getData });
    res.json({ message: 'success' });
  } catch (error) {
    res.json({ error: 'got error ' + error });
  }
};

exports.getAllOrder = async (req, res) => {
  let ref = `stores/${req.user.store}/order/orderItems`;
  try {
    const re = await db.doc(ref).get();
    data = re.data().orderItems;
    // console.log('use get all order ', data);
    res.json({ data: data });
  } catch (err) {
    console.log('error : ', err);
  }
};

exports.deleteOrder = async (req, res) => {
  console.log('req.body = ', req.body);
  let ref = `stores/${req.user.store}/order/orderItems`;
  try {
    const re = await db.doc(ref).get();
    console.log('data2 = ', re.data());
    let data2 = re.data().orderItems.filter((item) => item.id != req.body.id);
    console.log('data2 = ', data2);
    await db.doc(ref).set({ orderItems: data2 });
  } catch (err) {
    console.log('error : ', err);
  }
};

exports.deleteMenuItem = (req, res) => {
  const ex = {
    menuId: req.body.menuId,
    menuName: req.body.menuName,
    menuImg: req.body.menuImg,
    menuPrice: req.body.menuPrice,
    menuType: req.body.menuType,
  };
  console.log('deleteMenuuuuuuuuuuuuuuuuuuuu ', ex);
  db.collection('stores')
    .doc(`${req.user.store}/menu/menuItem`)
    .update({
      menuItems: firebase.firestore.FieldValue.arrayRemove(ex),
    })
    .then(() => {
      return res.status(200).json('delete success');
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};

exports.deleteMenuType = async (req, res) => {
  console.log('deleteMenuType ********************');
  let newType = [];
  await db
    .collection('stores')
    .doc(`${req.user.store}/menu/menuType`)
    .get()
    .then((doc) => {
      doc.data().menuTypes.forEach((el) => {
        const dbType = {};
        if (el.typeId !== req.params.menuTypeId) {
          dbType.typeId = el.typeId;
          dbType.typeName = el.typeName;
          dbType.isTopping = el.isTopping;
          newType.push(dbType);
        }
      });
      return db
        .collection('stores')
        .doc(`${req.user.store}/menu/menuType`)
        .update({
          menuTypes: newType,
        });
    });

  let menuItemTMP = [];
  await db
    .collection('stores')
    .doc(`${req.user.store}/menu/menuItem`)
    .get()
    .then((doc) => {
      doc.data().menuItems.forEach((el) => {
        const dbItem = {};
        if (el.menuType !== req.params.menuTypeId) {
          dbItem.menuId = el.menuId;
          dbItem.menuImg = el.menuImg;
          dbItem.menuName = el.menuName;
          dbItem.menuPrice = el.menuPrice;
          dbItem.menuType = el.menuType;
          menuItemTMP.push(dbItem);
        }
      });
      console.log('menuItemTMP = ', menuItemTMP);
      const newMenuItemx = {};
      newMenuItemx.newMenuItem = menuItemTMP;
      return db
        .collection('stores')
        .doc(`${req.user.store}/menu/menuItem`)
        .update({
          menuItems: menuItemTMP,
        });
    })
    .then(() => {
      return res.json('nice');
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err.code });
    });
};

// Couponnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

exports.getAllCoupon = async (req, res) => {
  let ref = `stores/${req.user.store}/coupon/couponItem`;
  try {
    const re = await db.doc(ref).get();
    data = re.data().couponItems;
    console.log('use get all coupon ', data);
    res.json(data);
  } catch (err) {
    console.log('error : ', err);
  }
};

exports.deleteCoupon = async (req, res) => {
  console.log('req.body delete coupon = ', req.body);
  let ref = `stores/${req.user.store}/coupon/couponItem`;
  try {
    const re = await db.doc(ref).get();
    // console.log('data coupon = ', re.data());
    let data2 = re
      .data()
      .couponItems.filter((item) => item.couponId != req.body.couponId);
    // console.log('data coupon filter after = ', data2);
    await db.doc(ref).set({ couponItems: data2 });
    res.json({ message: 'delete Coupon success' });
  } catch (err) {
    console.log('error : ', err);
    res.json({ message: 'delete Coupon error' });
  }
};

exports.addCoupon = async (req, res) => {
  let couponItem = {
    couponId: req.body.couponId,
    couponType: req.body.couponType,
    couponName: req.body.couponName,
    couponAmount: req.body.couponAmount,
    couponDetail: req.body.couponDetail,
  };
  console.log('asdbasuifhsaufiashfiahsijfahsifas');
  let ref = `stores/${req.user.store}/coupon/couponItem`;
  try {
    await db
      .doc(ref)
      .update(
        'couponItems',
        firebase.firestore.FieldValue.arrayUnion(couponItem)
      );
    res.json({ message: 'add Coupon success' });
  } catch (error) {
    res.json({ error: 'got coupon error ' + error });
  }
};
