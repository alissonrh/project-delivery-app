const newUserDbMock = {
  dataValues: {
    id: 6,
    name: 'New client user',
    email: 'user@email.com',
    role: 'customer',
  },
}

const userAdminDbMock = {
  dataValues: {
    id: 6,
    name: 'New client user',
    email: 'user@email.com',
    role: 'administrator',
  },
}

const newSaleDbMock = {
  dataValues: {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": 999,
    "deliveryAddress": "essa também deu bom",
    "deliveryNumber": "1100",
    "saleDate": "2022-12-07T22:41:15.932Z",
    "status": "Pendente",
  },
}

const newSaleProductDbMock = {
  "saleId": 1,
  "productId": 1,
  "quantity": 3,
}

const allProducts = [
  {
    dataValues: {
      id: 2,
      name: 'Heineken 600ml',
      price: 7.50,
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        quantity: 2,
      },
    }
  },
  {
    dataValues: {
      id: 5,
      name: 'Skol 269ml',
      price: 2.19,
      urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
      SaleProduct: {
        quantity: 4,
      },
    },
  },
];

const saleByIdDbMock = {
  dataValues: {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": '23.76',
    "deliveryAddress": 'essa deu bom',
    "deliveryNumber": '1000',
    "saleDate": "2022-12-07T22:41:15.932Z",
    "status": 'Pendente',
    "seller": {
      "name": 'Fulana Pereira',
    },
    "products": allProducts,
  },
}

module.exports = {
  newSaleDbMock,
  newUserDbMock,
  newSaleProductDbMock,
  saleByIdDbMock,
  userAdminDbMock,
}