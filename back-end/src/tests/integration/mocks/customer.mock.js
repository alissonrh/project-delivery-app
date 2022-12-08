const newSale = {
  "saleInfo": {
    "userId": 3,
    "sellerId": 2,
    "deliveryAddress": "essa também deu bom",
    "deliveryNumber": "1100"
  },
  "sales": [
    {
      "productId": 3,
      "quantity": 7
    },
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}

const missingUserIdSale = {
  "saleInfo": {
    "sellerId": 2,
    "deliveryAddress": "essa também deu bom",
    "deliveryNumber": "1100"
  },
  "sales": [
    {
      "productId": 3,
      "quantity": 7
    },
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}

const allSellers = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
}

const allProducts = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
];

const orderId = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": "23.76",
  "deliveryAddress": "essa deu bom",
  "deliveryNumber": "1000",
  "saleDate": "2022-12-07T22:41:15.932Z",
  "status": "Pendente",
  "products": [
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": 7.50,
      "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
      "quantity": 2,
      "subTotal": 15
    },
    {
      "id": 5,
      "name": "Skol 269ml",
      "price": 2.19,
      "urlImage": "http://localhost:3001/images/skol_269ml.jpg",
      "quantity": 4,
      "subTotal": 8.76
    }
  ],
  "sellerName": "Fulana Pereira",
}

const updateSaleStatusMock = { status: 'Entregue' };

module.exports = {
  newSale,
  missingUserIdSale,
  allSellers,
  allProducts,
  orderId,
  updateSaleStatusMock,
}