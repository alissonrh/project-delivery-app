import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouters';
import MockConstants from './helpers/MockConstant';
// import httpRequest from '../axios/config';
// const axios = require('axios').default;

jest.mock('axios');

describe('Testing screen Login', () => {
  it('Trying to access the route /', async () => {
    // axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
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

  it(`O botão de login não é habilitado quando o e-mail 
  não é digitados devidamente`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, 'teste');
    userEvent.type(inputPassword, MockConstants.VALID_PASSWORD);

    expect(btnLogin).not.toBeEnabled();
  });

  it(`O botão de login não é habilitado quando a senha 
  não é digitados devidamente`, async () => {
    renderWithRouter(<App />, '/login');

    const inputEmail = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const btnLogin = screen.getByTestId(MockConstants.BTN_TEST_ID);

    userEvent.type(inputEmail, MockConstants.VALID_EMAIL);
    userEvent.type(inputPassword, '123');

    expect(btnLogin).not.toBeEnabled();
  });

  it(`O botão de para se registrar existe e encamiinha 
  para a rota de registro`, async () => {
    const { history } = renderWithRouter(<App />, '/login');

    const btnRegister = screen.getByTestId(MockConstants.LOGIN_REGISTER_BTN);

    expect(btnRegister).toBeEnabled();

    fireEvent.click(btnRegister);

    await waitFor(() => {
      expect(history.pathname).toBe('/register');
    });
  });
  it('É possível fazer login com sucesso', async () => {
    const httpResponseMock = {
      status: 200,
      user: 'user',
      token: 'validtoken',
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(httpResponseMock);

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
  it('A tela alerta se um usuário não estiver cadastrado', async () => {
    const httpResponseMock = {
      status: 404,
      message: 'User not found',
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce(httpResponseMock);

    renderWithRouter(<App />, '/login');

    const emailInput = screen.getByTestId(MockConstants.EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(MockConstants.PASSWORD_TEST_ID);
    const loginBtn = screen.getByTestId('common_login__button-login');

    userEvent.type(emailInput, MockConstants.INVALID_EMAIL_1);
    userEvent.type(passwordInput, MockConstants.VALID_PASSWORD);
    fireEvent.click(loginBtn);

    const errorMessage = await screen
      .findByTestId('common_login__element-invalid-email');

    expect(errorMessage).toBeInTheDocument();
  });
});
