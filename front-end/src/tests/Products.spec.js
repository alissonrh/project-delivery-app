import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Get, GetId } from '../api/requests';
import App from '../App';
import MockConstants from './helpers/MockConstant';
import renderWithRouter from './helpers/renderWithRouters';
import allProductsMock from './mocks/productsMock';
import { localStorageSaleMock, salesBySellerIdMock } from './mocks/salesMock';
import { customerUserMock, getSellersMock } from './mocks/usersMock';

const CUSTOMER_PRODUCTS_ROUTE = '/customer/products';

jest.mock('../api/requests');

describe('Testing screen Products', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(customerUserMock));
    localStorage.setItem('sale', JSON.stringify(localStorageSaleMock));
  });

  it('Testing that the product loads with the right amount', async () => {
    Get.mockResolvedValueOnce(allProductsMock);

    renderWithRouter(<App />, CUSTOMER_PRODUCTS_ROUTE);

    const quantityInput = await screen.findByTestId(
      MockConstants.CUSTOMER_QUANTITY_INPUT_TEST_ID,
    );

    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveValue(2);
  });

  it('Testing that the product quantity can be increased and decreased', async () => {
    Get.mockResolvedValueOnce(allProductsMock);

    renderWithRouter(<App />, CUSTOMER_PRODUCTS_ROUTE);

    const quantityInput = await screen.findByTestId(
      MockConstants.CUSTOMER_QUANTITY_INPUT_TEST_ID,
    );
    const increaseBtn = screen.getByTestId(
      MockConstants.CUSTOMER_INCREASE_BTN_TEST_ID,
    );
    const decreaseBtn = screen.getByTestId(
      MockConstants.CUSTOMER_DECREASE_BTN_TEST_ID,
    );

    expect(increaseBtn).toBeInTheDocument();
    expect(decreaseBtn).toBeInTheDocument();
    expect(quantityInput).toHaveValue(2);

    userEvent.click(decreaseBtn);
    expect(quantityInput).toHaveValue(1);

    userEvent.click(increaseBtn);
    expect(quantityInput).toHaveValue(2);
  });

  it('Testing the checkout button', async () => {
    Get
      .mockResolvedValueOnce(allProductsMock)
      .mockResolvedValueOnce(getSellersMock);

    const { history } = renderWithRouter(<App />, CUSTOMER_PRODUCTS_ROUTE);

    const checkoutBtn = await screen.findByTestId(
      MockConstants.CUSTOMER_CHECKOUT_BTN_TEST_ID,
    );

    expect(checkoutBtn).toBeInTheDocument();
    userEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/checkout');
    });
  });
  it('Testing the products button and the my orders button', async () => {
    Get.mockResolvedValueOnce(allProductsMock);
    GetId.mockResolvedValueOnce(salesBySellerIdMock);

    const { history } = renderWithRouter(<App />, CUSTOMER_PRODUCTS_ROUTE);

    const orderBtn = await screen.findByTestId(
      MockConstants.ALL_ORDERS_BTN_TEST_ID,
    );

    expect(orderBtn).toBeInTheDocument();
    userEvent.click(orderBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/orders');
    });

    const productsBtn = await screen.findByTestId(
      MockConstants.PRODUCTS_BTN_TEST_ID,
    );

    expect(productsBtn).toBeInTheDocument();
    userEvent.click(productsBtn);

    await waitFor(() => {
      expect(history.pathname).toBe(CUSTOMER_PRODUCTS_ROUTE);
    });
  });
});
