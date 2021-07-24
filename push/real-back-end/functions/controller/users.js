const { admin, db } = require('../util/admin');

const config = require('../util/config');
const { uuid } = require('uuidv4');

const busboy = require('busboy');
const firebase = require('firebase');
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require('../util/validators');

exports.signup = (req, res) => {
  const newUser = {
    name: req.body.name,
    surName: req.body.surName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    email: req.body.email,
    phone: req.body.phone,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  const noImg = 'no-img.png';

  let token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this email is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        name: newUser.name,
        surName: newUser.surName,
        phone: newUser.phone,
        //   imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
        // activated: 'no',
        store: 'unPaid',
        role: 'Owner',
        email: newUser.email,
      };
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return db.collection('stores').add({});
    })
    .then((doc) => {
      const paymentDetailCredentials = {
        name: null,
        email: null,
        TIN: null,
        account_type: null,
        account_brand: null,
        account_name: null,
        account_number: null,
      };
      docId = doc.id;
      // console.log('doc id = ', doc.id);
      return db
        .doc(`/stores/${docId}/details/paymentDetail`)
        .set(paymentDetailCredentials);
    })
    .then(() => {
      const storeDetailCredentials = {
        storeImg: '[storeImg]',
        storeName: '[storeName]',
        activated: false,
      };
      return db
        .doc(`/stores/${docId}/details/storeDetail`)
        .set(storeDetailCredentials);
    })
    .then(() => {
      return db.collection('users').doc(`${newUser.email}`).update({
        store: docId,
      });
    })
    .then(() => {
      return db.doc(`/stores/${docId}/menu/menuType`).set({ menuTypes: [] });
    })
    .then(() => {
      return db.doc(`/stores/${docId}/menu/menuItem`).set({ menuItems: [] });
    })
    .then(() => {
      return db.doc(`/stores/${docId}/coupon/couponItem`).set({ couponItems: [] });
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.log('error is :');
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token, path: 'eiei' });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' });
    });
};

exports.getUserData = async (req, res) => {
  const ref = await db.doc(`/users/${req.user.email}`).get();

  let userCredentials = {
    name: ref.data().name,
    surName: ref.data().surName,
    phone: ref.data().phone,
    role: ref.data().role,
    store: ref.data().store,
  };
  const ref2 = await db
    .doc(`/stores/${req.user.store}/details/storeDetail`)
    .get();
  userCredentials.activated = ref2.data().activated;

  // console.log('use getUserData : ', userCredentials);
  res.json(userCredentials);
};

exports.addEmployee = async (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  let isImgUploaded = false;
  let noImg = 'no-img.png';
  // String for image token
  let generatedToken = uuid();

  const employeeCredential = {
    name: '',
    surName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    uid: '',
    store: req.user.store,
    role: '',
    imgURL: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
  };
  await busboy.on('field', (fieldname, file, filename, encoding, mimetype) => {
    if (fieldname == 'name') {
      employeeCredential.name = file;
    } else if (fieldname == 'surName') {
      employeeCredential.surName = file;
    } else if (fieldname == 'phone') {
      employeeCredential.phone = file;
    } else if (fieldname == 'role') {
      employeeCredential.role = file;
    } else if (fieldname == 'email') {
      employeeCredential.email = file;
    } else if (fieldname == 'password') {
      employeeCredential.password = file;
    } else if (fieldname == 'confirmPassword') {
      employeeCredential.confirmPassword = file;
    }
  });

  await busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    // console.log('mimetype = ', mimetype);
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'text/plain'
    ) {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];

    isImgUploaded = true;

    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    if (isImgUploaded) {
      await admin
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
        });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        employeeCredential.email,
        employeeCredential.password
      )
      .then((data) => {
        employeeCredential.uid = data.user.uid;
      })
      .then(() => {
        return db
          .doc(`/users/${employeeCredential.email}`)
          .set(employeeCredential);
      })
      .then(() => {
        if (isImgUploaded) {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          db.doc(`/users/${employeeCredential.email}`).update({
            imgURL: imageUrl,
          });
        }
      })

      .then(() => {
        return res.json({ message: 'Employee Added.' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong!' });
      });
  });
  busboy.end(req.rawBody);
};

exports.editEmployee = async (req, res) => {
  console.log(
    '************************************* use EDIT ***************************'
  );
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  let isImgUploaded = false;
  let noImg = 'no-img.png';
  // String for image token
  let generatedToken = uuid();
  const defaultURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`;
  const employeeCredential = {};
  await busboy.on('field', (fieldname, file, filename, encoding, mimetype) => {
    console.log('============================ FIELD =========================');
    // console.log(fieldname);
    if (fieldname == 'name') {
      employeeCredential.name = file;
    } else if (fieldname == 'surName') {
      employeeCredential.surName = file;
    } else if (fieldname == 'phone') {
      employeeCredential.phone = file;
    } else if (fieldname == 'role') {
      employeeCredential.role = file;
    } else if (fieldname == 'email') {
      employeeCredential.email = file;
    } else if (fieldname == 'password') {
      employeeCredential.password = file;
    }
    // else if (fieldname == 'confirmPassword') {
    //   employeeCredential.confirmPassword = file;
    // }
  });

  await busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'text/plain'
    ) {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];

    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    isImgUploaded = true;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    try {
      if (isImgUploaded) {
        await admin
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
          });
        employeeCredential.imgURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
      }
      // console.log('setdata = ', employeeCredential);
      const res1 = await db.doc(`/users/${employeeCredential.email}`).update({
        ...employeeCredential,
      });
      console.log('edit successssssssssssssss');
      res.json({ message: 'Employee EDIT.' });
    } catch (err) {
      console.log('got error ******************* ', err);
    }
  });
  busboy.end(req.rawBody);
};

exports.getAllEmployee = (req, res) => {
  db.collection('users')
    .where('store', '==', req.user.store)
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          email: doc.id,
          name: doc.data().name,
          surName: doc.data().surName,
          phone: doc.data().phone,
          role: doc.data().role,
          userImage: doc.data().imgURL,
          userId: doc.data().userId,
        });
      });
      return res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.removeUser = (req, res) => {
  let userRemoveId;
  const document = db.doc(`/users/${req.params.email}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (doc.data().store !== req.user.store) {
        return res.status(403).json({ error: 'Not yours' });
      } else {
        userRemoveId = doc.data().userId;
        return document.delete();
      }
    })
    .then(() => {
      return admin
        .auth()
        .deleteUser(userRemoveId)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    })
    .then(() => {
      res.json({ message: 'User Removed.' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.editUserData = (req, res) => {
  db.collection('users')
    .doc(req.params.email)
    .update({
      role: req.body.role,
    })
    .then(() => {
      return res.json('edit success!');
    })
    .catch((err) => {
      console.err;
      return res.json({ err: err.code });
    });
};

exports.uploadImage = (req, res) => {
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
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
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
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.params.email}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
        console.log('asdasd');
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};
