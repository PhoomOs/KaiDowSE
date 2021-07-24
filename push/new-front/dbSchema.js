const orderSchema = {
  orderId: id,
  orderStatus: status,
  orderTime: time,
  orderItem: [objMenu],
  orderTotalPrice: price,
};
const status = ['todo', 'doing', 'done'];
