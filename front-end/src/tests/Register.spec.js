import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Get, Post } from '../api/requests';
import App from '../App';
import MockConstants from './helpers/MockConstant';
import renderWithRouter from './helpers/renderWithRouters';
import allProductsMock from './mocks/productsMock';

jest.mock('../api/requests');

describe('Screen to register', () => {
  it('All elements from the page be rendering', () => {
    renderWithRouter(<App />, '/register');

    const nameInput = screen.getByTestId(MockConstants.REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(
      MockConstants.REGISTER_PASSWORD_TEST_ID,
    );
    const registerBtn = screen.getByTestId(MockConstants.REGISTER_BTN);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('Its not possible to create a user with invalid data', async () => {
    renderWithRouter(<App />, '/register');

    const nameInput = screen.getByTestId(MockConstants.REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(
      MockConstants.REGISTER_PASSWORD_TEST_ID,
    );
    const registerBtn = screen.getByTestId(MockConstants.REGISTER_BTN);

    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, MockConstants.INVALID_NAME);
    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    await waitFor(() => expect(registerBtn).toBeDisabled());
  });

  it('Its possible to create a user with success', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'customer',
      token: 'validtokencustomer',
    };

    Post.mockResolvedValueOnce(httpResponseMock);
    Get.mockResolvedValueOnce(allProductsMock);

    const { history } = renderWithRouter(<App />, '/register');

    const nameInput = screen.getByTestId(MockConstants.REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(
      MockConstants.REGISTER_PASSWORD_TEST_ID,
    );
    const registerBtn = screen.getByTestId(MockConstants.REGISTER_BTN);

    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, MockConstants.VALID_NAME);
    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);

    expect(registerBtn).toBeEnabled();

    userEvent.click(registerBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });

  it('Not possible to register with user already registered', async () => {
    const httpResponseMock = {
      status: 409,
      message: 'Usuário já foi registrado',
    };
    Post.mockRejectedValueOnce(httpResponseMock);

    renderWithRouter(<App />, '/register');

    const nameInput = screen.getByTestId(MockConstants.REGISTER_NAME_TEST_ID);
    const emailInput = screen.getByTestId(MockConstants.REGISTER_EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.REGISTER_PASSWORD_TEST_ID);
    const registerBtn = screen.getByTestId(MockConstants.REGISTER_BTN);

    userEvent.type(nameInput, MockConstants.VALID_NAME);
    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(registerBtn);

    const errorMessage = await screen
      .findByTestId('common_register__element-invalid_register');

    expect(errorMessage).toBeInTheDocument();
  });
});
