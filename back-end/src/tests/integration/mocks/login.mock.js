const userDbMock = {
  dataValues: {
    id: 3,
    name: 'Existing customer',
    email: 'customer@email.com',
    role: 'customer',
  },
}

const userBody = {
  email: 'customer@email.com',
  password: 'anypwd123!'
}

const wrongUser = {
  email: 'user@email.com',
  password: 'pwd123!'
}

const invalidBody = {
  email: 'user@email.com',
  password: ''
}

module.exports = {
  userDbMock,
  userBody,
  wrongUser,
  invalidBody,
}
