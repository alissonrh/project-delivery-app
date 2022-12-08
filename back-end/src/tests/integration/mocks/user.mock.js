const newUser = {
  name: 'New client user',
  email: 'user@email.com',
  password: 'pwd123!'
}

const missingFieldUser = {
  name: 'New client user',
  email: 'user@email.com',
  password: ''
}

module.exports = {
  newUser,
  missingFieldUser,
}