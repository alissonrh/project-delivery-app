const newUser = {
  name: 'New client user',
  email: 'user@email.com',
  password: 'pwd123!'
}

const newUserAdm = {
  name: 'New client user',
  email: 'user@email.com',
  password: 'pwd123!',
  role: 'seller'
}

const newAdminUser = {
  name: 'New client user',
  email: 'user@email.com',
  password: 'pwd123!',
  role: 'admin'
}

const missingFieldUser = {
  name: 'New client user',
  email: 'user@email.com',
  password: ''
}

module.exports = {
  newUser,
  missingFieldUser,
  newUserAdm,
  newAdminUser,
}