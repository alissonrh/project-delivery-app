export const allUsersMock = [
  {
    id: 1,
    name: 'any_administrator',
    email: 'any@administrator.com',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'any_customer',
    email: 'any@customer.com',
    role: 'customer',
  },
  {
    id: 3,
    name: 'any_seller',
    email: 'any@seller.com.br',
    role: 'seller',
  },
];

export const userMock = {
  ...allUsersMock[2],
  token: 'anyvalidtoken',
};

export const adminUserMock = {
  ...allUsersMock[0],
  token: 'anyvalidtoken',
};

export const customerUserMock = {
  ...allUsersMock[1],
  token: 'anyvalidtoken',
};

export const adminGetusersMock = [
  {
    id: 1,
    name: 'any_customer',
    email: 'any@customer.com',
    role: 'customer',
  },
  {
    id: 2,
    name: 'any_seller',
    email: 'any@seller.com.br',
    role: 'seller',
  },
];

export const getSellersMock = [
  {
    id: 2,
    name: 'any_seller1',
    email: 'any@seller1.com.br',
    role: 'seller',
  },
  {
    id: 3,
    name: 'any_seller2',
    email: 'any@seller2.com.br',
    role: 'seller',
  },
];
