const invalidPasswordMessage = { message: 'ValidationError: \"password\" is not allowed to be empty' };

const invalidStatusMessage = 'ValidationError: "status" must be one of [Preparando, Em Trânsito, Entregue]';

const invalidUserIdMessage = 'ValidationError: "userId" must be a number';

const invalidSellerIdMessage = 'ValidationError: "sellerId" must be a number';

const invalidUserRoleMessage = 'ValidationError: "role" must be one of [customer, seller]';

module.exports = {
  invalidPasswordMessage,
  invalidStatusMessage,
  invalidUserIdMessage,
  invalidUserRoleMessage,
  invalidSellerIdMessage,
}
