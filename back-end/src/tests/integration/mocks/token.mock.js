const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoianViZXJjbGV2ZXJzb24iLCJlbWFpbCI6Inhhc2RzYWRhYWJhQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MDM0NzEyMn0.zvmXTtTTYX-nVi4ygGjPo7_xexnUzf065YFKXN91Weo'

const tokenResponseMock = { token: tokenMock };

const tokenPayloadMock = {
  id: 6,
  name: 'New client user',
  email: 'user@email.com',
  role: 'customer',
}

module.exports = {
  tokenMock,
  tokenResponseMock,
  tokenPayloadMock,
}
