import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Get, GetId, Put } from '../api/requests';
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
  it('Changing order status to "Preparing" and then to "In transit"', async () => {
    Get.mockResolvedValueOnce(saleByIdMock);
    Put.mockResolvedValueOnce('');

    renderWithRouter(<App />, '/seller/orders/1');

    const preparingStatusBtn = await screen.findByTestId(
      MockConstants.PREPARING_STATUS_BTN_TEST_ID,
    );

    const dispatchStatusBtn = await screen.findByTestId(
      MockConstants.DISPATCH_BTN_TEST_ID,
    );

    const deliveryStatusElement = screen.getByTestId(
      MockConstants.ELEMENT_DELIVERY_STATUS_TEST_ID,
    );

    expect(preparingStatusBtn).toBeInTheDocument();
    expect(dispatchStatusBtn).toBeInTheDocument();
    expect(deliveryStatusElement).toBeInTheDocument();

    expect(deliveryStatusElement).toHaveTextContent('Pendente');
    expect(dispatchStatusBtn).toBeDisabled();

    userEvent.click(preparingStatusBtn);
    expect(deliveryStatusElement).toHaveTextContent('Preparando');
    expect(preparingStatusBtn).toBeDisabled();

    expect(dispatchStatusBtn).toBeEnabled();
    userEvent.click(dispatchStatusBtn);
    expect(deliveryStatusElement).toHaveTextContent('Em Trânsito');
  });
});
