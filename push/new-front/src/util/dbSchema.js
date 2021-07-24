const PaymentDetail = {
  name: 'pungyui',
  email: 'pungyuiLoveEat@email.com',
  account_type: 'bbl',
  account_name: 'pungyuiINWZA',
  account_number: '1234567890',
  type: 'individual',
  TIN: '123456',
};

const addEmployee = {
  name: '',
  surName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  uid: '',
  store: '',
  role: '',
  imgURL: ``,
};

const menuItem = {
  menuImage: '',
  menuName: '',
  menuPrice: [
    { detail: 'ธรรมดา', price: 50 },
    { detail: 'พิเศษ', price: 70 },
  ],
  menuId: '',
  menuType: ''
};


const menuType = {
  typeName: 'name',
  typeId: 'asdasd'
};


all = {
  menuItems: [{
    menuImage: '',
    menuName: '',
    menuPrice: [
      { detail: 'ธรรมดา', price: 50 },
      { detail: 'พิเศษ', price: 70 },
    ],
    menuId: '',
    menuType: ''
  }],
  menuTypes: [{
    typeName: 'name',
    typeId: 'asdasd'
  }]
}



const orderSchema = {
  id: id,
  status: 0,
  time: time,
  menuItem: [objMenu],
};
const item = {
  addOn: [{ id: "id", name: "name", price: "price", status: "status" }],
  id: "id",
  name: "name",
  price: "price",
  status: "status"
};
