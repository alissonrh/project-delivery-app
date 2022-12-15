import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Get, GetId } from '../api/requests';
import App from '../App';
import MockConstants from './helpers/MockConstant';
import renderWithRouter from './helpers/renderWithRouters';
import { saleByIdMock, salesBySellerIdMock } from './mocks/salesMock';
import { userMock } from './mocks/usersMock';

jest.mock('../api/requests');

describe('Testing screen SellerDetailesOrder', () => {
  beforeEach(() => { localStorage.setItem('user', JSON.stringify(userMock)); });

  it('Go to all orders by clicking an orders button', async () => {
    Get.mockResolvedValueOnce(saleByIdMock);
    GetId.mockResolvedValueOnce(salesBySellerIdMock);

    const { history } = renderWithRouter(<App />, '/seller/orders/1');

    const allOrderBtn = await screen.findByTestId(
      MockConstants.ALL_ORDERS_BTN_TEST_ID,
    );

    expect(allOrderBtn).toBeInTheDocument();

    userEvent.click(allOrderBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders');
    });
  });
});
