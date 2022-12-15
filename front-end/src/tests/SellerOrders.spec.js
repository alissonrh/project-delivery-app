import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Get, GetId } from '../api/requests';
import App from '../App';
import MockConstants from './helpers/MockConstant';
import renderWithRouter from './helpers/renderWithRouters';
import allProductsMock from './mocks/productsMock';
import { saleByIdMock, salesBySellerIdMock } from './mocks/salesMock';
import { userMock } from './mocks/usersMock';

jest.mock('../api/requests');

describe('Testing screen SellerOrders', () => {
  beforeEach(() => { localStorage.setItem('user', JSON.stringify(userMock)); });

  it('Go to order details when clicking in an order', async () => {
    Get.mockResolvedValueOnce(allProductsMock).mockResolvedValueOnce(saleByIdMock);
    GetId.mockResolvedValueOnce(salesBySellerIdMock);

    const { history } = renderWithRouter(<App />, '/seller/orders');

    const orderBtn = await screen.findByTestId(
      MockConstants.SELLER_ORDERS_ELEMENT_ORDER_ID_TEST_ID,
    );

    userEvent.click(orderBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders/1');
    });
  });

  it('Testing user logout button', async () => {
    Get.mockResolvedValueOnce(allProductsMock);
    GetId.mockResolvedValueOnce(salesBySellerIdMock);

    const { history } = renderWithRouter(<App />, '/seller/orders');

    const exitBtn = await screen.findByTestId(
      MockConstants.LOGOUT_BTN_TEST_ID,
    );

    expect(exitBtn).toBeInTheDocument();

    userEvent.click(exitBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/login');
    });
  });
});
