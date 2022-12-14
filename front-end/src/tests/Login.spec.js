import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouters';
import MockConstants from './helpers/MockConstant';
import { Post, Get } from '../api/requests';
import allUsersMock from './mocks/usersMock';

jest.mock('../api/requests');

describe('Testing screen Login', () => {
  afterEach(() => { localStorage.removeItem('user'); });

  it('Trying to access the route /', async () => {
    const { history: { pathname } } = renderWithRouter(<App />, '/login');
    expect(pathname).toBe('/login');
  });

  it('Expect to all the elements to be rendering in the document', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);
    const registerBtn = screen.getByTestId(MockConstants.LOGIN_REGISTER_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('Testing the fields from input', async () => {
    renderWithRouter(<App />, '/login');
    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);

    expect(inputEmail).toHaveValue(MockConstants.VALID_EMAIL);
    expect(inputPassword).toHaveValue(MockConstants.VALID_PASSWORD);
  });

  it(`The button to submit is only habilited when have a
    email and password valided`, async () => {
    const { history } = renderWithRouter(<App />, '/login');
    expect(history.pathname).toBe('/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);
    expect(btnLogin).toBeEnabled();
  });

  it(`Login button is not enabled when email
    are not typed properly`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, 'teste');
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);
    expect(btnLogin).not.toBeEnabled();
  });

  it(`Login button is not enabled when password
  are not typed properly`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, '123');

    expect(btnLogin).not.toBeEnabled();
  });

  it(`The button to register exists and forwards
  to the log route`, async () => {
    const { history } = renderWithRouter(<App />, '/login');

    const btnRegister = screen.getByTestId(MockConstants.LOGIN_REGISTER_BTN);

    expect(btnRegister).toBeEnabled();

    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(history.pathname).toBe('/register');
    });
  });
  it('Login with customer when succeeds', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'customer',
      token: 'validtokencustomer',
    };

    Post.mockResolvedValueOnce(httpResponseMock);

    const { history } = renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });
  it('Login with seller when succeeds', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'seller',
      token: 'validtokenseller',
    };

    Post.mockResolvedValueOnce(httpResponseMock);

    const { history } = renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(history.pathname).toBe('/seller/orders');
    });
  });
  it('Login with administrator when succeeds', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'administrator',
      token: 'validtokenadministrator',
    };

    Post.mockResolvedValueOnce(httpResponseMock);
    Get.mockResolvedValueOnce(allUsersMock);
    const { history } = renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(loginBtn);
    await waitFor(() => {
      expect(history.pathname).toBe('/admin/manage');
    });
  });
  it('Testing when user is already logged in', async () => {
    const httpResponseMock = {
      id: 1,
      name: MockConstants.VALID_NAME,
      email: MockConstants.VALID_EMAIL,
      role: 'customer',
      token: 'validtokencustomer',
    };

    localStorage.setItem('user', JSON.stringify(httpResponseMock));

    const { history } = renderWithRouter(<App />, '/login');

    await waitFor(() => {
      expect(history.pathname).toBe('/customer/products');
    });
  });
  it('The screen create a alert when user is not found', async () => {
    const httpResponseMock = {
      status: 404,
      message: 'User not found',
    };

    Post.mockRejectedValueOnce(httpResponseMock);

    renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(emailInput, MockConstants.VALID_EMAIL);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    userEvent.click(loginBtn);

    const errorMessage = await screen
      .findByTestId('common_login__element-invalid-email');

    expect(errorMessage).toBeInTheDocument();
  });
});
